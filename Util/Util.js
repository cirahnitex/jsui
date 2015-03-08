function Util() {

}
/**
 *
 * @param {Function} SubClass
 * @param {Function} BaseClass
 */
Util.inherit = function(SubClass, BaseClass) {
    var InheritHelper = function() {
    };
    InheritHelper.prototype = BaseClass.prototype;
    SubClass.prototype = new InheritHelper();
    SubClass.prototype.constructor = SubClass;
};
/**
 * make inheritance
 * @param {Function} BaseClass
 */
Function.prototype.extend = function(BaseClass) {
    Util.inherit(this, BaseClass);
};
Util.create_input = function(type) {
    if(typeof(type) === 'undefined') {
        type = 'text';
    }
    if(Util.browser.ie && parseInt(Util.browser.ie) <= 8) {
        var victim = document.createElement('div');
        victim.innerHTML = '<input type="' + type + '">';
        var rtn = victim.firstChild;
        return rtn;
    }
    else {
        var rtn = document.createElement('input');
        rtn.type = type;
        return rtn;
    }
};

Util.createElement = function(selector) {
    if(typeof(selector) === 'undefined') {
        selector = parent;
        parent = null;
    }

    var dom = null;
    if(selector instanceof HTMLElement) {
        dom = selector;
    }
    else if(selector instanceof Frame.View) {
        dom = selector.dom;
    }
    else if(typeof(selector) === 'string') {
        var regClassName = /\.([0-9a-zA-Z_\-]+)/g;
        var regId = /#([0-9a-zA-Z_\-]+)/;
        var regTag = /^([0-9a-zA-Z_\-]+)/;
        var regType = /\[type=['"]{0,1}([0-9a-zA-Z]+)['"]{0,1}\]/;

        var classNameArr = [];
        selector = selector.replace(regClassName, function(match, p1) {
            classNameArr.push(p1);
            return '';
        });

        var id = '';
        selector = selector.replace(regId, function(match, p1) {
            id = p1;
            return '';
        });

        var tag = '';
        selector = selector.replace(regTag, function(match, p1) {
            tag = p1;
            return '';
        });

        var type = '';
        selector = selector.replace(regType, function(match, p1) {
            type = p1;
            return '';
        });

        if(tag.length <= 0) tag = 'div';

        if(tag === 'input') {
            if(type.length <= 0) type = 'text';
            dom = Util.create_input(type);
        }
        else {
            dom = document.createElement(tag);
        }

        for(var i = 0; i < classNameArr.length; i++) {
            dom.classList.add(classNameArr[i]);
        }

        if(id.length > 0) {
            dom.id = id;
        }

    }
    else {
        dom = document.createElement('div');
    }

    return dom;

};
Util.post = {};
Util.setInnerHTML = function(ele, contents) {
    if(typeof(contents) === 'undefined') contents = 'undefined';
    else if(contents === null) contents = 'null';
    ele.innerHTML = contents.toString().replace(/</g, '&lt;');
};
HTMLElement.prototype.html = function(contents) {
    Util.setInnerHTML(this, contents);
};
Util.elementInDocument = function(element) {
    while(element = element.parentNode) {
        if(element == document) {
            return true;
        }
    }
    return false;
};
Util.URL_REGEX = new RegExp(
    "^(http|https|ftp)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$");

/**
 * generate a unique name
 * @returns {string}
 */
Util.uniqueName = function() {
    return Util._unique_name_preffix + Util.uniqueInt();
};
/**
 * generate a unique int
 * @returns {number}
 */
Util.uniqueInt = function() {
    return Util._unique_name_cnt++;
};
Util._unique_name_cnt = 0;
Util._unique_name_preffix = '_n';

/**
 * find a enum value within an integer array, useful when analyzing multiple optional enum arguments
 * @param {Object} enumObj the enum definition
 * @param {Number[]} args the arguments
 * @param {Number} [offset=0] from this offset of the integer array, start finding. default is 0
 * @returns {Number|null} null if not found
 */
Util.getEnumFromArgs = function(enumObj, args, offset) {
    offset = offset || 0;
    for(var i=offset; i<args.length; i++) {
        var arg = args[i];
        for(var key in enumObj) {
            if(!enumObj.hasOwnProperty(key))continue;
            if(arg === enumObj[key]) return arg;
        }
    }
    return null;
};
