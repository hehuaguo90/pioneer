<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<t:form>
	<jsp:attribute name="head">
		<script type="text/javascript">
			$(document).ready(function() {
				initValidatePane();
				var param = "${pageContext.request.queryString}" || "${queryParam}";
				 page.loadView({
				      url : contextPath + "/tSysDbRecord/getBeanMapById/?" + param;
			     });
			});
		</script>
	</jsp:attribute>
	<jsp:body>
	<t:formViewHead></t:formViewHead>
	<form>
		<table>

				<tr>
					<th>外键，操作用户id:</th>
					<td><span id="userId" data-options=""></span></td>
				</tr>
				<tr>
					<th>文件名:</th>
					<td><span id="fileName" data-options=""></span></td>
				</tr>
				<tr>
					<th>操作时间:</th>
					<td><span id="beginTime" data-options=""></span></td>
				</tr>
				<tr>
					<th>完成时间:</th>
					<td><span id="endTime" data-options=""></span></td>
				</tr>
				<tr>
					<th>记录类型:</th>
					<td><span id="recordType" data-options=""></span></td>
				</tr>

				
		</table>
	</form>
	<t:formViewFooter></t:formViewFooter>
	</jsp:body>
</t:form>
