import T from './src/Table'
import { getOptionProps } from '../../util/table-util/props-util'
const Table = {
    name: 'Table',
    props: T.props,
    render() {
        const { $listeners, $slots, } = this
        const props = getOptionProps(this)
        const columns = props.columns || []
        const tProps = {
            props: {
                ...props,
                columns
            },
            on: $listeners
        }
        return (
            <T { ...tProps}></T>
        )
    }
}

export default Table