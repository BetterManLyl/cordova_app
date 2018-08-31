/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
        initialize: function () {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        },
        onDeviceReady: function () {
            this.receivedEvent();
        },
        $$: function (id) {
            return document.getElementById(id);
        },
        receivedEvent: function () {
            this.takephoto();
            this.getPosition();
            this.watchPosition();

            this.createFile();
            this.writeFile();
            this.readFile();
            this.deleteFile();
            this.netinfo();

            this.deviceinfo();
            this.testClick();
            // window.myToast.showToast("测试");
            // window.android.showToast("cehsi");
            //
            // window.android.showToast2(success,error,"cehsi");
            //
            // window.android.readIDCard(success,error,"readIDCard")
            function success(message) {
                alert(message);
            }

            function error() {

            }


        },

        testClick:function () {
            var testClick = this.$$("next_page");
            testClick.onclick=function () {
               // alert("next_page")
                window.location.href="utils_page.html"
            }
        },


        deviceinfo: function () {
            var deviceinfo = this.$$("deviceinfo");
            deviceinfo.onclick = function () {
                window.MacAddress.getMacAddress(onSuccess, onFail);

                function onSuccess(macAddress) {
                    alert("Cordova version: " + device.cordova + "\n" +
                        "Device model: " + device.model + "\n" +
                        "Device platform: " + device.platform + "\n" +
                        "Device UUID: " + device.uuid + "\n" +
                        "Device version: " + device.version + "\n" +
                        "MAC地址:" + macAddress)
                }

                function onFail(fail) {
                    alert(fail)
                }
            }
        },

        netinfo: function () {
            var netinfo = this.$$("netinfo")
            document.addEventListener("offline", onOffline, false)
            document.addEventListener("online", onOnline, false)
            netinfo.onclick = function () {
                var networkState = navigator.connection.type;
                var states = {};

                states[Connection.UNKNOWN] = 'Unknown connection';
                states[Connection.ETHERNET] = 'Ethernet connection';
                states[Connection.WIFI] = 'WiFi connection';
                states[Connection.CELL_2G] = 'Cell 2G connection';
                states[Connection.CELL_3G] = 'Cell 3G connection';
                states[Connection.CELL_4G] = 'Cell 4G connection';
                states[Connection.CELL] = 'Cell generic connection';
                states[Connection.NONE] = 'No network connection';
                alert('Connection type: ' + states[networkState]);
            }

            function onOffline() {
                alert('You are now offline!');
            }

            function onOnline() {
                alert('You are now online!');
            }
        },


        createFile: function () {
            var createFile = this.$$("createFile");
            createFile.onclick = function () {
                var type = window.TEMPORARY;
                var size = 5 * 1024 * 1024;

                window.requestFileSystem(type, size, successCallback, errorCallback)

                function successCallback(fs) {
                    fs.root.getFile('log.txt', {create: true, exclusive: true}, function (fileEntry) {
                        alert('File creation successfull!')
                    }, errorCallback);
                }

                function errorCallback(error) {
                    alert("ERROR: " + error.code)
                }
            }
        },

        writeFile: function () {
            var writeFile = this.$$("writeFile");
            var type = window.TEMPORARY;
            var size = 5 * 1024 * 1024;
            writeFile.onclick = function () {
                window.requestFileSystem(type, size, successCallback, errorCallback)

                function successCallback(fs) {
                    fs.root.getFile('log.txt', {create: true}, function (fileEntry) {

                        fileEntry.createWriter(function (fileWriter) {
                            fileWriter.onwriteend = function (e) {
                                alert('Write completed.');
                            };

                            fileWriter.onerror = function (e) {
                                alert('Write failed: ' + e.toString());
                            };

                            var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
                            fileWriter.write(blob);
                        }, errorCallback);

                    }, errorCallback);

                }

                function errorCallback(error) {
                    alert("ERROR: " + error.code)
                }

            }


        },

        readFile: function () {

            var readFile = this.$$("readFile");
            var type = window.TEMPORARY;
            var size = 5 * 1024 * 1024;

            readFile.onclick = function () {
                window.requestFileSystem(type, size, successCallback, errorCallback)

                function successCallback(fs) {

                    fs.root.getFile('log.txt', {}, function (fileEntry) {

                        fileEntry.file(function (file) {
                            var reader = new FileReader();

                            reader.onloadend = function (e) {
                                // var txtArea = document.getElementById('textarea');
                                // txtArea.value = this.result;
                                alert(this.result)

                            };
                            reader.readAsText(file);
                        }, errorCallback);

                    }, errorCallback);
                }

                function errorCallback(error) {
                    alert("ERROR: " + error.code)
                }
            }

        },
        deleteFile: function () {

            var deleteFile = this.$$("removeFile");
            var type = window.TEMPORARY;
            var size = 5 * 1024 * 1024;
            deleteFile.onclick = function () {
                window.requestFileSystem(type, size, successCallback, errorCallback)

                function successCallback(fs) {
                    fs.root.getFile('log.txt', {create: false}, function (fileEntry) {
                        fileEntry.remove(function () {
                            alert('File removed.');
                        }, errorCallback);

                    }, errorCallback);
                }

                function errorCallback(error) {
                    alert("ERROR: " + error.code)
                }
            }

        },

        watchPosition: function () {
            var options = {
                maximumAge: 3600000,
                timeout: 3000,
                enableHighAccuracy: true,
            }
            var watchPosition = this.$$("watchPosition");
            watchPosition.onclick = function () {
                navigator.geolocation.watchPosition(onSuccess, onError, options);

                function onSuccess(position) {
                    alert('Latitude: ' + position.coords.latitude + '\n' +
                        'Longitude: ' + position.coords.longitude + '\n' +
                        'Altitude: ' + position.coords.altitude + '\n' +
                        'Accuracy: ' + position.coords.accuracy + '\n' +
                        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                        'Heading: ' + position.coords.heading + '\n' +
                        'Speed: ' + position.coords.speed + '\n' +
                        'Timestamp: ' + position.timestamp + '\n');
                };

                function onError(error) {
                    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
                }
            }

        },
        getPosition: function () {
            var getPosition = this.$$("getPosition");

            var options = {
                enableHighAccuracy: true,
                maximumAge: 3600000
            }

            getPosition.onclick = function () {
                navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

                function onSuccess(position) {
                    alert('Latitude: ' + position.coords.latitude + '\n' +
                        'Longitude: ' + position.coords.longitude + '\n' +
                        'Altitude: ' + position.coords.altitude + '\n' +
                        'Accuracy: ' + position.coords.accuracy + '\n' +
                        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                        'Heading: ' + position.coords.heading + '\n' +
                        'Speed: ' + position.coords.speed + '\n' +
                        'Timestamp: ' + position.timestamp + '\n');
                };

                function onError(error) {
                    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
                }
            }
        },
        takephoto: function () {
            var getDomLabrary = this.$$('cameraTakePicture');
            var _this = this;
            getDomLabrary.onclick = function () {
                // 打开图片库
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 50,                                            // 相片质量是50
                    sourceType: Camera.PictureSourceType.Camera,            // 设置从摄像头拍照获取
                    destinationType: Camera.DestinationType.FILE_URI        // 以文件路径返回
                });

                function onSuccess(imageURI) {
                    console.log(imageURI)
                    _this.$$('myImage').src = imageURI;
                }

                function onFail(message) {
                    alert('Failed because: ' + message);
                }
            }
        }
    }
;



function utils_page() {
    alert("ceshi")
}

app.initialize();
