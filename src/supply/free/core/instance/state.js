import { noop } from '../../shared/util'

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
  }

export function proxy (target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter () {
      return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter (val) {
      this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
  }


export function initState (vm) {
    const opts = vm.$options

    if (opts.context) {
      initContext(vm)
    }

}

function initContext (vm) {

  let context = vm.$options.context
  
   context = vm._context = {
    ...context,
    wholeArc: Math.PI * 2,
    center: {
         x: (context.width/2)/context.ratio,
         y: (context.height/2)/context.ratio
       },
    baseX: (context.width/100)/context.ratio,
    baseY: (context.height/100)/context.ratio
 }

 
 
  const keys = Object.keys(context)
  
  let i = keys.length
  while (i--) {
    const key = keys[i]
    proxy(vm,  `_context`, key)
  }
  
}