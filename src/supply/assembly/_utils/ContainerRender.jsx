import Vue from 'vue'
import PROPTYPES from './types'

export default {
  props: {
    autoMount: PROPTYPES.bool.def(true),
    autoDestroy: PROPTYPES.bool.def(true),
    visible: PROPTYPES.bool,
    forceRender: PROPTYPES.bool.def(false),
    parent: PROPTYPES.any,
    getComponent: PROPTYPES.func.isRequired,
    getContainer: PROPTYPES.func.isRequired,
    children: PROPTYPES.func.isRequired,
  },

  mounted () {
    if (this.autoMount) {
      this.renderComponent()
    }
  },

  updated () {
    if (this.autoMount) {
      this.renderComponent()
    }
  },

  beforeDestroy () {
    if (this.autoDestroy) {
      this.removeContainer()
    }
  },
  methods: {
    removeContainer () {
      if (this.container) {
        this._component && this._component.$destroy()
        this.container.parentNode.removeChild(this.container)
        this.container = null
      }
    },

    renderComponent (props = {}, ready) {
      const { visible, getComponent, forceRender, getContainer, parent } = this
      const self = this
      if (visible || parent.$refs._component || forceRender) {
        let el = this.componentEl
        if (!this.container) {
          this.container = getContainer()
          el = document.createElement('div')
          this.componentEl = el
          this.container.appendChild(el)
        }

        if (!this._component) {
          this._component = new Vue({
            data: {
              comProps: props,
            },
            parent: self.parent,
            el: el,
            mounted () {
              this.$nextTick(() => {
                if (ready) {
                  ready.call(self)
                }
              })
            },
            updated () {
              this.$nextTick(() => {
                if (ready) {
                  ready.call(self)
                }
              })
            },
            render () {
              return getComponent(this.comProps)
            },
          })
        } else {
          this._component.comProps = props
        }
      }
    },
  },

  render () {
    return this.children({
      renderComponent: this.renderComponent,
      removeContainer: this.removeContainer,
    })
  },
}