# Qt Quick Overview
## 重要描述文件 main.qml
应该要有的重要描述文件, 实例代码如下

```js
import QtQuick // 导入QtQuick模块

Window { // Window是一种模块里预定义的类型，用于窗体描述
// 类型后边的{}内部包含了类型实例化后的成员属性、函数、信号、信号处理句柄等，比如width、height、visible、title等都是预定义的属性
    width: 640 
    height: 200
    visible: true
    title: qsTr("Tool V1.0.0")
    Viewer { // Viewer是一个自定义的类型
        anchors.fill: parent 
    }
}
```
## 自定义类型 Viewer.qml
既然在main.qml文件中使用了自定义类型 Viewer, 则说明会有一个自定义类型Viewer的描述文件
假定有如下的实例代码
```js
import QtQuick 2.15 // 后面可以指定版本号(选)
import QtQuick.Controls
import Qt.labs.platform

Item { // Item是类库QtQuick的预定义组件类型, 描述的是一个基础可视组件
	   // 提示: quick中所有的可视组件都继承于它, 一般在QML中自定义类型都会使用基础的类型Item, 然后在其基础上定制内部属性、函数、信号、信号处理句柄等。
	   
    function log(...msg) { // 定义函数log
    // function是关键词，log是函数名，后边小括号里的...表示参数不定(调用时不限制输入的参数个数)
        // 函数使用js语法
        let msgs = "";
        msg.forEach((item) => {
                        if (msgs.length != 0) {
                            msgs += " ";
                        }
                        msgs += item;
                    });
        console.log(msgs);
    }

    FileDialog { // FileDialog是类库Qt.labs.platform的预定义组件类型
        id: fileDialog
        objectName: "fileDialog"
        currentFile: selectedFileTextArea.text

        onFileChanged: {
            log(objectName + ".file =", file.toString().slice(8));
            fileMgrInstance.run(file.toString().slice(8));
        }
    }

    Label { // Label是类库QtQuick.Controls的预定义组件类型, 描述一个文本标签
        id: fileLable
        x: 292
        y: 26
        text: qsTr("文件：")
        verticalAlignment: Text.AlignVCenter
        font.pointSize: 14
    }

    TextField { // TextField是类库QtQuick.Controls的预定义组件类型, 描述一个单行文本编辑窗
        id: selectedFileTextArea
        x: 70
        y: 70
        width: 500
        objectName: "selectedFileTextArea"
        text: fileDialog.file.toString().slice(8)
        font.pointSize: 12
        placeholderText: qsTr("选择文件")
    }

    Button {
        id: selectFileButton
        x: 268
        y: 124
        width: 105
        height: 54
        text: qsTr("选择")
        font.pointSize: 10

        onClicked: {
            log(text, "clicked");
            fileDialog.open();
        }
    }
}
```

代办事项: cmake clion开发或者可以进行代码补全