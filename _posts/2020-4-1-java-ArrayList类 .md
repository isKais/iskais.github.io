---
layout: post
title: javaArrayList类
cover: cover.jpg
date:   2020-4-01 14:20:00
categories: posts
---

# ArrayList类  
(一个方便的Array)  

```<E>```
表示范型，即集合中的元素只能有一种类型 

构造器描述
```
ArrayList()	
构造一个初始容量为10的空列表。

ArrayList<E>(int initialCapacity)	
构造具有指定初始容量的空列表。
```



方法

add(int index, E element): 将指定元素插入此列表中的指定位置。

boolean	add(E e): 将指定的元素追加到此列表的末尾。

clear(): 从此列表中删除所有元素。

isEmpty(): 如果此列表不包含任何元素，则返回 true 。

remove(int index): 删除此列表中指定位置的元素。 将任何后续元素向左移位（从索引中减去一个元素）。
