<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<script type="text/javascript" src="reportRight.js"></script>

<t:page>
	<jsp:attribute name="head">
<script type="text/javascript">

		page.onLoad = function() {
			loadReportRights();
		};

    function save() {
    	var nodes = $('#treeType').tree('getChecked');
    	
    	if (!nodes || nodes.length == 0) {
    		$.messager.alert('系统信息', '必须授限', 'warning');
    		return;
    	}

    	var nodeIds = "";
    	for ( var i = 0; i < nodes.length; i++) {
    		nodeIds += nodes[i].id;
    		if (i < nodes.length - 1) {
    			nodeIds += ",";
    		}
    	}
    	$("#reportId").val(nodeIds);

		page.saveForm();
   }
    
</script>
	</jsp:attribute>
	<jsp:body>
		<form method="post" action="${ contextPath }/tReport/setReportRight">
			<input type="hidden" id="reportId" name="reportId"> 
			<input type="hidden" id="roleId" name="roleId" value="${param.roleId }"> 
		</form>
		<div region="west" >
			  <div class="tree-bar">
			        报表分组:
		      </div>      
		      <ul id="treeType" style="margin-left: 10px"></ul>
		</div>

      <div id="operator">
		<a href="javascript:void save();" class="easyui-linkbutton">保存</a> 
		<a href="javascript:void page.resetForm()" class="easyui-linkbutton">重置</a>
	</div>
	</jsp:body>
</t:page>
