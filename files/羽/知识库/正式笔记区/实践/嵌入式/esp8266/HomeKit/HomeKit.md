# HomeKit Overview
 
```ccard
type: folder_brief_live
```
 
![[Pasted image 20240409204733.png|379]]
上面这个是不行的, 个人实测

![[Pasted image 20240409225817.png|376]]
使用这个 fullhaaboot

这里下载
https://github.com/RavenSystem/haa/releases/tag/12.12.4
类型选择如下图
![[Pasted image 20240409230046.png]]

烧录进去之后, 连接热点, 进入
http://192.168.4.1:4567 网址

进行配置wifi(其他先别配置), wifi默认2.5g

配置完wifi之后就耐心的等待吧, (估计使用可以连接外网的wifi可以加快速度)

现在开始记住三个颜色

|固件|设置颜色|描述|
|:--|:-:|:--|
|主固件 |白|具有 HomeKit 功能的主固件|
|OTA固件 |蓝|HAA MAIN 和 HAA BOOT 的安装程序|
|HAA启动固件 |橙|OTA MAIN 的安装程序|
刚才进入是橙色背景的HAA启动固件, 这个固件连接github安装其他的主固件

	如果刚才配置了MEPLHAA脚本, 就不知道进行到哪一步了, 也就没办法去排错了

等(23:05分开始等待)
洗完澡(23:18分已经可以进入了)

可以先进路由器后台查找一些ip地址, 然后使用ip:4567尝试进入
如果进入是白色背景的界面, 也就说明固件安装成功了

可以进行下一步配置了
注:**_如果对涉及附件类型的 MEPLHAA 脚本进行更改， 使用过的配件数量或更改它们的顺序，您必须在设置模式下检查[重置 HomeKit ID](https://github.com/RavenSystem/esp-homekit-devices/wiki/setup-mode#reset-homeKit-id) 并从 HomeKit 中删除您的设备;然后你必须再次配对。_**

设置界面选项解释 https://github.com/RavenSystem/esp-homekit-devices/wiki/setup-mode#reset-homeKit-id

配置MEPLHAA脚本结构
```js
{
  "c": {
    // 常规配置(类似于全局变量) https://github.com/RavenSystem/esp-homekit-devices/wiki/general-configuration
  },
  "a": [
    // 详细配置(具体的配置) https://github.com/RavenSystem/esp-homekit-devices/wiki/accessory-configuration
  ]
}
```

设备类型 由't'的值决定 https://github.com/RavenSystem/esp-homekit-devices/wiki/service-types
初始状态 's' 如果初始为高电平 则为1, 初始低电平则为0

要想使用GPIO(这不是废话吗)
从 HAA V12 Merlin 开始，必须在阵列中配置 GPIO 行为以确定硬件的工作方式。
https://github.com/RavenSystem/esp-homekit-devices/wiki/gpios-configuration

```js
{
  "c": // 全局设置
    {
	    "io" : [[ [ 2 ], 2 ],[ [ 0 ], 6 ]], //io口配置,使用io2,模式输出;使用io0,模式输入
        "b": [ [ 0, 5 ] ] // 长按io0时间8s进入设置模式
    }, 
  "a": [ // 内部设置
      { 
    "t": 1, // 硬件类型
    "s": 0,  // 初始状态
    "0": { "r": [{ "g": 2, "v": 0 }] }, // 状态0 使用的为io2 关闭状态为低电平0
    "1": { "r": [{ "g": 2, "v": 1 }] }  // 状态1 使用的为io2 开启状态为高电平1
      }
  ]
}
```

如果要使用pwm调光, 设备类型为30(灯泡)
```js
{
  "c":{"q":500,"io":[[[15,13,12],7],[[0],6]],"b":[[0,5]]},
  "a":[{
    "t":30, // 类型-灯
    "g":[15,13,12], // RGB连接的io口
    "b":[[0]] // 外部按钮控制(使用io0按钮控制灯泡)
  }]
}
```

可以使用 https://codebeautify.org/jsonvalidator 网站来检查代码
```js
// 莫名奇妙实现的pwm调光灯泡
{
"c":{
    "q":500, // 频闪,建议为3150(国标要求的护眼频闪)
    "io":
        [[[2],7],[[0],6]],
    "b":[[0,5]]
},
  "a":[{
    "t":30,
    "s":0,
    "g":[2]
  }]
}
```
要想重新进入设置界面, 断电, 并通电, 然后2s内断电, 然后通电即可
个人实测, 可以快速开关手机上家庭的控制(即快速开关灯,如果配件是灯的话)8次就可以进入设置了
![[Pasted image 20240409232433.png]]