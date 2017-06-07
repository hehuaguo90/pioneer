var myreg = {
		mobilePhone: /^(13([0-9])|15([0-9])|18([0-9]))\d{8}$/,//手机
		phone: /^((\(0\d{2,3}\))|(0\d{2,3}\-))?[1-9]\d{6,7}$/,//座机
		email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
		money : /^\-?[0-9]{1,8}(?:\.[0-9]{1,2})?$/,//整数或负数金额
		zsmoney : /^[0-9]{1,8}(?:\.[0-9])?$/,//整数金额
		zmoney : /^\d{1,8}(?:\.\d)?$/, //正金额
		english : /^[A-Za-z]+$/,
		word : /^\w+$/,//包括下划线的所有单词字符
		chinese : /^[\u0391-\uFFE5]+$/,//中文
		nochinese : /^\w+$/,//非中文
		qq: /^[1-9]\d{4,15}$/,
		username: /^\w+$/,//用户名，不允许空格
		password: /^\S+$/,//密码，不允许空格
		realname: /^\S+$/,//姓名，不允许空格
		num: /^\d*$/,//正整数
		dec: /^\d{1,8}(?:\.\d{1,4})?$/, //整数或小数
		dec2: /^\d{1,6}(?:\.\d{1,2})?$/, //正数， 6位整数，2位小数
		signDec: /^\-?\d{1,8}(?:\.\d{1,2})?$/, //有符号整数或小数，最多两位小数
		signNum:/^\-?\d+$/,  //正数或者负数整数
		numa:/^\d+\-\d+$/,
		pword:/^[A-Za-z]+$/   //参数名，目前只能包含字母
};

/*easyUI 验证*/
$.extend($.fn.validatebox.defaults.rules, {
    minLength: {    
        validator: function(value, param){    
            return $.trim(value).length >= param[0];    
        },    
        message: '至少输入 {0} 个字符'   
    },
    mobilePhone:{
    	 validator: function(value){  
    		return myreg.mobilePhone.test(value);
         },    
         message: '手机号码格式错误'
    	
    },
    phone:{
    	validator: function(value){  
    		return myreg.phone.test(value);
         },    
        message: '座机号码格式错误'
    },
    email:{
    	validator: function(value){  
    		return myreg.email.test(value);
         },    
        message: '邮箱地址格式错误'
    },
    length:{
    	validator: function(value, param){  
    		if($.trim(value).length < param[0] || $.trim(value).length > param[1]){
    			return false;
    		}else{
    			return true;
    		}
         },    
        message: '输入长度必须在 {0} 到 {1} 之间'
    },
    eqlength:{
    	validator: function(value, param){  
    		if($.trim(value).length == param[0]){
    			return false;
    		}else{
    			return true;
    		}
         },    
        message: '输入长度必须是 {0} 位'
    },
    maxLength:{
    	 validator: function(value, param){    
             return $.trim(value).length <= param[0];    
         },    
         message: '最多输入 {0} 个字符' 
    },
    qq:{
    	validator: function(value){  
    		return myreg.qq.test(value);
         },    
        message: 'qq号码格式错误'
    },
    money:{
    	validator: function(value){  
    		return myreg.money.test(value);
         },    
        message: '必须是数字，且不超过8位整数2位小数'
    },
    username:{
    	validator: function(value){  
    		return myreg.username.test(value);
         },    
        message: '请输入字母、数字或下划线'
    },
    realname:{
    	validator: function(value){  
    		return myreg.realname.test(value);
         },    
        message: '姓名不能包含空字符'
    },
    password:{
    	validator: function(value){  
    		return myreg.password.test(value);
         },    
        message: '密码不能包含空字符'
    },
    remote:{
    	 validator: function(value, param){
    		 var data = {};
    		 var p = validateTable[param[0]];
    		 var url = p[0];
    		 var nodeName = p[1];
    		 data.id = $("#" + nodeName).val();
    		 data.value = value;//输入的值
             var b = false;
             
             //注：easyUI也是采用的同步async
             $.ajax({
                 type: "POST",
                 timeout:20000,
                 url: url,
                 data: data,
                 async: false,
                 success: function (returnMsg) {
                	//console.log(returnMsg)
                	// var json = JSON.parse(returnMsg);
                	 if(returnMsg.status == 1){ //返回1 表示不重复，可以使用
                		 b = true;
                	 }
                	 /*
                	 else{
                		b = false;
                	 }*/
                 },
                 complete: function(XMLHttpRequest, textStatus) {
                	 if(textStatus == 'timeout'){
                	     $.messager.alert("系统信息", "网络异常","error");
                	 }
                 }
             });
             
             return b;
         },    
         message: '该输入值已存在' 
    },
    num: {
    	validator: function(value){  
    		return myreg.num.test(value);
         },    
        message: '请输入正整数'
    },
    signNum: {
    	validator: function(value){  
    		return myreg.signNum.test(value);
         },    
        message: '请输入整数'
    },
    word: {
    	validator: function(value){  
    		return myreg.word.test(value);
         },    
        message: '只能输入字母、数字和下划线'
    },
    numa:{
    	validator: function(value){  
    		var bl = myreg.numa.test(value);
    		if(bl){
    			var m = value.split('-');
    			var a = Number(m[0]);
    			var b = Number(m[1]);
    			console.log(b)
    			if(a > b || b > 100){
    				bl = false;
    			}
    			console.log(bl)
    		}
    		return bl;
         },    
        message: '格式错误或范围超过100'
    },
    deca: {
    	validator: function(value){  
    		return myreg.dec2.test(value);
         },    
        message: '请输入正数，且最多包含6位整数和2位小数'
    },
    pword: {
    	validator: function(value){  
    		return myreg.pword.test(value);
         },    
        message: '只能输入字母'
    }
}); 

//用于验证当前数据是否重复的配置 [url, idNodeName] 
var validateTable = {
		1:[contextPath +"/tSysUser/validateAccount", "id"],
		2:[contextPath +"/tEvalModel/validateMxdm", "mxdm"],
		3:[contextPath +"/tIndex/validateZbdm", "zbdm"],
		4:[contextPath +"/tEvalLevel/validateDjdm", "djdm"],
        5:[contextPath +"/modelParam/validateMpkey","mpkey"]
};
