import { toArray } from '../../shared/util'

export function initUse (Free) {
    Free.use = function (plugin) { // 插件注册
         // Free._installedPlugins
         const installedPlugins = (this._installedPlugins || (this._installedPlugins = []) ) // 数组 存放插件
         if (installedPlugins.indexOf(plugin) > 1) { // 已注册判断
             return this
         }
         
         const args = toArray(arguments, 1)
         args.unshift(this) // 将FREE构造函数push到args开头 this -> Free

         if (typeof plugin.install === 'function') {
            plugin.install.apply(plugin, args) // 执行 install 方法
        } else if (typeof plugin === 'function') {
            plugin.apply(null, args)
        }

        installedPlugins.push(plugin)
        return this // --> Free
    }
}
