一种新的技术
Houdini项目
可以实现js对css的操控, 更好的扩展css

这是一项使用paint api绘制更好的高亮显示的一段css
![[Pasted image 20240616185129.png|548]]
一般来说
1. 使用 `registerPaint()` 方法注册一个 PaintWorklet
2. 调用 `addModule()` 方法添加此模块
3. 在 CSS 中使用 `paint()` 函数调用

https://juejin.cn/post/7130101491582369822 该网站教程非常详细

```js
// 该代码来自whydocatsanddogs.com网站中, 无比感谢他们, 我去除了虚线的绘制
// 声明
registerPaint('sketchyBackground', class {

    static get inputProperties() {

        return [
            '--lineColor',    // 线条颜色
            '--lineWidth'     // 线条宽度
        ]

    }
// 定义paint函数
    paint(ctx, size, properties) {

        const lineWidth = parseFloat(properties.get('--lineWidth').toString())

        const color = properties.get('--lineColor').toString()
        // 设置绘制的属性

        ctx.lineWidth = lineWidth

        ctx.strokeStyle = color

        ctx.lineCap = "round"

  

        // 从左到右绘制条纹

        const getRandomX = () => { return (Math.random() > 0.5 ? 1 : -1) * Math.round(Math.random() * 1) }

        const getRandomY = () => { return Math.round(Math.random() * 6) + 2 }

  

        let x_old = -10

        let y_old = size.height - getRandomY()

        let num_lines = Math.round((size.width + 10) / 2)

        ctx.beginPath()

        ctx.moveTo(x_old, y_old)

        for (let i = 0; i < num_lines; i++) {

            let y = i % 2 === 1 ? size.height - getRandomY() : getRandomY()

            let x = -10 + i / num_lines * (size.width + 10) + (i % 2 === 1 ? 0 : 14) + getRandomX()


            ctx.moveTo(x_old, y_old)

            ctx.lineTo(x, y)

            x_old = x

            y_old = y

        }//for i

        ctx.stroke()

    }//paint

})
```

注意在主html中要进行调用js
```html
<script>

    if (CSS["paintWorklet"] !== undefined) {
// 添加模块
        CSS.paintWorklet.addModule("./bundle/common.js");

    }

</script>
```

使用该技术有可能会在移动设备上异常显示, 决定用回最原始的方法js+canvas 
