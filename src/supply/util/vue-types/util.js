import { isPlainObject, hasOwn, isFunction, isArray, isDef,  warn } from '../index'


/**
 * Adds `isRequired` and `def` modifiers to an object
 * 为对象添加  `_vueTypes_name`属性，值为类型 any string number integer boolean array object function symbol
 * 类型定义
 * @param {string} name - Type internal name
 * @param {object} obj - Object to enhance
 * @returns {object}
 */
export const toType = (name, obj) => {
    Object.defineProperty(obj, '_vueTypes_name', {
      enumerable: false,
      writable: false,
      value: name, // any string number integer boolean array object function symbol
    })
    withRequired(obj)
    withDefault(obj)
  
    if (isFunction(obj.validator)) { // 若定义了验证器
      obj.validator = obj.validator.bind(obj)
    }
    return obj
  }
/**
 * Adds a `isRequired` getter returning a new object with `required: true` key-value
 * 为对象添加一个 `isReguired` getter, 返回一个新对象 { required: true }
 * @param {object} type - Object to enhance
 */
export const withRequired = function (type) {
    Object.defineProperty(type, 'isRequired', {
      get () {
        this.required = true
        return this
      },
      enumerable: false,
    })
  }
/**
 * Adds a `def` method to the object returning a new object with passed in argument as `default` property
 * 为对象添加  `def`方法，该对象返回一个新对象，并将传入参数作为 `default` 属性值
 * 处理 default
 * @param {object} type - Object to enhance 对象增强
 */
export const withDefault = function (type) {
    Object.defineProperty(type, 'def', {
      value (def) { // 传入值
        if (def === undefined && this.default === undefined) { // 未定义
          this.default = undefined
          return this
        }
        if (!isFunction(def) && !validateType(this, def)) { // this -> type
          warn(`${this._vueTypes_name} - invalid default value: "${def}"`, def)
          return this
        }
        this.default = (isArray(def) || isPlainObject(def)) ? function () { // array or object returns new 
          return def
        } : def
  
        return this
      },
      enumerable: false, // 可枚举
      writable: false, // 可写
    })
  }

const FN_MATCH_REGEXP = /^\s*function (\w+)/

/**
 * @param {funtion}
 */
// https://github.com/vuejs/vue/blob/dev/src/core/util/props.js#L159
export const getType = (fn) => {
  const type = isDef(fn) ? (fn.type ? fn.type : fn) : null // fn.type? [String,Array]
  const match = type && type.toString().match(FN_MATCH_REGEXP)
  return match && match[1] // "function Array() { [native code] }"  match[1] -> Array
}

export const getNativeType = (value) => {
  if (value === null || value === undefined) return null // null undefined -> null
  const match = value.constructor.toString().match(FN_MATCH_REGEXP)
  return match && match[1]
}








/**
 * Validates a given value against a prop type object
 * 验证props 类型
 * @param {Object|*} type - Type to use for validation. Either a type object or a constructor
 * @param {*} value - Value to check
 * @param {boolean} silent - Silence warnings
 * @returns {boolean}
 */
export const validateType = (type, value, silent = false) => {
  let typeToCheck = type
  let valid = true // 有效
  let expectedType
  if (!isPlainObject(type)) { // 若 type不是object 
    typeToCheck = { type }
  }
  const namePrefix = typeToCheck._vueTypes_name ? (typeToCheck._vueTypes_name + ' - ') : '' // 前缀

  if (hasOwn.call(typeToCheck, 'type') && typeToCheck.type !== null) { // 若typeToCheck含有type属性 && 属性值不为 null
    if (isArray(typeToCheck.type)) { // type === array
      valid = typeToCheck.type.some((type) => validateType(type, value, true)) // 递归 type 是否符合 validateType(type, value, true)
      expectedType = typeToCheck.type.map((type) => getType(type)).join(' or ') // 数组转字符串 Array or String
    } else {
      expectedType = getType(typeToCheck)

      if (expectedType === 'Array') {
        valid = isArray(value)
      } else if (expectedType === 'Object') {
        valid = isPlainObject(value)
      } else if (expectedType === 'String' || expectedType === 'Number' || expectedType === 'Boolean' || expectedType === 'Function') {
        valid = getNativeType(value) === expectedType
      } else {
        valid = value instanceof typeToCheck.type
      }
    }
  }

  if (!valid) { // 若给定值无效
    silent === false && warn(`${namePrefix}value "${value}" should be of type "${expectedType}"`)
    return false
  }

  if (hasOwn.call(typeToCheck, 'validator') && isFunction(typeToCheck.validator)) {
    valid = typeToCheck.validator(value)
    if (!valid && silent === false) warn(`${namePrefix}custom validation failed`)
    return valid
  }
  return valid
}

