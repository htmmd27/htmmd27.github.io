---
title: "计算机图形学笔记（八）：光栅化--反走样和深度缓冲"
date: "2022-03-08T13:29:44.4+08:00"
lastmod: "2022-03-09T21:28:34.217+08:00"
slug: "计算机图形学笔记八光栅化--反走样和深度缓冲"
draft: false
tags: ["计算机图形学","CG","computergraphic"]
categories: ["计算机图形学"]
halo_id: 15
summary: "光栅化中的反走样和深度缓冲"
math: true
aliases: ["/archives/计算机图形学笔记八光栅化--反走样和深度缓冲/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（八）：光栅化--反走样和深度缓冲"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=6)
课件地址： [GAMES101_Lecture_06](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_06.pdf)
## 反走样(Antialiasing)
### 锯齿
![image.png](/upload/2022/03/image-b194a567c132491faa4a34e9575044b2.png)
锯齿的学名叫走样(Alias)，走样是指使用同样的采样方法去采样频率不同的两种函数得出的结果相同，导致无法区分。
> Artifacts,指在采样过程中产生的错误等。
> - 锯齿
> - 摩尔纹
> - 车轮效应
>
> 本质为信号变化太快导致采样速度跟不上信号的变化速度。

![摩尔纹](/upload/2022/03/image-c99e321f2a2345b5b9cecd797af3fcac.png)
### 采样前模糊
在采样前模糊操作（滤波），再进行采样。
![image.png](/upload/2022/03/image-38ecd9e3793f4bfb83ddaffb38287d79.png)
![Point Sampling vs Antialiasing](/upload/2022/03/image-4b0852f8b87a498d8cea7c648b297776.png)
不可以把顺序反过来。

接下来将解决两个问题：
- 为什么会产生走样？
- 为什么不能先采样再模糊？
#### 频域(Frequency Domain)
> 傅里叶级数：任何一个周期变换都可以使用多个余弦函数和一个常数项相加的形式展开。通过傅里叶级数，任何周期变换可以分解为多个频率
![image.png](/upload/2022/03/image-5d915bd8186447488913e9acdf9723ff.png)
![image.png](/upload/2022/03/image-9696e0312e3f46dc988ef805cb76b3ca.png)

> 傅里叶变换：给定一个函数可以通过以下操作进行转换。从时域变到频域。
![image.png](/upload/2022/03/image-49646b067aff4e27ba778a853234c1f9.png)

![image.png](/upload/2022/03/image-fa561074fb5848d29d17a74984e9826a.png)
对于相同的采样方法，不同频率下的函数采样效果不同。若函数本身频率高而采样频率很低的话，则不能准确地恢复原始函数的样子。

> 滤波：把某个特定的频段删掉。
![初始图像](/upload/2022/03/image-37cee1f502db44809a1f7fcfb052e966.png)
去掉低频会留下物体的边界（高通滤波）
![高通滤波](/upload/2022/03/image-89cf1e99160145f0ba9bf667e9a7884a.png)
只留下低频信息会得到一张相对模糊的图（低通滤波）
![image.png](/upload/2022/03/image-5ae45e4fd0b74c1885c09d6c85f4e309.png)

#### 卷积
以一维的信号举例：
![image.png](/upload/2022/03/image-e0e72f59fce4447db98c098663edeca9.png)
通过移动滤波器（窗口）进行点积操作
![image.png](/upload/2022/03/image-67bd50c67b52449e932fd8c38662538e.png)

时域下的卷积操作对应到频域下就变成两者相乘，反之也成立。
![时域与频域的转换](/upload/2022/03/image-2730bbb7a1a84ff7ac823bd2e47dc8f2.png)

其中Box Filter被称为低通滤波器。更大的box filter会留下更少的低频信息。

#### 采样
采样相当于重复原始信号的频谱。
![image.png](/upload/2022/03/image-a1e2e7b478ee498ca9b2bb4037b4c5b6.png)
上图左侧对应的是时域中原始函数与冲击函数相乘，对应到右面则变成频域中经过傅里叶变换后的原始函数与冲击函数做卷积。

采样的间隔的长短会改变频域中频谱之间的间隔的大小，所以会导致走样。
![image.png](/upload/2022/03/image-b7dda7c49e7d4e86a2cb79f43fc7e459.png)

### 反走样
如何减少走样的错误？
- 增加采样率
- 反走样

先把一个信号的高频信息拿掉，再进行采样。
![image.png](/upload/2022/03/image-14ac5fba86354c51a488a38a07b6b455.png)
在实际操作中，用一定大小的低通滤波器与原始图像进行卷积。
以一个像素为卷积核进行卷积，对于三角可以得到一下结果：
![image.png](/upload/2022/03/image-901347ab8aa3453da44cf8766a9865dd.png)

由于三角形覆盖像素点的面积不好计算，人们发明了一种方法来近似求解，用更多的采样点进行反走样（MSAA）。将一个像素划分为更多小的像素，再进行面积的近似，划分的越小，结果越精确。
![image.png](/upload/2022/03/image-596679f49f0b42b8bbb4a70bba22f6ec.png)
![image.png](/upload/2022/03/image-6e74b76e1d7640e1baca0a5eebe99079.png)
![image.png](/upload/2022/03/image-d07530884c6841d692fba71842e450c5.png)
![image.png](/upload/2022/03/image-57d6df191c6e4254bcaa3ac4e7791ce7.png)
MSAA解决了模糊操作，不是靠提升分辨率（采样率）来解决反采样问题。

> 为了引入MSAA，我们增大了计算量，所以后续又发明了新的采样方法。
> - FXAA (Fast Approximate AA)快速近似抗锯齿，先将有锯齿的图得出再进行锯齿消除，将锯齿边界找到换成无锯齿的图片。
> - TAA (Temporal AA) 时序抗锯齿。对于静止的物体复用上一帧感知到的结果。

> 超分辨率：可以想象成反向操作。由低分辨率变为高分辨率。
> - DLSS（Deep Learning Super Sampling）

## 深度缓冲 (Z-Buffering)
为了解决画在屏幕上的三角形有正确的可见性与遮挡关系，提出了深度缓冲这个概念。
### 画家算法
从远到近将图片渲染出来。远处的物体先进行光栅化，近处的后进行光栅化。
![image.png](/upload/2022/03/image-4b761486982240e1808b468bb0d276e7.png)
会存在问题，对面的绘画顺序会导致结果的不同。
![image.png](/upload/2022/03/image-3817042e3bc344198e5474ac7db931d1.png)
如上图所示，若两两之间存在覆盖关系，在进行排序时无法定义深度关系，无法进行排序。
### 深度缓冲
为了解决以上问题，发明了深度缓冲算法。
- 对于每个像素存储物体在该像素最小的z值。（frame buffer）
- 生成两个图，一张图存储颜色信息，另一张图存储深度信息。（depth buffer）

为了简化计算，我们认为深度为点到摄像机的距离，z值为正。
![image.png](/upload/2022/03/image-b1ae033de82145b5aa9ac3a1a2fa124d.png)
![image.png](/upload/2022/03/image-10f553c7508147e2a1118b4dce246e65.png)
算法伪代码如下：
```
Initialize depth buffer to Infinity
During rasterization:
	for(each triangle T)
		for(each sample (x,y,z) in T)
			if(z<zbuffer[x,y])
				framebuffer[x,y] = rgb;
				zbuffer[x,y] = z;		
```
算法复杂度为\(O(n)\)(假设每个三角形覆盖有限个像素)。
对于MSAA，可能是对每个采样点进行深度缓存。
