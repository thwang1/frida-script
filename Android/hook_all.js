
//frida 탐지 우회
function nativeTrace(nativefunc) {
	var nativefunc_addr=Module.getExportByName(null, nativefunc);
	var func=ptr(nativefunc_addr);
		
	Interceptor.attach(func, {
		// set hook 
		onEnter: function (args) {
			console.warn("\n[+] " + nativefunc + " called"); // before call 
			if (nativefunc == "fopen") {
				if(args[0].readUtf8String() == "/proc/self/maps"){
					// 메모리 권한 설정
					Memory.protect(args[0], 16, 'rwx');
					args[0].writeUtf8String("/proc/self/stat");
				}
				console.log("\n\x1b[31margs[0]:\x1b[0m \x1b[34m" + args[0].readUtf8String() + ", \x1b[32mType: ");
			}
		},
		onLeave: function (retval) {
			if(nativefunc == "fopen"){
				console.warn("[-] " + nativefunc + " ret: " + retval.toString() ); // after call
			}
		}
	});
} 

nativeTrace("fopen");

// JAVA OS 환경변수 값 확인
Java.perform(function(){
    var java_lang_System = Java.use('java.lang.System');
    java_lang_System.getenv.overload('java.lang.String').implementation = function(argv0){
        var retval = this.getenv(argv0);        
        console.log("retval: " + retval);
        return retval;
    }
});

// 특정 모듈 내 입력받은 주소값 이후로 32 길이 만큼 hex dump
function hexDump(dump_addr){
    var module_base = Module.findBaseAddress("module_name");    // get base addr from module
    var dump_realaddr = module_base.add(dump_addr);   // add function offset

    console.log("hexdump start at " + ptr(dump_addr));
    console.log(hexdump(dump_realaddr,{offset:0, length:32}));
}

hexDump(0x2220c);

// 특정 모듈 내 특정 네이티브 함수 후킹
function traceSub(sub_addr){
    var module_base = Module.findBaseAddress("module_name");    // get base addr from module
    var sub_realaddr = module_base.add(sub_addr);   // add function offset

    console.log("Tracing " + ptr(sub_addr));

    Interceptor.attach(sub_realaddr, {   // set hook
        onEnter: function (args) {
            console.warn("[+] " + ptr(sub_addr) + " called");
            if(sub_addr == "0xdf08"){
                console.log("args: " + args[0]);   // v8 인자값 출력
            }
        },
        onLeave: function (retval) {
            console.warn("[-] " + ptr(sub_addr) + " Exiting");  // after call
        }
    });
}

traceSub(0xdf08);















