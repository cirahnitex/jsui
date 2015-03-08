(function(){
    var ns = Root.Fyp;
    /**
     *
     * @constructor Root.Fyp.MediaPlayer
     * @arguments Frame.Routable
     */
    ns.MediaPlayer = function() {
        Frame.Routable.call(this);
        this.albumImageSrc = '';

        // init audio player
        this._eAudio = Util.createElement('audio');
        this._eAudio.setAttribute('autoplay', 'true');
        window.mediaPlayer = this;

        var that = this;
        this._eAudio.addEventListener('canplay', function() {
            if(that.getObservableState() === ns.MediaPlayer.state.buffering) {
                that.notifyObservers(ns.MediaPlayer.state.playing);
            }

        });
        this.notifyObservers(ns.MediaPlayer.state.buffering);
        window.m = this;
    };
    ns.MediaPlayer.extend(Frame.Routable);

    ns.MediaPlayer.state = {
        buffering:Util.uniqueInt(),
        stopped:Util.uniqueInt(),
        playing:Util.uniqueInt(),
        paused:Util.uniqueInt()
    };
    ns.MediaPlayer.prototype.loadAudio = function(src) {
        this._eAudio.src = src;
        this.notifyObservers(ns.MediaPlayer.state.buffering);
    };
    ns.MediaPlayer.prototype.pause = function() {
        this._eAudio.pause();
        this.notifyObservers(ns.MediaPlayer.state.paused);

    };
    ns.MediaPlayer.prototype.play = function() {
        this._eAudio.play();
        this.notifyObservers(ns.MediaPlayer.state.playing);
    };
    ns.MediaPlayer.prototype.stop = function() {
        this._eAudio.stop();
        this.notifyObservers(ns.MediaPlayer.state.stopped);
    };
    ns.MediaPlayer.prototype.getMediaElement = function() {
        return this._eAudio;
    };
    /**
     * get media current time in ms
     * @returns {number}
     */
    ns.MediaPlayer.prototype.getCurrentTime = function() {
        return this._eAudio.currentTime*1000;
    };
    ns.MediaPlayer.prototype.setCurrentTime = function(currTime) {
        this._eAudio.currentTime = currTime/1000;
        this.setChanged();
        this.notifyObservers();
    };
    /**
     * get media duration is ms
     * @returns {number}
     */
    ns.MediaPlayer.prototype.getDuration = function() {
        return this._eAudio.duration*1000;
    };
    ns.MediaPlayer.prototype.setAlbumImage = function(src) {
        this.albumImageSrc = src;
        this.setChanged();
        this.notifyObservers();
    };
})();
