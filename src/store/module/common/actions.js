import * as types from './mutation-types'

// let compMap
// function bindMum(data,comps) {   // 遍历 data，如果value为fn 绑定this
   
//     if(comps) {
//         compMap = comps.Components
//     }
//     Object.values(data).forEach(el => {
//         if(typeof el === 'object' && el !== null) {
//             bindMum(el)
//         } else if(typeof el === 'function') {
            
//             el.bind(compMap[data._mum],compMap[data._mum])
//         }
//     })
// }

export default {
   PASSDATA({ commit, rootState: { COMPONENT } } , data) { // 数据交流
     // bindMum(data.payload ? data.payload : data ,COMPONENT) // 若传递的数据包含函数，为函数绑定this   
      
      if(data.stack) {
        commit(types.STACKDATA, data) 
      } else {       
        commit(types.PASSDATA, data)
      } 
   }
}

