
import PROPTYPES from '../_utils/types'
import { alignElement, alignPoint } from 'dom-align'
import addEventListener from '../_utils/DOM/addEventListener'
import { isWindow, buffer, isSamePoint } from './util'
import { cloneElement } from '../_utils/vnode.js'
import clonedeep from 'lodash/cloneDeep' // 深拷贝

function getElement (func) {
  if (typeof func !== 'function' || !func) return null
  return func()
}

function getPoint (point) {
  if (typeof point !== 'object' || !point) return null
  return point
}

export default {
  props: {
    childrenProps: PROPTYPES.object,
    align: PROPTYPES.object.isRequired,
    target: PROPTYPES.oneOfType([
      PROPTYPES.func,
      PROPTYPES.object,
    ]).def(() => window),
    monitorBufferTime: PROPTYPES.number.def(50),
    monitorWindowResize: PROPTYPES.bool.def(false),
    disabled: PROPTYPES.bool.def(false),
    visible: PROPTYPES.bool.def(true)
  },
  data () {
    this.aligned = false
    return {
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.prevProps = { ...this.$props }
      const props = this.$props
      // if parent ref not attached .... use document.getElementById
      !this.aligned && this.forceAlign()
      if (!props.disabled && props.monitorWindowResize) {
        this.startMonitorWindowResize()
      }
    })
  },
  updated () {
    this.$nextTick(() => {
      const prevProps = this.prevProps
      const props = this.$props
      let reAlign = false
      if (!props.disabled && props.visible) {
        
        const source = this.$el
        const sourceRect = source ? source.getBoundingClientRect() : null

        if (prevProps.disabled) {
          reAlign = true
        } else {
          const lastElement = getElement(prevProps.target)
          const currentElement = getElement(props.target)
          const lastPoint = getPoint(prevProps.target)
          const currentPoint = getPoint(props.target)
          if (isWindow(lastElement) && isWindow(currentElement)) {
          // Skip if is window
            reAlign = false
          } else if (
            lastElement !== currentElement || // Element change
          (lastElement && !currentElement && currentPoint) || // Change from element to point
          (lastPoint && currentPoint && currentElement) || // Change from point to element
          (currentPoint && !isSamePoint(lastPoint, currentPoint))
          ) {
            reAlign = true
          }

          // If source element size changed
          const preRect = this.sourceRect || {}
          if (!reAlign && source && (preRect.width !== sourceRect.width || preRect.height !== sourceRect.height)) {
            reAlign = true
          }
        }
        this.sourceRect = sourceRect
      }

      if (reAlign) {
        this.forceAlign()
      }

      if (props.monitorWindowResize && !props.disabled) {
        this.startMonitorWindowResize()
      } else {
        this.stopMonitorWindowResize()
      }
      this.prevProps = { ...this.$props, align: clonedeep(this.$props.align) }
    })
  },
  beforeDestroy () {
    this.stopMonitorWindowResize()
  },
  methods: {
    startMonitorWindowResize () {
      if (!this.resizeHandler) {
        this.bufferMonitor = buffer(this.forceAlign, this.$props.monitorBufferTime)
        this.resizeHandler = addEventListener(window, 'resize', this.bufferMonitor)
      }
    },

    stopMonitorWindowResize () {
      if (this.resizeHandler) {
        this.bufferMonitor.clear()
        this.resizeHandler.remove()
        this.resizeHandler = null
      }
    },

    forceAlign () {
      const { disabled, target, align } = this.$props
      
      if (!disabled && target) {
        const source = this.$el
        
        let result
        const element = getElement(target)
        const point = getPoint(target)

        if (element) {
          result = alignElement(source, element, align)
        } else if (point) {
          console.log(source, point, align)
          result = alignPoint(source, point, align)
        }
        this.aligned = true
        this.$listeners.align && this.$listeners.align(source, result)
      }
    },
  },

  render () {
    const { childrenProps } = this.$props
    const child = this.$slots.default[0] // 包裹的元素
    if (childrenProps) {
      return cloneElement(child, { props: childrenProps })
    }
    return child
  },
}

