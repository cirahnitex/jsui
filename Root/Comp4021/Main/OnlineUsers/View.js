(function() {
    var ns = Root.Comp4021.Main.OnlineUsers;
    /**
     *
     * @param {Root.Comp4021.Main.OnlineUsers} ctrl
     * @constructor Root.Comp4021.Main.OnlineUsers.View
     */
    ns.View = function(ctrl) {
        Frame.View.call(this, ctrl);
        this.eNUser = null;
        this.userListWrap = null;
        this.eActiveUser = null;
        this.dom = this.createElement('.OnlineUsers.panel.panel-default');
        {
            var panelHeading = this.createElement(this.dom, '.panel-heading');
            {
                this.eActiveUser = this.createElement(panelHeading, 'span');
                var a=this.createElement(panelHeading, 'a.pull-right', 'Log out');
                a.href = '#Comp4021/Welcome';
            }

            var panelBody = this.createElement(this.dom, '.nOnlineUser');
            {
                var title = this.createElement(panelBody, 'span.title', 'Online Users ');
                this.eNUser = this.createElement(panelBody, 'span.eNUser');
            }


            this.userListWrap = this.createElement(this.dom, '.userListWrap');
        }
    };
    ns.View.extend(Frame.View);

    ns.View.prototype.update = function(state) {

        switch(state) {
        case ns.state.CHANGED:
            this.eActiveUser.html(this._ctrl.activeUser || 'Guest');
            var aUser = this._ctrl.aUser;
            this.eNUser.innerHTML = aUser.length;
            this.userListWrap.innerHTML = '';
            for(var i=0; i<aUser.length; i++) {
                var wrap = this.createElement(this.userListWrap, 'div.userWrap');
                wrap.appendChild(this.getViewOf(aUser[i]).dom);
            }
        }
    };

    ns.View.css = {
        '.eNUser:before':{
            content:"- ",
        },
        '.nOnlineUser': {
            padding:'15px 15px 0px 15px',
        },
        '.eNUser':{
            color:'hsla(0,0%,100%,0.5)',
        },
        '.userListWrap': {
            'padding': '5px 0px'
        },
        '.userWrap': {
            'padding':'3px 15px',

        },
        '.userWrap:hover':{

            'background-color':'hsla(0,0%,100%,0.15)',
        }
    }
})();
