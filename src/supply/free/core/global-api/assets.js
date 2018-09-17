import { ASSET_TYPES } from '../../shared/constants'
import { isPlainObject } from '../../shared/util'
export function initAssetRegisters (Free) {
    ASSET_TYPES.forEach(type => {
        Free[type] = function (id, definition) { // 注册方法  com.name, com
            if (!definition) {
                return this.options[type + 's'][id] // 没有传入 com，返回已注册的com
            } else {
                if (type === 'component' && isPlainObject(definition)) {
                    definition.name = definition.name || id 
                    definition = this.options._base.extend(definition) // extend
                }
                if (type === 'directive' && typeof definition === 'function') {
                    definition = { bind: definition, update: definition }
                }
                
                this.options[type + 's'][id] = definition // 将com 赋值给 options相应的属性上
                return definition
            }
        }
    })
}