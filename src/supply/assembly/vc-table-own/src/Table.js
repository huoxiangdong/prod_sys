import PropTypes from '@util/vue-types'
import { initDefaultProps, } from '@util/table-util/props-util'
import merge from 'lodash/merge'
import ColumnManager from './ColumnManager'

import HeadTable from './HeadTable'
export default {
    name: 'Table',
    provide() {
        return {
            table: this
        }
    },
    props: initDefaultProps({
           
        columns: PropTypes.array, // header
        data: PropTypes.array, // body
        showHeader: PropTypes.bool, // is show header
        components: PropTypes.shape({
            table: PropTypes.any,
            header: PropTypes.shape({
                wrapper: PropTypes.any,
                row: PropTypes.any,
                cell: PropTypes.any
            }),
            body: PropTypes.shape({
                wrapper: PropTypes.any,
                row: PropTypes.any,
                cell: PropTypes.any
            })
        })
    },{
        data: [], 
        showHeader: true
    }),
    data() {
       
       return {
        columnManager: new ColumnManager(this.columns),
        sComponents: merge({
            table: 'table',
            header: {
                wrapper: 'thead',
                row: 'tr',
                cell: 'th',
            },
            body: {
                wrapper: 'tbody',
                row: 'tr',
                cell: 'td'
            },   
        },this.components),
         
       }
    },
    methods: {
      renderMainTable() {
          const table = [
              this.renderTable({
                  columns: this.columnManager.groupedColumns()
              })
          ]
          return table
      },
      renderTable(options) { // render table
        const { columns } = options
        return (
            <HeadTable // 表头
              key='head'
              columns={columns}
            ></HeadTable>
        )
      }
    },
    render(h) {
        return (
            <div>
               {this.renderMainTable()}
            </div>
        )
    },
    mounted() {
       
    },
}