import PropTypes from '@util/vue-types'

export default {
  name: 'Column',
  props: {
    colSpan: PropTypes.number,
    title: PropTypes.any, // value
    dataIndex: PropTypes.string,
    width: PropTypes.oneOfType([ // 宽
      PropTypes.number,
      PropTypes.string,
    ]),
    fixed: PropTypes.oneOf([
       true,
      'left',
      'right',
    ]),
    customRender: PropTypes.func,
    className: PropTypes.string,
    // onCellClick: PropTypes.func,
    customCell: PropTypes.func,
    customHeaderCell: PropTypes.func,
  },
}
