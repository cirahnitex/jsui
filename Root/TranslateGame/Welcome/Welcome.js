(function() {
    var ns = Root.TranslateGame;
    ns.Welcome = function() {
        Frame.Routable.call(this);
        this.routeKey = 'Welcome';
        this.login = new ns.Welcome.Login();

        // handle events
        this.login.bind(ns.Welcome.Login.event.SUCCESS, function() {

            location.hash = '#TranslateGame/TitleScreen';
        });

    };
    ns.Welcome.extend(Frame.Routable);

})();
