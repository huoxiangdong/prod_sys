import { initMixin } from './init'
import { methodsMixin } from './methods'
import { chainMixin } from './chain'
import { mathMixin } from './math'
import { renderMixin } from './render'
function Free(options) {
  
    this._init(options)
  }

  initMixin(Free)
  renderMixin(Free)
  methodsMixin(Free)
  chainMixin(Free)
  mathMixin(Free)

export default Free 

  

  
 

  
  
  