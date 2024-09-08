奇奇怪怪, 我配置了一堆的环境, 配了一个又一个

我决定使用**PlatformIO**配合Clion, 不想要使用arduino(习惯?)
根据这个[教程](https://zhuanlan.zhihu.com/p/138214988)即可

![[Pasted image 20240407231950.png]]

引脚－接法
　GND－GND
　VCC－３ｖ３
　CH-PD－VCC
　GPIO0－GND
　RXD－TXD
　TXD－RXD
　![[Pasted image 20240409165146.png]]
　

GPIO0是模式选择脚，拉低进入烧录模式

![[Pasted image 20240409164907.png]]
![[Pasted image 20240409164954.png]]
输出bootmode(1,x)有个1 说明可以烧录了

串口只能连接一个, 如果有串口助手, 记得关闭串口

烧录esp01 的参数如下
![[Pasted image 20240409165023.png]]
打开烧录软件, 从"…“选择要烧录的bin
填写烧录地址"0x0000”,
SPI MODE选择"DOUT",
FLASH SIZE选择"8Mbit",
"DoNotChgBin"可以不变,
"COM"选择你USBtoTTL的COM口.