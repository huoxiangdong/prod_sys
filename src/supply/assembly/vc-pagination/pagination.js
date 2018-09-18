import PROPTYPES from '../_utils/types'
import baseMixin from '../_utils/baseMixin'
import { hasProp } from '../_utils/props'
import { noop, warn, isInteger } from '../_utils/shared'
import pager from './pager'
import options from './options'
import LOCALE from './locale/zh_CN'
import KEYCODE from './keycode'

function defaultItemRender(page, type, element) {
    return element
}

export default {
    name: 'pagination',
    mixins: [baseMixin],
    props: {
       prefixCls: PROPTYPES.string.def('rc-pagination'),
       selectPrefixCls: PROPTYPES.string.def('rc-select'),
       current: PROPTYPES.number, // 当前页
       defaultCurrent: PROPTYPES.number.def(1),
       total: PROPTYPES.number.def(0),
       pageSize: PROPTYPES.number,
       defaultPageSize: PROPTYPES.number.def(10),
       change: PROPTYPES.func.def(noop),
       hideOnSinglePage: PROPTYPES.bool.def(false),
       showSizeChanger: PROPTYPES.bool.def(false),
       showLessItems: PROPTYPES.bool.def(false),
       selectComponentClass: PROPTYPES.any,
       showPrevNextJumpers: PROPTYPES.bool.def(true),
       showQuickJumper: PROPTYPES.oneOfType([PROPTYPES.bool, PROPTYPES.object]).def(false),
       showTitle: PROPTYPES.bool.def(true),
       pageSizeOptons: PROPTYPES.arrayOf(PROPTYPES.string),
       buildOptionText: PROPTYPES.func,
       showTotal: PROPTYPES.func,
       simple: PROPTYPES.bool,
       locale: PROPTYPES.object.def(LOCALE), // 语言
       itemRender: PROPTYPES.func.def(defaultItemRender)
    },
    // v-model
    model: {
        prop: 'current',
        event: 'change'
    },
    data() {
        /**
         * ?
          */
        const hasOnChange = this.onChange !== noop // 当前页变更回调
        const hasCurrent = hasProp(this, 'current') // 当前页是否传值
        if(hasCurrent && !hasOnChange) {
            warn('Warning: You provided a `current` prop to a Pagination component without an  `onChange` handler. This will render a read-only component')
        }

        let current = this.defaultCurrent
        if(hasCurrent) {
            current = this.current
        }

        let pageSize = this.defaultPageSize
        if(hasProp(this, 'pageSize')) {
            pageSize = this.pageSize 
        }
        return {
            stateCurrent: current,
            stateCurrentInputValue: current,
            statePageSize: pageSize // 每页显示数
        }
    },
    watch: {
        current(val) { // 当前页
            this.setState({
                stateCurrent: val,
                sateCurrentInputValue: val
            })
        },
        pageSize(val) { // 每页显示数
            const newState = {}
            let current = this.stateCurrent 
            /**
             * 新的当前页
              */
            const newCurrent = this.calculatePage(val) 
            current = currtent > newCurrent ? newCurrent : current
            if(!hasProp(this, 'current')) {
                newState.stateCurrent = current 
                newState.stateCurrentInputValue = current 
            }
            newState.statePageSize = val
            this.setState(newState)
        },
        stateCurrent(val, oldValue) {
            // When current page change, fix focused style of prev item
            // A hacky solution of https://github.com/ant-design/ant-design/issues/8948    
            this.$nextTick(() => {
                if(this.$refs.paginationNode) {
                   const lastCurrentNode = this.$refs.paginationNode.querySelector( // 当前页节点
                       `.${this.prefixCls}-item-${oldValue}`
                   )
                   if(lastCurrentNode && document.activeElement === lastCurrentNode) {
                       lastCurrentNode.blur() // 失去焦点
                   }
                }
            })
        },
        methods: {
            isValid(page) {
                return isInteger(page) && page >= 1 && page !== this.stateCurrent
            },
            /**
             * 计算当前页
              */
            calculatePage(p) { 
                let pageSize = p // 每页显示数
                if(typeof pageSize ==='undefined') {
                    pageSzie = this.statePageSize
                }
                return Math.floor((this.total -1 ) / pageSize) + 1
            },
            handleGoTo(event) {
                if(event.keyCode === KEYCODE.ENTER || event.type === 'click') {
                    this.handleChange(this.stateCurrentInputValue)
                }
            }

        }
    }
}
