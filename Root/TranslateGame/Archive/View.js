(function() {
    var ns = Root.TranslateGame.Archive;
    ns.View = function(ctrl) {
        Frame.TemplateView.call(this,"Root/TranslateGame/Archive/template.html", ctrl);
        this.applyTemplate();
    };
    ns.View.extend(Frame.TemplateView);
    ns.View.prototype.onload = function() {
        var eles = this.eles;
        var ctrl = this._ctrl;
        eles.question.html(ctrl.question);
        eles.translationM.html(ctrl.translationM);
        eles.translationH.html(ctrl.translationH);
        eles.responseM.html(ctrl.responseM);
        eles.responseH.html(ctrl.responseH);
        eles.challenger.html(ctrl.challenger);
        eles.translator.html(ctrl.translator);
        eles.responderM.html(ctrl.responderM);
        eles.responderH.html(ctrl.responderH);
        var GameMain = Root.TranslateGame.GameMain;
        switch(ctrl.decision) {
        case GameMain.HUMAN:
            eles.humanBranch.classList.add('selected');
            break;
        case GameMain.MACHINE:
            eles.machineBranch.classList.add('selected');
        }
    };
})();
