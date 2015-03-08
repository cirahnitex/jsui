Util.Set = function() {
    this.dataArr = [];
};
Util.Set.prototype.add = function(data) {
    if(this.contains(data)) {
        return false;
    }
    this.dataArr.push(data);
    return true;
};
Util.Set.prototype.count = function() {
    return this.dataArr.length;
};
Util.Set.prototype.remove = function(data) {
    var i = this.dataArr.indexOf(data);
    if(i >= 0) {
        this.dataArr.splice(i, 1);
        return true;
    }
    return false;
};
Util.Set.prototype.for_each = function(callback) {
    this.dataArr.forEach(callback);
};
Util.Set.prototype.contains = function(data) {
    return this.dataArr.indexOf(data) >= 0;
};
Util.Set.prototype.to_array = function() {
    return this.dataArr.slice(0);
};
