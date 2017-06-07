<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<t:form>
	<jsp:attribute name="head">
		<script type="text/javascript">
			$(document).ready(function() {
				initValidatePane();
				var param = "${pageContext.request.queryString}" || "${queryParam}";
				if(param){//如果存在查询条件，加载数据
					page.send({
		                url : contextPath + "/tSysDbRecord/getBeanById/?" + param
	                }).then(function(data) {
	                    //  item = kernel.json.parse(data);
	                    page.loadForm({data:data });
	                });
				}
			});
		</script>
	</jsp:attribute>
	<jsp:body>
	<t:formEditHead></t:formEditHead>
	<form method="post" action="${ contextPath }/tSysDbRecord/edit">
        <table>
            <tr>
                <th>外键，操作用户id:</th>
                <td>

                            <input id="userId" name="userId"  type="text"
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                   data-options="required:true,validType:'length[1,32]'" />

                </td>
            </tr>
            <tr>
                <th>文件名:</th>
                <td>

                            <input id="fileName" name="fileName"  type="text"
                                   style="width: 146px;"   class="easyui-validatebox textbox"
                                   data-options="required:true,validType:'length[1,100]'" />

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
                                   data-options="required:true,validType:'length[1,2]'" />

                </td>
            </tr>

        </table>
	</form>
<t:formEditFooter></t:formEditFooter>
	</jsp:body>
</t:form>
