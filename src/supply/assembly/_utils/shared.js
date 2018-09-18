export const noop = () => {}

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
 * 正整数
 */
export function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value)  === value
}