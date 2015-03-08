(function() {
    var ns = Root.Comp4021.Main.OnlineUsers.User;
    /**
     * display a username and a profile image
     * @param {Root.Comp4021.Main.OnlineUsers.User} ctrl
     * @constructor Root.Comp4021.Main.OnlineUsers.User.View
     * @arguments Frame.View
     */
    ns.View = function(ctrl) {
        Frame.View.call(this, ctrl);
        this.dom = this.createElement('.User.relative');
        {

            var img = this.createElement(this.dom, 'img');
            {
                img.src = ctrl.profileImg;

            }

            var textWrap = this.createElement(this.dom, '.textWrap');
            {
                this.createElement(textWrap, 'div.username.text-primary', ctrl.username);
                this.createElement(textWrap, 'small.state', 'online');
            }
        }
    };
    ns.View.extend(Frame.View);
    ns.View.css = {
        'img':{
            'position':'absolute',
            'width':'30px',

        },
        '.textWrap':{
            'margin-left':'35px',
        },
        '.username':{
            'line-height':'12px',
        },
        '.state':{
            'line-height':'10px',
            'font-size':'75%',
        }

    }
})();
