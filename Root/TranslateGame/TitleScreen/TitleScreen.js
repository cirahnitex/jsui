(function() {
    var ns = Root.TranslateGame;
    var Api = ns.Api;
    ns.TitleScreen = function() {
        Frame.Routable.call(this);
        this.routeKey = "TitleScreen";
        this.bindRoute('WaitingForPlayers',function() {
            return new ns.WaitingForPlayers();
        });
        this.info = new Root.TranslateGame.Info();
        this.info.requestRefresh();
    };
    ns.TitleScreen.extend(Frame.Routable);
    ns.TitleScreen.prototype.requestLogout = function() {
        Api.request("/auth/logout",function() {
            location.hash = "#TranslateGame/Welcome";
        });
    }

})();
