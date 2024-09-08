# 维修 Overview
 
```ccard
type: folder_brief_live
```
## 关于clion这个软件
这个软件由于较现代 所以配置方法不能只看攻略要去因地制宜 因为更新的很快软件也较为完善 所以更加需要自己去思考
### 配置
https://zhuanlan.zhihu.com/p/145801160
这两个教程混合参考
参考到标准库移植之前
https://www.bilibili.com/read/cv11442303
https://www.bilibili.com/read/cv6308000/
通过这两个教程配置好文件

### 标准库移植
要知道clion是使用类似stm32cubeide工程形式进行工程组织的（应该是，其实原因更倾向于这两个都是使用stm32cubemx进行工程生成的）所以这两个软件的标准库移植是大同小异的 所以可以互相参考 甚至前面创建工程也可以使用cubeide的方法
要明确的是 clion是通过cmake进行编译（应该）所以cmake是重中之重 而对应的stm32cubeide是使用配置进行编译指令的 所以 看教程 当stm32cubeide在配置的时候 要在clion的cmake做出同样的配置（也许cubeide的配置也是一个cmake呢，哈哈哈）（这就是cmake的优越性 一处配置好处处有用）

https://blog.csdn.net/white_loong/article/details/108461796

然后默认生成的启动文件`startup`不用删除 是可以用的
黏贴lib文件夹进去
首先在cmake的54行配置一下
`add_definitions(-DDEBUG -DUSE_STDPERIPH_DRIVER -DSTM32F103x6 -DSTM32F10X_LD)`
这里对应keli的c/cpp选项中的要填use_stdpe...这个部分 和cubeide的这个部分![[Pasted image 20240119234837.png]]注意这里的stm32f10x...这里要根据实际情况选择 不要乱选 hd这些都是有意义的 去百度一下


关注的是cubeide配置的这里
![[Pasted image 20240119235122.png]]这里对应cmake的52行这里
`include_directories(Libraries/CMSIS/CM3/ Libraries/STM32F10x_StdPeriph_Driver/inc/ Inc Libraries/CMSIS/CM3/CoreSupport/ Libraries/CMSIS/CM3/DeviceSupport/ST/STM32F10x/ Libraries/STM32F10x_StdPeriph_Driver )`
(后期编译的时候缺少什么文件就这里添加)

还有cubeide配置的这里![[Pasted image 20240119235153.png]]

是相当于cmake的这里
56行`file(GLOB_RECURSE SOURCES "Libraries/CMSIS/CM3/*.*" "Libraries/STM32F10x_StdPeriph_Driver/src/*.*" "Startup/*.*" "Inc/*.*" "Src/*.*")`
这里表示包含的工程 那个cmake配置上面表示要引入的库 这两个不一样的(应该吧,可能也需要把库包括进来) 这里要添加工程的file位置 不然会出现编译的时候找不到main 然后clion会在main这里显示 此文件不属于任何工程 编译的时候会报错 

然后进行编译试一下 说少什么就在include哪里包括什么就可以了
(以后还得认真学一下cmake吧)

然后编译的话 上面的选项里面有个清除编译的按钮(二级菜单) 要善用

哦 别忘了还有内核文件要进行修改 参考第三个链接这里
完整文件已经进行打包 以后可以拆包研究 
然后文件目录在这里
![[Pasted image 20240119235205.png]]
也许可以进行精简 

关于cfg的配置按照第二个链接进行
然后cfg最少其实只要两行代码
这样子
```
source [find interface/stlink.cfg]  
source [find target/stm32f1x.cfg]
```
就可以了