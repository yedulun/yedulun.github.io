// JavaScript Document

<!-- 获取验证码的倒计时 -->
var goNumTime = 60; // 倒计时60秒  
function goNum(val)
{	
	if(goNumTime == 0){
		val.removeAttribute("disabled"); 
		val.value = "获取验证码";
		val.style.backgroundColor="#FF6666";
		goNumTime = 60;
	} else {
		val.setAttribute("disabled", true); 
		val.value = "重发"+goNumTime+"s";
		val.style.backgroundColor="#999";
		goNumTime--; 
	}
	setTimeout(function() { 
		goNum(val) 
	},1000) 
}
