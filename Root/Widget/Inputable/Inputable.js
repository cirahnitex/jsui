(function() {
    var ns = Root.Widget;
    /**
     * a widget that is capable of holding a value
     * @constructor Root.Widget.Inputable
     * @arguments Root.Widget.Observable
     */
    ns.Inputable = function() {
        Util.Observable.call(this);
        this._value = null;
    };
    ns.Inputable.extend(Util.Observable);
    ns.Inputable.prototype.getValue = function() {
        return this._value;
    };
    /**
     * set the value
     * @param {*} val
     */
    ns.Inputable.prototype.setValue = function(val) {
        this._value = val;
    }
})();
