(function() {
    var ns = Root.HelloWorld;
    ns.View = function(ctrl) {
        Frame.View.call(this,ctrl);

        this._text = null;
        this._childWrap = null;
        var dom = this.createElement();
        this.dom = dom;
        {
            var text = this.createElement('.text');
            this._text = text;
            dom.appendChild(text);
            {
                text.innerHTML = "hello world";
            }

            var childWrap = this.createElement();
            this._childWrap = childWrap;
            dom.appendChild(childWrap);
        }
    };
    ns.View.extend(Frame.View);
    ns.View.prototype.update = function(state) {
        this._childWrap.innerHTML = "";
        switch(state) {
        case Frame.Routable.state.ROUTE_CHANGED:
            var view = Frame.createDefaultView(this._ctrl.getRouteChild());
            this._childWrap.appendChild(view.dom);
        }
    };
    ns.View.css = {
        '.text':{
            'color':'hsl(180, 50%, 50%)',

        }
    }
})();
