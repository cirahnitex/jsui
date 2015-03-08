(function() {
    var ns = Root.Widget.Toast;
    ns.View = function(ctrl) {
        Frame.View.call(this, ctrl);
        this.dom = this.createElement('.alert.alert-dismissable');
        this._text = null;
        {
            var btn = this.createElement(this.dom, 'button.close');
            this._text = this.createElement(this.dom);
        }


        // bind events
        var that = this;
        this.dom.addEventListener('click', function() {
            that._ctrl.beginDismiss();
        });
    };
    ns.View.extend(Frame.View);
    ns.View.DISMISSING_DURATION = 500;
    ns.View.css = {
        '.alert': {
            'transition':ns.View.DISMISSING_DURATION + 'ms'
        }
    };
    ns.View.prototype.update = function(state) {
        var classList = this.dom.classList;

        // remove all colors
        classList.remove('alert-success');
        classList.remove('alert-info');
        classList.remove('alert-warning');
        classList.remove('alert-danger');

        // add colors
        switch(this._ctrl.type) {
        case ns.type.SUCCESS:
            classList.add('alert-success');
            break;
        case ns.type.INFO:
            classList.add('alert-info');
            break;
        case ns.type.WARNING:
            classList.add('alert-warning');
            break;
        case ns.type.ERROR:
            classList.add('alert-danger');
            break;
        }

        // set text
        this._text.innerHTML = this._ctrl.msg;

        switch(state) {
        case ns.state.NORMAL:
            this.dom.style.opacity = 1;
            break;
        case ns.state.DISMISSING:
            this.dom.style.opacity = 0;
            var that = this;
            setTimeout(function() {
                that._ctrl.dismiss();
            }, ns.View.DISMISSING_DURATION);
            break;
        case ns.state.DISMISSED:
            this.dom.style.display = 'none';
            break;
        }

    };
})();
