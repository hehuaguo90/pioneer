<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html >
<html>
<head>
<t:base />
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
		//$('#password').val($.md5(text));
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
<body>
<div style="text-align:center;margin-bottom:2em;"><img src="${ contextPath }/res/front/style/images/logo_ldzm.png" width="45" >
  <h2>重庆市畜牧信息系统</h2>
</div>
<div class="inputbox">
<form class="form-horizontal" id="login_form" role="form" action="${contextPath}/tLoginObjAction/userLogin">
  <input id="loginType" name="loginType" type="hidden" value="3"/>
  <div class="form-group"> 
    <!--    <label for="firstname" class="col-sm-2 control-label">用户名：</label>
-->
    <div class="col-sm-12">
      <div class="input-group"> <span class="input-group-addon"><span class="icon-user ico" style="font-size:18px;"></span></span>
        <input type="text" id="account" name="account" type="text" value="${account}" class="form-control" placeholder="请输入用户名">
      </div>
    </div>
  </div>
  <div class="form-group"> 
    <!--    <label for="lastname" class="col-sm-2 control-label">密码：</label>
-->
    <div class="col-sm-12">
      <div class="input-group"> <span class="input-group-addon" style="padding-right:10px;" ><span class="icon-key ico" style="font-size:17px;"></span></span>
        <input type="password" id="password" name="password" value="${password}" class="form-control" placeholder="请输入密码">
      </div>
    </div>
    <span class="col-md-12 login_errorbox" id="message">${message}</span>
  </div>
  <!-- 
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <div class="checkbox">
        <label>
          <input type="checkbox">
          记住密码 </label>
      </div>
    </div>
  </div>
   -->
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="button" onclick="login()" class="btn btn-success btn-block btn-lg">登录</button>
    </div>
  </div>
</form>
</div>
<p style="text-align:center;color:#999;">技术支持：重庆同方融达信息科技有限公司&nbsp;${version }</p>
</body>
</html>