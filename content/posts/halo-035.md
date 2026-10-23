---
title: "面经整理"
date: "2022-04-01T10:41:38.112+08:00"
lastmod: "2022-09-06T15:22:04.985+08:00"
slug: "面经整理"
draft: false
tags: ["c++","面试","unity3d"]
categories: ["面经"]
halo_id: 35
summary: "面经整理"
aliases: ["/archives/面经整理/"]
---

## 2022.04.01 快手游戏客户端一面
1. 自我介绍
2. 介绍玩过哪些有戏
3. 研究生期间研究内容
4. stl容器 增删时间复杂度 具体实现
5. 各种排序算法 时间复杂度 和 稳定性
6. unity3d 对象生命周期
7. unity3d对象销毁后会调用什么函数
8. 多线程通信方式
9. 反问：
	1. 工作时间
	2. 实习学什么
	3. 后面应该加强对什么的学习（c#，unity相关基础）
	
## 2022.04.12 快手游戏客户端二面	
1.c++ new malloc区别
2.delete delete[]区别
2.智能指针
3.c++11 move构造函数
4.堆排序 构造，插入 时间复杂度 稳定性
5.光照贴图
6.光线追踪与光栅化区别
7.点乘叉乘区别，以及应用
8.哈希 构造方式，解决冲突办法
9.手撕代码 FreqStack

## 2022.04.15 快手游戏客户端三面
1. 自我介绍
2. c++ 虚函数
3. c++ 智能指针 shared_ptr实现
4. 哈希冲突解决方式
5. unity项目用了什么，怎么解决碰撞问题
6. map与unorderedmap底层区别
7. python垃圾回收机制有没有了解
8. python metaclass
9. 进程与线程的区别 通信方式
10. 为什么研究生阶段科研却想来做游戏
11. 红黑树实现，与二叉树的区别
11. 手撕：数组中最短的乱序  [leetcode原题](https://leetcode-cn.com/problems/sub-sort-lcci/)

## 2022.09.05 字节Pico unity开发一面
1. 摄像机的两种投影
 Unity 摄像机有两种模式一种是透视摄像机 ，一种是正交摄像机
2. 深浅拷贝及其应用
一、浅拷贝：
1、对于已有对象obj1，另外申明一个变量obj，则obj = obj1为浅拷贝，obj所赋予的是对象obj1的地址，即引用；

	2、对于已有数组array1，另外申明一个变量array，则	array=array1为浅拷贝，array所赋予的是数组array1的首地址，不是数组元素；

	3、无论是用Find还是Resources.Load()，其获得的都是游戏对象或资源的引用，即浅拷贝；

	二、深拷贝：

	1、对于int型变量i，另外申明一个变量j，则j=i为深拷贝，j所赋予的是i的实际值；

	2、对于ArrayList变量array1，两外申明一个ArrayList变量array，如果array1中的元素为基础数据类型，则array=array1为引用传递，为浅拷贝，而array[0]=array1[0]则为值传递，为深拷贝；

	3、用Instantiate克隆一个对象时，将获得原对象的一个深拷贝；
3. python与c#区别
[python与c#区别](https://blog.csdn.net/xl_lx/article/details/78395404)

4. struct与class区别
相同点：语法类似。
不同点：
　　◆class是引用类型，继承自System.Object类;struct是值类型，继承自System.ValueType类，因此不具多态性。但是注意，System.ValueType是个引用类型。
　　◆从职能观点来看，class表现为行为;而struct常用于存储数据。
　　◆class支持继承，可以继承自类和接口;而struct没有继承性，struct不能从class继承，也不能作为class的基类，但struct支持接口继承。
　　◆class可以声明无参构造函数，可以声明析构函数;而struct只能声明带参数构造函数，且不能声明析构函数。因此，struct没有自定义的默认无参构造函数，默认无参构造器只是简单地把所有值初始化为它们的0等价值。
　　◆实例化时，class要使用new关键字;而struct可以不使用new关键字，struct在声明时就进行了初始化过程，所有的成员变量均默认为0或null。
　　◆class可以实抽象类(abstract)，可以声明抽象函数;而struct为抽象，也不能声明抽象函数。
　　◆class可以声明protected成员、virtual成员、sealed成员和override成员;而struct不可以，但是值得注意的是，struct可以重载System.Object的3个虚方法，Equals()、ToString()和GetHashTable()。
　　◆class的对象复制分为浅拷贝和深拷贝，必须经过特别的方法来完成复制;而struct创建的对象复制简单，可以直接以等号连接即可。
　　◆class实例由垃圾回收机制来保证内存的回收处理;而struct变量使用完后立即自动解除内存分配。
　　◆作为参数传递时，class变量是以按址方式传递;而struct变量是以按值方式传递的。

5. 值类型和引用类型
(1) 存储位置不一样
值类型的变量会保存在栈内存中  
 引用类型的变量名会保存在栈内存中，但是变量值会存储在堆内存中，引用类型的变量不会自动销毁，当没有引用变量引用它时，系统的垃圾回收机制会回收它
(2) 复制方式不一样
① 值类型的变量直接赋值就是深复制，如 var a = 10; var b = a;那么a的值就复制给b了，b修改值不会影响a
② 引用类型的变量直接赋值实际上是传递引用，只是浅复制
(3) 值类型无法添加属性和方法
(4) 引用类型可以添加属性和方法
(5) 值类型的比较是值的比较，只有当它们的值相等的时候它们才相等。引用类型的比较是引用地址的比较
6. 进程、线程、协程
[进程、线程、协程](https://blog.csdn.net/qq_39304851/article/details/119975280)


7. 手撕：数组的最大区间和 [leetcode](https://leetcode.cn/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/)
