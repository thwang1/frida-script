Java.perform(function() {
	// AES128로 암호화할 때 사용하는 평문문자열 출력
    var TargetClass = Java.use('class_name');
	TargetClass.toEncodingAES128.implementation = function(p1) {
        console.log('[*] hook success!!');
		console.log("p1 : "+p1);
		//console.log("p2 : "+p2);
		var retval = this.toEncodingAES128(p1);
		console.log('retval : '+retval);
		return retval;
    }
});