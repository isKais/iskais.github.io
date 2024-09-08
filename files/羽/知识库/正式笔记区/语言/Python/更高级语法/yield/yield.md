# yield Overview
 
```ccard
type: folder_brief_live
```
 看下Python中常见的几种函数形式：
1. 普通函数  

```python
def function():
    return 1
```

2. 生成器函数

```python
def generator():
    yield 1
```


感谢博客https://blog.csdn.net/mieleizhi0522/article/details/82142856

```
def foo():
    print("starting...")
    while True:
        res = yield 4
        print("res:",res)
g = foo()
print(next(g))
print("*"*20)
print(g.send(7))
```
再看一个这个生成器的send函数的例子，这个例子就把上面那个例子的最后一行换掉了，输出结果：

```
starting...
4
********************
res: 7
```
当生成器执行到yield 4语句时，它会暂停执行，并将4作为当前的结果返回给调用者。这意味着yield 4语句本身并不会将4赋值给res变量。

当我们调用g.send(7)时，发送的值7会被作为yield表达式的结果，并赋值给res变量。也就是说，res变量的值是由调用者发送的值决定的，而不是由yield语句返回的值决定的。