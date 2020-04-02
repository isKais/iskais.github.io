---
layout: post
title: if __name__ == '__main__' 如何正确理解?
cover: cover.jpg
date:   2020-4-2 17:18:00
categories: posts
---
# if __name__ == '__main__' 如何正确理解?
根据[知乎的问答](https://www.zhihu.com/question/49136398)


通过__name__的值
我们可以判断出该模块是作为脚本正在执行还是被其他模块导入
而根据这个判断，我们就可以选择性地执行代码。
将只有模块作为脚本执行时的代码放入到
```
if __name__ == '__main__':
```
的条件中，比如执行单元测试等。
