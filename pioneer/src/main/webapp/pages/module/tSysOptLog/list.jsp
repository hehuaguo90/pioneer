<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<t:page>
	<jsp:attribute name="head">
<script type="text/javascript">
 	    	var url = "/pages/module/tSysOptLog/";
	function add() {
		page.newDataGrid({
			title : "新增",
			width : 600,
			height : 436,
			url : contextPath + url + "add.jsp"
		});
	}

	function edit() {
	    var row = $('#datagrid').datagrid('getSelected');
	       page.editDataGrid({
			title : "编辑",
			width : 600,
			height : 436,
			formatURL : function(obj) {
				var params="";
                params+="logId=" + obj.logId;
				return contextPath +url+"edit.jsp?"+params;
			}
		});
	}


    function view() {
        var row = $('#datagrid').datagrid('getSelected');

		page.editDataGrid({
			title : "详情",
			width : 600,
			height : 436,
			formatURL : function(obj) {
                var params="";
                params+="logId=" + obj.logId;
                return contextPath + url+"view.jsp?"+params;
			}
		});
    }
	function del() {// 方式一
/*		page.delDataGrid({
			formatURL : function(arr) {
				return contextPath + "/tSysOptLog/delete";
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
                return contextPath +"/tSysOptLog/"+"delete";
            },
            formatPostData : function(arr) {
                return {data:JSON.stringify(arr)};
            }
        });
    }
	page.onLoad = function() {

		page.loadDataGrid({
			setOptions : function(opt) {
				opt.url = contextPath+"/tSysOptLog/"+"listByPage";
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
            		opt.url = contextPath+"/tSysOptLog/"+"listByPage";
            		opt.method = "post";
					opt.queryParams.userName = $('#userName').val();;
					opt.queryParams.sysName = $('#sysName').val();
					opt.queryParams.opTime = $('#opTime').val();
					opt.queryParams.opType = $('#opType').val();
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
		操作人姓名:

            <input id="userName" name="userName"  type="text"
                   style="width: 146px;"   class="easyui-validatebox textbox"
                   data-options="validType:'length[1,50]'">

		操作人账号:

            <input id="sysName" name="sysName"  type="text"
                   style="width: 146px;"   class="easyui-validatebox textbox"
                   data-options="validType:'length[1,50]'">
<!-- 
		操作时间:

        <input id="opTime" name="opTime"  type="text"
               style="width: 146px;"   class= "easyui-datetimebox width-5"  data-options="editable:false" >
		操作类型:

            <input id="opType" name="opType"  type="text"
                   style="width: 146px;"   class="easyui-validatebox textbox"
                   data-options="validType:'length[1,2]'"> -->


		<a href="javascript:void search();" class="easyui-linkbutton"
				iconCls="icon-search">查询</a>
    	<a href="javascript:void page.resetForm();" class="easyui-linkbutton"
       			iconCls="icon-reload">重置</a>

    </form>
	</div>

    </div>
<!-- 	<div id="toolbar">
		<a href="javascript:void add();" class="easyui-linkbutton"
				iconCls="icon-add" plain="true">新增</a>
		<a href="javascript:void edit();" class="easyui-linkbutton"
				iconCls="icon-edit" plain="true">编辑</a>
		<a href="javascript:void del();" class="easyui-linkbutton"
				iconCls="icon-remove" plain="true">删除</a>
		<a href="javascript:void view();" class="easyui-linkbutton"
				iconCls="icon-ok" plain="true">查看</a>
	</div> -->
                <div region="center" border="false">
	<table id="datagrid" class="easyui-datagrid" style="min-height: 300px"
			data-options="fitColumns:true,fit:true,pagination:true,rownumbers:true,sortable:true"
			toolbar="#toolbar">
		<thead>
            <tr>
                <th data-options="field:'ck',checkbox:true"></th>
               <%--  <th data-options="field:'userId',width:100,align:'left',halign:'center'">操作人Id</th> --%>
                <th data-options="field:'userName',width:100,align:'left',halign:'center'">操作人姓名</th>
                <th data-options="field:'sysName',width:100,align:'left',halign:'center'">操作人账号</th>
               <%-- <th data-options="field:'roleName',width:100,align:'left',halign:'center'">操作人角色名</th> --%>
                <th data-options="field:'opTime',width:100,align:'left',halign:'center'">操作时间</th>
                <th data-options="field:'opTypeName',width:100,align:'left',halign:'center'">操作类型</th>
                <th data-options="field:'content',width:100,align:'left',halign:'center'">操作内容</th>
                <th data-options="field:'ip',width:100,align:'left',halign:'center'">操作人IP</th>
			</tr>
        </thead>	
    </table>
                </div>
        </div>
	</jsp:body>
</t:page>
