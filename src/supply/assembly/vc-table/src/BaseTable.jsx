
import PROPTYPES from '../../_utils/types'
import classNames from 'classnames'
import ColGroup from './ColGroup'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import ExpandableRow from './ExpandableRow'
import { mergeProps, getOptionProps } from '../../_utils/props'
import { Connect } from '../../_utils/store'
import { noop } from '../../_utils/shared'

const BaseTable = {
  name: 'BaseTable',
  props: {
    fixed: PROPTYPES.oneOfType([
      PROPTYPES.string,
      PROPTYPES.bool,
    ]),
    columns: PROPTYPES.array.isRequired,
    tableClassName: PROPTYPES.string.isRequired,
    hasHead: PROPTYPES.bool.isRequired,
    hasBody: PROPTYPES.bool.isRequired,
    store: PROPTYPES.object.isRequired,
    expander: PROPTYPES.object.isRequired,
    getRowKey: PROPTYPES.func,
    isAnyColumnsFixed: PROPTYPES.bool,
  },
  inject: {
    table: { default: {}},
  },
  methods: {
    getColumns (cols) {
      const { columns = [], fixed } = this.$props
      const { table } = this
      const { prefixCls } = table.$props
      return (cols || columns).map(column => ({
        ...column,
        className:
          !!column.fixed && !fixed
            ? classNames(`${prefixCls}-fixed-columns-in-body`, column.className || column.class)
            : column.className || column.class,
      }))
    },
    handleRowHover  (isHover, key) {
      this.store.setState({
        currentHoverKey: isHover ? key : null,
      })
    },

    renderRows  (renderData, indent, rows = [], ancestorKeys = []) {
      const {
        columnManager, sComponents: components,
        prefixCls,
        childrenColumnName,
        rowClassName,
        // rowRef,
        $listeners: {
          rowClick: onRowClick = noop,
          rowDoubleclick: onRowDoubleClick = noop,
          rowContextmenu: onRowContextMenu = noop,
          rowMouseenter: onRowMouseEnter = noop,
          rowMouseleave: onRowMouseLeave = noop,
        },
        customRow = noop,
      } = this.table
      const { getRowKey, fixed, expander, isAnyColumnsFixed } = this

      for (let i = 0; i < renderData.length; i++) {
        const record = renderData[i]
        const key = getRowKey(record, i)
        const className = typeof rowClassName === 'string' ? rowClassName : rowClassName(record, i, indent)

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
          leafColumns = this.getColumns(columnManager.leafColumns())
        }

        const rowPrefixCls = `${prefixCls}-row`
        const rowIndex = rows.filter(row => {
          const props = getOptionProps(row)
          return !props.expandedRow
        }).length

        const expandableRowProps = {
          props: {
            ...expander.props,
            fixed,
            index: rowIndex,
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
                  index: rowIndex,
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
        expander.renderRows(this.renderRows, rows, record, i, indent, fixed, key, ancestorKeys)
      }
      return rows
    },
  },

  render () {
    const { sComponents: components, prefixCls, scroll, data, getBodyWrapper } = this.table
    const { expander, tableClassName, hasHead, hasBody, fixed } = this.$props

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
      body = <BodyWrapper class={`${prefixCls}-tbody`}>{this.renderRows(data, 0)}</BodyWrapper>
      if (getBodyWrapper) {
        body = getBodyWrapper(body)
      }
    }
    const columns = this.getColumns()
    return (
      <Table class={tableClassName} style={tableStyle} key='table'>
        <ColGroup columns={columns} fixed={fixed} />
        {hasHead && <TableHeader expander={expander} columns={columns} fixed={fixed} /> }
        {body}
      </Table>
    )
  },
}

export default Connect()(BaseTable)
