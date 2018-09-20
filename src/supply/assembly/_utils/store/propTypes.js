import PROPTYPES from '../types'

export const storeShape = PROPTYPES.shape({
    subscribe: PROPTYPES.func.isRequired,
    setState: PROPTYPES.func.isRequired,
    getState: PROPTYPES.func.isRequired
})