<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Strict//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<t:common />
	<script type="text/javascript">
	function showLogin(){
		top.location.href = "${contextPath}/pages/login.jsp";
	}
	</script>
	
	<style type="text/css">
	.errortxt {
		font-family: "微软雅黑";
		font-size: 16px;
		line-height:150%;
		color: #858585;
	}
	.errortitle{
		font-family: "微软雅黑";
		font-size: 24px;
		color: #ff0000;
		
	}
	
	#backlogin{
	    color: green;
	    text-decoration: none;
	}
	
	#backlogin:HOVER {
	    color:#F03C2B;
    }
	
	</style>
</head>
	<div style="background-color:#f4f4f4;height: 100%;width: 100%">
	<div style="height:200px;width:99%;margin-top:145px;background-color:#fff;position: absolute;">
		<div style="width:486px;height:200px;margin:auto;">
	    	<table width="100%" border="0" cellspacing="0" cellpadding="0">
	  <tr>
	    <td width="203" height="200" align="left" valign="middle">
	    <img src="${contextPath}/res/sys/image/err.png" width="157" height="156" /></td>
	    <td><p class="errortitle">未登陆或登陆过期，请重新登录！</p>
	    <p class="errortxt">${errmsg}</p>
	    <p ><a href="javascript:showLogin();" id="backlogin">返回登陆页</a></p>
	    </td>
	  </tr>
	</table>
	  </div>
	</div>
	</div>
</body>
</html>
	