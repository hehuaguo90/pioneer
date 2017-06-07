<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<t:page>
	<jsp:attribute name="head">
<script type="text/javascript">
 	var url = "/pages/module/tSysArea/";
	function add() {
		page.newDataGrid({
			title : "新增地区信息",
			width : 600,
			height : 402,
			url : contextPath + url + "add.jsp"
		});
		
	}

	function edit() {
	    var row = $('#datagrid').datagrid('getSelected');
	       page.editDataGrid({
			title : "编辑地区信息",
			width : 600,
			height : 402,
			formatURL : function(obj) {
				var params="";
                params+="areaId=" + obj.id;
                params+="&areaName=" + obj.pAreaName;
				return contextPath +url+"edit.jsp?"+params;
			}
		});
	    
	}


    function view() {
        var row = $('#datagrid').datagrid('getSelected');

		page.editDataGrid({
			title : "地区信息详情",
			width : 600,
			height : 402,
			formatURL : function(obj) {
                var params="";
                params+="areaId=" + obj.id;
                params+="&levelName=" + obj.levelName; 
                return contextPath + url+"view.jsp?"+params;
			}
		});
    }
	function del() {
        page.delTreeGrid({
            formatURL : function(arr) {
                return contextPath +"/tSysArea/"+"delete";
            },
            formatPostData : function(arr) {
            	var a = [];
            	for(var i in arr){
            		a.push({
            			areaId : arr[i].id
            		});
            	}
                return {data:JSON.stringify(a)};
            }
        });
        
    }


	page.onRefresh = function() {
	//	page.loadDataGrid();
	$('#datagrid').treegrid('reload');
	};


function search(evt) {
	var areaCode = $('#areaCode').val();
	var shortName = $('#shortName').val();
	if(areaCode == "" && shortName == ""){
		page.loadDataGrid({
	        setOptions : function(opt) {
	            		opt.url = contextPath+"/tSysArea/"+"getAreaTrees?areaLevel=2";
	            		opt.method = "get";

	        }
	    });
	}else{
		page.loadDataGrid({
	        setOptions : function(opt) {
	            		opt.url = contextPath+"/tSysArea/"+"listSearchAll";
	            		opt.method = "post";
						opt.queryParams.areaCode = $('#areaCode').val();
						opt.queryParams.shortName = $('#shortName').val();
	            //opt.queryParams.seedName = $('#query').textbox('getValue');

	        }
	    });
	}
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
		地区代码:

            <input id="areaCode" name="areaCode"  type="text"
                   style="width: 146px;"   class="easyui-validatebox textbox"
                   data-options="validType:'length[1,50]'">

		地区名称:

            <input id="shortName" name="shortName"  type="text"
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
    <table id="datagrid" class="easyui-treegrid" style="min-height: 300px"
           data-options="url:'${contextPath}/tSysArea/getAreaTrees?areaLevel=2',idField:'id',treeField:'text',fit:true,rownumbers:true"
           toolbar="#toolbar">
		<thead>
            <tr>
                <th data-options="field:'ck',checkbox:true"></th>
                <th data-options="field:'text',width:200,align:'left',halign:'center'">地区名称</th>
                <th data-options="field:'code',width:200,align:'left',halign:'center'">地区代码</th>
                <th data-options="field:'levelName',width:100,align:'left',halign:'center'">级别</th>
                <th data-options="field:'order',width:100,align:'left',halign:'center'">显示顺序</th>
			</tr>
        </thead>	
    </table>
                </div>
        </div>
	</jsp:body>
</t:page>
