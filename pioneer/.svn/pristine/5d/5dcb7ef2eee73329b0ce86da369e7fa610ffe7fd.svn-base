<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<t:page>
	<jsp:attribute name="head">
<script type="text/javascript">
 	var url = "/pages/module/baseRepairRoute/";

	function add() {
		page.newDataGrid({
			title : "新增检修线路",
			width : 600,
			height : 402,
			url : contextPath + url + "add.jsp"
		});
		
	}
	function del() {
		var row = $('#datagrid').datagrid('getSelections');
 	   if(row.length==0){
	          page.error("请至少选择一条数据");
       }else{
    	   var ids = "";
    	   for(var i = 0; i < row.length; i++){
    		   ids+= row[i].id+",";
    	   }
    	   page.confirm("是否确定删除数据?").then(function(r){
    		  if(r){
    			  page.send({
						url : contextPath +"/tSysArea/anyWay?method=deleteRepairRoute",
						method : "post",
						data : {data:ids}
					}).then(function(data) {
						page.alert(data).then(function() {
							if (data.status === 1)
								page.loadDataGrid({});
						});
					});
    		  }
    	   } );
       }    
        
    }
	function edit() {
	    var row = $('#datagrid').datagrid('getSelected');
	       page.editDataGrid({
			title : "编辑",
			width : 400,
			height : 300,
			formatURL : function(obj) {
				var params="";
				params+="id="+ obj.id+"&mc=" + obj.mc+"&bh=" + (obj.bh||"")
				+"&statusShow=" + (obj.status||"");
				return contextPath+ "/pages/module/baseRepairRoute/edit.jsp?"+params;
			}
		});
	}
	function editJxs() {
		page.newDataGrid({
			title : "修改检修所线路状态",
			width : 600,
			height : 402,
			url : contextPath + url + "editJxs.jsp"
		});
	}
	page.onLoad = function() {

		page.loadDataGrid({
			setOptions : function(opt) {
				opt.url = contextPath+"/tSysArea/anyWay?method=repairRoute";
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
	       		opt.url = contextPath + "/tSysArea/anyWay?method=repairRoute";
	       		opt.method = "post";
	            opt.queryParams.mc = $('#mc').val();
	        }
	    });
	}
	   
	   function view(v){
		   if(v == 0){
			   return "正常";
		   }else if(v == 1){
			   return "已恢复"; 
		   }else if(v == 2){
			   return "部分恢复"; 
		   }else if(v == 3){
			   return "未恢复"; 
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
		线路名称:
        <input id="mc" name="mc" type="text"
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
		<a href="javascript:void add();" class="easyui-linkbutton"
					iconCls="icon-add" plain="true">新增</a>
		<a href="javascript:void edit();" class="easyui-linkbutton"
					iconCls="icon-edit" plain="true">编辑</a>
		<a href="javascript:void editJxs();" class="easyui-linkbutton"
					iconCls="icon-edit" plain="true">修改检修所状态</a>
		<a href="javascript:void del();" class="easyui-linkbutton"
					iconCls="icon-remove" plain="true">删除</a>
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
                <th  data-options="field:'mc',width:200,align:'left',halign:'center'">线路名称</th>
				<th  data-options="field:'bh',width:200,align:'left',halign:'center'">线路编号</th>
				<th  data-options="field:'name99',width:200,align:'left',halign:'center'">所属地区</th>
				<th  data-options="field:'districtName',width:200,align:'left',halign:'center'">所属区县</th>
				<th  data-options="field:'status',width:200,align:'left',halign:'center',formatter:view">状态</th>
			</tr>
        </thead>	
    </table>
    </div>
    </div>
	</jsp:body>
</t:page>
