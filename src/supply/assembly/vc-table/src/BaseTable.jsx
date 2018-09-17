
import PropTypes from '@util/vue-types'
import { mergeProps } from '@util/vc-util/props-util'
import { connect } from '@util/store'
import ColGroup from './ColGroup'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import ExpandableRow from './ExpandableRow'

function noop () {}
const BaseTable = {
  name: 'BaseTable',
  props: {
    fixed: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    columns: PropTypes.array.isRequired,
    tableClassName: PropTypes.string.isRequired,
    hasHead: PropTypes.bool.isRequired,
    hasBody: PropTypes.bool.isRequired,
    store: PropTypes.object.isRequired,
    expander: PropTypes.object.isRequired,
    getRowKey: PropTypes.func, 
    isAnyColumnsFixed: PropTypes.bool,
  },
  inject: {
    table: { default: {}},
  },
  methods: {
    handleRowHover  (isHover, key) {
      this.store.setState({
        currentHoverKey: isHover ? key : null,
      })
    },

    renderRows  (renderData, indent, ancestorKeys = []) {
      const {
        columnManager, sComponents: components,
        prefixCls,
        childrenColumnName,
        rowClassName,
        // rowRef,
        $listeners: { // 事件
          rowClick: onRowClick = noop,
          rowDoubleclick: onRowDoubleClick = noop, // 双击
          rowContextmenu: onRowContextMenu = noop,
          rowMouseenter: onRowMouseEnter = noop, // 鼠标进入
          rowMouseleave: onRowMouseLeave = noop, // 鼠标离开
        },
        customRow = noop, // 自定义行
      } = this.table
      const { getRowKey, fixed, expander, isAnyColumnsFixed } = this

      const rows = []

      for (let i = 0; i < renderData.length; i++) { // 遍历 data
        const record = renderData[i] // one row {}
        const key = getRowKey(record, i) // 索引键
       
        const className = typeof rowClassName === 'string'
          ? rowClassName
          : rowClassName(record, i, indent)

        const onHoverProps = {}
        if (columnManager.isAnyColumnsFixed()) {
          onHoverProps.hover = this.handleRowHover
        }

        let leafColumns
        if (fixed === 'left') {
          leafColumns = columnManager.leftLeafColumns()
        } else if (fixed === 'right') {
          leafColumns = columnManager.rightLeafColumns()
        } else {
          leafColumns = columnManager.leafColumns()
         
        }

        const rowPrefixCls = `${prefixCls}-row` // class prefix
        const expandableRowProps = {
          props: {
            ...expander.props,
            fixed,
            index: i,
            prefixCls: rowPrefixCls,
            record,
            rowKey: key,
            needIndentSpaced: expander.needIndentSpaced,
          },
          key,
          on: {
            // ...expander.on,
            rowClick: onRowClick,
            expandedChange: expander.handleExpandChange,
          },
          scopedSlots: {
            default: (expandableRow) => {
              const tableRowProps = mergeProps({
                props: {
                  fixed,
                  indent,
                  record,
                  index: i,
                  prefixCls: rowPrefixCls,
                  childrenColumnName: childrenColumnName,
                  columns: leafColumns,
                  rowKey: key,
                  ancestorKeys,
                  components,
                  isAnyColumnsFixed,
                  customRow,
                },
                on: {
                  rowDoubleclick: onRowDoubleClick,
                  rowContextmenu: onRowContextMenu,
                  rowMouseenter: onRowMouseEnter,
                  rowMouseleave: onRowMouseLeave,
                  ...onHoverProps,
                },
                class: className,
                ref: `row_${i}_${indent}`,
              }, expandableRow)
              return (
                <TableRow
                  {...tableRowProps}
                />
              )
            },
          },
        }
        const row = (
          <ExpandableRow
            {...expandableRowProps}
          />
        )

        rows.push(row)

        expander.renderRows(
          this.renderRows,
          rows,
          record,
          i,
          indent,
          fixed,
          key,
          ancestorKeys
        )
      }
      return rows
    },
  },

  render () {
    const { sComponents: components, prefixCls, scroll, data, getBodyWrapper } = this.table
    const { expander, tableClassName, hasHead, hasBody, fixed, columns } = this
    const tableStyle = {}
    
    if (!fixed && scroll.x) {
      // not set width, then use content fixed width
      if (scroll.x === true) {
        tableStyle.tableLayout = 'fixed'
      } else {
        tableStyle.width = typeof scroll.x === 'number' ? `${scroll.x}px` : scroll.x
      }
    }

    const Table = hasBody ? components.table : 'table'
    const BodyWrapper = components.body.wrapper

    let body
    if (hasBody) {
      body = (
        <BodyWrapper class={`${prefixCls}-tbody`}>
          {this.renderRows(data, 0)}
        </BodyWrapper>
      )
      if (getBodyWrapper) {
        body = getBodyWrapper(body)
      }
    }

    return (
      <Table class={tableClassName} style={tableStyle} key='table'>
        <ColGroup columns={columns} fixed={fixed} />
        {hasHead && <TableHeader expander={expander} columns={columns} fixed={fixed} /> }
        {body}
      </Table>
    )
  },
}

export default connect()(BaseTable)
