
import PROPTYPES from '../_utils/types'
import KEYCODE from '../_utils/keyCode'
import baseMixin from '../_utils/baseMixin'
import scrollIntoView from 'dom-scroll-into-view'
import { Connect } from '../_utils/store'
import { noop } from '../_utils/shared'
import { menuAllProps } from './util'

const props = {
  attribute: PROPTYPES.object,
  rootPrefixCls: PROPTYPES.string,
  eventKey: PROPTYPES.oneOfType([PROPTYPES.string, PROPTYPES.number]),
  active: PROPTYPES.bool,
  selectedKeys: PROPTYPES.array,
  disabled: PROPTYPES.bool,
  title: PROPTYPES.string,
  index: PROPTYPES.number,
  inlineIndent: PROPTYPES.number.def(24),
  level: PROPTYPES.number.def(1),
  mode: PROPTYPES.oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']).def('vertical'),
  parentMenu: PROPTYPES.object,
  multiple: PROPTYPES.bool,
  value: PROPTYPES.any,
  isSelected: PROPTYPES.bool,
  manualRef: PROPTYPES.func.def(noop),
  role: PROPTYPES.any,
  subMenuKey: PROPTYPES.string,
  // clearSubMenuTimers: PROPTYPES.func.def(noop),
}
const MenuItem = {
  name: 'MenuItem',
  props,
  mixins: [baseMixin],
  isMenuItem: true,
  created () {
    // invoke customized ref to expose component to mixin
    this.callRef()
  },
  updated () {
    this.$nextTick(() => {
      if (this.active) {
        scrollIntoView(this.$el, this.parentMenu.$el, {
          onlyScrollIfNeeded: true,
        })
      }
    })
    this.callRef()
  },
  beforeDestroy () {
    const props = this.$props
    this.__emit('destroy', props.eventKey)
  },
  methods: {
    onKeyDown (e) {
      const keyCode = e.keyCode
      if (keyCode === KEYCODE.ENTER) {
        this.onClick(e)
        return true
      }
    },

    onMouseLeave (e) {
      const { eventKey } = this.$props
      this.__emit('itemHover', {
        key: eventKey,
        hover: false,
      })
      this.__emit('mouseleave', {
        key: eventKey,
        domEvent: e,
      })
    },

    onMouseEnter (e) {
      const { eventKey } = this
      this.__emit('itemHover', {
        key: eventKey,
        hover: true,
      })
      this.__emit('mouseenter', {
        key: eventKey,
        domEvent: e,
      })
    },

    onClick (e) {
      const { eventKey, multiple, isSelected } = this.$props
      const info = {
        key: eventKey,
        keyPath: [eventKey],
        item: this,
        domEvent: e,
      }

      this.__emit('click', info)
      if (multiple) {
        if (isSelected) {
          this.__emit('deselect', info)
        } else {
          this.__emit('select', info)
        }
      } else if (!isSelected) {
        this.__emit('select', info)
      }
    },

    getPrefixCls () {
      return `${this.$props.rootPrefixCls}-item`
    },

    getActiveClassName () {
      return `${this.getPrefixCls()}-active`
    },

    getSelectedClassName () {
      return `${this.getPrefixCls()}-selected`
    },

    getDisabledClassName () {
      return `${this.getPrefixCls()}-disabled`
    },

    callRef () {
      if (this.manualRef) {
        this.manualRef(this)
      }
    },
  },

  render () {
    const props = { ...this.$props }
    const className = {
      [this.getPrefixCls()]: true,
      [this.getActiveClassName()]: !props.disabled && props.active,
      [this.getSelectedClassName()]: props.isSelected,
      [this.getDisabledClassName()]: props.disabled,
    }
    let attrs = {
      ...props.attribute,
      title: props.title,
      role: 'menuitem',
      'aria-disabled': props.disabled,
    }
    if (props.role === 'option') {
      // overwrite to option
      attrs = {
        ...attrs,
        role: 'option',
        'aria-selected': props.isSelected,
      }
    } else if (props.role === null) {
      // sometimes we want to specify role inside <li/> element
      // <li><a role='menuitem'>Link</a></li> would be a good example
      delete attrs.role
    }
    // In case that onClick/onMouseLeave/onMouseEnter is passed down from owner
    const mouseEvent = {
      click: props.disabled ? noop : this.onClick,
      mouseleave: props.disabled ? noop : this.onMouseLeave,
      mouseenter: props.disabled ? noop : this.onMouseEnter,
    }

    const style = {}
    if (props.mode === 'inline') {
      style.paddingLeft = `${props.inlineIndent * props.level}px`
    }
    const listeners = { ...this.$listeners }
    menuAllProps.props.forEach(key => delete props[key])
    menuAllProps.on.forEach(key => delete listeners[key])
    const liProps = {
      attrs: {
        ...props,
        ...attrs,
      },
      on: {
        ...listeners,
        ...mouseEvent,
      },
    }
    return (
      <li
        {...liProps}
        style={style}
        class={className}
      >
        {this.$slots.default}
      </li>
    )
  },
}

const connected = Connect(({ activeKey, selectedKeys }, { eventKey, subMenuKey }) => ({
  active: activeKey[subMenuKey] === eventKey,
  isSelected: selectedKeys.indexOf(eventKey) !== -1,
}))(MenuItem)

export default connected
export { props as menuItemProps }

