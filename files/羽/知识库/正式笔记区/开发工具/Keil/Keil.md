# Keil Overview
 
```ccard
type: folder_brief_live
```
## 区别
### 大版本区别 Keil4和Keil5
#### keil 4
keil4是所有库文件等等都在一个安装文件里, 所以开发安装文件里没有的单片机就会很麻烦(需要去重新下载和配置相关文件)
keil4开发stm32效率太低, 但是开发c51效率足够了, 所以Keil4常用于51系列单片机编译调试.
#### keil 5
keil5安装的就是一个单纯的开发软件, 不包含具体的器件相关文件, 开发什么就安装对应的文件包.
Keil5常用于STM32系列单片机的编译调试. Keil5生成的目标代码效率非常之高, 多数语句生成的汇编代码很紧凑, 容易理解. 
### 版本内区别 C51和MDK 
Keil C51是针对51内核单片机，比如：AT89C51、 STC89C51等。
Keil MDK，也叫MDK-ARM，是针对【ARM内核】单片机，比如：STM32F1、 LPC1788等。
	Keil C51使用ANSI C编译器
	Keil MDK使用ARM Compiler编译器

## 提示
重要提示!! 务必安装mdk [5.35](https://img.anfulai.cn/bbs/96992/MDK535.EXE)以下版本
![[知识库/正式笔记区/实践/嵌入式/Stm32/stm32code之前/Stm32开发工具/配置/配置#提示]]
不然在后面开发stm32时候会出现我无法解决的错误...
并且低版本自带有AC5编译器(从MDK5.37开始, 不再默认安装, 需要独立安装, 这东西独立安装有一点难度)

## 配套pack
如果有缺失的pack, 可以在[这里](https://blog.csdn.net/Simon223/article/details/105090189)下载

## 共存
可以参考这个教程
https://blog.csdn.net/xushu_me/article/details/109173058
个人实测 c51是可以和arm共存的

## 创建不同的项目
### 创建51项目
![[Pasted image 20240401212959.png]]
在最上方的下拉选择框中选择`Legacy Device Database [no RTE]`。在搜索框中搜索`AT89C52`，下方出现设备，单击选中。选择下方的OK即可保存。
 然后yes即可
## 创建stm32项目
![[Pasted image 20240401212959.png]]
在最上方的下拉选择框中选择`software packs`。在搜索框中搜索stm32具体名字，下方出现设备，单击选中。选择下方的OK即可保存。

## 😍使用插件AStyle格式化Keil代码
https://sourceforge.net/projects/astyle/

下载, 然后解压到keil安装目录
![[Pasted image 20240521162440.png]]

然后配置插件
![[Pasted image 20240521162524.png]]

!E --style=allman --indent=spaces=2
![[Pasted image 20240521162713.png]]
