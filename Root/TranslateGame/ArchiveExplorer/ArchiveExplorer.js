(function() {
    var ns = Root.TranslateGame;
    var Api = Root.TranslateGame.Api;
    var Archive = Root.TranslateGame.Archive;
    ns.ArchiveExplorer = function() {
        Frame.Routable.call(this);
        this.aArchive = [];
        this.requestRefresh();
        this.selectedIndex = null;
    };
    ns.ArchiveExplorer.extend(Frame.Routable);
    ns.ArchiveExplorer.state = {
        REFRESHED:Util.uniqueInt(),
        SELECTION_CHANGE:Util.uniqueInt(),
    };
    ns.ArchiveExplorer.prototype.requestRefresh = function() {
        var that = this;
        Api.request("/game/listArchive",{},function(aServerArchiveJson) {
            that.aArchive = [];
            for(var i=0; i<aServerArchiveJson.length; i++) {
                var archive = Archive.fromServerJson(aServerArchiveJson[i]);
                that.aArchive.push(archive);
            }
            that.notifyObservers(ns.ArchiveExplorer.state.REFRESHED);
        });
    };
    ns.ArchiveExplorer.prototype.select = function(i) {
        if(this.selectedIndex === i) return;
        this.selectedIndex = i;
        this.notifyObservers(ns.ArchiveExplorer.state.SELECTION_CHANGE);

    };
    ns.ArchiveExplorer.prototype.getSelectedArchive = function() {
        return this.aArchive[this.selectedIndex];
    }
})();
