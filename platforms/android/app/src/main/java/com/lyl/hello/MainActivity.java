/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.lyl.hello;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.lyl.hello.callback.TakePhotoCallBack;

import org.apache.cordova.*;
import org.apache.cordova.utils.MyUtils;

public class MainActivity extends CordovaActivity {
    private static String TAG = MainActivity.class.getSimpleName();

    private TakePhotoCallBack takePhotoCallBack;

    public void setTakePhotoCallBack(TakePhotoCallBack takePhotoCallBack) {
        this.takePhotoCallBack = takePhotoCallBack;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }
        registerCallBack();
        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
    }

    private void registerCallBack() {
        if (takePhotoCallBack == null) {
            MyUtils myUtils = new MyUtils();
            setTakePhotoCallBack(myUtils);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        Log.e("lyl", "onActivityResult: MainActivity");

        takePhotoCallBack.photoCallBack(requestCode, resultCode, intent);
        super.onActivityResult(requestCode, resultCode, intent);
    }
}
