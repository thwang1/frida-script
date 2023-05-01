Interceptor.attach(ObjC.classes.NSString['+ stringWithUTF8String:'].implementation, {
	onEnter: function (args) {
		console.log('[+] Hooked +[NSString stringWithUTF8String:] ');
	},
	onLeave: function (retval) {
		var str = new ObjC.Object(ptr(retval)).toString();
		console.log("\nBacktrace:\n" + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n"));
		console.log('[+] Returning [NSString stringWithUTF8String:] -> ', str);
		return retval;
	}
});