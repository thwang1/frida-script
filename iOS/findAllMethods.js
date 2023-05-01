// Find All Methods of a Specific Class
if (ObjC.available) {
	try {
		var className = "AppsFlyerUtils";    // 찾고 싶은 class 이름으로 변경
		var methods = ObjC.classes[className].$ownMethods;
		console.warn("\n[*] Started: Find All Methods of a class " + '"' + className + '"');
		
		for (var i = 0; i < methods.length; i++) {
			try { console.log("\x1b[32m"+methods[i] + "\x1b[0m"); }
			catch(err) { console.log("[!] Exception1: " + err.message); }
		}
	}
	catch(err) { console.log("[!] Exception2: " + err.message); } }

else { console.log("Objective-C Runtime is not available!"); }

console.warn("[*] Completed: Find All Methods of a Class " + '"' + className + '"');