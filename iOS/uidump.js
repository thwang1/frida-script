function UIDump()
{
    var qwe = ObjC.classes.UIWindow.keyWindow();
	console.log(qwe); 
	var rootControl = qwe.rootViewController();

	var ui = qwe.recursiveDescription().toString();
	var ui_autolayout = qwe['- _autolayoutTrace']().toString();
	var control = rootControl['- _printHierarchy']().toString();

	// 전체 UI 계층 출력하고 싶은 경우    
	// console.log("\n\x1b[31m" + ui + "\x1b[0m"); 

	// Simplified recursiveDescription
	// console.log("\n\x1b[34m" + ui_autolayout + "\x1b[0m");

	// 현재 화면에 보여지는 UIController를 알고 싶은 경우
	console.log("\n\x1b[32m" + control + "\x1b[0m"); 
}

if (ObjC.available) {
    UIDump();    
} else {
    send("error: Objective-C Runtime is not available!");
}