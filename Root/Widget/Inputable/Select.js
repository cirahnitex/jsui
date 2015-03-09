(function() {
    var ns = Root.Widget.Inputable;
    ns.Select = function() {
        Root.Widget.Inputable.call(this);
        /**
         *
         * @type Root.Widget.Inputable.Select.Option[]
         * @private
         */
        this._aOption = [];
        this.notifyObservers(ns.Select.state.BLURRED);
    };
    ns.Select.extend(Root.Widget.Inputable);
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
