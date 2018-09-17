import { getOptionProps } from '@util/vc-util/props-util'
import Tree from './Tree'
import TreeNode from './TreeNode'

const NewTree = {
    name: Tree.name,
    TreeNode: TreeNode,
    props: Tree.props,
    render() {
        const { $listeners, $slots } = this
        const treeProps = {
            props: {
                ...getOptionProps(this),
                children: $slots.default
            },
            on: $listeners
        }
        return (
            <Tree {...treeProps}> {$slots.default} </Tree>
        )
        
    }
}

export { TreeNode }
export default NewTree