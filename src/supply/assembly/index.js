
import Vuetify from './vuetify/index'
import DCanvas from './DCanvas'
import DSidebar from './DSidebar'
import DHeader from './DHeader'
import DNavigation from './DNavigation'
import DInfo from './DInfo'
import DPopup from './DPopup'
import DCraft from './DCraft'
import DFiche from './DFiche'
// table test
import Table from './vc-table'
import Tree from './vc-tree'


const assembly = {
    ...Vuetify,
    DCanvas,
    DSidebar,
    DHeader,
    DNavigation,
    DInfo,
    DPopup,
    DCraft,
    DFiche,
    Table,
    Tree
}

export default {
    install(Vue) {
        Object.values(assembly).forEach(ass => {
            Vue.component(ass.name,ass)
            // Vue.use(ass)
        })
    }
}