(function() {
    var ns = Root.Comp4021;
    ns.Main = function() {
        Frame.Routable.call(this);
        this.routeKey = 'Main';
        this.aMessage = [];
        this.messageInput = new ns.Main.MessageInput();
        this.onlineUsers = new ns.Main.OnlineUsers();

        this._initLoad();
        this.setChanged(ns.Main.state.CHANGED);

    };
    ns.Main.extend(Frame.Routable);
    ns.Main.state = {
        CHANGED: Util.uniqueInt()
    };
    ns.Main.prototype._initLoad = function() {
        var that = this;
        Util.ajaxPost('listMessage.php',{},function(r) {
            that._readMessagesFromResponse(r);
        });
        this._cometLooper();
    };
    ns.Main.prototype._cometLooper = function() {
        var that = this;
        Util.ajaxPost('listMessage.php',{wait:1},function(r) {
            that._readMessagesFromResponse(r);
            that._cometLooper();
        });
    };
    ns.Main.prototype._readMessagesFromResponse = function(r) {
        this.aMessage = [];
        var aMessage = r.aMessage;
        for(var i in aMessage) {
            if(!aMessage.hasOwnProperty(i))continue;
            var json = aMessage[i];
            msg = new ns.Main.Message();
            msg.initiator = json.username;
            msg.text = json.text;
            msg.audio = json.audio;
            msg.color = json.color;
            msg.createTime = json.createTime;
            this.aMessage.push(msg);
        }
        this.notifyObservers(ns.Main.state.CHANGED);
    };


})();
