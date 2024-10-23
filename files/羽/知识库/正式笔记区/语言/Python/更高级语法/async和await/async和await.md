# async和await Overview
 
```ccard
type: folder_brief_live
```
新的并发编程方式, 之前为thread模块, 现在使用基于 yield 关键字的协程并发编程方法

https://fastapi.tiangolo.com/async/
## 复习
### 并发
并发: 一种单线程cpu处理多程序的方法, 通过不断的切换不同程序实现多线程功能, 注意同一时间只会处理一个
### 同步和异步
- 同步指的是执行操作的时候, cpu按顺序执行程序, 当遇到耗时程序的时候只有等待子程序执行完毕才会继续执行 (等到你之后才走)
- 异步指的是, 各自执行自己的. (各走各的)
### 协程,线程和进程
多进程通常利用的是多核 CPU 的优势，同时执行多个计算任务。每个进程有自己独立的内存管理，所以不同进程之间要进行数据通信比较麻烦。(使用不同的大小核执行多个计算任务, "cpu数量取胜")

多线程是在一个 cpu 上创建多个子任务，当某一个子任务休息的时候其他任务接着执行。多线程的控制是由 python 自己控制的。 子线程之间的内存是共享的，并不需要额外的数据通信机制。但是线程存在数据同步问题，所以要有锁机制。 (并发方式, "cpu质量取胜")

协程的实现是在一个线程内实现的，相当于流水线作业。由于线程切换的消耗比较大，所以对于并发编程，可以优先使用协程。(类似于多线程模式???)
### 代码
```python
import asyncio
import time

async def visit_url(url, response_time):
    """访问 url"""
    await asyncio.sleep(response_time)
    return f"访问{url}, 已得到返回结果"

async def run_task():
    """需要有一个方法来收集子任务"""
    task = visit_url('http://wangzhen.com', 2)
    task_2 = visit_url('http://another', 3)
    await asyncio.run(task)
    await asyncio.run(task_2)

asyncio.run(run_task())
print(f"消耗时间：{time.perf_counter() - start_time}")
```

首先需要使用一个内置库 `asyncio` 建立带有async头的函数, 并且在耗时任务的代码行使用await标记, 然后进行并发的时候, 如果遇到带有async头函数, 并且执行到具有await行, 将会返回上个程序(同时子程序会继续运行)继续运行后续的代码, 等到子程序中await行的代码执行完之后, 会回到子程序继续执行

await 表示在这个地方等待子函数执行完成，再往下执行。（在并发操作中，把程序控制权教给主程序，让他分配其他协程执行。）await语法只能出现在通过async修饰的函数中，否则会报SyntaxError错误。

#### 进行并发的方式
1. 使用`asyncio.run()`
2. 使用`asyncio.create_task()`
```python
async def run_task():
    coro = visit_url('http://wangzhen.com', 2)
    coro_2 = visit_url('http://another.com', 3)

    task1 = asyncio.create_task(coro)
    task2 = asyncio.create_task(coro_2)

    await task1
    await task2

```