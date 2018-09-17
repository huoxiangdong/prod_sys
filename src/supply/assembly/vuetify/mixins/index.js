import { camelize } from '../../../util'
import ATTRS from '../attribute'

function iteration($attrs,ATTRS,name,special) {
    let res = {}
    Object.keys($attrs).forEach(key => {
        // if(ATTRS.customProps.includes(key)) { // dom 属性    
        //     const value = $attrs[key]
        //     res[key] = value    
        // }
        // if (ATTRS[name].BOOL_TYPE.includes(key)) {
            const value = $attrs[key]
            res[key] = value === '' ? true : value
            if(special){
              special.call(this,res,key,value)
            } 
        // } else if (ATTRS[name].VALUE_TYPE.includes(key)) {
        //     const value = $attrs[key]
        //     res[key] = value
        // }
    }) 

    return res
}

export const attrs = {
    computed: {
        attrs({ $attrs,special }) {  
            const name = camelize(this.$options._componentTag)      
            return iteration($attrs,ATTRS,name,special)     
          }
 }
} 