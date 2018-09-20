import PROPTYPES from '../_utils/types'

export default {
  prefixCls: PROPTYPES.string.def('rc-menu'),
  focusable: PROPTYPES.bool.def(true),
  multiple: PROPTYPES.bool,
  defaultActiveFirst: PROPTYPES.bool,
  visible: PROPTYPES.bool.def(true),
  activeKey: PROPTYPES.oneOfType([PROPTYPES.string, PROPTYPES.number]),
  selectedKeys: PROPTYPES.arrayOf(PROPTYPES.oneOfType([PROPTYPES.string, PROPTYPES.number])),
  defaultSelectedKeys: PROPTYPES.arrayOf(PROPTYPES.oneOfType([PROPTYPES.string, PROPTYPES.number])).def([]),
  defaultOpenKeys: PROPTYPES.arrayOf(PROPTYPES.oneOfType([PROPTYPES.string, PROPTYPES.number])).def([]),
  openKeys: PROPTYPES.arrayOf(PROPTYPES.oneOfType([PROPTYPES.string, PROPTYPES.number])),
  openAnimation: PROPTYPES.oneOfType([PROPTYPES.string, PROPTYPES.object]),
  mode: PROPTYPES.oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']).def('vertical'),
  triggerSubMenuAction: PROPTYPES.string.def('hover'),
  subMenuOpenDelay: PROPTYPES.number.def(0.1),
  subMenuCloseDelay: PROPTYPES.number.def(0.1),
  level: PROPTYPES.number.def(1),
  inlineIndent: PROPTYPES.number.def(24),
  theme: PROPTYPES.oneOf(['light', 'dark']).def('light'),
  getPopupContainer: PROPTYPES.func,
  openTransitionName: PROPTYPES.string,
  forceSubMenuRender: PROPTYPES.bool,
  selectable: PROPTYPES.bool,
  isRootMenu: PROPTYPES.bool.def(true),
}
