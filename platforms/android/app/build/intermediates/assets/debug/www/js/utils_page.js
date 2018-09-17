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
        this.readIDCard();
        this.takePhoto();
        this.closeCamera();
        this.getSIMCardInfo();
        this.getITermInfo();
        this.writeSIMCard();
        this.popSIMCard();
        this.printTicket();
        this.checkMachine();
    },

    /**
     * 二代身份证读卡器
     */
    readIDCard: function () {
        this.$$("readIDCard").onclick = function () {
            window.android.readIDCard(success, error, "readIDCard")

            function success(message) {

            }

            function error() {

            }
        }
    },
    /**
     *摄像头唤醒
     */
    takePhoto: function () {
        var this_ = this;
        this.$$("takePhoto").onclick = function () {
            window.android.takePhoto(success, error, "takePhoto")

            /**
             * 需要在string数据前面加上 data:image/jpeg;base64,
             * 否则图片不显示
             * @param message base64编码的图片格式
             */
            function success(message) {
                this_.$$("myImage").src = "data:image/jpeg;base64," + message
            }

            function error(message) {
                alert(message)
            }
        }
    },
    /**
     *摄像头关闭
     */
    closeCamera: function () {
        this.$$("closeCamera").onclick = function () {
            window.android.closeCamera(success, error, "closeCamera")

            function success(message) {

            }

            function error() {

            }
        }
    },
    /**
     *发卡机状态
     */
    getSIMCardInfo: function () {
        this.$$("getSIMCardInfo").onclick = function () {
            window.android.getSIMCardInfo(success, error, "getSIMCardInfo")

            function success(message) {

            }

            function error() {

            }
        }
    },
    /**
     * 写卡
     */
    writeSIMCard: function () {
        this.$$("writeSIMCard").onclick = function () {
            window.android.writeSIMCard(success, error, "writeSIMCard")

            function success(message) {

            }

            function error() {

            }
        }
    },
    /**
     * 发卡
     */
    popSIMCard: function () {
        this.$$("popSIMCard").onclick = function () {
            window.android.popSIMCard(success, error, "popSIMCard")

            function success(message) {

            }

            function error() {

            }
        }
    },

    /**
     * 凭据打印
     */
    printTicket: function () {
        this.$$("printTicket").onclick = function () {
            window.android.printTicket(success, error, "printTicket")

            function success(message) {

            }

            function error() {

            }
        }
    },

    /**
     * 健康巡检
     */
    checkMachine: function () {
        this.$$("checkMachine").onclick = function () {
            window.android.checkMachine(success, error, "checkMachine")

            function success(message) {

            }

            function error() {

            }
        }
    },
    /**
     * 获取终端设备信息
     */
    getITermInfo: function () {
        this.$$("getITermInfo").onclick = function () {
            window.android.getITermInfo(success, error, "getITermInfo")

            function success(message) {
                var obj = JSON.parse(message); //由JSON字符串转换为JSON对象

                var firmwareType = obj.firmwareType;
                var IPAddress = obj.IPAddress;
                var systemVersion = obj.systemVersion;
                var MACAddress = obj.MACAddress;
                alert("固件类型:" + firmwareType + "\n" +
                    "系统版本:" + systemVersion + "\n" +
                    "IP地址:" + IPAddress + "\n" +
                    "MAC地址:" + MACAddress);
            }

            function error() {
                alert("失败")
            }
        }
    },


}

app.initialize();
