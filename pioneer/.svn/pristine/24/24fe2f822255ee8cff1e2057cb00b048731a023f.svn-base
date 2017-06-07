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
		 url : contextPath + "/tSysArea/getBeanMapById/?${pageContext.request.queryString}"
	   });

	};
</script>
</jsp:attribute>
	<jsp:body>
	<form >
		<table>

				<tr>
					<th style="width:150px;">地区代码:</th>
					<td><span id="areaCode" data-options=""></span></td>
				</tr>
				<tr>
					<th>地区名称:</th>
					<td><span id="fullName" data-options=""></span></td>
				</tr>
				<tr>
					<th>地区简称:</th>
					<td><span id="shortName" data-options=""></span></td>
				</tr>
				<tr>
					<th>级别:</th>
					<td><span >${param.levelName }</span></td>
				</tr>
				<tr>
					<th>显示顺序:</th>
					<td><span id="showOrder" data-options=""></span></td>
				</tr>

				
		</table>
	</form>
	
	</jsp:body>
</t:page>
