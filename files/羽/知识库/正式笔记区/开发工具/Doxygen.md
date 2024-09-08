## 简述和使用
我觉得是一个注释软件
**Doxygen能将程序中的特定批注转换成为说明文件**。它可以依据程序本身的结构，将程序中按规范注释的批注经过处理生成一个纯粹的**参考手册**，通过提取代码结构或借助自动生成的包含依赖图、继承图）以及协作图来可视化文档之间的关系，Doxygen生成的帮助文档的格式可以是CHM、RTF、PostScript、PDF、HTML等。

| 命令  | 字符段  | 语法  |
|---|---|---|
|@file|文件名|file [< name >]|
|==@brief==|简介|brief { brief description }|
|@author|作者|author { list of authors }|
|@mainpage|主页信息|mainpage [(title)]|
|@date|年-月-日|date { date description }|
|@author|版本号|version { version number }|
|@copyright|版权|copyright { copyright description }|
|==@param==|参数|param [(dir)] < parameter-name> { parameter description }|
|==@return==|返回|return { description of the return value }<br>@return 程序执行是否成功 |
|@retval|返回值|retval { description }<br>@retval 1 执行失败<br>@retval 0 执行成功 |
|@bug|漏洞|bug { bug description }|
|@details|细节|details { detailed description }|
|@pre|前提条件|pre { description of the precondition }|
|@see|参考|see { references }|
|@link|连接(与@see类库，{@link [http://www.google.com](http://www.google.com/)})|link < link-object>|
|@throw|异常描述|throw < exception-object> { exception description }|
|@todo|待处理|todo { paragraph describing what is to be done }|
|@warning|警告信息|warning { warning message }|
|@deprecated|弃用说明。可用于描述替代方案，预期寿命等|deprecated { description }|
|@example|弃用说明。可用于描述替代方案，预期寿命等|deprecated { description }|