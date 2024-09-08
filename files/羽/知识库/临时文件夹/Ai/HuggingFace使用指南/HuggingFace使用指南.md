# HuggingFace使用指南 Overview
 
```ccard
type: folder_brief_live
```
 
https://blog.csdn.net/zhaohongfei_358/article/details/126224199

### 模型切片的索引信息

一个完整的大型模型通常会被切分成多个碎片（shards），并以 `model-00001-of-00002.safetensors` 这种命名方式保存。  
`pytorch_model.bin.index.json` 文件包含所有的模型切片信息，主要包括：

- 模型切片的总数。
- 每个切片的元数据，如名称、偏移地址、文件大小等。
- 切片如何组合起来重新组成完整模型的说明。
- 一些额外的模型信息，如模型名称、框架版本等元数据。