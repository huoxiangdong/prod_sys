import omit from 'omit.js'
import PROPTYPES from '../_utils/types'
import { Connect } from '../_utils/store'
import baseMixin from '../_utils/baseMixin'
import KEYCODE from '../_utils/keyCode'
import classNames from 'classnames'
import { getKeyFromChildrenIndex, loopMenuItem } from './util'
import DOMWrap from './DOMWrap'
import { cloneElement } from '../_utils/vnode'
import { initDefaultProps, getOptionProps, getEvents } from '../_utils/props'
import { noop } from '../_utils/shared'

function allDisabled (arr) {
  if (!arr.length) {
    return true
  }
  return arr.every(c => {
    return !!c.disabled
  })
}

function updateActiveKey (store, menuId, activeKey) {
  const state = store.getState()
  store.setState({
    activeKey: {
      ...state.activeKey,
      [menuId]: activeKey,
    },
  })
}

export function saveRef (key, c) {
  if (c) {
    const index = this.instanceArrayKeyIndexMap[key]
    this.instanceArray[index] = c
    // const index = this.instanceArray.indexOf(c)
    // if (index !== -1) {
    //   // update component if it's already inside instanceArray
    //   this.instanceArray[index] = c
    // } else {
    //   // add component if it's not in instanceArray yet;
    //   this.instanceArray.push(c)
    // }
  }
}

export function getActiveKey (props, originalActiveKey) {
  let activeKey = originalActiveKey
  const { eventKey, defaultActiveFirst, children } = props
  if (activeKey) {
    let found
    loopMenuItem(children, (c, i) => {
      const propsData = c.componentOptions.propsData || {}
      if (c && !propsData.disabled && activeKey === getKeyFromChildrenIndex(c, eventKey, i)) {
        found = true
      }
    })
    if (found) {
      return activeKey
    }
  }
  activeKey = null
  if (defaultActiveFirst) {
    loopMenuItem(children, (c, i) => {
      const propsData = c.componentOptions.propsData || {}
      if (!activeKey && c && !propsData.disabled) {
        activeKey = getKeyFromChildrenIndex(c, eventKey, i)
      }
    })
    return activeKey
  }
  return activeKey
}

