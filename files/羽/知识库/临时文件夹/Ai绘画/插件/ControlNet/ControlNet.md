# ControlNet Overview
这个插件实在生成图片的时候控制图片的生成(方向)

## 选项
- 控制类型: 作用是筛选器![[Pasted image 20240131130006.png]]
- 完美像素模式: (开, 都可以开!!!)“预处理器分辨率”滑块将消失，ControlNet 将使用智能算法计算最佳分辨率，以便预处理器和 SD 的每个像素尽可能完美地匹配。


## 控制类型
![[Pasted image 20240208165938.png]]
### 姿态检测
#### Openpose
图片经过预处理器生成骨骼图, 摆动作
### 边缘检测
#### Canny(硬边缘)
边缘检测, 输出黑白线条(描边图), 搭配canny模型进行图片重新上色
#### Softedge(软边缘)
细节比canny较多, 对于细微处(如毛发)效果比canny更好
包含两种预处理器
- hed 更能保留原图中的细节, 但是对于内部线条的描述较差. 而且容易**增添**细节
- pidinet 能够更加**合理**保留细节, 但是细节较hed少
两类处理器: 带有safe尾缀的版本对于前后景进行了处理, 细节会较普通版本更少
#### Lineart(线稿)
特殊的边缘检测, 与上面两种边缘检测的区别是存在线条粗细(笔压), 线条也会更加流畅. 上面两种处理器仅仅只是进行**边缘**的检测, 线稿进行了边缘的优化. 能够**保留最多**的信息(除了颜色)
#### Scribble(涂鸦)
仅仅能够粗略表达图片, 给予ai最大的处理空间. 这也就早就了巨大的包容空间. 无论是怎么样的涂鸦, 都会有比较优秀的处理结果(相较其他处理器而言)
#### MLSD(直线检测)
仅仅只检测图片, 更加合适室内设计和建筑设计
### 区块检测
#### Depth(深度检测)
深度检测, 通过颜色检测深度, 输出深度图, 搭配depth模型可以指定图片的**结构**(前景是什么形状, 背景是什么形状)
距离越近越白, 距离越远越深
- zoe 环境细节多, 主体细节少
- midas 主体细节多, 环境细节少
- leress 检测构图, 环境主体细节均少
- leress++ 检测构图, 环境主体细节更多
#### NormalMap(法线贴图)
通过光来构建立体感(人话:通过凹凸来展示图片的立体结构), 符合物理(?), 能够保留三维上的一些细节
两类预处理器, 不要使用midas版本, 已经被淘汰了. 使用bae
### 整体检测
#### Segmentation (语义分割)
![[Pasted image 20240208174551.png]]
[ufade20k](https://github.com/Sense-X/UniFormer)
[ofade20k](https://github.com/SHI-Labs/OneFormer)
[ofcoco](https://cocodataset.org/)
#### InstructP2P(图像指令)
使用时调低cfg<5
不大幅度修改画面情况下, 修改指定内容, 修改天气, 修改人物啥的(不够精细)
现在已经集成在原生的图生图界面了!!!! 要的提示直接填到正面提示词区即可
controlNet的无效(我尝试时候是如此)
提示词: `make it xxx`(xxx为想要的提示词), 建议使用这样的提示词. 
#### Tile/Blur
1. 忽略图像中的细节并生成新的细节, 添加新的细节, 不破坏结构.
2. ==如果局部的内容与全局提示词不匹配, 这会进行忽略提示词, 根据周围图片的内容去尝试推断==

预处理器
1. tile_resample 通过缩小图片来处理, 细节缺失更多, 图片结果也就更多样(其中的向下采样率也就是缩放倍率, 越大图片越小, 细节补充越多)
2. tile_colorfix 让图片的颜色更加还原原图(锁定颜色)
3. tile_colorfix+sharp 和2几乎一致, 增加了一个锐化
4. blur_gaussian 更合适于生成带有**景深**的图片

效果: 图生图plus(?)
1. 可以让画面更加融合
2. 增加图片细节
3. 放大图片的作用(放大分辨率再用Tile)
4. 配合其他放大器, 可以很好修复放大导致的细节错误的问题

##### 实践:放大图片增加细节
图生图, 填入全图提示词, 使用upscale脚本 R-ESRGAN 4x+ Anime6B, 重绘幅度拉满即可(为什么?因为最上面的第二点)
##### 实践:修改细节
和重绘不同的是, 修改细节是在全图的基础上进行的修改
使用文生图, 填入参考图片(原图), 选择更倾向于提示词, 完美像素
反向提示词没有要求, 正向提示词需要遵循3点
1. 需要包含图片中所有内容
2. 提示词不能过多,影响权重
3. 人物尽量想办法锁定(lora或者更多的人物提示词)
#### Inpaint(局部重绘)
与webui的区别
1. 支持弱提示词, 无提示词修复(==提示词可以空白==, 但是如果效果不好, 建议增加一下负面提示词和降低cfg, 如果颜色有明显偏差, 可以调整为更偏向于controlNet)
2. 参数更简单(几乎没有参数, 只需要调整宽高(图片旁边)), 但是需要不断抽卡
3. 蒙版包容性更大
预处理器
1. inpaint_only 指代仅重绘蒙版区域
2. inpaint_global_harmonious 指代重绘全图(更加融合)
3. inpaint_only_lama (先抹除原图所有特征, 在进行重绘)指代蒙版区域内容处理-填充
#### Shuffle(随机洗牌)
保留色彩, 最早一批风格迁移处理器, 错误率较高
#### Reference(参考)
生成于参考图相类似的图像, 类似于Shuffle, 但是又不仅仅是进行色彩的迁移, 还会尝试迁移图片的特征, ==大部分情况下更加好于Shuffle==, 参考的图片不能与模型结果差异太大!
预处理器
1. (推荐)reference_only 固定参考图特征在进行扩散
2. reference_adain 将参考图特征提取, 最后加入扩散结果(较only会更加倾向于模型直接生成的结果)
3. (最优秀)adain+attn 混合算法, 一般来说会更加倾向于controlNet的参考图
#### IP-Adapter
简述: 是一个图像提示器.
	将输入的图像转码并编写为token, 然后和提示词一起起作用.

将图像特征嵌入到预训练的文本中 最后到图像扩散模型中, 类似于一个小型的lora
![[Pasted image 20240211113311.png]]
plus版本会使用更多的token来描述图像, 更加接近参考图像. 
##### 提示
建议要降低cfg(=6)和增加步数. 

IP-Adapter face id 通过一张图片，立刻就可以生成一系列同款角色, 需要搭配对应的lora使用
可以搭配图生图使用, 可以最大可能的保留细节, 减少无关细节出现. 
## 实践
