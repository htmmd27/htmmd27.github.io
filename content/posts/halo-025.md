---
title: "计算机图形学笔记（十七）：光线追踪--加速结构"
date: "2022-03-14T09:35:09.827+08:00"
lastmod: "2022-03-15T09:59:03.622+08:00"
slug: "计算机图形学笔记十六光线追踪--加速结构"
draft: false
tags: ["计算机图形学","CG","computergraphic"]
categories: ["计算机图形学"]
halo_id: 25
summary: "加速结构"
aliases: ["/archives/计算机图形学笔记十六光线追踪--加速结构/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（十七）：光线追踪--加速结构"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=14)
课件地址： [GAMES101_Lecture_14](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_14.pdf)
## Uniform Spatial Partitions (Grids)
首先要进行预处理：
- 找到包围盒
- 对包围盒进行格子划分
- 对格子与平面相交的部分进行标记。

![image.png](/upload/2022/03/image-0d23b8c6a4f24e31b5464497f62bd114.png)
对摄入的的光线，只计算可能相交的格子。
![image.png](/upload/2022/03/image-3675727b25334207b94f9bed91a15a71.png)
由启发式算法得出，包围盒中的各自数量应满足下面的式子。
![image.png](/upload/2022/03/image-2d394ac22ddb4fe68617bf04e9768998.png)

当场景中有大部分空白时，不适用该方法。
## 空间划分
![image.png](/upload/2022/03/image-c881bb68c4f545c1aba9f972049b35bb.png)
### KD-Tree
在进行光线追踪前，需要进行预处理，将KD-Tree建立好。
![image.png](/upload/2022/03/image-ef70d2121f0840afb2a561ca5eab00a8.png)
对于任何一个节点，应该知道：
- 当前从哪个方向进行划分
- 划分在哪个位置（不一定在正中间）
- 指向两个节点
- 物体只存在叶子节点上

![利用KD-Tree进行求交](/upload/2022/03/image-d31c0bed900546e981942677278d867d.png)
计算包围盒与哪些物体相交很困难，并且划分后的KD-Tree的盒子中的物体可能与多个盒子相交。
## 物体划分
### Bounding Volume Hierarchy
通过对物体进行划分，保证一个物体只出现在一个格子里。
![image.png](/upload/2022/03/image-6c0ee738fc95441d9c8ec5447983210d.png)
- 找到一个包围盒。
- 递归的把包围盒拆成两个部分。
- 重新计算包围盒。
- 当叶子节点中物体足够少停止。

划分节点的方式：
- 取中间的物体
- 取长轴方向进行划分

``` 
//BVH伪代码
Intersect(Ray ray, BVH node) {
 if (ray misses node.bbox) return;
 if (node is a leaf node)
 test intersection with all objs;
 return closest intersection;
 hit1 = Intersect(ray, node.child1);
 hit2 = Intersect(ray, node.child2);
 return the closer of hit1, hit2;
}
```
