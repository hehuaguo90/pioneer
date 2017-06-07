<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<script type="text/javascript" src="right.js"></script>

<t:page>
	<jsp:attribute name="head">
<script type="text/javascript">

		page.onLoad = function() {
		    loadRights();
		};
/*     $(document).ready(function(){
	     $('#treeType').tree({     
			    url: contextPath + '/tForm/getGroupFormTree',
			    method: 'post',
		        animate: true,
		        lines: true,
		        checkbox : true,
		        onBeforeSelect:function(node){
		        	//tree-node-selected
		        	var classes = node.target.className;
			    	//如果点击已被选中的节点，则取消选中
		        	if(classes.indexOf('tree-node-selected') > 0){
		        		node.target.className = classes.replace('tree-node-selected', '');
		        		//search();
		        		return false;
		        	}
		        },
		        onSelect: function(node){
					//search();
				}
        });
  }); */

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
    	$("#formId").val(nodeIds);

		page.saveForm();
   }
    
</script>
	</jsp:attribute>
	<jsp:body>
		<form method="post" action="${ contextPath }/tForm/setFormRight">
			<input type="hidden" id="formId" name="formId"> 
			<input type="hidden" id="roleId" name="roleId" value="${param.roleId }"> 
			<input type="hidden" id="type" name="type" value="${param.type }"> 
		</form>
		<div region="west" >
			  <div class="tree-bar">
			        表单分组:
		      </div>      
		      <ul id="treeType" style="margin-left: 10px"></ul>
		</div>

      <div id="operator">
		<a href="javascript:void save();" class="easyui-linkbutton">保存</a> 
		<a href="javascript:void page.resetForm()" class="easyui-linkbutton">重置</a>
	</div>
	</jsp:body>
</t:page>
