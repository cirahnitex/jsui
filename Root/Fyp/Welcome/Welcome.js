(function() {
    var ns = Root.Fyp;
    ns.Welcome = function() {
        Frame.Routable.call(this);
        this.routeKey = 'Welcome';
        this.login = new ns.Welcome.Login();

        // handle events
        this.login.bind(ns.Welcome.Login.event.SUCCESS, function() {
            location.hash = '#Fyp/Main';
        });

    };
    ns.Welcome.extend(Frame.Routable);

})();
