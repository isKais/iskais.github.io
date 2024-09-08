# PySide6 Overview
 
```ccard
type: folder_brief_live
```
 
最终还得是PySide6😋
我的学习步骤是, 先像tk一样ui代码不分离, 先熟悉和跑通逻辑

# 创建第一个窗口
```python
  class FloatingWindow(QMainWindow):  # 继承于QMainWindow
    def __init__(self):  
        super().__init__()  # 引用父类的初始化函数
        self.setWindowTitle("Window")  
        self.setGeometry(100, 100, 300, 200)  # x, y, width, height

if __name__ == "__main__":  
	# 要创建一个窗口就只需要下面两行
	window = FloatingWindow()  
    window.show()
    app = QApplication([])  # app负责触发结束
    sys.exit(app.exec())
```
需要一个继承于QMainWindow的类, 然后重写初始化函数, 初始化基本窗口函数
然后就可以在主程序中调用显示

可以发现基本逻辑为
```python
 class Window(QMainWindow):  # 继承于QMainWindow
    def __init__(self):  
        # 初始化窗口参数
        # 创建运行过程中需要的全局变量
	        # 需要的变量进行实例化, 如位置
        # 开始组件的创造
	        # 实例化按钮,文本框等
	        # 按钮绑定函数
		# 开始布局的创造
	#def 开始编写按钮等和运行过程中的函数
	#def 如果需要实现特殊功能, 进行重写内置函数
		# 鼠标点击事件
		# 鼠标移动事件
		# 窗口移动事件
if __name__ == "__main__":  
	window = FloatingWindow()  
    window.show()
    app = QApplication([])  # app负责触发结束
    sys.exit(app.exec())

```
## init函数继续完善
### 设置窗口的属性 self.setWindowFlags()
`self.setWindowFlags(Qt.WindowStaysOnTopHint | Qt.FramelessWindowHint)` 同时设定窗口为无边框窗口和时钟置顶

### 需要个参数读取位置  实例化QPoint()
`self.m_Position = QPoint()`

## 重写事件,增加功能和检测
### 鼠标按压事件def mousePressEvent(self, event: QMouseEvent):
- 可以使用event.button() == Qt.RightButton 进行按键匹配
### 鼠标移动事件def mouseMoveEvent(self, event: QMouseEvent):

### 鼠标释放事件 def mouseReleaseEvent(self, event: QMouseEvent):

### 窗口移动事件 def moveEvent(self, event):


# 问题和解决
## 为什么使用函数创建出的窗口不能长时间存在?
在Python中，当一个对象没有任何变量引用它时，Python的垃圾回收机制会自动销毁这个对象。在创建窗口的方法中，我创建了窗口，但是没有将这个实例保存到任何变量中。
因此，当方法结束时，由于这个实例就没有任何变量引用它，Python的垃圾回收机制就会自动销毁它。
可以使用一个列表保存窗口
在主函数的init里面 创建一个窗口列表`self.windows = []`
