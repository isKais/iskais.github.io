# Stm32 Overview
 
```ccard
type: folder_brief_live
```
 
配置指南
![[知识库/正式笔记区/实践/嵌入式/Stm32/stm32code之前/Stm32开发工具/配置/配置#clion和keil]]

### 介绍
1. arm内核 32位单片机 stm32（51是8位的）
2. mcu 是微控制器 即单片机
3. 基于arm内核-cpu
4. st-link是一个仿真器，负责烧录调试。
Keil 搭配 STM32CubeMX 。STM32CubeMX用来配置外设引脚及参数， 并生成C 初始化代码，之后在Keil中无需再配置外设及参数，直接编写应用程序即可。

stm32名称介绍
f---代表基础型
103---代表基础型
c---48pin
6---128kb
t---qfp封装
6---使用温度

手里这块是stm32f103c6t6
官方界面：https://www.keil.com/dd2/stmicroelectronics/stm32f103c6/
手上这个有够丐的（10kbram 32kbrom）
nmm的
### 和c8t8相比
1.C6T6没有串口3（及USART3）；
2.C6T6没有通用定时器TIM4；
3.C6T6没有串行外设接口SPI2；
4.C6T6没有I2C2
5.C6T6的flash①详解为32K， C8T6为64K；（易懂的flash②详解）
6.C6T6的RAM为10K，C8T6为20K。

### 前置推荐学习进度
1. 模电数电
2. 微机原理
3. 安装完STM32学习的软件
4. 挑选部分例程的HEX
5. https://www.st.com/content/st_com/zh.html
6. https://www.stmcu.com.cn/
7. 官方文档《参考手册》，《STM32固件库使用手册》选读，但是前几章必读。存储器和总线架构、电源控制、备份寄存器、复位和时钟控制，通用和复用功能I/O，中断和时间等等前几章一定要花时间阅读。
8. 熟悉调试软件
9. gpio编程
### 开发方式
有两种
1. 基于寄存器的方式
2. 基于hal库的方式

### 主流开发环境
Keil5
STM32CubeIDE
CLion
RT-Thread Studio
vscode+platformio

