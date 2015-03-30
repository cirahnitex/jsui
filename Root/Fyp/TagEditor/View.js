(function() {
    var ns = Root.Fyp.TagEditor;
    ns.View = function(ctrl) {
        Frame.TemplateView.call(this, "Root/Fyp/TagEditor/template.html", ctrl);
        this.arrayInputable = null;
        this.applyTemplate();
    };
    ns.View.extend(Frame.TemplateView);
    ns.View.prototype.onload = function() {
        var ctrl = this._ctrl;
        var that = this;
        this.eles.btnSubmit.onclick = function() {
            ctrl.requestCommit(that.arrayInputable.getValue());
        };
        this.eles.btnCancel.onclick = function() {
            ctrl.close();
        };
        if(this._ctrl.getObservableState() !== ns.state.REFRESHED) return;
        this._displayTag();
    };
    ns.View.prototype.update = function(state) {
        if(this.isTemplateLoading) return;
        switch(state) {
        case ns.state.REFRESHED:
            this._displayTag();
        }
    };
    ns.View.prototype._displayTag = function() {
        var ArrayInputable = Root.Widget.Inputable.Array;
        var aTag = this._ctrl.aTag;
        var arrayInputable = new ArrayInputable();
        this.arrayInputable = arrayInputable;
        for(var i=0; i<aTag.length; i++) {
            var tag = aTag[i];
            var select = this._createTagSelect();
            arrayInputable.pushInput(select);
            select.setValue(tag);
        }
        var view = arrayInputable.getDefaultView();
        var tagWrap = this.eles.tagWrap;
        tagWrap.innerHTML = '';
        tagWrap.appendChild(view.dom);

        var that = this;
        // push event
        this.eles.btnPush.onclick = function() {
            var select = that._createTagSelect();
            arrayInputable.pushInput(select);
        };
    };
    ns.View.prototype._createTagSelect = function() {
        var Select = Root.Widget.Inputable.Select;
        var aAllTag = this._ctrl.aAllTag;
        var rtn = new Select();
        for(var i=0; i<aAllTag.length; i++) {
            rtn.addOption(aAllTag[i]);
        }
        return rtn;
    };
})();
