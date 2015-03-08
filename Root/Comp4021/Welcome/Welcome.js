(function() {
    var ns = Root.Comp4021;
    ns.Welcome = function() {
        Frame.Routable.call(this);
        this.routeKey = 'Welcome';
        this.login = new ns.Welcome.Login();

        // handle events
        this.login.bind(ns.Welcome.Login.event.SUCCESS, function() {
            location.hash = '#Comp4021/Main';
        });

        this._initLoad();
    };
    ns.Welcome.extend(Frame.Routable);
    ns.Welcome.prototype._initLoad = function() {
        Util.ajaxPost('logout.php',{},function(){});
    }
})();
