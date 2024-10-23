# PlatformIO Overview
 
```ccard
type: folder_brief_live
```
 
是一个非常现代的开发集成环境
集成了之前需要繁琐安装的各种Kit, 值得被我另开一页强烈推荐
之前进行stm32开发除了使用keil之外, 需要通过
1. gcc-arm-none-eabi 进行编译代码
2. stm32cubeMX 进行基础的配置和组织文件和cmake
3. openocd 进行烧录
现在一个platformio即可搞定

更加让人惊喜的是, 在platformio上可以使用arduino的框架, 也就是使用arduino的代码在不同的平台运行! (未能经过测试,但是确实是有这个功能)

![[Pasted image 20240927120925.png]]
这里进入platformio home 解锁更多可能性
需要等待服务器启动, 会自动拉起浏览器, 如果等待时间过长在手动尝试进入

在这个界面可以导入arduino项目, 可以安装arduino库
需要在这个界面添加库,分析代码之类的操作之前, 需要添加项目project