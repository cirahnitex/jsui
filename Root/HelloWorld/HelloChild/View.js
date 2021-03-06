(function() {
    var ns = Root.HelloWorld.HelloChild;
    ns.View = function(ctrl) {
        Frame.View.call(this, ctrl);
        var ArrayInputable = Root.Widget.Inputable.Array;

        var dom = this.createElement();
        this.dom = dom;
        var that = this;
        {
            var arrInput = new ArrayInputable();
            for(var i=0; i<5; i++) {
                var inputable = this._createSelect();
                arrInput.pushInput(inputable);
            }
            var view = arrInput.getDefaultView(200);
            dom.appendChild(view.dom);
            arrInput.bind(ArrayInputable.event.PUSH_REQUIRE, function() {
                arrInput.pushInput(that._createSelect());
            });
        }

    };
    Util.inherit(ns.View, Frame.View);
    ns.View.prototype.update = function(state) {

    };
    ns.View.prototype._createSelect = function() {
        var Select = Root.Widget.Inputable.Select;
        var select = new Select();
        select.addOption("Hong Kong");
        select.addOption("China");
        select.addOption("Mainland China");
        select.addOption("Taiwan");
        return select;
    };
})();
