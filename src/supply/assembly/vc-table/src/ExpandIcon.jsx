import PROPTYPES from '../../_utils/types'
import baseMixin from '../../_utils/baseMixin'
export default {
  mixins: [baseMixin],
  name: 'ExpandIcon',
  props: {
    record: PROPTYPES.object,
    prefixCls: PROPTYPES.string,
    expandable: PROPTYPES.any,
    expanded: PROPTYPES.bool,
    needIndentSpaced: PROPTYPES.bool,
  },
  methods: {
    onExpand (e) {
      this.__emit('expand', this.record, e)
    },
  },

  render () {
    const { expandable, prefixCls, onExpand, needIndentSpaced, expanded } = this
    if (expandable) {
      const expandClassName = expanded ? 'expanded' : 'collapsed'
      return (
        <span
          class={`${prefixCls}-expand-icon ${prefixCls}-${expandClassName}`}
          onClick={onExpand}
        />
      )
    } else if (needIndentSpaced) {
      return <span class={`${prefixCls}-expand-icon ${prefixCls}-spaced`} />
    }
    return null
  },
}
