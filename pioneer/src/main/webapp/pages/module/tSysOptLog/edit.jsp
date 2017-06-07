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


<script type="text/javascript">
    page.onLoad = function() {
                page.send({
                    url : contextPath + "/tSysOptLog/getBeanById/?${pageContext.request.queryString}"
                }).then(function(data) {
                    //  item = kernel.json.parse(data);
                    page.loadForm({data:data });
                });

                //page.loadForm({url : contextPath + "/tSysOptLog/getBeanById/?${pageContext.request.queryString}"});

	};
</script>

</jsp:attribute>
	<jsp:body>
	<form method="post" action="${ contextPath }/tSysOptLog/edit">
        <table>
            <tr>
                <th>操作人Id:</th>
                <td>

                            <input id="userId" name="userId"  type="text"
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,32]'" >

                </td>
            </tr>
            <tr>
                <th>操作人姓名:</th>
                <td>

                            <input id="userName" name="userName"  type="text"
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,50]'" >

                </td>
            </tr>
            <tr>
                <th>操作人账号:</th>
                <td>

                            <input id="sysName" name="sysName"  type="text"
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,50]'" >

                </td>
            </tr>
            <tr>
                <th>操作人角色名:</th>
                <td>

                            <input id="roleName" name="roleName"  type="text"
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,100]'" >

                </td>
            </tr>
            <tr>
                <th>操作时间:</th>
                <td>

                        <input id="opTime" name="opTime"  type="text"
                               style="width: 146px;"   class= "easyui-datetimebox width-5" >

                </td>
            </tr>
            <tr>
                <th>操作类型:</th>
                <td>

                            <input id="opType" name="opType"  type="text"
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,2]'" >

                </td>
            </tr>
            <tr>
                <th>操作内容:</th>
                <td>

                            <input id="content" name="content"  type="text"
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,1,000]'" >

                </td>
            </tr>
            <tr>
                <th>操作人IP:</th>
                <td>

                            <input id="ip" name="ip"  type="text"
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,30]'" >

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
