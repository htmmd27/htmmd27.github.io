---
title: PBR 材质实验室
layout: pbr
math: true
description: PBR（基于物理的渲染）用材质和光线的性质，预测表面有多亮、呈什么颜色。这里有 13 个可以动手的小实验：先用一盏灯找出高光从哪里来，再把球放进有窗的房间，看环境光怎样照亮背光面。
steps:
  - name: 光照与角度
    title: 同一束光，为什么斜照更暗？
    text: 想象手电筒照着桌面。垂直照时光集中在一小块地方；把光打斜，相同的光铺开，每单位面积接到的光就少了。图中虚线 N 是垂直于桌面的法线。
    task: 把入射角从 0° 调到 60°，看看桌面中央收到多少光。
    label: 入射角
    min: 0
    max: 85
    initial: 0
    formula: '\(L\) 从桌面指向光源，与法线 \(N\) 的夹角是 \(\theta\)。迎光面的接光比例为 \(\cos\theta\)，背光面为零。\[\max(N\cdot L,0)=\max(\cos\theta,0)\]'
  - name: 光去了哪里
    title: 灯没动，为什么换个位置就能看到高光？
    text: 光照到一点后，有些光进入表层，散射后从许多方向出来，形成漫反射。有些光从表面反射，集中在镜面方向附近。BRDF 描述给定入射方向时，有多少光朝某个观察方向反射。
    task: 移动观察方向 V，让它与镜面方向重合。注意被标记的表面点是否出现高光。
    label: 观察方向
    min: -65
    max: 65
    initial: 0
    formula: '\(f_r\) 是 BRDF，\(L_i\) 是入射辐亮度。这盏方向光的贡献为\[L_o=f_r(L,V)\,L_i\,\max(N\cdot L,0)\]'
  - name: 粗糙度与 D
    title: 为什么抛光表面的高光又小又亮？
    text: 把表面放大成许多小镜片。只有法线朝向光线与视线的半程向量 H 的镜片，才能把这束光反射进眼睛。D 描述这些法线在不同方向上的分布密度。
    task: 增大粗糙度，比较剖面里小镜片的倾斜程度，以及球上亮斑的宽度。
    label: 粗糙度
    min: 0.10
    max: 0.90
    increment: 0.01
    initial: 0.30
    formula: '\(H\) 是半程向量。GGX 分布使用由粗糙度 \(r\) 得到的参数 \(\alpha\)。\[H=\frac{L+V}{\lVert L+V\rVert},\qquad \alpha=r^2\]'
  - name: 遮蔽与 G
    title: 朝向正确的小镜片，都能收到光吗？
    text: 旁边的凸起可能挡住光，也可能挡住眼睛的视线。G 估计一组微表面能同时被光源照到、又能被眼睛看见的比例。剖面展示一个凹处，球上则显示统计近似的结果。
    task: 把灯移向表面一侧，找出图中的光路开始被凸起挡住的角度。
    label: 入射角
    min: 0
    max: 85
    initial: 25
    formula: '几何项分别考虑光源方向和观察方向的可见性。\[G=G_1(N\cdot L)\,G_1(N\cdot V),\quad 0\le G\le1\]'
  - name: 菲涅耳与 F
    title: 为什么擦着水面看，反光特别强？
    text: 正看和沿表面看，同一材质反射的光量也会不同。F₀ 是正入射反射率。这里取常见非金属近似值 0.04，曲线给出光线与微表面法线夹角增大时的反射比例。
    task: 先试 60°，再试 85°。同样增加角度，曲线在哪一段爬升最快？
    label: 微表面入射角
    min: 0
    max: 90
    initial: 45
    formula: '\(F_0\) 是正入射反射率，\(\theta\) 是相对于微表面法线的入射角。\[F=F_0+(1-F_0)(1-\cos\theta)^5\]'
  - name: 金属与基础色
    title: 同一种基础色，为什么能表现两种材质？
    text: 非金属的基础色主要进入漫反射。金属的基础色决定镜面反射的颜色，纯金属的漫反射权重为零。这里固定铜色基础色和粗糙度，让你单独比较金属度带来的变化。
    task: 从 0 滑到 1，观察三个颜色通道的正入射反射率，以及漫反射权重的变化。
    label: 金属度
    min: 0
    max: 1
    increment: 0.01
    initial: 0
    formula: '\(m\) 是金属度，\(c\) 是线性 RGB 基础色。\[\begin{aligned}F_0&=(1-m)\,0.04+mc\\k_d&=(1-F)(1-m)\end{aligned}\]'
  - name: 合成材质
    bench: true
    title: 把学过的各项放回同一颗球
    text: 在同一盏白色方向光下，先比较同一材质的漫反射、镜面反射与合成结果。换一种材质，再分别查看 D、G、F，找出让高光发生变化的那一项。
  - name: 环境图与方向
    experiment: panorama
    title: 窗户在左边，球从哪个方向收到它的光？
    text: 把周围景物沿经纬线展开，就得到一张全景环境图。每个方向对应一个像素，它的线性 RGB 值记录该方向的入射辐亮度 Lᵢ。这里用一个有暖色窗户、冷色天空和地面的虚拟房间。
    task: 转动环境，观察窗框何时经过十字线。镜面球中心也在读取同一个方向。
    label: 环境旋转
    min: -180
    max: 180
    initial: 0
    formula: '设经度为 \(\varphi\)，纬度为 \(\lambda\)。经纬坐标对应贴图中的位置为\[u=\frac{\varphi}{2\pi}+\frac12,\qquad v=\frac12-\frac{\lambda}{\pi}\]辐亮度在线性空间取样，显示时才压缩亮度。'
  - name: 半球与权重
    experiment: weights
    title: 天顶和地平线附近的一圈天空，谁贡献更多光？
    text: 先让天空各处一样亮。天顶的光正对桌面，但天顶附近的窄环很小。靠近地平线的窄环大，光却几乎擦过桌面。图上以相同的天顶角宽度比较这些环带。
    task: 从天顶滑到地平线，找到环带贡献最大的角度。右侧圆盘是从桌面正上方看到的半球投影。
    label: 天顶角
    min: 0
    max: 90
    initial: 20
    formula: '辐照度 \(E\) 是单位面积收到的辐射通量。等角宽环带的贡献密度正比于 \(\cos\theta\sin\theta\)。\[\begin{aligned}\mathrm dE&=L_i\cos\theta\,\mathrm d\omega\\\mathrm d\omega&=\sin\theta\,\mathrm d\theta\,\mathrm d\varphi\end{aligned}\]'
  - name: 半球积分
    experiment: integral
    title: 怎样把各个方向的光加成一个数？
    text: 回到有窗的房间。在朝向窗户一侧的半球上取样，每个点读取一个方向的颜色，乘上入射余弦和它代表的立体角。把所有项相加，就得到这个朝向的辐照度。
    task: 增加采样环数，观察哪些点落进亮窗，再与密集采样的结果比较。窗框很细，误差可能上下波动。
    label: 采样环数
    min: 1
    max: 18
    initial: 2
    formula: '用 \(n\) 个环、每环 \(4n\) 个方位角，在网格中心 \((\theta_j,\varphi_k)\) 取样。\[\begin{aligned}E&\approx\sum_{j=1}^{n}\sum_{k=1}^{4n}L_i(\theta_j,\varphi_k)\,w_j\\w_j&=\cos\theta_j\sin\theta_j\,\Delta\theta\,\Delta\varphi\\\Delta\theta&=\frac{\pi}{2n},\quad\Delta\varphi=\frac{2\pi}{4n}\end{aligned}\]'
  - name: 辐照度贴图
    experiment: bake
    title: 每一帧都要重新计算整个半球吗？
    text: 为许多不同的表面法线提前做一次积分，把 \(E/\pi\) 存成一张新图。运行时只要用法线查一次图，就得到白色 Lambert 表面的漫反射亮度。窗框消失了，窗户的暖色仍会影响朝向它的表面。
    task: 移动两个图中的取样标记。比较上方原图的一条窗框、下方烘焙图的色带和右侧白球的标记点。
    label: 法线经度
    min: -80
    max: 80
    initial: 0
    formula: '贴图按法线 \(N\) 存储 \(B(N)\)。若各方向都有相同的辐亮度 \(C\)，则 \(E=\pi C\)，贴图值恰好是 \(C\)。\[B(N)=\frac{E(N)}{\pi}\]'
  - name: Mip 与卷积
    experiment: mip
    title: 把环境图缩小，也能得到同样的光吗？
    text: 普通 mipmap 把相邻像素平均，层级越高，细节越少。漫反射卷积则围绕每个法线，按余弦权重收集整个半球的光。两张图看起来都模糊，取样范围和权重却不同。
    task: 提高普通 mip 的层级，与下方固定的辐照度图比较。右边的球直接按法线读取所选 mip，看看窗户怎样变化。
    label: 普通 mip 层级
    min: 0
    max: 6
    initial: 0
    formula: '每一级普通 mip 对上一级相邻的 \(2\times2\) 个线性 RGB 像素取平均。引擎也可以在不同 LOD 存放专门预过滤的环境数据。\[M_{\ell+1}(x,y)=\frac14\sum_{i,j\in\{0,1\}}M_\ell(2x+i,2y+j)\]'
  - name: 环境漫反射合成
    experiment: compose
    title: 灯照不到的那一面，为什么还能看见颜色？
    text: 先观察标有「单灯直接光」和「环境漫反射」的两颗球，再看合成球。三颗球共用同一种浅色陶瓷和同一套曝光。环境遮蔽 AO 用一个可见比例近似周围遮挡对间接光的影响。
    task: 把环境可见度从 1 拉到 0。盯住背光面，看看合成球最后会与哪颗球相同。
    label: 环境可见度 AO
    min: 0
    max: 1
    increment: 0.01
    initial: 1
    formula: '\(F_{\mathrm{env}}\) 使用含粗糙度的 Schlick 近似。\(c\) 是基础色，\(m\) 是金属度。各项在线性空间相加，最后才映射到屏幕。\[\begin{aligned}k_d&=(1-F_{\mathrm{env}})(1-m)\\L_{\mathrm{indirect}}&=\mathrm{AO}\,k_d\,c\,B(N)\\L_o&=L_{\mathrm{direct}}+L_{\mathrm{indirect}}\end{aligned}\]'
