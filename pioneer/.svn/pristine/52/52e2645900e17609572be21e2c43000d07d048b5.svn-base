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
 	   $('#jxsIdShow').combobox({    
		    url:contextPath + "/tSysArea/getAreas",    
		    valueField:'id',    
		    textField:'text',
		    editable:false,
		    panelHeight:150,
		    onSelect : function(record) {
				var id = record.id;
				$("#jxsId").val(id);
				ajaxDirect("${contextPath}/tSysArea/anyWay?method=repairRoute&isPage=false",{jxsId:id},function(data){
					if(data.length<=0){
						page.error("该检修所未添加检修线路！");
						 $('#jxsIdShow').combobox("setText","");
					}
				});
			}
		});
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
	<form method="post" action="${ contextPath }/tSysArea/anyWay?method=updateRouteStatusAll">
        <table class="default_form_input1">
       		 <tr>
                <th>检修所名称:</th>
                <td>
					  <input id="jxsIdShow" class="easyui-combobox" data-options="" >
                      <input name="jxsId"  id= "jxsId" type="hidden"/>

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
