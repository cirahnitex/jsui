(function() {
    var ns = Root.TranslateGame;
    var Api = Root.TranslateGame.Api;
    var Info = Root.TranslateGame.Info;
    /**
     *
     * @constructor Root.TranslateGame.GameMain
     * @arguments Frame.Routable
     */
    ns.GameMain = function() {
        Frame.Routable.call(this);
        this.info = new Info();
        this.role = null;
        this.question = "";
        this.translation = "";
        this.response0 = "";
        this.response1 = "";
        this.timeLimit = 0;
        this.stateStartTime = 0;
        this.notifyObservers(ns.GameMain.LOADING);
        this.requestRefresh();
    };
    ns.GameMain.extend(Frame.Routable);
    ns.GameMain.state = {
        LOADING:Util.uniqueInt(),
        CHALLENGING:8,
        TRANSLATING:9,
        RESPONDING:10,
        DECIDING:11,
        FINISHED:12,
    };
    ns.GameMain.role = {
        CHALLENGER:2,
        TRANSLATOR:3,
        RESPONDER_H:4,
        RESPONDER_M:5,
    };
    ns.GameMain.HUMAN = 7;
    ns.GameMain.MACHINE = 6;
    ns.GameMain.event = {
        ACTION_ACCEPTED:Util.uniqueInt()
    };

    ns.GameMain.prototype.submitQuestion = function(value) {
        var that = this;
        Api.request("/game/act",{action:"SET_QUESTION",value:value},function() {
            that.trigger(ns.GameMain.event.ACTION_ACCEPTED);
        });
    };
    ns.GameMain.prototype.submitTranslation = function(value) {
        var that = this;
        Api.request("/game/act",{action:"SET_TRANSLATION",value:value},function() {
            that.trigger(ns.GameMain.event.ACTION_ACCEPTED);
        });
    };
    ns.GameMain.prototype.submitResponse = function(value) {
        var that = this;
        Api.request("/game/act",{action:"SET_RESPONSE",value:value},function() {
            that.trigger(ns.GameMain.event.ACTION_ACCEPTED);
        });
    };
    ns.GameMain.prototype.submitDecision = function(value) {
        var that = this;
        Api.request("/game/act",{action:"SET_DECISION",value:value},function() {
            that.trigger(ns.GameMain.event.ACTION_ACCEPTED);
        });
    };
    ns.GameMain.prototype.getRole = function() {
        if(this.info.activeGame) {
            return this.info.activeGame.role;
        }
        else {
            return null;
        }
    };
    ns.GameMain.prototype.requestRefresh = function() {

        this.info.requestRefresh();
        var that = this;
        Api.request("/game/sense", {
            question:"QUESTION", translation:"TRANSLATION", response0:"RESPONSE_0", response1:"RESPONSE_1", role:"ROLE", state:"STATE", timeLimit: "TIME_REMAINING"
        }, function(r) {
            that.question = r.question;
            that.translation = r.translation;
            that.response0 = r.response0;
            that.response1 = r.response1;
            that.role = parseInt(r.role);
            that.timeLimit = parseInt(r.timeLimit);
            that.stateStartTime = new Date().getTime();

            that.notifyObservers(parseInt(r.state));
        });
    };

    ns.GameMain.prototype.shouldParticipate = function() {
        switch(this.getObservableState()) {
        case ns.GameMain.state.CHALLENGING:
            return this.getRole() === ns.GameMain.role.CHALLENGER;
        case ns.GameMain.state.TRANSLATING:
            return this.getRole() === ns.GameMain.role.TRANSLATOR;
        case ns.GameMain.state.RESPONDING:
            return this.getRole() === ns.GameMain.role.RESPONDER_H || this.getRole() === ns.GameMain.role.RESPONDER_M;
        case ns.GameMain.state.DECIDING:
            return this.getRole() === ns.GameMain.role.CHALLENGER;
        }
    };

})();
