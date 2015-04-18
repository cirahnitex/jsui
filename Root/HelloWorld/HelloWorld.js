(function() {
    var ns = Root;
    ns.HelloWorld = function() {
        Frame.Routable.call(this);


        Util.get("res/WangDing.json", function(gml) {
             window.g = gml;
        });

    };
    ns.HelloWorld.extend(Frame.Routable);
})();
