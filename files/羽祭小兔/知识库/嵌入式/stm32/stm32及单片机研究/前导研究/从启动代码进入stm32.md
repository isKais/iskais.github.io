画了一个框架, 适合用于操控.
	这些(程序储存器, 数据储存器, 寄存器和输入输出端口被组织在同一个线性地址空间内)
	映射了一个地址进行操作
方便规划 以0.5g为单位分成了8分
	0号: 指令 引导cpu 以及存放代码 包含flash memory和system memory
	1号: sram区 掉电容易丢失储存器 也就是内存 储存常量变量(程序运行时) 堆栈区
	2号: 外设 中断 定时器 端口 gpio tim crc exti afio usb spi i2c rtc等等
	3号: 扩展的ram 存放更多数据的储存
	4号: 扩展的ram
	5号: 扩展的设备区 鼠标键盘类
	6号: 扩展的设备区
	7号: 内核外设 存放有逻辑 中断向量优先级 如何进行仲裁等逻辑 调试接口

b站视频纯废物

建议
https://github.com/cpq/bare-metal-programming-guide/blob/main/README_zh-CN.md