
// libc.so 라이브러리 내 특정 네이티브 함수를 후킹함
Java.perform(function() {
    var moduleName = "libc.so"; 
	var nativeFuncAddr = 0x6a60;
	Interceptor.attach(Module.findExportByName(null, "dlopen"), {
		onEnter: function(args) {
			this.lib = Memory.readUtf8String(args[0]);
			console.log("dlopen called with: " + this.lib);
		},
		onLeave: function(retval) {
			if (this.lib.endsWith(moduleName)) {
				console.log("ret: " + retval);
				var baseAddr = Module.findBaseAddress(moduleName);
				Interceptor.attach(baseAddr.add(nativeFuncAddr), {
					onEnter: function(args) {
						console.log("[-] hook invoked");
						console.log(JSON.stringify({
							a1: args[1].toInt32(),
							a2: Memory.readUtf8String(Memory.readPointer(args[2])),
							a3: Boolean(args[3])
						}, null, '\t'));
					}
				});
			}
		}
	});
});