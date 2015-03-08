(function() {
    var ns = Root.Fyp.Welcome;
    ns.View = function(ctrl) {
        Frame.TemplateView.call(this, 'Root/Fyp/Welcome/template.html', ctrl);
        this.applyTemplate();
    };
    ns.View.extend(Frame.TemplateView);
    ns.View.prototype.onload = function() {
        var loginView = Frame.createDefaultView(this._ctrl.login);
        this.eles.loginWrap.appendChild(loginView.dom);
    }

})();
