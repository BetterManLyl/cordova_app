function onclick() {
    var result = android.getITermInfo();

    document.getElementById("p").innerHTML = result;

}