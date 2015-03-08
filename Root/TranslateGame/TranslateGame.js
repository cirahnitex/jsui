(function() {
    var ns = Root;
    /**
     *
     * @constructor Root.TranslateGame
     * @arguments Frame.Routable
     */
    ns.TranslateGame = function() {
        Frame.Routable.call(this);
        this.routeKey = 'TranslateGame';
        this.bindRoute('WaitingForPlayers', function() {
            return new ns.TranslateGame.WaitingForPlayers();
        });
        this.bindRoute('Welcome', function() {
            return new ns.TranslateGame.Welcome();
        });
        this.bindRoute('GameMain', function() {
            return new ns.TranslateGame.GameMain();
        });
        this.bindRoute("Info",function() {
            return new ns.TranslateGame.Info();
        });
        this.bindRoute("ArchiveExplorer",function() {
            return new ns.TranslateGame.ArchiveExplorer();
        });
        this.bindRoute(/.*/, function() {
            return new ns.TranslateGame.TitleScreen();
        });
    };
    ns.TranslateGame.extend(Frame.Routable);
})();
