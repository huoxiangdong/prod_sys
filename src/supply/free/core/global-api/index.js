import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initAssetRegisters } from './assets'
import { initExtend } from './extend'
import { ASSET_TYPES } from '../../shared/constants'
import builtInComponents from '../components/index'
import { extend } from '../../shared/util'
export function initGlobalAPI (Free) {
    const configDef = {}

    configDef.get = () => config 
    configDef.set = () => {
        throw '不要替换 Free.config 对象'
    }

    Object.defineProperty(Free, 'config', configDef)
    // 工具方法集
    Free.util = {}
    // 选项对象 
    Free.options = Object.create(null)
    ASSET_TYPES.forEach(type => {
       if (type === 'context') {
           Free.options[type] = Object.create(null)
       } else {
           Free.options[type + 's']  = Object.create(null)
       }
        
    })
    
    Free.options._base = Free // 挂载自身


    extend(Free.options.components, builtInComponents) // 将组件复制到 Free.options.components对象上

    initUse(Free) // use方法
    initMixin(Free) // 混合方法
    initExtend(Free) //
    initAssetRegisters(Free) // 将系统自带的组件... 挂载到Free上

}