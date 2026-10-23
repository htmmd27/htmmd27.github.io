---
title: "计算机图形学笔记（十五）：几何--网格与阴影"
date: "2022-03-12T19:45:53.805+08:00"
lastmod: "2022-03-13T14:42:31.937+08:00"
slug: "计算机图形学笔记十五几何--网格与阴影"
draft: false
tags: ["计算机图形学","CG","computergraphic"]
categories: ["计算机图形学"]
halo_id: 23
summary: "网格与阴影"
math: true
aliases: ["/archives/计算机图形学笔记十五几何--网格与阴影/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（十五）：几何--网格与阴影"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=12)
课件地址： [GAMES101_Lecture_12](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_12.pdf)

## 网格
### 网格细分(Mesh Subdivision)
![image.png](/upload/2022/03/image-a413c0b9a34345498c1ed40e404aefea.png)
- 分出更多的三角形
- 使原来的模型发生一些改变，看起来更加光滑

#### Loop细分(Loop是名字，不是循环)
- 将每个三角形拆分成4个。![image.png](/upload/2022/03/image-655fa2dcd2284e6ea84e43be859ef5b9.png)
- 调整三角形的位置，对于新旧顶点进行不同的更新操作。![image.png](/upload/2022/03/image-74f50969353d4b9eb2569364dccf2d12.png)
##### 更新新的顶点的位置
![image.png](/upload/2022/03/image-2fb702103bb24fc197e0cb7020dcfce1.png)
##### 更新旧的顶点的位置
![image.png](/upload/2022/03/image-1f22f2f5ce554f7cb35e3b7a520f0559.png)
\(n\)为顶点的度，\(u\)与\(n\)的值有关。
#### Catmull-Clark细分（一般的网格）
定义四边形面与非四边形面。对于度不为4的点，将其定义为奇异点。
![image.png](/upload/2022/03/image-731a568e07da4d3abb0b0aa5075a594a.png)
在每次细分操作中:
- 每个面都取中心点。
- 每条边都取中点。
- 将中心点与中点进行连接。

经过一次细分后，所有的非四边形面都会消失，细分前的非四边形面会在细分后变成奇异点，之后的细分再也不会增加。
更新规则如下：
![image.png](/upload/2022/03/image-9c6b0112911a45a89a1b1a8d6ba56376.png)

### 网格的简化(Mesh Simplication)
![image.png](/upload/2022/03/image-3cb4b701501c4a8fb42f972efd638acf.png)
通过减少三角形的数量来减少计算量，并维持物体形状基本不变。
#### 边坍缩(Edge Collapse)
![image.png](/upload/2022/03/image-fb85af7e1cea46b390d533fb08b967ee.png)
##### 二次误差度量
使坍缩后的点到坍缩前的面的距离的平方和最小。
![image.png](/upload/2022/03/image-fed3734f731345c883cb358f027b9551.png)
对于要坍缩的边，对其二次误差度量进行排序，优先坍缩误差最小的边。但是会引起其他边的变化，需要动态更新其他受影响的元素。
![image.png](/upload/2022/03/image-2da7f51f25874cdebce8e4510da17df9.png)

### 网格正则化(Mesh Regularization)
![image.png](/upload/2022/03/image-005fc1823b9f4eb990f0fa3e5dd12d08.png)

## 阴影
### Shadow Mapping
本质上是图像空间的做法。会产生走样问题。（点光源）
> 核心思路：如果某一个点不在阴影中，那么认为摄像机与光源皆能看到这个点。

- 从光源看向场景，记录深度![image.png](/upload/2022/03/image-14be7006177746edaaca1a9a33ef3c2a.png)
- 从摄像机看向场景![image.png](/upload/2022/03/image-3e033ac89cd24bd4917b02a6de09823c.png)
- 通过投影变换比较深度，如果相同同时看见该点。![image.png](/upload/2022/03/image-c10f3bb03c7843b8984da72429dd9f0f.png)

由于浮点数的精度问题，会产生走样。![image.png](/upload/2022/03/image-67439106b69a48bfbf5e5da85258ef13.png)
