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
    	 $('#statusShow').combobox({valueField:'id',textField:'text',data:[{id:0,text:'正常'},{id:1,text:'已恢复'},{id:2,text:'部分恢复'},{id:3,text:'未恢复'}],panelHeight:100, onSelect : function(record) {
 			var id = record.id;
 			$("#status").val(id);
 		}});
    	 var req = 	getRequest() ; 
    	 $('#statusShow').combobox('setValue', req.statusShow);
    	 $('#status').val(req.statusShow);
   
		page.loadForm({data:req});
	};
</script>

</jsp:attribute>
	<jsp:body>
	<form method="post" action="${ contextPath }/tSysArea/anyWay?method=updateRouteStatus">
        <table class="default_form_input1">
       		 <tr>
                <th>线路名称:</th>
                <td>
							<input name="id"  type="hidden"/>
                            <input id="mc" name="mc"  type="text"
                                      class="easyui-validatebox textbox"
                                  data-options="required:true,validType:['length[1,50]','realname']"   disabled = "disabled">

                </td>
            </tr>
            <tr>
                <th>线路编号:</th>
                <td>
                            <input id="bh" name="bh"  type="text"
                                      class="easyui-validatebox textbox"
                                  data-options="required:true,validType:['length[1,50]','realname']"     disabled = "disabled">

                </td>
            </tr>
            <tr>
                <th>状态:</th>
                <td>
                 	<input id="statusShow"    class="easyui-combobox" data-options="" >
                            <input name="status"  id= "status" type="hidden"/>
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
