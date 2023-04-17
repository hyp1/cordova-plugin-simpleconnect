# cordova-plugin-simpleconnect
SimpleConnect Plugin for Cordova

 cordova.plugins.SimpleConnectPlugin.init("https://localhost",function(success){},function(error){});
 cordova.plugins.SimpleConnectPlugin.register({username:"demo",password:"pass",email:"email@email.com"},function(success){},function(error){});
 cordova.plugins.SimpleConnectPlugin.login({username:"demo",password:"pass",function(success){},function(error){});
 cordova.plugins.SimpleConnectPlugin.logout(function(success){},function(error){});
 cordova.plugins.SimpleConnectPlugin.request({method:"post",path:"/api",data:{myvar:'myvalue'},contentType:'application/json'},function(success){},function(error{});