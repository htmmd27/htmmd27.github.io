---
title: "计算机图形学笔记（六）：视图变换"
date: "2022-03-07T10:03:55.073+08:00"
lastmod: "2022-03-08T10:07:52.335+08:00"
slug: "计算机图形学笔记六视图变换"
draft: false
tags: ["计算机图形学","CG","computergraphic","线性代数"]
categories: ["计算机图形学"]
halo_id: 13
summary: "主要介绍视图变换"
math: true
aliases: ["/archives/计算机图形学笔记六视图变换/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（六）：视图变换"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=4)
课件地址： [GAMES101_Lecture_04](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_04.pdf)
## 视图变换(Viewing Transformation)
试想一下如何拍照
- 首先让摆放好所有物体（model transformation）
- 其次摆好相机找好角度（view transformation）
- 最后进行拍摄，将三维物体投影到二维的照片中（projection transformation）

简称MVP变换。
### 视图变换(View/Camera Transformation)
![image.png](/upload/2022/03/image-82e4e4f2b66549ec86037a5932af6dff.png)
首先需要定义相机的位置，需要三个变量。
- 相机的位置 \(\vec{e}\)
- 相机的朝向 \(\hat{g}\)
- 向上方向 \(\hat{t}\)

将相机固定到原点，设置向上的方向为Y，面向-Z，其他所有物体围绕相机做运动。可以简化运动。
![image.png](/upload/2022/03/image-1a0ba25728374f54bcedca0789e9c117.png)
通过视图变化得到的矩阵\(M_{view}=R_{view}T_{view}\),其中
![image.png](/upload/2022/03/image-3b95a75662514d2c8c79c17a548909f0.png)
即将相机挪到原点。
再通过旋转操作得到旋转矩阵\(R_{view}\),由于正向旋转的操作不好求，我们先求其逆旋转在进行转置即可得出正旋转的矩阵。
![image.png](/upload/2022/03/image-f8389c1947e94ace81dc9e8251dda52c.png)
![image.png](/upload/2022/03/image-ee70d0551bd64d69b0e6509983600a7c.png)
通过上述操作，将世界坐标系转换为以相机为原点的坐标系，所有物体跟随\(M_{view}\)进行移动，保持相对静止。将此变换称为模型视图变换（ModelView Transformation）
### 投影变换
- 正交投影（Orthographic projection）
- 透视投影（Perspective projection）
![image](/upload/2022/03/image-8a41621ec7c642febaa002f2b62aa9d8.png)
正交投影并不会带来近大远小的现象，而透视投影会。
![image](/upload/2022/03/image-81be94eea02540e08d124212692b4337.png)
#### 正交投影
正交投影的步骤：
- 将相机固定到原点，面向-Z，将上方向固定为Y
- 去除物体的Z轴
- 将物体缩放进> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=4)
课件地址： [GAMES101_Lecture_04](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_04.pdf)
## 视图变换(Viewing Transformation)
试想一下如何拍照
- 首先让摆放好所有物体（model transformation）
- 其次摆好相机找好角度（view transformation）
- 最后进行拍摄，将三维物体投影到二维的照片中（projection transformation）

简称MVP变换。
### 视图变换(View/Camera Transformation)
![image.png](/upload/2022/03/image-82e4e4f2b66549ec86037a5932af6dff.png)
首先需要定义相机的位置，需要三个变量。
- 相机的位置 \(\vec{e}\)
- 相机的朝向 \(\hat{g}\)
- 向上方向 \(\hat{t}\)

