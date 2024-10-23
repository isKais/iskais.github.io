# tutorial Overview
 
```ccard
type: folder_brief_live
```
 
完美的, 极客风格的Tui文本用户界面

这里是教程 https://textual.textualize.io/tutorial/

这里是文档 https://textual.textualize.io/guide/

## 安装

以下是安装 Textual 的方法。
### 从 PyPI
您可以使用以下命令通过 PyPI 安装 Textical：

`pip install textual`

如果计划开发文本应用程序，还应该安装文本开发人员工具：

`pip install textual-dev`

## 最简单单元代码
```python
from textual.app import App, ComposeResult  
from textual.widgets import Header, Footer  
# Footer 在屏幕底部显示一个带有绑定键的栏， Header 在屏幕顶部显示一个标题。  
  
  
class AppDemo(App):  
    # BINDINGS 是一个元组列表，它将键映射（或绑定）到应用程序中的操作。  
    # 元组中的第一个值是键；第二个值是动作的名称；最终值是一个简短的描述。  
    BINDINGS = [("d", "toggle_dark", "Toggle Dark Mode")]  
  
    # compose() 是我们用小部件构建用户界面的地方。  
    def compose(self) -> ComposeResult:  
        yield Header()  
        yield Footer()  
  
    # action_toggle_dark() 定义了一个动作方法。操作是以 action_ 开头，后跟操作名称的方法。  
    # 留意上面BINDINGS元组中定义  
    def action_toggle_dark(self) -> None:  
        self.dark = not self.dark  
  
  
if __name__ == "__main__":  
    AppDemo().run()
```

## app类
类需要继承app类

app类是最基础的部分, 负责这个图形界面的基本逻辑, 是图形界面的基底, 它负责加载配置、设置 widget、处理键等

app类中
`BINDINGS`是将键映射（或_绑定_）到应用程序中的操作的元组列表
`compose()`是我们构建带有小部件的用户界面的地方, 此方法为生成器, 此方法逐步构建图形界面

## 小组件widget
`from textual.widgets`
如果说app类是图形界面的基底, 小组件则构成图形界面
### 内置组件
https://textual.textualize.io/widgets/

### 自定义小组件
类需要继承static类, 虽然可以继承更基础的weight类, 但是还是建议继承之类static, 这个之类提供了一些基础的方法

一个组件可以由内部许多组件拼搭起来, 它也存在app类中的一些方法(是不是也是继承于app类?)例如 生成器`compose()`

## 容器container
`from textual.containers import`
顾名思义就是用来容纳和收纳整理的

## 构建整个界面
让界面更加好看, 除了使用container收纳组件之外, 还可以使用css设置样式(这也是为什么我选择的原因), 整个逻辑类似于html

### 一个技巧-实时编辑
得力于css, 网页都可以实时调试样式, 那应用程序当然也是可以实现的
https://textual.textualize.io/guide/devtools/#live-editing

### 运用css
在继承了app基类的类中, 可以使用`CSS_PATH`定义css文件位置
这里的css的长度不是一般类型的像素数, 而是单元格数
`height:5`高度为5个单元格数, 也就是5行
#### css选择器
类名可以作为选择器
同时也可以使用在小组件内使用`id=`定义小组件的id, 该id可以使用`#名字`所选择
### 操作类
可以使用 add_class() 和 remove_class() 方法添加和删除 CSS 类。

## 交互
按钮接线
使得小组件可以和代码联系, 以按钮为例, 在static类中, 存在on_button_pressed方法
```python
def on_button_pressed(self, event: Button.Pressed) -> None: 
	button_id = event.button.id
```
可以通过event访问事件被触发时候的信息

## 动态小组件
如果需要在代码中动态调整小组件, 可以使用remove()来删除一个weight, 可以使用mount()来挂载一个小组件
https://textual.textualize.io/tutorial/#dynamic-widgets