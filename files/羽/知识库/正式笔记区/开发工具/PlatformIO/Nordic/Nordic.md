# Nordic Overview
 
```ccard
type: folder_brief_live
```
 
由于platformio的跨平台, 所以可以很方便迁移系统, 所以只需要学习少部分的嵌入式平台即可, 所以无需过多学习的一些嵌入式平台知识放在开发工具之下, 只保留配置的基本操作

https://docs.platformio.org/en/latest/boards/nordicnrf51/nrf51_dk.html

烧录器的配置文件为platformio.ini

例如我需要使用daplink烧录, 我需要将platformio.ini文件添加
`upload_protocol = cmsis-dap`
如果需要使用daplink调试, 需要添加
debug_tool

首先要寻找到引脚定义
![[Pasted image 20240917153756.png]]
这边去就是嵌入式原生的库文件所在地

在 Arduino 核心库中，`variant.h` 文件通常包含了特定板子的引脚定义。你可以在这个文件中找到引脚编号和名称的映射
![[Pasted image 20240917173416.png]]

可以尝试使用openocd连接nordic芯片
openocd -f interface/cmsis-dap.cfg -c "transport select swd" -f target/nrf51.cfg

连接telnet 端口号等如上代码所出
![[Pasted image 20240917183505.png]]

然后使用telnet连接芯片

首先得需要使用halt使得芯片停止运行, 然后可以进行擦除
nordic的芯片断电重启以写入

openocd复位代码: 
`openocd -f interface/cmsis-dap.cfg -f target/nrf51.cfg -c "init" -c "reset halt" -c "shutdown"`

使用`halt`命令暂停CPU：(此代码也可以退出halt状态???)
`openocd -f interface/cmsis-dap.cfg -c "transport select swd" -f target/nrf51.cfg -c "init" -c "halt"
`

芯片擦除
`C:\openocd\bin>openocd -f interface/cmsis-dap.cfg -c "transport select swd" -f target/nrf51.cfg -c "init" -c "halt" -c "nrf51 mass_erase"`


	-c 后面跟的就是命令, 这个命令也是在gdp哪里运行的
	提取固件


(原因是因为nrf51要进行烧录之前需要进行擦除)
openocd -f interface/cmsis-dap.cfg -c "transport select swd" -c "adapter speed 1000" -f target/nrf51.cfg  -c "init" -c "halt"   -c "nrf51 mass_erase"  -c "program C:/Users/Kai/CLionProjects/untitled/.pio/build/nrf51_dk/firmware.hex verify reset" -c "shutdown"

写入固件并且校验
openocd -f interface/cmsis-dap.cfg -c "transport select swd" -f target/nrf51.cfg -c "init" -c "reset halt" -c "load_image C:/Users/Kai/CLionProjects/untitled/.pio/build/nrf51_dk/firmware.elf" -c "verify_image C:/Users/Kai/CLionProjects/untitled/.pio/build/nrf51_dk/firmware.elf" -c "reset run" -c "shutdown"

"C:\Users\Kai\Desktop\peripheral\blinky\hex\blinky_pca10028.hex"
openocd -f interface/cmsis-dap.cfg -c "transport select swd" -c "adapter speed 1000" -f target/nrf51.cfg  -c "init" -c "halt"   -c "nrf51 mass_erase"  -c "program C:/Users/Kai/Desktop/peripheral/blinky/hex/blinky_pca10028.hex verify reset" -c "shutdown"

[例程](https://github.com/platformio/platform-nordicnrf51/tree/master/examples?utm_source=platformio.org&utm_medium=docs)


## 问题和解决
在烧录过程发现io口对应不上, 有可能是配置出错, 也就是开发板没有选对
例如默认配置就是nrf51_dk的开发板, 这会影响io口
![[Pasted image 20240921140059.png]]

一般情况下, 默认的board都是开发板, 不是运用于实际使用的

比如上面的配置文件, 使用的是nrf51_dk环境
该环境保存在这个目录`C:\Users\Kai\.platformio\platforms\nordicnrf51\boards`

环境不同值如下
![[Pasted image 20240921184853.png]]
如图可知 variant使用了PCA1000X
该引脚配置variant位于
`C:\Users\Kai\.platformio\packages\framework-arduinonordicnrf5\variants`


[platformIO 自定义板子方法](https://blog.csdn.net/kimiyang123/article/details/125850951)


## keil
不知道是软件错误还是硬件错误, 只能操控4个引脚, 所以尝试使用官方例程

安装
- NordicSemiconductor.nRF_DeviceFamilyPack.8.11.1.pack
- CMSIS.4.5.0 pack
- nrfgostudio_win-64_1.15.1_installer.msi

下载官方例程和sdk
![[Pasted image 20240921203059.png]]

### Pca版本号
nRF51 Development Kit (PCA10028)
nRF51 Dongle (PCA10031)

### 问题
`RTE\Device\nRF51422_xxAC\system_nrf51.c(29): error:  #5: cannot open source input file "nrf51_erratas.h": No such file or directory`
遇到这个问题
因为新的包和旧的包system_nrf51文件不同, 而keil会自动使用新包对项目中进行替换(构建项目时), 所以

https://blog.csdn.net/chenbb8/article/details/123485515
如果进行卸载软件包操作, 需要还重新构建整个文件, 因为文件已经被替换进去了, 但是可以解决之后的问题

一般进行替代即可临时解决
![[Pasted image 20240921212608.png]]`C:\Users\Kai\AppData\Local\Arm\Packs\NordicSemiconductor\nRF_DeviceFamilyPack\8.11.1\Device\Source`
替换到
`\RTE\Device\nRF51422_xxAC`

然后即可成功编译
如果需要烧录的话
确保这里读出了调试器序列号，并且识别了Device
![[Pasted image 20240921214635.png]]

然后这里设置烧录算法
![[Pasted image 20240921214952.png]]
选择第一个, 返回即可成功烧录了

keil的软件重置貌似没用, 要断电重启