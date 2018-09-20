import PROPTYPES from '../../_utils/types'
import ExpandIcon from './ExpandIcon'
import baseMixin from '../../_utils/baseMixin'
import { Connect } from '../../_utils/store'

const ExpandableRow = {
  mixins: [baseMixin],
  name: 'ExpandableRow',
  props: {
    prefixCls: PROPTYPES.string.isRequired,
    rowKey: PROPTYPES.oneOfType([
      PROPTYPES.string,
      PROPTYPES.number,
    ]).isRequired,
    fixed: PROPTYPES.oneOfType([
      PROPTYPES.string,
      PROPTYPES.bool,
    ]),
    record: PROPTYPES.object.isRequired,
    indentSize: PROPTYPES.number,
    needIndentSpaced: PROPTYPES.bool.isRequired,
    expandRowByClick: PROPTYPES.bool,
    expanded: PROPTYPES.bool.isRequired,
    expandIconAsCell: PROPTYPES.bool,
    expandIconColumnIndex: PROPTYPES.number,
    childrenColumnName: PROPTYPES.string,
    expandedRowRender: PROPTYPES.func,
    // onExpandedChange: PROPTYPES.func.isRequired,
    // onRowClick: PROPTYPES.func,
    // children: PROPTYPES.func.isRequired,
  },

  beforeDestroy () {
    this.handleDestroy()
  },
  methods: {
    hasExpandIcon (columnIndex) {
      const { expandRowByClick } = this
      return !this.tempExpandIconAsCell &&
        !expandRowByClick &&
        columnIndex === this.tempExpandIconColumnIndex
    },

    handleExpandChange (record, event) {
      const { expanded, rowKey } = this
      this.__emit('expandedChange', !expanded, record, event, rowKey)
    },

    handleDestroy () {
      const { rowKey, record } = this
      this.__emit('expandedChange', false, record, null, rowKey, true)
    },

    handleRowClick (record, index, event) {
      const { expandRowByClick } = this
      if (expandRowByClick) {
        this.handleExpandChange(record, event)
      }
      this.__emit('rowClick', record, index, event)
    },

    renderExpandIcon () {
      const { prefixCls, expanded, record, needIndentSpaced } = this

      return (
        <ExpandIcon
          expandable={this.expandable}
          prefixCls={prefixCls}
          onExpand={this.handleExpandChange}
          needIndentSpaced={needIndentSpaced}
          expanded={expanded}
          record={record}
        />
      )
    },

    renderExpandIconCell  (cells) {
      if (!this.tempExpandIconAsCell) {
        return
      }
      const { prefixCls } = this

      cells.push(
        <td
          class={`${prefixCls}-expand-icon-cell`}
          key='rc-table-expand-icon-cell'
        >
          {this.renderExpandIcon()}
        </td>
      )
    },
  },

  render () {
    const {
      childrenColumnName,
      expandedRowRender,
      indentSize,
      record,
      fixed,
      $scopedSlots,
    } = this

    this.tempExpandIconAsCell = fixed !== 'right' ? this.expandIconAsCell : false
    this.tempExpandIconColumnIndex = fixed !== 'right' ? this.expandIconColumnIndex : -1
    const childrenData = record[childrenColumnName]
    this.expandable = !!(childrenData || expandedRowRender)
    const expandableRowProps = {
      props: {
        indentSize,
        hasExpandIcon: this.hasExpandIcon,
        renderExpandIcon: this.renderExpandIcon,
        renderExpandIconCell: this.renderExpandIconCell,
      },

      on: {
        rowClick: this.handleRowClick,
      },

    }

    return $scopedSlots.default && $scopedSlots.default(expandableRowProps)
  },
}

export default Connect(({ expandedRowKeys }, { rowKey }) => ({
  expanded: !!~expandedRowKeys.indexOf(rowKey),
}))(ExpandableRow)
