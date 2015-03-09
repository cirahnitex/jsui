(function() {
    var ns = Root.Widget.Inputable.Select;
    ns.View = function(ctrl) {
        Frame.TemplateView.call(this, "Root/Widget/Inputable/Select.html", ctrl);
        this.applyTemplate();
    };
    ns.View.extend(Frame.TemplateView);
    ns.View.OPTION_DOM_OPTION_VARNAME = Util.uniqueName();
    ns.View.prototype.onload = function() {
        var that = this;
        var ctrl = this._ctrl;

        // focus this widget when the input dom is focused
        this.eles.input.addEventListener('focus', function() {
            that._ctrl.focus();
        });

        // commit the value and blur the widget when the input dom is blurred, with a short delay.
        // because we need a short amount of time to click the option.
        this.eles.input.addEventListener('blur', function() {
            that._commitValue();
            setTimeout(function() {
                that._ctrl.blur();
            }, 100);
        });

        // give some hint when typing into the input
        this.eles.input.addEventListener('keyup', function(e) {
            switch(e.which) {
            case 38:
                that._hoverPreviousOption();
                break;
            case 40:
                that._hoverNextOption();
                break;
            case 13:
                that._selectHoveredOption();
                break;
            }
            var searchResult = ctrl.searchOption(this.value);
            that._displaySearchedOptions(searchResult);
            that._hoverFirstOption();
        });

        // list all options
        var aOption = this._ctrl.listOption();
        var _option = ns.View.OPTION_DOM_OPTION_VARNAME;

        // for each option
        for(var i=0; i<aOption.length; i++) {
            var option = aOption[i];

            // create a dom to display the option
            var optionDom = this.createWidget(this.eles.optionWrap,'option',option.getDisplay());
            optionDom[_option] = option;

            // mouseover the dom to hover
            optionDom.onmouseover = function() {
                that._hoverOption(this);
            };

            // click the dom to select the option
            optionDom.onmousedown = function() {
                that._selectHoveredOption();
            };
        }
    };

    ns.View.prototype.update = function(state) {
        if(this.isTemplateLoading)return;
        switch(state) {
        case ns.state.FOCUSED:
            this.eles.wrap.classList.add('focused');
            this._hoverFirstOption();
            break;
        case ns.state.BLURRED:
            this.eles.wrap.classList.remove('focused');
            break;

        }
    };
    /**
     * display searched result
     * @param {Root.Widget.Inputable.Select.Option[]} aSearchedOption
     * @private
     */
    ns.View.prototype._displaySearchedOptions = function(aSearchedOption) {

        // select all option dom
        var aDom = this.querySelectorAll('.option');

        // for each option dom
        for(var i=0; i<aDom.length; i++) {
            var dom = aDom[i];

            // check whether it is in search result
            var option = dom[ns.View.OPTION_DOM_OPTION_VARNAME];
            if(aSearchedOption.indexOf(option) >= 0) {

                // if true, un-hide
                dom.classList.remove('hide');
            }
            else {

                // else, hide
                dom.classList.add('hide');
            }
        }
    };
    /**
     * add .hover to an option and remove .hover to all others
     * @param {HTMLElement} optionDom
     * @private
     */
    ns.View.prototype._hoverOption = function(optionDom) {
        // select all option dom
        var aDom = this.querySelectorAll('.option');

        // for each option dom
        for(var i=0; i<aDom.length; i++) {
            var dom = aDom[i];

            // remove .hover
            dom.classList.remove('hover');

            // if it is what should be hovered, add .hover
            if(dom === optionDom) {
                dom.classList.add('hover');
            }
        }
    };
    ns.View.prototype._hoverFirstOption = function() {
        this._hoverOption(this.querySelector('.option:not(.hide)'));
    };
    /**
     * hover previous option
     * @private
     */
    ns.View.prototype._hoverPreviousOption = function() {
        // select the hovered option
        var dom = this.querySelector('.option.hover');

        // if exists, hover its previous sibling
        if(dom) {
            var sib = dom.previousSibling;

            // if its an element, hover it
            if(sib instanceof HTMLElement) this._hoverOption(sib);
            return;
        }
        // if not, hover the first option
        var dom = this.querySelector('.option');
        this._hoverOption(dom);
    };
    /**
     *
     * @private
     */
    ns.View.prototype._hoverNextOption = function() {
        // select the hovered option
        var dom = this.querySelector('.option.hover');

        // if exists, hover its next sibling
        if(dom) {
            var sib = dom.nextSibling;

            // if its an element, hover it
            if(sib instanceof HTMLElement) this._hoverOption(sib);
            return;
        }
        // if not, hover the first option
        var dom = this.querySelector('.option');
        this._hoverOption(dom);

    };
    ns.View.prototype._selectHoveredOption = function() {
        // select the hovered option
        var option = this.querySelector('.option.hover');

        // do nothing if no option is hovered
        if(!option) return;

        // get its display string
        option = option[ns.View.OPTION_DOM_OPTION_VARNAME];
        // fill into the input
        //noinspection JSPrimitiveTypeWrapperUsage
        this.eles.input.value = option.getDisplay();

        // commit value
        this._ctrl.setValue(option.value);

    };
    ns.View.prototype._commitValue = function() {
        // get content in input
        var display = this.eles.input.value;

        // list all options
        var aOption = this._ctrl.listOption();

        for(var i=0; i<aOption.length; i++) {
            var option = aOption[i];

            // find the option that match the input content
            // commit that value
            if(option.getDisplay() === display) {
                this._ctrl.setValue(option.value);
                return;
            }

        }

        // commit the content if no matching option found
        this._ctrl.setValue(display);

    };
})();
