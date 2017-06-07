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
				page.send({url : contextPath + "/tSysOrg/getBeanMapById/?${pageContext.request.queryString}"
								}).then(function(data) {
							//  item = kernel.json.parse(data);
							page.loadForm({
								data : data
							});

						}).then(function() {
							loadPright();
						})
			};

			function loadPright() {
				$('#pid').combotree({
					url : '${ contextPath }/tSysOrg/getOrgTree',
					id : 'id',
					text : 'text',
					editable : false,
					//required:true,
					onLoadSuccess : function(node, data) {
						//移除当前权限节点以及子节点
						var rt = $('#pid').combotree('tree');
						var node = rt.tree('find', $("#orgId").val());
						if(node){
							rt.tree("remove", node.target);
						}

						if ($('#pid').combo('getText') == 0) {
							$('#pid').combo('setText', '')
						}
					}
				});
			}
		</script>
	</jsp:attribute>
	<jsp:body>
	<form method="post" action="${ contextPath }/tSysOrg/edit">
	<input id="orgId" name="orgId" type="hidden">
        <table class="default_form_input">
            <tr>
                <th>机构名称:</th>
                <td>
                            <input id="orgName" name="orgName"
						type="text" 
						class="easyui-validatebox textbox"
						data-options="required:true,validType:'length[1,100]'" />
                </td>
            </tr>
            
            <tr>
                <th>上级机构:</th>
                <td>
                     <input id="pid" name="pid" >
                </td>
            </tr>
            <tr>
                <th>所属地区:</th>
                <td>
                <!-- 
                   <input id="areaId" name="areaId"
						class="easyui-combotree"
						data-options="url:'${ contextPath }/tSysArea/getAreaTrees?areaLevel=2',method:'get',required:true"
						style="width:200px;">
				 -->
				 <input id="areaId" name="areaId" type="hidden" />
				 <input id="areaName" disabled="disabled" name="areaName"  class="easyui-validatebox textbox" />
                </td>
            </tr>
            <tr>
                <th>显示顺序:</th>
                <td>
                  <input id="showOrder" name="showOrder"
						type="text" 
						class="easyui-validatebox textbox"
						data-options="validType:['length[1,3]','num']" />
                </td>
            </tr>
 			<tr>
                <th>备注:</th>
                <td>
                   <input id="remark" name="remark"
						class="easyui-textbox" style="height:60px"
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
