(function() {
    var ns = Root.Comp4021.Main.OnlineUsers;
    /**
     * represents a user
     * @constructor Root.Comp4021.Main.OnlineUsers.User
     * @arguments Util.Observable
     */
    ns.User = function() {
        Util.Observable.call(this);
        /**
         *
         * @type {string}
         */
        this.username = '';
        /**
         * a data url of profile image
         * @type {string}
         */
        this.profileImg = '';
    };
    ns.User.extend(Util.Observable);
    ns.User.state = {
        NORMAL:Util.uniqueInt(),
    };
    /**
     * create an instance from server JSON object
     * @param {Object} json
     * @returns {Root.Comp4021.Main.OnlineUsers.User}
     */
    ns.User.fromJson = function(json) {
        var user = new ns.User();
        user.username = json.username;
        user.profileImg = json.profileImg;
        return user;
    };
})();
