# USART Overview
 
```ccard
type: folder_brief_live
```
## 串口
串口成本低, 容易使用, 最简单的通讯协议
一个芯片 CH340 负责USB协议传串口协议

## 硬件电路
简单双向串口通讯需要两条通信线, 一条GND, 一条VCC (GND,TX,RX是必须要接的)
只需要单向的数据传输时, 可以只接一根通信线
当电平标准不一致时, 需要加电平转换芯片(有不同的电平标准)

### 电平标准
电平标准是数据1和数据0的表达方式
1. TTL电平 +3.3v和+5v表示1, 0v表示0
2. RS232电平
3. RS485电平(差分信号,传输距离远)

## 串口参数和时序
### 发送的格式
一帧共10位, 起始位和停止位占据最前和最后一位, 起始位固定为低电平, 停止位固定为高电平
数据位有8位, 从第二位开始D0-D7, 数据位后面停止位前面为校验位(通过数据计算得来), 用来校验数据
空闲状态高电平!

### 参数
- 波特率: 通信的速率
- 起始位: 标志一个数据帧的开始
- 数据位: 数据帧的有效负荷, 1为高电平, 0为低电平, 低位先行(先发送低位,在发送高位, 从右到左)
- (可选)校验位: 用于数据验证(奇偶校验)
- 停止位: 用于数据帧间隔
## stm32 USART外设
波特率 9600 115200
支持同步模式(时钟)
硬件流控制 (是否有准备信号, 防止由于处理速度不一致出现数据丢失)

### 接线
TXD-A10
RXD-A9

## 配置流程
1. 开启时钟
	1. USART RCC_APB2PeriphClockCmd(RCC_APB2Periph_USART1,ENABLE);
	2. GPIO RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB,ENABLE);(对应的引脚, 看引脚图)
2. Gpio初始化
	1. GPIO_InitTypeDef gpioInitTypeDef;  
	2. gpioInitTypeDef.GPIO_Mode = GPIO_Mode_AF_PP;  (记得要下拉)
	3. gpioInitTypeDef.GPIO_Pin = GPIO_Pin_10;  
	4. gpioInitTypeDef.GPIO_Speed = GPIO_Speed_50MHz;  
	5. GPIO_Init(GPIOB,&gpioInitTypeDef);
3. 配置USART
	1. 结构体来一个 USART_InitTypeDef usartInitTypeDef;
	2. 配置结构体
		1. usartInitTypeDef.USART_BaudRate = 9600; 波特率
		2. usartInitTypeDef.USART_Mode = USART_Mode_Tx; 配置功能(TX是发送,RX是接收,如果都要就`|`把两个连接起来即可)
		3. usartInitTypeDef.USART_HardwareFlowControl = USART_HardwareFlowControl_None; 硬件流控控制
		4. usartInitTypeDef.USART_WordLength = USART_WordLength_8b; 字长
		5. usartInitTypeDef.USART_StopBits = USART_StopBits_1; 停止位长度
		6. usartInitTypeDef.USART_Parity = USART_Parity_No; 校验位配置
	3. 应用结构体
		1. USART_Init(USART3,&usartInitTypeDef);
4. 开启USART
	1. USART_Cmd(USART3,ENABLE);
5. (选)配置中断(如果要接收的话)

### 发送数据的函数
```c
void Serial_SendByte(uint8_t Byte){  
    USART_SendData(USART1,Byte);  
    while (USART_GetFlagStatus(USART1, USART_FLAG_TXE)==RESET);  
}  
  
void Serial_SendArray(uint8_t * ByteArray){  
    uint8_t ArrayLength = sizeof(&ByteArray)/sizeof(ByteArray[0]);  
    for (int i = 0; i < ArrayLength; ++i) {  
        Serial_SendByte(ByteArray[i]);  
    }  
}  
  
void Serial_SendString(char * String){  
    uint8_t i = 0;  
    do {  
        Serial_SendByte(String[i]);  
        i++;  
    } while (String[i]!=0);  
}
```

### 移植Printf函数
https://www.bilibili.com/video/BV1th411z7sn?t=2212.3&p=27

## 接收
### 查询
在主函数里面不断判断标志位(RXNE=1表示接收到数据)
receiveData可以读取DR寄存器(如果读取了DR寄存器, 标志位会自动清零, 如果没有读取, 要手动使用`USART_ClearITPendingBit(USART1,USART_FLAG_RXNE);`)
```c
while (1){  
    if(USART_GetFlagStatus(USART1,USART_FLAG_RXNE)==SET){  
        RxData = USART_ReceiveData(USART1);  
        Serial_SendByte(RxData);  
    }
```

### 中断
主程序中复写EXTI1_IRQHandler函数
```c
void EXTI1_IRQHandler(void) {  
    if(EXTI_GetITStatus(EXTI_Line1) != RESET) {  
        // 在这里添加您的处理代码  
        PWM_SetCCR(50);  
        Delay_s(10);  
        // 清除中断标志位  
        EXTI_ClearITPendingBit(EXTI_Line1);  
    }  
}
```

### 中断配置代码
在串口配置好的基础上可以直接添加中断配置代码
```c
void Exti_SerialInit(){  
    USART_ITConfig(USART1,USART_IT_RXNE,ENABLE);  
  
    NVIC_PriorityGroupConfig(NVIC_PriorityGroup_2);  
    NVIC_InitTypeDef nvicInitTypeDef;  
    nvicInitTypeDef.NVIC_IRQChannel = USART1_IRQn;  
    nvicInitTypeDef.NVIC_IRQChannelSubPriority = 1;  
    nvicInitTypeDef.NVIC_IRQChannelPreemptionPriority = 1;  
    nvicInitTypeDef.NVIC_IRQChannelCmd = ENABLE;  
    NVIC_Init(&nvicInitTypeDef);  
}
```

当前观看位置如下
https://www.bilibili.com/video/BV1th411z7sn?t=2.9&p=28