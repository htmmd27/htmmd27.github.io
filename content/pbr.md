---
title: PBR 材质实验室
layout: pbr
description: PBR（基于物理的渲染）用材质和光线的性质来预测表面有多亮、呈什么颜色。从一束光开始，亲手找出一块高光形成的原因。
steps:
  - name: 光照与角度
    title: 同一束光，为什么斜照更暗？
    text: 想象手电筒照着桌面。垂直照时光集中在一小块地方；把光打斜，相同的光铺开，每单位面积接到的光就少了。图中虚线 N 是垂直于桌面的法线。
    task: 把入射角从 0° 调到 60°，看看桌面中央收到多少光。
    label: 入射角
    min: 0
    max: 85
    initial: 0
    formula: L 是从桌面指向光源的单位向量。它与法线 N 的夹角是 θ，迎光面的接光比例为 N·L = cos θ，背光面为 0。
  - name: 光去了哪里
    title: 灯没动，为什么换个位置就能看到高光？
    text: 光照到一点后，有些光进入表层，散射后从许多方向出来，形成漫反射。有些光从表面反射，集中在镜面方向附近。BRDF 描述给定入射方向时，有多少光朝某个观察方向反射。
    task: 移动观察方向 V，让它与镜面方向重合。注意被标记的表面点是否出现高光。
    label: 观察方向
    min: -65
    max: 65
    initial: 0
    formula: 这盏灯的贡献 = BRDF(L, V) × 入射光 × max(N·L, 0)
  - name: 粗糙度与 D
    title: 为什么抛光表面的高光又小又亮？
    text: 把表面放大成许多小镜片。只有法线朝向光线与视线的半程向量 H 的镜片，才能把这束光反射进眼睛。D 描述这些法线在不同方向上的分布密度。
    task: 增大粗糙度，比较剖面里小镜片的倾斜程度，以及球上亮斑的宽度。
    label: 粗糙度
    min: 0.10
    max: 0.90
    increment: 0.01
    initial: 0.30
    formula: H = normalize(L + V)，α = 粗糙度²，D 使用 GGX 分布
  - name: 遮蔽与 G
    title: 朝向正确的小镜片，都能收到光吗？
    text: 旁边的凸起可能挡住光，也可能挡住眼睛的视线。G 估计一组微表面能同时被光源照到、又能被眼睛看见的比例。剖面展示一个凹处，球上则显示统计近似的结果。
    task: 把灯移向表面一侧，找出图中的光路开始被凸起挡住的角度。
    label: 入射角
    min: 0
    max: 85
    initial: 25
    formula: G = G₁(N·L) × G₁(N·V)，取值 0 到 1
  - name: 菲涅耳与 F
    title: 为什么擦着水面看，反光特别强？
    text: 正看和沿表面看，同一材质反射的光量也会不同。F₀ 是正入射反射率。这里取常见非金属近似值 0.04，曲线给出光线与微表面法线夹角增大时的反射比例。
    task: 先试 60°，再试 85°。同样增加角度，曲线在哪一段爬升最快？
    label: 微表面入射角
    min: 0
    max: 90
    initial: 45
    formula: F = F₀ + (1 − F₀)(1 − cos θ)⁵
  - name: 金属与基础色
    title: 同一种基础色，为什么能表现两种材质？
    text: 非金属的基础色主要进入漫反射。金属的基础色决定镜面反射的颜色，纯金属的漫反射权重为零。这里固定铜色基础色和粗糙度，让你单独比较金属度带来的变化。
    task: 从 0 滑到 1，观察三个颜色通道的正入射反射率，以及漫反射权重的变化。
    label: 金属度
    min: 0
    max: 1
    increment: 0.01
    initial: 0
    formula: F₀ = (1 − m) × 0.04 + m × 基础色；kᵈ = (1 − F) × (1 − m)
  - name: 合成材质
    title: 把学过的各项放回同一颗球
    text: 在同一盏白色方向光下，先比较同一材质的漫反射、镜面反射与合成结果。换一种材质，再分别查看 D、G、F，找出让高光发生变化的那一项。
---

### 从单灯到环境光

本实验按王子饼干的教程[^tutorial]拆解直接光照，公式与实现可对照 LearnOpenGL 的 PBR 章节[^learnopengl]阅读。

把最后一步的铜球放到窗边，窗户和墙壁也会出现在反射里。材质仍用 Lambert 漫反射和 Cook–Torrance 微表面模型[^cook]计算；改变的是入射光。单灯只需求一个方向的贡献，环境照明则把表面上方整个半球各方向的光按 BRDF 和入射角加权积分。用环境图提供这些方向的光，就是基于图像的照明（IBL）。

### 参考文献 {#references}

[^tutorial]: 王子饼干．[《呆呆兽也可以学会的PBR渲染·上》](https://zhuanlan.zhihu.com/p/2005956500745652011)．知乎。
[^learnopengl]: Joey de Vries. LearnOpenGL, PBR. [Theory](https://learnopengl.com/PBR/Theory) · [Lighting](https://learnopengl.com/PBR/Lighting).
[^cook]: R. L. Cook, K. E. Torrance. [A Reflectance Model for Computer Graphics](https://doi.org/10.1145/357290.357293). *ACM Transactions on Graphics*, 1982, 1(1), 7–24.
