(function() {
    var ns = Root.Fyp.MediaPlayer;
    /**
     *
     * @constructor Root.Fyp.MediaPlayer
     * @arguments Frame.TemplateView
     */
    ns.View = function(ctrl) {
        Frame.TemplateView.call(this, "Root/Fyp/MediaPlayer/template.html", ctrl);
        this.dom = this.createElement('.fill-height');
        this._isProgressDragging = false;
        this._isProgressAnimating = false;
        this.applyTemplate();

    };
    ns.View.extend(Frame.TemplateView);
    ns.View.prototype.onload = function() {
        // append the audio element, so the audio will stop playing when this view is removed from dom
        this.dom.appendChild(this._ctrl.getMediaElement());

        var ctrl = this._ctrl;
        var that = this;
        this.eles.btnPlay.onclick = function() {
            ctrl.play();
        };
        this.eles.btnPause.onclick = function() {
            ctrl.pause();
        };
        this.eles.progressControlZone.onmousedown = function(e) {
            that._isProgressDragging = true;
            that.eles.progress.style.width = that._getProgressByCursorX(e.clientX)*100 + '%';
            e.preventDefault();
        };
        this.eles.controls.onmousemove = function(e) {
            if(!that._isProgressDragging) return;
            that.eles.progress.style.width = that._getProgressByCursorX(e.clientX)*100 + '%';
            e.preventDefault();
        };
        this.eles.controls.onmouseout = function() {
            if(!that._isProgressDragging) return;
            that._isProgressDragging = false;
        };
        this.eles.controls.onmouseup = function(e) {
            if(!that._isProgressDragging) return;
            that._isProgressDragging = false;
            ctrl.setCurrentTime(ctrl.getDuration()*that._getProgressByCursorX(e.clientX));
        };

    };
    ns.View.prototype.update = function(state) {
        if(this.isTemplateLoading) return;

        if(this._ctrl.albumImageSrc) {
            this.eles.videoWrap.style.backgroundImage = "url("+this._ctrl.albumImageSrc+")";
        }
        this.eles.endTime.html(ns.View._durationToString(this._ctrl.getDuration()));
        this.eles.currTime.html(ns.View._durationToString(this._ctrl.getCurrentTime()));

        this.eles.btnPlay.classList.add('hide');
        this.eles.btnPause.classList.add('hide');

        switch(state) {
        case ns.state.playing:
            this.eles.btnPause.classList.remove('hide');
            this._startProgressAnimation();
            break;
        case ns.state.paused:
        case ns.state.stopped:
            this.eles.btnPlay.classList.remove('hide');
            break;
        }
    };
    /**
     * convert duration in seconds to h:m:s
     * @param duration
     * @returns {string}
     * @private
     */
    ns.View._durationToString = function(duration) {
        var S = 1000;
        var M = S*60;
        var H = M*60;
        var h = Math.floor(duration/H);
        duration-=h*H;
        var m = Math.floor(duration/M);
        duration-=m*M;
        var s = Math.floor(duration/S);

        var numPad = function(num) {
            return ("0"+num).slice(-2);
        };
        var rtn = '';
        if(h>0) {
            rtn += h + ":";
        }
        rtn += numPad(m) + ":" + numPad(s);
        return rtn;
    };

    /**
     * generate the motion of progress bar and keep updating current time when playing media
     * the animation will stop automatically when media is not playing
     * @private
     */
    ns.View.prototype._startProgressAnimation = function() {
        if(this._isProgressAnimating) return;
        var eProgress = this.eles.progress;
        var eCurrTime = this.eles.currTime;
        var ctrl = this._ctrl;
        var that = this;
        var animationCallback = function() {
            if(ctrl.getObservableState() !== ns.state.playing) {
                that._isProgressAnimating = false;
                return;
            }
            that._isProgressAnimating = true;
            if(!that._isProgressDragging) {
                eCurrTime.html(ns.View._durationToString(ctrl.getCurrentTime()));
                eProgress.style.width = ctrl.getCurrentTime()/ctrl.getDuration()*100 + '%';
            }
            requestAnimationFrame(animationCallback);
        };
        animationCallback();
    };
    /**
     * get the progress indicated by mouse cursor
     * @return {number} between 0-1
     * @private
     */
    ns.View.prototype._getProgressByCursorX = function(clientX) {
        var rect = this.eles.progressBar.getBoundingClientRect();
        return (clientX - rect.left) / rect.width;
    }
})();
