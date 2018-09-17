// options 合并
const defaultStrat = function (parentVal, childVal, vm, key) {
    
    return childVal === undefined // 判断childVal是否存在，若存在返回childVal，否则返回 parentVal
      ? parentVal
      : childVal
  }


export function mergeOptions(parent, child, vm) { // 选项合并
    const options = {}
    let key
    for (key in parent) { // 遍历 parent
        mergeField(key) // 将属性传递给 mergeField函数
    }
    for (key in child) {
        if (!hasOwn(parent, key)) {
            mergeField(key)
        }
    }
    // 合并属性到options对象上，返回的是新对象options
    function mergeField(key) {
      
        const strat = defaultStrat || strats[key]// 合并策略 defaultStrat默认合并策略 fn
        options[key] = strat(parent[key], child[key], vm, key) // 将parent、child属性值 vm 属性传递给 strat
    }

    return options
}

/* ---------------------通用方法------------------------------- */
export function noop () {}


const _toString = Object.prototype.toString
export function isPlainObject (obj) { // 判断是不是纯对象
    return _toString.call(obj) === '[object Object]'
  }


const hasOwnProperty = Object.prototype.hasOwnProperty // 对象自身属性中是否具有指定的属性
export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

export function extend (to, from) {
    for (const key in from) {
        to[key] = from[key] // 来自from对象的属性复制给to对象
    }
    return to
}

export function toArray (list, start) {
    start = start || 0 // 起始位置
    let i = list.length - start  // 要获取元素的个数
    while(i--) {
        res[i] = list[i + start]
    }
    return res
}