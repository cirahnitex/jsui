(function() {
    var ns = Root.Comp4021.Welcome;
    ns.Login = function() {
        Frame.Routable.call(this);
        this.routeKey = 'Login';

        this.username = '';
        this.profileImg = ns.Login.defaultProfileImg;

        this.setChanged(ns.Login.state.NORMAL);

    };
    ns.Login.extend(Frame.Routable);
    ns.Login.event = {
        SUCCESS: Util.uniqueInt(),
        CLOSE: Util.uniqueInt()
    };
    ns.Login.state = {
        NORMAL: Util.uniqueInt(),
        LOGGING_IN:Util.uniqueInt(),
        SUCCEED: Util.uniqueInt(),
        FAILED: Util.uniqueInt()
    };
    ns.Login.prototype.setUsername = function(username) {
        this.username = username;
        this.setChanged(ns.Login.state.NORMAL);
        this.notifyObservers();
    };
    ns.Login.prototype.setProfileImg = function(dataUrl) {
        this.profileImg = dataUrl;
        this.notifyObservers(ns.Login.state.NORMAL);
    };
    ns.Login.prototype.login = function() {
        this.notifyObservers(ns.Login.state.LOGGING_IN);
        var that = this;
        Util.ajaxPost('login.php',{username:this.username,profileImg:this.profileImg},function(r) {
            that.setChanged(ns.Login.state.SUCCEED);
            that.notifyObservers();
            that.trigger(ns.Login.event.SUCCESS);
        });

    };
    ns.Login.prototype.close = function() {
        this.trigger(ns.Login.event.CLOSE);
    };

})();
