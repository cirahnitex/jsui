(function() {
    var ns = Root.Widget.Inputable.Array;
    /**
     *
     * @param {Root.Widget.Inputable.Array} ctrl
     * @constructor Root.Widget.Inputable.Array.View
     * @arguments Frame.TemplateView
     */
    ns.View = function(ctrl) {
        Frame.TemplateView.call(this, "Root/Widget/Inputable/Array/template.html", ctrl);
        this.applyTemplate();
    };
    ns.View.extend(Frame.TemplateView);
    ns.View.prototype.onload = function() {
        this._displayRefresh();
    };
    ns.View.prototype.update = function(state) {
        if(this.isTemplateLoading) return;
        switch(state) {
        case ns.state.REFRESHED:
            this._displayRefresh();
        }
    };
    /**
     * display all the Inputables in controller
     * @private
     */
    ns.View.prototype._displayRefresh = function() {
        var listWrap = this.eles.listWrap;

        // clear dom
        listWrap.innerHTML = '';

        // list all Inputable
        var aInput = this._ctrl.listInput();

        // for each inputable
        for(var i=0; i<aInput.length; i++) {
            var input = aInput[i];

            // get its view
            var view = input.getDefaultView();

            // append the view into dom
            this._appendInputableView(view);

        }
    };
    /**
     * append a view of an Inputable into dom
     * @param {Frame.View} view
     * @private
     */
    ns.View.prototype._appendInputableView = function(view) {
        var itemWrap = this.createWidget(this.eles.listWrap, "itemWrap");
        itemWrap.appendChild(view.dom);
    }
})();
