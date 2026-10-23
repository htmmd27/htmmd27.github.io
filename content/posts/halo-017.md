---
title: "计算机图形学笔记（九）：着色(Shading)--布林冯模型"
date: "2022-03-09T21:29:16.301+08:00"
lastmod: "2022-03-10T21:37:12.308+08:00"
slug: "计算机图形学笔记九着色shading--布林冯模型"
draft: false
tags: ["计算机图形学","CG","computergraphic"]
categories: ["计算机图形学"]
halo_id: 17
summary: "布林冯模型"
math: true
aliases: ["/archives/计算机图形学笔记九着色shading--布林冯模型/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（九）：着色(Shading)--布林冯模型"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=7)
课件地址： [GAMES101_Lecture_07](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_07.pdf)
## 着色
在图形学中，**着色**定义成对不同的物体应用不同的材质。不同的材质与光线作用的方式不同。
### Blinn-Phong Reflectance Model 布林-冯反射模型
![高光、漫反射与环境光照](/upload/2022/03/image-74d87f9f988c4d1ab13b604419d8b050.png)
对于某一个着色点(Shading Point)，定义其法线**n**，观测方向**v**与光照方向**l**，且三个方向都为单位向量，长度为1；还需定义物体表面的属性。
![image.png](/upload/2022/03/image-0e6132a4e0e642e698da582b294280b7.png)
考虑任何一个点的情况，而不是整个物体，所以着色不会产生**阴影**，即着色具有局部性！
![image.png](/upload/2022/03/image-1c0ad3a6082e4ffcb8109100afa7090e.png)
#### 漫反射
打到物体上的光线会向各个方向均匀反射。
![image.png](/upload/2022/03/image-ff0d19b317f34481b073ac0c98e97129.png)
光线与法线的夹角的大小决定了物体表面的明暗。
![image.png](/upload/2022/03/image-0dcb32f787aa44e3815df55c0082b2c7.png)
兰伯特余弦定律：\(cos\theta=\vec{l}\cdot\vec{n}\)
##### 光的产生
对于点光源，无时无刻不在向四面八方辐射能量，我们认为某个时刻能量集中在一个球壳上。根据能量守恒定律，近处球壳的能量与远处球壳的能量相同，定义点光源在中心强度为*I*，在半径为r的球壳上的密度为\(I/r^2\)。
![image.png](/upload/2022/03/image-be47b1cb5e0b4d1fabf02d07fcd9ffb5.png)
##### 漫反射的明暗计算公式
![image.png](/upload/2022/03/image-dd0f274d5b3a46da812fe025e9e87b03.png)
通过着色点与光源的距离*r*和兰伯特余弦定律和着色点的漫反射系数\(k_d\),可以求出漫反射\(L_d\)。由于漫反射是均匀的，所以与观察的方向没有关系。
#### 高光
当观测方向与镜面反射方向足够接近时，会产生高光。
当入射方向与出射方向的角平分线向量\(h\)与法线向量\(n\)接近时，能看到高光。
![image.png](/upload/2022/03/image-bf6f84c054fd44ce928642f6b2afa05e.png)
\(k_s\)为高光反射系数。
![image.png](/upload/2022/03/image-6227d57646584e188ece7b56b59f0455.png)
由于余弦函数容忍度过高，所以加上了指数\(p\)。在布林冯模型中，\(p\)可能会用到100-200。
![image.png](/upload/2022/03/image-90db4f6a3a824a8d9985e74fb5175be9.png)
#### 环境光
我们假设任何一个点接收到的环境光强度是一样的。与观测方向和法线无关，是一个常数。
![image.png](/upload/2022/03/image-ee42746dd7bc4e789e20dbc938dcbb17.png)
#### 布林冯反射模型计算公式
计算公式为以上三式相加。
![image.png](/upload/2022/03/image-c3b2cff041da4187a4061a5dab6c6ecd.png)
