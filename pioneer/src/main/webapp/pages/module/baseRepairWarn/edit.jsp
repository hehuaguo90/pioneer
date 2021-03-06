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
			}
		});
	   $('#areaIdShow').combobox({    
		    url:contextPath + "/tSysArea/anyWay?method=districtTree",    
		    valueField:'id',    
		    textField:'text',
		    editable:false,
		    panelHeight:150,
		    onSelect : function(record) {
				var id = record.id;
				$("#areaId").val(id);
			}
		});
    	 var req = 	getRequest() ; 
    	 var data = JSON.parse(req.data);
    	 $('#areaIdShow').combobox('setValue', data.areaId);
    	 $('#areaId').val(data.aeraId);
    	 $('#jxsIdShow').combobox('setValue', data.jxsId);
    	 $('#jxsId').val(data.jxsId);
		page.loadForm({data:data});
	};
	function saveForm(){
		var qxry = Number($("#qxry").val());
		var zyry = Number($("#zyry").val());
		var wxry = Number($("#wxry").val());
		if(qxry != zyry+ wxry){
			page.error("抢修人员 = 主业人员 + 外协人员。请修改！");
			return;
		}
		if(Number($("#qxcl").val()) != Number($("#zycl").val())+Number($("#wxcl").val()) ){
			page.error("抢修车辆 = 主业车辆 + 外协车辆。请修改！");
			return;
		}
		page.saveForm();
	}
</script>

</jsp:attribute>
	<jsp:body>
	<form method="post" action="${ contextPath }/tSysArea/anyWay?method=updateRouteWarn">
        <table class="default_form_input1">
       		 <tr>
                <th>区县名称:</th>
                <td>
							 <input id="areaIdShow"  class="easyui-combobox" data-options="" >
							<input name="areaId"  id= "areaId" type="hidden"/>
							<input name="id"  id= "areaId" type="hidden"/>

                </td>
            </tr>
            <tr>
                <th>检修所名称:</th>
                <td>
                      <input id="jxsIdShow" class="easyui-combobox" data-options="" >
                      <input name="jxsId"  id= "jxsId" type="hidden"/>

                </td>
            </tr>
            <tr>
                <th>抢修人员:</th>
                <td>
                 	 <input id="qxry" name="qxry"  type="text"  class="easyui-numberbox"  data-options="validType:'length[1,10]'" >
                </td>
            </tr>
            <tr>
                <th>抢修车辆:</th>
                <td>
                 	 <input id="qxcl" name="qxcl"  type="text"  class="easyui-numberbox"  data-options="validType:'length[1,10]'" >
                </td>
            </tr>
            <tr>
                <th>主业人员:</th>
                <td>
                 	 <input id="zyry" name="zyry"  type="text"  class="easyui-numberbox"  data-options="validType:'length[1,10]'" >
                </td>
            </tr><tr>
                <th>主页车辆:</th>
                <td>
                 	 <input id="zycl" name="zycl"  type="text"  class="easyui-numberbox"  data-options="validType:'length[1,10]'" >
                </td>
            </tr><tr>
                <th>外协抢修人员:</th>
                <td>
                 	 <input id="wxry" name="wxry"  type="text"  class="easyui-numberbox"  data-options="validType:'length[1,10]'" >
                </td>
            </tr><tr>
                <th>外协抢修车辆:</th>
                <td>
                 	 <input id="wxcl" name="wxcl"  type="text"  class="easyui-numberbox"  data-options="validType:'length[1,10]'" >
                </td>
            </tr>
            
        </table>
	</form>
	<div id="operator">
		<a href="javascript:void saveForm()" class="easyui-linkbutton">保存</a> <a
				href="javascript:void page.resetForm()" class="easyui-linkbutton">重置</a>
	</div>
	</jsp:body>
</t:page>
