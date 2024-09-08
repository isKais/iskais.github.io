# RCC时钟 Overview
 
```ccard
type: folder_brief_live
```
 
在使用外设模块之前，需要启用相应的外设时钟。

## RCC_APB1PeriphClockCmd
RCC_APB1PeriphClockCmd 函数用于启用或禁用位于APB1总线上的外设的时钟。APB1（Advanced Peripheral Bus 1）是一个低功耗总线，通常用于连接==低速外设==。

	以下是一些常见的位于APB1总线上的外设：
	串口通信外设: USART4、USART5
	串行外设接口: SPI3
	基本定时器和通用定时器: TIM2、TIM3、TIM4、TIM5、TIM6、TIM7
	总线控制器: I2C1、I2C2：I2C

## RCC_APB2PeriphClockCmd
RCC_APB2PeriphClockCmd 函数用于启用或禁用位于APB2总线上的外设的时钟。APB2（Advanced Peripheral Bus 2）是一个高性能总线，通常用于连接需要更高时钟频率的外设，==高速外设==。

	以下是一些常见的位于APB2总线上的外设：
	串口通信外设: USART1、USART2、USART3
	串行外设接口: SPI1、SPI2
	高级定时器: TIM1、TIM8
	通用输入输出引脚控制器: GPIOA、GPIOB、GPIOC、GPIOD、GPIOE