// 链式调用
export function chainMixin(Free) {
    Free.prototype.$add = function(fn) {
      
      if(fn) {
        fn.call(this,{...this.renderList.shift(), self : this.circle.bind(this)})
      } 
      return this
    }
  }