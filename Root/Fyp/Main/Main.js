(function(){
    var ns = Root.Fyp;
    var Api = ns.Api;
    /**
     *
     * @constructor Root.Fyp.Main
     * @arguments Frame.Routable
     */
    ns.Main = function() {
        Frame.Routable.call(this);
        this.routeKey = 'Main';
        this.audios = {};
        this.mediaPlayer = new ns.MediaPlayer();
        this.selectedAudioId = null;
        this.requestAudioList();

    };
    ns.Main.extend(Frame.Routable);
    ns.Main.Audio = function() {
        this.id = '0';
        this.url = '';
        this.name = '';
        this.category = '';
        this.ratingValue = 0;
        this.predictedRating = 0.0;
    };
    ns.Main.state = {
        REFRESHED:Util.uniqueInt(),
        SELECTION_CHANGED:Util.uniqueInt(),
        RATING_CHANGED:Util.uniqueInt(),
        RECOMMENDATION_CHANGED:Util.uniqueInt(),
    };
    ns.Main.recommendation = {
        ITEM_BASED:"ItemBased",
        USER_BASED:"UserBased",
    };
    ns.Main.prototype.requestAudioList = function() {
        var that = this;
        Api.request("/listAudio.php", function(value, code) {
            that.audios = {};
            for(var i=0; i<value.length; i++) {
                var audio = value[i];
                that.audios[audio.id] = audio;
            }
            that.notifyObservers(ns.Main.state.REFRESHED);
        });
    };
    ns.Main.prototype.requestRateAudio = function(ratingValue) {
        if(this.selectedAudioId === null) return;
        var that = this;
        Api.request('/rate.php',{audioId:this.selectedAudioId, rating:ratingValue},function() {
            var audio = that.audios[that.selectedAudioId];
            audio.ratingValue = ratingValue;
            that.notifyObservers(ns.Main.state.RATING_CHANGED);
        });

    };
    ns.Main.prototype.requestRecommend = function(algm) {
        var that = this;
        Api.request("/recommend.php",{algorithm: algm},function(aPair) {
            for(var i=0; i<aPair.length; i++) {
                var pair = aPair[i];
                that.getAudioById(pair.id).predictedRating = pair.predictedRating;
            }
            frame.root.toast("recommendation performed");
            that.notifyObservers(ns.Main.state.RECOMMENDATION_CHANGED);
        })
    };
    ns.Main.prototype.selectAudio = function(index) {
        this.selectedAudioId = index;
        var audio = this.audios[index];
        this.mediaPlayer.loadAudio(Api.SERVER + '/' + audio.url);
        this.notifyObservers(ns.Main.state.SELECTION_CHANGED);
    };

    ns.Main.prototype.getAudioById = function(id) {
        return this.audios[id];
    };
    ns.Main.prototype.getActiveAudio = function() {
        if(this.selectedAudioId === null) return null;
        return this.audios[this.selectedAudioId];
    };

})();