---

### 从单灯到环境光

本实验按王子饼干的教程[^tutorial]拆解直接光照，公式与实现可对照 LearnOpenGL 的 PBR 章节[^learnopengl]阅读。

第七步用 Cook–Torrance 微表面模型[^cook]计算单灯高光。中篇[^middle]从一张环境图出发，计算周围景物给陶瓷带来的漫反射光，并把它加回直接光。这里的镜面球用于辨认环境方向，粗糙金属的环境高光属于镜面 IBL。半球积分的推导可对照 LearnOpenGL 的漫反射辐照度章节[^ibl]。

### 怎样使用这个实验室

每一步只改一个变量。先读标题里的问题，按「动手」提示拖动滑块，再看金色框里的读数是否回答了这个问题。公式收在每一步底部，第一次读可以跳过。拖乱了就点「还原」。

页面地址会跟着步骤变化，例如 `#step-9` 直接打开半球与权重，可以把某一步单独发给别人。没有聚焦在滑块上时，键盘左右方向键可以翻页。

材质球的光照分量在线性 RGB 空间相加，显示合成结果前再做 Reinhard 色调映射和 sRGB 编码。D、G、F 的灰度图按各自的显示规则呈现。比较公式中的数值时，可以直接看滑块下方的读数。

### 术语速查

