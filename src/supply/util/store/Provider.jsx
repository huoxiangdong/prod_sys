
import { storeShape } from './PropTypes' // prop
export default {
  name: 'StoreProvider', // store provider
  props: {
    store: storeShape.isRequired,
  },
  provide () {
    return {
      _store: this.$props,
    }
  },
  render () {
    return this.$slots.default[0]
  },
}
