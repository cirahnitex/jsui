(function() {
    var ns = Root.Comp4021.Main;
    ns.View = function(ctrl) {
        Frame.View.call(this, ctrl);

        this._messageWrap = null;
        this.dom = this.createElement('.Main');
        {
            var onlineUserWrap = this.createElement(this.dom, '.onlineUserWrap');
            {
                var view = this.getViewOf(ctrl.onlineUsers);
                onlineUserWrap.appendChild(view.dom);

            }
            var chatWrap = this.createElement(this.dom, '.chatWrap');
            {

                this._messageWrap = this.createElement(chatWrap, '.messageWrap');

                var messageInputWrap = this.createElement(chatWrap, '.messageInputWrap');
                {
                    var view = Frame.createDefaultView(this._ctrl.messageInput);
                    messageInputWrap.appendChild(view.dom);
                }

            }


        }


    };
    ns.View.extend(Frame.View);
    ns.View.prototype.update = function(state) {
        switch(state) {
        case ns.state.CHANGED:
            this._messageWrap.innerHTML = '';
            var aMessage = this._ctrl.aMessage;
            for(var i=0; i<aMessage.length; i++) {
                var singleMessageWrap = this.createElement(this._messageWrap, '.singleMessageWrap');
                {
                    var view = this.getViewOf(aMessage[i]);
                    singleMessageWrap.appendChild(view.dom);
                }

            }
        }
    };
    ns.View.css = {
        '.chatWrap': {
            position:'absolute',
            left:'200px',
            width:'calc(100% - 200px)',
            height:'100%',
        },
        '.onlineUserWrap > *': {
            height:'100%',
            margin:'0',
        },
        '.onlineUserWrap': {
            position:'absolute',
            width:'200px',
            height:'100%',
        },
        '.messageWrap': {
            'height':'80%',
            'overflow-y':'scroll',
        },
        '.singleMessageWrap:nth-of-type(2n)': {
            'background-color':'hsla(0,0%,100%,0.05)',
        },
        '.messageInputWrap': {
            'position':'absolute',
            'bottom':'0px',
            'width':'100%',
        }
    };

})();
