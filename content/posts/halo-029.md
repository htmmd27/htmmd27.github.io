---
title: "计算机图形学笔记（十九）：光线追踪--蒙特卡洛积分与路径追踪"
date: "2022-03-15T16:53:51.495+08:00"
lastmod: "2022-03-15T22:23:45.406+08:00"
slug: "计算机图形学笔记十九光线追踪--蒙特卡洛积分与路径追踪"
draft: false
tags: ["计算机图形学","CG","computergraphic"]
categories: ["计算机图形学"]
halo_id: 29
summary: "蒙特卡洛积分与路径追踪"
aliases: ["/archives/计算机图形学笔记十九光线追踪--蒙特卡洛积分与路径追踪/"]
cover:
  image: "/upload/2022/03/%E8%AE%A1%E7%AE%97%E5%8F%8A%E5%9B%BE%E5%BD%A2%E5%AD%A6-e54319424c4a4d7eaa7068928c6d1c5d.png"
  alt: "计算机图形学笔记（十九）：光线追踪--蒙特卡洛积分与路径追踪"
  hiddenInList: true
---

> 课程地址： [game101](https://www.bilibili.com/video/BV1X7411F744?p=16)
课件地址： [GAMES101_Lecture_16](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_16.pdf)

## 蒙特卡洛积分(Monte Carlo Integration)
用数值方法去近似计算一个复杂积分的近似值。给定一个定积分与一个概率密度函数，可以通过下式求解积分。
![image.png](/upload/2022/03/image-60c35e83c7714c28b93fbf7dd5514f5c.png)
- 采样次数越多，方差越小。
- 采样与积分都是定义在x上的。

## 路径追踪
Whitted-Style光线追踪的特点：
- 当光线打到光滑的物体上时，会沿着镜面方向反射或折射。
- 当光线打到漫反射的物体，则光线会停止。

Whitted-Style光线追踪不满足物理规律，需要对其中的问题进行解决。
![image.png](/upload/2022/03/image-f5b089caa4414a978c061aab14a5524d.png)
渲染方程是正确的，但是要考虑：
- 半球面的积分
- 递归

### 简单情况
![image.png](/upload/2022/03/image-2ab43ade4c6e4bda9489d88b4c77182b.png)
求解一个点的直接光照的结果，忽略该点的发光，可得：
![image.png](/upload/2022/03/image-07d366fed0664c9c85dbdbc5a65618be.png)
可以使用蒙特卡洛积分的方式对改积分进行求解。
![image.png](/upload/2022/03/image-8975672420f14aa3bb93eb2d7b97120b.png)
```
//着色的伪代码
shade(p, wo)
	Randomly choose N directions wi~pdf
	Lo = 0.0
	For each wi
		Trace a ray r(p, wi)
		If ray r hit the light
			Lo += (1 / N) * L_i * f_r * cosine / pdf(wi)
		Else If ray r hit an object at q
			Lo += (1 / N) * shade(q, -wi) * f_r * cosine / pdf(wi)
	Return Lo
```
然而上述算法会有一定的问题:
- 用递归进行计算会导致光线数量级爆炸。![image.png](/upload/2022/03/image-f4e251fea8fd4c0da14cc390db17d791.png)

解决方案:随机向一个方向打出光线。(噪声大)
```
//着色的伪代码
shade(p, wo)
	Randomly choose One direction wi~pdf
	Lo = 0.0
	For each wi
		Trace a ray r(p, wi)
		If ray r hit the light
			Lo +=   L_i * f_r * cosine / pdf(wi)
		Else If ray r hit an object at q
			Lo +=  shade(q, -wi) * f_r * cosine / pdf(wi)
	Return Lo
```
可以使用多条经过像素的光线解决一定程度上的噪声问题
![image.png](/upload/2022/03/image-677119573aca4eb68f241a2572e0261b.png)
```
//光先生成
ray_generation(camPos, pixel)
	Uniformly choose N sample positions within the pixel
	pixel_radiance = 0.0
	For each sample in the pixel
		Shoot a ray r(camPos, cam_to_sample)
		If ray r hit the scene at p
			pixel_radiance += 1 / N * shade(p, sample_to_cam)
Return pixel_radiance
```

- 没有递归出口，停不下来。不能限制递归次数，会损失能量。

解决方案：俄罗斯轮盘 Russian Roulette (RR)，以一定的概率来决定是否停止路径追踪。

```
shade(p, wo)
	Manually specify a probability P_RR
	Randomly select ksi in a uniform dist. in [0, 1]
	If (ksi > P_RR) return 0.0;
	Randomly choose ONE direction wi~pdf(w)
	Trace a ray r(p, wi)
	If ray r hit the light
		Return L_i * f_r * cosine / pdf(wi) / P_RR
	Else If ray r hit an object at q
		Return shade(q, -wi) * f_r * cosine / pdf(wi) / P_RR
```
现在我们得到了一个正确的路径追踪的结果，但是他却不高效。
![image.png](/upload/2022/03/image-a8b93da5fc0749ae9149e33c4f81931f.png)

由于很多光线浪费掉了，会导致效率低下问题。
可以在光源上进行采样，由于蒙特卡洛积分要求采样与积分需要在同一处进行，所以要把渲染方程进行修改，使其对光源进行积分。
![image.png](/upload/2022/03/image-cb0ba618de8146819066a2c2ace7dc9a.png)
![image.png](/upload/2022/03/image-4288b7d18d8542cf85f1a0794a13d032.png)

现在，我们将某个点的Radiance进行两部分计算：
- 光源
- 其他反射

```
shade(p, wo)
	# Contribution from the light source.
	Uniformly sample the light at x’ (pdf_light = 1 / A)
	Shoot a ray from p to x’
	If the ray is not blocked in the middle
		L_dir = L_i * f_r * cos θ * cos θ’ / |x’ - p|^2 / pdf_light
	# Contribution from other reflectors.
	L_indir = 0.0
	Test Russian Roulette with probability P_RR
	Uniformly sample the hemisphere toward wi (pdf_hemi = 1 / 2pi)
	Trace a ray r(p, wi)
	If ray r hit a non-emitting object at q
		L_indir = shade(q, -wi) * f_r * cos θ / pdf_hemi / P_RR
	Return L_dir + L_indir
```
会存在一个问题，光源与着色点之间可能会有阻挡。只需进行判断即可。

![image.png](/upload/2022/03/image-572bd00946ac4023977f871245eb7b02.png)
