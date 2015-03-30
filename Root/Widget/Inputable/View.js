(function() {
    var ns = Root.Widget.Inputable;
    /**
     * a text input for controller Inputable
     * @param {Root.Widget.Inputable} ctrl
     * @constructor Root.Widget.Inputable.View
     * @arguments Frame.View
     */
    ns.View = function(ctrl) {
        Frame.View.call(this, ctrl);
        this.dom = this.createElement('input[type=text]');
        this.dom.addEventListener('change', function() {
            ctrl.setValue(this.value);
        });
    };
    ns.View.extend(Frame.View);
    ns.View.prototype.update = function(state) {
        switch(state) {
        case ns.state.CHANGED:
            if(this.dom.value === this._ctrl.getValue()) return;
            this.dom.value = this._ctrl.getValue();
            break;
        }
    }
})();
