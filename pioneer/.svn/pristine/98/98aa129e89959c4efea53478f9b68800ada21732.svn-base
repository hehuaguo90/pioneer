<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<t:page>
	<jsp:attribute name="head">
<script type="text/javascript">
 	var url = "/pages/module/tSysRight/";
	function add() {
		page.newDataGrid({
			title : "新增权限",
			width : 600,
			height : 470,
			url : contextPath + url + "add.jsp"
		});
	}

	function edit() {
	    var row = $('#datagrid').datagrid('getSelected');
	       page.editDataGrid({
			title : "编辑权限",
			width : 600,
			height : 470,
			formatURL : function(obj) {
				var params="";
                params+="rightId=" + obj.id;
				return contextPath +url+"edit.jsp?"+params;
			}
		});
	}


    function view() {
        var row = $('#datagrid').datagrid('getSelected');

		page.editDataGrid({
			title : "权限详情",
			width : 600,
			height : 470,
			formatURL : function(obj) {
                var params="";
                params+="rightId=" + obj.id;
                return contextPath + url+"view.jsp?"+params;
			}
		});
    }
	function del() {// 方式一
/*		page.delDataGrid({
			formatURL : function(arr) {
				return contextPath + "/tSysRight/delete";
			},
			formatPostData : function(arr) {
				var obj = new Array();
				$.each(arr, function(i, item) {
					obj.push(item.seedId);
				});
				return {
                    dataId : obj
				};
			}
		});*/

        page.delDataGrid({
            formatURL : function(arr) {
                return contextPath +"/tSysRight/delete";
            },
            formatPostData : function(arr) {
            	var a = [];
            	for(var i in arr){
            		a.push({
            			rightId : arr[i].id
            		});
            	}
                return {data:JSON.stringify(a)};
            }
        });
    }

	function search() {
	    page.loadDataGrid({
	        setOptions : function(opt) {
	       		opt.url = contextPath + "/tSysRight/getTreeGrid/0";
	       		opt.method = "post";
	            opt.queryParams.rightName = $('#rightName').val();
	        /*     opt.queryParams.rightSort = $("#rightSort").combobox('getValue'); */
	        }
	    });
	}
	
	/*
	function search(){
    	var keyword = $("#rightName").val();
    	$('#datagrid').treegrid('load',{
    		rightName: keyword
    	});
    }
	*/

</script>
	</jsp:attribute>
	<jsp:body>
	<div id="divIndex" class="easyui-layout" fit="true">
	<div  data-options="region:'north',border:false" style="height:100px" >
                <div id="location" >
						<span>菜单功能权限</span> &gt; <span>菜单功能权限查询</span>
				</div>

	<div id="searchbar">
        <form>
		权限名称:
        <input id="rightName" name="rightName"  type="text"
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
		<a href="javascript:void add();" class="easyui-linkbutton"
				iconCls="icon-add" plain="true">新增</a>
		<a href="javascript:void edit();" class="easyui-linkbutton"
				iconCls="icon-edit" plain="true">编辑</a>
		<a href="javascript:void del();" class="easyui-linkbutton"
				iconCls="icon-remove" plain="true">删除</a>
				<!-- 
		<a href="javascript:void view();" class="easyui-linkbutton"
				iconCls="icon-tip" plain="true">查看</a>
				 -->
		<!--<a href="javascript:void(0)" onclick="exportExcel();"
		   class="easyui-linkbutton" iconCls="icon-save" plain="true">导出</a>  -->
	</div>
	 <div region="center" border="false">
    <table id="datagrid" class="easyui-treegrid" style="min-height: 300px"
           data-options="url:'${contextPath}/tSysRight/getTreeGrid/0',idField:'id',treeField:'text',fit:true,rownumbers:true"
           toolbar="#toolbar">
        <thead>
        <tr>
              <th data-options="field:'ck',checkbox:true"></th>
              <th data-options="field:'text',width:200,align:'left',halign:'center'">权限名称</th>
              <th data-options="field:'href',width:250,align:'left',halign:'center'">权限地址</th>
              <th data-options="field:'type',width:100,align:'left',halign:'center'">权限类型</th>
              <th data-options="field:'order',width:100,align:'left',halign:'center'">权限序列</th><%--
               <th data-options="field:'logoUrl',width:200,align:'left',halign:'center'">图标样式</th>
               --%><th data-options="field:'remark',width:200,align:'left',halign:'center'">备注</th>
        </tr>
        </thead>
    </table>
    </div>
    </div>
	</jsp:body>
</t:page>