将相机固定到原点，设置向上的方向为Y，面向-Z，其他所有物体围绕相机做运动。可以简化运动。
![image.png](/upload/2022/03/image-1a0ba25728374f54bcedca0789e9c117.png)
通过视图变化得到的矩阵\(M_{view}=R_{view}T_{view}\),其中
![image.png](/upload/2022/03/image-3b95a75662514d2c8c79c17a548909f0.png)
即将相机挪到原点。
再通过旋转操作得到旋转矩阵\(R_{view}\),由于正向旋转的操作不好求，我们先求其逆旋转在进行转置即可得出正旋转的矩阵。
![image.png](/upload/2022/03/image-f8389c1947e94ace81dc9e8251dda52c.png)
![image.png](/upload/2022/03/image-ee70d0551bd64d69b0e6509983600a7c.png)
通过上述操作，将世界坐标系转换为以相机为原点的坐标系，所有物体跟随\(M_{view}\)进行移动，保持相对静止。将此变换称为模型视图变换（ModelView Transformation）
### 投影变换
- 正交投影（Orthographic projection）
- 透视投影（Perspective projection）
![image](/upload/2022/03/image-8a41621ec7c642febaa002f2b62aa9d8.png)
正交投影并不会带来近大远小的现象，而透视投影会。
![image](/upload/2022/03/image-81be94eea02540e08d124212692b4337.png)
#### 正交投影
正交投影的步骤：
- 将相机固定到原点，面向-Z，将上方向固定为Y
- 去除物体的Z轴
- $[-1,1]^2> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=4)
课件地址： [GAMES101_Lecture_04](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_04.pdf)
## 视图变换(Viewing Transformation)
试想一下如何拍照
- 首先让摆放好所有物体（model transformation）
- 其次摆好相机找好角度（view transformation）
- 最后进行拍摄，将三维物体投影到二维的照片中（projection transformation）

简称MVP变换。
### 视图变换(View/Camera Transformation)
![image.png](/upload/2022/03/image-82e4e4f2b66549ec86037a5932af6dff.png)
首先需要定义相机的位置，需要三个变量。
- 相机的位置 \(\vec{e}\)
- 相机的朝向 \(\hat{g}\)
- 向上方向 \(\hat{t}\)

将相机固定到原点，设置向上的方向为Y，面向-Z，其他所有物体围绕相机做运动。可以简化运动。
![image.png](/upload/2022/03/image-1a0ba25728374f54bcedca0789e9c117.png)
通过视图变化得到的矩阵\(M_{view}=R_{view}T_{view}\),其中
![image.png](/upload/2022/03/image-3b95a75662514d2c8c79c17a548909f0.png)
即将相机挪到原点。
再通过旋转操作得到旋转矩阵\(R_{view}\),由于正向旋转的操作不好求，我们先求其逆旋转在进行转置即可得出正旋转的矩阵。
![image.png](/upload/2022/03/image-f8389c1947e94ace81dc9e8251dda52c.png)
![image.png](/upload/2022/03/image-ee70d0551bd64d69b0e6509983600a7c.png)
通过上述操作，将世界坐标系转换为以相机为原点的坐标系，所有物体跟随\(M_{view}\)进行移动，保持相对静止。将此变换称为模型视图变换（ModelView Transformation）
### 投影变换
- 正交投影（Orthographic projection）
- 透视投影（Perspective projection）
![image](/upload/2022/03/image-8a41621ec7c642febaa002f2b62aa9d8.png)
正交投影并不会带来近大远小的现象，而透视投影会。
![image](/upload/2022/03/image-81be94eea02540e08d124212692b4337.png)
#### 正交投影
正交投影的步骤：
- 将相机固定到原点，面向-Z，将上方向固定为Y
- 去除物体的Z轴
- $中
![image.png](/upload/2022/03/image-7a22ab18e5f948eca36ea6ba3723e477.png)
可得正交投影的矩阵为：
![image.png](/upload/2022/03/image-b7a86e65c01c481f9902b3f35b736434.png)

#### 透视投影
透视投影的步骤：
- 首先将远平面压缩
- 再进行正交投影
![image.png](/upload/2022/03/image-2e98348ff0a3479798070f877f45dc5f.png)
利用相似三角形，可得：
![image.png](/upload/2022/03/image-f996851204f64a78800c5df9acfdd2dc.png)
在其次坐标系下,变换后的点的坐标为：
![image.png](/upload/2022/03/image-4e32620eb15446ccabbe5044c2733fb3.png)
通过推理可得，\(M_{persp->ortho}\)如下：
![image.png](/upload/2022/03/image-76f04ed2738c470b8b80ae21b8ab359c.png)
![image.png](/upload/2022/03/image-4d992b0adc19448eb62350a7fb79831e.png)
由于在近平面的z轴坐标经过变换不会发生改变，即n->n;远平面中心点经过变化后z轴坐标不会发生变换。可得下面两式：
![image.png](/upload/2022/03/image-32b51c7d90614e1c93c53a059af2eb24.png)
![image.png](/upload/2022/03/image-d8f88d636c034c94b2ece4e4a8e8cc09.png)
![image.png](/upload/2022/03/image-c7f1f963e04a4e3a840eb2a94a91e5e1.png)
解得A,B为：
![image.png](/upload/2022/03/image-e406d032f1f2403ea4ace9d620bc57e7.png)
