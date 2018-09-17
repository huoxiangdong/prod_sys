
async function handler(Vue,el,binding,vnode) {
    if(!binding.value) { // 无传值不绑定指令
        return
    }
    
    function getOffsetTop () { // 滚动像素
       return window.pageYOffset ||
         document.documentElement.scrollTop
     }

    function getRoundedBoundedClientRect (el) { // 获取元素rect
       const rect =  el.getBoundingClientRect()
       return {
         top: Math.round(rect.top),
         left: Math.round(rect.left),
         bottom: Math.round(rect.bottom),
         right: Math.round(rect.right),
         width: Math.round(rect.width),
         height: Math.round(rect.height)
       }
     }

     function enter(e) { // 鼠标进入元素
        
        rect = getRoundedBoundedClientRect (el) // 重新获取 rect
        instance.styles = {
            left: rect.left + 'px',
            top: rect.top -  rect.height + getOffsetTop () + 'px',
            zIndex: 1989
        }
        instance.isShow = true 
       }

     function leave(e) { // 鼠标离开
        instance.isShow = false
        removeEventListener("mouseenter", enter)
        removeEventListener("mouseleave", leave)
       }
     // 添加事件
     function addEventListener(event,handler) {
        el.addEventListener(event,handler)
    }
     
   // tip comp
   const tipCtor = this.extend({
       data() {
           return {
               isShow: false,
               styles: null
           }
       },
       render(h) {
           return h('v-slide-x-transition',{},[
            h('div',{
                style: this.styles,
                staticClass: 'v-tooltip__content',
                directives: [
                    {
                      name: 'show',
                      value: this.isShow
                    }
                ]
            }, binding.value)
           ])
       },
       beforeDestroy() {
        //    console.log(this)
        //    console.log('已销毁')
       }
   })

   let instance   
   let rect 
   let rawEl = el // 指令绑定原始元素
   await this.nextTick(() => {
      if(binding.arg) {
          const name = '.' + binding.arg
          el = el.querySelector(name) || el // 限制为绑定指令元素内子元素    
      }
      rect =  getRoundedBoundedClientRect (el)
   } )

   // main
   if(binding.value) {
     if(!instance) {
        instance = new tipCtor()
     }
     rawEl.tip = instance.$mount()
     document.body.appendChild(instance.$el) // 插入 tip 
     // 事件监听
    addEventListener('mouseenter',enter)
    addEventListener('mouseleave', leave) 
   }
}

export default {
    name: 'tip',
    handler
}