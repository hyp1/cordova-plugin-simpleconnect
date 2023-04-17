package cordova.plugin.simpleconnect;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class SimpleConnectPlugin extends CordovaPlugin {
private String host=null;
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("coolMethod")) {
            String message = args.getString(0);
            this.coolMethod(message, callbackContext);
            return true;
        }
        if (action.equals("init")) {
            this.host = args.getString(0);
            this.init(this.host, callbackContext);
            return true;
        }
        if (action.equals("connect")) {
            JSONObject user= args.getJSONObject(0);
            this.connect(user,callbackContext);
            return true;
        }
        if (action.equals("logout")) {
            this.logout(callbackContext);
            return true;
        }
            if (action.equals("login")) {
            System.out.println(args);
            JSONObject user= args.getJSONObject(0);
           // String name = user.getString("username");
           // String pass = user.getString("password");
           // System.out.println("exex login "+name);
            this.login(user, callbackContext);
            return true;
        }
        if (action.equals("register")) {
            System.out.println(args);
            JSONObject user= args.getJSONObject(0);
            String name = user.getString("username");
            String pass = user.getString("password");
            String email = user.getString("email");
            System.out.println("exex login "+name);
            this.register(name, pass, email, callbackContext);
            return true;
        }
        if (action.equals("request")) {

            JSONObject res= args.getJSONObject(0);
            String status = res.getString("status");
            System.out.println(status);
            //String path = req.getString("path");
            //String type = req.getString("contentType");
            //JSONObject data= req.getJSONObject("data");
            System.out.println("request "+res);
            System.out.println("exec request "+status);
            this.request(res, callbackContext);
            return true;
        }
        return false;
    }

    private void coolMethod(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    private void init(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    private void connect(JSONObject user,CallbackContext callbackContext) {
        if (user!=null) {
            callbackContext.success(user);
        } else {
            callbackContext.error("SimpleConnect connect no user!");
        }
    }

    private void login(JSONObject user, CallbackContext callbackContext) {
        if ( user!= null) {
            callbackContext.success(user);
        } else {
            callbackContext.error("Username and Password required.");
        }
    }
    private void register(String username,String password, String email, CallbackContext callbackContext) {
        if (username != null && username.length() > 0
                && password != null && password.length() > 0
                && email != null && email.length() > 0) {
            callbackContext.success(username+":"+password+":"+email);
        } else {
            callbackContext.error("Username Password and Email required!");
        }
    }

    private void request(JSONObject data, CallbackContext callbackContext) {
        if (data != null) {
            callbackContext.success(data);
        } else {
            callbackContext.error("Error Request!");
        }
    }
    private void logout(CallbackContext callbackContext) {
        if (true) {
            callbackContext.success("SimpleConnect logout success");
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
}
