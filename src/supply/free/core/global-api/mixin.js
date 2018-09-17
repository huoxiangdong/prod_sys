// 全局混入

export function initMixin (Free) {
    Free.mixin = function (mixin) {
        this.options = mergeOptions(this.options, mixin) // mergeOptions 合并选项方法，返回一个新对象
        return this
    }
}