---
title: "计算机图形学笔记（七）：光栅化--三角形的离散化"
date: "2022-03-08T09:47:34.953+08:00"
lastmod: "2022-03-08T13:31:04.369+08:00"
slug: "计算机图形学笔记七光栅化1"
draft: false
tags: ["计算机图形学","CG","computergraphic"]
categories: ["计算机图形学"]
halo_id: 14
summary: "课程地址： game101课件地址： GAMES101_Lecture_04"
math: true
aliases: ["/archives/计算机图形学笔记七光栅化1/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（七）：光栅化--三角形的离散化"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=5)
课件地址： [GAMES101_Lecture_05](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_05.pdf)
## 光栅化
对于透视投影，需要进行两个定义，即垂直可视角度与长宽比。
![image.png](/upload/2022/03/image-434af07e93154f779eec59708829a90d.png)
那么可以将可视角度与之前定义的立方体进行转换
![image.png](/upload/2022/03/image-cd402cffaa644c448b2fff381a2b24c4.png)
在做完MVP转换后，所有的物品都会停留在\([-1,1]^3\)的经典的立方体上。在这之后要把其画在屏幕上。
### 屏幕
屏幕是一个典型的光栅成像设备。光栅化的过程就是将立方体绘制到屏幕上的过程。
### 像素
对于本课程来说，像素是最小的单位，可以看做一个小方块。是由红、绿、蓝三种颜色组合出来的，同时一个像素内颜色不会发生差异。
### 屏幕空间
屏幕的左下角定义为原点。
![image.png](/upload/2022/03/image-112eaee3a5294f9f99b9b71396962628.png)
像素的坐标为整数形式，范围是\((0,0)-(width-1,height-1)\),每个像素的中心坐标为\((x+0.5,y+0.5)\)。屏幕的覆盖范围是\((0,0)-(width,height)\)。

我们要做的事情就是将标准立方体映射到屏幕空间中。
![image.png](/upload/2022/03/image-c7f4e998b7e543a8879be0f7abae8a65.png)
暂时不管z轴方向，对于x与y轴，转换方式为从\([-1,1]^2\)到\([0,width]*[o,height]\)。其转换矩阵为：
![image.png](/upload/2022/03/image-7d5f95ad07df4ac38d52265a5dee26ac.png)
该变换被称为视口变换(Viewport Transformation)

## 三角形
![image.png](/upload/2022/03/image-507a14a06bd14185b8bc5289edb4f315.png)
三角形为基础多边形，任意多边形都可以拆分成多个三角形。且三角形的三个点一定在同一平面，且内外定义很清晰。通过定义三角形的三个顶点，三角形内部的属性也可确定。
## 通过采样进行光栅化
![image.png](/upload/2022/03/image-e5942b21a33c4541b00411b54243c739.png)
利用像素的中心对屏幕空间进行采样。采样方程如下：
![image.png](/upload/2022/03/image-8463610a5d194b1ab09755a734926734.png)
代码如下
```c++
for (int x = 0;x < xmax; ++x)
	for(int y =0; y < ymax; ++y)
		image[x][y] = inside(tri, x + 0.5, y + 0.5);
```

对于中心点与三角形重合的情况，需要自己定义该点与三角形的位置关系。
![image.png](/upload/2022/03/image-6196f0fa51794e2f99c4a3259abea070.png)
由于三角形所占空间只是真个屏幕空间很小的部分，所以不需要循环整个屏幕空间，只需要对包围盒(Bounding Box)内的点进行判断即可。

对于窄长或者有旋转角度的三角形，可以利用下面方法进行采样，即考虑每一行的最左最右。
![image.png](/upload/2022/03/image-c6c79aedcafd4d678138bc3a41d15540.png)

采样之后的样子如下图所示
![image.png](/upload/2022/03/image-32a4c2a524bf46e0bcc054d04a867fab.png)
很明显，可以看到锯齿的存在。
