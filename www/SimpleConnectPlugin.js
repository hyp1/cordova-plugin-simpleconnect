var exec = require('cordova/exec');
var sc;
class SimpleConnect{

    constructor(host,async=true){
        this.host=host;
        this._async=async;
        this._token=null;
        console.log("AWRI constructed: "+ this.host+' sync='+this._async);
    }

    setCSRFToken(token) {
            this._token=token;
    }

    token() {
        return this.request('GET', "rest/simpleconnect/token");
    }

    connect() {
        return this.request('POST', "rest/simpleconnect/connect?_format=json");
    }

    login(username,password) {
        let postData = {
            "username": username,
            "password": password
            }
        return this.request('POST', "rest/simpleconnect/login?_format=json", postData);
    }

    logout() {
        return this.request('POST', "rest/simpleconnect/logout?_format=json");
    }

    register(username, password, email) {
        let request = {
            email: email,
            username: username,
            password:password
            }
        return this.request('POST', "rest/simpleconnect/register?_format=json",request);

    }

    async request(method="GET",path="",data,content_type="application/json",async=true) {
        let t=this._token;
        return new Promise(function (resolve, reject){
            var xmlhttp = new XMLHttpRequest();
                console.log(method+' '+path+' ('+content_type+')');
                xmlhttp.withCredentials = true;
                xmlhttp.crossDomain = true;
                xmlhttp.open(method, path,async);
                xmlhttp.setRequestHeader("Content-Type", content_type);
                xmlhttp.setRequestHeader("X-CSRF-Token", t);
                xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if((xmlhttp.status >= 200&&xmlhttp.status<=300)){
                        let obj = xmlhttp.responseText;
                        return  resolve(obj);
                            }
                        else  reject(new SimpleConnectError(xmlhttp.status,"request:"+path));
                    };
                };
                xmlhttp.send(JSON.stringify(data));
        }).catch(function(err){
            throw err;
        });
    }

}//Class SimpleConnect

class SimpleConnectError extends Error{
    constructor(msg,name){
    super(msg,name);
    this.message=msg;
    this.name=name
    }
}//Class SimpleConnectError


exports.coolMethod = function (arg0, success, error) {
exec(success, error, 'SimpleConnectPlugin', 'coolMethod', [arg0]);
};

exports.init = function (arg0, success, error) {
    sc=new SimpleConnect(arg0);
    sc.token().then(function(token){
        sc.setCSRFToken(token);
    },function(err){
        console.log(err);
    });
    console.log(sc);
    exec(success, error, 'SimpleConnectPlugin', 'init', [arg0]);
};

exports.connect = function (success, error) {
    sc.connect().then(function(response){
    var obj=JSON.parse(response);
        console.log(obj);
    exec(success, error, 'SimpleConnectPlugin', 'connect',[obj]);
    },function(err){
        console.log(err);
    });

};

exports.login = function (arg0, success, error) {
    console.log(arg0);
     sc.login(arg0.username,arg0.password).then(function(user){
            var obj=JSON.parse(user);
            console.log(obj);
            sc.setCSRFToken(obj.token);
            console.log("LOGIN TOKEN:"+obj.token);
             exec(success, error, 'SimpleConnectPlugin', 'login', [obj]);
                  console.log("EXEC OK"+obj);
        },function(err){
            console.log(err);
        });


};

exports.register = function (arg0, success, error) {
    console.log("SimpleConnectPlugin: Register "+arg0.username+":"+arg0.password+":"+arg0.email);
             exec(success, error, 'SimpleConnectPlugin', 'register', [arg0]);
     /*         exec(success, error, 'SimpleConnectPlugin', 'register', [obj]);
     sc.register(arg0.username,arg0.password,arg0.email).then(function(user){
            var obj=JSON.parse(user);
            console.log(obj);
            sc.setCSRFToken(obj.token);
            console.log("Register TOKEN:"+obj.token);
             exec(success, error, 'SimpleConnectPlugin', 'register', [obj]);
                  console.log("EXEC OK"+obj);
        },function(err){
            console.log(err);
        });
*/

};

exports.logout = function (arg0, success, error) {
    sc.logout().then(function(user){
               var obj=JSON.parse(user);
               console.log(obj);
//               sc.setCSRFToken(obj.token);
  //             console.log("LOGoutOUT TOKEN:"+obj.token);
                  success(obj);
  //              exec(success, error, 'SimpleConnectPlugin', 'logout', [obj]);
                     console.log("EXEC OK"+obj);
           },function(err){
            // error(err);
               console.log(err);
           });
           };

exports.request = function (arg0, success, error) {
         console.log(arg0);
         sc.request(arg0.method,arg0.path,arg0.data,arg0.contentType).then(function(req){
                var obj=JSON.parse(req);
                success(obj);
                //exec(success, error, 'SimpleConnectPlugin', 'request', [arg0]);

                console.log(req);
                console.log("REQUEST:");
            },function(err){
                error(err);
            });
};