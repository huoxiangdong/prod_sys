import PROPTYPES from '../_utils/types'
export const Store = PROPTYPES.shape({
  setState: PROPTYPES.func,
  getState: PROPTYPES.func,
  subscribe: PROPTYPES.func,
}).loose

import create from '../_utils/store/create'
const createStore = create

export default createStore
