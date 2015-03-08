(function() {
    var ns = Root;
    /**
     *
     * @constructor Root.Widget
     * @arguments Frame.Routable
     */
    ns.Widget = function() {
        Frame.Routable.call(this);
        this.bindRoute(/Toast/, function() {
            var mask = new ns.Widget.Toast.Mask();
            var toast1 = new Root.Widget.Toast("toast1");
            mask.showToast(toast1);
            return mask;
        });

    };
    ns.Widget.extend(Frame.Routable);

})();
