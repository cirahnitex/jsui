(function() {
    var ns = Root.Widget;
    /**
     *
     * @param {string} msg
     * @param {Object} [type=Root.Widget.Toast.type.SUCCESS]
     * @param {Object} [duration=Root.Widget.Toast.duration.SHORT]
     * @constructor
     */
    ns.Toast = function(msg, type, duration) {
        Frame.Routable.call(this);
        this.routeKey = "Toast";
        this._delayTimeout = 0;
        this.msg = msg;
        this.type = Util.getEnumFromArgs(ns.Toast.type, arguments, 1) || ns.Toast.type.SUCCESS;
        var durationType = Util.getEnumFromArgs(ns.Toast.duration, arguments, 1) || ns.Toast.duration.SHORT;

        // get delay from duration type
        this.delay = 0;
        switch(durationType) {
        case ns.Toast.duration.LONG:
            this.delay = ns.Toast._LONG_DELAY;
            this._delayAndDismiss();
            break;
        case ns.Toast.duration.SHORT:
            this.delay = ns.Toast._SHORT_DELAY;
            this._delayAndDismiss();
            break;
        default:
            this.delay = ns.Toast._PERM_DELAY;
            break;
        }

        this.setChanged(ns.Toast.state.NORMAL);
    };
    ns.Toast.extend(Frame.Routable);
    ns.Toast.duration = {
        SHORT: Util.uniqueInt(),
        LONG: Util.uniqueInt(),
        PERM: Util.uniqueInt(),
    };
    ns.Toast._SHORT_DELAY = 2000;
    ns.Toast._LONG_DELAY = 3500;
    ns.Toast._PERM_DELAY = 60*60*1000; // a fake delay length, basically useless. PERM means permanent.
    ns.Toast.MAX_DISMISSING_DURATION = 1000;
    ns.Toast.type = {
        SUCCESS: Util.uniqueInt(),
        INFO: Util.uniqueInt(),
        WARNING: Util.uniqueInt(),
        ERROR: Util.uniqueInt()
    };
    ns.Toast.state = {
        NORMAL: Util.uniqueInt(),
        DISMISSING: Util.uniqueInt(),
        DISMISSED: Util.uniqueInt()
    };
    ns.Toast.prototype._delayAndDismiss = function() {
        clearTimeout(this._delayTimeout);
        var that = this;
        setTimeout(function() {
            that.beginDismiss();
        }, this.delay);

    };
    ns.Toast.prototype.beginDismiss = function() {
        clearTimeout(this._delayTimeout);
        this.setChanged(ns.Toast.state.DISMISSING);
        this.notifyObservers();
        var that = this;
        setTimeout(function() {
            that.dismiss();
        }, ns.Toast.MAX_DISMISSING_DURATION);
    };
    ns.Toast.prototype.dismiss = function() {
        if(this.getObservableState() == ns.Toast.state.DISMISSED) return;
        this.setChanged(ns.Toast.state.DISMISSED);
        this.notifyObservers();
    };

})();