const SubPopupMenu = {
  name: 'SubPopupMenu',
  props: initDefaultProps({
    // onSelect: PROPTYPES.func,
    // onClick: PROPTYPES.func,
    // onDeselect: PROPTYPES.func,
    // onOpenChange: PROPTYPES.func,
    // onDestroy: PROPTYPES.func,
    prefixCls: PROPTYPES.string,
    openTransitionName: PROPTYPES.string,
    openAnimation: PROPTYPES.oneOfType([PROPTYPES.string, PROPTYPES.object]),
    openKeys: PROPTYPES.arrayOf(PROPTYPES.oneOfType([PROPTYPES.string, PROPTYPES.number])),
    visible: PROPTYPES.bool,
    parentMenu: PROPTYPES.object,
    eventKey: PROPTYPES.string,
    store: PROPTYPES.object,

    // adding in refactor
    focusable: PROPTYPES.bool,
    multiple: PROPTYPES.bool,
    defaultActiveFirst: PROPTYPES.bool,
    activeKey: PROPTYPES.oneOfType([PROPTYPES.string, PROPTYPES.number]),
    selectedKeys: PROPTYPES.arrayOf(PROPTYPES.oneOfType([PROPTYPES.string, PROPTYPES.number])),
    defaultSelectedKeys: PROPTYPES.arrayOf(PROPTYPES.oneOfType([PROPTYPES.string, PROPTYPES.number])),
    defaultOpenKeys: PROPTYPES.arrayOf(PROPTYPES.oneOfType([PROPTYPES.string, PROPTYPES.number])),
    level: PROPTYPES.number,
    mode: PROPTYPES.oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']),
    triggerSubMenuAction: PROPTYPES.oneOf(['click', 'hover']),
    inlineIndent: PROPTYPES.oneOfType([PROPTYPES.number, PROPTYPES.string]),
    manualRef: PROPTYPES.func,
    children: PROPTYPES.any.def([]),
    __propsSymbol__: PROPTYPES.any, // mock componentWillReceiveProps
  }, {
    prefixCls: 'rc-menu',
    mode: 'vertical',
    level: 1,
    inlineIndent: 24,
    visible: true,
    focusable: true,
    manualRef: noop,
  }),

  mixins: [baseMixin],
  created () {
    const props = this.$props
    props.store.setState({
      activeKey: {
        ...props.store.getState().activeKey,
        [props.eventKey]: getActiveKey(props, props.activeKey),
      },
    })
    this.instanceArray = []
  },
  mounted () {
    
    // invoke customized ref to expose component to mixin
    if (this.manualRef) {
      this.manualRef(this)
    }
  },
  watch: {
    __propsSymbol__ () {
      const props = getOptionProps(this)
      const storeActiveKey = this.getStore().getState().activeKey[this.getEventKey()]
      const originalActiveKey = 'activeKey' in props ? props.activeKey
        : storeActiveKey
      const activeKey = getActiveKey(props, originalActiveKey)
      if (activeKey !== originalActiveKey || storeActiveKey !== activeKey) {
        updateActiveKey(this.getStore(), this.getEventKey(), activeKey)
      }
    },
  },
  methods: {
    // all keyboard events callbacks run from here at first
    onKeyDown  (e, callback) {
      const keyCode = e.keyCode
      let handled
      this.getFlatInstanceArray().forEach((obj) => {
        if (obj && obj.active && obj.onKeyDown) {
          handled = obj.onKeyDown(e)
        }
      })
      if (handled) {
        return 1
      }
      let activeItem = null
      if (keyCode === KEYCODE.UP || keyCode === KEYCODE.DOWN) {
        activeItem = this.step(keyCode === KEYCODE.UP ? -1 : 1)
      }
      if (activeItem) {
        e.preventDefault()
        updateActiveKey(this.getStore(), this.getEventKey(), activeItem.eventKey)

        if (typeof callback === 'function') {
          callback(activeItem)
        }

        return 1
      }
    },

    onItemHover (e) {
      const { key, hover } = e
      updateActiveKey(this.getStore(), this.getEventKey(), hover ? key : null)
    },

    onDeselect (selectInfo) {
      this.__emit('deselect', selectInfo)
    },

    onSelect (selectInfo) {
      this.__emit('select', selectInfo)
    },

    onClick (e) {
      this.__emit('click', e)
    },

    onOpenChange (e) {
      this.__emit('openChange', e)
    },

    onDestroy (key) {
      this.__emit('destroy', key)
    },

    getFlatInstanceArray () {
      return this.instanceArray
    },

    getStore  () {
      return this.store
    },

    getEventKey () {
      // when eventKey not available ,it's menu and return menu id '0-menu-'
      return this.eventKey || '0-menu-'
    },

    getOpenTransitionName () {
      return this.$props.openTransitionName
    },

    step (direction) {
      let children = this.getFlatInstanceArray()
      const activeKey = this.getStore().getState().activeKey[this.getEventKey()]
      const len = children.length
      if (!len) {
        return null
      }
      if (direction < 0) {
        children = children.concat().reverse()
      }
      // find current activeIndex
      let activeIndex = -1
      children.every((c, ci) => {
        if (c && c.eventKey === activeKey) {
          activeIndex = ci
          return false
        }
        return true
      })
      if (
        !this.defaultActiveFirst && activeIndex !== -1 &&
        allDisabled(children.slice(activeIndex, len - 1))
      ) {
        return undefined
      }
      const start = (activeIndex + 1) % len
      let i = start

      do {
        const child = children[i]
        if (!child || child.disabled) {
          i = (i + 1) % len
        } else {
          return child
        }
      } while (i !== start)

      return null
    },

    renderCommonMenuItem (child, i, extraProps) {
      if (child.tag === undefined) { return child }
      const state = this.getStore().getState()
      const props = this.$props
      const key = getKeyFromChildrenIndex(child, props.eventKey, i)
      const childProps = child.componentOptions.propsData || {}
      const isActive = key === state.activeKey[this.getEventKey()]
      if (!childProps.disabled) {
        // manualRef的执行顺序不能保证，使用key映射ref在this.instanceArray中的位置
        this.instanceArrayKeyIndexMap[key] = Object.keys(this.instanceArrayKeyIndexMap).length
      }
      const childListeners = getEvents(child)
      const newChildProps = {
        props: {
          mode: props.mode,
          level: props.level,
          inlineIndent: props.inlineIndent,
          renderMenuItem: this.renderMenuItem,
          rootPrefixCls: props.prefixCls,
          index: i,
          parentMenu: props.parentMenu,
          // customized ref function, need to be invoked manually in child's componentDidMount
          manualRef: childProps.disabled ? noop : saveRef.bind(this, key),
          eventKey: key,
          active: !childProps.disabled && isActive,
          multiple: props.multiple,
          openTransitionName: this.getOpenTransitionName(),
          openAnimation: props.openAnimation,
          subMenuOpenDelay: props.subMenuOpenDelay,
          subMenuCloseDelay: props.subMenuCloseDelay,
          forceSubMenuRender: props.forceSubMenuRender,
          ...extraProps,
        },
        on: {
          click: (e) => {
            (childListeners.click || noop)(e)
            this.onClick(e)
          },
          itemHover: this.onItemHover,
          openChange: this.onOpenChange,
          deselect: this.onDeselect,
          // destroy: this.onDestroy,
          select: this.onSelect,
        },
      }
      if (props.mode === 'inline') {
        newChildProps.props.triggerSubMenuAction = 'click'
      }
      return cloneElement(child, newChildProps)
    },

    renderMenuItem (c, i, subMenuKey) {
      if (!c) {
        return null
      }
      const state = this.getStore().getState()
      const extraProps = {
        openKeys: state.openKeys,
        selectedKeys: state.selectedKeys,
        triggerSubMenuAction: this.triggerSubMenuAction,
        isRootMenu: false,
        subMenuKey,
      }
      return this.renderCommonMenuItem(c, i, extraProps)
    },
  },
  render () {
    
    const { ...props } = this.$props
    const { eventKey, visible } = props
    this.instanceArray = []
    this.instanceArrayKeyIndexMap = {}
    const className = classNames(
      props.prefixCls,
      `${props.prefixCls}-${props.mode}`,
    )
    const domWrapProps = {
      props: {
        tag: 'ul',
        // hiddenClassName: `${prefixCls}-hidden`,
        visible,
      },
      attrs: {
        role: props.role || 'menu',
      },
      class: className,
      // Otherwise, the propagated click event will trigger another onClick
      on: omit(this.$listeners || {}, ['click']),
    }
    // if (props.id) {
    //   domProps.id = props.id
    // }
    if (props.focusable) {
      domWrapProps.attrs.tabIndex = '0'
      domWrapProps.on.keydown = this.onKeyDown
    }
    return (
      // ESLint is not smart enough to know that the type of `children` was checked.
      /* eslint-disable */
      <DOMWrap
        {...domWrapProps}
      >
        {props.children.map((c, i) => this.renderMenuItem(c, i, eventKey || '0-menu-'))}
      </DOMWrap>
      /*eslint -enable */
    )
  },
}

export default Connect()(SubPopupMenu)

