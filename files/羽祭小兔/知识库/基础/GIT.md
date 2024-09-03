## 前瞻
### 优点？
1. 版本迭代
2. 版本管理器
3. 版本控制工具
4. 统计工作量
5. 提高开发效率
### 类似工具？
- git
- svn
- cvs
### 版本控制分类
方向
1. 本地版本控制
2. 集中版本控制
3. 分布式版本控制

### 程序
- git bash unix和linux风格
- git cmd win风格
- git gui 图形界面

## 基本的linux命令
- cd 改变目录
- cd .. 回退到上一个目录,直接cd进入默认目录
- pwd 显示当前所在目录路径
- ls 列出当前目录所有文件
- touch 新建文件
- rm 删除文件(-r 删除文件夹)
- mv 移动文件 
- reset 重新初始化终端
- clear 清屏
- history 查看命令历史
- exit 退出
- `#` 注释

GIT配置
使用之前，需要配置用户名和邮箱
$ git config --global user.name ""
$ git config --global user.email ""

## 研究
### 分区
- workspace：工作空间，这里是本地存放代码的地方
- stage：暂存区，这里临时存放改动情况（是一个文件记录改动情况）
- repository：仓库区，存放所有改动
- remote：远程仓库

### 主要命令
![[Pasted image 20230120100744.png]]
### GIT文件的四种状态
`git status`检查文件状态
- untracked:未跟踪,文件在文件夹中,但是还没有添加入版本库,不参与跟踪{使用`git add`进入下一个状态}
- staged:暂存状态{使用`git commit`进入下一个状态}
- unmodify:文件已经入库,但是没有修改{被修改后进入下一个状态,或者使用`git rm`回到第一个状态}
- modified:文件已经修改

### 分支
#### 常见命令
```
git branch 列出本地所有分支
git branch -r 列出所有远程分支
git branch [name] 新建分支
git chrckout -b 新建一个分支并切换到该分支
git merge 合并指定分支到当前分支
git branch -d 删除分支
git push origin --delete [name] 删除远程分支
git branch -dr 删除远程分支
```

## GIT项目的搭建
### 本地搭建
#### 方法1(实测不推荐, 但是还是可以的)
> 创建git项目 使用`git init`初始化
> 添加远程地址`git remote add <name> <url>`
#### 方法2
>在线建立仓库
>使用git clone克隆到本地
>将文件移入doge

### 网上克隆
>克隆git项目 使用`git clone`克隆

### 一般使用流程
本地项目先使用`git init`在项目目录建立git项目
然后使用 `git add .`添加所有文件进入==暂存区==, 其中可以使用`git status`查看项目文件的状态
然后使用`git commit -m "批注"`去带批注存入本地仓库
最后使用`git push`推送到服务器

### 注释
#### 忽略文件
有的时候不想某些文件也被进入最终, 可以在主目录下建立`.gitignore`文件, 来表示忽略的文件
这个文件就是一个列表, 不要的文件直接写在里面就可以
可以使用通配符
特殊规则, 可以使用`!`放在名称最前面表示例外规则, 这个文件将不会被忽略

### 创建ssh,方便提交
`ssh-keygen -t rsa -C "youremail@example.com"`

### 删库
删除远程仓库你可以使用命令：
git remote rm [别名], 只会影响本地, 不会影响云端

## 维修
```
git push -u origin master

报错内容：
To github.com:***/***
! [rejected] master -> master (non-fast-forward)
error: failed to push some refs to ‘git@github.com:***/***’
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: ‘git pull …’) before pushing again.
hint: See the ‘Note about fast-forwards’ in ‘git push --help’ for details.
```
因为本地落后于云端文件, 云端存在本地没有的文件, 所以不能推送到云端, 防止云端文件丢失
这时候就要`git pull origin master`
```
From https://gitee.com/iskais/knowledge_collating
 * branch            master     -> FETCH_HEAD
fatal: refusing to merge unrelated histories
```
这说明本地和云端看上去不一样, 两个仓库不同, 看上去没有联系,因为在建立的时候是分开建立的(最开始使用clone就不会有这个问题) 强行拉取的话会影响本地仓库, 如果要拉的话, 使用 pull命令后紧接着使用--allow-unrelated-history选项来解决问题, 

`# LF will be replaced by CRLF the next time Git touches it`
Dos/Windows平台默认换行符：回车（CR）+换行（LF），即’\r\n’  
Mac/Linux平台默认换行符：换行（LF），即’\n’  
企业服务器一般都是Linux系统进行管理，所以会有替换换行符的需求
[解决方法](https://blog.csdn.net/Babylonxun/article/details/126598477)

如果出现了未知问题需要排查原因的时候
可以先检查ssh通道是否正常
`ssh -T git@github.com`

`Could not open a connection to your authentication agent.`
启动链接输入再说
`ssh-agent bash`