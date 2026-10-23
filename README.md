# htmmd27 的个人主页

基于 [Hugo](https://gohugo.io/) + [PaperMod](https://github.com/adityatelange/hugo-PaperMod)，使用 GitHub Pages 托管。内容使用 Markdown，提交到 `main` 后自动构建发布。

目标地址：**https://htmmd27.github.io/**（以 GitHub Pages 实际部署状态为准）。

## 旧站保留

仓库原本使用 Hexo + NexT。原 `hexoMd` 分支及提交历史保持不变；`main` 原有的静态文件也保留在仓库根目录，新流程仅发布 Hugo 生成的 `public/`。现有文章已按要求从新版网站删除，历史版本可从 Git 提交记录查阅。

## 更新内容

- 首页介绍：`content/_index.md`
- 关于我：`content/about.md`
- 写文章：在 `content/posts/` 新建或编辑 `.md`
- 项目介绍：在 `content/projects/` 新建或编辑 `.md`
- 网站标题、菜单：`hugo.yaml`
- 图片：放入 `static/images/`，Markdown 使用 `![描述](/images/文件名.jpg)`

可直接在 GitHub 网页打开对应文件，点击铅笔编辑，修改后 **Commit changes**。不需要在自己的电脑安装开发环境。正文和首页介绍用 Markdown；标题、日期等信息写在文件顶部的 YAML 区域。

### 新文章示例

新建 `content/posts/my-first-note.md`：

````markdown
---
title: 我的第一篇笔记
date: 2026-10-23T10:00:00+08:00
slug: my-first-note
summary: 这篇文章的简短介绍。
tags: [笔记]
draft: false
---

## 今天的记录

这里写正文，支持 **加粗**、列表、链接、图片和代码块。
````

`draft: true` 表示草稿，正式网站不会显示。日期晚于构建时间的文章也不会显示；如需定时发布，届时需要重新触发构建。每篇文章使用不同的 `slug`，保持网址稳定。

首页的最近文章与项目卡片自动从 Markdown 内容中生成，无需修改 HTML。

文章页支持按标签筛选，每个标签显示文章总数，筛选后的分页保留当前标签。标签直接读取文章顶部的 `tags`，例如 `tags: [Unity, 图形学]`；添加文章或标签并发布后，筛选项会自动更新。“全部文章”可清除筛选，标签页面的网址可以直接分享。

## 首次发布

1. 在 GitHub 账号 `htmmd27` 下新建公开仓库 `htmmd27.github.io`。如果已经存在，请先检查内容，不要覆盖已有主页。
2. 将本项目源码提交到仓库的 `main` 分支。保留 `.github/workflows/pages.yml` 和 `themes/PaperMod/`；不要上传 `.tools/`、`public/`。
3. 打开仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
4. 在 **Actions → Build and deploy GitHub Pages → Run workflow** 手动运行一次，或提交一次内容更新。
5. 部署成功后打开 https://htmmd27.github.io/。

Actions 对拉取请求只构建检查；只有 `main` 推送或手动运行才部署。每次更新的进度与失败日志都可以在 Actions 查看。

## 本地预览

安装 Hugo **0.158.0**（官方标准版本即可），在项目根目录执行：

```sh
hugo server --buildDrafts
```

打开输出的本地地址。正式构建：

```sh
hugo --gc --minify
```

当前电脑也可使用已下载的工具：

```powershell
.\.tools\hugo-0.158.0\hugo.exe server --buildDrafts
```

构建输出在 `public/`，不纳入 Git；GitHub Actions 使用相同的固定 Hugo 版本构建。

## 个性化

- 当前展示名为 GitHub 用户名 `htmmd27`，可自行修改。
- 已从 2022-10-26 的 Halo 备份恢复 29 篇原已发布文章，文件为 `content/posts/halo-*.md`，保留原始标题、日期、分类、标签与封面。继续新建 Markdown 即可发布。
- 恢复的文章图片保存在 `static/upload/`，旧域名图片已改为站内引用。数学公式使用 `\(行内公式\)` 与 `\[块公式\]`，文章需要设置 `math: true`。
- 原备份中的草稿与旧自定义页面另存于本地 `artifacts/halo-restored/`，不上传公开仓库。
- 项目栏目展示 RayTracingLearn、CatlikeCodingUnity 与 wanfangSpider，按 Markdown 中的 `weight` 排序；前两项注明教程来源，万方爬虫注明历史版本状态。
- 搜索、深浅色切换、文章目录、代码复制、RSS、归档、站点地图由 PaperMod/Hugo 提供。
- 首页采用浅米色与森林绿；自定义样式在 `assets/css/extended/custom.css`。
- 开源来源与许可证见 `THIRD_PARTY.md` 和 `themes/PaperMod/LICENSE`。

不需要额外服务器或数据库，也不依赖在线编辑器服务。
