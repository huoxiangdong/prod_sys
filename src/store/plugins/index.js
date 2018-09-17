export default store => {
    // const initTime = new Date()
    const vm = store._vm
    vm.$watch('$data.$$state.COMMON', function (val) {
        localStorage.setItem('state', JSON.stringify(val))
    }, {
        deep: true
    })
    if (new Date()) {
        store.state.COMMON = JSON.parse(localStorage.getItem('state'))
    }
}