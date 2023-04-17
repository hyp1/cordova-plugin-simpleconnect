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

logout:function (successCallback, errorCallback, [arg0]){
    console.log("BrowserProxy logout");
    successCallback(arg0);
},

request:function (successCallback, errorCallback, [arg0]){
    console.log("BrowserProxy request");
    successCallback(arg0);
 },

};

/*
var SimpleConnectPlugin = {

    coolMethod: function (successCallback, errorCallback, [arg0]) {
        try {
            var response = "browser SimpleConnect coolMethod: " + [arg0];
            successCallback(response);
        } catch(err) {
            errorCallback(err)
        }
    },
  init: function (successCallback, errorCallback, [arg0]) {
        try {
            var response = "browser SimpleConnect init: " + [arg0];
            successCallback(response);
        } catch(err) {
            errorCallback(err)
        }
    },
          token: function (successCallback, errorCallback) {
                try {
                    var response = "browser SimpleConnect token: ";
                    successCallback(response);
                } catch(err) {
                    errorCallback(err)
                }
            },
      connect: function (successCallback, errorCallback) {
            try {
                var response = "browser SimpleConnect connect: ";
                successCallback(response);
            } catch(err) {
                errorCallback(err)
            }
        },

      login: function (successCallback, errorCallback,) {
            try {
                var response = "browser SimpleConnect login: ";
                successCallback(response);
            } catch(err) {
                errorCallback(err)
            }
        },

      logout: function (successCallback, errorCallback,) {
                  try {
                        var response = "browser SimpleConnect logout: ";
                        successCallback(response);
                    } catch(err) {
                        errorCallback(err)
                    }
                },
      register: function (successCallback, errorCallback,) {
            try {
                var response = "browser SimpleConnect register: ";
                successCallback(response);
            } catch(err) {
                errorCallback(err)
            }
        },
      connect: function (successCallback, errorCallback,) {
            try {
                var response = "browser SimpleConnect connect: ";
                successCallback(response);
            } catch(err) {
                errorCallback(err)
            }
        },
};
module.exports = SimpleConnectPlugin
*/

//The proxy will be available for the Cordova
require("cordova/exec/proxy").add("SimpleConnectPlugin", module.exports);
//require("cordova/exec/proxy").add("SimpleConnectPlugin", cordova.plugins.SimpleConnectPlugin);



