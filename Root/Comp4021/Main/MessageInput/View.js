(function() {
    var ns = Root.Comp4021.Main.MessageInput;
    var ColorPicker = Root.Widget.ColorPicker;
    var Toast = Root.Widget.Toast;
    ns.View = function(ctrl) {
        Frame.View.call(this, ctrl);
        this._textarea = null;
        this._btnRecord = null;
        this._btnStop = null;
        this._btnPlay = null;
        this._btnSubmit = null;
        this._colorPicker = null;
        this.dom = this.createElement('.MessageInput');
        {
            this._textarea = this.createElement(this.dom, 'textarea.form-control');
            var btnToolBar = this.createElement(this.dom, '.btn-toolbar');
            {
                var btnGroup;
                btnGroup = this.createElement(btnToolBar, '.btn-group.pull-right');
                {
                    this._btnSubmit = this.createElement(btnGroup, 'button.btn.btn-primary');
                    this._btnSubmit.innerHTML = 'Send';
                    this.createElement(this._btnSubmit, 'span.hotKey','(Ctrl+Enter)');
                }

                btnGroup = this.createElement(btnToolBar, '.btn-group.pull-right');
                {
                    this._btnRecord = this.createElement(btnGroup, 'button.btn.btn-default.btnRecord');
                    this._btnStop = this.createElement(btnGroup, 'button.btn.btn-default.btnStop');
                    this._btnPlay = this.createElement(btnGroup, 'button.btn.btn-default.btnPlay');
                }
                btnGroup = this.createElement(btnToolBar, '.btn-group.pull-right');
                {
                    this._colorPicker = new ColorPicker();
                    {
                        btnGroup.appendChild(Frame.createDefaultView(this._colorPicker).dom);
                    }
                }



            }



        }

        // handle colorPicker change event
        var that = this;
        this._colorPicker.bind(ColorPicker.event.CHANGE,function() {
            ctrl.setColor(this.color);
        });
        this._btnRecord.addEventListener('click', function() {
            ctrl.record();
        });
        this._btnStop.addEventListener('click', function() {
            ctrl.stopRecording();
        });
        this._btnPlay.addEventListener('click', function() {
            ctrl.playAudio();
        });
        this._btnSubmit.addEventListener('click', function() {
            that._submit();
        });
        this._textarea.addEventListener('keypress', function(e) {
            if((e.which === 10 || e.which === 13) && e.ctrlKey) {
                that._submit();
            }
        })
    };
    ns.View.extend(Frame.View);
    ns.View.prototype.update = function(state) {
        this._textarea.style.color = this._ctrl.color;
        this._colorPicker.setColor(this._ctrl.color);
        this._btnPlay.classList.remove('disabled');
        this._btnRecord.classList.remove('disabled');
        this._btnStop.classList.remove('disabled');
        this._btnSubmit.classList.remove('disabled');
        switch(state) {
        case ns.state.RECORDED:
            this._btnStop.classList.add('disabled');
            break;
        case ns.state.NORMAL:

            this._btnPlay.classList.add('disabled');
            this._btnStop.classList.add('disabled');
            break;
        case ns.state.RECORDING:
            this._btnRecord.classList.add('disabled');
            this._btnPlay.classList.add('disabled');
            this._btnSubmit.classList.add('disabled');
            break;
        case ns.state.SENDING:
            this._textarea.value = '';
            this._btnPlay.classList.add('disabled');
            this._btnRecord.classList.add('disabled');
            this._btnStop.classList.add('disabled');
            this._btnSubmit.classList.add('disabled');
            break;
        case ns.state.AUDIO_NOT_ALLOWED:
            frame.root.toast("Please enable your microphone", Toast.duration.PERM, Toast.type.ERROR);
            break;
        case ns.state.AUDIO_NOT_SUPPORTED:
            frame.root.toast("Your browser does not support user media", Toast.duration.PERM, Toast.type.ERROR);
            break;

        }
    };
    ns.View.prototype._submit = function() {
        this._ctrl.setText(this._textarea.value);
        this._ctrl.submit();
    };
    ns.View.css = {
        '.MessageInput': {
            'background-color':'hsla(0,0%,100%,0.05)',
            'padding':'5px',
        },
        '.hotKey': {
            'margin-left':'5px',
            'font-size':'75%',
            'opacity':'0.75',
            'font-family':'"consolas","Courier New", Courier, monospace',
        },
        '.btn-toolbar': {
            'margin-top':'7px',
        },
        '.btnRecord:before':{
            'content':'Record',
        },
        '.btnRecord.disabled:before':{
            content:'Recording...',
        },
        '.btnStop.disabled, .btnPlay.disabled':{
            display:'none',
        },
        '.btnStop:before':{
            content:'Stop',
        },
        '.btnPlay:before':{
            content:'Play',
        },

    }
})();
