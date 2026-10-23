---
title: "计算机图形学笔记（十三）：几何--隐式几何与显式几何"
date: "2022-03-11T15:40:20.535+08:00"
lastmod: "2022-03-12T18:09:13.805+08:00"
slug: "计算机图形学笔记十三几何--隐式几何与显式几何"
draft: false
tags: ["计算机图形学","CG","computergraphic"]
categories: ["计算机图形学"]
halo_id: 21
summary: "隐式几何与显式几何"
math: true
aliases: ["/archives/计算机图形学笔记十三几何--隐式几何与显式几何/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（十三）：几何--隐式几何与显式几何"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=10)
课件地址： [GAMES101_Lecture_10](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_10.pdf)

## 几何
- 隐式几何
- 显式几何

根据需要使用不用的几何表示方法
### 隐式几何
满足一定关系的点。例如 \(x^2+y^2+z^2=1\)
通常情况下，存在定义\(f(x,y,z)=0\)。
有时很难从式子看出隐式几何的形状，好处是方便判断某个点是否在这个面上。
![image.png](/upload/2022/03/image-f252b7cb8d0745088fe3b086605f56fd.png)
#### 利用数学公式表示
![image.png](/upload/2022/03/image-c11b1ad9ece04e5ba751a64a35e5e6ea.png)
#### CSG（Combine Solid Geometry）
通过几何体的布尔运算来定义几何体。
![image.png](/upload/2022/03/image-7dbd95f9c9e34d2bac906e81d406b5b5.png)
#### 距离函数
通过对距离函数做融合。空间中的任何一个点到你想要表述的点的最小距离叫做距离函数。外部的点是正的，内部的点是负的。
![image.png](/upload/2022/03/image-9873b9252dd04c40a168bc775d6c17d1.png)
#### 水平集(Level Set Methods)
![image.png](/upload/2022/03/image-3fa41abaec074966b3ab480b11ae6d9f.png)
#### 分形(Fractals)
![image.png](/upload/2022/03/image-121c4904eed04696b6d68dcdb1aa4ac8.png)
### 显式几何
直接给出点的位置或者通过参数映射的方式。但是对于显式几何很难判断某个点是否在平面上。
![image.png](/upload/2022/03/image-d4aca04578704b568ddf538eac927426.png)
![image.png](/upload/2022/03/image-121da4aa00f74e898942dc193b91d48f.png)
#### 点云
![image.png](/upload/2022/03/image-2238b4f65f3b4cca84e4c1214fa735ff.png)
#### 多边形面
![image.png](/upload/2022/03/image-8c45f784763e4470b1b11fb4c46df40a.png)
