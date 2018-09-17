import { ASSET_TYPES } from '../../shared/constants'
import { extend, mergeOptions } from '../../shared/util'

export function initExtend (Free) {
    Free.cid = 0
    let cid = 1

    Free.extend = function (extendOptions) { // object
        extendOptions = extendOptions || {}
        const Super = this // this -> Free构造函数
        const SuperId = Super.cid
        const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {}) // Free._Ctor = {}
        if (cachedCtors[SuperId]) { // 若已缓存
            return cachedCtors[SuperId]
        }
        const name = extendOptions.name || Super.options.name // Free.options.name

        const Sub = function FreeComponent (options) { // 子类
            this._init(options)
        }

        Sub.prototype = Object.create(Super.prototype) // 子类原型指向 Free
        Sub.prototype.constructor = Sub // 构造指向自己
        Sub.cid = cid++ // 子类计数

        Sub['super'] = Super // 将 Free 挂载到子类属性super上

        Sub.extend = Super.extend
        Sub.mixin = Super.mixin
        Sub.use = Super.use

        ASSET_TYPES.forEach(function (type) {
            Sub[type] = Super[type]
        })

        if(name) {
            Sub.options.component[name] = Sub
        }

        Sub.superOptions = Super.options
        Sub.extendOptions = extendOptions
        Sub.sealedOptions = extend({}, Sub.options)

        cachedCtors[SuperId] = Sub
    }
}