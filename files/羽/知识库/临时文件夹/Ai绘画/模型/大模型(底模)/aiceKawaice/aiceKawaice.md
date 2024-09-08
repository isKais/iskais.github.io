# aiceKawaice Overview
 
```ccard
type: folder_brief_live
```
 [网页存档]("C:\Users\Kai\Documents\sd-webui-aki-v4.5\models\Stable-diffusion\AICE冰可 _ KawAICE[幼态特化模型] - Channel _ Stable Diffusion Checkpoint _ Civitai.mhtml")
## 简评
幼特化的大模型

## 提示
1. 不要添加“masterpiece”等起手式，除非画面出现各种问题
2. 负面提示词请不要使用EasyNegative，这会造成模型的部分提示词失效
3. 这个模型不需要质量提示词，很多情况下质量提示词会起到反作用
4. 直接描述你想要的效果即可，越详细越好。只使用“1girl”这种提示词抽取图片并不是一个好的方式
5. 无需使用其他VAE
6. 不需要非常高的steps就可以出图，采样器选择Euler A/UniPC这种最快的即可，开启HI-RES生成图像并不会有明显的提升，所以无需开启
	推荐参数: 
	- Sampler: Euler A
	- Steps: 20
	- CFG: 7
	- Clip Skip: 2