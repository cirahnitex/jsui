(function() {
    /**
     * a class that is capable of bind and trigger events
     * @constructor Util.Evtable
     */
    Util.Evtable = function() {
        this._events = {};
    };
    Util.Evtable.prototype.trigger = function(evtName, dataObj) {
        if(!this._events) this._events = {};
        var callbacks = this._events[evtName];
        if(callbacks) {
            for(var i = 0; i < callbacks.length; i++) {
                callbacks[i].call(this, dataObj, dataObj);
            }
        }

        var callback = this['on'+evtName];
        if(callback instanceof Function) {
            callback.call(this, dataObj, dataObj);
        }
    };
    Util.Evtable.trigger = function(Obj, evtName, dataObj) {
        Util.Evtable.prototype.trigger.call(Obj, evtName, dataObj);
    };
    Util.Evtable.prototype.bind = function(evtName, handler) {
        if(!this._events) this._events = {};
        var events = this._events,
            callbacks = events[evtName] = events[evtName] || [];
        callbacks.push(handler);
    };
    Util.Evtable.bind = function(Obj, evtName, handler) {
        Util.Evtable.prototype.bind.call(Obj, evtName, handler);
    };
    Util.Evtable.prototype.bypass = function(evtable, evtName) {
        var that = this;
        evtable.bind(evtName, function(e, d) {
            that.trigger(evtName, d);
        })
    };
    /**
     * unbind a callback from an event
     * @param {string} evtName  the event to unbind
     * @param {function} [handler] the callback to unbind. if omitted, all callbacks will unbind
     */
    Util.Evtable.prototype.unbind = function(evtName, handler) {
        if(!this._events) this._events = {};
        if(typeof(handler) === 'undefined') {
            delete this._events[evtName];
            return;
        }
        var callbacks = this._events[evtName];
        if(callbacks instanceof Array) {
            var index = callbacks.indexOf(handler);
            if(index >= 0) {
                callbacks.splice(index, 1);
            }
        }
    };
    Util.Evtable.unbind = function(Obj, evtName, handler) {
        Util.Evtable.prototype.unbind.call(Obj, evtName, handler);
    };

})();
