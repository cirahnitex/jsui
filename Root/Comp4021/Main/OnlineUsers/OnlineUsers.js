(function() {
    var ns = Root.Comp4021.Main;
    /**
     *
     * @constructor Root.Comp4021.Main.OnlineUsers
     * @arguments Util.Observable
     */
    ns.OnlineUsers = function() {
        Util.Observable.call(this);
        this.activeUser = '';// TODO: get active user
        /**
         * an array of online user
         * @type {Root.Comp4021.Main.OnlineUsers.User[]}
         */
        this.aUser = [];

        this._initLoad();
    };
    ns.OnlineUsers.extend(Util.Observable);
    ns.OnlineUsers.state = {
        CHANGED:Util.uniqueInt(),
    };

    ns.OnlineUsers.prototype._initLoad = function() {
        var that = this;
        Util.ajaxPost('getActiveUser.php',{},function(r) {
            if(r.user) that.activeUser = r.user.username;
            Util.ajaxPost('listUser.php',{},function(r) {
                that._readUsersFromResponse(r);
                that._cometLooper();
            });
        });

    };
    ns.OnlineUsers.prototype._readUsersFromResponse = function(r) {

        var aUserJson = r.aUser;
        this.aUser = [];
        for(var i in aUserJson) {
            if(!aUserJson.hasOwnProperty(i))continue;
            var user = ns.OnlineUsers.User.fromJson(aUserJson[i]);

            this.aUser.push(user);
        }
        this.notifyObservers(ns.OnlineUsers.state.CHANGED);
    };
    ns.OnlineUsers.prototype._cometLooper = function() {
        var that = this;
        Util.ajaxPost('listUser.php',{wait:1},function(r) {
            that._readUsersFromResponse(r);
            that._cometLooper();
        });
    }
})();
