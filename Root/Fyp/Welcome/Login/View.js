(function() {
    var ns = Root.Fyp.Welcome.Login;
    var DataUrl = Root.DataUrl;
    var Toast = Root.Widget.Toast;
    ns.View = function(ctrl) {
        Frame.TemplateView.call(this,'Root/Fyp/Welcome/Login/template.html' , ctrl);

        this.dataUrl = new DataUrl();
        this.applyTemplate();

    };
    ns.View.extend(Frame.TemplateView);
    ns.View.prototype.onload = function() {
        var that = this;
        var ctrl = this._ctrl;
        this.eles.passwordInput.addEventListener('keypress', function(e) {
            if(e.which == 13) {
                that._login();
            }

        });


        this.eles.btnLogin.addEventListener('click', function(e) {
            that._login();
        });

        this.eles.fileInput.addEventListener('change', function(e) {
            if(this.files.length<=0) return;
            that.dataUrl.readFile(this.files[0]);
        });

        var observer = new Util.Observer(this.dataUrl);
        observer.update = function(state) {
            switch(state) {
            case DataUrl.state.SUCCEED:
                ctrl.setProfileImg(that.dataUrl.dataUrl);
                break;
            case DataUrl.state.BROWSER_NOT_SUPPORTED:
                frame.root.toast("File api is not supported", Toast.type.ERROR, Toast.duration.PERM);
                break;
            }
        };
        this.dataUrl.addObserver(observer);
    };
    ns.View.prototype._login = function() {
        var username = this.eles.usernameInput.value;
        var password = this.eles.passwordInput.value;
        this._ctrl.login(username, password);
    };
    ns.View.prototype.update = function(state) {
        if(this.isTemplateLoading) return;
        this.eles.btnLogin.classList.remove('disabled');
        this.eles.btnLogin.html("Sign in");
        switch(state) {
        case ns.state.NORMAL:
            if(this._ctrl.profileImg) this.eles.img.src = this._ctrl.profileImg;
            break;
        case ns.state.LOGGING_IN:
            this.eles.btnLogin.classList.add('disabled');
            this.eles.btnLogin.html("Signing in...");
            break;
        case ns.state.FAILED:
            frame.root.toast("login failed", Toast.type.ERROR);
            break;
        }
    }
})();