法线 N
: 垂直于表面、朝外的单位向量。N 与光线方向 L 的夹角决定表面的入射余弦，微表面菲涅耳项则使用 V 与 H 的夹角。

光线方向 L 与视线方向 V
: 从表面点分别指向光源和眼睛的单位向量。

半程向量 H
: L 与 V 的角平分方向，\(H=(L+V)/\lVert L+V\rVert\)。朝向 H 的微表面才会把光反射进眼睛。

BRDF
: 双向反射分布函数，给定入射方向和观察方向时，表面反射多少光。

粗糙度 r
: 微表面法线的分散程度。本页沿用常见约定 \(\alpha=r^2\)。

F₀
: 正入射时的镜面反射率。非金属约为 0.04，金属取基础色。

辐亮度 Lᵢ 与辐照度 E
: 辐亮度描述某一方向射来的光有多强；辐照度把半球上所有方向的光按余弦加权求和，描述单位面积收到多少光。

IBL
: 基于图像的光照，用一张环境图代替一盏盏具体的灯。

### 下篇预告

中篇只处理了环境光的漫反射部分。下篇将补上镜面 IBL：按粗糙度预过滤环境图，用 split-sum 近似把积分拆成两张查找表[^karis]，最后让粗糙金属在房间里也能映出模糊的窗户。

### 参考文献 {#references}

[^tutorial]: 王子饼干．[《呆呆兽也可以学会的PBR渲染·上》](https://zhuanlan.zhihu.com/p/2005956500745652011)．知乎。
[^learnopengl]: Joey de Vries. LearnOpenGL, PBR. [Theory](https://learnopengl.com/PBR/Theory) · [Lighting](https://learnopengl.com/PBR/Lighting).
[^cook]: R. L. Cook, K. E. Torrance. [A Reflectance Model for Computer Graphics](https://doi.org/10.1145/357290.357293). *ACM Transactions on Graphics*, 1982, 1(1), 7–24.
[^middle]: 王子饼干．[《呆呆兽也可以学会的PBR渲染·中》](https://zhuanlan.zhihu.com/p/2013530242078221650)．知乎。
[^ibl]: Joey de Vries. LearnOpenGL, [Diffuse irradiance](https://learnopengl.com/PBR/IBL/Diffuse-irradiance).
[^karis]: Brian Karis. [Real Shading in Unreal Engine 4](https://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013_pbs_epic_notes_v2.pdf). SIGGRAPH 2013 Course: Physically Based Shading in Theory and Practice.
