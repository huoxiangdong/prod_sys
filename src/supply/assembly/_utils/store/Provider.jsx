import { storeShape } from './propTypes'

export default {
    name: 'StoreProvider',
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