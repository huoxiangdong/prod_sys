
import { camelize, comName } from '../../../supply/util'
import * as types from './mutation-types'


function bindMum(data,comps) {   // 遍历 data，如果value为fn 绑定this
    
    Object.keys(data).forEach(key => {
        if(typeof data[key] === 'object' && data[key] !== null) {   
            //bindMum(data[key],comps)
        } else if(typeof data[key] === 'function') {  
            data[key] = data[key].bind(comps[data._mum])        
        }
    })
}

function birthmark(data,name) {
    if(typeof data === 'object' && data !== null) {
        Object.values(data).forEach(value => {
            //birthmark(value,name)
            if(typeof value === 'object' && value !== null && !value._mum) {   
            
              Object.defineProperty(value, "_mum", {
                  enumerable: false,
                  // configurable: false,
                  // writable: false,
                  value: name
                })       
            }
            
        })
    }       
 }

const BuiltInComp = ['router-link','transition','transition-group','keep-alive']

export default {
    [types.COMPDATA](state,comp) {   
 
        if(comp.$options._componentTag) {
            
            if(BuiltInComp.includes(comp.$options._componentTag)) {
                state.BuiltInComponents[comp.$options._componentTag] = comp
            } else {
           
                const name = camelize(comp.$options._componentTag)
                
                if(name) { 
                   
                   //birthmark(comp._data,name)
                   state.Components[name] = comp
                   //bindMum(comp._data,state.Components)
                }
            }  
        } else if(comp.$vnode) {
            
            const name = comName(comp.$vnode.tag) && comName(comp.$vnode.tag)
            if(name) {
              
                //birthmark(comp._data,name)
                state.Components[name] = comp 
                //bindMum(comp._data,state.Components)
                  
            }      
        }   
     
    }
}