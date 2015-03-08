(function() {
    var ns = Root.TranslateGame.TitleScreen;
    var WaitingForPlayers = Root.TranslateGame.WaitingForPlayers;
    ns.View = function(ctrl) {
        Frame.TemplateView.call(this, "Root/TranslateGame/TitleScreen/template.html", ctrl);
        this.applyTemplate();
    };
    ns.View.extend(Frame.TemplateView);
    ns.View.prototype.onload = function() {
        var infoView = Frame.createDefaultView(this._ctrl.info);
        this.eles.infoWrap.appendChild(infoView.dom);

        var ctrl = this._ctrl;
        this.eles.btnLogout.onclick = function() {
            ctrl.requestLogout();
        }
    };
    ns.View.prototype.update = function(state) {
        if(this.isTemplateLoading) return;
        switch(state) {
        case Frame.Routable.state.ROUTE_CHANGED:
            if(this._ctrl.getRouteChild()) {
                var view = Frame.createDefaultView(this._ctrl.getRouteChild());
                this.eles.childWrap.appendChild(view.dom);
                this.eles.controls.classList.add('hide');
            }
            else {
                this.eles.childWrap.innerHTML = '';
                this.eles.controls.classList.remove('hide');
            }
        }
    }
})();
