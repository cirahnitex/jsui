(function() {
    var ns = Root.TranslateGame.Api;
    var Api = ns;
    ns.Notification = function() {
        Util.Evtable.call(this);
        var event = ns.Notification.event;
        this.bind(event.GAME_START,function() {
            location.hash = "#TranslateGame/GameMain";
        });
        this.bind(event.GAME_QUIT, function() {
            location.hash = "#TranslateGame/TitleScreen";
        });
        this.bind(event.GAME_PROGRESSED, function() {
            var gameMain = Frame.Routable.getInstance(Root.TranslateGame.GameMain);
            if(gameMain) gameMain.requestRefresh();
        });
        this.isNotificationSent = false;
        this.loopTimeoutId = 0;
        this.isActive = false;
    };
    ns.Notification.extend(Util.Evtable);
    ns.Notification.event = {
        GAME_START:"GAME_START",
        GAME_QUIT:"GAME_QUIT",
        GAME_PROGRESSED:"GAME_PROGRESSED"
    };
    ns.Notification.REQUEST_INTERVAL = "2000";
    ns.Notification.instance = null;
    ns.Notification.getInstance = function() {
        if(!ns.Notification.instance) {
            ns.Notification.instance = new ns.Notification();
        }
        return ns.Notification.instance;
    };
    ns.Notification.prototype.start = function() {
        if(this.isActive) return;
        this.isActive = true;
        this.isNotificationSent = false;
        var that = this;
        var nextLoop = function(interval) {
            that.loopTimeoutId = setTimeout(function() {
                looper();
            },interval);
        };
        var looper = function() {
            if(!that.isActive) return;
            if(that.isNotificationSent) return;
            that.isNotificationSent = true;
            Api.request("/notification/next",{},function(value, rtnCode) {
                that.isNotificationSent = false;
                for(var i=0;i<value.length;i++) {
                    var msg = value[i];
                    that.trigger(msg);
                }
                nextLoop(ns.Notification.REQUEST_INTERVAL);
            });
        };
        nextLoop();
    };
    ns.Notification.prototype.stop = function() {
        this.isActive = false;
        clearTimeout(this.loopTimeoutId);
    };
})();
