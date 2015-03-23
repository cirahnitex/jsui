(function() {
    var ns = Root.Widget.Inputable;
    /**
     *
     * @param {int} [type = Root.Widget.Inputable.Select.type.LOOSE]
     * @constructor Root.Widget.Inputable.Select
     * @arguments Root.Widget.Inputable
     */
    ns.Select = function(type) {
        ns.call(this);
        /**
         *
         * @type Root.Widget.Inputable.Select.Option[]
         * @private
         */
        this._aOption = [];

        this._type = type || ns.Select.type.LOOSE;
        this.notifyObservers(ns.Select.state.BLURRED);
    };
    ns.Select.extend(ns);
    ns.Select.state = {
        FOCUSED:Util.uniqueInt(),
        BLURRED:Util.uniqueInt(),
    };
    ns.Select.type = {
        STRICT:Util.uniqueInt(),
        LOOSE:Util.uniqueInt(),
    };

    /**
     *
     * @param {string} value
     * @param {string} [display=null]
     */
    ns.Select.prototype.addOption = function(value, display) {
        var option = this.getOption(value);
        if(option) {
            option.setDisplay(display);
            return;
        }
        var option = new ns.Select.Option(value, display);
        this._aOption.push(option);
    };
    /**
     *
     * @param {string} value
     * @returns {Root.Widget.Inputable.Select.Option}
     */
    ns.Select.prototype.getOption = function(value) {
        for(var i=0; i<this._aOption.length; i++) {
            var option = this._aOption[i];
            if(option.value === value) {
                return option;
            }
        }
        return null;
    };
    /**
     *
     * @param {string} query
     * @returns Root.Widget.Inputable.Select.Option[];
     */
    ns.Select.prototype.searchOption = function(query) {
        if(!query) return this._aOption;
        query = query.toLowerCase();
        var rtn = [];
        for(var i=0; i<this._aOption.length; i++) {
            var option = this._aOption[i];
            if(option.getDisplay().toLowerCase().indexOf(query) >= 0) {
                rtn.push(option);
            }
        }
        return rtn;
    };
    ns.Select.prototype.listOption = function() {
        return this._aOption;
    };
    ns.Select.prototype.focus = function() {
        this.notifyObservers(ns.Select.state.FOCUSED);
    };
    ns.Select.prototype.blur = function() {
        this.notifyObservers(ns.Select.state.BLURRED);
    };
    ns.Select.prototype.getType = function() {
        return this._type;
    };
    /**
     * if type is strict, check whether the value is valid before setting
     * @param {*} value
     */
    ns.Select.prototype.setValue = function(value) {
        if(this.getType() === ns.Select.type.LOOSE || this.getOption(value)) {
            ns.prototype.setValue.call(this, value);
        }
    };

})();
(function() {
    var ns = Root.Widget.Inputable.Select;
    /**
     *
     * @param {string} value
     * @param {string} [display]
     * @constructor Root.Widget.Inputable.Select.Option
     */
    ns.Option = function(value, display) {
        this.value = value;
        if(typeof(display) === 'undefined') display = null;
        this._display = display;

    };
    /**
     * get a string to display. if not set, returns the value
     * @returns {string}
     */
    ns.Option.prototype.getDisplay = function() {
        if(this._display != null) {
            return this._display;
        }
        else {
            return this.value;
        }
    };
    ns.Option.prototype.setDisplay = function(display) {
        this._display = display;
    };

})();
