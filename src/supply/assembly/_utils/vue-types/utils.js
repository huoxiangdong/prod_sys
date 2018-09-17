import isPlainObject from 'lodash/isPlainObject'
import { isFunction } from 'babel-types';

const oProto = Object.prototype
const toString = oProto.toString
export const hasOwn = oProto.hasOwnProperty 

const FN_MATCH_REGEXP = /^\s*function (\w+)/

export const getType = (fn) => {
    const type = (fn !== null && fn !== undefined) ? (fn.type ? fn.type : fn) : null
    const match = type && type.toString().match(FN_MATCH_REGEXP)
    return match && match[1]
}

export const noop = () => {}
/** */
export const has = (obj, prop) => hasOwn.call(obj, prop)

/**
 *  isFinite 有限数
 */
export const isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value
}
/**  */
export const isArray = Array.isArray || function(value) {
    return toString.call(value) === '[object Array]'
}
/** */
export const isFunction = (value) => toString.call(value) === '[object Function]'

export const withDefault = function(type) {
    Object.defineProperty(type, 'def', {
        value(def) {
            if(def === undefined && this.default === undefined) {
                this.default = undefined
                return this
            }
            if(!isFunction(def) && !validateType(this, def)) {
                warn(`${this._vueTypes_name} - invalid default value: "${def}", def`)
                return this
            }
            this.default = (isArray(def) || isPlainObject(def)) ? () => def : def
            return this
        },
        enumerable: false,
        writable: false
    })
}

export const withRequired = function(type) {
    Object.defineProperty(type, 'isRequired', {
        get() {
            this.required = true
            return this 
        },
        enumerable: false
    })
}

export const toType = (name, obj) => {
    Object.defineProperty(obj, '_vueTypes_name', {
        enumerable: false,
        writable: false,
        value: name
    })
    withRequired(obj)
    withDefault(obj)

    if(isFunction(obj.validator)) {
        obj.validator = obj.validator.bind(obj)
    }
    return obj
}

export const validateType = (type, value, silent = false) => {
    let typeToCheck = type
    let valid = true 
    let expectedType 
    if(!isPlainObject(type)) {
        typeToCheck = { type }
    }
    const namePrefix = typeToCheck._vueTypes_name ? (typeToCheck._vueTyes_name + ' - ') : ''
    if(hasOwn.call(typeToCheck, 'type') && typeToCheck.type !== null) {
        if(isArray(typeToCheck.type)) {
            valid = typeToCheck.type.some((type) => validateType(type, value, true)) 
            expectedType = typeToCheck.type.map((type) => getType((type))).join(' or ')
        } else {
            expectedType = getType(typeToCheck)
            if(expectedType === 'Array') {
                valid = isArray(value)
            } else if (expectedType === 'String' || expectedType === 'Number' || expectedType === 'Boolean' || expectedType === 'Function') {
                valid = getNativeType(value) === expectedType
            } else {
                valid = value instanceof typeToCheck.type
            }
        }
    }
    if(!valid) {
        silent === false && warn(`${namePrefix}value "${value}" should be of type "${expectedType}"`)
        return false
    }
    if(hasOwn.call(typeToCheck, 'validator') && isFunction(typeToCheck.validator)) {
        valid = typeToCheck.validator(value)
        if(!valid && silent === false) warn(`${namePrefix}custom validation failed`)
        return valid
    }
    return valid
}

let warn = noop

if(process.env.NODE_ENV !== 'production') { // dev下生效 否则 noop˙
    const hasConsole = typeof console !== 'undefined'
    warn = msg => hasConsole && console.warn(`[VueTypes warn]: &{msg}`)
}

export { warn }