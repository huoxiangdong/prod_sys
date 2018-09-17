import Tip from './tip'

export default function install (Vue) {
    Vue.directive(Tip.name, {
        bind: Tip.handler.bind(Vue,Vue),
        unbind: function(el,binding,vnode) {
           if(el.tip) {
            el.tip.$destroy()
            document.body.removeChild(el.tip.$el)
           }  
        }
    })
}