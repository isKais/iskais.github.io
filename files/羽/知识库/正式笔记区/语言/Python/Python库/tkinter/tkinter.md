# tkinter Overview
 
```ccard
type: folder_brief_live
```
 
图形库，懒得排版了，想到什么写什么
关于要实现py原生的tk图形模块进行拖入文件操作（把一个文件直接拖入程序获取对应的路径）
原生的tk是不行的，要加入模块
下载tkdnd ，使用版本2.8（来自于20年前的古早模块）
解压后放入python安装目录下的tcl文件夹中，具体举例是`（C:\Program Files\python\tcl\tkdnd2.8）`
然后就可以使用了
```python
from tkinter import *  
  
  
# class不必修改，模块使用所必须的  
class DnD:  
    def __init__(self, tkroot):  
        self._tkroot = tkroot  
        tkroot.tk.eval('package require tkdnd')  
        # make self an attribute of the parent window for easy access in child classes  
        tkroot.dnd = self  
  
    def bindsource(self, widget, type=None, command=None, arguments=None, priority=None):  
        '''Register widget as drag source; for details on type, command and arguments, see bindtarget().  
        priority can be a value between 1 and 100, where 100 is the highest available priority (default: 50).        If command is omitted, return the current binding for type; if both type and command are omitted,        return a list of registered types for widget.'''        command = self._generate_callback(command, arguments)  
        tkcmd = self._generate_tkcommand('bindsource', widget, type, command, priority)  
        res = self._tkroot.tk.eval(tkcmd)  
        if type == None:  
            res = res.split()  
        return res  
  
    def bindtarget(self, widget, type=None, sequence=None, command=None, arguments=None, priority=None):  
        '''Register widget as drop target; type may be one of text/plain, text/uri-list, text/plain;charset=UTF-8  
        (see the man page tkDND for details on other (platform specific) types);        sequence may be one of '<Drag>', '<DragEnter>', '<DragLeave>', '<Drop>' or '<Ask>' ;        command is the callback associated with the specified event, argument is an optional tuple of arguments        that will be passed to the callback; possible arguments include: %A %a %b %C %c %D %d %L %m %T %t %W %X %x %Y %y        (see the tkDND man page for details); priority may be a value in the range 1 to 100 ; if there are        bindings for different types, the one with the priority value will be proceeded first (default: 50).        If command is omitted, return the current binding for type, where sequence defaults to '<Drop>'.        If both type and command are omitted, return a list of registered types for widget.'''        command = self._generate_callback(command, arguments)  
        tkcmd = self._generate_tkcommand('bindtarget', widget, type, sequence, command, priority)  
        res = self._tkroot.tk.eval(tkcmd)  
        if type == None:  
            res = res.split()  
        return res  
  
    def clearsource(self, widget):  
        '''Unregister widget as drag source.'''  
        self._tkroot.tk.call('dnd', 'clearsource', widget)  
  
    def cleartarget(self, widget):  
        '''Unregister widget as drop target.'''  
        self._tkroot.tk.call('dnd', 'cleartarget', widget)  
  
    def drag(self, widget, actions=None, descriptions=None, cursorwindow=None, command=None, arguments=None):  
        '''Initiate a drag operation with source widget.'''  
        command = self._generate_callback(command, arguments)  
        if actions:  
            if actions[1:]:  
                actions = '-actions {%s}' % ' '.join(actions)  
            else:  
                actions = '-actions %s' % actions[0]  
        if descriptions:  
            descriptions = ['{%s}' % i for i in descriptions]  
            descriptions = '{%s}' % ' '.join(descriptions)  
        if cursorwindow:  
            cursorwindow = '-cursorwindow %s' % cursorwindow  
        tkcmd = self._generate_tkcommand('drag', widget, actions, descriptions, cursorwindow, command)  
        self._tkroot.tk.eval(tkcmd)  
  
    def _generate_callback(self, command, arguments):  
        '''Register command as tk callback with an optional list of arguments.'''  
        cmd = None  
        if command:  
            cmd = self._tkroot._register(command)  
            if arguments:  
                cmd = '{%s %s}' % (cmd, ' '.join(arguments))  
        return cmd  
  
    def _generate_tkcommand(self, base, widget, *opts):  
        '''Create the command string that will be passed to tk.'''  
        tkcmd = 'dnd %s %s' % (base, widget)  
        for i in opts:  
            if i is not None:  
                tkcmd += ' %s' % i  
        return tkcmd  
  
  
def ui():  
    root = Tk()  
    dnd = DnD(root)  # 类的名字  
    
    def drop(files):  
        print(files)  
        
  # root是要绑定事件的组件
  # 
    dnd.bindtarget(root, 'text/uri-list', '<Drop>', drop, ('%D',))  
    root.mainloop()  
  
  
if __name__ == '__main__':  
    ui()
```

关于tk添加组件的方法
1. 创建对象
2. 操作
3. 放置pack()

如果要进行更新，使用 updata() 方法

真的是吐血，要是需要组织结构，不建议嵌套框架内在嵌套框架，这样子很容易出问题，虽然方便组织结构，但是可能会出一些问题（包括但不限于多选框选中一个其他全部都会选中），建议使用grid组织结构在配合一些些框架不要过度使用就行。
