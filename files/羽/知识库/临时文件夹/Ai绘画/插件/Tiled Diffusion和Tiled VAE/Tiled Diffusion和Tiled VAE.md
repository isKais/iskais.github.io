# Tiled Diffusion和Tiled VAE Overview
生成超大图的

## 两种平铺算法
- MultiDiffusion: 适合图像重绘, 元素重绘, 风格迁移和放大(更加有逻辑)
- Mixture of Diffusers: 适合直接生成大图使用, 有效防止接缝

## 参数
放大倍数推荐1.5, 重绘幅度推荐0.3-0.45
噪声反演: 可以更好的还原细节, 尽量不破坏细节
分区提示词控制: 可以控制不同分区的tag(适合大图使用), 某些部分由什么tag组成