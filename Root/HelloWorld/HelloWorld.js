(function() {
    var ns = Root;
    ns.HelloWorld = function() {
        Frame.Routable.call(this);

        this.bindRoute(/.*/,function() {
            return new ns.HelloWorld.HelloChild();
        });
    };
    ns.HelloWorld.extend(Frame.Routable);
})();
