import PropTypes from '@util/vue-types'
import BaseTable from './BaseTable'
export default {
    name: 'HeadTable',
    props: {
        columns: PropTypes.array.isRequired
    },
    render() {
       const { columns } = this
       return (
           <div>
               <BaseTable
                 columns={columns}
               ></BaseTable>
           </div>
       )
    }
}