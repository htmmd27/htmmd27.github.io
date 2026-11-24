---
title: PBR 材质实验室
layout: pbr
math: true
description: 从一盏灯下的高光，到陶瓷背面的暖色，再到金属上的窗户倒影。通过三个篇章的互动实验，观察光照、材质和视角怎样共同决定表面的颜色。
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
  - name: 找到倒影
    experiment: reflection
    title: 同一扇窗，为什么只在球上的某些位置出现？
    text: 眼睛固定，沿着球的水平截面移动取样点。理想镜面会沿反射方向 R 读取环境，窗户只会出现在恰好能把窗光送进眼睛的地方。
    task: 从球心往两侧移动标记。观察表面法线转了多少度，以及环境图上的取样点走了多远。
    label: 法线偏角
    min: -80
    max: 80
    initial: 0
    formula: '由表面指向眼睛的方向为 \(V\)。理想镜面的环境取样方向是\[R=2(N\cdot V)N-V.\]在本实验的平面截面内，法线转过 \(\beta\)，反射方向转过 \(2\beta\)。'
  - name: 有限的样本
    experiment: sequence
    title: 只取几十个样本，怎样少漏掉一块区域？
    text: 左右两个方格分别放入固定种子的伪随机点和 Hammersley 点。它们都是给采样器的二维输入。观察空白区域和成团的点，再看同一批 Hammersley 点如何映射到微表面法线。
    task: 增加样本数，比较同样预算下两组点覆盖了多少个格子。
    label: 样本数
    min: 8
    max: 128
    increment: 8
    initial: 32
    formula: '蒙特卡洛积分按概率密度补偿每个样本。\[I\approx\frac1S\sum_{i=0}^{S-1}\frac{f(X_i)}{p(X_i)}.\]本实验用确定性的低差异点集做准蒙特卡洛求积：\(X_i=(i/S,\Phi_2(i))\)，其中 \(\Phi_2\) 把二进制位反序放到小数点后。'
  - name: GGX 重要性采样
    experiment: importance
    title: 为什么越光滑的表面，样本越集中？
    text: 同样的二维输入可以生成完全不同的方向。先按 GGX 分布选半程向量 H，再把视线绕 H 反射得到取光方向 L。图中的圆盘是从法线上方看到的方向投影。
    task: 调大粗糙度，比较 H 与 L 的扩散程度。留意有多少反射方向仍在表面上方。
    label: 粗糙度
    min: 0.05
    max: 1
    increment: 0.01
    initial: 0.35
    formula: '设 \(\alpha=r^2\)，二维样本为 \((u,v)\)。\[\varphi=2\pi u,\qquad \cos\theta_h=\sqrt{\frac{1-v}{1+(\alpha^2-1)v}}.\]相对于立体角，\(p_H=D(H)(N\cdot H)\)，变换到光线方向后 \(p_L=p_H/(4|V\cdot H|)\)。'
  - name: 预过滤环境图
    experiment: prefilter
    title: 怎样让窗框随着粗糙度连续变模糊？
    text: 对每个反射方向，围绕它用 GGX 取样，算出一个加权环境颜色。把几种粗糙度的结果存成不同层。运行时用反射方向查图，并在相邻两层之间插值。
    task: 缓慢拖动粗糙度。对照上下两张预过滤图，观察球上的窗框如何从一层过渡到下一层。
    label: 粗糙度
    min: 0
    max: 1
    increment: 0.01
    initial: 0.36
    formula: '烘焙时令 \(N=V=R\)，按 GGX 采样 \(L_i\)，取 \(w_i=\max(N\cdot L_i,0)\)。\[P(R,r)\approx\frac{\sum_i L_{\rm env}(L_i)w_i}{\sum_i w_i}.\]这里保存五个等距粗糙度层。这个近似会损失掠射视角下沿一个方向拉长的反射细节。'
  - name: BRDF 积分查找表
    experiment: brdf
    title: 环境颜色已有了，材质和视角还会怎样改变反射？
    text: 在均匀白色环境中积分，把材质的正入射反射率提出来，剩下缩放系数 A 和偏移系数 B。横轴是视角余弦，纵轴是粗糙度，红、绿两通道分别显示 A、B。
    task: 固定粗糙度为 0.40，从正视拖向掠视，对照标记位置读取 A、B 和非金属的镜面响应。
    label: 观察角
    min: 0
    max: 89
    initial: 35
    formula: '设 \(\mu_x=N\cdot x\)，\(q=(1-V\cdot H)^5\)。将方向概率密度代入镜面积分，\(D\) 与余弦项约去，剩下的权重为\[\frac{f_s\,\mu_L}{p_L}=F\,G_{\rm vis},\qquad G_{\rm vis}=\frac{G\,|V\cdot H|}{\mu_H\mu_V}.\]再用 \(F=F_0(1-q)+q\) 把积分拆成两个与材质颜色无关的数：\[\begin{aligned}A&=\tfrac1S\sum(1-q)G_{\rm vis}\\B&=\tfrac1S\sum qG_{\rm vis}\end{aligned}\]落到表面下方的样本贡献为零。IBL 的 Schlick–GGX 几何近似取 \(k=r^2/2\)。'
  - name: 合成镜面 IBL
    experiment: finish
    title: 补上哪一项，金属才映出房间？
    text: 第一颗球沿用上篇的单灯与中篇的环境漫反射。第二颗球只显示环境镜面项。合成球先在线性空间加上两者，再统一映射到屏幕。
    task: 先用铜把粗糙度从 0.05 拖到 1，看窗框在哪一段化开。再换成金和陶瓷，比较倒影的颜色和背光面的底色。
    label: 粗糙度
    min: 0.05
    max: 1
    increment: 0.01
    initial: 0.22
    formula: '使用 \(N\cdot V\) 与 \(r\) 查得 \(A,B\)，使用 \(R\) 与 \(r\) 查得预过滤颜色 \(P\)。\[\begin{aligned}L_{\rm spec,env}&\approx P(R,r)(F_0A+B)\\L_o&=L_{\rm direct}+L_{\rm diff,env}+L_{\rm spec,env}\end{aligned}\]这里环境可见度固定为 1。换材质会同时改变 \(F_0\) 和漫反射权重。'
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

