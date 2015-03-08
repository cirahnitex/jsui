(function() {
    var ns = Root;
    ns.Comp4021 = function() {
        Frame.Routable.call(this);
        this.routeKey = 'Comp4021';


        this.bindRoute('Main', function() {
            return new ns.Comp4021.Main();
        });
        this.bindRoute(/.*/, function() {
            return new ns.Comp4021.Welcome();
        });
    };
    ns.Comp4021.extend(Frame.Routable);
})();
