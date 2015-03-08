(function() {
    var ns = Frame;
    /**
     * a controller that is able of routing.
     * @constructor Frame.Routable
     * @arguments Util.Observable
     */
    ns.Routable = function() {
        Util.Observable.call(this);
        this.routeKey = null; // the string used to identify this Routable in a SiteLocation
        this.routeTitle = null; // the string to display as a title, currently not used.

        this._child = null;
        this._childBindArr = [];
        this._recordInstance();
    };
    Util.inherit(ns.Routable, Util.Observable);

    ns.Routable.event = {
        ROUTE_CHANGED: Util.uniqueInt(),
    };

    ns.Routable._GET_INSTANCE_KEY = Util.uniqueName();
    /**
     * get the instance of a Routable controller.
     * generally a Routable should be singleton. if not, the latest constructed one will be returned.
     * @param constructor
     * @returns {Frame.Routable}
     */
    ns.Routable.getInstance = function(constructor) {
        if(!constructor.hasOwnProperty(ns.Routable._GET_INSTANCE_KEY)) return null;
        return constructor[ns.Routable._GET_INSTANCE_KEY];
    };
    /**
     * get the dom title. if this.routeTitle is not set, returns the this.routeKey.
     * @returns {String}
     */
    ns.Routable.prototype.getRouteTitle = function() {
        if(this.routeTitle === null) return this.routeKey;
        return this.routeTitle;
    };
    /**
     * define a rule to route SiteLocation.
     * this function call be called multiple times, the rules defined earlier have more priority.
     * @param rule {String|RegExp} the match rule
     * @param call_back {Routable.bindRoute.callback} what to do when this rule is matched.
     */
    ns.Routable.prototype.bindRoute = function(rule, call_back) {
        this._childBindArr.push([rule, call_back]);
    };
    ns.Routable.ROUTE_ABORT = Util.uniqueInt();
    ns.Routable.ROUTE_CONTINUE = Util.uniqueInt();
    /**
     * @callback Routable.bindRoute.callback
     * @param match {String} the matched string. maybe useful if you use a RegExp as your match rule.
     * @returns {Routable|Observable|Routable.ROUTE_ABORT|Routable.ROUTE_CONTINUE|null}
     *      Routable - declare the child, and pass the remaining siteLocation to this child
     *      Observable - declare the child, and discard the remaining siteLocation because an Observable cannot handle siteLocation
     *      Routable.ROUTE_ABORT - abort routing. for example, if you want to redirect to another location in this callback, you need to abort this routing process. otherwise the redirecting inside callback will have no effect.
     *      Routable.ROUTE_CONTINUE - continue to find other matching
     *      null - the route process has completed
     */

    /**
     * set the location of a this Routable.
     * @param siteLocation
     */

    ns.Routable.prototype.setLocation = function(siteLocation) {

        if(typeof(siteLocation) === 'string') {
            siteLocation = new Frame.SiteLocation(siteLocation);
        }
        else if(typeof(siteLocation) === 'number') {
            siteLocation = new Frame.SiteLocation(siteLocation.toString());
        }
        var child = null;
        var domKey = siteLocation.pop();
        /*
         - bypass this domable if required child is the same as current child
         */

        if(this._child && domKey === this._child.routeKey) {
            this._child.setLocation(siteLocation);
            return;
        }
        /*
         - search for matched child, and call its bind_child callback
         */
        for(var i = 0; i < this._childBindArr.length; i++) {

            var rule = this._childBindArr[i][0];

            if(
                (typeof(rule) === 'string' && domKey === rule) ||
                    (rule instanceof RegExp && rule.test(domKey))
                ) {
                rtn = this._childBindArr[i][1].call(this, domKey);
                if(rtn === Frame.Routable.ROUTE_CONTINUE) continue;
                child = rtn;
                break;
            }

        }

        if(child instanceof Util.Observable) {
            this._child = child;
            if(!child.routeKey) {
                child.routeKey = domKey;
            }
            if(child instanceof Frame.Routable) {
                child.setLocation(siteLocation);
            }
            this.trigger(ns.Routable.event.ROUTE_CHANGED);
        }
        else if(child === Frame.Routable.ROUTE_ABORT) {

        }
        else {
            this._child = null;
            this.trigger(ns.Routable.event.ROUTE_CHANGED);
            window.frame.updateLocation();
        }

    };
    /**
     * normally the child setting only happens during the routing process.but you can still call this function to change the child.
     * this function will automatically notify the framework to update its own siteLocation.
     * @param child
     */
    ns.Routable.prototype.setRouteChild = function(child) {
        this._child = child;
        window.frame.updateLocation();

    };

    ns.Routable.prototype.getRouteChild = function() {
        return this._child;
    };

    /**
     * normally the domkey will not change since a Routable is constructed. but you can still call this function to change the domkey.
     * this function will automatically notify the framework to update its own siteLocation.
     * @param domKey
     */
    ns.Routable.prototype.updateDomkey = function(domKey) {
        this.routeKey = domKey;
        window.frame.updateLocation();
    };
    /**
     * get the local SiteLocation of this Routable. That is, the local location only includes this Routable and its successors.
     * @returns {SiteLocation}
     */
    ns.Routable.prototype.getLocation = function() {
        if(this._child) {
            if(this._child instanceof Frame.Routable) {
                return this._child.getLocation().push(this._child.routeKey, this._child.getRouteTitle());
            }
            else {
                return this._child.routeKey;
            }
        }
        else {
            return new Frame.SiteLocation();
        }
    };

    ns.Routable.prototype._recordInstance = function() {
        this.constructor[ns.Routable._GET_INSTANCE_KEY] = this;
    }

})();


