---
title: "计算机图形学笔记（十四）：几何--曲线与曲面"
date: "2022-03-12T18:09:38.284+08:00"
lastmod: "2022-03-12T19:44:52.735+08:00"
slug: "计算机图形学笔记十四几何--曲线与曲面"
draft: false
tags: ["计算机图形学","CG","computergraphic"]
categories: ["计算机图形学"]
halo_id: 22
summary: "曲线与曲面"
math: true
aliases: ["/archives/计算机图形学笔记十四几何--曲线与曲面/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（十四）：几何--曲线与曲面"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=11)
课件地址： [GAMES101_Lecture_11](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_11.pdf)

## 曲线（Curves）
### 贝塞尔曲线
用一系列控制点去定义一条曲线。
![贝塞尔曲线](/upload/2022/03/image-212627d3858d4b79b3259e99e21edbaa.png)
#### 绘制贝塞尔曲线（de Casteljau Algorithm）
考虑三个点的情况：
![image.png](/upload/2022/03/image-f373042f117e4e299b828867b7cbf99b.png)
假设绘制曲线的时间为(0,1)，逐次找到时间t下的点，将所有的点连接起来则形成贝塞尔曲线。
![image.png](/upload/2022/03/image-67c628dcaad1462ab6c8ed63854e17bb.png)
![image.png](/upload/2022/03/image-52937a6cb4194d3093b0e019bb875d3d.png)
#### 贝塞尔曲线的代数表达式
对于四个不同的点\(b_0,b_1,b_2,b_3\)。
![image.png](/upload/2022/03/image-5a0f77d6f6e44a35b162fe78288e78b4.png)
通过插值的方式可以求出中间过程每个点状态。
![image.png](/upload/2022/03/image-f7dc4ebc78434600ac924515d6b6b358.png)
给定n+1个控制点，得到如下公式：
![image.png](/upload/2022/03/image-099419f5f9ec4835ba38b6e023f2c4c1.png)
#### 贝塞尔曲线的性质
- 规定了起点和终点
- 规定了初始朝向与终止朝向
- 仿射变换不变性。
- 凸包性质，画出来的贝塞尔曲线一定在控制点形成的凸包内。

#### 逐段贝塞尔曲线（Piecewise Bézier Curves）
当控制点多的时候，不容易进行操作。
![image.png](/upload/2022/03/image-4acbe2b1adde4a0780b353bc935d1241.png)
习惯使用四个控制点定义一条贝塞尔曲线
![image.png](/upload/2022/03/image-2106a6f1e1a14a958ce77b8879a4112a.png)
再将不同的曲线连接起来，保证连接部分的两条曲线的终止方向与起始方向的切线共线（方向与大小皆相同）。
![image.png](/upload/2022/03/image-3e4f12f46fcf486d99d25f6741d27478.png)

## 曲面
### 贝塞尔曲面
在两个方向上进行贝塞尔曲线的计算。
![image.png](/upload/2022/03/image-523b0d7c51e14070be82f652db3bf4e7.png)
#### 绘制贝塞尔曲面
通过给定两个时间(u,v)，通过参数映射的方式形成贝塞尔曲面。
![image.png](/upload/2022/03/image-b815fcf621e14ee1afa30f64b1f51aed.png)
