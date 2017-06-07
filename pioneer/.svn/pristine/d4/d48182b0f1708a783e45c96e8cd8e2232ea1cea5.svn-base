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
	   $('#rightType').combobox({    
		    url:contextPath + "/tSysDict/listDict?type=RIGHT_TYPE",    
		    valueField:'id',    
		    textField:'text',
		    editable:false,
		    panelHeight:80,
		    onSelect : function(record) {
				var id = record.id;
				if (id == 0) {
					$("#rightUrl").attr("disabled", true);
					$("#rightUrl").addClass("disabledText");
					$("#rightUrl").val("");
				} else {
					$("#rightUrl").attr("disabled", false);
					$("#rightUrl").removeClass("disabledText");
				}
			}
		});
	   
	   $('#indexTree').combotree({
			url : contextPath + "/tSysRight/getRightTree",
			required : false,
			loadFilter:function(data){
		        data.unshift({id:'0',text:'无'});
		        return data;
		    },
			onChange : function(newValue, oldValue){
				
				$("#pid").val(newValue);
			},
			onClick: function(node){
				//console.log("node ", node)
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
	<form method="post" action="${ contextPath }/tSysRight/add">
        <table class="default_form_input">
            <tr>
            <tr>
                <th>权限名称:</th>
                <td>

                            <input id="rightName" name="rightName"  type="text"
                                     class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,50]'" />

                </td>
            </tr>
            <tr>
            	<th>上级权限:</th>
            	<td>
            		<div><input id="indexTree"   >
					</div>
            	</td>
            </tr>
            <tr>
                <th>权限类型:</th>
                <td>

                    <div><input id="rightType" name="rightType"   data-options="editable:false">  
					</div>
                </td>
            </tr>
            <tr>
                <th>权限地址:</th>
                <td>

                            <input id="rightUrl" name="rightUrl"  type="text"
                                    class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,200]'" />

                </td>
            </tr>
            <tr>
                <th>显示顺序:</th>
                <td>

                            <input id="showOrder" name="showOrder"  type="text"
                                    class="easyui-numberbox"
                                   data-options="validType:'length[1,10]'" >

                </td>
            </tr>
             <tr>
                <th>是否可用:</th>
                <td>
                                                    是<input type="radio" value="1" checked="checked" name="isEnable" />&nbsp;&nbsp;
				     否<input type="radio" value="0" name="isEnable" />                      
				</td>
            </tr>
             <tr style="display:none">
            	<th>父节点</th>
            	<td>
            		<div><input id="pid"  name="pid" >
					</div>
            	</td>
            </tr>
             <tr>
                <th>图标样式:</th>
                <td>
                       <input id="logoUrl" name="logoUrl" style="height:60px"
						type="text" class="easyui-textbox"
						data-options="validType:'length[1,300]', multiline:true" />
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
