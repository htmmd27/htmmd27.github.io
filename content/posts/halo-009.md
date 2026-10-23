---
title: "计算机图形学笔记（二）：向量与线性代数1"
date: "2022-03-04T18:23:58.751+08:00"
lastmod: "2022-03-04T22:07:36.788+08:00"
slug: "计算机图形学笔记二线性代数"
draft: false
tags: ["计算机图形学","CG","computergraphic","数学","线性代数"]
categories: ["计算机图形学"]
halo_id: 9
summary: "向量的基本知识"
math: true
aliases: ["/archives/计算机图形学笔记二线性代数/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（二）：向量与线性代数1"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=2)
课件地址： [GAMES101_Lecture_02](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_02.pdf)

图形学依赖于基础数学、物理学、信号处理、数值分析等学科。
**++还需要一点点美学++**

## 向量
### 基本定义
![image.png](/upload/2022/03/image-8802b6e327dc4381a551e661f5fc4b7b.png)
通常由\(\vec{a}\)或\(\vec{AB}\)来表示。
具有**方向**和**长度**。向量的长度由\(||\vec{AB}||\)来表示。
用\(\hat{a}=\vec{a}/|\vec{a}|\)表示单位向量，单位向量经常用来指示方向
### 平行四边形法则和三角形法则
![image.png](/upload/2022/03/image-07a2bcd673f64e128bf4d1204c03153e.png)
### 写法
默认情况下，向量的缺省值为列向量。如下：
\[
\vec{AB}={x\choose y}
\]
### 向量的点乘与叉乘
#### 点乘
![image.png](/upload/2022/03/image-4a42e68efeb5498abd37e91a4b5a2f74.png)
点乘定义为\(\vec{a}\cdot \vec{b}=||\vec{a}||||\vec{b}||cos\theta\)
![image.png](/upload/2022/03/image-3d03d2d0104f4ff28ac38fcaa3b08ee5.png)
满足交换律、结合律、分配率。

在图形学中，点乘最大的意义就是找到两个向量之间的**夹角**

求\(\vec{b}\)在\(\vec{a}\)上的投影:
![image.png](/upload/2022/03/image-2f67c9f374c648e39244b479da4fab73.png)

点乘的好处：
- 分解向量
- 计算两个向量的夹角
- 计算前与后的信息
#### 叉乘
叉乘会计算处与输入向量都垂直的一个向量，他的方向由右手螺旋定则决定。
![image.png](/upload/2022/03/image-a209edd81c914370a3f4f9b9df356ff2.png)

叉乘的规律如下：
![image.png](/upload/2022/03/image-f9e7c02b6b514b6992c5c739bed67e13.png)

叉乘的作用：
- 用来计算z轴
- 判定左右
- 判定内外（某点的叉积一直在左侧或一直在右侧）
![image.png](/upload/2022/03/image-e662b59fedfc4a53a8716d94ab697a75.png)

### 直角坐标系
#### 定义（右手坐标系）
![右手坐标系](/upload/2022/03/image-6fac1cc0de274813890033cafc11810c.png)
