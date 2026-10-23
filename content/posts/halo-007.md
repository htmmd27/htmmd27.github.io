---
title: "Swift初学相关语法"
date: "2022-03-04T13:31:21.672+08:00"
lastmod: "2022-03-04T15:12:10.117+08:00"
slug: "swift-chu-xue-xiang-guan-yu-fa"
draft: false
tags: ["swift","coding"]
categories: ["Swift"]
halo_id: 7
summary: "主要介绍了swift相关语法"
math: true
aliases: ["/archives/swift-chu-xue-xiang-guan-yu-fa/"]
cover:
  image: "/upload/2022/03/swift-057574aad06f4365a2fbdec54df6bcf0.jpeg"
  alt: "Swift初学相关语法"
  hiddenInList: true
---

# Swift学习笔记

## 打印信息

```swift
print("something to print")
print("something to \(somevalue)")
```

## 变量定义

```swift
//变量，定义后可修改
var name = "Bob"
//常量，定义后不可修改
let pi = 3.14159
```

## 定义某种类型的变量

```swift
//变量的类型有 Int Double Float String
//可以指定某个变量的类型，用:分隔
var name : String
var red, green, blue: Double
name = "Bob"

```

## 运算符

```swift
// + - * / 
//字符串也可以进行相加
//比较运算符与其他语言相同
```

## 范围表示

```swift
//a...b
1...3 // 表示1,2,3
//a..<b
1..<3 //表示1,2
```

## 可选类型 ?

```swift
// 在类型后面加上?，表明定义一个变量为可选类型
//这个可选类型就是表示，我生明了一个类型如果有值就为Int类型的，如果没有值那么就是nil。所以说我并没有声明变量num为Int类型，而是可选类型的，可能是Int也可能是nil。
var myCode : Int? = 404
//空字符 nil

```

## 条件语句

```swift
if conditional statement {
  
} else if conditional {
  
} else{
  
}
```

```swift
switch distance {
  case 0:
  	print("something")
  case 1,2,3,4,5:  // case 1...5:
  	print("something")
  default:
  	print("something")
}
```

## 循环语句

```swift
while a < b {
  
}
```

```swift
repeat {
  
}while a < b
```

```swift
for i in 1...5{
  
}
```

```SWIFT
// break continue
//fallthrough
```

## 字符串

```swift
var emptyString = ""
var str1 = String()
if str1.isEmpty{
  
}
```

### String Interpolation

```swift
let mult = 4
let message = "\(mult) times 1.5 is \(Double(mult) * 1.5)"
// message times 1.5 is 6
let someString = "I am learning with sololearn"
print("someString has \(someString.count) characters")
//someString has 28 characters
```

## Array

```swift
//初始化
var someInts = [Int]()
var fourDoubles = [Double](repeating: 0.0, count: 4)
// [0.0, 0.0, 0.0, 0.0]
var shoppingList : [String] = ["Bread", "Milk"]
var shoppingList = ["Bread", "Milk"]
//数组长度
shoppingList.count
//数组是否为空
shoppingList.isEmpty
//增加新元素
shoppingList.append("Flour")
shoppingList += ["Flour"]
//index
var firstItem = shoppingList[0]

```

```swift
//修改已有元素
var shoppingList = ["Syrup", "Bread", "Milk", "Apples"]
print("Before: \(shoppingList)")
shoppingList[1...3] = ["Bananas", "Oranges"]
print("After: \(shoppingList)")
//Before: ["Syrup", "Bread", "Milk", "Apples"]
//After: ["Syrup", "Bananas", "Oranges"]
```

```swift
//插入、删除
shoppingList.insert("Syrup", at : 0)
shoppingList.remove(at: 0)
shoppingList.removeLast()
```

```swift
//数组的迭代
for item in shoppingList{
  
}
for (index, item) in shoppingList.enumrated(){
  
}
```

## Set

```swift
//初始化
var letters = Set<Character>()
var names : Set<String> = ["Bob", "Ann"]
var names : Set = ["Bob", "Ann"]
//Insert
names.insert("Janes")
//contains
name.contains("Janes")
```

```swift
//迭代
for item in names{
  
}
for item in names.sorted(){
  
}
```

```swift
//Set 运算
a.intersection(b) //交集
a.union(b)  //并集
a.symmetricDifference(b) //交的补集
a.subtract(b)  // b的补集
//Set 子集判断
a.isSubset(of: )
a.isSuperset(of: )
a.isStrictSubset(of:)
a.isStrictSuperset(of: )
a.isDisjoint(with: )
```

