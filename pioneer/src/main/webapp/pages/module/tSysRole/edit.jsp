<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<t:page>
	<jsp:attribute name="head">
<script type="text/javascript"
			src="${ contextPath }/res/sys/main/page.js"></script>
<script type="text/javascript" src="role.js"></script>

<script type="text/javascript">
    page.onLoad = function() {
                page.send({
                    url : contextPath + "/tSysRole/getBeanById/?${pageContext.request.queryString}"
                }).then(function(data) {
                    //  item = kernel.json.parse(data);
                    page.loadForm({data:data });
                }).then(function() {
                	   loadRights();
                });

                //page.loadForm({url : contextPath + "/tSysRole/getBeanById/?${pageContext.request.queryString}"});

	};
</script>

</jsp:attribute>
	<jsp:body>
	<form method="post" action="${ contextPath }/tSysRole/edit">
	<input id="roleId" name="roleId" type="hidden">
	<input type="hidden" name="rightids" id="rightids">
        <table class="default_form_input">

            <tr>
                <th>角色名称:</th>
                <td>

                            <input id="roleName" name="roleName"  type="text"
                                   class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,32]'" >

                </td>
            </tr>
            <tr>
                <th>备注:</th>
                <td>
						<input id="remark" name="remark" class="easyui-textbox" style="height:60px"
						data-options="validType:'length[1,200]', multiline:true" />
                </td>
            </tr>
			<tr>
                <th>授予权限:</th>
                <td>
                      <ul id="ttree"></ul> 
                </td>
            </tr>
        </table>
	</form>
	<div id="operator">
		<a href="javascript:void sForm()" class="easyui-linkbutton">保存</a> <a
				href="javascript:void page.resetForm()" class="easyui-linkbutton">重置</a>
	</div>
	</jsp:body>
</t:page>
