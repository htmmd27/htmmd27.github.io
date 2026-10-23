---
title: "计算机图形学笔记（十八）：光线追踪--辐射度量学、渲染方程与全局光照"
date: "2022-03-14T10:49:07.997+08:00"
lastmod: "2022-03-15T16:53:37.928+08:00"
slug: "2022-03-14-10-49-07"
draft: false
tags: ["计算机图形学","CG","computergraphic"]
categories: ["计算机图形学"]
halo_id: 26
summary: "辐射度量学、渲染方程与全局光照"
aliases: ["/archives/2022-03-14-10-49-07/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（十八）：光线追踪--辐射度量学、渲染方程与全局光照"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=15)
课件地址： [GAMES101_Lecture_15](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_15.pdf)

## 辐射度量学
主要学习：如何描述光照；赋予光各种不同空间中的属性如**Radiant flux, intensity, irradiance, radiance**；如何将光以符合物理的形式描述出来。
### Radiant Energy and Flux
> Radiant Energy是指电磁辐射的能量，用焦耳做单位![image.png](/upload/2022/03/image-ed735a67ca884670addef3d547bb90cd.png)
Radiant flux 单位时间的能量，类似于功率，用瓦特(流明)做单位，也可以表示为单位时间内通过感光面的光子数量。![image.png](/upload/2022/03/image-352465f07c474930accc9594c6e69231.png)

![image.png](/upload/2022/03/image-ad3e629f6982499986a9e972cd192990.png)
### Radiant Intensity
Radiant Intensity是指单位立体角的功率。
![image.png](/upload/2022/03/image-0b2d59f37a4f4c5a8a0aa63e7a833ede.png)
立体角是角度在三维空间中的眼延伸，定义如下：
![image.png](/upload/2022/03/image-d8466a1d39ec47ef8ea3fe23d7911999.png)
单位立体角的定义如下：
![image.png](/upload/2022/03/image-192646009795482792f328c9c5cb39a4.png)
#### 点光源
![image.png](/upload/2022/03/image-5e340a8aa79e4166988daee5c4585ee6.png)
### Iradiance
单位面积接收到的光照。面积是指投影到与光线垂直方向的面积。
![image.png](/upload/2022/03/image-bf0485b78c6c49d7a259b11130c0a455.png)
### Radiance
![image.png](/upload/2022/03/image-40b8ef94eb244a8d9513fe0215f333ad.png)
### Irradiance vs. Radiance
![image.png](/upload/2022/03/image-89977b1e4a754cf8bfabf200fea966ba.png) 
### 双向反射分布函数(BRDF)
该函数定义了入射光打到表面之后会如何进行能量的反射。
![image.png](/upload/2022/03/image-aee01f6249fb4b198d26bd75d3b0bffd.png)
#### 反射方程
![image.png](/upload/2022/03/image-43706aa0ac5f48d69a170195f6796ef9.png)
出射的光线可能成为其他物体的光源。
#### 渲染方程
物体本身的发光与反射的光的加和。
![image.png](/upload/2022/03/image-24ce6b6ae08543eeb8412fa4b8bec126.png)
![image.png](/upload/2022/03/image-31df794d5d594608bf743677b2307b8a.png)
全局光照一定会收敛到某一个固定值。
