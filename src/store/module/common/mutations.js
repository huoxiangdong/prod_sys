import * as types from './mutation-types'


export default  {
    [types.PASSDATA](state,data) { // 交换数据
       
        if(data.state) {
            state[data.state] = data.payload 
            // localStorage.setItem(data.state,JSON.stringify(data.payload)) 
        } else {
            state.PASSDATA = data
        } 
          
    },
    [types.STACKDATA] (state,data){ // 栈数据
       if(data.state) {       
           state[data.state].push(data.payload) // 入栈
        //    localStorage.setItem(data.state,JSON.stringify(state[data.state])) 
       } else {
          state.STACKDATA.push(data.payload ? data.payload : data)
       }
       
    },

    [types.DELSTACKDATA] (state, data) { // 删除栈数据
        if(data.state) {
            state[data.state].splice(data.payload,1)
        }
        // localStorage.setItem(data.state,data.payload)
    }
}

