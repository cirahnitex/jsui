(function() {
    var ns = Root.TranslateGame.Welcome;
    var Api = Root.TranslateGame.Api;
    var Toast = Root.Widget.Toast;
    ns.Login = function() {
        Frame.Routable.call(this);
        this.routeKey = 'Login';

        this.username = '';
        this.profileImg = ns.Login.defaultProfileImg;
        this.errorMsg = '';
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

        Api.request("/auth/login",{userId:this.username},function(value, rtnCode) {
            switch(rtnCode) {
            case 200:
                that.notifyObservers(ns.Login.state.SUCCEED);
                that.trigger(ns.Login.event.SUCCESS);
                break;
            case 201:
                that.errorMsg = "user already exists";
                that.notifyObservers(ns.Login.state.FAILED);
                break;
            default:
                that.errorMsg = "login failed";
                that.notifyObservers(ns.Login.state.FAILED);
                break;
            }

        });

    };
    ns.Login.prototype.close = function() {
        this.trigger(ns.Login.event.CLOSE);
    };

})();
