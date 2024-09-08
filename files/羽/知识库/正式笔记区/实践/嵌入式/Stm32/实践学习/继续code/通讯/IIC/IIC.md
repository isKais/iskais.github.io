# IIC Overview
 
```ccard
type: folder_brief_live
```
 
通用数据总线
两根通讯线 SCL,SDA(一条串行时钟一条串行数据)
同步, 半双工, 带数据应答
可以总线挂载多设备, 一主多从, 多主多从

## 硬件规定
- 所有iic设备的scl和sda连接在一起
- 所有的scl和sda均要配置成开漏输出模式
- scl和sda添加一个上拉电阻(4.7k)

一般情况: 
scl低电平修改sda数据, scl高电平读取sda数据, 也就是说保持一个
scl低电平可以写入
scl高电平可以读取的过程
两个特殊情况: 
- 停止位: scl高电平(本来该读取的时候), 主机拉高sda
- 起始位: sc低电平, 主机拉低sda

高位先行

主机给应答了, 从机会继续发数据
主机给非应答, 从机结束数据传输

https://www.bilibili.com/video/BV1th411z7sn?t=1340.0&p=33