import { drag } from './dragable'

async function handler(Vue,el,binding,vnode) {
   const vm = vnode.child, // 绑定组件
         data = binding.value // data
     if(vm) {
         vm.$children.forEach((child,i) => {
            if(!child.$el.__index__) {
                child.$el.__index__ = i
            }
            
         })
     }
    
    // if(!vnode.key) {

    //     console.log(vnode)
    // }
//    this.set(data,0,555)
  
   drag(el)  
}

export default {
    name: 'drag',
    handler
}