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
		 url : contextPath + "/tSysOptLog/getBeanMapById/?${pageContext.request.queryString}"
	   });

	};
</script>
</jsp:attribute>
	<jsp:body>
	<form >
		<table>
				<tr>
					<th>操作人姓名:</th>
					<td><span id="userName" data-options=""></span></td>
				</tr>
				<tr>
					<th>操作人账号:</th>
					<td><span id="sysName" data-options=""></span></td>
				</tr>
				<tr>
					<th>操作人角色名:</th>
					<td><span id="roleName" data-options=""></span></td>
				</tr>
				<tr>
					<th>操作时间:</th>
					<td><span id="opTime" data-options=""></span></td>
				</tr>
				<tr>
					<th>操作类型:</th>
					<td><span id="opType" data-options=""></span></td>
				</tr>
				<tr>
					<th>操作内容:</th>
					<td><span id="content" data-options=""></span></td>
				</tr>
				<tr>
					<th>操作人IP:</th>
					<td><span id="ip" data-options=""></span></td>
				</tr>

				
		</table>
	</form>
	
	</jsp:body>
</t:page>
