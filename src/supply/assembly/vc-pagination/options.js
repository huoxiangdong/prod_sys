import PROPTYPES from '../_utils/types'
import KEYCODE from './keycode'
import baseMixin from '../_utils/baseMixin'

export default {
    mixins: [baseMixin],
    props: {
        rootPrefixCls: PROPTYPES.string,
        selectPrefixCls: PROPTYPES.string,
        changeSize: PROPTYPES.func,
        quickGo: PROPTYPES.func,
        selectComponentClass: PROPTYPES.any,
        current: PROPTYPES.number,
        pageSzieOptions: PROPTYPES.array.def(['10', '20', '30', '40']),
        pageSize: PROPTYPES.number,
        buildOptionText: PROPTYPES.func,
        locale: PROPTYPES.object,
        getButtion: PROPTYPES.any
    },
    data() {
        return {
            goInputText: ''
        }
    },
    methods: {
        defaultBuildOptionText(opt) {
            return `${opt.value} ${this.locale.items_per_page}`
        },
        handleChange(e) {
            this.setState({
                goInputText: e.target.value // 合并到 this.$data
            })
        },
        go(e) {
            let val = this.goInputText 
            if(val === '') {
                return 
            }
            val = isNaN(val) ? this.current : Number(val)
            if(e.keyCode === KEYCODE.ENTER || e.type === 'click') {
                this.setState({
                    goInputText: ''
                })
                this.quickGo(val)
            }
        },
        render() {
            const { rootPrefixCls, locale, changeSize, quickGo, goButton, selectComponentClass: Select, defaultBuildOptionText } = this
            const prefixCls = `${rootPrefixCls}-options`
            let changeSelect = null 
            let goInput = null
            let gotoButton = null 

            if(!(changeSize || quickGo)) {
                return null
            }

            if(changeSize && Select) {
                const option = Select.Option
                const pageSize = this.pageSize || this.pageSizeOptions[0]
                const buildOptionText = this.buildOptionText || defaultBuildOptionText 
                const options = this.pageSizeOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                     {buildOptionText({ value: opt })}
                    </option>
                ))
            }
        }
    }
}