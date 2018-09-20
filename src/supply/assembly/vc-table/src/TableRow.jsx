import PROPTYPES from '../../_utils/types'
import { Connect } from '../../_utils/store'
import TableCell from './TableCell'
import { warningOnce } from './utils'
import { initDefaultProps, mergeProps, getStyle } from '../../_utils/props'
import baseMixin from '../../_utils/baseMixin'
import { noop } from '../../_utils/shared'

const TableRow = {
  name: 'TableRow',
  mixins: [baseMixin],
  props: initDefaultProps({
    customRow: PROPTYPES.func,
    // onRowClick: PROPTYPES.func,
    // onRowDoubleClick: PROPTYPES.func,
    // onRowContextMenu: PROPTYPES.func,
    // onRowMouseEnter: PROPTYPES.func,
    // onRowMouseLeave: PROPTYPES.func,
    record: PROPTYPES.object,
    prefixCls: PROPTYPES.string,
    // onHover: PROPTYPES.func,
    columns: PROPTYPES.array,
    height: PROPTYPES.oneOfType([
      PROPTYPES.string,
      PROPTYPES.number,
    ]),
    index: PROPTYPES.number,
    rowKey: PROPTYPES.oneOfType([
      PROPTYPES.string,
      PROPTYPES.number,
    ]).isRequired,
    className: PROPTYPES.string,
    indent: PROPTYPES.number,
    indentSize: PROPTYPES.number,
    hasExpandIcon: PROPTYPES.func,
    hovered: PROPTYPES.bool.isRequired,
    visible: PROPTYPES.bool.isRequired,
    store: PROPTYPES.object.isRequired,
    fixed: PROPTYPES.oneOfType([
      PROPTYPES.string,
      PROPTYPES.bool,
    ]),
    renderExpandIcon: PROPTYPES.func,
    renderExpandIconCell: PROPTYPES.func,
    components: PROPTYPES.any,
    expandedRow: PROPTYPES.bool,
    isAnyColumnsFixed: PROPTYPES.bool,
    ancestorKeys: PROPTYPES.array.isRequired,
    expandIconColumnIndex: PROPTYPES.number,
    expandRowByClick: PROPTYPES.bool,
    // visible: PROPTYPES.bool,
    // hovered: PROPTYPES.bool,
    // height: PROPTYPES.any,
  }, {
    // expandIconColumnIndex: 0,
    // expandRowByClick: false,
    hasExpandIcon () {},
    renderExpandIcon () {},
    renderExpandIconCell () {},
  }),

  data () {
    // this.shouldRender = this.visible
    return {
      shouldRender: this.visible,
    }
  },

  mounted () {
    if (this.shouldRender) {
      this.$nextTick(() => {
        this.saveRowRef()
      })
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.shouldRender = true
      }
    },
  },

  updated () {
    if (this.shouldRender && !this.rowRef) {
      this.$nextTick(() => {
        this.saveRowRef()
      })
    }
  },
  methods: {
    onRowClick  (event) {
      const { record, index } = this
      this.__emit('rowClick', record, index, event)
    },

    onRowDoubleClick (event) {
      const { record, index } = this
      this.__emit('rowDoubleClick', record, index, event)
    },

    onContextMenu (event) {
      const { record, index } = this
      this.__emit('rowContextmenu', record, index, event)
    },

    onMouseEnter  (event) {
      const { record, index, rowKey } = this
      this.__emit('hover', true, rowKey)
      this.__emit('rowMouseenter', record, index, event)
    },

    onMouseLeave  (event) {
      const { record, index, rowKey } = this
      this.__emit('hover', false, rowKey)
      this.__emit('rowMouseleave', record, index, event)
    },

    setExpanedRowHeight () {
      const { store, rowKey } = this
      let { expandedRowsHeight } = store.getState()
      const height = this.rowRef.getBoundingClientRect().height
      expandedRowsHeight = {
        ...expandedRowsHeight,
        [rowKey]: height,
      }
      store.setState({ expandedRowsHeight })
    },

    setRowHeight () {
      const { store, rowKey } = this
      const { fixedColumnsBodyRowsHeight } = store.getState()
      const height = this.rowRef.getBoundingClientRect().height
      store.setState({
        fixedColumnsBodyRowsHeight: {
          ...fixedColumnsBodyRowsHeight,
          [rowKey]: height,
        },
      })
    },

    getStyle () {
      const { height, visible } = this
      let style = getStyle(this)
      if (height) {
        style = { ...style, height }
      }

      if (!visible && !style.display) {
        style = { ...style, display: 'none' }
      }

      return style
    },

    saveRowRef () {
      this.rowRef = this.$el

      const { isAnyColumnsFixed, fixed, expandedRow, ancestorKeys } = this

      if (!isAnyColumnsFixed) {
        return
      }

      if (!fixed && expandedRow) {
        this.setExpanedRowHeight()
      }

      if (!fixed && ancestorKeys.length >= 0) {
        this.setRowHeight()
      }
    },
  },

  render () {
    if (!this.shouldRender) {
      return null
    }

    const {
      prefixCls,
      columns,
      record,
      rowKey,
      index,
      customRow = noop,
      indent,
      indentSize,
      hovered,
      height,
      visible,
      components,
      hasExpandIcon,
      renderExpandIcon,
      renderExpandIconCell,
    } = this
    const BodyRow = components.body.row
    const BodyCell = components.body.cell

    let className = ''

    if (hovered) {
      className += ` ${prefixCls}-hover`
    }

    const cells = []

    renderExpandIconCell(cells)

    for (let i = 0; i < columns.length; i++) {
      const column = columns[i]

      warningOnce(
        column.onCellClick === undefined,
        'column[onCellClick] is deprecated, please use column[customCell] instead.',
      )

      cells.push(
        <TableCell
          prefixCls={prefixCls}
          record={record}
          indentSize={indentSize}
          indent={indent}
          index={index}
          column={column}
          key={column.key || column.dataIndex}
          expandIcon={hasExpandIcon(i) && renderExpandIcon()}
          component={BodyCell}
        />
      )
    }

    const rowClassName =
      `${prefixCls} ${className} ${prefixCls}-level-${indent}`.trim()

    const rowProps = customRow(record, index)
    const customStyle = rowProps ? rowProps.style : {}
    let style = { height: typeof height === 'number' ? `${height}px` : height }

    if (!visible) {
      style.display = 'none'
    }

    style = { ...style, ...customStyle }
    const bodyRowProps = mergeProps({
      on: {
        click: this.onRowClick,
        dblclick: this.onRowDoubleClick,
        mouseenter: this.onMouseEnter,
        mouseleave: this.onMouseLeave,
        contextmenu: this.onContextMenu,
      },
      class: rowClassName,
    }, { ...rowProps, style }, {
      attrs: {
        'data-row-key': rowKey,
      },
    })
    return (
      <BodyRow
        {...bodyRowProps}
      >
        {cells}
      </BodyRow>
    )
  },
}

function getRowHeight (state, props) {
  const { expandedRowsHeight, fixedColumnsBodyRowsHeight } = state
  const { fixed, rowKey } = props

  if (!fixed) {
    return null
  }

  if (expandedRowsHeight[rowKey]) {
    return expandedRowsHeight[rowKey]
  }

  if (fixedColumnsBodyRowsHeight[rowKey]) {
    return fixedColumnsBodyRowsHeight[rowKey]
  }

  return null
}

export default Connect((state, props) => {
  const { currentHoverKey, expandedRowKeys } = state
  const { rowKey, ancestorKeys } = props
  const visible = ancestorKeys.length === 0 || ancestorKeys.every(k => ~expandedRowKeys.indexOf(k))

  return ({
    visible,
    hovered: currentHoverKey === rowKey,
    height: getRowHeight(state, props),
  })
})(TableRow)
