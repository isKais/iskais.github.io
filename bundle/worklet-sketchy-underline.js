registerPaint('sketchyUnderline', class {
    static get inputProperties() {
        return [
            '--lineNumber',
            '--lineSpread',
            '--lineColor',
            '--lineWidth'
        ]
    }//inputProperties

    paint(ctx, size, properties) {
        const lineWidth = parseFloat(properties.get('--lineWidth').toString())
        const color = properties.get('--lineColor').toString()
        const numUnderlines = parseFloat(properties.get('--lineNumber').toString())
        const spread = parseFloat(properties.get('--lineSpread').toString())

        //Values to set for the paint
        // ctx.lineWidth = lineWidth
        ctx.strokeStyle = color
        ctx.lineCap = "round"

        // ctx.globalCompositeOperation = "multiply"

        //Stripes from start to finish - Originally based on the example by Una Kravets
        //From https://blog.logrocket.com/new-horizons-in-css-houdini-and-the-paint-api-8b307cf387bb
        const getRandomX = () => { return Math.random() * 10 }
        const getRandomY = () => { return size.height - 5 - Math.random() * spread }
        for (let i = 0; i < numUnderlines; i++) {
            let x = getRandomX()
            let y = getRandomY()

            ctx.lineWidth = Math.random() * lineWidth + 1.5
            ctx.beginPath()
            ctx.moveTo(x, y)

            let x2 = size.width - getRandomX()
            let y2 = getRandomY()

            // Math.random() 0 - 1随机数
            // cx cy 贝塞尔曲线控制点
            let cx = size.width / 2 + (Math.random() > 0.5 ? 1 : -1) * 0.15 * size.width
            let cy = (y + y2) / 2 - (Math.random() > 0.5 ? (Math.random() * 5) : -(Math.random() * 8))

            ctx.quadraticCurveTo(cx, cy, x2, y2)

            ctx.stroke()
        }//for i
    }//paint
})//registerPaint