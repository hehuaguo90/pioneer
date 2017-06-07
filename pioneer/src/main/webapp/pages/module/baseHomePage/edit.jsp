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
    var req = 	getRequest() ;
    console.log(req);
		page.loadForm({data:req});
	};
</script>

</jsp:attribute>
	<jsp:body>
	<form method="post" action="${ contextPath }/tSysArea/anyWay?method=updateInfo">
        <table>
            <tr>
                <th>地区:</th>
                <td>
							<input name="ID"  type="hidden"/>
                            <input id="NAME99" name="NAME99"  type="text"
                                      class="easyui-validatebox textbox"
                                  data-options="required:true,validType:['length[1,50]','realname']"  disabled="disabled"  style="width:440px;">

                </td>
            </tr>
            <tr>
                <th>信息:</th>
                <td>

                            <input id="INFO" name="INFO"  type="text"
                                      class="easyui-textbox" 
                                   data-options="required:true,multiline:true,height:100,validType:['length[1,1000]']" style="width:440px;">

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
