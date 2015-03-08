(function() {
    var ns = Root.Comp4021.Welcome.Login;
    var DataUrl = Root.DataUrl;
    var Toast = Root.Widget.Toast;
    ns.View = function(ctrl) {
        Frame.View.call(this, ctrl);
        this.img = null;
        this.fileInput = null;
        this.btnLogin = null;
        this.dataUrl = new DataUrl();
        this.dom = this.createElement('.wrap');
        {

            var label = this.createElement(this.dom, 'label');
            {
                this.img = this.createElement(label, 'img.profileImg');
                this.fileInput = this.createElement(label, 'input[type=file]');
            }

            var label = this.createElement(this.dom, '.input-group');
            {

                var usernameInput = this.createElement(label, 'input[type=text].form-control');
                {
                    usernameInput.placeholder = 'username';
                }
                var span = this.createElement(label, 'span.input-group-btn');
                {
                    this.btnLogin = this.createElement(span, 'button.btn.btn-default', 'login');
                }

            }
        }

        // bind events
        var that = this;
        usernameInput.addEventListener('keypress', function(e) {
            if(e.which == 13) {
                ctrl.setUsername(this.value);
                ctrl.login();
            }

        });


        this.btnLogin.addEventListener('click', function(e) {
            ctrl.setUsername(usernameInput.value);
            ctrl.login();
        });

        this.fileInput.addEventListener('change', function(e) {
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
    ns.View.extend(Frame.View);
    ns.View.css = {
        '.wrap': {
            width:'300px'
        },
        'input[type=file]': {
            position:'absolute',
            visibility:'hidden'
        },
        '.profileImg': {
            'border-radius':'50%',
            height:'128px',
            margin:'10px',
        }
    };
    ns.View.prototype.update = function(state) {
        this.btnLogin.classList.remove('disabled');
        this.btnLogin.html("Sign in");
        switch(state) {
        case ns.state.NORMAL:
            this.img.src = this._ctrl.profileImg;
            break;
        case ns.state.LOGGING_IN:
            this.btnLogin.classList.add('disabled');
            this.btnLogin.html("Signing in...");
        }
    }
})();
