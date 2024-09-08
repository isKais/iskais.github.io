# PWM Overview
 
```ccard
type: folder_brief_live
```
 
脉冲宽度调制（PWM） 是一种数字信号，最常用于控制电路。
## 计算
PWM频率
PWM频率 = 时钟频率CK_PSC/(PSC+1)/(ARR+1)
PWM占空比 = CCR/(ARR+1)
PWM分辨率 = 1/(ARR+1)

## 实践
1. 开启时钟
	1. TIM RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM2, ENABLE);
	2. GPIO RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA,ENABLE);
2. 配置时基单元
	1. TIM_InternalClockConfig(TIM2);  
	2. TIM_TimeBaseInitTypeDef Tim_TimeBaseInitStructure;  
	3. Tim_TimeBaseInitStructure.TIM_ClockDivision = TIM_CKD_DIV1;  
	4. Tim_TimeBaseInitStructure.TIM_CounterMode = TIM_CounterMode_Up;  
	5. Tim_TimeBaseInitStructure.TIM_Period = 7200-1;  
	6. Tim_TimeBaseInitStructure.TIM_Prescaler = 10000-1;  
	7. Tim_TimeBaseInitStructure.TIM_RepetitionCounter = 0;  
	8. TIM_TimeBaseInit(TIM2, &Tim_TimeBaseInitStructure);  
	9. TIM_Cmd(TIM2,ENABLE);
3. 配置输出比较单元
	1. 来一个结构体 TIM_OCInitTypeDef timOcInitTypeDef;
	2. (选)如果不想要配置结构体中每一个值, 可以使用这个一键配置初始值 TIM_OCStructInit(&timOcInitTypeDef);
	3. timOcInitTypeDef.TIM_OCMode = TIM_OCMode_PWM1;  timOcInitTypeDef.TIM_OCPolarity = TIM_OCPolarity_High;  timOcInitTypeDef.TIM_OutputState = TIM_OutputState_Enable;  timOcInitTypeDef.TIM_Pulse = ;
	4. 应用结构体到输出比较单元(这里是应用到第一通道, 如果想要启用多个通道, 可以使用这行代码类似的变体, 然后使用运行控制单独控制CCR) TIM_OC1Init(TIM2,&timOcInitTypeDef);
4. 配置GPIO(复用推挽输出, 普通的是由寄存器控制引脚的, 而复用的可以由片上外设(计时器)控制引脚)
	1. GPIO_InitTypeDef gpioInitTypeDef;  
	2. gpioInitTypeDef.GPIO_Mode = GPIO_Mode_AF_PP;  
	3. gpioInitTypeDef.GPIO_Pin = GPIO_Pin_0;  
	4. gpioInitTypeDef.GPIO_Speed = GPIO_Speed_50MHz;  
	5. GPIO_Init(GPIOA,&gpioInitTypeDef);
5. 运行控制
	1. 运行中单独控制CCR(CCR决定了占空比, 这里的数字指的是使用的通道) TIM_SetCompare1(TIM2,value);

## 引脚重映射
使用AFIO, 使用另外的引脚来输出TIM
1. 上电AFIO RCC_APB2PeriphClockCmd(RCC_APB2Periph_AFIO,ENABLE)
2. 应用重映射 GPIO_PinRemapConfig(GPIO_PartialRemap1_TIM2,ENABLE)
3. 如果引脚还是调试端口, 还要多进行一步解除调试端口

![[Pasted image 20240405132112.png]]
参数表在参考手册8.3寻找