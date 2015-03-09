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


        this.updateChild();

        var that = this;
        ctrl.bind(Frame.Routable.event.ROUTE_CHANGED,function() {
            that.updateChild();
        });

    };
    ns.View.extend(Frame.View);
    ns.View.prototype.updateChild = function() {
        this._childWrap.innerHTML = "";
        var view = Frame.createDefaultView(this._ctrl.getRouteChild());
        this._childWrap.appendChild(view.dom);
    };

    ns.View.prototype.update = function(state) {

    };
    ns.View.css = {
        '.text':{
            'color':'hsl(180, 50%, 50%)',

        }
    }
})();
