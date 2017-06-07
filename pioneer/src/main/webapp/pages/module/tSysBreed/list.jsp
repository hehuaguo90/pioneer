<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<t:page>
	<jsp:attribute name="head">
<script type="text/javascript">
 	    	var url = "/pages/module/tSysBreed/";




	function add() {
		page.newDataGrid({
			title : "新增",
			width : 600,
			height : 334,
			url : contextPath + url + "add.jsp"
		});
	}

	function edit() {
	    var row = $('#datagrid').datagrid('getSelected');
	       page.editDataGrid({
			title : "编辑品种",
			width : 600,
			height : 334,
			formatURL : function(obj) {
				var params="";
                params+="breedId=" + obj.id;
				return contextPath +url+"edit.jsp?"+params;
			}
		});
	}


    function view() {
        var row = $('#datagrid').datagrid('getSelected');

		page.editDataGrid({
			title : "详情",
			width : 600,
			height : 334,
			formatURL : function(obj) {
                var params="";
                params+="breedId=" + obj.id;
                return contextPath + url+"view.jsp?"+params;
			}
		});
    }
	function del() {// 方式一
/*		page.delDataGrid({
			formatURL : function(arr) {
				return contextPath + "/tSysBreed/delete";
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
                return contextPath +"/tSysBreed/"+"delete";
            },
            formatPostData : function(arr) {
            	var a = [];
            	for(var i in arr){
            		a.push({
            			breedId : arr[i].id
            		});
            	}
                return {data:JSON.stringify(a)};
            }
        });
    }
	
	/*
	page.onLoad = function() {

		page.loadDataGrid({
			setOptions : function(opt) {
				opt.url = contextPath+"/tSysBreed/getTreeGrid/0";
				opt.method = "get";
			}
		});

	};*/

	page.onRefresh = function() {
		page.loadDataGrid();
	};

	
	function search() {
	    page.loadDataGrid({
	        setOptions : function(opt) {
	       		opt.url = contextPath + "/tSysBreed/getTreeGrid/0";
	       		opt.method = "post";
	            opt.queryParams.breedName = $('#breedName').val();
	        /*     opt.queryParams.rightSort = $("#rightSort").combobox('getValue'); */
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
		品种名称:

            <input id="breedName" name="breedName"  type="text"
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
	<!-- 
		<a href="javascript:void add();" class="easyui-linkbutton"
				iconCls="icon-add" plain="true">新增</a>
	 -->			
				
		<a href="javascript:void edit();" class="easyui-linkbutton"
				iconCls="icon-edit" plain="true">编辑</a>
				<!-- 
		<a href="javascript:void del();" class="easyui-linkbutton"
				iconCls="icon-remove" plain="true">删除</a>
		<a href="javascript:void view();" class="easyui-linkbutton"
				iconCls="icon-ok" plain="true">查看</a>
				 -->
	</div>
                <div region="center" border="false">
	<table id="datagrid" class="easyui-treegrid" style="min-height: 300px"
			data-options="url:'${contextPath}/tSysBreed/getTreeGrid/0',idField:'id',treeField:'text',fit:true,rownumbers:true" toolbar="#toolbar">
		<thead>
            <tr>
                <th data-options="field:'ck',checkbox:true"></th>
                <th data-options="field:'text',width:200,align:'left',halign:'center'">品种名称</th>
                <th data-options="field:'remark',width:200,align:'left',halign:'center'">备注</th>
			</tr>
        </thead>	
    </table>
                </div>
        </div>
	</jsp:body>
</t:page>
