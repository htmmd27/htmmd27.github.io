---
title: "计算机图形学笔记（五）：变换（三维）"
date: "2022-03-05T14:22:13.176+08:00"
lastmod: "2022-03-07T10:03:39.907+08:00"
slug: "计算机图形学笔记五变换三维"
draft: false
tags: ["计算机图形学","CG","computergraphic","线性代数"]
categories: ["计算机图形学"]
halo_id: 12
summary: "课程地址： game101课件地址： GAMES101_Lecture_04"
math: true
aliases: ["/archives/计算机图形学笔记五变换三维/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（五）：变换（三维）"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=4)
课件地址： [GAMES101_Lecture_04](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_04.pdf)
## 变换（三维）
三维下的变换同理可以应用齐次坐标的形式，通过添加一个维度表示三维空间下的点与向量。
![image.png](/upload/2022/03/image-1a29029f1f96466f94c46df43489fd5b.png)
使用齐次坐标描述的矩阵来表示变换。
![image.png](/upload/2022/03/image-3a9072b6304a4a9a99f04ae87fe12518.png)
对于当前的仿射矩阵，变换的顺序永远为先进行线性变换在进行平移变换。其中，\(t_x\),\(t_y\),\(t_z\)表示三维下平移的量，a-i表示旋转以及缩放操作。
> 如果想求一个旋转的逆旋转，只需要将正向旋转的矩阵转置即可得出逆旋转的矩阵。互为正交矩阵。
### 缩放
三维下的缩放矩阵如下图所示：
![image.png](/upload/2022/03/image-f7b89a00d36243a1bac7cee6dd5d8a22.png)
### 变换
三维下的变换矩阵如下图：
![image.png](/upload/2022/03/image-6c4565041984481faa2c99545762e18e.png)
### 旋转
三维下的旋转分为对x,y,z轴的旋转，对应三种不同的矩阵：
![image.png](/upload/2022/03/image-ec99c6e2bce148d4a940384a1e876999.png)
#### 罗德里格斯旋转公式(Rodrigues’ Rotation Formula)
绕任意一轴的旋转公式可以写为：
![image.png](/upload/2022/03/image-c61acf18052942ecb6dfc324291130c2.png)
