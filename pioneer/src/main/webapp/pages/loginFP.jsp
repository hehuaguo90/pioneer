<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html >
<html>
<head>
<t:base />
<title>${title}</title>
<meta name ="viewport" content ="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
<link href="${ contextPath }/res/front/bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="${ contextPath }/res/front/css/font-awesome.min.css">
<link href="${ contextPath }/res/front/style/login_phone.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="${ contextPath }/res/front/js/jquery.min.js"></script>
<script src="${ contextPath }/res/front/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${ contextPath }/res/sys/main/jquery.md5.js"></script>
<script type="text/javascript">
    var contextPath = "${ contextPath }";
	
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
		
		var myform = document.getElementById("login_form");
		//var text = $('#password').val();
		//$('#password').val($.md5(text).toUpperCase());
		myform.submit();  
    }
</script>
<style type="text/css">
body {
	font-size: 14px;
	background-color: #f6f6f6;
	padding: 2em;
}
h2 {
	color: #279a3e;
	
}

</style>
</head>
<body class="loginbg_phone">
<div class="logobox">
	<img src="${ contextPath }/res/front/style/images/login_phone_logo.png" width="100%"> 
</div>
<div class="login_input">
<form class="form-horizontal" id="login_form" role="form" action="${contextPath}/tLoginObjAction/userLogin">
 <input id="loginType" name="loginType" type="hidden" value="2"/>
	<div class="inputsimple">
    	<table width="100%" border="0" cellspacing="4" cellpadding="0">
  <tr>
    <th><span class="ico icon-user"></span></th>
    <td><input name="account" type="text" value="${account}" placeholder="请输入用户名"/></td>
  </tr>
</table>

    </div>
	<div class="inputsimple">
    	<table width="100%" border="0" cellspacing="4" cellpadding="0">
  <tr>
    <th><span class="ico icon-key"></span></th>
    <td>
        <input name="password" value="${password}" type="password" placeholder="请输入密码"/>
    </td>
  </tr>
</table>
<span id="message" style="color:red;">${message}</span>
<button><span class="ico icon-signin"></span><span onclick="login()" class="btntxt">绑定帐户并登录</span> </button>
    </div>
    </form>
</div>
<p style="position:absolute;bottom:2em;left:0;width:100%;text-align:center;color:#fff;display:none;">技术支持：重庆同方融达信息科技有限公司</p>

</body>
</html>