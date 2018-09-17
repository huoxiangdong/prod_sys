
const extRE = /\.(vue)$/ // 匹配 vue后缀

exports.comName = function (comp) { // 获取组件名
    return comp.replace(extRE,'')
}

const toStr = Object.prototype.toString

exports.isStr = function (val) {

    return toStr.call(val) === '[object String]'
}