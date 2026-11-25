"""Prepare the public aggregate used by Hugo and carried forward on normal builds."""

import json
import os
from datetime import date, datetime, time, timedelta, timezone
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen


HOST = "htmmd27.github.io"
OUTPUT = Path("static/site-views.json")
HONG_KONG = timezone(timedelta(hours=8))


def published_snapshot():
    try:
        with urlopen(f"https://{HOST}/site-views.json", timeout=30) as response:
            stats = json.load(response)
    except HTTPError as error:
        if error.code == 404:
            return None
        raise
    if type(stats["views"]) is not int or stats["views"] < 0:
        raise ValueError("Invalid published page-view count")
    return {"views": stats["views"], "through": date.fromisoformat(stats["through"]).isoformat()}


def collect(account, token, end):
    # Each interval is one complete local day. Small batches keep individual
    # dataset queries within daily range limits and avoid per-path truncation.
    total = 0
    for offset in range(0, 30, 5):
        fields = []
        for day in range(5):
            start = end - timedelta(days=30 - offset - day)
            stop = start + timedelta(days=1)
            fields.append(f'''
                day{day}: rumPageloadEventsAdaptiveGroups(limit: 1, filter: {{
                    requestHost: "{HOST}", datetime_geq: "{start:%Y-%m-%dT%H:%M:%SZ}",
                    datetime_lt: "{stop:%Y-%m-%dT%H:%M:%SZ}"
                }}) {{ count }}
            ''')
        query = "query($account: String!) { viewer { accounts(filter: {accountTag: $account}) { " + " ".join(fields) + " } } }"
        body = json.dumps({"query": query, "variables": {"account": account}}).encode()
        request = Request("https://api.cloudflare.com/client/v4/graphql", data=body,
                          headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"})
        with urlopen(request, timeout=45) as response:
            payload = json.load(response)
        if payload.get("errors"):
            raise ValueError("Cloudflare: " + str([item["message"] for item in payload["errors"]]))
        account_data, = payload["data"]["viewer"]["accounts"]
        for day in range(5):
            rows = account_data[f"day{day}"]
            if rows == []:
                continue
            row, = rows
            count = row["count"]
            if type(count) is not int or count < 0:
                raise ValueError("Invalid count from Cloudflare")
            total += count
    return total


def main():
    event = os.getenv("GITHUB_EVENT_NAME")
    refresh = event in ("schedule", "workflow_dispatch")
    stats = None if refresh else published_snapshot()
    if stats is None:
        token = os.getenv("CLOUDFLARE_ANALYTICS_TOKEN")
        account = os.getenv("CLOUDFLARE_ACCOUNT_ID")
        if not token or not account:
            if refresh:
                raise RuntimeError("Configure CLOUDFLARE_ANALYTICS_TOKEN and CLOUDFLARE_ACCOUNT_ID")
            print("::warning::Waiting for Cloudflare Analytics credentials for the first update")
            return
        today = datetime.now(HONG_KONG).date()
        end = datetime.combine(today, time.min, HONG_KONG).astimezone(timezone.utc)
        stats = {"views": collect(account, token, end), "through": (today - timedelta(days=1)).isoformat()}
    OUTPUT.write_text(json.dumps(stats) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
