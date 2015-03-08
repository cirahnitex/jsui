(function() {
    var ns = Root.Fyp.LearnMore;
    ns.View = function(ctrl) {
        Frame.TemplateView.call(this, "Root/Fyp/LearnMore/template.html", ctrl);
        this.dom = this.createElement('.container');

        this.applyTemplate();
    };
    ns.View.extend(Frame.TemplateView);
    ns.View.prototype.onload = function() {

    };
    ns.View.prototype.update = function(state) {
        if(this.isTemplateLoading) return;
    }
})();
