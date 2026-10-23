---
title: "计算机图形学笔记（十一）：着色(Shading)--图形管线与纹理映射"
date: "2022-03-10T22:01:10.3+08:00"
lastmod: "2022-03-11T12:45:58.447+08:00"
slug: "2022-03-10-22-01-09"
draft: false
tags: ["计算机图形学","CG","computergraphic"]
categories: ["计算机图形学"]
halo_id: 19
summary: "图形管线和纹理映射"
math: true
aliases: ["/archives/2022-03-10-22-01-09/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（十一）：着色(Shading)--图形管线与纹理映射"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=8)
课件地址： [GAMES101_Lecture_08](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_08.pdf)

## 图形管线(Graphics Pipeline)
也叫做实时渲染管线，指的是从场景到图的过程。
![三维-投影-光栅化-着色-输出](/upload/2022/03/image-812fc543ff1c44e9b87ef7a98641c8c8.png)
## 纹理映射
![image.png](/upload/2022/03/image-5f4450cfe8db45d48adc84f20bf80dbc.png)
对于同一个模型上不同位置定义不同的属性，使物体的产生纹理。
> 任何一个三维物体的表面都是二维的![image.png](/upload/2022/03/image-fa2e25f631a3469ebaed8f8964fd8184.png)

默认u，v取值范围为\((0,1)\)。
![image.png](/upload/2022/03/image-8624221548fd4d84987fed71cde10259.png)
纹理可以重复拼接，设计好的纹理可以无缝衔接。
![image.png](/upload/2022/03/image-7c7f9191bf484320a2d8ae81b880bbbf.png)
