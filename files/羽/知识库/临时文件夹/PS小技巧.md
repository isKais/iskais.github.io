## 图片部分换色
1. 选区抠出并且复制图层(ctrl+j)
2. 扣出的部分进行去色(图像-调整-去色)
3. 将去色图层复制一份, 一份作为高频, 一份作为低频
4. 对低频图层执行高斯模糊(滤镜-模糊-高斯模糊), 参数为3
5. 对高频图层进行应用图像(图像-应用图像), 应用图像界面图层选择低频图层, 混合模式改为减去, 缩放2, 补偿128
6. 图层混合模式改成线性光
7. 选择低频图层, 添加色相/饱和度图层, 创建剪贴蒙版, 勾选着色. 然后就可以在该图层修改颜色了

## 究极去雾教程
[完蛋！我被雾霾包围了！城市风光究极去雾教程](https://www.bilibili.com/video/BV1fe411k7qD/?share_source=copy_web&vd_source=56341c6ca967de83766f14b483eb9ed6) 

## 图像融合
### 方法1
尽量扣出主体, 多选主体和背景图层, (编辑-自动混合图层), 方法选择堆叠图像
### 方法2
扣出主体, 将抠出来的复制一层, 原图层去色, 图层混合模式改成线性加深, 然后调整色阶(ctrl+l)即可

