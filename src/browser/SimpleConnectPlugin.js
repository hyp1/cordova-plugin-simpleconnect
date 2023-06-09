var exec = require("cordova/exec");

module.exports = {

coolMethod:function (successCallback, errorCallback, [arg0]){
    console.log("BrowserProxy coolMethod");
    successCallback(arg0);
    //exec(successCallback, errorCallback, 'SimpleConnectPlugin', 'coolMethod', arg0);
},

init:function (successCallback, errorCallback, [arg0]){
    console.log("BrowserProxy init");
    successCallback(arg0);
},

connect:function (successCallback, errorCallback, [arg0]){
    console.log("BrowserProxy connect");
    successCallback(arg0);
},

login:function (successCallback, errorCallback, [arg0]){
    console.log("BrowserProxy login");
    successCallback(arg0);
},

register:function (successCallback, errorCallback, [arg0]){
    console.log("BrowserProxy register");
    successCallback(arg0);
},

logout:function (successCallback, errorCallback, [arg0]){
    console.log("BrowserProxy logout");
    successCallback(arg0);
},

request:function (successCallback, errorCallback, [arg0]){
    console.log("BrowserProxy request");
    successCallback(arg0);
 },

};

//The proxy will be available for the Cordova
require("cordova/exec/proxy").add("SimpleConnectPlugin", module.exports);
//require("cordova/exec/proxy").add("SimpleConnectPlugin", cordova.plugins.SimpleConnectPlugin);



