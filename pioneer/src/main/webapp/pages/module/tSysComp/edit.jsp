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
							url : contextPath
							+ "/tSysComp/getBeanMapById/?${pageContext.request.queryString}"
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
				 $('#orgId').combobox({
						url : '${ contextPath }/tSysOrg/getOrgComb?areaLevel=2',
						valueField : 'orgId',
						textField : 'orgName',
						editable : false,
						required : true
					});
			}
		</script>
	</jsp:attribute>
	<jsp:body>
	<form method="post" action="${ contextPath }/tSysComp/edit">
	<input id="compId" name="compId" type="hidden" style="width:200px;" >
        <table class="default_form_input" >
            <tr>
                <th>企业名称:</th>
                <td>
                            <input id="compName" name="compName"
						type="text"
						class="easyui-validatebox textbox"
						data-options="required:true,validType:'length[1,100]'" />
                </td>
            </tr>
             <tr>
                <th>所属机构:</th>
                <td>
               <input id="orgId" name="orgId" >
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
