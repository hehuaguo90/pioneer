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
	<form method="post" action="${ contextPath }/tSysDbRecord/add">
        <table>
            <tr>
                <th>外键，操作用户id:</th>
                <td>

                            <input id="userId" name="userId"  type="text"
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                   data-options="required:true,validType:'length[1,32]'" >

                </td>
            </tr>
            <tr>
                <th>文件名:</th>
                <td>

                            <input id="fileName" name="fileName"  type="text"
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                   data-options="required:true,validType:'length[1,100]'" >

                </td>
            </tr>
            <tr>
                <th>操作时间:</th>
                <td>

                        <input id="beginTime" name="beginTime"  type="text"
                               style="width: 146px;"   class= "easyui-datetimebox width-5" >

                </td>
            </tr>
            <tr>
                <th>完成时间:</th>
                <td>

                        <input id="endTime" name="endTime"  type="text"
                               style="width: 146px;"   class= "easyui-datetimebox width-5" >

                </td>
            </tr>
            <tr>
                <th>记录类型:</th>
                <td>

                            <input id="recordType" name="recordType"  type="text"
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                   data-options="required:true,validType:'length[1,2]'" >

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
