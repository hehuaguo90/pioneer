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
  page.onLoad = function(){
 };
	
</script>
</jsp:attribute>
	<jsp:body>
	<form method="post" action="${ contextPath }/tSysAreaUnite/add">
        <table>
            <tr>
                <th>功能区域id:</th>
                <td>

                            <input id="careaId" name="careaId"  type="text"
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,32]'" />

                </td>
            </tr>
            <tr>
                <th>地区id:</th>
                <td>

                            <input id="areaId" name="areaId"  type="text"
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,32]'" />

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
