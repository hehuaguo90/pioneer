<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<t:page>
	<jsp:attribute name="head">
<script type="text/javascript">
 	    	var url = "/pages/module/tSysDict/";




	function add() {
		page.newDataGrid({
			title : "新增数据字典",
			width : 500,
			height : 366,
			url : contextPath + url + "add.jsp"
		});
	}

	function edit() {
	    var row = $('#datagrid').datagrid('getSelected');
	       page.editDataGrid({
			title : "编辑数据字典",
			width : 500,
			height : 366,
			formatURL : function(obj) {
				var params="";
                params+="type=" + obj.type;
                params+="&code=" + obj.code;
                params+="&dictId=" + obj.dictId;
				return contextPath +url+"edit.jsp?"+params;
			}
		});
	}


    function view() {
        var row = $('#datagrid').datagrid('getSelected');

		page.editDataGrid({
			title : "数据字典表详情",
			width : 500,
			height : 366,
			formatURL : function(obj) {
                var params="";
                params+="dictId=" + obj.dictId;
                return contextPath + url+"view.jsp?"+params;
			}
		});
    }
	function del() {
        page.delDataGrid({
            formatURL : function(arr) {
                return contextPath +"/tSysDict/"+"delete";
            },
            formatPostData : function(arr) {
            	var a = [];
            	for(var i in arr){
            		a.push({
            			dictId : arr[i].dictId
            		});
            	}
                return {data:JSON.stringify(a)};
            }
        });
    }
	page.onLoad = function() {

		page.loadDataGrid({
			setOptions : function(opt) {
				opt.url = contextPath+"/tSysDict/"+"listByPage";
				opt.method = "get";
			}
		});

	};
	function search() {
	    page.loadDataGrid({
	        setOptions : function(opt) {
	       		opt.url = contextPath + "/tSysDict/listByPage";
	       		opt.method = "post";
	            opt.queryParams.nameLike = $('#name').val();
	            opt.queryParams.typeLike = $('#type').val();
	        }
	    });
	}
	page.onRefresh = function() {
		page.loadDataGrid();
	};



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
		字段名称:
        <input id="name" name="name"  type="text"
                   style="width: 146px;"   class="easyui-validatebox textbox"
                   data-options="validType:'length[1,50]'">
		字典类型:
        <input id="type" name="type"  type="text"
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
		<a href="javascript:void view();" class="easyui-linkbutton"
				iconCls="icon-tip" plain="true">查看</a>
	</div>
 <div region="center" border="false">
<table id="datagrid" class="easyui-datagrid" style="min-height: 300px"
			data-options="fitColumns:true,fit:true,pagination:true,rownumbers:true,sortable:true"
			toolbar="#toolbar">
		<thead>
            <tr>
                <th data-options="field:'ck',checkbox:true"></th>
                <th data-options="field:'name',width:100,align:'left',halign:'center'">字段名称</th>
                <th data-options="field:'type',width:80,align:'left',halign:'center'">字典类型</th>
                <th data-options="field:'code',width:80,align:'left',halign:'center'">字典代码</th>
                <th data-options="field:'remark',width:100,align:'left',halign:'center'">备注</th>
                <th data-options="field:'showOrder',width:30,align:'left',halign:'center'">显示顺序</th>
			</tr>
        </thead>	
    </table>
 </div>
 </div>
	</jsp:body>
</t:page>
