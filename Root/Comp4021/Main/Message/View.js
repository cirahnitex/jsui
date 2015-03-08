(function() {
    var ns = Root.Comp4021.Main.Message;
    ns.View = function(ctrl) {
        Frame.View.call(this, ctrl);
        this._pInitiator = null;
        this._pText = null;
        this._pTime = null;
        this._btnPlayAudio = null;
        this._eAudio = Util.createElement('audio');
        this._eAudio.setAttribute('autoplay', 'true');
        this.dom = this.createElement('.Message.relative');
        {
            this._pInitiator = this.createElement(this.dom, '.pInitiator.text-primary');
            this._pText = this.createElement(this.dom, '.pText');
            this._pTime = this.createElement(this.dom, '.pTime');
            this._btnPlayAudio = this.createElement(this.dom, 'a', 'Play Audio');
            {
                this._btnPlayAudio.href = "javascript:void(0);";
            }
        }

        var that = this;
        this._btnPlayAudio.addEventListener('click', function() {
            that._eAudio.src = ctrl.audio;
        });
    };
    ns.View.extend(Frame.View);
    ns.View.prototype.update = function() {
        if(this._ctrl.audio){
            this._btnPlayAudio.style.display = 'block';
        }
        else {
            this._btnPlayAudio.style.display = 'none';
        }
        this._pInitiator.html(this._ctrl.initiator);
        var text = this._ctrl.text.replace(ns.View.STUPID_URL_REGEX, function(match) {
            return '<a href = "'+match+'" target="_blank">'+match+'</a>';

        });
        this._pText.innerHTML = text;
        this._pText.style.color = this._ctrl.color;
        var date = new Date(this._ctrl.createTime);
        this._pTime.html(date.toString("h:mm tt"));
    };
    ns.View.STUPID_URL_REGEX = /http:\/\/[^\s]+/gi;
    ns.View.css = {
        '.Message': {
            padding:'5px',
        },
        '.pTime': {
            position:'absolute',
            right:'5px',
            top:'5px',
            color:'hsla(0,0%,100%,0.5)',
            'font-size':'12px',
        }
    }
})();
