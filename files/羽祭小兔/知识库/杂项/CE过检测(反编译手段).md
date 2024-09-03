大部分外挂都依托于ce程序, 而ce也被列入重点监测软件. 除了自己编写作弊驱动, 那么就只能给ce过检测了. 一些特殊群可能会有过检测的修改版ce, 但是我觉得还是要知道基本原理为妙. 然后我就找到了对应的教程. 在这里做了备份防止丢失. 希望我没有用上这个东西的一天

[参考教程](https://www.unknowncheats.me/forum/anti-cheat-bypass/504191-undetected-cheat-engine-driver-2022-bypass-anticheats-eac.html)--原网址已经保存到杂项根目录
[参考视频](https://www.bilibili.com/video/BV1MM411q7as)
## 需要的文件
CE 源码 https://github.com/cheat-engine/cheat-engine/releases/tag/7.4
Lazarus 编译器 https://sourceforge.net/projects/lazarus/files/Lazarus%20Windows%2032%20bits/Lazarus%202.0.10/
HXD https://mh-nexus.de/de/downloads.php?product=HxD20
VS2019 https://docs.microsoft.com/de-de/visualstudio/releases/2019/release-notes
Win10 SDK https://developer.microsoft.com/de-de/windows/downloads/sdk-archive
WDK https://docs.microsoft.com/de-de/windows-hardware/drivers/other-wdk-downloads
签名工具1 https://www.52pojie.cn/forum.php?mod=viewthread&tid=1027420
签名工具2 含教程 https://www.bilibili.com/read/cv9802857
vmdisk.img https://www.unknowncheats.me/forum/downloads.php?do=file&id=37389
驱动提权1 https://github.com/btbd/access
驱动提权2 https://github.com/FiYHer/handle_grant_access

## 步骤
建议依托于原教程和参考视频, 我这里只是依托于我自己的理解写的, 没有进行实操

### 源代码中驱动文件的调用的修改
原版CE dbk32.sys dbk64.sys 这两个驱动会被游戏检测
我们要在后面重新修改这里两个驱动文件(名字会变), 所以首先要在源代码(文件DBK32function.pas)中把相应的文件名字修改一下, 这样才能正常调用我们后面修改过的文件
需要在源文件修改的有
1. 调用的文件名字
2. 调用的进程名字

### 重新从源代码中编译ce
使用lazarus ide编译软件
编译的时候修改资源文件更改生成的程序的名字等内容

### 修改作弊程序中的字符串, 防止被搜索发现
(改来改去的, 这里是因为前面哪里源代码字符串没有修改完, 教程选择直接修改程序文件而不是源代码, 也不是不行, 这样的话简单, 不需要编程基础)
使用二进制编辑的软件(hxd)直接打开exe文件, 搜索替换所有`Cheat Engine`, `cheat engine`, `cheatengine`, `CheatEngine`, 防止后期出错(能跑就行), 替换格式要和原来格式一样

### 使用软件进行ce程序的保护
VMProtect
混淆和保护ce程序, 防止被反作弊程序发现修改后的程序的真面目
然后单击“添加功能”，然后单击“入口点”。  
现在切换到“选项”选项卡，然后双击“虚拟化”。  
如果需要，请再做一次，直到显示“超级（突变 + 虚拟化）”。  
然后点击“添加功能”。  
移除调试信息, 移除重定位信息, VM分段使用`.vmp`

### 中场休息和感悟
过检测主要就是过两个的检测, 一个是程序, 一个是驱动. 
要想更改内存的话, 一个作弊的软件要分为源程序和驱动两个东西, 驱动负责对接windows api来修改内存. 源程序负责对接用户
上面的操作已经把源程序保护起来了, 下个就该进行驱动的保护, 我觉得可以把反破解的技术放在上面, 加固程序保护(那些人应该就是这么做的)

作弊就是一种攻防战, 以游戏为例子. 
游戏就是目标, 而反作弊程序就是保护人. 
我们的程序是目标, 但同时也是保护人. 
我们要在防止自己的程序被对方反作弊程序攻破的同时, 攻破对方的程序. 
对方的程序有加固来保护它以防止外挂的入侵, 我们的程序也要有加固来防止对方反作弊程序的发现和清除
所以两方的技术是可以互相使用和学习的

### 后续
不想写了, 原理差不多已经明白了, 还有很多细节
斯, 待会把视频搞下来
我可能一直都不会用上这些技术, 就是当作学习的话感觉也太早了...
懒了~

结束!

## 补充
1. Lazarus 编译错误, 使用 2.0版本 https://sourceforge.net/projects/lazarus/files/Lazarus%20Windows%2032%20bits/Lazarus%202.0.10/
2. 签名工具教程 数字证书伪造与利用(仅方便用于驱动开发人员的调试，不得非法使用)
3. 驱动提权不支持 win7 win11
4. 差不多, 全部搞完的话就有那些cf外挂的一点点样子了. 很多年前我研究过cf吃鸡啥的的一些入门挂, 总是搞不懂原理, 不明白为什么有各种各样奇奇怪怪的ce, 他们的ce可以各种注入. 也不清楚那些挂各种各样过保护的手段, 现在研究出一部分了, 但是也没有兴致了哈哈. 
