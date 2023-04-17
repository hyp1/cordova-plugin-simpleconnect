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
        return this.request('GET', this.host+"/rest/simpleconnect/token");
    }

    connect() {
        return this.request('POST', this.host+"/rest/simpleconnect/connect?_format=json");
    }

    login(username,password) {
        let postData = {
            "username": username,
            "password": password
            }
        return this.request('POST', this.host+"/rest/simpleconnect/login?_format=json", postData);
    }

    logout() {
        return this.request('POST', this.host+"/rest/simpleconnect/logout?_format=json");
    }

    register(username, password, email) {
        let request = {
            email: email,
            username: username,
            password:password
            }
        return this.request('POST', this.host+"/rest/simpleconnect/register?_format=json",request);

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
                        else  reject(xmlhttp.status+" "+xmlhttp.responseText);
                    };
                };
                if(data)xmlhttp.send(JSON.stringify(data));
                else xmlhttp.send(data);
        }).catch(function(err){
        console.log(err);

            throw  new SimpleConnectError(err,"request2:"+path);
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
try{
    sc.logout().then(function(user){
               var obj=JSON.parse(user);
               console.log(obj);
//               sc.setCSRFToken(obj.token);
                  success(obj);
  //              exec(success, error, 'SimpleConnectPlugin', 'logout', [obj]);
                     console.log("EXEC OK"+obj);
           },function(err){
           console.log(err);
                console.log("LOGOUT ERR")
                console.log(err.message);
                console.log(err.name);
           });
    }catch(ex){
    console.log("LOGOUT EXCEPTION")
    console.log(ex);
    }
           };

exports.request = function (arg0, success, error) {
         console.log(arg0);
       try{
         sc.request(arg0.method,arg0.path,arg0.data,arg0.contentType).then(function(req){
          //      var obj=JSON.parse(req);
                success(req);
             //   exec(success, error, 'SimpleConnectPlugin', 'request', [arg0]);

                console.log(req);
                console.log("REQUEST:");
            },function(err){
                console.log(err);
            });
            }catch(ex){
            console.log(ex);
                 error("REQUEST EXCEPTION");
            }
};