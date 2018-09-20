
import PROPTYPES from '../_utils/types'
import LazyRenderBox from './LazyRenderBox'

export default {
  props: {
    hiddenClassName: PROPTYPES.string.def(''),
    prefixCls: PROPTYPES.string,
    visible: PROPTYPES.bool,
  },
  render () {
    const { prefixCls, visible, hiddenClassName } = this.$props
    const { $listeners } = this
    const divProps = {
      on: $listeners,
    }

    return (
      <div {...divProps} class={!visible ? hiddenClassName : ''}>
        <LazyRenderBox class={`${prefixCls}-content`} visible={visible}>
          {this.$slots.default}
        </LazyRenderBox>
      </div>
    )
  },
}

