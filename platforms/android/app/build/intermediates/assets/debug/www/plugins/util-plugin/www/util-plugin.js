cordova.define("util-plugin.MyUtils", function (require, exports, module) {
    var exec = require('cordova/exec');
    /**
     * MyToast :是plugin.xml中配置的feature的nema
     * showToast: 是js中调用的方法名
     */
    exports.showToast = function (arg0) {
        exec(null, null, "window.android", "utils", [arg0]);
    };
    exports.showToast2 = function (success, error, arg0) {
        exec(success, error, "window.android", "utils2", [arg0]);
    };
    exports.readIDCard = function (success, error, arg0) {
        exec(success, error, "window.android", "readIDCard", [arg0]);
    };

});