反射方向 R
: 视线绕法线镜像后的方向，\(R=2(N\cdot V)N-V\)。理想镜面只从这个方向读取环境。

重要性采样
: 按被积函数的形状分配样本：BRDF 大的方向多取，小的方向少取，再用概率密度把每个样本的权重补回来。

Hammersley 点集
: 一种低差异点集。第一维均匀分布，第二维把序号的二进制位反序放到小数点后，样本比伪随机更均匀地铺开。

预过滤环境图
: 按粗糙度分层保存的环境图。每层都已经把 GGX 镜面波瓣范围内的光加权平均好，运行时按反射方向查一次即可。

Split-sum 近似
: 把镜面积分拆成「预过滤环境颜色」和「BRDF 积分」两项分别预计算，再在运行时相乘。

### 下篇里的两张表

下篇沿用王子饼干的镜面 IBL 教程[^last]。一颗金属球映出的窗户，原本需要对整个可见半球的环境辐亮度和镜面 BRDF 一起积分。

\[
L_{\rm spec,env}(V)=\int_{\Omega^+} L_i(L)\,f_s(L,V)\,\max(N\cdot L,0)\,\mathrm d\omega_L
\]

Split-sum 近似[^karis]把这项工作分开做。第一张表存各反射方向、各粗糙度下的环境颜色，换房间时需要重新生成。第二张表存 BRDF 积分的两个系数，同一种 BRDF 可以在不同房间复用。实验里的点集、滤波图、查找表和材质球均在浏览器中计算。可对照 LearnOpenGL 的镜面 IBL 实现[^spec]。

### 三篇连起来

走完 19 步，一颗球的颜色由三项在线性空间相加，最后统一做色调映射：

\[
\begin{aligned}
L_o &= \underbrace{\big(k_{d,\rm dir}\tfrac{c}{\pi}+f_s\big)L_i\,\max(N\cdot L,0)}_{\text{上篇：单灯直接光}}\\
    &\quad+\underbrace{\mathrm{AO}\,k_{d,\rm env}\,c\,B(N)}_{\text{中篇：环境漫反射}}\\
    &\quad+\underbrace{P(R,r)\,(F_0A+B)}_{\text{下篇：环境镜面}}
\end{aligned}
\]

每一项都能在第 7、13、19 步单独拆开来观察。实时引擎里还会加入多盏灯、阴影、环境遮蔽贴图和多次散射的能量补偿，结构仍然是这三块。

### 参考文献 {#references}

[^tutorial]: 王子饼干．[《呆呆兽也可以学会的PBR渲染·上》](https://zhuanlan.zhihu.com/p/2005956500745652011)．知乎。
[^learnopengl]: Joey de Vries. LearnOpenGL, PBR. [Theory](https://learnopengl.com/PBR/Theory) · [Lighting](https://learnopengl.com/PBR/Lighting).
[^cook]: R. L. Cook, K. E. Torrance. [A Reflectance Model for Computer Graphics](https://doi.org/10.1145/357290.357293). *ACM Transactions on Graphics*, 1982, 1(1), 7–24.
[^middle]: 王子饼干．[《呆呆兽也可以学会的PBR渲染·中》](https://zhuanlan.zhihu.com/p/2013530242078221650)．知乎。
[^ibl]: Joey de Vries. LearnOpenGL, [Diffuse irradiance](https://learnopengl.com/PBR/IBL/Diffuse-irradiance).
[^karis]: Brian Karis. [Real Shading in Unreal Engine 4](https://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013_pbs_epic_notes_v2.pdf). SIGGRAPH 2013 Course: Physically Based Shading in Theory and Practice.
[^last]: 王子饼干．[《呆呆兽也可以学会的PBR渲染·下》](https://zhuanlan.zhihu.com/p/2015883644632343035)．知乎。
[^spec]: Joey de Vries. LearnOpenGL, [Specular IBL](https://learnopengl.com/PBR/IBL/Specular-IBL).
