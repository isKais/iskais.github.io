# Gscript Overview
 
```ccard
type: folder_brief_live
```
 
## 关键词
1. const 定义常量,只读或不可变
2. static 将一个函数声明为静态函数，或将一个成员变量声明为静态成员变量
3. extends 继承
4. var 类似于cpp的auto, 用于根据具体值动态创建变量
	1. 可以作为define
		1. var typed_var: int
		2. var inferred_type := "String"
5. func 函数头 类似于python的def
6. match 类似于c的switch
```
match param3:
		3:
			print("param3 is 3!")
		_:
			print("param3 is not 3!")
```


## 区别
继承函数无需显式指出
同名函数会自动继承, 如果想要调用父函数, 使用super

## 函数
### func \_physics\_process(delta):
它在物理步骤之前被调用并且它的执行与物理服务器同步, 它也被以被每秒相同的次数调用

## 外置变量@export
### 基本的导出
`@export var 变量名:变量类型`

多行文字
`@export_multiline var 变量名:string`

变量类型可以是节点 node
甚至可以是更具体的派生node 如characterBody

可以是资源 resource
可以是更具体的类型 如texture2D

`@export_range(最小值,最大值,步长(可省略)) var 变量名`可以限定范围, 这样子就会出现控制的滑块

### 数组
普通数组
![[Pasted image 20240521163848.png]]
包含资源的资源数组
![[Pasted image 20240521163914.png]]

export的值可以是枚举类型, 这样就会出现下拉框
也可以使用`@export_enum`
![[Pasted image 20240521164112.png]]

## 文件,文件夹
`@export_file var 变量名`
可以使用通配符限制类型`@export_file(通配符) var 变量名`

`@export_dir` 文件夹


### 压缩组

![[Pasted image 20240521164446.png]]
这样可以形成一个可以折叠的变量组
下面是组内组

### 布尔组
![[Pasted image 20240521164645.png]]

## 迭代器
默认迭代器是用于数组和字典这样的数据结构
如果在默认迭代器无法完全满足你的需求的情况下，你可以通过重写脚本中 `Variant` 类的 `_iter_init` 、 `_iter_next` 和 `_iter_get` 这三个函数来创建自定义迭代器。

```
class ForwardIterator:
	var start
	var current
	var end
	var increment

	func _init(start, stop, increment):
		self.start = start
		self.current = start
		self.end = stop
		self.increment = increment

	func should_continue():
		return (current < end)

	func _iter_init(arg):
		current = start
		return should_continue()

	func _iter_next(arg):
		current += increment
		return should_continue()

	func _iter_get(arg):
		return current
```