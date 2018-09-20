import PROPTYPES from '../../_utils/types'

export default {
  name: 'Column',
  props: {
    colSpan: PROPTYPES.number,
    title: PROPTYPES.any,
    dataIndex: PROPTYPES.string,
    width: PROPTYPES.oneOfType([
      PROPTYPES.number,
      PROPTYPES.string,
    ]),
    fixed: PROPTYPES.oneOf([
      true,
      'left',
      'right',
    ]),
    customRender: PROPTYPES.func,
    className: PROPTYPES.string,
    // onCellClick: PROPTYPES.func,
    customCell: PROPTYPES.func,
    customHeaderCell: PROPTYPES.func,
  },
}
