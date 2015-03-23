(function() {
    var ns = Root.Widget.Inputable;
    /**
     *
     * @constructor Root.Widget.Inputable.Array
     * @arguments Root.Widget.Inputable
     */
    ns.Array = function() {
        ns.call(this);
        /**
         *
         * @type {Root.Widget.Inputable[]}
         * @private
         */
        this._aInput = [];
        this.notifyObservers(ns.Array.state.REFRESHED);
    };
    ns.Array.extend(ns);
    ns.Array.state = {
        /**
         * @event the array of input has changed.
         */
        REFRESHED: Util.uniqueInt(),
    };
    ns.Array.event = {
        PUSH_REQUIRE: Util.uniqueInt(),
    };
    ns.Array.prototype.getValue = function(i) {
        return this._aInput[i].getValue(i);
    };
    /**
     *
     * @param {int} i
     * @returns {Root.Widget.Inputable}
     */
    ns.Array.prototype.getInput = function(i) {
        return this._aInput[i];
    };
    /**
     *
     * @returns {Root.Widget.Inputable[]}
     */
    ns.Array.prototype.listInput = function() {
        return this._aInput;
    };
    /**
     *
     * @param {int} i
     * @param {Root.Widget.Inputable} input
     */
    ns.Array.prototype.setInput = function(i, input) {
        if(this._aInput[i] === input) return;
        this._aInput[i] = input;
        this.notifyObservers(ns.Array.state.REFRESHED);
    };
    /**
     *
     * @param {Root.Widget.Inputable} input
     */
    ns.Array.prototype.pushInput = function(input) {
        this._aInput.push(input);
        this.notifyObservers(ns.Array.state.REFRESHED);
    };
    /**
     * trigger a PUSH_REQUIRE event
     */
    ns.Array.prototype.pushRequire = function() {
        this.trigger(ns.event.PUSH_REQUIRE);
    };


})();
