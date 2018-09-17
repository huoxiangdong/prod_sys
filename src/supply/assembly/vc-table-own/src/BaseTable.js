import PropTypes from '@util/vue-types'
import TableHeader from './TableHeader'

const BaseTable = {
    name: 'BaseTable',
    inject: {
      table: { default: {}}
    },
    props: {
      columns: PropTypes.array.isRequired
    },
    render() {
       const { sComponents: components, columns } = this.table
       const Table = components.table
       return (
        <Table key='table'>
         <TableHeader columns={columns}></TableHeader>
        </Table>
       )
    },
    mounted() {
      
    },
}

export default BaseTable