# Python 类型注解 Overview
 
```ccard
type: folder_brief_live
```
 
	让自己更麻烦, 让IDE更加方便(追踪错误)

### 定义变量
在定义一个变量时，直接在后面 `: 类型` 就可以给这个变量指定一个类型，后面可以继续写赋值语句 `= 1`，不写赋值语句也不会出错
```python
# 声明变量时使用
num: int = 1
# 函数参数也可以使用
def test(num: int = 1):
# 可以在list, dict, set, tuple定义时使用,注意使用[]
mylist: list[int] = []
myset: set[int] = {1}
mytuple: tuple[int, str] = (1, '2')
mydict: dict[str, int] = {'1': 1}
```

类型之间也可以嵌套(已经开始有点阅读困难了)：
```python
e: dict[str, list[int]] = {'1': [1,2]}
```


### 返回值
在函数的冒号之前， `->` 可以指定函数的返回值类型
```python
def on_button_pressed(self, event: Button.Pressed) -> None:
```
	None 是一种类型提示特例
### 
