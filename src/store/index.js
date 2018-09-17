import Vue from 'vue'
import Vuex from 'vuex'
// import LocalStorage from './plugins/index.js'

import COMMON from './module/common'
import COMPONENT from './module/component'

Vue.use(Vuex)

export default new Vuex.Store({
    // plugins: [LocalStorage],
    modules: {
        COMMON,
        COMPONENT
    }
})

