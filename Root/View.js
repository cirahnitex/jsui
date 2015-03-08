(function() {
    var ns = Root;

    ns.View = function(ctrl) {
        Frame.View.call(this, ctrl);

        this.dom = this.createElement('.Root.fill-height');
        this._childWrap = null;
        {
            this._childWrap = this.createElement(this.dom, '.fill-height');

            var toastMaskView = Frame.createDefaultView(ctrl.toastMask);
            this.dom.appendChild(toastMaskView.dom);

        }
    };
    ns.View.extend(Frame.View);
    ns.View.prototype.onRouteChange = function(routeChild) {
        this._childWrap.innerHTML = '';

        var view = Frame.createDefaultView(this._ctrl.getRouteChild());
        this._childWrap.appendChild(view.dom);
    }

})();
