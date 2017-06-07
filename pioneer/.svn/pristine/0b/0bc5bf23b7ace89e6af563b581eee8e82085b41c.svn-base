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
$(document).ready(function(){
	   
	   $('#jxsIdShow').combobox({    
		    url:contextPath + "/tSysArea/getAreas",    
		    valueField:'id',    
		    textField:'text',
		    editable:false,
		    panelHeight:150,
		    onSelect : function(record) {
				var id = record.id;
				$("#jxsId").val(id);
				ajaxDirect("${contextPath}/tSysArea/anyWay?method=getJxsArea",{jxsId:id},function(data){
					$("#areaIdShow").combobox('setText',data[0].districtName);
					$("#areaId").val(data[0].areaId);
				});
				
			}
		});
	   $('#statusShow').combobox({valueField:'id',textField:'text',data:[{id:0,text:'正常'},{id:1,text:'已恢复'},{id:2,text:'部分恢复'},{id:3,text:'未恢复'}],panelHeight:100, onSelect : function(record) {
			var id = record.id;
			$("#status").val(id);
		}});
});



</script>
</jsp:attribute>
	<jsp:body>
	<form method="post" action="${ contextPath }/tSysArea/anyWay?method=saveRepairRoute">
        <table class="default_form_input">
       		<tr>
                <th>线路名称:</th>
                <td>

                            <input id="mc" name="mc"  type="text"
                                      class="easyui-validatebox textbox"
                                   data-options="required:true,validType:'length[1,1000]'" >

                </td>
            </tr>
            <tr>
                <th>线路编号:</th>
                <td>

                            <input id="bh" name="bh"  type="text"
                                      class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,10]'" />

                </td>
            </tr>
            
            <tr>
                <th>所属检修所:</th>
                <td>
                      <input id="jxsIdShow" class="easyui-combobox" data-options="" >
                      <input name="jxsId"  id= "jxsId" type="hidden"/>
                </td>
            </tr>

            <tr>
                <th>所属区县:</th>
                <td>

                            <input id="areaIdShow"  class="easyui-combobox" data-options="" disabled = "disabled">
							<input name="areaId"  id= "areaId" type="hidden"/>
                </td>
            </tr>
            <tr>
                <th>线路状态:</th>
                <td>

                            <input id="statusShow"    class="easyui-combobox" data-options="" >
                            <input name="status"  id= "status" type="hidden" value = '0'/>

                </td>
            </tr>
             <tr>
                <th>所属电站:</th>
                <td>

                            <input id="ssdz" name="ssdz"  type="text"
                                      class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,10]'" >

                </td>
            </tr>
             <tr>
                <th>长度:</th>
                <td>

                            <input id="cd" name="cd"  type="text"
                                      class="easyui-numberbox"
                                   data-options="validType:'length[1,10]'" >

                </td>
            </tr>
             <tr>
                <th>配变台数:</th>
                <td>

                            <input id="pbts" name="pbts"  type="text"
                                      class="easyui-numberbox"
                                   data-options="validType:'length[1,10]'" >

                </td>
            </tr>
             <tr>
                <th>装接容量:</th>
                <td>

                            <input id="zjrl" name="zjrl"  type="text"  class="easyui-numberbox"  data-options="validType:'length[1,10]'" >

                </td>
            </tr>             <tr>
                <th>备注:</th>
                <td>

                            <input id="bz" name="bz"  type="text"
                                      class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,200]'" >

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
