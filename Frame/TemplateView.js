(function() {
    var ns = Frame;
    /**
     * a view that is loaded from template
     * @param {string} templatePath the path to template file
     * @param {Util.Observable} ctrl the controller
     * @constructor Frame.TemplateView
     * @arguments Frame.View
     */
    ns.TemplateView = function(templatePath, ctrl) {

        /**
         * exported elements is stored here
         * @type {HTMLElement[]}
         */
        this.eles = {};

        /**
         * exported widgets is stored here
         * @type {HTMLElement[]}
         */
        this._widgets = {};
        this.isTemplateLoading = true;

        this._templatePath = templatePath;

        Frame.View.call(this, ctrl);
    };
    ns.TemplateView.extend(Frame.View);
    ns.TemplateView._TEMPLATE_KEY = Util.uniqueName();
    ns.TemplateView.SYMBOL_ATTRIBUTE_NAME = "id";
    ns.TemplateView.WIDGET_ATTRIBUTE_NAME = "widget";
    /**
     * hold templates in release version
     */
    ns.TemplateView.releases = {};
    ns.TemplateView.releasePreloadTemplate = function() {
        var aDom = document.querySelectorAll('body > .template');
        var releases = ns.TemplateView.releases;
        for(var i=0; i<aDom.length; i++) {
            releases[aDom[i].getAttribute('href')] = aDom[i].innerHTML;
        }
        document.body.innerHTML = '';
    };
    /**
     * apply the template. after completion, onload() will be called and isTemplateLoading = true.
     */
    ns.TemplateView.prototype.applyTemplate = function() {
        var that = this;
        this._loadTemplate(function() {
            that.isTemplateLoading = false;
            that.onload();
            that._ctrl.notifyOneObserver(that);
        });
    };
    /**
     * get a clone of the required widget
     * export symbols inside this widget
     * nested widget is not allowed
     * @param {HTMLElement} [parent = null]
     * @param {string} name
     * @param {string} [innerHTML = '']
     * @returns {HTMLElement}
     */
    ns.TemplateView.prototype.createWidget = function(parent, name, innerHTML) {
        if(typeof(parent) === 'string') {
            innerHTML = name;
            name = parent;
            parent = null;
        }
        var rtn = this._widgets[name].cloneNode(true);
        this._exportSymbolRec(rtn, rtn);
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
    /**
     * gets a HTMLElement from the template
     * if template has already been loaded, return a copy of it
     * otherwise load it
     * @param callback
     * @private
     */
    ns.TemplateView.prototype._loadTemplate = function(callback) {

        if(this.constructor.hasOwnProperty(ns.TemplateView._TEMPLATE_KEY))
        {
            var dom = this.constructor[ns.TemplateView._TEMPLATE_KEY].cloneNode(true);
            this._exportSymbolRec(this, dom);
            this.dom.appendChild(dom);
            callback();
        }
        else {
            var that = this;
            this._loadTemplateWithoutCache(function() {
                that._loadTemplate(callback);
            });
        }
    };

    /**
     * load the template.
     * either by ajax request(debug mode), or by in-memory storage(release mode)
     * @param {Function} callback
     * @private
     */
    ns.TemplateView.prototype._loadTemplateWithoutCache = function(callback) {
        var that = this;
        var processInnerHTML = function(innerHTML) {
            var dom = document.createElement('div');
            dom.className = "templateWrap fill-height";
            dom.innerHTML = innerHTML;
            var stylesheet = that._separateStyleSheet(dom);
            if(stylesheet) that._preprocessAndAppendStyleSheet(stylesheet);
            that._addCssPreffixRec(dom);
            that.constructor[ns.TemplateView._TEMPLATE_KEY] = dom;
            callback();
        };
        if(ns.TemplateView.releases.hasOwnProperty(this._templatePath)) {
            processInnerHTML(ns.TemplateView.releases[this._templatePath]);
        }
        else {
            Util.get(this._templatePath, processInnerHTML);
        }

    };
    /**
     * exports all the symbols to namespace.eles, excluding itself.
     * if dom is a widget, stop exporting symbols, and remove it from DOM tree
     * @param {Object} namespace
     * @param {HTMLElement} dom
     * @private
     */
    ns.TemplateView.prototype._exportSymbolRec = function(namespace, dom) {
        var aChild = dom.children;
        for(var i=0; i<aChild.length; i++) {
            dom = aChild[i];
            var widgetName = dom.getAttribute(ns.TemplateView.WIDGET_ATTRIBUTE_NAME);
            if(widgetName) {
                namespace._widgets[widgetName] = dom;
                if(dom.parentNode) {
                    dom.parentNode.removeChild(dom);
                    i--;
                }
                continue;
            }

            var symbolName = dom.getAttribute(ns.TemplateView.SYMBOL_ATTRIBUTE_NAME);
            if(symbolName) {
                if(!namespace.hasOwnProperty('eles')) namespace.eles = {};
                if(!namespace.eles.hasOwnProperty(symbolName)) {
                    namespace.eles[symbolName] = dom;
                }
                else if(this.eles[symbolName] instanceof Array) {
                    namespace.eles[symbolName].push(dom);
                }
                else {
                    namespace.eles[symbolName] = [namespace.eles[symbolName], dom];
                }
            }

            this._exportSymbolRec(namespace, dom);
        }


    };
    /**
     * return and remove the first <style> element in an HTMLElement
     * @param {HTMLElement} dom
     * @return {HTMLElement|null} the stylesheet
     * @private
     */
    ns.TemplateView.prototype._separateStyleSheet = function(dom) {
        var aChild = dom.children;
        for(var i=0; i<aChild.length; i++) {
            var child = aChild[i];
            if(child.tagName.toLowerCase() === "style") {
                dom.removeChild(child);
                return child;
            }
        }
        return null;
    };
    /**
     *
     * @param {HTMLElement} css
     * @private
     */
    ns.TemplateView.prototype._preprocessAndAppendStyleSheet = function(css) {
        var str = css.innerHTML;
        var that = this;
        css.innerHTML = str.replace(/(^|})([^}]*)({)/g, function(m, p1, p2, p3) {
            return p1 + that._addCssPreffixForSelector(p2) + p3;
        });
        document.getElementsByTagName('head')[0].appendChild(css);

    };
    ns.TemplateView.prototype.onload = function() {};
})();
