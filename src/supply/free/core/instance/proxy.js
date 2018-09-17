

let initProxy

const hasProxy = typeof Proxy !== 'undefined' // 判断是否支持 Proxy
if (hasProxy) {
    
}

const handler = {
    has (target, key) {
        const has = key in target
        return has
    }
}
initProxy = function initProxy (vm) {
    if (hasProxy) {
        vm._renderProxy = new Proxy(vm, handler) // vm._renderProxy是代理vm实例，访问vm._renderProxy,都经由handler处理
    } else {
        vm._renderProxy = vm
    }
}
export { initProxy }