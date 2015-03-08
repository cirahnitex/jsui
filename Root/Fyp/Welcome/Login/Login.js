(function() {
    var ns = Root.Fyp.Welcome;
    var Api = Root.Fyp.Api;
    ns.Login = function() {
        Frame.Routable.call(this);
        this.routeKey = 'Login';

        this.profileImg = '';

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

    ns.Login.prototype.setProfileImg = function(dataUrl) {
        this.profileImg = dataUrl;
        this.notifyObservers(ns.Login.state.NORMAL);
    };
    ns.Login.prototype.login = function(username, password) {
        this.notifyObservers(ns.Login.state.LOGGING_IN);
        var that = this;
        Api.request('/auth/login.php',{username:username,password:password},function(value, code) {
            if(code === 200) {
                that.setChanged(ns.Login.state.SUCCEED);
                that.notifyObservers();
                that.trigger(ns.Login.event.SUCCESS);
            }
            else {
                that.notifyObservers(ns.Login.state.FAILED);
            }
        }, function() {
            that.notifyObservers(ns.Login.state.FAILED);
        });

    };
    ns.Login.prototype.close = function() {
        this.trigger(ns.Login.event.CLOSE);
    };

})();
