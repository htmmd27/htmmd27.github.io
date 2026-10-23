---
title: "计算机图形学笔记（二十）：材质与外观"
date: "2022-03-16T08:53:51.195+08:00"
lastmod: "2022-03-16T10:03:24.264+08:00"
slug: "计算机图形学笔记二十材质与外观"
draft: false
tags: ["计算机图形学","CG","computergraphic"]
categories: ["计算机图形学"]
halo_id: 30
summary: "材质与外观"
aliases: ["/archives/计算机图形学笔记二十材质与外观/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（二十）：材质与外观"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=17)
课件地址： [GAMES101_Lecture_17](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_17.pdf)

## 材质
计算机图形学中的材质是指BRDF。
### 漫反射材质
![image.png](/upload/2022/03/image-f8b647b751e44d30a43d2a5f367a0b57.png)
假设入射能量与出射能量相同，可以得出：
![image.png](/upload/2022/03/image-6d20f5afe7914dbfbf983ce5ab7b857e.png)
### Glossy材质
![image.png](/upload/2022/03/image-ffa6dc00564645a9a0390567c6cdb4bc.png)
### 反射/折射材质
![image.png](/upload/2022/03/image-26495d7e211c47f2986ea55313078b38.png)
#### 斯内尔定律
![image.png](/upload/2022/03/image-2fdad10185e949e59ea81e76d9be39a0.png)
当入射的介质折射率大于出射的介质的折射率时，会发生全反射现象。
#### 菲涅尔项
![image.png](/upload/2022/03/image-a5660c700d1d44f88a2260ad8c6ccc37.png)
### 微表面模型
只要离物体足够远看向该物体时，看不到物体表面微小的细节，假设物体表面是粗糙的，但是从远处看就像是平的。
![image.png](/upload/2022/03/image-f02fd7e819a74603ac56d9427f630eb5.png)
![image.png](/upload/2022/03/image-6d3dafa8b66f4ea48bd871ec2d8cccd5.png)
微表面的BRDF
![image.png](/upload/2022/03/image-7186ba34c3634dbf9f8c27227e0b52ee.png)
### 各向同性/各向异性材质
![image.png](/upload/2022/03/image-643031c4c87f40c9b222fefdb8641458.png)
### BRDF的性质
- 非负![image.png](/upload/2022/03/image-252ad4998d2644a8b9ad3a63fbdaa8fb.png)
- 线性性质
- 可逆性![image.png](/upload/2022/03/image-939f7f1f49d84ed48803a3ec6d4e728e.png)
- 能量守恒![image.png](/upload/2022/03/image-c79599a2484f4829b5a38ec47a150821.png)
- 各向同性/各向异性![image.png](/upload/2022/03/image-01ce06df1f444d4a8aebd0dee7baacc1.png)
