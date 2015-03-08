(function() {
    var ns = Root.Comp4021.Main;
    ns.Message = function() {
        Util.Observable.call(this);
        this.text = '';
        this.audio = null;
        this.color = '';
        this.initiator = '';
        this.createTime = '';

    };
    ns.Message.extend(Util.Observable);
})();
