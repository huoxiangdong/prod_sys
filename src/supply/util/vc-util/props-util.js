import {
  isPlainObject
} from '../index'

function getType(fn) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : '' // Array Object。。。
}
// props propsData merge
export const filterProps = (props, propsData = {}) => {
  const res = {}
  Object.keys(props).forEach((k) => {
    if (k in propsData || props[k] !== undefined) {
      res[k] = props[k]
    }
  })
  return res
}
// props propsData merge
export const getOptionProps = (instance) => {
  if (instance.componentOptions) { // VNode
    const componentOptions = instance.componentOptions
    const {
      propsData = {}, Ctor = {}
    } = componentOptions // 解构
    const props = (Ctor.options || {}).props || {}
    const res = {}
    for (const [k, v] of Object.entries(props)) { // Object.entries 键值对数组
      const def = v.default // 默认值
      if (def !== undefined) {
        res[k] = typeof def === 'function' && getType(v.type) !== 'Function' ?
          def.call(instance) // () => ({})
          :
          def
      }
    }
    return { ...res,
      ...propsData
    }
  }
  const {
    $options = {}, $props = {}
  } = instance
  return filterProps($props, $options.propsData)
}
// init prop default
export const initDefaultProps = (propTypes, defaultProps) => {
  Object.keys(defaultProps).forEach(k => {
    if (propTypes[k]) {
      propTypes[k].def && (propTypes[k] = propTypes[k].def(defaultProps[k])) // { default: ... }
    } else {
      throw new Error(
        `not have ${k} prop || 没有这个 ${k} prop`)
    }
  })
  return propTypes
}

export const getSlots = (ele) => {
  let componentOptions = ele.componentOptions || {}
  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions || {}
  }
  const children = componentOptions.children || []
  const slots = {}
  children.forEach(child => {
    const name = (child.data && child.data.slot) || 'default'
    slots[name] = slots[name] || []
    slots[name].push(child)
  })
  return slots
}

export function getStyle(ele, camel) {
  let data = {}
  if (ele.data) {
    data = ele.data
  } else if (ele.$vnode && ele.$vnode.data) {
    data = ele.$vnode.data
  }
  let style = data.style || data.staticStyle
  if (typeof style === 'string') {
    style = parseStyleText(style, camel)
  } else if (camel && style) { // 驼峰化
    const res = {}
    Object.keys(style).forEach(k => (res[camelize(k)] = style[k]))
    return res
  }
  return style
}

export function getClass(ele) {
  let data = {}
  if (ele.data) {
    data = ele.data
  } else if (ele.$vnode && ele.$vnode.data) {
    data = ele.$vnode.data
  }
  const tempCls = data.class || data.staticClass
  let cls = {}
  if (typeof tempCls === 'string') {
    tempCls.split(' ').forEach(c => {
      cls[c.trim()] = true
    })
  } else {
    cls = tempCls
  }
  return cls
}

export const getKey = (ele) => {
  let key = ele.key
  if (ele.$vnode) {
    key = ele.$vnode.key
  }
  return key
}

export function getEvents(child) {
  let events = {}
  if (child.componentOptions && child.componentOptions.listeners) {
    events = child.componentOptions.listeners
  } else if (child.data && child.data.on) {
    events = child.data.on
  }
  return { ...events
  }
}

export const getSlotOptions = (ele) => {
  if (ele.fnOptions) { // 函数式组件
    return ele.fnOptions
  }
  let componentOptions = ele.componentOptions
  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions
  }
  return componentOptions ? componentOptions.Ctor.options || {} : {}
}

export function isValidElement(element) {
  return element && element.context && element.context._isVue
}

export function mergeProps() {
  const args = [].slice.call(arguments, 0)
  const props = {}
  args.forEach((p, i) => {
    for (const [k, v] of Object.entries(p)) {
      props[k] = props[k] || {}
      if (isPlainObject(v)) {
        Object.assign(props[k], v)
      } else {
        props[k] = v
      }
    }
  })
  return props
}


const camelizeRE = /-(\w)/g
export const camelize = (str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
}