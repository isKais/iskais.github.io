节点不能自动切换, 如果有的时候上不了网再去修改就很烦
这时候可以使用负载均衡

![[Pasted image 20240528230302.png]]
粘入如下代码
![[Pasted image 20240528230318.png]]

```
parsers: - reg: 'slbable$' yaml: append-proxy-groups: - name: ![⚖️](https://s.w.org/images/core/emoji/15.0.3/svg/2696.svg) 负载均衡-散列 type: load-balance url: 'http://www.google.com/generate_204' interval: 300 strategy: consistent-hashing - name: ![⚖️](https://s.w.org/images/core/emoji/15.0.3/svg/2696.svg) 负载均衡-轮询 type: load-balance url: 'http://www.google.com/generate_204' interval: 300 strategy: round-robin commands: - proxy-groups.![⚖️](https://s.w.org/images/core/emoji/15.0.3/svg/2696.svg) 负载均衡-散列.proxies=[]proxyNames - proxy-groups.0.proxies.0+![⚖️](https://s.w.org/images/core/emoji/15.0.3/svg/2696.svg) 负载均衡-散列 - proxy-groups.![⚖️](https://s.w.org/images/core/emoji/15.0.3/svg/2696.svg) 负载均衡-轮询.proxies=[]proxyNames - proxy-groups.0.proxies.0+![⚖️](https://s.w.org/images/core/emoji/15.0.3/svg/2696.svg) 负载均衡-轮询
```
![[Pasted image 20240528230412.png]]
修改节点提供商的设置, 最后面添加上`#slbable`

然后检查一下
![[Pasted image 20240528230503.png]]
如果有出现配置, 说明配置成功

然后重新刷新节点即可
![[Pasted image 20240528230555.png]]

关于系统代理、TUN模式、混合配置这些，**新手可以这么理解**：

- **系统代理**：就是浏览页面、看视频之类的走代理（魔法上网）。游戏、应用之类的不会走代理（虽然不是绝对）。
- **TUN 模式**：就是无论网页、游戏、应用还是什么全部按照规则走代理（魔法上网）。
- **混合模式**：就是上面两个混一起用。

我在上面使用的是轮询模式，关于轮询和散列模式在具体使用中感觉并不是特别的大。新手可以这么理解这两个模式（并不准确，但足够你理解）：

- **轮询模式**：按照节点顺序，挨个匹配请求。
- **散列模式**：按照随机规律（hash 随机），匹配请求。

