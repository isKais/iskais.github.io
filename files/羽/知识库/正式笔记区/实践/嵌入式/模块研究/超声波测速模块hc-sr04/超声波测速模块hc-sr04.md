# 超声波测速模块hc-sr04 Overview
 
```ccard
type: folder_brief_live
```
 
## 引脚
- vcc: 输入口, 需要输入5v电压
- trig: 触发信号输入
- echo: 回响信号输出
- gud: 接地
## 原理
接入电源之后, 给trig输入一个高电平 方波(至少10us), 然后模块会自动发射8个40khz的声波
此时echo的电平会由0变为1
当超声波返回波被接收到的时候, echo会由1变为0