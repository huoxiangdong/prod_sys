const path = require('path')

module.exports = {
   chainWebpack: config => {
       config.resolve.alias 
          .set('@util', path.resolve(__dirname, 'src/supply/util'))  // util alias 
       // 清除 eslint rule 不适用 eslint
       const eslintRule = config.module.rule('eslint')
       eslintRule.uses.clear() 
   }
}

