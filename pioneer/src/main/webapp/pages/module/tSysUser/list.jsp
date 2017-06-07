<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<t:page>
	<jsp:attribute name="head">
<script type="text/javascript">
 	var url = "/pages/module/tSysUser/";
 	$(document).ready(function(){
 	    	  /*  $('#indexTree').combotree({
 	    			url : contextPath + "/tSysArea/getAreaTree",
 	    			required : false,
 	    			 multiple: true,
 	    			onChange : function(newValue, oldValue){
 	    				$("#areaId").val(newValue);
 	    			},
 	    			onClick: function(node){
 	    				console.log("node ", node)
 	    				//如果点击的是指标
 	    				if(node.iconCls == "icon-add"){
 	    					getIndexConfig(node.id)
 	    				}
 	    			}
 	    		}); */
 	   	   
 	   	   //按类型加载字典
 	   	   $('#status').combobox({    
 	   		    url:contextPath + "/tSysDict/listDict?type=STATUS",    
 	   		    valueField:'id',    
 	   		    textField:'text' ,
 	   		    editable:false
 	   		});   
 	    });



	function add() {
		var treeValue ="";
	    if($('#treeIndex').tree('getSelected')){
	    	treeValue = $('#treeIndex').tree('getSelected').id;
	    }
	    var params="";
        params+="orgId=" + treeValue;
        
		page.newDataGrid({
			title : "新增用户信息",
			width : 500,
			height : 436,
			url : contextPath + url + "add.jsp?"+params
		});
	}

	function edit() {
	    var row = $('#datagrid').datagrid('getSelected');
	       page.editDataGrid({
			title : "编辑用户信息",
			width : 500,
			height : 436,
			formatURL : function(obj) {
				var params="";
                params+="userId=" + obj.id;
				return contextPath +url+"edit.jsp?"+params;
			}
		});
	}


    function view() {
        var row = $('#datagrid').datagrid('getSelected');

		page.editDataGrid({
			title : "用户信息详情",
			width : 600,
			height : 436,
			formatURL : function(obj) {
                var params="";
                params+="userId=" + obj.id;
                params+="&status=" + checkStatus(obj.status,null,null);
                params+="&roleName=" + obj.roleName;
                return contextPath + url+"view.jsp?"+params;
			}
		});
    }
	function del() {// 方式一
/*		page.delDataGrid({
			formatURL : function(arr) {
				return contextPath + "/tSysUser/delete";
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
 
                return contextPath +"/tSysUser/"+"delete";
            },
            formatPostData : function(arr) {
 
            //只选择列表数据的id
            var a = [];
            	for(var i in arr){
            		var row = arr[i];
            		a.push({
            			userId : row.id
            		});
            	}
                return {data:JSON.stringify(a)};
 
 
            }
        });
    }
	page.onLoad = function() {

		page.loadDataGrid({
			setOptions : function(opt) {
				opt.url = contextPath+"/tSysUser/"+"listByPage";
				opt.method = "get";
			}
		});
	};

	page.onRefresh = function() {
		page.loadDataGrid();
	};
	//得到id数组
	function getIds(){
					var checkedItems = $('#datagrid').datagrid('getChecked');
		    		var idAry = [];
				    $.each(checkedItems, function(index, item){
				        idAry.push(item.id);
				   	});   
					var ids = idAry.join(",");
					return ids;
				}
	// 启用账号
	function dataOpen() {
				$.messager.confirm('提示', '是否确定启用？', function(r) {
					if (r) {
						var url =  contextPath +"/tSysUser/"+"updateStatus";
						var ids = getIds();
						var params = {
							id : ids,
							loginErrorCount : 0,
							status : 1
						};
						jQuery.post(url, params,function(data){
						page.info(data.message);
						page.loadDataGrid();
						},"json");
					}
				});
			}
	//停用账号
	function dataStop() {
				$.messager.confirm('提示', '是否确定停用？', function(r) {
					if (r) {
						var url =  contextPath +"/tSysUser/"+"updateStatus";
						var ids = getIds();
						var params = {
							id : ids,
							status : 0
						};
						jQuery.post(url, params,function(data){
						page.info(data.message);
						page.loadDataGrid();
						},"json");
					}
				});
			}
	function search() {
		var k ;
	    if($('#treeIndex').tree('getSelected')){
	        k = $('#treeIndex').tree('getSelected').id;
	    }
		    
	    page.loadDataGrid({
	        setOptions : function(opt) {
	       		opt.url = contextPath + "/tSysUser/"+"listByPage";
	       		opt.method = "post";
	            opt.queryParams.userName = $('#userName').val();
	            if(k){
	                opt.queryParams.pid = k;
	            }else{
	                opt.queryParams.pid = "";
	            }
	            
	            opt.queryParams.status = $('#status').combobox("getValue");
	        }
	    });
	}
	   function checkStatus(value, row, index){
		   if (value == 0) {
				return "停用";
			}else if (value == 1) {
				return "正常";
			} else{
				return "删除";
			}
	   }
	   
	   $(document).ready(function(){
		     $('#treeIndex').tree({     
				    url: contextPath + "/tSysUser/getOrgTree?groupType=6&_" + new Date().getTime(),
				    method: 'post',
			        animate: true,
			        lines: true,
			        onBeforeSelect:function(node){
			        	//tree-node-selected
			        	var classes = node.target.className;
				    	//如果点击已被选中的节点，则取消选中
			        	if(classes.indexOf('tree-node-selected') > 0){
			        		node.target.className = classes.replace('tree-node-selected', '');
			        		search();
			        		return false;
			        	}
			        },
			        onSelect: function(node){
						search();
					}
	        });
	    });
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
		用户姓名:
        <input id="userName" name="userName" type="text"
							style="width: 146px;" class="easyui-validatebox textbox"
							data-options="validType:'length[1,50]'">
		<!-- 所属地区:
		<input id="indexTree" style="width: 166px;">
		<input id="areaId" name="areaId" type="text" style="width: 146px;display: none;"> -->
		用户状态:
		<input id="status" name="status" type="text" style="width: 146px;" panelHeight="50">
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
		<a href="javascript:void del();" class="easyui-linkbutton"
					iconCls="icon-remove" plain="true">删除</a>
		<a href="javascript:void view();" class="easyui-linkbutton"
					iconCls="icon-tip" plain="true">查看</a>
		   <a href="javascript:void(0)" onclick="dataOpen();"
					class="easyui-linkbutton" iconCls="icon-qy" plain="true">启用</a>
		   <a href="javascript:void(0)" onclick="dataStop();"
					class="easyui-linkbutton" iconCls="icon-ty" plain="true">停用</a>
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
                <th data-options="field:'ck',checkbox:true"></th>
                <th
								data-options="field:'userName',width:200,align:'left',halign:'center'">用户姓名</th>
                <th
								data-options="field:'sysAccount',width:150,align:'left',halign:'center'">用户名</th>
                 <th
								data-options="field:'myAreaName',width:150,align:'left',halign:'center'">所属地区</th>    
                <th
								data-options="field:'userMobile',width:200,align:'left',halign:'center'">手机号码</th>
                <th
								data-options="field:'status',width:80,align:'center',halign:'center',formatter:checkStatus">用户状态</th>
                <th
								data-options="field:'lastLogTime',width:200,align:'left',halign:'center'">最后登录时间</th>
			</tr>
        </thead>	
    </table>
    </div>
    </div>
	</jsp:body>
</t:page>
