(function() {
    var ns = Root.TranslateGame.WaitingForPlayers;
    var Toast = Root.Widget.Toast;
    ns.View = function(ctrl) {

        Frame.TemplateView.call(this, 'Root/TranslateGame/WaitingForPlayers/template.html', ctrl);
        this.applyTemplate();
    };
    ns.View.extend(Frame.TemplateView);
    ns.View.prototype.onload = function() {
        var ctrl = this._ctrl;
        this.eles.btnQuit.onclick = function() {
            ctrl.requestQuit();
        };
    };
    ns.View.prototype.update = function(state) {
        if(this.isTemplateLoading) return;
        this.eles.btnQuit.classList.remove('disabled');
        switch(state) {
        case ns.state.MATCHING:
            break;
        case ns.state.QUITING:
            this.eles.btnQuit.classList.add('disabled');
            break;
        case ns.state.ERROR:
            frame.root.toast("An error occurred", Toast.type.ERROR);
            break;
        }
    }

})();
