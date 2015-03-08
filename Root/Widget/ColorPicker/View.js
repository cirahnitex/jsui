(function() {
    var ns = Root.Widget.ColorPicker;
    /**
     *
     * @param {Root.Widget.ColorPicker} ctrl
     * @constructor Root.Widget.ColorPicker.View
     * @arguments Frame.View
     */
    ns.View = function(ctrl) {
        Frame.View.call(this, ctrl);
        this._btn = null;
        this._colorInput = null;
        this.dom = this.createElement('label.ColorPicker.relative');
        {
            this._btn = this.createElement(this.dom, 'span.btn.btn-default', this._ctrl.text);
            this._colorInput = this.createElement(this.dom, 'input[type=color].colorInput', this._ctrl.color);

        }
        this._colorInput.addEventListener('change', function() {
            ctrl.setColor(this.value);
        });
        this._btn.addEventListener('mouseover', function() {
            this.style.color = '';
        });
        this._btn.addEventListener('mouseout', function() {
            this.style.color = ctrl.color;
        });
        
    };
    ns.View.extend(Frame.View);
    ns.View.css = {
        '.colorInput': {
            position:'absolute',
            visibility:'hidden'
        }
    };
    ns.View.prototype.update = function(state) {
        switch(state) {
        case ns.state.NORMAL:
            this._btn.style.color = this._ctrl.color;
            this._colorInput.value = this._ctrl.color;
            break;
        }
    }
})();
