---
title: "Semantic Mediawiki之Mobo的使用"
date: "2022-03-04T12:29:37.419+08:00"
lastmod: "2022-03-09T22:08:56.138+08:00"
slug: "semanticmediawiki-zhi-mobo-de-shi-yong"
draft: false
tags: ["wiki","smw"]
categories: ["SemanticMediawiki"]
halo_id: 3
summary: "介绍Mobo的安装、使用、上传等功能"
aliases: ["/archives/semanticmediawiki-zhi-mobo-de-shi-yong/"]
cover:
  image: "/upload/2022/03/image-eb15ef4edd6b4134a5391da92a538df0.png"
  alt: "Semantic Mediawiki之Mobo的使用"
  hiddenInList: true
---

# Mobo
安装及使用过程参考[Mobo官方文档](https://fannon.gitbooks.io/mobo-documentation/content/)
## 安装步骤

### 1、安装node.js

### 2、安装mobo

```sh
sudo npm install -g mobo
sudo npm update -g mobo
```

## 使用

### 查看版本

```sh
mobo -v
```

### 创建新项目

```sh
mkdir projectName
cd projectName
mobo --init
```

### 运行mobo

```sh
mobo      # Runs mobo in interactive mode
mobo -r   # Runs mobo in non-interactive mode (will exit after run)
mobo -f   # Forces the upload of all files (will exit after run)
mobo -h   # View command line help
```

### 配置

在LocalSettings.php中加入以下命令

```php
# WARNING: Check your permissions. If needed make further constraints.
$wgEnableAPI = true;
$wgEnableWriteAPI = true;
$wgCrossSiteAJAXdomains = array( '*' );
```

账户：Mobo

密码：password

### 启动

```sh
cd moboSMW
mobo
```

### 导入新页面

首先在nodejs安装目录下的 */path/to/nodejs/bin/npm/node_modules/mobo/lib/modules*文件夹下

```javascript
//修改import.js文件
//将
if(err || info.lgtoken)
//---->修改为
if(err || info.result != "Success")
```



在 *./import*文件夹中新建文件夹，如*test*，并在*test*文件夹中添加 *.wikitext*的wiki页面文件

```sh
mobo --import test
```
