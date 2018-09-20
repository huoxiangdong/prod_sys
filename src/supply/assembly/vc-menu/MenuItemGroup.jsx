import PROPTYPES from '../_utils/types'
import { getComponentFromProp } from '../_utils/props'
// import { menuAllProps } from './util'

const MenuItemGroup = {
  name: 'MenuItemGroup',

  props: {
    renderMenuItem: PROPTYPES.func,
    index: PROPTYPES.number,
    className: PROPTYPES.string,
    subMenuKey: PROPTYPES.string,
    rootPrefixCls: PROPTYPES.string,
    disabled: PROPTYPES.bool.def(true),
    title: PROPTYPES.any,
  },
  isMenuItemGroup: true,
  methods: {
    renderInnerMenuItem (item) {
      const { renderMenuItem, index, subMenuKey } = this.$props
      return renderMenuItem(item, index, subMenuKey)
    },
  },
  render () {
    const props = { ...this.$props }
    const { rootPrefixCls, title } = props
    const titleClassName = `${rootPrefixCls}-item-group-title`
    const listClassName = `${rootPrefixCls}-item-group-list`
    // menuAllProps.props.forEach(key => delete props[key])
    const listeners = { ...this.$listeners }
    delete listeners.click

    return (
      <li {...{ on: listeners, class: `${rootPrefixCls}-item-group` }}>
        <div
          class={titleClassName}
          title={typeof title === 'string' ? title : undefined}
        >
          {getComponentFromProp(this, 'title')}
        </div>
        <ul class={listClassName}>
          {this.$slots.default && this.$slots.default.map(this.renderInnerMenuItem)}
        </ul>
      </li>
    )
  },
}

export default MenuItemGroup

