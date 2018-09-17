import PROPTYPES from '../vue-props-types'

export const storeShape = PropTypes.shape({
    subscribe: PROPTYPES.func.isRequired,
    setState: PROPTYPES.func.isRequired,
    getState: PROPTYPES.func.isRequired
})