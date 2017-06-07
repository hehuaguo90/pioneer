<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Strict//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<t:common />

<script type="text/javascript"
	src="${ contextPath }/res/sys/main/main.js"></script>
		<script type="text/javascript"
	src="${ contextPath }/res/sys/main/jquery.md5.js"></script>

<link type="text/css" rel="stylesheet"
	href="${ contextPath }/res/sys/themes/default/loginstyle.css" />
<script type="text/javascript">
	function myKeyDown(e) {
		var keyNum;
		if (window.event) {
			keyNum = e.keyCode;
		} else {
			keyNum = e.which;
		}
		if (keyNum == 13){
		//var text = $('#password').val();
		//$('#password').val($.md5(text));
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
			$("#message").text("请输入登陆用户！");
			return;
		}
		
		if(!password){
			$("#message").text("请输入完登陆密码！");
			return;
		}
		
		if(!validateCode){
			$("#message").text("请输入验证码！");
			return;
		}
		
		var myform = document.getElementById("login_form");
		//var text = $('#password').val();
		//$('#password').val($.md5(text));
		myform.submit();  
    }
	
	function refreshCode(img) {
		img.src = contextPath + "/imageValidateCode?" + Math.random();
	}
	
</script>
<style type="text/css">
body,td,th {
	font-size: 14px;
	color: #636363;
	font-family:"Microsoft YaHei","微软雅黑"
}
body {
	background-color: #f0f0f0;
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
</style>
</head>
<body onkeydown="myKeyDown(event)" >
<form id="login_form" action="${contextPath}/tLoginObjAction/userLogin" method="post">	
<div style="width:1440px;height:160px;margin:auto;"><img src="${ contextPath }/res/sys/themes/default/images/web_login_logo.png" width="475" height="83"  style="margin-left:102px;margin-top:40px;"/></div>
<div class="loginadbox" >
	<div class="loginadbox_abs">
    	<div class="loginbox"> 
        	<table width="224" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td height="45" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="logintable">
      <tr>
        <td valign="middle" class="loginicotd"><img src="${ contextPath }/res/sys/themes/default/images/web_login_userico.png" width="29" height="31" /></td>
        <td align="left" valign="middle" class="logintxt">用&nbsp;&nbsp;&nbsp;户</td>
        
        <td align="left" valign="middle">
        <input id="account" name="account" type="text" class="logininputstyle" value="${account}" />
        </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height="45" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="logintable">
      <tr>
        <td valign="middle" class="loginicotd"><img src="${ contextPath }/res/sys/themes/default/images/web_login_passwordico.png" width="29" height="31" /></td>
        <td align="left" valign="middle" class="logintxt">密&nbsp;&nbsp;&nbsp;码</td>
        <td align="left" valign="middle">
        <input id="password" name="password" type="password" class="logininputstyle" value="${password}"/>
        </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height="45" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="logintable">
      <tr>
        <td valign="middle" class="loginicotd"><img src="${ contextPath }/res/sys/themes/default/images/web_login_codeico.png" width="29" height="31" /></td>
        
        <td align="left" valign="middle" class="logintxt">验证码</td>
        
        <td width="71" align="left" valign="middle">
        <input maxlength="4" name="validateCode" id="validateCode" type="text" class="logininputstyle"
											style="width:60px"/>
        </td>
        <td valign="middle" style="cursor: pointer;">
            <img src="${ contextPath }/imageValidateCode" onclick="refreshCode(this)" width="65" height="31" title="点击刷新验证码" />
        </td>
      </tr>
    </table>
    </td>
  </tr>
  <tr>
    <td height="45" align="center" valign="top">
    <input type="button"  class="loginbtn" style="cursor:pointer;" onclick="login()"/>
    </td>
  </tr>
  <tr>
    <td height="45" align="center" valign="top" class="loginerror">${message}&nbsp;</td>
  </tr>
</table>
      </div>
    </div>
</div>
<div style="height:140px;line-height:180px;text-align:center;padding-right:0px;">版权所有：<a href="http://rota.thtf.com.cn/wellsysqd/tPtTemplate/syFtl"  target="_blank"   style='color:#636363;text-decoration:none;height:140px;line-height:180px;text-align:center;padding-right:0px;'>重庆同方融达信息科技有限公司</a>&nbsp;&nbsp;${version }</div>
</form>
</body>
</html>
