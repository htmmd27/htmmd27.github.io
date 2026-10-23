---
title: "Unity3D常见问题整理"
date: "2022-04-08T16:46:35.787+08:00"
lastmod: "2022-04-12T13:45:08.563+08:00"
slug: "unity3d常见问题"
draft: false
tags: ["unity3d"]
categories: ["Unity3d"]
halo_id: 37
summary: "Unity3D常见问题，不定时更新"
aliases: ["/archives/unity3d常见问题/"]
cover:
  image: "/upload/2022/04/unity3d-2af53da0aa2a4f47b8a7cbb4654e809a.jpeg"
  alt: "Unity3D常见问题整理"
  hiddenInList: true
---

## 什么是渲染管道
是指显示器为了显示图像而经过的一系列必要操作。
主要步骤有：本地坐标--->视图坐标--->背面裁剪--->光照--->裁剪--->投影--->视图变换--->光栅化
## 如何优化内存
- 压缩自带类库
- 将暂时不用的物体隐藏起来而不是直接Destroy掉
- 释放AssetBundle占用的资源
- 降低模型的片面数，降低模型的骨骼数量，降低贴图的大小
- 使用光照贴图、多层次细节（LOD）、着色器、预设（Prefab）

## 动态加载资源的方式
- Resources.Load()
- AssetBundle
[参考](https://blog.csdn.net/qq_21743659/article/details/107236692?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_paycolumn_v3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_paycolumn_v3&utm_relevant_index=2)

## 碰撞器与触发器的区别
碰撞器是触发器的载体，而触发器只是碰撞器身上的一个属性。当*isTrigger=false*时，碰撞器可以根据物理引擎引发碰撞，产生碰撞的效果，可以调用*OncollisionEnter/Stay/Exit*函数；当*isTrigger=true*时，没有碰撞效果，可以调用*OnTriggerEnter/Stay/Exit*函数。

## 物体发生碰撞的必要条件
两个物体必须带有碰撞器，其中一个物体必须带有RigidBody,而且必须是运动的物体带有RigidBody脚本才能检测到碰撞。

## Unity提供的光源有哪几种
- 平行光
- 点光源
- 聚光灯
- 区域光源

## 对象池
存放需要被反复调用的资源的一个空间。当对象会大量生成的时候如果每次都销毁创建会浪费时间，通过对象池把暂时不用的对象放到一个池子中，当下次要重新生成时先去池中查找一下有无可用的对象。常被用在子弹、敌人、粒子等。

### Unity3d脚本的生命周期
Awake--->OnEnable--->Start--->Update--->FixedUpdate--->LateUpdate--->OnGUI--->OnDisable--->OnDestroy

### 物理更新一般放在哪个系统函数里
FixedUpdate，每固定帧绘制时执行一次，比较适用于物理引擎的计算。Update适合做控制

### 移动相机的操作在哪个函数里，为什么？
LateUpdate，在所有的Update结束后才进行调用。若不在这个函数调用，则可能出现摄像机已经移动而视角内还未有角色的空帧出现。
