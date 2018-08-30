cordova.define("util-plugin.MyUtils", function(require, exports, module) {
var exec = require('cordova/exec');
/**
 * MyToast :是plugin.xml中配置的feature的nema
 * showToast: 是js中调用的方法名
 */
exports.showToast = function(arg0) {
    exec(null, null, "MyUtils", "utils", [arg0]);
};
});
