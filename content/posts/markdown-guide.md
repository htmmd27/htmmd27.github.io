---
title: 用 Markdown 写下第一篇文章
date: 2026-10-23T07:00:00+08:00
slug: markdown-guide
description: 标题、列表、链接与代码，让写作保持简单。
summary: 一份简短的 Markdown 写作示例：从标题、列表到代码块，专注内容本身。
tags: [写作, Markdown]
draft: false
---
Markdown 用少量符号表达排版，让正文保持清晰、易读。下面是一份可以随时回看的写作示例。

## 标题与段落

用 `##` 表示二级标题，用 `###` 表示三级标题。段落之间空一行。

**重点内容**可以加粗，也可以使用 *斜体* 表达强调。

## 列表与引用

- 记录一个问题。
- 尝试一个解决方法。
- 写下结果与下一步。

> 先把想法写下来，再慢慢整理。

## 链接与图片

```markdown
[访问我的 GitHub](https://github.com/htmmd27)
![图片说明](/images/example.jpg)
```

将图片放进仓库的 `static/images/` 目录，然后使用 `/images/文件名` 引用。

## 代码块

三个反引号后面加语言名称，就可以写一段带高亮的代码：

```python
def hello(name):
    return f"你好，{name}！"

print(hello("Markdown"))
```

## 在这个网站发布文章

在 `content/posts/` 新建一个 `.md` 文件，在开头填写标题、日期和摘要，再写正文。提交后，GitHub Actions 会自动构建并发布。

```yaml
---
title: 我的新文章
date: 2026-10-23T10:00:00+08:00
slug: my-new-post
summary: 用一句话介绍这篇文章。
tags: [笔记]
draft: false
---
```

还没写完时，把 `draft` 改成 `true`，文章就不会出现在正式网站上。

