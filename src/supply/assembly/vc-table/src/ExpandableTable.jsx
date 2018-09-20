import PROPTYPES from '../../_utils/types'
import baseMixin from '../../_utils/baseMixin'
import { Connect } from '../../_utils/store'
import TableRow from './TableRow'
import { remove } from './utils'
import { initDefaultProps, getOptionProps } from '../../_utils/props'

export const ExpandableTableProps = () => ({
  expandIconAsCell: PROPTYPES.bool,
  expandRowByClick: PROPTYPES.bool,
  expandedRowKeys: PROPTYPES.array,
  expandedRowClassName: PROPTYPES.func,
  defaultExpandAllRows: PROPTYPES.bool,
  defaultExpandedRowKeys: PROPTYPES.array,
  expandIconColumnIndex: PROPTYPES.number,
  expandedRowRender: PROPTYPES.func,
  childrenColumnName: PROPTYPES.string,
  indentSize: PROPTYPES.number,
  // onExpand: PROPTYPES.func,
  // onExpandedRowsChange: PROPTYPES.func,
  columnManager: PROPTYPES.object.isRequired,
  store: PROPTYPES.object.isRequired,
  prefixCls: PROPTYPES.string.isRequired,
  data: PROPTYPES.array,
  getRowKey: PROPTYPES.func,
})

const ExpandableTable = {
  name: 'ExpandableTable',
  mixins: [baseMixin],
  props: initDefaultProps(ExpandableTableProps(), {
    expandIconAsCell: false,
    expandedRowClassName: () => '',
    expandIconColumnIndex: 0,
    defaultExpandAllRows: false,
    defaultExpandedRowKeys: [],
    childrenColumnName: 'children',
    indentSize: 15,
  }),

  data () {
    const {
      data,
      childrenColumnName,
      defaultExpandAllRows,
      expandedRowKeys,
      defaultExpandedRowKeys,
      getRowKey,
    } = this

    let finnalExpandedRowKeys = []
    let rows = [...data]

    if (defaultExpandAllRows) {
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        finnalExpandedRowKeys.push(getRowKey(row, i))
        rows = rows.concat(row[childrenColumnName] || [])
      }
    } else {
      finnalExpandedRowKeys = expandedRowKeys || defaultExpandedRowKeys
    }

    // this.columnManager = props.columnManager
    // this.store = props.store

    this.store.setState({
      expandedRowsHeight: {},
      expandedRowKeys: finnalExpandedRowKeys,
    })
    return {}
  },
  watch: {
    expandedRowKeys (val) {
      this.$nextTick(() => {
        this.store.setState({
          expandedRowKeys: val,
        })
      })
    },
  },
  methods: {
    handleExpandChange (expanded, record, event, rowKey, destroy = false) {
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }

      let { expandedRowKeys } = this.store.getState()

      if (expanded) {
        // row was expaned
        expandedRowKeys = [...expandedRowKeys, rowKey]
      } else {
        // row was collapse
        const expandedRowIndex = expandedRowKeys.indexOf(rowKey)
        if (expandedRowIndex !== -1) {
          expandedRowKeys = remove(expandedRowKeys, rowKey)
        }
      }

      if (!this.expandedRowKeys) {
        this.store.setState({ expandedRowKeys })
      }
      this.__emit('expandedRowsChange', expandedRowKeys)
      if (!destroy) {
        this.__emit('expand', expanded, record)
      }
    },

    renderExpandIndentCell  (rows, fixed) {
      const { prefixCls, expandIconAsCell } = this
      if (!expandIconAsCell || fixed === 'right' || !rows.length) {
        return
      }

      const iconColumn = {
        key: 'rc-table-expand-icon-cell',
        className: `${prefixCls}-expand-icon-th`,
        title: '',
        rowSpan: rows.length,
      }

      rows[0].unshift({ ...iconColumn, column: iconColumn })
    },

    renderExpandedRow (record, index, expandedRowRender, className, ancestorKeys, indent, fixed) {
      const { prefixCls, expandIconAsCell, indentSize } = this
      const parentKey = ancestorKeys[ancestorKeys.length - 1]
      const rowKey = `${parentKey}-extra-row`
      const components = {
        body: {
          row: 'tr',
          cell: 'td',
        },
      }
      let colCount
      if (fixed === 'left') {
        colCount = this.columnManager.leftLeafColumns().length
      } else if (fixed === 'right') {
        colCount = this.columnManager.rightLeafColumns().length
      } else {
        colCount = this.columnManager.leafColumns().length
      }
      const columns = [{
        key: 'extra-row',
        customRender: () => {
          const { expandedRowKeys } = this.store.getState()
          const expanded = !!~expandedRowKeys.indexOf(parentKey)
          return {
            attrs: {
              colSpan: colCount,
            },
            children: fixed !== 'right' ? expandedRowRender(record, index, indent, expanded) : '&nbsp;',
          }
        },
      }]
      if (expandIconAsCell && fixed !== 'right') {
        columns.unshift({
          key: 'expand-icon-placeholder',
          customRender: () => null,
        })
      }

      return (
        <TableRow
          key={rowKey}
          columns={columns}
          class={className}
          rowKey={rowKey}
          ancestorKeys={ancestorKeys}
          prefixCls={`${prefixCls}-expanded-row`}
          indentSize={indentSize}
          indent={indent}
          fixed={fixed}
          components={components}
          expandedRow
          hasExpandIcon={() => {}}
        />
      )
    },

    renderRows  (renderRows, rows, record, index, indent, fixed, parentKey, ancestorKeys) {
      const { expandedRowClassName, expandedRowRender, childrenColumnName } = this
      const childrenData = record[childrenColumnName]
      const nextAncestorKeys = [...ancestorKeys, parentKey]
      const nextIndent = indent + 1

      if (expandedRowRender) {
        rows.push(
          this.renderExpandedRow(
            record,
            index,
            expandedRowRender,
            expandedRowClassName(record, index, indent),
            nextAncestorKeys,
            nextIndent,
            fixed,
          ),
        )
      }

      if (childrenData) {
        renderRows(childrenData, nextIndent, rows, nextAncestorKeys)
      }
    },
  },

  render () {
    const { data, childrenColumnName, $scopedSlots, $listeners } = this
    const props = getOptionProps(this)
    const needIndentSpaced = data.some(record => record[childrenColumnName])

    return $scopedSlots.default && $scopedSlots.default({
      props,
      on: $listeners,
      needIndentSpaced,
      renderRows: this.renderRows,
      handleExpandChange: this.handleExpandChange,
      renderExpandIndentCell: this.renderExpandIndentCell,
    })
  },
  
}

export default Connect()(ExpandableTable) // 传入组件
