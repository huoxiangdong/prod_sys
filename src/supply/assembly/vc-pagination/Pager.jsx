import PROPTYPES from '../_utils/types'

export default {
  name: 'Pager',
  props: {
    rootPrefixCls: PROPTYPES.string, // class命名空间
    page: PROPTYPES.number,
    active: PROPTYPES.bool,
    last: PROPTYPES.bool,
    locale: PROPTYPES.object,
    showTitle: PROPTYPES.bool,
    itemRender: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    classes () {
      const prefixCls = `${this.rootPrefixCls}-item`
      let cls = `${prefixCls} ${prefixCls}-${this.page}`
      if (this.active) {
        cls = `${cls} ${prefixCls}-active`
      }
      return cls
    },
  },
  methods: {
    handleClick () {
      this.$emit('click', this.page)
    },
    handleKeyPress (event) {
      this.$emit('keypress', event, this.handleClick, this.page)
    },
  },
  render () {
    const { rootPrefixCls, page, active } = this
    const prefixCls = `${rootPrefixCls}-item`
    let cls = `${prefixCls} ${prefixCls}-${page}`

    if (active) {
      cls = `${cls} ${prefixCls}-active`
    }

    return (
      <li
        class={cls}
        onClick={this.handleClick}
        onKeypress={this.handleKeyPress}
        title={this.showTitle ? this.page : null}
        tabIndex='0'
      >
        {this.itemRender(this.page, 'page', <a>{this.page}</a>)}
      </li>
    )
  },
}
