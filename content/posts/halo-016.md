---
title: "mac下安装c++的eigen库"
date: "2022-03-09T15:23:00.053+08:00"
lastmod: "2022-03-09T15:28:01.455+08:00"
slug: "mac下安装c的eigen库"
draft: false
tags: ["mac","eigen","c++"]
categories: ["软件安装技巧"]
halo_id: 16
summary: "安装过程下载Eigen库首先，去Eigen的官网下载最新的eigen包，下载地址为：eigen官网，本文下载的是3.4.0版本。解压和转移将下载好的压缩文件进行解压，将解压后的文件夹中的unsupported和Eigen文件夹移入xcode的library中。cd /Applications/Xco"
aliases: ["/archives/mac下安装c的eigen库/"]
cover:
  image: "/upload/2022/03/image-f2b0372a3b99444282a413ee062d48d0.png"
  alt: "mac下安装c++的eigen库"
  hiddenInList: true
---

# 安装过程
## 下载Eigen库
首先，去Eigen的官网下载最新的eigen包，下载地址为：[eigen官网](https://eigen.tuxfamily.org/index.php?title=Main_Page)，本文下载的是3.4.0版本。
## 解压和转移
将下载好的压缩文件进行解压，将解压后的文件夹中的*unsupported*和*Eigen*文件夹移入xcode的library中。
``` sh
cd /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include
sudo mv /Users/shidanyang/Downloads/eigen-3.4.0/unsupported ./
sudo mv /Users/shidanyang/Downloads/eigen-3.4.0/Eigen ./
```

## 使用
在Xcode中创建新的命令行项目，并进行测试。测试代码如下：
``` c++
#include<iostream>
#include<cmath>
#include<Eigen/Core>
#include<Eigen/Dense>


int main(){

    // Basic Example of cpp
    std::cout << "Example of cpp \n";
    float a = 1.0, b = 2.0;
    std::cout << a << std::endl;
    std::cout << a/b << std::endl;
    std::cout << std::sqrt(b) << std::endl;
    std::cout << std::acos(-1) << std::endl;
    std::cout << std::sin(30.0/180.0*acos(-1)) << std::endl;

    // Example of vector
    std::cout << "Example of vector \n";
    // vector definition
    Eigen::Vector3f v(1.0f,2.0f,3.0f);
    Eigen::Vector3f w(1.0f,0.0f,0.0f);
    // vector output
    std::cout << "Example of output \n";
    std::cout << v << std::endl;
    // vector add
    std::cout << "Example of add \n";
    std::cout << v + w << std::endl;
    // vector scalar multiply
    std::cout << "Example of scalar multiply \n";
    std::cout << v * 3.0f << std::endl;
    std::cout << 2.0f * v << std::endl;

    // Example of matrix
    std::cout << "Example of matrix \n";
    // matrix definition
    Eigen::Matrix3f i,j;
    i << 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0;
    j << 2.0, 3.0, 1.0, 4.0, 6.0, 5.0, 9.0, 7.0, 8.0;
    // matrix output
    std::cout << "Example of output \n";
    std::cout << i << std::endl;
    // matrix add i + j
    // matrix scalar multiply i * 2.0
    // matrix multiply i * j
    // matrix multiply vector i * v

    return 0;
}

```
编译并运行，得到下面的结果：
![结果](/upload/2022/03/image-94f7ad9662264cddbb5b5ffdcc23c5b6.png)
