import PropTypes from '@util/vue-types'
import TableHeaderRow from './TableHeaderRow'
// 表头 行
function getHeaderRows (columns, currentRow = 0, rows) {
    rows = rows || []
    rows[currentRow] = rows[currentRow] || []
  
    columns.forEach(column => {
      if (column.rowSpan && rows.length < column.rowSpan) {
        while (rows.length < column.rowSpan) {
          rows.push([])
        }
      }
      const cell = { // 单元格
        key: column.key,
        className: column.className || column.class || '',
        children: column.title,
        column,
      }
      if (column.children) {
        getHeaderRows(column.children, currentRow + 1, rows) // 递归 children -> currentRow + 1
      }
      if ('colSpan' in column) {
        cell.colSpan = column.colSpan
      }
      if ('rowSpan' in column) {
        cell.rowSpan = column.rowSpan
      }
      if (cell.colSpan !== 0) {
        rows[currentRow].push(cell)
      }
    })
    return rows.filter(row => row.length > 0)
  }

export default {
    name: 'TableHeader',
    props: {
        columns: PropTypes.array.isRequired // header [{},{}]
    },
    inject: {
        table: { default: {} }
    },
    render() {
        const { sComponents:components, showHeader } = this.table
        const { columns } = this
        const HeaderWrapper = components.header.wrapper // thead
        if (!showHeader) { // 是否显示表头
            return null
        }
        const rows = getHeaderRows(columns)
        return (
            <HeaderWrapper>
                {
                    rows.map((row,i) => (
                        <TableHeaderRow
                          columns={columns}
                          rows={rows}
                          row={row}
                          components={components}  >       
                        </TableHeaderRow>
                    ))
                }
            </HeaderWrapper>
        ) 
    }
 }