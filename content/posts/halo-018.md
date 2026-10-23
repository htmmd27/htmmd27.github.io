---
title: "计算机图形学笔记（十）：着色(Shading)--着色频率"
date: "2022-03-10T15:27:41.569+08:00"
lastmod: "2022-03-10T22:01:03.525+08:00"
slug: "计算机图形学笔记十着色shading--着色频率"
draft: false
tags: ["计算机图形学","CG","computergraphic"]
categories: ["计算机图形学"]
halo_id: 18
summary: "课程地址： game101课件地址： GAMES101_Lecture_07"
aliases: ["/archives/计算机图形学笔记十着色shading--着色频率/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（十）：着色(Shading)--着色频率"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=8)
课件地址： [GAMES101_Lecture_08](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_08.pdf)
## 着色频率
![着色频率不同，效果也不同](/upload/2022/03/image-ae31917e88244dfd87919970d3579b8b.png)
着色频率是指着色运用到哪些点或平面上。左侧图片为对平面进行着色；中间的为对每个顶点进行着色，其余部分为插值进行计算；右侧为对每一个点都进行计算。
### 得每个三角形进行着色(Flat Shading)
对于每一个三角形，由于三角形是平面，所以其法线只有一条，方向固定，结果就是三角形内部的着色值是相同的。
![Flat Shading](/upload/2022/03/image-a88978e6ce3d48ae91aad70ca3ec6307.png)
### 对每个顶点进行着色(Gouraud Shading)
对任意一个顶点求出其法线，对每一个顶点进行着色，三角形内部的颜色通过插值计算。
![image.png](/upload/2022/03/image-61b2c1d8b1d847289b91f8b4756eded3.png)
对于顶点的法线，其等于该顶点关联的面的法线的加权平均，加权为三角形的面积。
![image.png](/upload/2022/03/image-d4db22bcf8664c1c823b3c7e16dd85c7.png)
![image.png](/upload/2022/03/image-753e9050f6ff45edb1b7033d5c283cf6.png)
### 对每个像素进行着色(Phong Shading)
![image.png](/upload/2022/03/image-514a93add7d8470593dcb2aae9a33c58.png)
### 着色频率的决定性因素
当模型足够复杂时，逐平面的效果不一定会比逐像素的效果差。
![image.png](/upload/2022/03/image-a4b10ea574184aacbe40a4ae73f56c89.png)
