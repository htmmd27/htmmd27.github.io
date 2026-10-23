---
title: "计算机图形学笔记（二十一）：高级光线传播与外观建模"
date: "2022-03-16T18:26:30.394+08:00"
lastmod: "2022-03-16T21:40:17.601+08:00"
slug: "计算机图形学笔记二十一高级光线传播与外观建模"
draft: false
tags: ["计算机图形学","CG","computergraphic"]
categories: ["计算机图形学"]
halo_id: 31
summary: "高级光线传播与外观建模"
aliases: ["/archives/计算机图形学笔记二十一高级光线传播与外观建模/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（二十一）：高级光线传播与外观建模"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=18)
课件地址： [GAMES101_Lecture_18](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_18.pdf)

## 高级光线传播
### 无偏光线传播方法
#### 双向路径追踪(BDPT)
从光源与摄像机打出半路径，并连接两个路径的端点。
![image.png](/upload/2022/03/image-bbc675e7f0ed48cc9d951a6c88b2990e.png)
当光线传播在光源这边容易计算时，BDPT会有更好的效果。
![image.png](/upload/2022/03/image-7f1e2618917a4abf9a28c03f3227932c.png)
#### Metropolis Light Transport (MLT)
利用马尔科夫链蒙特卡洛方法（MCMC）进行采样。可以将任何函数通过MCMC生成的样本与被积函数一致。是一个局部的方法。
![image.png](/upload/2022/03/image-4cdf4fab0d7547188174f94f8fbe8e79.png)
特别适合做复杂的光线传播。
![image.png](/upload/2022/03/image-7dcdf665fd7a4291932dd6aeb4dc6d3e.png)
缺点：
- 很难分析收敛速度，不知道该运行多长时间能达到一个好的效果。
- 所有操作都是局部的，不同的像素收敛速度不同，结果会很脏。
### 有偏光线传播方法
#### 光子映射(Photon Mapping)
非常适合用来渲染焦散（caustics）和困难的光线传播(Specular-Diffuse-Specular (SDS))
![image.png](/upload/2022/03/image-645ff61f4e8f4270b13cf3f0e5be7732.png)
是一个两步的方法：
- 光子追踪。从光源出发的光子打到漫反射的物体时就停止。![image.png](/upload/2022/03/image-0cc65642de0f4fc597d5e59ca13b2c75.png)
- 光子收集。从摄像机打出视线，同样打到漫反射物体就停止。
- 计算局部的密度估计。![image.png](/upload/2022/03/image-f5ff24f0679b4ffa96a15edaeb8ba7f4.png)

有偏但是是一致的方法。
#### Vertex Connection and Merging
将双向路径追踪与光子映射结合起来。
![image.png](/upload/2022/03/image-8155f40b19d04d66bcf4c9cf2e9d41c5.png)
#### 实时辐射度
认为已经被照亮的面都是光源。
![image.png](/upload/2022/03/image-f9ca518bbfe441c78650e914a0bfd02c.png)
会导致窄的缝隙发光。
![image.png](/upload/2022/03/image-f18de1b3aef947a5a20bc48a1acbbc75.png)

## 外观建模
### 非表面模型
#### 散射介质
雾、云。会将光线打到其他方向，会吸收其他方向的光线。
![image.png](/upload/2022/03/image-be2db5205e714200ba8c9ed1f675dbde.png)
#### 头发表现
![image.png](/upload/2022/03/image-8454ca58bc1641b38ad4d4c2db23eeeb.png)
#### 动物毛发
![image.png](/upload/2022/03/image-b02d1362be6d4e0a91d83a14e9f4e530.png)
#### 颗粒材质 Granular Material
一粒一粒的晶体。
![image.png](/upload/2022/03/image-215982285f734364b88439afda5bdb2b.png)
### 表面模型
#### Translucent Material
玉石等物体所具有的材质。
![image.png](/upload/2022/03/image-93ba320aaeea48a7abff502fbb25a7d2.png)
![image.png](/upload/2022/03/image-c2ca35e4f9e644a0b52925a073328e74.png)
这些物体具有次表面散射。
![image.png](/upload/2022/03/image-2f6b4d6c654a40039cc11a1d1f9b9561.png)
#### 布料
![image.png](/upload/2022/03/image-837d5b919ae54c32937f52cc9a213f32.png)
