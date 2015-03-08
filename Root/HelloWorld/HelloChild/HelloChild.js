(function() {
    var ns = Root.HelloWorld;
    ns.HelloChild = function() {
        Frame.Routable.call(this);
        this.routeKey = "HelloChild";
    };
    ns.HelloChild.extend(Frame.Routable);
})();
