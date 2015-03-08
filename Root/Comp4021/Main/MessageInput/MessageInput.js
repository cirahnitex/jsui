(function() {
    var ns = Root.Comp4021.Main;
    var Recorder = Root.Widget.Recorder;
    /**
     * a controller to
     * input text message
     * input audio message
     * change text color
     * send message
     * @constructor Root.Comp4021.Main.MessageInput
     * @arguments Util.Observer
     */
    ns.MessageInput = function() {
        Util.Observable.call(this);
        this.text = '';
        this.color = '#ffffff';
        this._eAudio = null;
        this._audioBlob = null;

        // init audio player
        this._eAudio = Util.createElement('audio');
        this._eAudio.setAttribute('autoplay', 'true');

        // start recorder
        var that = this;
        this.recorder = new Recorder();
        var observer = new Util.Observer(ns.MessageInput.recorder);
        observer.update = function(state) {
            switch(state) {
            case Recorder.state.RECORDING:
                that.notifyObservers(ns.MessageInput.state.RECORDING);
                break;
            case Recorder.state.RECORDED:
                that.recorder.exportWAV(function(b) {
                    that._audioBlob = b;
                    that.notifyObservers(ns.MessageInput.state.RECORDED);
                });
                break;
            case Recorder.state.NOT_ALLOWED:
                that.notifyObservers(ns.MessageInput.state.AUDIO_NOT_ALLOWED);
                break;
            case Recorder.state.NOT_SUPPORTED:
                that.notifyObservers(ns.MessageInput.state.AUDIO_NOT_SUPPORTED);
                break;
            }
        };
        this.recorder.addObserver(observer);


        this.setChanged(ns.MessageInput.state.NORMAL);
    };
    ns.MessageInput.extend(Util.Observable);
    ns.MessageInput.state = {
        NORMAL:Util.uniqueInt(),
        RECORDING:Util.uniqueInt(),
        RECORDED:Util.uniqueInt(),
        SENDING:Util.uniqueInt(),
        AUDIO_NOT_SUPPORTED:Util.uniqueInt(),
        AUDIO_NOT_ALLOWED:Util.uniqueInt(),
    };
    ns.MessageInput.prototype.getMessage = function() {
        var rtn = new ns.Message();
        rtn.text = this.text;
        return rtn;
    };
    ns.MessageInput.prototype.setColor = function(color) {
        if(this.color === color) return;
        this.color = color;
        this.setChanged();
        this.notifyObservers();
    };
    ns.MessageInput.prototype.setText = function(text) {
        if(this.text === text) return;
        this.text = text;
    };
    ns.MessageInput.prototype.record = function() {
        this.recorder.clear();
        this.recorder.record();
    };
    ns.MessageInput.prototype.stopRecording = function() {
        this.recorder.stop();
    };
    ns.MessageInput.prototype.playAudio = function() {
        this._eAudio.src = URL.createObjectURL(this._audioBlob);
    };
    ns.MessageInput.prototype.submit = function() {
        this.notifyObservers(ns.MessageInput.state.SENDING);
        if(!this._audioBlob) {
            this._submitWithDataUrl('');
            return;
        }



        var fileReader = new FileReader();
        var that = this;
        fileReader.onloadend = function() {
            that._submitWithDataUrl(this.result);
        };
        fileReader.readAsDataURL(this._audioBlob);

    };
    ns.MessageInput.prototype._submitWithDataUrl = function(dataUrl) {
        var that = this;
        Util.ajaxPost('sendMessage.php',
            {
                text:this.text,
                color:this.color,
                audio:dataUrl,
            },function() {
                that.text = '';
                that._audioBlob = null;
                that.notifyObservers(ns.MessageInput.state.NORMAL);
            });
    }

})();
