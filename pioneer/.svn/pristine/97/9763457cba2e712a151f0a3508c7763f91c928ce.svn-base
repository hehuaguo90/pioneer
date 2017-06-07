<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<t:page>
	<jsp:attribute name="head">
<script type="text/javascript">
 	var url = "/pages/module/tSysDataRight/";

    function setRight(type) {
        var row = $('#datagrid').datagrid('getSelected');
        var gridname= "";
        if(type==1){
        	gridname="审核授权";
        }else{
        	gridname="填报授权";
        }
		page.editDataGrid({
			title : gridname,
			width : 500,
			height : 350,
			formatURL : function(obj) {
                var params="";
                params+="roleId=" + obj.roleId;
                params+="&type=" + type;
                return contextPath + url+"setRight.jsp?"+params;
			}
		});
    }
    
    function setReportRight(type) {
        var row = $('#datagrid').datagrid('getSelected');
		page.editDataGrid({
			title : "报表授权",
			width : 500,
			height : 350,
			formatURL : function(obj) {
                var params="";
                params+="roleId=" + obj.roleId;
                return contextPath + url+"setReportRight.jsp?"+params;
			}
		});
    }

	page.onLoad = function() {

		page.loadDataGrid({
			setOptions : function(opt) {
				opt.url = contextPath+"/tSysRole/"+"listByPage";
				opt.method = "get";
			}
		});

	};

	page.onRefresh = function() {
		page.loadDataGrid();
	};


function search(evt) {
    page.loadDataGrid({
        setOptions : function(opt) {
            		opt.url = contextPath+"/tSysRole/"+"listByPage";
            		opt.method = "post";
					opt.queryParams.roleName = $('#roleName').val();
            //opt.queryParams.seedName = $('#query').textbox('getValue');

        }
    });
}


</script>
	</jsp:attribute>
	<jsp:body>
        <div id="divIndex" class="easyui-layout" fit="true">
    		<div  data-options="region:'north',border:false" style="height:100px" >
                <div id="location" >
						<span></span> &gt; <span>查询</span>
				</div>

	<div id="searchbar">
        <form>
		角色名称:

        <input id="roleName" name="roleName"  type="text"
                   style="width: 146px;"   class="easyui-validatebox textbox"
                   data-options="validType:'length[1,50]'">


		<a href="javascript:void search();" class="easyui-linkbutton"
				iconCls="icon-search">查询</a>
    	<a href="javascript:void page.resetForm();" class="easyui-linkbutton"
       			iconCls="icon-reload">重置</a>

    </form>
	</div>

    </div>
	<div id="toolbar">
		<a href="javascript:void setRight(0);" class="easyui-linkbutton"
				iconCls="icon-edit" plain="true">填报授权</a>
		<a href="javascript:void setRight(1);" class="easyui-linkbutton"
				iconCls="icon-edit" plain="true">审核授权</a>
		<a href="javascript:void setReportRight(3);" class="easyui-linkbutton"
				iconCls="icon-edit" plain="true">报表授权</a>
	</div>
                <div region="center" border="false">
	<table id="datagrid" class="easyui-datagrid" style="min-height: 300px"
			data-options="fitColumns:true,fit:true,pagination:true,rownumbers:true,sortable:true"
			toolbar="#toolbar">
		<thead>
            <tr>
                <th data-options="field:'ck',checkbox:true"></th>
                <th data-options="field:'roleName',width:100,align:'left',halign:'center'">角色名称</th>
                <th data-options="field:'remark',width:100,align:'left',halign:'center'">备注</th>
			</tr>
        </thead>	
    </table>
                </div>
        </div>
	</jsp:body>
</t:page>
