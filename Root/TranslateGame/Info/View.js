(function() {
    var ns = Root.TranslateGame.Info;

    ns.View = function(ctrl) {
        Frame.TemplateView.call(this,"Root/TranslateGame/Info/template.html",ctrl);
        this.applyTemplate();
    };
    ns.View.extend(Frame.TemplateView);
    ns.View.prototype.update = function(state) {
        var ctrl = this._ctrl;
        if(this.isTemplateLoading) return;
        this.dom.classList.remove('hide');
        switch(state) {
        case ns.state.INIT:
            this.dom.classList.add('hide');
            break;
        case ns.state.REFRESHED:
            this.eles.username.html(ctrl.username);
            this.eles.score.html(ctrl.score);
            if(ctrl.activeGame) {
                this.eles.gamePlayWrap.classList.remove('hide');
                this.eles.role.html(ns.View.getRoleAsString(ctrl.activeGame.role));
            }
            else {
                this.eles.gamePlayWrap.classList.add('hide');
            }
        }
    };
    ns.View.getRoleAsString = function(role) {
        var GameMain = Root.TranslateGame.GameMain;
        switch(role) {
        case GameMain.role.CHALLENGER:
            return 'challenger';
        case GameMain.role.TRANSLATOR:
            return 'translator';
        case GameMain.role.RESPONDER_M:
        case GameMain.role.RESPONDER_H:
            return 'responder';
        default :
            return 'unknown';
        }
    };
})();
