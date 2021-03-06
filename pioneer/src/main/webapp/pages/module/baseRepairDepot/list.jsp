<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<t:page>
	<jsp:attribute name="head">
<script type="text/javascript">
 	var url = "/pages/module/baseHomePage/";

	function edit() {
	    var row = $('#datagrid').datagrid('getSelected');
	       page.editDataGrid({
			title : "编辑",
			width : 800,
			height : 500,
			formatURL : function(obj) {
				var params="";
				params+="ID="+ obj.ID+"&NAME99=" + obj.NAME99+"&INFO=" + (obj.INFO||"")
				+"&PIC=" + (obj.PIC||"")+"&TITLE=" + (obj.TITLE||"")+"&BAK=" + (obj.BAK||"");
				return contextPath+ "/pages/module/baseRepairDepot/edit.jsp?"+params;
			}
		});
	}
	page.onLoad = function() {

		page.loadDataGrid({
			setOptions : function(opt) {
				opt.url = contextPath+"/tSysArea/anyWay?method=repairDepot";
				opt.method = "get";
			}
		});
	};

	page.onRefresh = function() {
		page.loadDataGrid();
	};

	function search() {
	    page.loadDataGrid({
	        setOptions : function(opt) {
	       		opt.url = contextPath + "/tSysArea/anyWay?method=repairDepot";
	       		opt.method = "post";
	            opt.queryParams.NAME99 = $('#NAME99').val();
	        }
	    });
	}
	   
	   function view(v){
		   if(!v){
			   return "";
		   }else{
			   return v;
		   }
	   }
</script>
	</jsp:attribute>
	<jsp:body>
	 <div id="divIndex" class="easyui-layout" fit="true">
	 <div data-options="region:'north',border:false" style="height:100px">
		<div id="location">
		<span>用户信息</span> &gt; <span>用户信息查询</span>
		</div>
		<div id="searchbar">
        <form>
		地区:
        <input id="NAME99" name="NAME99" type="text"
							style="width: 146px;" class="easyui-validatebox textbox"
							data-options="validType:'length[1,50]'">
		<a href="javascript:void search();" class="easyui-linkbutton"
							iconCls="icon-search">查询</a>
    	<a href="javascript:void page.resetForm();"
							class="easyui-linkbutton" iconCls="icon-reload">重置</a>
    </form>
	</div>
	 </div>

	<div id="toolbar">
		<a href="javascript:void edit();" class="easyui-linkbutton"
					iconCls="icon-edit" plain="true">编辑</a>
	</div>
<%--	<div region="west" style="width:200px">--%>
<%--		   <div class="tree-bar">--%>
<%--		                  组织机构:--%>
<%--	       </div>      --%>
<%--	       <ul id="treeIndex" style="margin-left: 10px"></ul>--%>
<%--	</div>--%>
	 <div region="center" border="false">
	<table id="datagrid" class="easyui-datagrid" style="min-height: 300px"
					data-options="fitColumns:true,pagination:true,rownumbers:true,sortable:true,fit:true"
					toolbar="#toolbar">
		<thead>
            <tr>
                <th data-options="field:'id',checkbox:true"></th>
                <th
								data-options="field:'TITLE',width:200,align:'left',halign:'center'">标题</th>
				<th
								data-options="field:'NAME99',width:200,align:'left',halign:'center'">检修所名称</th>
				<th
								data-options="field:'areaName',width:200,align:'left',halign:'center'">地区</th>
															
				<th
								data-options="field:'INFO',width:200,align:'left',halign:'center'">文字说明</th>
				<th
								data-options="field:'BAK',width:200,align:'left',halign:'center'">备注</th>					
			</tr>
        </thead>	
    </table>
    </div>
    </div>
	</jsp:body>
</t:page>
