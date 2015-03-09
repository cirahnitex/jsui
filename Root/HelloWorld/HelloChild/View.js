(function() {
    var ns = Root.HelloWorld.HelloChild;
    ns.View = function(ctrl) {
        Frame.View.call(this, ctrl);

        var dom = this.createElement();
        this.dom = dom;
        {
            var Select = Root.Widget.Inputable.Select;
            var select = new Select();
            select.addOption("Hong Kong");
            select.addOption("China");
            select.addOption("Mainland China");
            select.addOption("Taiwan");
            var view = select.getDefaultView();
            dom.appendChild(view.dom);
        }

    };
    Util.inherit(ns.View, Frame.View);
    ns.View.prototype.update = function(state) {

    }
})();
