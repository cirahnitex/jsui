(function() {
    var ns = Root;
    /**
     *
     * @constructor Root.DataUrl
     * @arguments Frame.Routable
     */
    ns.DataUrl = function() {
        Frame.Routable.call(this);
        this.routeKey = 'DataUrl';

        this.dataUrl = '';

        if(!this._checkBrowserSupport()) return;
        this.setChanged(ns.DataUrl.state.NORMAL);
    };
    ns.DataUrl.extend(Frame.Routable);
    ns.DataUrl.state = {
        NORMAL:Util.uniqueInt(),
        BROWSER_NOT_SUPPORTED:Util.uniqueInt(),
        SUCCEED:Util.uniqueInt()
    };
    ns.DataUrl.prototype._checkBrowserSupport = function() {
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Great success! All the File APIs are supported.

            return true;
        } else {
            this.setChanged(ns.DataUrl.state.BROWSER_NOT_SUPPORTED);
            this.notifyObservers();
            return false;
        }
    };
    /**
     * read a file
     * @param {File} f
     */
    ns.DataUrl.prototype.readFile = function(f) {
        var reader = new FileReader();

        var that = this;
        // Closure to capture the file information.
        reader.onload = function(e) {
            that.dataUrl = e.target.result;
            that.setChanged(ns.DataUrl.state.SUCCEED);
            that.notifyObservers();
        };

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);

    };
})();
