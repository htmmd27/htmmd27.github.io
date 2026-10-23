---
title: "计算机图形学笔记（十六）：光线追踪--Whitted Style Ray Tracing"
date: "2022-03-13T18:06:01.453+08:00"
lastmod: "2022-03-13T22:47:01.665+08:00"
slug: "计算机图形学笔记十六光线追踪--whittedstyleraytracing"
draft: false
tags: ["计算机图形学","CG","computergraphic"]
categories: ["计算机图形学"]
halo_id: 24
summary: "Whitted Style Ray Tracing与包围盒"
math: true
aliases: ["/archives/计算机图形学笔记十六光线追踪--whittedstyleraytracing/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（十六）：光线追踪--Whitted Style Ray Tracing"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=13)
课件地址： [GAMES101_Lecture_13](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_13.pdf)

## 光线追踪
光栅化不能解决全局化的效果，比如：
- 软阴影
- 光线多次反射

 ![image.png](/upload/2022/03/image-c134d40ef56f410a8dec01487129e171.png)
光线追踪虽然准确但是速度很慢。
### 基础光线追踪算法
什么是图形学中的光线？
- 首先光线是沿着直线传播的。
- 光线之间不会发生碰撞。
- 光线最终进入人的眼睛。（光路的可逆性）
#### 光线投射（Ray Casting）
- 对于每个像素，从摄像机打出一根光线。![image.png](/upload/2022/03/image-d93cef343fc74af7838fac57ac1e5dff.png)
- 将打到物体上的点与光源连线，判断该点是否在阴影内。![image.png](/upload/2022/03/image-8e78d1f596c246148382a1296fcb3f58.png)

#### Recursive (Whitted Style) Ray Tracing
- 对于每个像素，从摄像机射出的光线可以进行多次反射与折射。![image.png](/upload/2022/03/image-a0e12bec73dc4e2aa2b4d353e4d86d1e.png)
- 对于一条光线打到的所有点，都与光源进行连线并进行判断。![image.png](/upload/2022/03/image-207fb208c95b4fd18ee0380b09bdb026.png)
- 将所有算出的着色值都加起来并反映到像素中。

### 相关计算
#### 计算光线与物体的交点
光线被定义为一条射线，有一个起点和方向。
![image.png](/upload/2022/03/image-1a2f377bd73146e98eef3f5cde5031e7.png)
光线上的某一点可以表示为：\(r(t)=\vec{o}+t\vec{d}\)
对于由隐式函数定义的物体表面\(p:f(p)=0\),有\(f(\vec{o}+t\vec{d})=0\),解出正的实数解。
#### 光线和三角形求交
- 计算三角形所在的平面与光线的交点
- 判断交点是否在三角形内![image.png](/upload/2022/03/image-7080f6b92e8f4eb3a2504957eaccce1b.png)

平面可以通过法线和平面上的一个点进行定义。
![image.png](/upload/2022/03/image-872f43a2044243ce82360fd76b534184.png)
求出光线与平面的交点：
![image.png](/upload/2022/03/image-9b8e3cd5211a4d1880c4d4e523dfe915.png)

#### Möller Trumbore Algorithm
该算法旨在直接求出交点。
![image.png](/upload/2022/03/image-6c62c08bd8424063b1013d36b0b3e488.png)
三个方程，三个未知数，最后结果若\(t>=0\)且\(b_1,b_2,1-b_1-b_2\)均大于0，则交点在三角形内部。
### 加速光线与表面求交
简单的求交需要对所有三角形进行遍历求交，速度很慢。
![image.png](/upload/2022/03/image-04c90468d27247cbac7742153dbbe53a.png)
#### 包围盒(Bounding Volume)
用一个简单的物体把复杂的物体包围起来。
![image.png](/upload/2022/03/image-2aaa550608cb4e24a8c225b439c47549.png)
定义长方体为三个对面形成的交集，轴对齐包围盒 （Axis-Aligned
Bounding Box (AABB) ）若光线不与包围盒相交，则一定不与包围盒内的物体相交。
![image.png](/upload/2022/03/image-0c8a111455544429a19219f78e990323.png)
#### 光线与包围盒求交
对于二维的情况，光线与两组对面相交的时间的交集为在包围盒内部通过的时间。![image.png](/upload/2022/03/image-dbb5efba4cea421cb321ab7b8d1f0701.png)
对于三位的情况，可以推出:
- 当且仅当光线进入三组对面时，才算进入了包围盒。
- 当光线从任意对面射出说明光线出了包围盒。

对每一个对面，计算\(t_{min}\)与\(t_{max}\)，\(t_{enter} = max\{t_{min}\}, t_{exit} = min\{t_{max}\}\),如果\(t_{enter}<t_{exit}\)

然而光线是一条射线，不存在t小于0的情况。若结果\(t_{exit}<0\),则说明盒子在光线背后；若\(t_{exit} >= 0\)且\(t_{enter} < 0\),则说明光源在盒子内部；综上所述，当且仅当\(t_{enter}<t_{exit}\)且\(t_{exit}>=0\)。
