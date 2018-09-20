export const noop = () => ({})

const oProto = Object.prototype
const toString = oProto.toString

export const hasOwn = oProto.hasOwnProperty 

/**
 * Checks for a own property in an object
 *
 * @param {object} obj - Object
 * @param {string} prop - Property to check
 */
export const has = (obj, prop) => hasOwn.call(obj, prop)

export function warn(msg, type) {
    const TYPE = type && msg
    const WARN = (msg) => {
        if(process.env.NODE_ENV !== 'production') { // dev下生效 否则 noop˙
            const hasConsole = typeof console !== 'undefined'
            hasConsole && console.warn(`${ TYPE ? `[${TYPE} warn]:` : ''}${msg}`)
        }
        return noop
    } 
    return type ? WARN : WARN(msg) 
}

/**
 * Determines whether the passed value is an integer. Uses `Number.isInteger` if available
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
 * @param {*} value - The value to be tested for being an integer.
 * @returns {boolean}
 */
export const isInteger = Number.isInteger || function (value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value
  }

/**
 * Checks if a value is a function
 *
 * @param {any} value - Value to check
 * @returns {boolean}
 */
export const isFunction = (value) => toString.call(value) === '[object Function]'

/**
 * Determines whether the passed value is an Array.
 *
 * @param {*} value - The value to be tested for being an array.
 * @returns {boolean}
 */
export const isArray = Array.isArray || function (value) {
    return toString.call(value) === '[object Array]'
  }

