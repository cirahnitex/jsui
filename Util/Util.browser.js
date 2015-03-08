Util.browser =
{
    firefox: false,
    chrome: false,
    ie: false,
    opera: false,
    safari: false,
    mobile: false,
    Preffix: "",
    JsPreffix: "",
    ANIMATION_INTERVAL: 34
};

var ua = navigator.userAgent.toLowerCase();
window.cancelRequestAnimationFrame = window.cancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || function() {
};
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function(func) {
    return setTimeout(func, 66);
};
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.AudioContext = window.AudioContext ||
    window.webkitAudioContext;
if(ua.indexOf("mobile") > 0) {
    Util.browser.mobile = true;
    Util.browser.phonegap = true;
    Util.browser.Preffix = "-webkit-";
    Util.browser.JsPreffix = 'Webkit';
}
else if(ua.indexOf("firefox/") > 0) {
    Util.browser.firefox = ua.match(/firefox\/([\d.]+)/)[1];
    Util.browser.Preffix = "-moz-";
    Util.browser.JsPreffix = 'Moz';
}
else if(ua.indexOf("chrome") > 0) {
    Util.browser.chrome = ua.match(/chrome\/([\d.]+)/)[1];
    Util.browser.Preffix = "-webkit-";
    Util.browser.JsPreffix = 'Webkit';
}
else if(window.ActiveXObject) {
    Util.browser.ie = ua.match(/msie ([\d.]+)/)[1];
    Util.browser.Preffix = "-ms-";
    Util.browser.JsPreffix = 'Ms';
}
else if(window.opera) {
    Util.browser.opera = ua.match(/opera.([\d.]+)/)[1];
    Util.browser.Preffix = "-o-";
    Util.browser.JsPreffix = 'O';
}
else if(window.openDatabase) {
    Util.browser.safari = ua.match(/version\/([\d.]+)/)[1];
    Util.browser.safari = true;
    Util.browser.Preffix = "-webkit-";
    Util.browser.JsPreffix = 'Webkit';
}
