<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<t:page>
	<jsp:attribute name="head">
<script type="text/javascript">
 	    	var url = "/pages/module/tSysRoleRight/";




	function add() {
		page.newDataGrid({
			title : "新增",
			width : 600,
			height : 232,
			url : contextPath + url + "add.jsp"
		});
	}

	function edit() {
	    var row = $('#datagrid').datagrid('getSelected');
	       page.editDataGrid({
			title : "编辑",
			width : 600,
			height : 232,
			formatURL : function(obj) {
				var params="";
                params+="roleRightId=" + obj.roleRightId;
				return contextPath +url+"edit.jsp?"+params;
			}
		});
	}


    function view() {
        var row = $('#datagrid').datagrid('getSelected');

		page.editDataGrid({
			title : "详情",
			width : 600,
			height : 232,
			formatURL : function(obj) {
                var params="";
                params+="roleRightId=" + obj.roleRightId;
                return contextPath + url+"view.jsp?"+params;
			}
		});
    }
	function del() {// 方式一
/*		page.delDataGrid({
			formatURL : function(arr) {
				return contextPath + "/tSysRoleRight/delete";
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
                return contextPath +"/tSysRoleRight/"+"delete";
            },
            formatPostData : function(arr) {
                return {data:JSON.stringify(arr)};
            }
        });
    }
	page.onLoad = function() {

		page.loadDataGrid({
			setOptions : function(opt) {
				opt.url = contextPath+"/tSysRoleRight/"+"listByPage";
				opt.method = "get";
			}
		});

	};

	page.onRefresh = function() {
		page.loadDataGrid();
	};



    function exportExcel() {// 方式一
        window.location.href = "${contextPath}/tSysRoleRight/export";
        /*				"id="+ $('#id').textbox('getValue')+
                "&qkfl="+ $('#qkfl').textbox('getValue')+
                "&qksb="+ $('#qksb').textbox('getValue')+
                "&cjsj="+ $('#cjsj').textbox('getValue')+
                "&sbrid="+ $('#sbrid').textbox('getValue')+
                "&treeData="+ $('#treeData').textbox('getValue');*/
    }
/*    function formatCK(codeFieldCfg,row){
        if(row.result =="0"){ //抓取失败的行返回 checkbox,成功了的什么都不返回
            return '<input type="checkbox" class="ck" name="DataGridCheckbox"/>';
        }
    }*/
</script>
	</jsp:attribute>
	<jsp:body>
        <div id="divIndex" class="easyui-layout" fit="true">
    		<div  data-options="region:'north',border:false" style="height:40px" >
                <div id="location" >
						<span></span> &gt; <span>查询</span>
				</div>

    </div>
	<div id="toolbar">
		<a href="javascript:void add();" class="easyui-linkbutton"
				iconCls="icon-add" plain="true">新增</a>
		<a href="javascript:void edit();" class="easyui-linkbutton"
				iconCls="icon-edit" plain="true">编辑</a>
		<a href="javascript:void del();" class="easyui-linkbutton"
				iconCls="icon-remove" plain="true">删除</a>
		<a href="javascript:void view();" class="easyui-linkbutton"
				iconCls="icon-ok" plain="true">查看</a>
		<a href="javascript:void(0)" onclick="exportExcel();"
		   class="easyui-linkbutton" iconCls="icon-save" plain="true">导出</a>
	</div>
                <div region="center" border="false">
	<table id="datagrid" class="easyui-datagrid" style="min-height: 300px"
			data-options="fitColumns:true,fit:true,pagination:true,rownumbers:true,sortable:true"
			toolbar="#toolbar">
		<thead>
            <tr>
                <th data-options="field:'ck',checkbox:true"></th>
                <th data-options="field:'roleId',width:100,align:'left',halign:'center'">外键，角色Id</th>
                <th data-options="field:'rightId',width:100,align:'left',halign:'center'">外键，权限id</th>
			</tr>
        </thead>	
    </table>
                </div>
        </div>
	</jsp:body>
</t:page>
