(function() {
    var ns = Root.Widget;
    /**
     * a controller to
     * pick a color
     * @param {String} [defaultColor='#FFFFFF']
     * @param {String} [text='color']
     * @constructor Root.Widget.ColorPicker
     * @arguments Util.Observable
     */
    ns.ColorPicker = function(defaultColor, text) {
        Util.Observable.call(this);
        this.color = defaultColor || '#FFFFFF';
        this.text = text || 'color';
        this.setChanged(ns.ColorPicker.state.NORMAL);

    };
    ns.ColorPicker.extend(Util.Observable);
    ns.ColorPicker.event = {
        CHANGE:Util.uniqueInt(),
    };
    ns.ColorPicker.state = {
        NORMAL: Util.uniqueInt(),
    };
    ns.ColorPicker.prototype.setColor = function(color) {
        if(this.color === color) return;
        this.color = color;
        this.setChanged(ns.ColorPicker.state.NORMAL);
        this.notifyObservers();
        this.trigger(ns.ColorPicker.event.CHANGE);
    };
})();