## 字典

```swift
//初始化
var airports = [Int : String]()
//添加
airports["LHR"] = "London"
//迭代
for (code, name) in airports{
  
}
for code in airports.keys{
  
}
for name in airports.values{
  
}
```

## 函数

```swift
func sayHello(personName: String) -> String{
  let greeting = "Say hello to " + personName + "!"
  return greeting
}

func minMax(array: [Int]) -> (min: Int, max: Int) {
   var currMin = array[0]
   var currMax = array[0]
   for value in array[1..<array.count] {
      if value < currMin {
        currMin = value
      } else if value > currMax {
         currMax = value
      }
   }
  return (currMin, currMax)
}
print(minMax(array: [1, 2, 3, 4, -6, 11]))
//(min: -6, max: 11)
```

### External Parameter Names

```swift
func sayHello(to p1 : String, and p2 : String) -> String{
  return "Hello \(p1) and \(p2)"
}
print(sayHello(to: "Bob", and: "Ann"))
//如果你提供了外部参数名，那么函数在被调用时，必须使用外部参数名。
```

### 默认参数设置

```swift
func somefunction(p1 : Int = 12){
  
}
```

### 可变参数

```swift
//可变参数可以接受零个或多个值。函数调用时，你可以用可变参数来指定函数参数，其数量是不确定的。
//可变参数通过在变量类型名后面加入（...）的方式来定义。
func vari<N>(members: N...){
    for i in members {
        print(i)
    }
}
vari(members: 4,3,5)
vari(members: 4.5, 3.1, 5.6)
vari(members: "Google", "Baidu", "Runoob")
```

## 常量，变量及 I/O 参数

```swift
//想要声明一个变量参数，可以在参数定义前加 inout 关键字，这样就可以改变这个参数的值了
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}
var x = 1
var y = 5
swapTwoInts(&x, &y)
//传可变参数要加 & 
print("x 现在的值 \(x), y 现在的值 \(y)")
```

## 闭包

```swift
{(parameters) -> return type in
	statements
}
```

## 元组tuple

```swift
//元组中可以包括任何类型的元素
let error = (404, "Not Found")

```

## 枚举enum

```swift
enum enumname {
   // 枚举定义放在这里
}
enum DaysofaWeek {
    case Sunday
    case Monday
    case TUESDAY
    case WEDNESDAY
    case THURSDAY
    case FRIDAY
    case Saturday
}
//举例
enum Student{
    case Name(String)
    case Mark(Int,Int,Int)
}
var studDetails = Student.Name("Runoob")
var studMarks = Student.Mark(98,97,95)
switch studMarks {
case .Name(let studName):
    print("学生的名字是: \(studName)。")
case .Mark(let Mark1, let Mark2, let Mark3):
    print("学生的成绩是: \(Mark1),\(Mark2),\(Mark3)。")
}
```

## 面向对象

```swift
struct Resolution{
  var width = 0
  var height = 0
}
class VideoMode{
  var resolution = Resolution()
  var interlaced = False
  var frameRate = 0.0
}

someVideoMode = VideoMode()
print(someVideoMode.resolution.width)
```

### 

```swift
===
!==
```

Structure instances are always passed by **value**, and class instances are always passed by **reference**.

### 存储属性与计算属性

```swift
class sample {
  	//存储属性
    var no1 = 0.0, no2 = 0.0
    var length = 300.0, breadth = 150.0
    //计算属性
    var middle: (Double, Double) {
        get{
            return (length / 2, breadth / 2)
        }
        set(axis){
            no1 = axis.0 - (length / 2)
            no2 = axis.1 - (breadth / 2)
        }
    }
}

var result = sample()
print(result.middle)
result.middle = (0.0, 10.0)

print(result.no1)
print(result.no2)
//(150.0, 75.0)
//-150.0
//-65.0
```

### 只读计算属性

```swift
class film {
    var head = ""
    var duration = 0.0
    var metaInfo: [String:String] {
        return [
            "head": self.head,
            "duration":"\(self.duration)"
        ]
    }
}

var movie = film()
movie.head = "Swift 属性"
movie.duration = 3.09

print(movie.metaInfo["head"]!)
print(movie.metaInfo["duration"]!)
//Swift 属性
//3.09
```

