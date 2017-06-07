<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<t:page>
	<jsp:attribute name="head">
<script type="text/javascript">
 	var url = "/pages/module/tSysDbRecord/";


 	 $(document).ready(function(){	   
 	    	   //按类型加载字典
 	    	   $('#recordType').combobox({    
 	    		    url:contextPath + "/tSysDict/listDict?type=RECORD_TYPE",    
 	    		    valueField:'id',    
 	    		    textField:'text' ,
 	    		    editable:false
 	    		});

 	    });

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
			title : "编辑",
			width : 600,
			height : 334,
			formatURL : function(obj) {
				var params="";
                params+="recordId=" + obj.recordId;
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
                params+="recordId=" + obj.recordId;
                return contextPath + url+"view.jsp?"+params;
			}
		});
    }
	function del() {// 方式一
/*		page.delDataGrid({
			formatURL : function(arr) {
				return contextPath + "/tSysDbRecord/delete";
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
                return contextPath +"/tSysDbRecord/"+"delete";
            },
            formatPostData : function(arr) {
                return {data:JSON.stringify(arr)};
            }
        });
    }
	page.onLoad = function() {

		page.loadDataGrid({
			setOptions : function(opt) {
				opt.url = contextPath+"/tSysDbRecord/"+"listByPage";
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
            		opt.url = contextPath+"/tSysDbRecord/"+"listByPage";
            		opt.method = "post";
					opt.queryParams.userName = $('#userName').val();
					opt.queryParams.recordType = $('#recordType').combobox("getValue");
        }
    });
}

function checkStatus(value, row, index){
	   if (value == 0) {
			return "备份";
		}else if (value == 1) {
			return "恢复";
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
		操作人:

            <input id="userName" name="userName"  type="text"
                   style="width: 146px;"   class="easyui-validatebox textbox"
                   data-options="validType:'length[1,32]'">

		记录类型:

            <input id="recordType" name="recordType"  type="text"
                   style="width: 146px;"   class="easyui-validatebox textbox" panelHeight="50"
                   data-options="validType:'length[1,2]'">


		<a href="javascript:void search();" class="easyui-linkbutton"
				iconCls="icon-search">查询</a>
    	<a href="javascript:void page.resetForm();" class="easyui-linkbutton"
       			iconCls="icon-reload">重置</a>

    </form>
	</div>

    </div>
	<div id="toolbar">
		<a href="javascript:void;" class="easyui-linkbutton"
				iconCls="icon-backup" plain="true">备份</a>
		<a href="javascript:void;" class="easyui-linkbutton"
				iconCls="icon-redo" plain="true">恢复</a>
		<a href="javascript:void;" class="easyui-linkbutton"
				iconCls="icon-download" plain="true">下载</a>
	</div>
                <div region="center" border="false">
	<table id="datagrid" class="easyui-datagrid" style="min-height: 300px"
			data-options="fitColumns:true,fit:true,pagination:true,rownumbers:true,sortable:true"
			toolbar="#toolbar">
		<thead>
            <tr>
                <th data-options="field:'ck',checkbox:true"></th>
                <th data-options="field:'userName',width:100,align:'left',halign:'center'">操作人</th>
                <th data-options="field:'recordType',width:100,align:'left',halign:'center',formatter:checkStatus">操作类型</th>
                <th data-options="field:'beginTime',width:100,align:'left',halign:'center'">操作时间</th>
                <th data-options="field:'endTime',width:100,align:'left',halign:'center'">完成时间</th>
                <th data-options="field:'fileName',width:100,align:'left',halign:'center'">文件名</th>                
			</tr>
        </thead>	
    </table>
                </div>
        </div>
	</jsp:body>
</t:page>
