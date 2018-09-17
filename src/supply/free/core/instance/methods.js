import { FREE_METHODS, CANVAS_METHODS, STYLE } from '../../shared/constants'
import { noop } from '../../shared/util'
// init data
// vm._renderList = []
// methods

export function initMethods (vm) {
   vm._styleList = Object.create(null)
}

export function methodsMixin(Free) {

  FREE_METHODS.forEach(m => {
    
    Free.prototype[m] = function (options) {
      let vm = this
      let x, y, r, angle, anticlockwise
      const args = Array.from(arguments),
            o = options

      switch (m) {

        case "offsetX":
          return args[0] + this.baseX * args[1]
          break

        case "offsetY":
          let baseY = this.height / 10
          return args[0] + this.baseY * args[1]
          break

        // text   
        case "text":

          this.save()
          this._style({
            strokeStyle: "#ff5000"
          })
          this.font = "40px Arial"
          this.strokeText(args[2], args[0], args[1])
          this.stroke()
          this.restore()
        // line
        case "line":
          // this.$render(options,m)
          break
        // point
        case "point":        
          let { x, y, r } = o
          if (typeof o !== "object") {
            x = args[0]
            y = args[1]
            r = args[2]
          }      
            
          function render() {
             this.save()
             this.scale(this.ratio, this.ratio) // 缩放
             this.beginPath()
             this.arc(x, y, r ? r : 1 * this.ratio, 0, this.wholeArc, false)
             this.fill()
             this.restore()
            }
          return {
            render: render.bind(this)
          }
          break
        // circle
        case "circle": // 圆
          // 统一参数
          let { attr, style } = o
          if (typeof o === "object") { // 传入一个对象
            x = attr[0]
            y = attr[1]
            r = attr[2]
            angle = style && style.angle
            anticlockwise = style && style.anticlockwise
          } else {
            x = args[0]
            y = args[1]
            r = args[2]
            if (typeof args[3] === "object") { // 若第三参数为一个对象
              style = args[3]
            } else {
              angle = args[3]
            }        
          }

          let options = {
            x: x,
            y: y,
            r: r,
            angle: angle,
            anticlockwise: anticlockwise || false,
            style: style || {},
            _vm: vm
          }
          // let c = new Circle(options)
          

          // this.renderList.push({
          //   x: x,
          //   y: y,
          //   r: r
          // })
          return new Circle(options)
          break

          // _style
          case "style":
       
          STYLE.forEach(s => {
            if(typeof o !== 'object') {
              // this.ctx[arguments[0]] = arguments[1]
            } else {
                // this._styleList[s] = o[s]
                this.ctx[s] = o[s]    
            }
              
          })
      }
    }
    
  })
}




let renderList = [] 
let cid = 0
// circle
class Circle {
  constructor(options) {

    this.$options = options || {}
    this._vm = options._vm
    this.x = options.x
    this.y = options.y
    this.r = options.r
    this.angle = options.angle
    this.anticlockwise = options.anticlockwise
    this.style = options.style
    this._canvas = options._vm.$canvas
    this._methods = options._vm.$options._methods
    this.ratio = options._vm.ratio
    this.wholeArc = options._vm.wholeArc
    // this._isRoot = false
    
    this._cid = cid++
   
   
    this.$children = []
    this._renderList = []
    
    // this.render()
    
    //  this._vm._renderList.push(this)
    this.init()
  }
  init() {

    renderList.push(this)
   
    // console.log( this._renderList)
   
   
    // CANVAS_METHODS.forEach(m => { // canvas api
    //   this.proxy(this,`_canvas`,m)
    // })
    // Object.keys(this._methods).forEach(m => { // free api
    //   this.proxy(this,`_methods`,m)
    // })   
  }
  // proxy(target, sourceKey, key) { // 代理
  //   const sharedPropertyDefinition = {
  //     enumerable: false,
  //     configurable: false,
  //     get: noop,
  //     set: noop
  //   }
  //   sharedPropertyDefinition.get = function proxyGetter() {
  //     return this[sourceKey][key]
  //   }
  //   sharedPropertyDefinition.set = function proxySetter(val) {
  //     this[sourceKey][key] = val
  //   }
  //   Object.defineProperty(target, key, sharedPropertyDefinition)
  // }
  color(c) {
    this._vm._style({
      strokeStyle: c
    })
    return this
  }
  radius(r) {
   
    // this.r = r
    // return this
  }
  add(fn,mode = 1) {
    // fn.call(this,this._vm._renderList.shift())
    let child
    
    
    
    
    if(this.constructor === Circle) { // root
      this._isRoot = true
      this.root = this
    }
    if(mode) {
      child = fn.call(this,this)
     
      if(child.pop) {
        child.forEach(c => this.root._renderList.push(c.render.bind(c)) )
      } else {
        this.root._renderList.push(child.render.bind(child)) // 子渲染函数
      }
    } else {
      child = fn.bind(this,this)  // 子
      this.root.$children.push(child) // 子列表
    }

   

    return this.root
  }
  render() {
    const { _vm } = this
    
    _vm.$render(this)
   
    if(this.root && this.root.$children) { // 子 渲染列表
      this.root.$children.forEach(fn => fn())   
    }
    if(this.root && this.root._renderList) {
      this.root._renderList.forEach(r => r())
    }
   
    return this
  }
  
}

// Object.defineProperty(Circle.prototype,'test',{
//   value: console.log.bind(this,1)
// })
// console.log(Circle.prototype.test())