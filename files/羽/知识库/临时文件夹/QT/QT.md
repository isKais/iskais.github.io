# QT Overview
 
```ccard
type: folder_brief_live
```
 

## 前言和概念
qt 开发框架
可以开发gui和非gui程序, 属于面向对象的框架, 使用特殊的代码生成拓展(?), 组件编程

### 特征
#### 面向对象
封闭的盲盒机制, 只需知道输入和输出
#### 组件间的通讯
有完善的组件间通讯signal和slot, 信号槽
#### 其他
友好的帮助和教程, 编程方便, 用户高度自定义控件
### 问题
#### 什么是QTCreator
开发工具, 是一个跨平台的ide
现在有提供sdk
#### 什么是QML
QML 是一种用户界面规范和标记语言，它允许开发/设计人员创建高性能、流畅的动画和具有视觉吸引力的应用程序。QML 和 Qt Quick 是 Qt 的新生力量，它们可以让你用 QML 语言开发 GUI 应用程序

## 导入和使用
在qt6之后使用cmake, 我个人看法会更倾向于使用cmake(也就是qt6), 但是qt6没有直接的安装包提供, 需要下载在线安装程序, 也要注册qt的账号.qt6开始非商业授权下, 不再提供离线安装方式的exe.
使用在线安装程序, 安装方式选择第二个即可(qt design studio我感觉用不上), 不发送反馈, 许可证记得使用最后一个lgpl协议, 然后一路next即可
![[Pasted image 20240227150913.png]]

有时候也需要qt5的兼容模块
![[Pasted image 20240227151022.png]]
如果需要qt5兼容模块的话, 在这里安装
![[Pasted image 20240227151356.png]]
[常见模块](https://blog.csdn.net/q5222890/article/details/132236185)
注: 有个超级大的文件, 看名字挺唬人的, 但是没必要安装. qt debug information files是用于qt源码调试用的(一般都用不上)

pyside 是用python代码的(官方牵头开发, 但是不太成熟)
pyqt也是用python代码(更加成熟)

### 控件库的两种开发方式
1. 老一代的Qwidget
2. 新一代的Qt Quick
qt quick 使用了新的描述语言qml, 而qwidget使用的是c类语言, 要使用他人的控件库, 首先要确认使用的开发方式. 
不同的开发方式有不同的使用方法. 
#### Qt Quick
主要的文件是main.cpp(和main.qml(首页元对象的描述文件)