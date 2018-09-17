import { storeShape } from './PropType'

export default {
    name: 'storeProvider',
    props: {
        store: storeShape.isRequired 
    },
    provide() {
        return {
            storeContext: this.$props
        }
    },
    render() {
        return this.$slots.default[0]
    }
}