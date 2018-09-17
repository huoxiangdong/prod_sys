export function initRender (vm) {
    vm._renderList = []
}

export function renderMixin(Free) {
    Free.prototype.$render = function(options) {
    
      const { x, y, r, angle, anticlockwise, style } = options
      
      if (r < 0) { throw "半径不能为负数" }
      // drawing
      this.save()
      style && this.style(style)
    
      if(typeof style.point === 'number') {
        this.point(x, y, style.point).render() // 圆心
      }
     

      this.scale(this.ratio,this.ratio) // 缩放
      
      this.beginPath() // 开始路径
      this.arc(x, y, r , 0, angle ? this.$radian(angle) : this.wholeArc, false) // 绘制圆 逆时针？ false
      if (style) {
        
        style.close && this.closePath()
        style.fill && this.fill()
        if (style.stroke === undefined || !!style.stroke) {
          this.stroke()
        }     
      } else {
        this.stroke()

      }
      
      this.restore()
      // ctx.fillStyle = opt.fillColor ? opt.fillColor : 'black';
      // ctx.strokeStyle = opt.strokeColor ? opt.strokeColor : 'black';
      // opt.fill ? ctx.fill() : ctx.stroke();

      
      // this.renderList.push({
      //   x: attr[0],
      //   y: attr[1],
      //   r: attr[2]
      // })
      
    }
  }