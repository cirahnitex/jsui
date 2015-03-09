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
        this.dom.addEventListener('change', function(e) {
            ctrl.setValue(this.value);
        });
    };
    ns.View.extend(Frame.View);

})();