### 属性观察器

* `willSet`在设置新的值之前调用

* `didSet`在新的值被设置之后立即调用

* `willSet`和`didSet`观察器在属性初始化过程中不会被调用

  ```swift
  class Samplepgm {
      var counter: Int = 0{
          willSet(newTotal){
              print("计数器: \(newTotal)")
          }
          didSet{
              if counter > oldValue {
                  print("新增数 \(counter - oldValue)")
              }
          }
      }
  }
  let NewCounter = Samplepgm()
  NewCounter.counter = 100
  NewCounter.counter = 800
  //计数器: 100
  //新增数 100
  //计数器: 800
  //新增数 700
  
  ```

The didSet observer does not provide a custom parameter name for the old value; the default name of **oldValue** is used, instead. Similarly, **newValue** could be used for the willSet observer, if no parameter name was defined.

### 在实例方法中修改值类型

Swift 语言中结构体和枚举是值类型。一般情况下，值类型的属性不能在它的实例方法中被修改。

但是，如果你确实需要在某个具体的方法中修改结构体或者枚举的属性，你可以选择变异(mutating)这个方法，然后方法就可以从方法内部改变它的属性；并且它做的任何改变在方法结束时还会保留在原始结构中。

方法还可以给它隐含的self属性赋值一个全新的实例，这个新实例在方法结束后将替换原来的实例。

```swift
struct area {
    var length = 1
    var breadth = 1
    
    func area() -> Int {
        return length * breadth
    }
    
    mutating func scaleBy(res: Int) {
        length *= res
        breadth *= res
        
        print(length)
        print(breadth)
    }
}

var val = area(length: 3, breadth: 5)
val.scaleBy(res: 3)
val.scaleBy(res: 30)
val.scaleBy(res: 300)
```

执行结果为

```
9
15
270
450
81000
135000
```

### 下标脚本

下标脚本允许你通过在实例后面的方括号中传入一个或者多个的索引值来对实例进行访问和赋值。

语法类似于实例方法和计算型属性的混合。

与定义实例方法类似，定义下标脚本使用subscript关键字，显式声明入参（一个或多个）和返回类型。

```swift
subscript(index: Int) -> Int {
    get {
        // 用于下标脚本值的声明
    }
    set(newValue) {
        // 执行赋值操作
    }
}
```

```swift
class daysofaweek {
    private var days = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "saturday"]
    subscript(index: Int) -> String {
        get {
            return days[index]   // 声明下标脚本的值
        }
        set(newValue) {
            self.days[index] = newValue   // 执行赋值操作
        }
    }
}
var p = daysofaweek()

print(p[0])
print(p[1])
print(p[2])
print(p[3])
//Sunday
//Monday
//Tuesday
//Wednesday
```

### 继承 与 Overriding

```swift
class SomeClass: SomeSuperclass {
    // 类的定义
}
//
class SuperClass {
    func show() {
        print("这是超类 SuperClass")
    }
}

class SubClass: SuperClass  {
    override func show() {
        print("这是子类 SubClass")
    }
}
```

### 构造过程

```swift
init()
{
    // 实例化后执行的代码
}
//构造参数
struct Rectangle {
    var length: Double
    var breadth: Double
    var area: Double
    
    init(fromLength length: Double, fromBreadth breadth: Double) {
        self.length = length
        self.breadth = breadth
        area = length * breadth
    }
    
    init(fromLeng leng: Double, fromBread bread: Double) {
        self.length = leng
        self.breadth = bread
        area = leng * bread
    }
}
```

如果你定制的类型包含一个逻辑上允许取值为空的存储型属性，你都需要将它定义为可选类型optional type（可选属性类型）。

当存储属性声明为可选时，将自动初始化为空 nil。



构造器可以通过调用其它构造器来完成实例的部分构造过程。这一过程称为构造器代理，它能减少多个构造器间的代码重复。

```swift
struct Rect {
    var origin = Point()
    var size = Size()
    init() {}
    init(origin: Point, size: Size) {
        self.origin = origin
        self.size = size
    }
    init(center: Point, size: Size) {
        let originX = center.x - (size.width / 2)
        let originY = center.y - (size.height / 2)
        self.init(origin: Point(x: originX, y: originY), size: size)
    }
}
```

### 析构过程

```swift
deinit {
    // 执行析构过程
}
```
