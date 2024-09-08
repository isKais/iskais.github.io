# Ollama Overview
 
```ccard
type: folder_brief_live
```
 
https://github.com/ollama/ollama
这是一个专为在本地环境中运行和定制大型语言模型而设计的工具
具体支持的模型详见

|Model|Parameters|Size|Download|
|---|---|---|---|
|Llama 3.1|8B|4.7GB|`ollama run llama3.1`|
|Llama 3.1|70B|40GB|`ollama run llama3.1:70b`|
|Llama 3.1|405B|231GB|`ollama run llama3.1:405b`|
|Phi 3 Mini|3.8B|2.3GB|`ollama run phi3`|
|Phi 3 Medium|14B|7.9GB|`ollama run phi3:medium`|
|Gemma 2|2B|1.6GB|`ollama run gemma2:2b`|
|Gemma 2|9B|5.5GB|`ollama run gemma2`|
|Gemma 2|27B|16GB|`ollama run gemma2:27b`|
|Mistral|7B|4.1GB|`ollama run mistral`|
|Moondream 2|1.4B|829MB|`ollama run moondream`|
|Neural Chat|7B|4.1GB|`ollama run neural-chat`|
|Starling|7B|4.1GB|`ollama run starling-lm`|
|Code Llama|7B|3.8GB|`ollama run codellama`|
|Llama 2 Uncensored|7B|3.8GB|`ollama run llama2-uncensored`|
|LLaVA|7B|4.5GB|`ollama run llava`|
|Solar|10.7B|6.1GB|`ollama run solar`|

建议搭配 https://docs.openwebui.com/
注意python环境要为 3.11 过大过小均不行


 open-webui serve

http://localhost:8080/

### 显示模型信息
```
ollama show llama3.1
```
### 列出计算机上的模型
```
ollama list
```
### 创建模型
`ollama create`用于从 Modelfile 创建模型。
```
ollama create mymodel -f ./Modelfile
```
### 拉取模型
```
ollama pull llama3.1
```
> 此命令还可用于更新本地模型。只有差异会被拉取。
### 删除模型
```
ollama rm llama3.1
```
### 复制模型
```
ollama cp llama3.1 my-model
```


ollama show llama3:8b --modelfile
可以显示模型的modelfile

safetensors -＞ ollama ，模型转化 + 模型量化详细步骤
https://blog.csdn.net/arkohut/article/details/140087605

