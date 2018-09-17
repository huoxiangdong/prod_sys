import {
  createSimpleFunctional
} from '../../util/index'

import VFreeTable from './VFreeTable'
import VEditDialog from './VEditDialog'

const VTableOverflow = createSimpleFunctional('table__overflow')

export { VFreeTable, VEditDialog, VTableOverflow }

VFreeTable.install = function install (Vue) {
  Vue.component(VFreeTable.name, VFreeTable)
  Vue.component(VEditDialog.name, VEditDialog)
  Vue.component(VTableOverflow.name, VTableOverflow)
}

export default (VFreeTable)
