
	vdd是最高电压 vcc是最低电压(不一定对)
	通过修改输入数据寄存器的值(GPIO_ODR)的值, 就可以修改GPIO引脚的输出电平
	BSRR（端口位设置/清除寄存器） 和 BRR（端口位清除寄存器）
# 基础
## 工作模式
![[Pasted image 20221118160330.png]]
注意模拟输入的时候gpio无效 引脚直接进入内部adc
上拉下拉输入就是有个悬空时候的电平 而浮空输入就是没有悬空是默认电平(引脚悬空会导致输入浮动不确定)

推挽输出: 高低电平均有驱动能力 stm32对io可以很好的控制,控制使用这个模式
开漏输出: 只有低电平有驱动能力 因为高电平为高阻态 可以运用于通讯协议

**注意 一个端口可以有多个输入 但是只能有一个输出**

## 基础步骤
### GPIO输出
然后要让gpio输出
1. 启动对应gpio组的时钟
	1. `RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOx, ENABLE);`
		注意这里的apb2表示总线(?)不用去管, gpiox这里根据情况写
2. 配置要携带参数的(结构体)
	1. `GPIO_InitTypeDef GPIOs;` 定义某个名字是代表特殊结构体类型
	2. `GPIOs.GPIO_Mode = GPIO_Mode_Out_PP;`设置输出模式
	3. `GPIOs.GPIO_Pin = GPIO_Pin_All; `设置要设置的对应引脚
	4. `GPIOs.GPIO_Speed = GPIO_Speed_50MHz;`设置对应速度
3. 将打包好的(结构体)输入函数，进行初始化函数
	1. `GPIO_Init(GPIOA, &GPIOs);`第一个指向gpio组, 第二个指向携带参数的结构体的地址, 注意结构体不能直接传递, 所以要传递地址
4. 使用库操控引脚吧(1,2,3都可以使用按位或选中多个引脚)
	1. `GPIO_SetBits(GPIOA, GPIO_Pin_x);` 对应端口设为高电平
	2. `GPIO_ResetBits(GPIOA, GPIO_Pin_x)`对应端口重置也就是设为低电平
	3. `GPIO_WriteBit(GPIOx, GPIO_Pin, BitVal)`这个是二合一函数
		1. Bit_RESET 
		2. Bit_SET
		注意stm32不像arduino那样可以自动循环 所以要手动搞个死循环在里面
		`while(1){}`

### GPIO输入
1. 启动对应gpio组的时钟
	1. `RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOx, ENABLE);`
2. 配置要携带参数的(结构体)
	1. `GPIO_InitTypeDef GPIOs;` 定义某个名字是代表特殊结构体类型
	2. `GPIOs.GPIO_Mode = GPIO_Mode_IN_FLOATING;`设置输入模式（浮空输入）
	3. `GPIOs.GPIO_Pin = GPIO_Pin_All; `设置要设置的对应引脚
	4. `GPIOs.GPIO_Speed = GPIO_Speed_50MHz;`设置对应速度
3. 将打包好的(结构体)输入函数，进行初始化函数
	1. `GPIO_Init(GPIOA, &GPIOs);`第一个指向gpio组, 第二个指向携带参数的结构体的地址, 注意结构体不能直接传递, 所以要传递地址
这里之上的步骤类似于gpio输出
下面要进行输入检测
使用`GPIO_ReadInputDataBit(GPIOx,GPIO_Pin)`函数，这里会返回0/1
注意：这里不能使用`GPIO_ReadInputData(GPIOx)`，这个是获取整个的，不是某个端口

## GPIO的位带操作
首先知道前提，位操作是指单独的对一个比特位进行读写 （补充：只有小部分地区实现了可以位带操作，stm32有两个1mb的位置可以进行位带操作） ，要对位进行精准的读写就需要知道位的位置，而位带别名区就可以帮助我们精准的知道某个位的位置，我们访问位带别名区就相当于访问那个需要访问的位，通过位带进行访问等操作就叫做位带操作

