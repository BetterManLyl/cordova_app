package com.lyl.hello.callback;

import android.content.Intent;

/**
 * @author: ylli10
 * @date: 2018/8/31.
 * Email:ylli10@iflytek.com
 * Description:
 */
public interface TakePhotoCallBack {

    void photoCallBack(int requestCode, int resultCode, Intent intent);
}
