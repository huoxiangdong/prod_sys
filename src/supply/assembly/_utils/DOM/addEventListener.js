/**
 * 添加 DOM事件监听
  */
import addDOMEventListener from 'add-dom-event-listener'

export default function addEventListenerWrap (target, eventType, cb) {
  return addDOMEventListener(target, eventType, cb)
}
