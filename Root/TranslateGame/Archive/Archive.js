(function() {
    var ns = Root.TranslateGame;
    ns.Archive = function() {
        Util.Observable.call(this);
        this.question = "";
        this.translationM = '';
        this.translationH = '';
        this.responseM = '';
        this.responseH = '';
        this.decision = null;
        this.challenger = '';
        this.translator = '';
        this.responderM = '';
        this.responderH = '';
    };
    ns.Archive.extend(Util.Observable);
    ns.Archive.fromServerJson = function(json) {
        var rtn = new ns.Archive();
        rtn.question = json.question;
        rtn.translationM = json.translationM;
        rtn.translationH = json.translationH;
        rtn.responseM = json.responseM;
        rtn.responseH = json.responseH;
        rtn.decision = json.decision;
        rtn.challenger = json.challenger;
        rtn.translator = json.translator;
        rtn.responderM = json.responderM;
        rtn.responderH = json.responderH;
        return rtn;
    }
})();
