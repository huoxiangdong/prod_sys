import classnames from 'classnames'
import Trigger from '../vc-trigger'
import PROPTYPES from '../_utils/types'
import DropdownMenu from './DropdownMenu'
import { isSingleMode, saveRef } from './util'
import baseMixin from '../_utils/baseMixin'

const BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
}

export default {
  name: 'SelectTrigger',
  mixins: [baseMixin],
  props: {
    // onPopupFocus: PropTypes.func,
    // onPopupScroll: PropTypes.func,
    dropdownMatchSelectWidth: PROPTYPES.bool,
    defaultActiveFirstOption: PROPTYPES.bool,
    dropdownAlign: PROPTYPES.object,
    visible: PROPTYPES.bool,
    disabled: PROPTYPES.bool,
    showSearch: PROPTYPES.bool,
    dropdownClassName: PROPTYPES.string,
    dropdownStyle: PROPTYPES.object,
    dropdownMenuStyle: PROPTYPES.object,
    multiple: PROPTYPES.bool,
    inputValue: PROPTYPES.string,
    filterOption: PROPTYPES.any,
    options: PROPTYPES.any,
    prefixCls: PROPTYPES.string,
    popupClassName: PROPTYPES.string,
    value: PROPTYPES.array,
    // children: PropTypes.any,
    showAction: PROPTYPES.arrayOf(PROPTYPES.string),
    combobox: PROPTYPES.bool,
    animation: PROPTYPES.string,
    transitionName: PROPTYPES.string,
    getPopupContainer: PROPTYPES.func,
    backfillValue: PROPTYPES.any,
  },
  created () {
    this.saveDropdownMenuRef = saveRef(this, 'dropdownMenuRef')
    this.saveTriggerRef = saveRef(this, 'triggerRef')
  },
  data () {
    return {
      dropdownWidth: null,
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.setDropdownWidth()
    })
  },

  updated () {
    this.$nextTick(() => {
      this.setDropdownWidth()
    })
  },
  methods: {
    setDropdownWidth () {
      const width = this.$el.offsetWidth
      if (width !== this.dropdownWidth) {
        this.setState({ dropdownWidth: width })
      }
    },

    getInnerMenu () {
      return this.dropdownMenuRef && this.dropdownMenuRef.$refs.menuRef
    },

    getPopupDOMNode () {
      return this.triggerRef.getPopupDomNode()
    },

    getDropdownElement (newProps) {
      const {
        value, firstActiveValue, defaultActiveFirstOption,
        dropdownMenuStyle, getDropdownPrefixCls, backfillValue,
      } = this
      const { menuSelect, menuDeselect, popupScroll } = this.$listeners
      const dropdownMenuProps = {
        props: {
          ...newProps.props,
          prefixCls: getDropdownPrefixCls(),
          value, firstActiveValue, defaultActiveFirstOption, dropdownMenuStyle,
          backfillValue,
        },
        on: {
          ...newProps.on,
          menuSelect,
          menuDeselect,
          popupScroll,
        },
        directives: [{
          name: 'ref',
          value: this.saveDropdownMenuRef,
        }],
      }
      return (
        <DropdownMenu {...dropdownMenuProps} />
      )
    },

    getDropdownTransitionName () {
      const props = this.$props
      let transitionName = props.transitionName
      if (!transitionName && props.animation) {
        transitionName = `${this.getDropdownPrefixCls()}-${props.animation}`
      }
      return transitionName
    },

    getDropdownPrefixCls () {
      return `${this.prefixCls}-dropdown`
    },
  },

  render () {
    const { $props, $slots, $listeners } = this
    const {
      multiple,
      visible,
      inputValue,
      dropdownAlign,
      disabled,
      showSearch,
      dropdownClassName,
      dropdownStyle,
      dropdownMatchSelectWidth,
      options,
      getPopupContainer,
      showAction,
    } = $props
    const { mouseenter, mouseleave, popupFocus, dropdownVisibleChange } = $listeners
    const dropdownPrefixCls = this.getDropdownPrefixCls()
    const popupClassName = {
      [dropdownClassName]: !!dropdownClassName,
      [`${dropdownPrefixCls}--${multiple ? 'multiple' : 'single'}`]: 1,
    }
    const popupElement = this.getDropdownElement({
      props: {
        menuItems: options,
        multiple,
        inputValue,
        visible,
      }, on: {
        popupFocus,
      },
    })
    let hideAction
    if (disabled) {
      hideAction = []
    } else if (isSingleMode($props) && !showSearch) {
      hideAction = ['click']
    } else {
      hideAction = ['blur']
    }
    const popupStyle = { ...dropdownStyle }
    const widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth'
    if (this.dropdownWidth) {
      popupStyle[widthProp] = `${this.dropdownWidth}px`
    }
    const triggerProps = {
      props: {
        ...$props,
        showAction: disabled ? [] : showAction,
        hideAction,
        ref: 'triggerRef',
        popupPlacement: 'bottomLeft',
        builtinPlacements: BUILT_IN_PLACEMENTS,
        prefixCls: dropdownPrefixCls,
        popupTransitionName: this.getDropdownTransitionName(),
        popupAlign: dropdownAlign,
        popupVisible: visible,
        getPopupContainer,
        popupClassName: classnames(popupClassName),
        popupStyle,
      },
      on: {
        popupVisibleChange: dropdownVisibleChange,
      },
      directives: [{
        name: 'ref',
        value: this.saveTriggerRef,
      }],
    }
    if (mouseenter) {
      triggerProps.on.mouseenter = mouseenter
    }
    if (mouseleave) {
      triggerProps.on.mouseleave = mouseleave
    }
    return (
      <Trigger {...triggerProps}>
        {$slots.default}
        <template slot='popup'>
          {popupElement}
        </template>
      </Trigger>
    )
  },
}


