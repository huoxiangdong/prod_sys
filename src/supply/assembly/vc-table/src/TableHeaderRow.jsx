import PROPTYPES from '../../_utils/types'
import { Connect } from '../../_utils/store'
import { mergeProps } from '../../_utils/props'

const TableHeaderRow = {
  props: {
    index: PROPTYPES.number,
    fixed: PROPTYPES.string,
    columns: PROPTYPES.array,
    rows: PROPTYPES.array,
    row: PROPTYPES.array,
    components: PROPTYPES.object,
    height: PROPTYPES.any,
    customHeaderRow: PROPTYPES.func,
  },
  name: 'TableHeaderRow',
  render (h) {
    const { row, index, height, components, customHeaderRow } = this
    const HeaderRow = components.header.row
    const HeaderCell = components.header.cell
    const rowProps = customHeaderRow(row.map(cell => cell.column), index)
    const customStyle = rowProps ? rowProps.style : {}
    const style = { height, ...customStyle }

    return (
      <HeaderRow {...rowProps} style={style}>
        {row.map((cell, i) => {
          const { column, children, className, ...cellProps } = cell
          const cls = cell.class || className
          const customProps = column.customHeaderCell ? column.customHeaderCell(column) : {}

          const headerCellProps = mergeProps({
            attrs: {
              ...cellProps,
            },
            class: cls,
          }, {
            ...customProps,
            key: column.key || column.dataIndex || i,
          })

          if (column.align) {
            headerCellProps.style = { ...customProps.style, textAlign: column.align }
          }

          if (typeof HeaderCell === 'function') {
            return HeaderCell(h, headerCellProps, children)
          }
          return (
            <HeaderCell
              {...headerCellProps}
            >
              {children}
            </HeaderCell>
          )
        })}
      </HeaderRow>
    )
  },
}

function getRowHeight (state, props) {
  const { fixedColumnsHeadRowsHeight } = state
  const { columns, rows, fixed } = props
  const headerHeight = fixedColumnsHeadRowsHeight[0]

  if (!fixed) {
    return null
  }

  if (headerHeight && columns) {
    if (headerHeight === 'auto') {
      return 'auto'
    }
    return `${headerHeight / rows.length}px`
  }
  return null
}

export default Connect((state, props) => {
  return {
    height: getRowHeight(state, props),
  }
})(TableHeaderRow)
