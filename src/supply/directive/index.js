import Tip from './tip/index.js'
import Drag from './drag/index.js'
const directive = {
    Tip,
    Drag
}

export default {
    install(Vue) {
        Object.values(directive).forEach(dir => {
            Vue.use(dir)
        })
    }
}