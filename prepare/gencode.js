const path = require('path')
const { comName, isStr } = require('./util')

exports.genCode = function (comArr, comPath) {

let routes = comArr.reduceRight((route, com) => {
   com = comName(com)
    if (isStr(route)) {

      return `{                                                     
    name: "${com}",
    path: ${com},
    components: ${com},
    children:[${route}]
}`
    } else {
      return `{
    name: ${com},
    path: ${com},
    component: ${com}
    }`
    }
  }, [])
  return `const routers =${routes}`

}


