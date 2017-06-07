<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<t:page>
	<jsp:attribute name="head">
<script type="text/javascript">
 	    	var url = "/pages/module/tSysCustomArea/";




	function add() {
		page.newDataGrid({
			title : "新增区域分组",
			width : 500,
			height : 400,
			url : contextPath + url + "add.jsp"
		});
	}

	function edit() {
	    var row = $('#datagrid').datagrid('getSelected');
	       page.editDataGrid({
			title : "编辑区域分组",
			width : 500,
			height : 400,
			formatURL : function(obj) {
				var params="";
                params+="careaId=" + obj.careaId;
				return contextPath +url+"edit.jsp?"+params;
			}
		});
	}


    function view() {
        var row = $('#datagrid').datagrid('getSelected');

		page.editDataGrid({
			title : "区域分组详情",
			width : 600,
			height : 334,
			formatURL : function(obj) {
                var params="";
                params+="careaId=" + obj.careaId;
                return contextPath + url+"view.jsp?"+params;
			}
		});
    }
	function del() {// 方式一
/*		page.delDataGrid({
			formatURL : function(arr) {
				return contextPath + "/tSysCustomArea/delete";
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
                return contextPath +"/tSysCustomArea/"+"delete";
            },
            formatPostData : function(arr) {
            	 
                //只选择列表数据的id
                var a = [];
                	for(var i in arr){
                		var row = arr[i];
                		a.push({
                			careaId : row.careaId
                		});
                	}
                    return {data:JSON.stringify(a)};
     
     
                }
        }); 
    }
	page.onLoad = function() {

		page.loadDataGrid({
			setOptions : function(opt) {
				opt.url = contextPath+"/tSysCustomArea/"+"listByPage";
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
            		opt.url = contextPath+"/tSysCustomArea/"+"listByPage";
            		opt.method = "post";
					opt.queryParams.areaName = $('#areaName').val();
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
		名称:

            <input id="areaName" name="areaName"  type="text"
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
                <th data-options="field:'areaCode',width:100,align:'left',halign:'center'">区域代码</th>
                <th data-options="field:'areaName',width:100,align:'left',halign:'center'">名称</th>
                <th data-options="field:'showOrder',width:100,align:'left',halign:'center'">显示顺序</th>
                <th data-options="field:'createTime',width:100,align:'left',halign:'center'">创建时间</th>
                <th data-options="field:'remark',width:100,align:'left',halign:'center'">备注</th>
			</tr>
        </thead>	
    </table>
                </div>
        </div>
	</jsp:body>
</t:page>
