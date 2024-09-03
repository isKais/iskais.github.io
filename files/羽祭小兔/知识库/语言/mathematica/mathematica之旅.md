[Online](www.wolframalpha.com)
学校高数要求的mathematica，那就略微涉略下吧
## 前言
mathematica是一款吊炸天的计算器(doge), 是世界上使用最广泛的数学计算软件
要使用该款软件, 需要学习一门特殊的编程语言--Wolfram 语言
### Wolfram 语言
世界上唯一的全领域计算语言
实现计算范式 凭借基于深度广泛的算法的内置计算智能和三十年以上精心整合的真实世界的知识，Wolfram 语言提供了前所未有的高等级计算的能力。Wolfram 语言构建于清晰的原理，以及简洁统一的符号结构，可在本地和云端即刻部署，从而适用于从简单到复杂的编程。其不仅是世界上最高生产力的编程语言，同时对于人类和人工智能而言，也是真正意义的计算交流语言。
[官方语言文档](https://reference.wolfram.com/language/)
[官方互动性学习网站](https://www.wolfram.com/wolfram-u/an-elementary-introduction-to-the-wolfram-language/)
[快速编程入门](https://www.wolfram.com/language/fast-introduction-for-programmers/zh/)
## 小坑
1.  内置函数首字母大写  
2.  []里面是所需要计算的内容  
3.  {} 列表或者范围
4. 两个数或表达式之间空一格就代表两者相乘

## 作业
1. `Limit[(2/pi)arctan[x], n->Infinity]`
2. `Limit[((a^x+b^x+c^x)/3)^(1/x), n->0]`注意:范围暂时不知道怎么表示,这个是错的
```
f[x_] = ln (tan (x/2)) + ln (x + (x^2 + 1)^(1/2));
D[f[x], {x, 2}]
```
```
f[x_] = ln (tan (x/2)) + ln (x + (x^2 + 1)^(1/2)); 
D[f[x], x] /. x -> 1
```
![[Pasted image 20221023180901.png]]

`y = 1/5 (x^4 - 6 x^2 + 8 x + 7);Plot[y, {x, -3., 3.}]`

`f (n_) = (50 E^((n)^(1/2)/6)/(1.05)^n);DiscretePlot[50 1.05^-n E^(Sqrt[n]/6), {n, 1, 20}]`


## 第二次作业
```
Integrate[1/Sqrt[(1 + x^2)^3], {x, 1, Sqrt[3]}]
```

Integrate[sin (Log10[x]), {x, 1, E}]

Integrate[(xsin (x))/(1 + cos (x)), x]