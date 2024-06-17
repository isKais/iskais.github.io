class RoughDrawable {
    constructor(propertyNames) {
        this._fields = {};
        this._dirty = false;
        this._canvas = null;
        this.z = 0;
        this.roughness = 0; // 粗糙度属性
        this.bowing = 1; // 弯曲度属性
        this._stroke = null;
        this._strokeWidth = null;

        this._fill = null;
        this._fillStyle = null;
        this._fillWeight = null;
        // this._hachureAngle = null;
        // this._hachureGap = null;

        this.maxRandomnessOffset = 1; // 最大随机偏移属性
        // this._curveTightness = 0;
    }

    // 获取线条的起始偏移量
    getOffsetStart(min, max) {
        return this.roughness * 2 * ((Math.random() * (max - min)) + min);
    }

    // 获取线条的偏移量
    getOffset(min, max) {
        return this.roughness * ((Math.random() * (max - min)) + min);
    }

    // 绘制线条
    drawLine(ctx, x1, y1, x2, y2, existingPath) {
        let lengthSq = Math.pow((x1 - x2), 2) + Math.pow((x1 - x2), 2);
        let offset = this.maxRandomnessOffset || 0;
        if (offset * offset * 100 > lengthSq) offset = Math.sqrt(lengthSq) / 10;

        let divergePoint = 0.2 + Math.random() * 0.2;
        let midDispX = this.bowing * this.maxRandomnessOffset * (y2 - y1) / 200;
        let midDispY = this.bowing * this.maxRandomnessOffset * (x1 - x2) / 200;
        midDispX = this.getOffset(-midDispX, midDispX);
        midDispY = this.getOffset(-midDispY, midDispY);

        if (!existingPath) ctx.beginPath();
        ctx.moveTo(x1 + this.getOffsetStart(-offset, offset), y1 + this.getOffsetStart(-offset, offset));
        ctx.bezierCurveTo(midDispX + x1 + (x2 - x1) * divergePoint + this.getOffset(-offset, offset),
            midDispY + y1 + (y2 - y1) * divergePoint + this.getOffset(-offset, offset),
            midDispX + x1 + 2 * (x2 - x1) * divergePoint + this.getOffset(-offset, offset),
            midDispY + y1 + 2 * (y2 - y1) * divergePoint + this.getOffset(-offset, offset),
            x2 + this.getOffsetStart(-offset, offset),
            y2 + this.getOffsetStart(-offset, offset));
        if (!existingPath) ctx.stroke();
    }
}

class RoughRectangle extends RoughDrawable {
    constructor(x, y, width, height) {
        super(['x', 'y', 'width', 'height']);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // 绘制矩形
    draw(ctx) {
        let left = this.x;
        let right = this.x + this.width;
        let top = this.y;
        let bottom = this.y + this.height;

        if (this.fill) this._doFill(ctx, left, right, top, bottom);

        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = this.strokeWidth;
        ctx.lineCap = "round";
        for (let i = 0; i < 4; i++) {
            this.drawLine(ctx, left, top, right, top);
            this.drawLine(ctx, right, top, right, bottom);
            this.drawLine(ctx, right, bottom, left, bottom);
            this.drawLine(ctx, left, bottom, left, top);
        }
    }

    // 填充矩形
    _doFill(ctx, left, right, top, bottom) {
        ctx.save();
        ctx.fillStyle = this.fill;
        let o = this.maxRandomnessOffset || 0;
        var points = [
            [left + this.getOffset(-o, o), top + this.getOffset(-o, o)],
            [right + this.getOffset(-o, o), top + this.getOffset(-o, o)],
            [right + this.getOffset(-o, o), bottom + this.getOffset(-o, o)],
            [left + this.getOffset(-o, o), bottom + this.getOffset(-o, o)]
        ];
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        ctx.lineTo(points[1][0], points[1][1]);
        ctx.lineTo(points[2][0], points[2][1]);
        ctx.lineTo(points[3][0], points[3][1]);
        ctx.fill();
        ctx.restore();
    }
}

registerPaint('roughBox', class {
    static get inputProperties() {
        return [
            '--rough-fill',
            '--rough-stroke-width',
            '--rough-stroke',
            '--rough-roughness'
        ];
    }

    // 绘制粗糙框
    paint(ctx, geom, properties) {
        const padding = 20;
        var rect = new RoughRectangle(padding, padding, geom.width - padding * 2, geom.height - padding * 2);
        rect.roughness = properties.get('--rough-roughness').toString();
        rect.fill = properties.get('--rough-fill').toString();
        rect.stroke = properties.get('--rough-stroke').toString();
        rect.strokeWidth = properties.get('--rough-stroke-width').toString().replace('px', '');
        rect.draw(ctx);
    }
});
