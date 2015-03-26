/**
 *
 * @constructor Frame
 * @event location_changed
 */
function Frame() {
    Util.Evtable.call(this);

    this.root = null;
    this._hashListenerEnabled = true;

}
Util.inherit(Frame, Util.Evtable);

/**
 * set the framework SiteLocation
 * @param siteLocation {SiteLocation}
 */
Frame.prototype.setLocation = function(siteLocation) {
    this.root.setLocation(siteLocation);
    // avoid nested location set while setting a location
    /*
    this._hashListenerEnabled = false;



    setTimeout(function() {
        frame._hashListenerEnabled = true;
    }, 10);*/

};


/**
 * the location of this framework needs an update!
 * update hash and do some pushState
 */
Frame.prototype.updateLocation = function() {
    // get current updated location
    var siteLocation = this.root.getLocation();

    var newHash = siteLocation.get_hash();

    // nothing has changed, do nothing
    if(location.hash == newHash) return;

    // record this new location to history and update hash
    history.replaceState(newHash, '', newHash);

};

Frame.main = function() {
    window.frame = null;
    window.addEventListener('load',function() {
        Frame.TemplateView.releasePreloadTemplate();
        window.frame = new Frame();
        frame.root = new Root();

        frame.setLocation(new Frame.SiteLocation(document.location.hash));
        var view = Frame.createDefaultView(frame.root);
        document.body.appendChild(view.dom);
    });
    window.onhashchange = function() {
        if(!frame._hashListenerEnabled) return;
        var siteLocation = new Frame.SiteLocation(document.location.hash);
        frame.setLocation(siteLocation);

    };
    window.addEventListener('popstate', function(e) {
        if(!frame._hashListenerEnabled) return;

        if(e.state) {
            var siteLocation = new Frame.SiteLocation(e.state);
            frame.setLocation(siteLocation);
        }
    });
};

/**
 * create a default view of a controller.
 * @param {Util.Observable} ctrl
 * @returns {Frame.View}
 */
Frame.createDefaultView = function(ctrl) {
    var View = ctrl.constructor.View || Frame.View;

    // prepare the args array
    var args = [window, ctrl];
    for(var i=0; i<arguments.length; i++) {
        args.push(arguments[i]);
    }

    var view = new (Function.prototype.bind.apply(View, args));
    ctrl.addObserver(view);
    return view;
};

Frame.main();
