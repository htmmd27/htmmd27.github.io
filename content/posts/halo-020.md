---
title: "计算机图形学笔记（十二）：着色(Shading)--插值与高级纹理映射"
date: "2022-03-11T12:46:30.899+08:00"
lastmod: "2022-03-11T16:19:05.016+08:00"
slug: "计算机图形学笔记十二着色shading--插值与高级纹理映射"
draft: false
tags: ["计算机图形学","CG","computergraphic"]
categories: ["计算机图形学"]
halo_id: 20
summary: "插值与高级纹理映射"
math: true
aliases: ["/archives/计算机图形学笔记十二着色shading--插值与高级纹理映射/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（十二）：着色(Shading)--插值与高级纹理映射"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=9)
课件地址： [GAMES101_Lecture_09](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_09.pdf)

## 插值
### 重心坐标
> - 很多操作都是基于三角形节点来做的
> - 为了使三角形内部的平滑过渡

为了定义三角形内部的插值，如*纹理、颜色、法线*，引入了**重心坐标**。
![image.png](/upload/2022/03/image-4892a7fb208b4031b3ad3d255788581d.png)
三角形所在平面的点都可以通过上式来表示出来，当点在三角形内部时\(\alpha,\beta,\gamma\)均大于0。
![image.png](/upload/2022/03/image-bec07a93da744943878b7924c6c52b65.png)
重心坐标也可以通过上式求出，其中\(A_A,A_B,A_C\)为对应的三角形的面积。三角形重心的重心坐标为\((1/3,1/3,1/3)\)。
若给定某个点在坐标系中的坐标\((x,y)\),则其重心坐标为
![image.png](/upload/2022/03/image-22439b42133b4646810e48e40262b014.png)
在求出任意一点的重心坐标后，就可以求出该点在三角形中的插值，即将属性信息与重心坐标结合起来。
![image.png](/upload/2022/03/image-9bbf271b1a954899a2a032e1bfeebae8.png)
重心坐标有一个问题，在投影下不能保证重心坐标是不变的。投影前后的重心坐标会发生改变。三维空间中的属性建议在三维中做差值然后再进行投影。

## 纹理的应用
### 简单映射
- 对于每一个渲染的像素，根据像素的坐标(x,y)找到纹理中对应的坐标(u,v)。
- 记录纹理(u,v)的颜色
- 将像素的颜色设置为纹理的颜色。

会产生以下问题：
#### 纹理放大
![image.png](/upload/2022/03/image-c276cb24ed70487486dff8e1fa4b1d2e.png)
原因是纹理过小而物体过大，映射到了纹理上的非整数点导致取整。
![image.png](/upload/2022/03/image-51dc0b7e9399404aa4be0fcd84ec4f02.png)
解决方法：
1. 双线性插值(Bilinear)
![image.png](/upload/2022/03/image-ba2a2c4e28334068a215971da872c7f0.png)
先对水平方向做两次辅助插值，再对竖直方向做一次插值。反之也成立。
2. Bicubic

#### 远处摩尔纹，近处锯齿多
由于纹理过大产生了走样。
![image.png](/upload/2022/03/image-6ae9f45abe8c4d67baff0a84839e19df.png)
接近地平线的部分像素会覆盖很大一片区域的纹理，不能简单的进行采样。
![image.png](/upload/2022/03/image-1fb07be0bd9a40b9b253d0c133ad5957.png)
解决方法：
1. 超采样，但是会增加计算量![image.png](/upload/2022/03/image-2da072921d3041619c1b0c613dd768f7.png)
2. Mipmap，允许做范围查询（快速，近似，正方形），会引入额外的存储量，大约为三分之一。![image.png](/upload/2022/03/image-56f4fdcf401b4342a86824d7b8dce033.png)![image.png](/upload/2022/03/image-96ae9ff7fc404e378856ba69b44af06d.png)
3. 三线性插值(Trilinear Interpolation)![image.png](/upload/2022/03/image-80fd5fe513a44921bf1d65de8db7d061.png)

> mipmap的局限性，会导致远处过模糊(Overblur)![image.png](/upload/2022/03/image-f335cab8432b4736be8da5a6377c71f0.png)![image.png](/upload/2022/03/image-110d60cae2954116a3627e17d5a53d8f.png)使用各向异性过滤可以解决该问题。

4. 各向异性过滤，对于矩形部分的查询会有更好的支持，但是斜向的还是无法解决。开销是原来的三倍。![image.png](/upload/2022/03/image-52f8e9a5c89e445386f059f2ee37e064.png)

### 纹理的应用
![image.png](/upload/2022/03/image-7471013fe4cb4519bbde74157c7f9fa4.png)
#### 环境贴图
![image.png](/upload/2022/03/image-1fcbadb5c66a42899ae484f1cee2cd04.png)
使用纹理去描述环境光。假设光从无限远处来，没有实际深度意义。
##### 球形
环境光可以通过记录在球面上存储，假设有一个光滑的镜面反射球，并展开。
![image.png](/upload/2022/03/image-c130c3a7c8074e169c7deca5f29cff48.png)
但是会存在一定程度上的扭曲。
![image.png](/upload/2022/03/image-8fce9a2c1fc948819cc42ea775c50c71.png)
##### 立方体
![image.png](/upload/2022/03/image-550ee31cd45a4a9e95c3715da47acd5c.png)
在一定程度上解决扭曲问题，但是会进行额外计算。
![image.png](/upload/2022/03/image-80f53ae68b73450188f07bd767434e05.png)
#### 凹凸贴图
在不把几何形体变复杂的情况下，通过定义纹理来定义凹凸。
![image.png](/upload/2022/03/image-6d13177c37f14a52bf58b5c9aaaea2d9.png)
#### 位移贴图
在纹理中改变了顶点位置。他要求模型本身的三角形比较细分。
![image.png](/upload/2022/03/image-9ae9eead50b5419693262a356ab0958c.png)
