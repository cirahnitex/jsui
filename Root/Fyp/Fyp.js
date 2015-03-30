(function() {
    var ns = Root;
    ns.Fyp = function() {
        Frame.Routable.call(this);
        this.routeKey = "Fyp";

        this.bindRoute('Main', function() {
            return new ns.Fyp.Main();
        });
        this.bindRoute('MediaPlayer', function() {
           return new ns.Fyp.MediaPlayer();
        });
        this.bindRoute('LearnMore', function() {
            return new ns.Fyp.LearnMore();
        });
        this.bindRoute('TagEditor', function() {
            return new ns.Fyp.TagEditor(1);
        });
        this.bindRoute(/.*/, function() {
            return new ns.Fyp.Welcome();
        })
    };
    ns.Fyp.extend(Frame.Routable);
})();
