# 51和CLion Overview
 
```ccard
type: folder_brief_live
```
 
好不容易配置好了, 结果没有记录下来

赶忙记录写不详细的步骤

pla使用的是python 记得关闭vpn

由于51单片机太老, 所以编译器也老, 无所谓的
![[Pasted image 20240516015037.png]]

要实现include不红并且可以代码洞察, 需要添加头文件目录到项目的pla.ini文件中
```
; PlatformIO Project Configuration File
;
;   Build options: build flags, source filter
;   Upload options: custom upload port, speed and extra flags
;   Library options: dependencies, extra library storages
;   Advanced options: extra scripting
;
; Please visit documentation for the other options and examples
; https://docs.platformio.org/page/projectconf.html

[env:STC89C52RC]
platform = intel_mcs51
board = STC89C52RC
lib_deps =
    C:\Users\Kai\.platformio\packages\toolchain-sdcc\include
    C:\Users\Kai\.platformio\packages\toolchain-sdcc\non-free\include
```

include使用
```
#include <mcs51/8052.h>
```

工具链备份
![[Pasted image 20240516015220.png]]
![[Pasted image 20240516015236.png]]
