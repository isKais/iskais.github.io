# make-makefile-cmake都是啥 Overview
 
```ccard
type: folder_brief_live
```
## gcc
它是GNU Compiler Collection（就是GNU编译器套件），也可以简单认为是**编译器**，它可以编译很多种编程语言（括C、C++、Objective-C、Fortran、Java等等）。
这是一个编译器, 输入代码可以编译源文件, 但是不方便, 特别是多文件的情况下很麻烦. 单一文件还好, 等到大项目的时候就困难了

所以出现了下面make工具。
## make
make工具可以看成是一个智能的**批处理**工具，它本身并没有编译和链接的功能，而是用类似于批处理的方式—通过调用**makefile文件**中用户指定的命令来进行编译和链接的。

所以makefile就相当于是make工具的配置文件
## makefile

这个是啥东西？

简单的说就像一首歌的乐谱，make工具就像指挥家，指挥家根据乐谱指挥整个乐团怎么样演奏，make工具就根据makefile中的命令进行编译和链接的。makefile命令中就包含了调用gcc（也可以是别的编译器）去编译某个源文件的命令。

但是如果我懒得写makefile呢? 因为在makefile文件里面需要我手动写命令, 这是很重复的工作. 并且如果我要跨平台的话, 我就得根据不同的编译器重新写过. 这实在是太麻烦了.
这时候就出现了下面的Cmake这个工具。
## cmake

cmake就可以更加简单的生成makefile文件给上面那个make用。当然cmake还有其他更牛X功能，就是可以**跨平台**生成对应平台能用的makefile，我们就不用再自己去修改了。

那cmake怎么知道你的项目要依赖什么? 这就需要cmakelist文件, 这个文件告诉cmake需要什么
## CMakeList.txt

到最后CMakeLists.txt文件谁写啊？亲，是你自己手写的。