# Jetbrain技巧 Overview
 
```ccard
type: folder_brief_live
```
## 自动生成注释
使用`///`进行单行注释
`/**`, `/*!`进行多行注释
注意, 如果只是使用`/*`或者`//`就只会生成普通注释

代码添加符合规范的注释，那么可以用Doxygen生成文档
要为函数添加新的 Doxygen 注释，只要生成它即可。 输入 `/**`, `/*!`， `///` 或 `//!`，然后按下 Enter。 程序会为您生成存根，以防您的函数有参数，返回值或出现异常。
也可以单个参数分散于整个程序代码中, clion会进行组织
如果函数参数与函数描述分开记录，CLion 将合并所有注释并显示完整函数的签名文档（就像 Doxygen 在生成输出时所做的那样）：  
![merge_doxygen](https://blog.jetbrains.com/wp-content/uploads/2016/05/clion-merge_doxygen.png)

![[Doxygen#简述和使用]]
## 自定义补全
设置-实时模板

## idea显示函数参数提示
CTRL+P

## 快速文档

[Quick Documentation](https://www.jetbrains.com/help/clion/2022.2/viewing-inline-documentation.html)（快速文档）弹出窗口 (Ctrl+Q) 是一种通用工具，有助于获取文本光标处代码元素的更多信息。 CLion 默认会在鼠标悬停时自动在弹出窗口中显示快速文档。 根据调用的元素，弹出窗口可以包括：

- 函数签名详细信息。
- 代码文档（常规或 Doxygen 注释）。
- 推断类型，尤其适合可能缺少显式类型的现代 C++。![[Pasted image 20240404023112.png]]
- 类型的大小。
- 宏替换有助于您更好地理解和调试嵌套宏。
- 常量表达式的值。
- 作为整数的 `Enum` 值。

## 安全重命名
为保持文档正确性，请使用 Rename 重构 Shift+F6 来更新函数名或其参数。 CLion 将更新 Doxygen 注释和其他引用。

## 转到声明
CTRL+B

## 快速创建一行到光标行前
CTRL+ALT+ENTER

## 快速创建一行到光标行后
CTRL+SHIFT+ENTER

## 触发代码补全/继续代码补全
CTRL+SHIFT+SPACE
CTRL+SPACE 也可以