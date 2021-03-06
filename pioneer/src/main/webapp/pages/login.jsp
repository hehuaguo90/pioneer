<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html >
<html>
<head>
<t:base />
<title>${title}</title>
<link rel="shortcut icon" href="${ contextPath }/pages/favicon.ico" type="image/x-icon" />	
<script type="text/javascript" src="${ contextPath }/res/front/js/jquery.min.js"></script>
<script type="text/javascript" src="${ contextPath }/res/sys/main/jquery.md5.js"></script>
<link href="${ contextPath }/res/front/bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="${ contextPath }/res/front/css/font-awesome.min.css">
<script src="${ contextPath }/res/front/bootstrap/js/bootstrap.min.js"></script>
<link href="${ contextPath }/res/front/style/login_web.css" rel="stylesheet" type="text/css">
<style>
.systemname {
	font-size: 34px;
	color: white;
	font-weight: 800;
	margin-left: 320px;
	display: inline-block;
	line-height: 40px;
	padding-top: 4px;
}
</style>

<script type="text/javascript">
    var contextPath = "${ contextPath }";
	function myKeyDown(e) {
		var keyNum;
		if (window.event) {
			keyNum = e.keyCode;
		} else {
			keyNum = e.which;
		}
		if (keyNum == 13){
		   // var text = $('#password').val();
		    //$('#password').val($.md5(text).toUpperCase());
			$('#login_form').submit();
		}
	}
	function pwdC(evt){
	    if(window.event) evt = window.event;
	    if(evt.keyCode == 13){
	        login(); 
	    }
	} 
	
	function login(){
		var account = $.trim($('#account').val());
		var password = $.trim($('#password').val());
		var validateCode = $.trim($('#validateCode').val());
		
		if(!account){
			$("#message").text("请输入用户名！");
			return;
		}
		
		if(!password){
			$("#message").text("请输入密码！");
			return;
		}
		
		if(!validateCode){
			$("#message").text("请输入验证码！");
			return;
		}
		
		var myform = document.getElementById("login_form");
		//var text = $('#password').val();
		//$('#password').val($.md5(text));
		//$('#password').val($.md5(password).toUpperCase());
		myform.submit();  
    }
	
	function refreshCode(img) {
		img.src = contextPath + "/imageValidateCode?" + Math.random();
	}
	
	function reset(){
		$('#account').val("");
		$('#password').val("");
		$('#validateCode').val("");
	}
	
	function selectPort(field, type){
		$(".login_inputbox_tab li").removeClass("active");
		$(field).addClass("active");
		$("#loginType").val(type);
	}
</script>
</head>
<body onkeydown="myKeyDown(event)" class="bodybg">
<form id="login_form" action="${contextPath}/tLoginObjAction/userLogin" method="post">
<input id="loginType" name="loginType" type="hidden" value="1"/>
<div class="login_box">
    <div class="clear"></div>
    <div class="banner-box">
				<!--顶条平铺块-->
				<div class="banner-contentbox row" style="margin: 0px 20px;max-width:100%;">
					<!--顶条内容块-->

					<!--页面顶部LOGO及用户信息框开始-->

					<div class="col-md-12 logobox">
						<span class="systemname">${title }</span>
					</div>


	 
					<!--页面顶部LOGO及用户信息框结束-->


				</div>
			</div>
    
    <div class="login_inputbox_body">
    	<div class="row" style="padding:4px;">
        	<div class="col-md-7 inputbox" style="padding-right:0;">
            	<div class="input-group">
                    <span class="input-group-addon"><span class="icon-user ico" style="font-size:18px;"></span></span>
                    <input type="text" class="form-control" id="account" name="account" type="text" value="${account}" placeholder="请输入用户名">
                </div>
                <div class="input-group">
                    <span class="input-group-addon" style="padding-right:10px;" ><span class="icon-key ico" style="font-size:17px;"></span></span>
                    <input type="password" class="form-control" id="password" name="password" value="${password}" placeholder="请输入密码">
                    
                </div>
                <div class="row">
                        <div class="col-md-8" >
                         <div class="input-group">
                            <span class="input-group-addon" style="padding-right:11px;"><span class="icon-desktop ico" style="font-size:15px;"></span></span>
                            <input type="text" class="form-control" maxlength="4" name="validateCode" id="validateCode" placeholder="输入验证码">
                          </div>
                        </div>
                        <div class="col-md-4" style="text-align:left;line-height:30px;padding-left:0;">
                                <img src="${ contextPath }/imageValidateCode" onclick="refreshCode(this)" style="cursor: pointer;" title="点击刷新验证码" width="65" height="31"> 
                        </div>
                </div>
                <div class="clear"></div>
                 <p class="col-md-12 login_errorbox" id="message">${message}</p>
            </div>
            <div class="col-md-5">
            	<div class="row login_btn" >
                	<div class="col-md-6" style="padding-right:0px;">
                    	
                    	<a href="javascript:void login()">
                        	<div class="icobox" onclick="login()"><span class="icon-signin" style="font-size:36px;"></span></div>
                        	登录
                        </a>
                    </div>
                    <div class="col-md-6" style="padding-left:0;">
                    	
                    	<a href="javascript:void reset()" class="reset">
                        <div class="icobox" ><span class="glyphicon glyphicon-repeat" style="font-size:27px;"></span></div>
                        	重置
                        </a>
                    </div>
				<div class="clear"></div>
                    <p class="col-md-12 login_msgbox">请使用IE10.0以上版本浏览器</p>
                </div>
            </div>
        </div>
    </div>
    
</div>
<div class="versionbox"></div>
</form>

</body>
</html>
