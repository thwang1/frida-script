Java.perform(function() {
	
    var TargetClass = Java.use('class_name');
    var throwable = Java.use('java.lang.Throwable');
	TargetClass.method_name.implementation = function(p1) {
		console.log("##################");
        console.log(arguments.caller+'() is called!!');
		var throwable2 = throwable.$new();
		var a = throwable2.getStackTrace();
		var i = 0;
		for(i=0;i<a.length;i++){
			console.log(a[i].getClassName()+" : "+a[i].getMethodName());
		}
		//var retval = this.mmmmmmmm(p1,p2);
		//console.log("[*] retval : " + retval);
		console.log("##################");
		this.LM(p1);
    }
});