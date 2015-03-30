(function() {
    var ns = Root.Fyp;
    var Api = ns.Api;
    ns.TagEditor = function(audioId) {
        Frame.Routable.call(this);
        this.audioId = audioId;
        this.aTag = [];
        this.aAllTag = [];
        this._initLoad();
    };
    ns.TagEditor.extend(Frame.Routable);
    ns.TagEditor.state = {
        REFRESHED: Util.uniqueInt(),
    };
    ns.TagEditor.event = {
        EDIT_SUCCESS: Util.uniqueInt(),
        DONE: Util.uniqueInt(),
    };
    ns.TagEditor.prototype._initLoad = function() {
        var that = this;
        var r1 = Api.request("/tag/listTag.php",{audioId:this.audioId}, function(value) {
            // update aActiveAudioTag
            that.aTag = value;
        });
        var r2 = Api.request("/tag/allTag.php", function(value) {
            that.aAllTag = value;
        });
        Api.waitFor([r1,r2], function() {
            that.notifyObservers(ns.TagEditor.state.REFRESHED);
        });
    };
    ns.TagEditor.prototype.close = function() {
        this.trigger(ns.TagEditor.event.DONE);
    };
    ns.TagEditor.prototype.requestCommit = function(aTag) {
        this.aTag = aTag;
        var that = this;
        Api.request("/tag/setTag.php", {audioId:this.audioId, aTag:this.aTag}, function() {
            that.trigger(ns.TagEditor.event.EDIT_SUCCESS);
            that.trigger(ns.TagEditor.event.DONE);
        });
    }

})();
