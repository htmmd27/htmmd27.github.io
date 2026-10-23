---
title: "计算机图形学笔记（四）：变换（二维）"
date: "2022-03-05T09:25:37.874+08:00"
lastmod: "2022-03-05T14:19:43.012+08:00"
slug: "计算机图形学笔记变换二维"
draft: false
tags: ["计算机图形学","CG","computergraphic","线性代数"]
categories: ["计算机图形学"]
halo_id: 11
summary: "二维下的变换"
math: true
aliases: ["/archives/计算机图形学笔记变换二维/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（四）：变换（二维）"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=3)
课件地址： [GAMES101_Lecture_03](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_03.pdf)
## 变换
描述摄像机的移动，关节的旋转，各种各样的缩放都需要用到变换。同时由三维到二维的投影也属于变换。
![image.png](/upload/2022/03/image-1eeeb13016f24744a24226fec87ebc1a.png)
## 二维的变换
### 缩放 Scale
![image.png](/upload/2022/03/image-0b7fa3ffd3c74a329097dde5dd084e70.png)
可以写做矩阵形式：
![image.png](/upload/2022/03/image-0fdd627c1292402f94b33bf84dfd47a7.png)
其中\(s_x\)与\(s_y\)分别为横纵坐标的缩放比例。
### 反射 Reflection
![image.png](/upload/2022/03/image-bfd033ef107d4b8aae7b26a0b1482d69.png)
### 切变 Shear
![image.png](/upload/2022/03/image-b620208972834a2b835a135438636aac.png)
它的变换矩阵为：
![image.png](/upload/2022/03/image-2fbf276cca604aaf970bafce50dcecf3.png)
### 旋转
二维的旋转，默认以（0,0）为原点进行逆时针旋转。
![image.png](/upload/2022/03/image-0b24004ecb7348308962d124bda0c5de.png)
设旋转角度为\(\theta\),则其旋转矩阵为：
![image.png](/upload/2022/03/image-045032516aa24e64bd81eec8bcdc702f.png)
### 线性变换
上述提到的几种变换都属于线性变换。
![image.png](/upload/2022/03/image-c5deca596fbd4bfbb6335d05fcb44a9f.png)
## 齐次坐标 Homogeneous coordinates
### 平移变换
![image.png](/upload/2022/03/image-773fd3a4c778411fbc2eecd590ae7a16.png)
平移变换不是线性变换。
![image.png](/upload/2022/03/image-e1906d49b56a41ec83bcbb4862a6db2b.png)
但是我们不希望单独去考虑平移，不想把它当做特殊的变换，所以引入了齐次坐标。
通过增加一个维度，来统一变换。保证了正常的运算。
- vector + vector = vector
- point – point = vector
- point + vector = point
- point + point = ??
其中，point + point = 2，可以表示为两个点的中点。原因如下：在齐次坐标中，一个点可以表示为下图，当两个点相加则得到了两点的中点，即\(x=x/2, y=y/2, w = 1\)
![image.png](/upload/2022/03/image-78696eef11854eba8b4c0e7013aa9974.png)

![image.png](/upload/2022/03/image-434a62a653e04e1389a5418246aa5d51.png)
由于向量具有平移不变性，所以将其第三维设置为0。
### 齐次坐标下的变换
将齐次坐标下的变换称为仿射变换(Affine Transormations)。
![image.png](/upload/2022/03/image-86f070a38e944d5c8afbc9bfe1676875.png)
可以讲缩放、旋转、平移的转换矩阵写出，如下图：
![image.png](/upload/2022/03/image-295bed4d5dce4b1992695b76e3c8bc0b.png)
### 逆变换
![image.png](/upload/2022/03/image-bdc83f59cba741d2a73c4991f46026f2.png)
其中\(M^{-1}\)为\(M\)的逆矩阵。
### 变换的组合
- 复杂的变换可以通过一系列简单的变换得到
- 变换的顺序可能导致变换的结果改变
![image.png](/upload/2022/03/image-e0d9e109cfbd4cca882ed349dcadaea4.png)
![image.png](/upload/2022/03/image-07895b167eb041c89d70a8a58eabbcfe.png)
其变换矩阵为，从右到左依次应用变换操作：
![image.png](/upload/2022/03/image-58ea187890f34cdd951f9144b819fb57.png)
### 复杂变换的分解
以点c旋转
![image.png](/upload/2022/03/image-c719c5e20d5c4f82a4812ee6565357b2.png)
可以把他理解为经过三次变换后的操作
- 先移动到原点
- 以原点进行旋转
- 平移回c点
其变换矩阵为：
![image.png](/upload/2022/03/image-02e1fd20989a430582b6afbf08edec41.png)
