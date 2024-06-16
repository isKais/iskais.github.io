// 该代码来自whydocatsanddogs.com网站中, 无比感谢他们, 我去除了虚线的绘制

registerPaint('sketchyBackground', class {
    static get inputProperties() {
        return [
            // '--lineNumber',  // 行数
            // '--lineSpread',  // 行间距
            '--lineColor',    // 线条颜色
            '--lineWidth'     // 线条宽度
        ]
    }//inputProperties

    paint(ctx, size, properties) {
        const lineWidth = parseFloat(properties.get('--lineWidth').toString())
        const color = properties.get('--lineColor').toString()
        // const numUnderlines = parseFloat(properties.get('--lineNumber').toString())
        // const spread = parseFloat(properties.get('--lineSpread').toString())

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

            // ctx.lineWidth = Math.random()*3 + 1
            // ctx.beginPath()
            ctx.moveTo(x_old, y_old)
            ctx.lineTo(x, y)
            // ctx.stroke()

            x_old = x
            y_old = y
        }//for i
        ctx.stroke()

        // // 从起点到终点绘制条纹 - 原始示例来自 Una Kravets
        // // 来自 https://blog.logrocket.com/new-horizons-in-css-houdini-and-the-paint-api-8b307cf387bb
        // const getRandom = () => { return Math.round(Math.random() * size.width * 0.2) }
        // let x_old = getRandom()
        // let y_old = size.height * (Math.random()*spread + 0.2)
        // ctx.beginPath()
        // ctx.moveTo(x_old, y_old)
        // for (let i = 0; i < numUnderlines; i++) {
        //     let x = i % 2 === 0 ? size.width - getRandom() : getRandom()
        //     let y = size.height * (Math.random()*spread + 0.2)

        //     // ctx.beginPath()
        //     // ctx.moveTo(x_old, y_old)
        //     ctx.lineTo(x, y)

        //     // x_old = x
        //     // y_old = y
        // }//for i
        // ctx.stroke()

        // 底部的虚线
        // ctx.strokeStyle = "black"
        // ctx.setLineDash([0, 5])
        // ctx.lineWidth = 2.5
        // ctx.beginPath()
        // ctx.moveTo(2, size.height - 4)
        // ctx.lineTo(size.width - 2, size.height - 4)
        // ctx.stroke()
    }//paint
})//registerPaint