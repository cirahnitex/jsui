(function() {
    var ns = Root.TranslateGame.ArchiveExplorer;
    ns.View = function(ctrl) {
        Frame.TemplateView.call(this, "Root/TranslateGame/ArchiveExplorer/template.html", ctrl);
        this.applyTemplate();
    };
    ns.View.extend(Frame.TemplateView);
    ns.View.prototype.update = function(state) {
        if(this.isTemplateLoading) return;
        var that = this;
        var eles = this.eles;
        var ctrl = this._ctrl;

        switch(state) {
        case ns.state.REFRESHED:
            eles.archiveTabContainer.innerHTML = '';
            for(var i=0; i<ctrl.aArchive.length; i++) {
                var archive = ctrl.aArchive[i];
                var archiveTab = this.createElement(eles.archiveTabContainer, '.archiveTab', archive.translationH);
                (function(i, archiveTab) {
                    archiveTab.onclick = function() {
                        ctrl.select(i);
                    }
                })(i, archiveTab);

            }
            if(ctrl.aArchive.length>0) ctrl.select(0);
            break;
        case ns.state.SELECTION_CHANGE:
            var aArchiveTab = this.querySelectorAll(".archiveTab");
            for(var i=0; i<aArchiveTab.length; i++) {
                aArchiveTab[i].classList.remove('active');
            }
            aArchiveTab[ctrl.selectedIndex].classList.add('active');
            eles.contentWrap.innerHTML = '';
            var view = ctrl.getSelectedArchive().getDefaultView();
            eles.contentWrap.appendChild(view.dom);
            break;
        }
    }
})();
