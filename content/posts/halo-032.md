---
title: "计算机图形学笔记（二十二）：动画与模拟1"
date: "2022-03-17T14:54:06.536+08:00"
lastmod: "2022-03-18T13:40:51.944+08:00"
slug: "计算机图形学笔记二十二动画与模拟1"
draft: false
tags: ["计算机图形学","CG","computergraphic"]
categories: ["计算机图形学"]
halo_id: 32
summary: "动画与模拟1"
math: true
aliases: ["/archives/计算机图形学笔记二十二动画与模拟1/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（二十二）：动画与模拟1"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=21)
课件地址： [GAMES101_Lecture_21](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_21.pdf)

## 动画
在图形学中，动画可以理解为建模或者几何的一种扩展。
### 关键帧动画
![image.png](/upload/2022/03/image-f9aaf710b9124cc9a7d08a342b8fd8a2.png)
使用插值技术进行动画补全。
![image.png](/upload/2022/03/image-2a5da1f5efaa4c2ea5197ffbd2a279da.png)

### 物理仿真
#### 质点弹簧系统
一系列相互连接的质点和弹簧。一个理想化的弹簧如下：
![image.png](/upload/2022/03/image-cc141865d8b1419aa99400af379be26a.png)
没有长度，且拉开多长就会产生多大的力。满足胡克定律。
然鹅真实的弹簧不可能没有长度，所以会有一个松弛长度\(l\)，满足下面的公式：
![image.png](/upload/2022/03/image-08c3b659498b4877b563146d3ccc37ba.png)
上述模型会导致弹簧无限震动，所以引入一个摩擦力\(f\)
![image.png](/upload/2022/03/image-de33b3ec10cf474c932f3977f57ac147.png)
该摩擦力只能描述弹簧外部的力，不能描述弹簧内部的力。该力与两个质点的相对速度有关系，得到下式：
![image.png](/upload/2022/03/image-31c1d6bd2e1f417abcc67860e8836f17.png)

![image.png](/upload/2022/03/image-d28c645452f548d7afc001425a6715b1.png)
通过不断的设计改进，可以设计出布料的质点弹簧系统。

#### 粒子系统
定义每个粒子受到的力，将其描述出来并进行模拟。
![image.png](/upload/2022/03/image-0932b731b30f4ef9b40e8bdc565e7e99.png)
粒子与粒子之间会存在各种的作用力：
- 重力，电磁力...
- 斥力...
- 粘滞力，空气阻力...
- ...

### 运动学
描述骨骼系统，跟人类类似，定义不同的关节，形成复杂的模型。
![image.png](/upload/2022/03/image-52e0e582ad9e49828b8761dfdebea07c.png)
### 逆运动学
通过移动尖端的位置，自动调节各个关节的运动。
![image.png](/upload/2022/03/image-aa1f7289767d4029bb812033cbde458c.png)

### Rigging
给模型添加各种不同的动作，骨骼绑定。
![image.png](/upload/2022/03/image-4a020509144b4ec39ee3962beb36e084.png)
