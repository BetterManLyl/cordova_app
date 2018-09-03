package org.apache.cordova.utils;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.provider.MediaStore;
import android.util.Log;
import android.widget.Toast;

import com.android.iflytek.IflytekManager;
import com.lyl.hello.callback.TakePhotoCallBack;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * @author: ylli10
 * @date: 2018/8/29.
 * Email:ylli10@iflytek.com
 * Description:
 */
public class MyUtils extends CordovaPlugin implements TakePhotoCallBack {

    private IflytekManager iflytekManager = null;


    private static CallbackContext callbackContext = null;

    @Override
    public boolean execute(String action, String rawArgs, CallbackContext callbackContext) throws JSONException {
        return super.execute(action, rawArgs, callbackContext);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        return super.execute(action, args, callbackContext);
    }

    @SuppressLint("WrongConstant")
    @Override
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        //showToast 是你在JS中调用的方法名；
        if (action.equals("utils")) {
            //这里可以实现一些你的原生逻辑功能
            Toast.makeText(cordova.getActivity(), args.getString(0), Toast.LENGTH_SHORT).show();
            return true;
        }
        if (action.equals("utils2")) {
            //这里可以实现一些你的原生逻辑功能
            Toast.makeText(cordova.getActivity(), args.getString(0) + "utils2", Toast.LENGTH_SHORT).show();
            callbackContext.success(args.getString(0));
            return true;
        }
        if (action.equals("readIDCard")) {
            //这里可以实现一些你的原生逻辑功能
            Toast.makeText(cordova.getActivity(), args.getString(0) + "readIDCard", Toast.LENGTH_SHORT).show();
            callbackContext.success(args.getString(0));
            return true;
        }

        if (action.equals("takePhoto")) {
            MyUtils.callbackContext = callbackContext;
            takePhoto(cordova.getActivity());
            //这里可以实现一些你的原生逻辑功能
            Toast.makeText(cordova.getActivity(), args.getString(0) + "takePhoto", Toast.LENGTH_SHORT).show();
            //callbackContext.success(args.getString(0));
            return true;
        }

        if (action.equals("closeCamera")) {
            //这里可以实现一些你的原生逻辑功能
            Toast.makeText(cordova.getActivity(), args.getString(0) + "closeCamera", Toast.LENGTH_SHORT).show();
            callbackContext.success(args.getString(0));
            return true;
        }

        if (action.equals("getSIMCardInfo")) {
            //这里可以实现一些你的原生逻辑功能
            Toast.makeText(cordova.getActivity(), args.getString(0) + "getSIMCardInfo", Toast.LENGTH_SHORT).show();
            callbackContext.success(args.getString(0));
            return true;
        }

        if (action.equals("writeSIMCard")) {
            //这里可以实现一些你的原生逻辑功能
            Toast.makeText(cordova.getActivity(), args.getString(0) + "writeSIMCard", Toast.LENGTH_SHORT).show();
            callbackContext.success(args.getString(0));
            return true;
        }

        if (action.equals("popSIMCard")) {

            //这里可以实现一些你的原生逻辑功能
            Toast.makeText(cordova.getActivity(), args.getString(0) + "popSIMCard", Toast.LENGTH_SHORT).show();
            callbackContext.success(args.getString(0));
            return true;
        }

        if (action.equals("printTicket")) {
            //这里可以实现一些你的原生逻辑功能
            Toast.makeText(cordova.getActivity(), args.getString(0) + "printTicket", Toast.LENGTH_SHORT).show();
            callbackContext.success(args.getString(0));
            return true;
        }

        if (action.equals("checkMachine")) {
            //这里可以实现一些你的原生逻辑功能
            Toast.makeText(cordova.getActivity(), args.getString(0) + "checkMachine", Toast.LENGTH_SHORT).show();
            callbackContext.success(args.getString(0));
            return true;
        }
        if (action.equals("getITermInfo")) {
            //这里可以实现一些你的原生逻辑功能
            Toast.makeText(cordova.getActivity(), args.getString(0) + "getITermInfo", Toast.LENGTH_SHORT).show();
            Device device = new Device(cordova.getContext());
            String firmwareType = "1111";
            String IPAddress = device.getIpAddress();
            String systemVersion = device.getSystemVersion();
            String MACAddress = device.getMacAddress();
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("firmwareType", firmwareType);
            jsonObject.put("systemVersion", systemVersion);
            jsonObject.put("IPAddress", IPAddress);
            jsonObject.put("MACAddress", MACAddress);
            PluginResult pluginResult = new PluginResult(PluginResult.Status.OK,jsonObject);
            pluginResult.setKeepCallback(true); // Keep callback
            callbackContext.sendPluginResult(pluginResult);
            callbackContext.success(jsonObject.toString());

            return true;
        }
        return false;
    }

    private static int TAKE_PHOTO_REQUEST_CODE = 0X01;

    private void takePhoto(Activity activity) {
        Intent intent = new Intent();
        intent.setAction(MediaStore.ACTION_IMAGE_CAPTURE);
        activity.startActivityForResult(intent, TAKE_PHOTO_REQUEST_CODE);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        Log.e("lyl", "onActivityResult: " + requestCode);
        super.onActivityResult(requestCode, resultCode, intent);

    }


    @Override
    public void photoCallBack(int requestCode, int resultCode, Intent intent) {
        if (resultCode == -1) {
            //拍照成功
            if (requestCode == TAKE_PHOTO_REQUEST_CODE) {
                Log.e("lyl", "photoCallBack: 拍照成功");
                if (callbackContext != null) {
                    Bundle bundle = intent.getExtras();
                    Bitmap bitmap = (Bitmap) bundle.get("data");
                    //转换成图片时需在字符串最前面加上 data:image/jpeg;base64,
                    String photoBaseCode = Base64Util.bitmapToBase64(bitmap);
                    callbackContext.success(photoBaseCode);
                    Log.e("lyl", "photoCallBack: " + photoBaseCode);
                }
            }
        } else {
            //拍照失败
            Log.e("lyl", "photoCallBack:拍照失败");
            if (callbackContext != null) {
                callbackContext.error("拍照失败");
            }
        }
    }






}
