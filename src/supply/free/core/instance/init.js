import { initProxy } from './proxy'
import { initState } from './state'
import { initCanvasMethods } from './canvas'
import { initMethods } from './methods'
import { mergeOptions, extend } from '../../shared/util';
import { initRender } from './render';
 // 初始化
 let uid = 0
 export function initMixin(Free) {
    Free.prototype._init = function(options) {

      const vm = this
      vm._uid = uid ++ // new 实例 计数
      
      // 合并选项
      vm.$options = mergeOptions( // 返回一个新的对象 Free options Sub options options
        resolveConstructorOptions(vm.constructor), // new Free Ctor -> Free extend sub Ctor -> sub
        options || {},
        vm
      )
    
      // 代理
      // initProxy(vm)
      vm._self = vm

      
      initCanvasMethods(vm)
      initMethods(vm)
      initRender(vm)
      initState(vm)
    }


  }

  export function resolveConstructorOptions (Ctor) { // Free or Sub
    let options = Ctor.options // Free.options -> component directive ...
    if (Ctor.super) { // Sub -> super -> Free 子类的情况
      const superOptions = resolveConstructorOptions(Ctor.super) // 递归
      const cachedSuperOptions = Ctor.superOptions // 缓存
      if (superOptions !== cachedSuperOptions) {
        Ctor.superOptions = superOptions
        const modifiedOptions = resolveConstructorOptions(Ctor)

        if (modifiedOptions) {
          extend(Ctor.extendOptions, modifiedOptions) // 将Free options 合并到 Ctor.extendOptions
        }
        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions) // Free options 子类 options 合并 并返回一个新对象options
        // ?
        if (options.name) {
          options.components[options.name] = Ctor
        }
      }
    }
    return options
  }