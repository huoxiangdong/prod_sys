import Drag from './drag'

export default function install (Vue) {
    Vue.directive(Drag.name, {
        inserted: Drag.handler.bind(Vue,Vue),
        // unbind: function(el,binding,vnode) {
        //    if(el.tip) {
        //     el.tip.$destroy()
        //     document.body.removeChild(el.tip.$el)
        //    }  
        // }
    })
}