
var classname = "classname";

// Objective-C
// + : 클래스의 함수
// - : 인스턴스의 함수
var funcName = "+ functionname"

var hook = eval('ObjC.classes.' + classname + '["' + funcName + '"]');

Interceptor.attach(hook.implementation, {
	onEnter: function(args){
		console.log("[*] onEnter entered!!");
		console.log("[*] Class Name: "+ classname);
		console.log("[*] Method Name: "+ funcName);
		console.log("[*] args1 Value: "+args[0]);
		console.log("[*] args2 Value: "+args[1]);
	},
	
	onLeave: function(retval){
		console.log("[*] onLeave entered!!");
		console.log("[*] Class Name: "+ classname);
		console.log("[*] Method Name: "+ funcName);
		console.log("[*] Type of Return Value: "+hook.returnType);
		console.log("[*] Return Value: "+retval);
		//var newretval2 = ptr("0");
		//retval.replace(newretval2);
		//console.log("\t[-] New Return Value: " + newretval2);
	}
});