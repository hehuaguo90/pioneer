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
<script type="text/javascript"
		src="${  contextPath }/res/sys/main/validator.js"></script>
<script type="text/javascript">
    page.onLoad = function() {
                page.send({
                    url : contextPath + "/tSysUser/findUserInfo"
                }).then(function(data) {
                    //  item = kernel.json.parse(data);
                    page.loadForm({data:data });
                });

                //page.loadForm({url : contextPath + "/tSysUser/getBeanById/?${pageContext.request.queryString}"});
	};
</script>
</jsp:attribute>
	<jsp:body>
	<form method="post" action="${ contextPath }/tSysUser/updatePassword">
        <table>
            <tr>
                <th>用户名:</th>
                <td>
							<input id="userId" name="userId" type="hidden" >
                            <input id="sysAccount" name="sysAccount"  type="text" disabled="disabled"
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                  />

                </td>
            </tr>
             <tr>
                <th>原密码:</th>
                <td>
                            <input id=" password" name="password"  type="password"  
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                   data-options="required:true,validType:['length[3,25]','password']"  
                                  />

                </td>
            </tr>
             <tr>
                <th>新密码:</th>
                <td>
                            <input id="sysPassword1" name="sysPassword1"  type="password"  
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                   data-options="required:true,validType:['length[3,25]','password']"  
                                  />

                </td>
            </tr>
             <tr>
                <th>确认密码:</th>
                <td>
                            <input id="sysPassword2" name="sysPassword2"  type="password"  
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                   data-options="required:true,validType:['length[3,25]','password']"  
                                  />

                </td>
            </tr>
        </table>
	</form>
	<div id="operator">
		<a href="javascript:void page.saveForm()" class="easyui-linkbutton">保存</a> 
		<a href="javascript:void page.resetForm('',['sysAccount'])" class="easyui-linkbutton">重置</a>
		
	</div>
	</jsp:body>
</t:page>
