(function() {
    var ns = Root.TranslateGame;
    var Api = Root.TranslateGame.Api;
    ns.Info = function() {
        Frame.Routable.call(this);
        this.username = "";
        this.score = 0;
        this.activeGame = {
            role:0,
            state:0
        };

        this.notifyObservers(ns.Info.INIT);
    };
    ns.Info.extend(Frame.Routable);
    ns.Info.state = {
        INIT:Util.uniqueInt(),
        REFRESHED:Util.uniqueInt(),
    };
    ns.Info.prototype.requestRefresh = function() {
        var that = this;
        Api.request("/info/get",{},function(value) {
            that._readServerJson(value);
        });
    };
    ns.Info.prototype._readServerJson = function(json) {
        this.username = json.userId;
        this.score = json.score;
        this.activeGame = json.activeGame;
        this.notifyObservers(ns.Info.state.REFRESHED);
    }

})();
