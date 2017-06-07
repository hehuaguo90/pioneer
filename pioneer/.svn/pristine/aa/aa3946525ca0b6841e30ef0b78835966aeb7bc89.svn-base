<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<t:page>
	<jsp:attribute name="head">
<script type="text/javascript"
		src="${  contextPath }/res/sys/main/page.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	   //按类型加载字典
	   $('#groupType').combobox({    
		    url:contextPath + "/tSysDict/listDict?type=GROUP_TYPE",    
		    valueField:'id',    
		    textField:'text',
		    editable:false
		});
	   
	   //按类型加载字典
	  /*  $('#pid').combobox({    
		    url:contextPath + "/tSysGroup/groupList?pid=0",    
		    valueField:'groupId',    
		    textField:'groupName',
		    editable:false,
			onChange : function(newValue, oldValue){
				if(newValue!=0){
					$("#groupType_tr").hide();
				}else{
					$("#groupType_tr").show();
				}
			},
		}); */
	   $('#indexTree').combotree({
			url : contextPath + "/tSysGroup/getGroupTree",
			required : false,
			 multiple: false,
			onChange : function(newValue, oldValue){
				
				$("#pid").val(newValue);
				if(newValue!=0){
					$("#groupType_tr").hide();
				}else{
					$("#groupType_tr").show();
				}
			},
			onClick: function(node){
				console.log("node ", node)
				//如果点击的是指标
				if(node.iconCls == "icon-add"){
					getIndexConfig(node.id)
				}
			}
		});
});

	
</script>
</jsp:attribute>
	<jsp:body>
	<form method="post" action="${ contextPath }/tSysGroup/add">
	<input id="pid" name="pid" type="hidden">
        <table class="default_form_input">
            <tr>
                <th>分组名称:</th>
                <td>

                            <input id="groupName" name="groupName"  type="text"
                                      class="easyui-validatebox textbox"
                                   data-options="required:true,validType:'length[1,50]'" >

                </td>
            </tr>
            <tr>
                <th>上级分组:</th>
                <td>

                     <div><input id="indexTree" >
					</div>
                </td>
            </tr>
            <tr>
                <th>显示顺序:</th>
                <td>

                            <input id="showOrder" name="showOrder"  type="text"
                                      class="easyui-numberbox"
                                   data-options="required:true,validType:'length[1,10]'" >

                </td>
            </tr>
            <tr id="groupType_tr">
                <th>分组类型:</th>
                <td>

                   <div><input id="groupType" name="groupType"   >  
					</div>

                </td>
            </tr>

             <tr>
                <th>备注:</th>
                <td>
					<input id="remark" name="remark" class="easyui-textbox" style="height:60px"
						data-options="validType:'length[1,200]', multiline:true" />
                </td>
            </tr>

        </table>
	</form>
	<div id="operator">
		<a href="javascript:void page.saveForm()" class="easyui-linkbutton">保存</a> <a
				href="javascript:void page.resetForm()" class="easyui-linkbutton">重置</a>
	</div>
	</jsp:body>
</t:page>
