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
	<form method="post" action="${ contextPath }/tSysDict/add">
        <table class="default_form_input">
            <tr>
             <tr>
                <th>字典名称:</th>
                <td>

                            <input id="name" name="name"  type="text"
                                     class="easyui-validatebox textbox"
                                   data-options="required:true,validType:'length[1,50]'" >

                </td>
            </tr>
                <th>字典类型:</th>
                <td>

                            <input id="type" name="type"  type="text"
                                   class="easyui-validatebox textbox"
                                   data-options="required:true,validType:'length[1,50]'" >

                </td>
            </tr>
            <tr>
                <th>字典代码:</th>
                <td>

                            <input id="code" name="code"  type="text"
                                   class="easyui-validatebox textbox"
                                   data-options="required:true,validType:'length[1,50]'" >

                </td>
            </tr>
           
            <tr>
                <th>显示顺序</th>
                <td>
					<input id="showOrder" name="showOrder"  type="text"
                                    class="easyui-numberbox"
                                   data-options="validType:'length[1,10]'" >

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
