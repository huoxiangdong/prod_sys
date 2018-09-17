export function mathMixin(Free) {
    Free.prototype.random = function(num) {
        return Math.floor(Math.random() * num + 1)
    }
    Free.prototype.radian = function(angle) { // 角度转弧度

      return Math.PI / 180 * angle;
    }

    Free.prototype.angle = function(radian) { // 弧度转角度
      return 180 / Math.PI * radian
    }
    // x y r angle
    Free.prototype.pointCalc = function(options) { // 计算小圆x,y,半径
      
      let {x, y, r, angle, equable } = options
      if(typeof options !== "object") {
        const args = Array.from(arguments)
        x = args[0]
        y = args[1]
        r = args[2]
        angle = args[3] // 弧度
        
        equable = args[4]
      }

      return {
        x: Math.floor(x + Math.cos(angle ? this.radian(angle) : Math.PI * 2) * r),
        y: Math.floor(y + Math.sin(angle ? this.radian(angle) : Math.PI * 2) * r),
        // 求小圆半径r 需要已知变量: 大圆半径 弧度
        r: Math.floor(Math.sqrt(Math.pow(r, 2) * 2 * (1 - Math.cos(equable ?
          this.radian(equable) :
          angle ?
          this.radian(angle) : this.radian(10)))) / 2)
          // r*r *2 * (1- cos(弧度))
      }
    }
  }