<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<t:page>
	<jsp:attribute name="head">
<script type="text/javascript">
	page.onLoad = function() {
		page.send({
			url : contextPath+ "/tSysRight/getBeanById/?${pageContext.request.queryString}"
				}).then(function(data) {
					//  item = kernel.json.parse(data);
					page.loadForm({
						data : data
				    });

				}).then(function() {
					loadPright();
				});

		$('#rightType').combobox({
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

		//page.loadForm({url : contextPath + "/tSysRight/getBeanById/?${pageContext.request.queryString}"});
	};

	function loadPright() {
		$('#pid').combotree({
			url : '${contextPath}/tSysRight/getTree/0',
			id : 'id',
			text : 'text',
			editable : false,
			loadFilter:function(data){
		        data.unshift({id:'0',text:'无'});
		        return data;
		    },
			//选择树节点触发事件
			onSelect : function(node) {
				//返回树对象
				//var tree = $(this).tree;
				//选中的节点是否为叶子节点,如果不是叶子节点,清除选中
				//var isLeaf = tree('isLeaf', node.target);
				//if (!isLeaf) {
				//清除选中
				//   $('#pid').combotree('clear');
				//}
			},
			onLoadSuccess : function(node, data) {
				//移除当前权限节点以及子节点
				var rt = $('#pid').combotree('tree');
				var node = rt.tree('find', $("#rightId").val());
				rt.tree("remove", node.target);

				if ($('#pid').combo('getText') == 0) {
					$('#pid').combo('setText', '')
				}
			}
		});
	}
</script>

</jsp:attribute>
	<jsp:body>
	<form method="post" action="${ contextPath }/tSysRight/edit">
	<input id="rightId" name="rightId" type="hidden">
        <table class="default_form_input">
            <tr>
                <th>权限名称:</th>
                <td>
                       <input id="rightName" name="rightName"
						type="text" class="easyui-validatebox textbox"
						data-options="validType:'length[1,50]'">
                </td>
            </tr>
             <tr>
            	<th>上级权限</th>
            	<td>
            		<div>
					    <input id="pid" name="pid" >
					</div>
            	</td>
            </tr>
            <tr>
                <th>权限类型:</th>
                <td>
                   <select id="rightType"  name="rightType"  class="easyui-combobox"
                           
                            data-options="url:'${contextPath}/tSysDict/listDict?type=RIGHT_TYPE',
                            valueField:'id',
                            textField:'text',
                            panelHeight:80,
                            editable:false,
                            required:true"  
                             >
                    </select>
                </td>
            </tr>
            <tr>
                <th>权限地址:</th>
                <td>
                       <input id="rightUrl" name="rightUrl"
						type="text" 
						class="easyui-validatebox textbox"
						data-options="validType:'length[1,200]'">
                </td>
            </tr>
            <tr>
                <th>显示顺序:</th>
                <td>
                       <input id="showOrder" name="showOrder"
						type="text" 
						class="easyui-numberbox"
						data-options="validType:'length[1,10]'" />
                </td>
            </tr>
            
           <tr>
                <th>是否可用:</th>
                <td>
                                                 是<input type="radio" value="1" name="isEnable" />&nbsp;&nbsp;
				     否<input type="radio" value="0" name="isEnable" />                
				</td>
            </tr>
            
        <%--     <tr>
            	<th>父节点</th>
            	<td>
            		<div><input id="indexTree"   >
					</div>
            	</td>
            </tr> --%>
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
