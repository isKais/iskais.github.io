# Conda Overview
 
```ccard
type: folder_brief_live
```
 
这个是一个类似于venv的虚拟环境管理工具

比venv会更加的专业一点

`conda remove --name env_name(环境名) package_name(包名) `
删除虚拟环境中的包

`conda list`
查看安装了哪些包。

`conda install package_name(包名)`
安装包

`conda env list`
查看当前存在哪些虚拟环境

`conda activate myenv`
激活虚拟环境

`conda deactivate`
退出虚拟环境

`conda clean -p`
删除没有用的包

`conda clean -t`
删除保存下来的压缩文件（.tar）
