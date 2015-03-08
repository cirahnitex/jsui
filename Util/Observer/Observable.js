(function() {
    var ns = Util;
    /**
     * a java Observable implementation
     * @constructor Util.Observable
     * @arguments Util.Evtable
     */
    ns.Observable = function() {
        Util.Evtable.call(this);
        this._aObserver = [];
        this._observableIsChanged = false;
        this._observableState = null;
        this._defaultView = null;
    };
    ns.Observable.extend(Util.Evtable);
    /**
     * notify all observers to update
     * @param {Object} [state] if provided, setChanged will be called before notifying observers
     */
    ns.Observable.prototype.notifyObservers = function(state) {
        if(typeof(state) !== 'undefined') this.setChanged(state);
        if(!this._observableIsChanged) return;
        for(var i=0; i<this._aObserver.length; i++) {
            var iObserver = this._aObserver[i];
            this.notifyOneObserver(iObserver);
        }
        this._observableIsChanged = false;
    };
    /**
     * force notifying one observer anyway.
     * @param {Util.Observer} observer
     */
    ns.Observable.prototype.notifyOneObserver = function(observer) {
        observer.update(this._observableState);
    };
    /**
     *
     * @param {Util.Observer} observer
     */
    ns.Observable.prototype.addObserver = function(observer) {
        this._aObserver.push(observer);
        this.notifyOneObserver(observer);
    };
    ns.Observable.prototype.deleteObserver = function(observer) {
        var i = this._aObserver.indexOf(observer);
        if(i<0) return;
        this._aObserver.splice(i,1);
    };
    ns.Observable.prototype.countObservers = function() {
        return this._aObserver.length;
    };
    ns.Observable.prototype.deleteObservers = function() {
        this._aObserver = [];
    };
    /**
     * mark this observable as changed.
     * @param {Object} [state] change the observer state
     */
    ns.Observable.prototype.setChanged = function(state) {
        this._observableIsChanged = true;
        if(typeof(state)!=='undefined') this._observableState = state;
    };
    ns.Observable.prototype.clearChanged = function() {
        this._observableIsChanged = false;
    };
    ns.Observable.prototype.getObservableState = function() {
        return this._observableState;
    };
    /**
     * get an default view. will not create a new view when called again.
     * @returns {null|Frame.View}
     */
    ns.Observable.prototype.getDefaultView = function() {
        if(this._defaultView) return this._defaultView;
        this._defaultView = Frame.createDefaultView(this);
        return this._defaultView;
    };
})();
