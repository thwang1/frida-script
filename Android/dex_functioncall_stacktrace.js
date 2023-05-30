//클래스명 입력하면 호출된 메소드 이름 확인이 가능함

var ThreadDef = Java.use('java.lang.Thread');
var ThreadObj = ThreadDef.$new();
function stackTrace() {
    var stack = ThreadObj.currentThread().getStackTrace();
    for (var i = 0; i < stack.length; i++) {
        console.log(i + " => " + stack[i].toString());
    }
    console.log("-------------------------------------");
}
var StringDec = Java.use('CLASS_NAME');
StringDec.onCreate.overload('android.os.Bundle').implementation = function (prop) {
    send("a() - string dec - got called! ");
    stackTrace();
    var ret = this.a(prop);
    send("ret value : " + ret.toString());
    return ret;
};
