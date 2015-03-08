(function() {
    var ns = Root.HelloWorld.HelloChild;
    ns.View = function(ctrl) {
        Frame.View.call(this, ctrl);

        var dom = this.createElement();
        this.dom = dom;
        {
            dom.innerHTML = "this is a child";
        }

    };
    Util.inherit(ns.View, Frame.View);
    ns.View.prototype.update = function(state) {

    }
})();
