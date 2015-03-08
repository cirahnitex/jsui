(function() {
    var ns = Root.Widget.Toast.Mask;
    ns.View = function(ctrl) {
        Frame.View.call(this, ctrl);
        this.dom = this.createElement('.mask');

        // the variable name for storing view inside toast ctrl,
        // to keep track of whether a toast ctrl has a view created
        this.viewVarName = Util.uniqueName();


    };
    ns.View.extend(Frame.View);
    ns.View.css = {
        '.mask': {
            position:'fixed',
            left:'15%',
            bottom:'15%',
            width:'60%',
            "z-index":'9',
        },
        '.item': {
            margin:'5px'
        }
    };
    ns.View.prototype.update = function(state) {
        switch(state) {
        case ns.state.CHANGED:
            this._refresh();
            break;
        }
    };
    ns.View.prototype._refresh = function() {
        this.dom.innerHTML = '';
        var aToast = this._ctrl.aToast;
        for(var i=0; i<aToast.length; i++) {
            var view = this._getViewOfToast(aToast[i]);
            this.dom.appendChild(view.dom);
        }
    };
    ns.View.prototype._getViewOfToast = function(toast) {
        if(toast.hasOwnProperty(this.viewVarName)) return toast[this.viewVarName];
        toast[this.viewVarName] = Frame.createDefaultView(toast);
        return toast[this.viewVarName];
    }

})();
