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
	   
	   //按类型加载字典
	   $('#areaLevel').combobox({    
		    url:contextPath + "/tSysDict/listDict?type=AREA_LEVEL",    
		    valueField:'id',    
		    textField:'text',
		    editable:false,
		    panelHeight:80,
		    onSelect : function(record) {
				var id = record.id;
				$("#stepseqId").val(id);
			}
		});
	   
});

$.extend($.fn.validatebox.defaults.rules, {  
	checkCode: {  
		validator: function (value, param) {  
		    var result = "";
	    	var parmfile = "areaCode="+value;
			$.ajax({
		         async : false,  
		         type : 'post',  
		         url : "${contextPath}/tSysArea/checkCode",
		         dataType: 'json',
		         data : parmfile,
		         success : function(data) {
		        	 result=data;
		         }  
		     });
			if(result==true){
        		$.fn.validatebox.defaults.rules.checkCode.message = "与现有地区代码重复"; 
 		    	return false; 
        	 }else{
        		 return true;
        	 }
		    
            
		}
		}  
});

</script>
</jsp:attribute>
	<jsp:body>
	<form method="post" action="${ contextPath }/tSysArea/add">
	<input type="hidden" id="stepseqId" name="stepseqId">
        <table class="default_form_input">
       		<tr>
                <th>地区名称:</th>
                <td>

                            <input id="fullName" name="fullName"  type="text"
                                      class="easyui-validatebox textbox"
                                   data-options="required:true,validType:'length[1,50]'" >

                </td>
            </tr>
            <tr>
                <th>地区简称:</th>
                <td>

                            <input id="shortName" name="shortName"  type="text"
                                      class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,50]'" />

                </td>
            </tr>
            <tr>
                <th>地区代码:</th>
                <td>

                            <input id="areaCode" name="areaCode"  type="text"
                                      class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,50]',validType:'checkCode',required:true"

                </td>
            </tr>
            
            <tr>
                <th>上级地区:</th>
                <td>
                      <input id="pid" name="pid" class="easyui-combotree" data-options="url:'${ contextPath }/tSysArea/getAreaTrees?areaLevel=2',method:'get'" >
                </td>
            </tr>

            <tr>
                <th>级别:</th>
                <td>

                            <input id="areaLevel" name="areaLevel"  type="text"
                                   data-options="required:true" >

                </td>
            </tr>
            <tr>
                <th>显示顺序:</th>
                <td>

                            <input id="showOrder" name="showOrder"  type="text"
                                      class="easyui-numberbox"
                                   data-options="required:true,validType:'length[1,10]'" >

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
