(function(){
    var ns = Root.Widget.Toast;
    ns.Mask = function() {
        Frame.Routable.call(this);
        this.routeKey = 'ToastMask';
        this.aToast = [];
        this.setChanged(ns.Mask.state.CHANGED);
    };
    ns.Mask.extend(Frame.Routable);
    ns.Mask.state = {
        CHANGED: Util.uniqueInt()
    };
    ns.Mask.prototype.showToast = function(toast) {

        // avoid adding same toast
        var index = this.aToast.indexOf(toast);
        if(index >= 0) return;

        // add dismiss listener
        var observer = new Util.Observer();
        var that = this;
        observer.update = function(state) {
            if(state === ns.state.DISMISSED) {
                that.removeToast(toast);
            }
        };
        toast.addObserver(observer);

        this.aToast.push(toast);

        // notify observers
        this.setChanged(ns.Mask.state.CHANGED);
        this.notifyObservers();
    };
    ns.Mask.prototype.removeToast = function(toast) {
        var index = this.aToast.indexOf(toast);
        if(index < 0) return;
        this.aToast.splice(index, 1);
        this.setChanged(ns.Mask.state.CHANGED);
        this.notifyObservers();

    };
})();
