import PROPTYPES from '../_utils/types'

export default {
  props: {
    value: PROPTYPES.oneOfType([
      PROPTYPES.string,
      PROPTYPES.number,
    ]),
    disabled: PROPTYPES.bool,
    title: PROPTYPES.string,
  },
  isSelectOption: true,
}
