(function() {
    var ns = Frame;
    /**
     * creates a view of a controller.
     * does not make this view observe the controller. observe the controller by yourself when appropriate
     * @param {Util.Observable} observable the controller
     * @constructor Frame.View
     */
    ns.View = function(observable) {
        Util.Observer.call(this);

        this._applyCss();

        this.dom = this.dom || Util.createElement('.fill-height');

        this._viewKey = Util.uniqueName();

        this._ctrl = observable;

        if(observable instanceof Frame.Routable) {
            var that = this;
            observable.bind(Frame.Routable.event.ROUTE_CHANGED, function() {
                that.onRouteChange(observable.getRouteChild());
            });
            setTimeout(function() {
                that.onRouteChange(observable.getRouteChild());
            },10);

        }

    };
    Util.inherit(ns.View, Util.Observer);
    /**
     * get an auto-generated css className for this view.
     * this className is the same among all instances of the same view.
     * @returns {string}
     * @private
     */
    ns.View.prototype._getCssPreffix = function() {
        if(!this.constructor.viewCssPreffix) {
            this.constructor.viewCssPreffix = Util.uniqueName();
        }
        return this.constructor.viewCssPreffix;
    };
    /**
     * create an element by css selector, and apply the View Preffix
     * @param {HTMLElement} [parent=null]
     * @param {string} [selector='']
     * @param {string} [innerHTML='']
     * @returns {HTMLElement}
     */
    ns.View.prototype.createElement = function(parent, selector, innerHTML) {
        if(typeof(parent) === 'string') {
            innerHTML = selector;
            selector = parent;
            parent = null;
        }
        if(typeof(selector) === 'undefined') selector = '';
        selector = selector + '.' + this._getCssPreffix();
        var rtn = Util.createElement(selector);

        if(parent instanceof HTMLElement) {
            parent.appendChild(rtn);
        }
        if(typeof(innerHTML) === 'string') {
            if(rtn.tagName.toLowerCase() === 'input') {
                rtn.value = innerHTML;
            }
            else {
                rtn.html(innerHTML);
            }
        }

        return rtn;
    };
    ns.View.prototype.querySelector = function(selector) {
        return this.dom.querySelector(this._addCssPreffixForSelector(selector));
    };
    ns.View.prototype.querySelectorAll = function(selector) {
        return this.dom.querySelectorAll(this._addCssPreffixForSelector(selector));
    };
    /**
     * add css prefix to all nodes recursively, including itself.
     * @param {HTMLElement} dom
     * @protected
     */
    ns.View.prototype._addCssPreffixRec = function(dom) {
        dom.classList.add(this._getCssPreffix());
        var aChild = dom.children;
        for(var i=0; i<aChild.length; i++) {
            this._addCssPreffixRec(aChild[i]);
        }
    };
    /**
     * add css-prefix for a css selector.
     * sample input
     * .wrap input[type=text].my-class, btn.my-class:hover
     * sample return
     * .wrap.PREFIX input[type=text].my-class.PREFIX, btn.my-class.PREFIX:hover
     * @param {string} selector
     * @returns {string}
     * @protected
     */
    ns.View.prototype._addCssPreffixForSelector = function(selector) {
        var that = this;
        return selector.replace(/([^,:\s\*>\+]+)((:[^,\s\*>\+]+)*)(,|\s|>|\+|$)/g, function(match, p1, p2, p3, p4) {
            return p1 + '.' + that._getCssPreffix() + p2 + p4;
        });
    };
    ns.View.prototype._applyCss = function() {
        if(this.constructor.isCssApplied) return;
        if(!this.constructor.hasOwnProperty('css')) return;
        var cssStr = '';
        var cssAss = this.constructor.css;
        var that = this;
        for(var selector in cssAss) {
            if(!cssAss.hasOwnProperty(selector)) continue;

            // insert a className at the end
            cssStr += this._addCssPreffixForSelector(selector);

            cssStr += '{';
            var rules = cssAss[selector];
            for(var property in rules) {
                if(!rules.hasOwnProperty(property)) continue;
                var value = rules[property];
                // add quotes for content value. content:"string"
                if(property === "content") {
                    cssStr += property + ':"' + value.replace(/"/g,'\\"') + '";';
                }
                else {
                    cssStr += property + ':' + value + ';';
                }

            }
            cssStr += '}';

        }
        var styleElem = document.createElement('style');
        styleElem.innerHTML = cssStr;
        document.getElementsByTagName('head')[0].appendChild(styleElem);
        this.constructor.isCssApplied = true;
    };
    ns.View.prototype.update = function(state){};
    ns.View.prototype.onRouteChange = function(routeChild) {
        if(this.constructor !== ns.View) return; // don't apply this update function when in subclass

        this.dom.innerHTML = '';
        var view = Frame.createDefaultView(routeChild);
        this.dom.appendChild(view.dom);

    };
    /**
     * create a view of a controller. does not create the view of the same controller twice.
     * @param {Util.Observable} ctrl
     * @returns {Frame.View}
     */
    ns.View.prototype.getViewOf = function(ctrl) {
        if(!ctrl.hasOwnProperty(this._viewKey)) {
            ctrl[this._viewKey] = this.createViewOf(ctrl);
        }
        return ctrl[this._viewKey];
    };
    /**
     * create a view of a controller. used in getViewOf
     * @param {Util.Observable} ctrl
     * @returns {Frame.View}
     */
    ns.View.prototype.createViewOf = function(ctrl) {
        return Frame.createDefaultView(ctrl);
    }
})();
