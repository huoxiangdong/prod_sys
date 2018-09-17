export default {
    name: 'd-info',
    install(Vue) {
        Vue.component(this.name,this)
    },
    render(h) {
        let icons =  ['teal','blue','red'].map(c => {
            return  h('v-icon',{
                props: {
                    color: c
                }
            },'fiber_manual_record')
        })
        return h('div',icons)
    }
}