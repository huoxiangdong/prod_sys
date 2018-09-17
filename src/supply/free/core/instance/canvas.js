import { CANVAS_METHODS,STYLE } from '../../shared/constants'
import { noop } from '../../shared/util'

const sharedPropertyDefinition = {
    enumerable: false,
    configurable: false,
    get: noop,
    set: noop
  }
  
export function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
      return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
      this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
  }

export function initCanvasMethods (vm) {
  
    let canvas = vm.$canvas = Object.create(null)
    
    CANVAS_METHODS.forEach(m => {
      let fn = function (...args) {
        vm.ctx[m](...args)
      }
      canvas[m] = fn 
      proxy(vm, `$canvas`, m)
     
    })
   
}

