(function() {
    var ns = Root.TranslateGame;
    var Api = Root.TranslateGame.Api;
    /**
     *
     * @constructor Root.TranslateGame
     * @arguments Frame.Routable
     */
    ns.WaitingForPlayers = function() {
        Frame.Routable.call(this);
        this.routeKey = 'WaitingForPlayers';
        this._requestJoin();
    };
    ns.WaitingForPlayers.extend(Frame.Routable);
    ns.WaitingForPlayers.state = {
        MATCHING:Util.uniqueInt(),
        QUITING:Util.uniqueInt(),
        ERROR:Util.uniqueInt(),
    };
    ns.WaitingForPlayers.event = {
        QUIT:Util.uniqueInt(),
    };
    ns.WaitingForPlayers.prototype._requestJoin = function() {
        this.notifyObservers(ns.WaitingForPlayers.state.MATCHING);
        Api.request("/waiting/matchGame",{action:"join"},function(r) {
            // nothing to do.
        });
    };
    ns.WaitingForPlayers.prototype.requestQuit = function() {
        this.notifyObservers(ns.WaitingForPlayers.state.QUITING);
        var that = this;
        Api.request("/waiting/matchGame",{action:"quit"},function(r) {
            that.trigger(ns.WaitingForPlayers.event.QUIT);
            location.hash = "TranslateGame/TitleScreen";
        });
    }
})();
