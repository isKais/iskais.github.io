# ST7735S_TF屏幕 Overview
 
```ccard
type: folder_brief_live
```
 
## 接口
CS线就是SS线
SDA线就是MOSI线
SCL线就是SCK线
DC线是ST7735S用于区分接受的是数据还是命令的，当DC线处于低电平的情况下收到数据，那么这个数据就是命令。当DC线处于高电平的情况下收到数据，那么这个数据就是参数。
BLK线是背光控制，无需控制则接3.3V常亮即可。
	就是RST拉低，然后持续至少10us，接着把RST拉高，而后等待5~120ms即复位完成。
RST线是给TFT复位用的。

