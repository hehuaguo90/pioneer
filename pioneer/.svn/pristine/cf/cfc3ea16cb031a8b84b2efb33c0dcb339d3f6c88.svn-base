<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<t:page>
	<jsp:attribute name="head">
<script type="text/javascript"
			src="${ contextPath }/res/sys/main/page.js"></script>
<script type="text/javascript">
	page.onLoad = function() {
	   page.loadView({
		 url : contextPath + "/tSysUser/getBeanMapById/?${pageContext.request.queryString}"
	   });

	};
</script>
</jsp:attribute>
	<jsp:body>
	<form >
		<table>

				<tr >
					<th style="width:150px;">用户姓名:</th>
					<td><span id="userName" data-options=""></span></td>
				</tr>
				<tr>
					<th>用户名:</th>
					<td><span id="sysAccount" data-options=""></span></td>
				</tr>
				<tr>
					<th>座机:</th>
					<td><span id="userTel" data-options=""></span></td>
				</tr>
				<tr>
					<th>手机:</th>
					<td><span id="userMobile" data-options=""></span></td>
				</tr>
				<tr>
					<th>角色:</th>
					<td><span >${param.roleName }</span></td>
				</tr>
				<tr>
					<th>状态:</th>
					<td><span >${param.status }</span></td>
				</tr>
				<tr>
					<th>最后登陆时间:</th>
					<td><span id="lastLogTime" data-options=""></span></td>
				</tr>
				<tr>
					<th>备注:</th>
					<td><span id="remark" data-options=""></span></td>
				</tr>

				
		</table>
	</form>
	
	</jsp:body>
</t:page>
