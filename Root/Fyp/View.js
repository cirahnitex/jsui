(function() {
    var ns = Root.Fyp;
    ns.View = function(ctrl) {
        Frame.View.call(this, ctrl);
        this._childWrap = null;
        this.navBtnMain = null;
        this.navBtnBrowse = null;
        this.navBar = null;
        this.dom = this.createElement('.wrap.fill-height');
        {
            var navBar = this.createElement(this.dom, '.navbar.navbar-inverse');
            this.navBar = navBar;
            {
                var navBarHeader = this.createElement(navBar, '.navbar-header');
                {
                    var navBarBrand = this.createElement(navBarHeader, 'a.navbar-brand', 'FYP');
                    navBarBrand.href = "#Fyp/Welcome";
                }

                var collapse = this.createElement(navBar, ".collapse.navbar-collapse.navbar-ex1-collapse");
                {
                    var navBarNav = this.createElement(collapse, "ul.nav.navbar-nav");
                    {
                        this.navBtnMain = this.createElement(navBarNav, "li");
                        {
                            var a=this.createElement(this.navBtnMain, 'a', 'Main');
                            a.href = "#Fyp/MediaPlayer";
                        }
                        this.navBtnBrowse = this.createElement(navBarNav, "li");
                        {
                            a = this.createElement(this.navBtnBrowse, 'a', 'Browse');
                            a.href = "#Fyp/Welcome";
                        }
                    }
                }

            }

            this._childWrap = this.createElement(this.dom, '.childWrap');

        }

    };
    ns.View.extend(Frame.View);

    ns.View.prototype.onRouteChange = function() {
        var child = this._ctrl.getRouteChild();
        this._clearActiveNavBtn();
        if(child instanceof ns.MediaPlayer) {
            this.navBtnMain.classList.add("active");
        }
        this._childWrap.innerHTML = '';
        var view = Frame.createDefaultView(child);
        this._childWrap.appendChild(view.dom);
    };

    ns.View.prototype._clearActiveNavBtn = function() {
        this.navBtnMain.classList.remove("active");
        this.navBtnBrowse.classList.remove("active");
    };
    ns.View.css = {
        ".wrap": {
            display:"flex",
            "flex-direction":"column",

        },
        ".navBar": {
            flex:"0 0 auto",
        },
        ".childWrap":{
            position:"relative",
            flex:"1 1 auto",
        },
        ".childWrap > *": {
            position:"absolute",
            width:"100%",
            height:"100%"
        }
    }
})();
