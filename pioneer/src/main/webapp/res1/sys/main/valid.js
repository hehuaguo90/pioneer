//验证用户名只能是字母或者数字组成
function checkAccount(account){
	return /^(?=.*[a-z])[a-z0-9]+/ig.test(account);
}
//js比较日期大小--只针对easyui
function dateCompare(startdate, enddate) {
	var starttime = new Date(startdate.replace(/-/g, "/"));
	var lktime = new Date(enddate.replace(/-/g, "/"));
	var starttimes = starttime.getTime();
	var lktimes = lktime.getTime();
	if (starttimes >= lktimes) {
		return false;
	} else
		return true;
}
//邮箱验证
function isEmail(email){
	var s = email
	var pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	if(!pattern.exec(s)){
		return false;
	}
	
	return true;
}

//电话验证
function isPhone(objectVar) {
		var s = objectVar;
		// 固定电话
		var pattern = /^((\(0\d{2,3}\))|(0\d{2,3}\-))?[1-9]\d{6,7}$/;
		// 移动电话
		var patternMoblie = /^(13([0-9])|15([0-9])|18([0-9]))\d{8}$/;
		if (s != null && s != "") {
			if (!pattern.exec(s)) {
				if (!patternMoblie.exec(s)) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
		} else {
			return true;
		}
	}


//检测一个字符串的真实长度（一个汉字算2个字节）
function getLength(str)
{
    var length2 = str.length;
    for(var i = 0; i < str.length; i++)
    {
		if(str.charAt(i)>'~' || str.charAt(i)<' ')
		{
		    length2++;
		}
    }
    return length2;
}

//返回
function back(){
	window.parent.main.history.back()
}
//去空格
function ltrim(s){
return s.replace( /^\s*/, "");
}
//去右空格
function rtrim(s){
return s.replace( /\s*$/, "");
}
//去左空格
function trim(s){
return rtrim(ltrim(s));
}
//为空验证
function checkNull(arr){
	 for(var i=0;i<arr.length;i++){
	 	if(trim(document.getElementById(arr[i]).value).length==0){
	 		return false;
	 	}
	 }
 return true;
}
//正整数验证
function checkInt(arr){
	var patrn=/^[0-9]*[0-9][0-9]*$/; 

		if(!patrn.exec(trim(arr))){
			return false;
		}else{
			return true;
		}
	
	
}
//正整数验证数组
function checkIntArr(arr){
	var patrn=/^[0-9]*[1-9][0-9]*$/; 
	for(var i=0;i<arr.length;i++){
		if(!patrn.exec(trim(document.getElementById(arr[i]).value))){
			return false;
		}
	}
	return true;
}
//为数字验证
function checkNumber(arr){
	var patrn=/^\d+(\.\d+)?$/; 
	
		if(!patrn.exec(trim(arr))){
			return false;
		}else{
			return true;
		}
	
	
}
//为数字验证
function checkNumberArr(arr){
	var patrn=/^\d+(\.\d+)?$/; 
	for(var i=0;i<arr.length;i++){
		if(!patrn.exec(trim(document.getElementById(arr[i]).value))){
			return false;
		}
	}
	return true;
}