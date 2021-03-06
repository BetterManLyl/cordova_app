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
    exports.readIDCard = function (success, error, arg0) {
        exec(success, error, "android", "readIDCard", [arg0]);
    };

    exports.takePhoto = function (success, error, arg0) {
        exec(success, error, "android", "takePhoto", [arg0]);
    };

    exports.closeCamera = function (success, error, arg0) {
        exec(success, error, "android", "closeCamera", [arg0]);
    };

    exports.getSIMCardInfo = function (success, error, arg0) {
        exec(success, error, "android", "getSIMCardInfo", [arg0]);
    };

    exports.writeSIMCard = function (success, error, arg0) {
        exec(success, error, "android", "writeSIMCard", [arg0]);
    };

    exports.popSIMCard = function (success, error, arg0) {
        exec(success, error, "android", "popSIMCard", [arg0]);
    };
    exports.printTicket = function (success, error, arg0) {
        exec(success, error, "android", "printTicket", [arg0]);
    };

    exports.checkMachine = function (success, error, arg0) {
        exec(success, error, "android", "checkMachine", [arg0]);
    };
    exports.getITermInfo = function (success, error, arg0) {
        exec(success, error, "android", "getITermInfo", [arg0]);
    };

});
