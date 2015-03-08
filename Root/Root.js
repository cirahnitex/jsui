(function() {

    var ns = window;
    ns.Root = function() {
        Frame.Routable.call(this);

        this.toastMask = new Root.Widget.Toast.Mask();

        this.bindRoute("HelloWorld", function() {
            return new Root.HelloWorld();
        });

        this.bindRoute("Fyp", function() {
            return new Root.Fyp();
        });
        this.bindRoute("Widget", function() {
            return new Root.Widget();
        });
        this.bindRoute('DataUrl', function() {
            return new Root.DataUrl();
        });
        this.bindRoute('TranslateGame', function() {
            return new Root.TranslateGame();
        });
        this.bindRoute(/.*/, function() {
            return new Root.TranslateGame();
        });

    };
    ns.Root.extend(Frame.Routable);
    /**
     *
     * @param {string} msg
     * @param {Object} [type=Root.Widget.Toast.type.SUCCESS]
     * @param {Object} [duration=Root.Widget.Toast.duration.SHORT]
     */
    ns.Root.prototype.toast = function(msg, type, duration) {
        this.toastMask.showToast(new Root.Widget.Toast(msg, type, duration));
    };
})();
