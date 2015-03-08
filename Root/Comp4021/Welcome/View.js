(function() {
    var ns = Root.Comp4021.Welcome;
    ns.View = function(ctrl) {
        Frame.View.call(this, ctrl);
        this.dom = this.createElement('.wrap.relative');
        {
            var header = this.createElement(this.dom, 'h2', 'One Account. All of chat room.');
            var subHeader = this.createElement(this.dom, 'small.subheader', 'Sign in to continue');
            var loginWrap = this.createElement(this.dom, '.loginWrap');
            {
                var loginView = Frame.createDefaultView(this._ctrl.login);
                loginWrap.appendChild(loginView.dom);
            }
        }
    };
    ns.View.extend(Frame.View);
    ns.View.css = {
        '.wrap': {
            'text-align':'center',
            padding:'20px',
        },
        '.subheader': {
            display:'block',
        },
        '.loginWrap': {
            display:'inline-block',
            'margin-top':'20px',
            'padding':'20px',
        }
    }
})();
