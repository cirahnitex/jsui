(function() {
    var ns = Root.Fyp;
    ns.LearnMore = function() {
        Frame.Routable.call(this);
        this.routeKey = 'LearnMore';

    };
    ns.LearnMore.extend(Frame.Routable);
    ns.LearnMore.state = {
        NORMAL:Util.uniqueInt(),
    }
})();
