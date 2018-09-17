export function createSimpleFunctional (
    c,
    el = 'div',
    name
  ) {
    name = name || c.replace(/__/g, '-') // c --> name
  
    // TODO: remove after close
    // https://github.com/vuetifyjs/vuetify/issues/1561
    name = name.split('-')[0] === 'v' ? name : `v-${name}` // 为name添加 v- 前缀
  
    return {
      name,
      functional: true,
  
      render (h, { data, children }) {
        data.staticClass = (`${c} ${data.staticClass || ''}`).trim() // trim 去掉空格
  
        return h(el, data, children)
      }
    }
  }

const camelizeRE = /-(\w)/g

export const camelize = str => str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')

const nameRE = /(?:-\d+-)(.*)/   
export const comName = str => nameRE.exec(str) ? nameRE.exec(str)[1] : void(0)

/** 
 *  检查值是否为 undefined or null
 *  @param {*} 
 *  @returns {boolean} 
*/
export const isUndef = val => val === undefined || val === null
/** 
 *  检查值是否定义
 *  @param {*} 
 *  @returns {boolean} 
*/
export const isDef = val => val !== undefined && val !== null
/**
 *  Get the raw type string of a value e.g. [object Object]
 *  获取值得原始类型字符串 例如 [object Object]
 */
const _toString = Object.prototype.toString

/** 
 *  纯对象检查，返回 true
 *  @param {*} 
 *  @returns {boolean} - only returns true
*/
export function isPlainObject(obj) {
   return _toString.call(obj) === '[object Object]'
}
    
/**
 *  Check whether the object has the property.
 *  检查对象是否具有该属性
 *  @param { object, string }
 *  @returns { boolean }
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Determines whether the passed value is an integer. Uses `Number.isInteger` if available
 * 如果 `Number.inInteger` 可用，检查传递值是否为整数
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
 * @param {*} value - The value to be tested for being an integer.
 * @returns {boolean}
 */
export const isInteger = Number.isInteger || function (value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value  // isFinite 有限数值 
}

/**
 * Determines whether the passed value is an Array.
 * 检查传递值是否为数组
 * @param {*} value - The value to be tested for being an array.
 * @returns {boolean}
 */
export const isArray = Array.isArray || function (value) {
  return _toString.call(value) === '[object Array]'
}

/**
 * Determines whether the passed value is an Function
 * 确定传递值是否为 function
 * @param {*} value - The value to be tested for being an function
 * @returns {boolean}
 */
export const isFunction = (value) => _toString.call(value) === '[object Function]'

/**
 *  NO OPeration Function 无操作
 */
export const noop = () => {}

/**
 * console.warn 
 * 
 */
let warn = noop

if (process.env.NODE_ENV !== 'production') {
  const hasConsole = typeof console !== 'undefined'
  warn = (msg) => {
    if (hasConsole) {
      console.warn(`[VueTypes warn]: ${msg}`)
    }
  }
}

export { warn }