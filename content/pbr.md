---
title: PBR 材质实验室
layout: pbr
description: 在同一盏方向光下比较材质球，拆开观察粗糙度、金属度和菲涅耳反射如何改变表面。
---

### 从一束光到一个像素

本实验按王子饼干的教程[^tutorial]拆解直接光照，公式与实现可对照 LearnOpenGL 的 PBR 章节[^learnopengl]阅读。

**入射角决定表面能接到多少光。** 想象一束光斜照在纸上，同样的光摊到了更大的面积。对一盏方向光，这个比例是 max(N·L, 0)。N 是表面法线，L 指向光源，V 指向眼睛，H 是 L 与 V 的单位半程向量。

**BRDF 决定接到的光有多少朝眼睛反射。** 这里用 Lambert 模型计算漫反射，用 Cook–Torrance 微表面模型[^cook]计算镜面反射。三颗球共用一盏白色方向光。转动灯光时，三颗球的入射方向同步改变。若要把周围每个方向的入射光都算进去，就要在表面上方的半球上积分，这也是环境光照（IBL）的出发点。

**粗糙度控制高光的形状。** 把表面看成很多朝向略有差别的小镜片。D 描述这些镜片的法线分布，G 估计光源和眼睛有多少能同时看见它们，F 决定每种颜色有多少光被镜片反射。D 是密度，可以大于 1。G 和 F 在 0 到 1 之间。

**金属度决定基础色的作用。** 在这个工作流中，非金属的基础色主要决定漫反射颜色，镜面反射在正入射时通常约为 4%。对纯金属，基础色给出有颜色的基础反射率，漫反射权重降为零。金属度的中间值可近似表达一个像素内金属和非金属的混合覆盖。

### 参考文献 {#references}

[^tutorial]: 王子饼干．[《呆呆兽也可以学会的PBR渲染·上》](https://zhuanlan.zhihu.com/p/2005956500745652011)．知乎。
[^learnopengl]: Joey de Vries. LearnOpenGL, PBR. [Theory](https://learnopengl.com/PBR/Theory) · [Lighting](https://learnopengl.com/PBR/Lighting).
[^cook]: R. L. Cook, K. E. Torrance. [A Reflectance Model for Computer Graphics](https://doi.org/10.1145/357290.357293). *ACM Transactions on Graphics*, 1982, 1(1), 7–24.
