cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.adobe.plugins.GAPlugin/www/GAPlugin.js",
        "id": "com.adobe.plugins.GAPlugin.GAPlugin",
        "clobbers": [
            "GAPlugin"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.PushPlugin/www/PushNotification.js",
        "id": "com.phonegap.plugins.PushPlugin.PushNotification",
        "clobbers": [
            "PushNotification"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.adobe.plugins.GAPlugin": "2.3.1",
    "com.phonegap.plugins.PushPlugin": "2.3.1",
    "com.phonegap.plugins.facebookconnect": "0.4.0",
    "com.phonegap.plugin.statusbar": "1.1.0",
    "org.apache.cordova.geolocation": "0.3.11-dev"
}
// BOTTOM OF METADATA
});