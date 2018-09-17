// util
function on(el, event, fn) { // 元素 事件 回调
    el.addEventListener(event, fn, false);
}
// 事件移除
function off(el, event, fn) {
    el.removeEventListener(event, fn, false);
}


let dragEl,
    rootEl


function Dragable(el, options) {
    
    this.el = el
    this.options = options
	// 私有方法绑定this
    for (var fn in this) { 
        if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
            this[fn] = this[fn].bind(this);
        }
    }
    // 事件监听
    on(el, 'mousedown', this._onTapStart); // 鼠标按下
    // drag
    on(el, 'dragover', this); // 在另一个元素上
    on(el, 'dragenter', this); // 进入另一个元素
    
}

Dragable.prototype = {
    constructor: Dragable,

    _onTapStart(e) { // 鼠标按下

        let bindEl = this.el,
            type = e.type,
            target = e.target,
            index
        
        // if(dragEl) {
        //     return 
        // }
        // 只允许左键
        if (/mousedown|pointerdown/.test(type) && e.button !== 0) { // evt.button 鼠标按键 012 左中右
            return; 
        }
        
        target = this._closest(target,bindEl) // 绑定元素子元素
      
        this._prepareDragStart(e,target)
    },
    _prepareDragStart(e, target) { // drag 
        let el = this.el
        if(target  && target.parentNode === el) {
            rootEl = el
            dragEl = target
            // 提高性能
            dragEl.style['will-change'] = 'all'

            dragEl.draggable = true // draggable = true
            on(dragEl, 'dragend', this);// 拖动元素
            on(rootEl, 'dragstart', this._onDragStart); // 开始拖动

            // function dragStart() {

            //     dragEl.draggable = true // draggable = true

            //     on(dragEl, 'dragend', this);// 被拖拽元素 dragend事件
            //     on(rootEl, 'dragstart', this._onDragStart);
                
            //     // Chosen item
            //     // _toggleClass(dragEl, options.chosenClass, true);

            //     // Drag start event
            //     // _dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, rootEl, oldIndex);
            // }
        }
    },
    _onDragStart: function (e, useFallback) { // 开始 drag
            var _this = this;
			// var dataTransfer = evt.dataTransfer;
			// var options = _this.options;

			// _this._offUpEvents();

			// if (activeGroup.checkPull(_this, _this, dragEl, evt)) {
			// 	cloneEl = _clone(dragEl);

			// 	cloneEl.draggable = false;
			// 	cloneEl.style['will-change'] = '';

			// 	_css(cloneEl, 'display', 'none');
			// 	_toggleClass(cloneEl, _this.options.chosenClass, false);

			// 	// #1143: IFrame support workaround
			// 	_this._cloneId = _nextTick(function () {
			// 		rootEl.insertBefore(cloneEl, dragEl);
			// 		_dispatchEvent(_this, rootEl, 'clone', dragEl);
			// 	});
			// }

			// _toggleClass(dragEl, options.dragClass, true);

			// if (useFallback) {
			// 	if (useFallback === 'touch') {
			// 		// Bind touch events
			// 		_on(document, 'touchmove', _this._onTouchMove);
			// 		_on(document, 'touchend', _this._onDrop);
			// 		_on(document, 'touchcancel', _this._onDrop);

			// 		if (options.supportPointer) {
			// 			_on(document, 'pointermove', _this._onTouchMove);
			// 			_on(document, 'pointerup', _this._onDrop);
			// 		}
			// 	} else {
			// 		// Old brwoser
			// 		_on(document, 'mousemove', _this._onTouchMove);
			// 		_on(document, 'mouseup', _this._onDrop);
			// 	}

			// 	_this._loopId = setInterval(_this._emulateDragOver, 50);
			// }
			// else {
			// 	if (dataTransfer) {
			// 		dataTransfer.effectAllowed = 'move';
			// 		options.setData && options.setData.call(_this, dataTransfer, dragEl);
			// 	}

			// 	_on(document, 'drop', _this);

			// 	// #1143: Бывает элемент с IFrame внутри блокирует `drop`,
			// 	// поэтому если вызвался `mouseover`, значит надо отменять весь d'n'd.
			// 	// Breaking Chrome 62+
			// 	// _on(document, 'mouseover', _this);

			// 	_this._dragStartId = _nextTick(_this._dragStarted);
			// }
    },
    _closest(el,ctx) { // 获取绑定元素子元素 
        if(el) {
            ctx = ctx || document  
            do {
                if ( el.parentNode === ctx) {
                   
                    return el
                }
            } while (el = el.parentNode)
        }
        return null
    },
    
}

export const drag = Dragable.create = function(el, options) {
    return new Dragable(el, options)
}