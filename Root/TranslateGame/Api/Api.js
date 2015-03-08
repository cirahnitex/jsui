(function() {
    var ns = Root.TranslateGame;
    ns.Api = function() {

    };

    if(location.port == 8080) {
        ns.Api.SERVER = "";
    }
    else {
        ns.Api.SERVER = "http://localhost:8080";
    }

    ns.Api.request = function(path, data, callback, onerror) {
        if(path[0] !== "/") path = "/" + path;
        if(typeof(data) === 'function') {
            onerror = callback;
            callback = data;
            data = {};
        }
        if(!onerror) onerror = function(){};
        Util.jsonp(ns.Api.SERVER + path, data, function(r) {
            r = ns.Api.returnStrToJson(r);
            if(!r) {
                console.error("api request failed");
                onerror(0);
                return;
            }
            if(!ns.Api.rtnCodeGlobalCheck(r.code)) {
                onerror(r.code);
                return;
            }
            Root.TranslateGame.Api.Notification.getInstance().start();
            callback(r.value, r.code, r.value);

        }, function() {
            var Toast = Root.Widget.Toast;
            frame.root.toast("Server unreachable.", Toast.type.ERROR);
            onerror(0);
        });
    };
    ns.Api.request.callback = function(value, rtnCode, rtnValue){};
    ns.Api.returnStrToJson = function(str) {
        var rtn;
        if(typeof(str) === 'string') {
            try {
                rtn = eval("(" + str + ")");
            }
            catch(e) {
                return false;
            }
        }
        else {
            rtn = str;
        }

        if(typeof(rtn) !== 'object') return false;
        if(typeof(rtn.code) !== 'number') return false;
        if(typeof(rtn.msg) !== 'string') return false;
        if(!rtn.hasOwnProperty('value')) return false;
        return rtn;
    };
    ns.Api.rtnCodeGlobalCheck = function(rtnCode) {
        switch(rtnCode) {
        case 400:
            console.error("api request failed");
            return true;
        case 401:
            Root.TranslateGame.Api.Notification.getInstance().stop();
            location.hash = "#TranslateGame/Welcome";
            return false;
        }
        return true;
    }
})();
