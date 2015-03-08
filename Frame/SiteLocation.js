(function() {
    var ns = Frame;
    ns.SiteLocation = function(hash) {
        this.locationArr = [];
        if(hash) {
            this.read_hash(hash);
        }
    };
    ns.SiteLocation.prototype.read_hash = function(hash) {
        this.locationArr = [];
        if(!hash) {
            return this;
        }
        if(hash.charAt(0) === '#') {
            hash = hash.substr(1);
        }
        var hashArr = hash.split('/');
        for(var i = hashArr.length - 1; i >= 0; i--) {
            var location = [];
            location[0] = hashArr[i];
            this.locationArr.push(location);

        }
        return this;

    };
    ns.SiteLocation.prototype.get_hash = function() {
        var hashArr = [];
        for(var i = this.locationArr.length - 1; i >= 0; i--) {
            hashArr.push(this.locationArr[i][0]);
        }
        return '#' + hashArr.join('/');
    };
    ns.SiteLocation.prototype.push = function(domKey, displayName) {
        if(typeof(displayName) === 'undefined') {
            displayName = domKey;
        }

        this.locationArr.push([domKey, displayName]);
        return this;
    };
    ns.SiteLocation.prototype.pop = function() {
        var item = this.locationArr.pop();
        if(!item) {
            return '';
        }
        else {
            return item[0];
        }
    };
    ns.SiteLocation.prototype.list_reverse = function() {
        return this.locationArr.slice(0).reverse();
    };
    ns.SiteLocation.prototype.up = function(domKey) {
        var rtn = new ns.SiteLocation();

        if(typeof(domKey) === 'undefined') {
            rtn.locationArr = this.locationArr.slice(1);
            return rtn;
        }

        for(var i = 0; i < this.locationArr.length; i++) {
            if(this.locationArr[i][0] === domKey) {
                rtn.locationArr = this.locationArr.slice(i);
                return rtn;
            }
        }
        rtn.locationArr = this.locationArr;
        return rtn;
    };
    ns. SiteLocation.prototype.cd = function(pathStr) {
        if(pathStr[0] == '/') return new ns.SiteLocation(pathStr.substr(1));
        var domKeyArr = pathStr.split('/');
        var rtn = this;
        for(var i = 0; i < domKeyArr.length; i++) {
            rtn = rtn.cd_single(domKeyArr[i]);
        }
        return rtn;
    };
    ns.SiteLocation.prototype.cd_single = function(domKey) {
        if(domKey === '..') {
            return this.up();
        }
        if(domKey === '.') {
            return this.clone();
        }

        var rtn = new ns.SiteLocation();
        rtn.locationArr = this.locationArr.slice(0);
        rtn.locationArr.unshift([domKey]);
        return rtn;
    };
    ns.SiteLocation.prototype.clone = function() {
        var rtn = new ns.SiteLocation();
        rtn.locationArr = this.locationArr.slice(0);
        return rtn;
    };
    ns.SiteLocation.prototype.get_dom_key = function(i) {
        i = i || 0;
        return this.locationArr[i][0];
    };
    ns.SiteLocation.prototype.getRouteTitle = function(i) {
        i = i || 0;
        return this.locationArr[i][1];
    };
})();
