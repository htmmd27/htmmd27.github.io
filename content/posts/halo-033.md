---
title: "计算机图形学笔记（二十二）：动画与模拟2"
date: "2022-03-18T13:41:07.606+08:00"
lastmod: "2022-03-19T21:21:29.758+08:00"
slug: "计算机图形学笔记二十二动画与模拟2"
draft: false
tags: ["计算机图形学","CG","computergraphic"]
categories: ["计算机图形学"]
halo_id: 33
summary: "动画与模拟"
aliases: ["/archives/计算机图形学笔记二十二动画与模拟2/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（二十二）：动画与模拟2"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=22)
课件地址： [GAMES101_Lecture_22](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_22.pdf)

## 单个粒子模拟
定义一个速度场。
![image.png](/upload/2022/03/image-f25abea9a86d434e9230c5d658abbbf8.png)
通过一阶常微分方程可以求出粒子的速度。
![image.png](/upload/2022/03/image-6bb8c24728df4421baea0a26d55af8a3.png)
### 欧拉方法
![image.png](/upload/2022/03/image-b71d3dd8a2154580be1846733170b57e.png)
始终使用上一时刻的量来估计下一时刻的位置。但是稳定性不好。
![image.png](/upload/2022/03/image-88b6571ba8c24e4484f7d5fea837a25d.png)
当步长越大时，欧拉方法的结果越不准确。

误差：
- 每一步模拟都会存在误差
- 当误差累积起来之后可能会造成很大的后果

欧拉方法是存在误差且不稳定的。

### 解决不稳定性的方法
#### 中点法
使用两次欧拉方法是其更稳定。
![image.png](/upload/2022/03/image-9a62bbd606a3470eb247a84948332337.png)
#### 自适应步长
![image.png](/upload/2022/03/image-5fd2af162aa243e797a1b1e0ca7c393e.png)
通过判断不同步长下结果差距大小来决定是否需要减小步长。
#### 隐式欧拉方法
使用下一时刻的速度与加速度来更新当前速度。
![image.png](/upload/2022/03/image-95600f3d9b5543b2b738a19bb8457e69.png)
#### Runge-Kutta Families
四阶方法运用的范围最广。
![image.png](/upload/2022/03/image-ab62f20a8bb744028cd8f0d1de1ee35f.png)
### 刚体模拟
在刚体的模拟中，人们会考虑更多的物理量。
![image.png](/upload/2022/03/image-dddf33813e8a45f2a2cc5708771c86e2.png)

## 流体模拟
通过模拟形成流体的小球来进行整个流体的模拟。
- 认为整个流体为很多不可压缩的刚体小球形成
- 认为流体在任何一个地方是不可压缩的，即密度是不变的
- 当发现模拟中的粒子密度发生改变时，应该进行密度修正，通过移动粒子的位置
- 应该知道密度对所有小球的位置的梯度
- 使用梯度下降的方式进行更新
