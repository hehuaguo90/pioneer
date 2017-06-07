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


$.extend($.fn.validatebox.defaults.rules, {  
    checkMobile: {  
		validator: function (value, param) {  
		    var myReg = /^(13([0-9])|15([0-9])|18([0-9]))\d{8}$/;
		    var result = "";
		    if(myReg.test(value)){
		    	var parmfile = "userMobile="+value;
				$.ajax({
			         async : false,  
			         type : 'post',  
			         url : "${contextPath}/tSysUser/checkMobile",
			         dataType: 'json',
			         data : parmfile,
			         success : function(data) {
			        	 result=data;
			         }  
			     });
				if(result==true){
	        		$.fn.validatebox.defaults.rules.checkMobile.message = "与他人手机号码重复"; 
	 		    	return false; 
	        	 }else{
	        		 return true;
	        	 }
		    }else{
		    	$.fn.validatebox.defaults.rules.checkMobile.message = "手机号码格式错误"; 
		    	return false; 
		    }
            
		}
		}  
}); 
$(document).ready(function(){
	   
	   //按类型加载字典
	   $('#stepseqId').combobox({    
		    url:contextPath + "/tSysArea/getAreas",    
		    valueField:'id',    
		    textField:'text',
		    editable:false,
		    panelHeight:80,
		    onSelect : function(record) {
				var id = record.id;
				$("#areaId").val(id);
			}
		});
	   
});	
</script>
</jsp:attribute>
	<jsp:body>
	<form method="post" action="${ contextPath }/tSysUser/add">
        <table class="default_form_input">
            <tr>
                <th>用户姓名:</th>
                <td>

                            <input id="userName" name="userName"  type="text"
                                     class="easyui-validatebox textbox"
                                   data-options="required:true,validType:['length[1,50]','realname']" >

                </td>
            </tr>
            <tr>
                <th>用户名:</th>
                <td>

                            <input id="sysAccount" name="sysAccount"  type="text"
                                      class="easyui-validatebox textbox"
                                   data-options="required:true,validType:['length[3,50]','password','username']" >

                </td>
            </tr>
            <tr>
                <th>密码:</th>
                <td>

                            <input id="sysPassword" name="sysPassword"  type="text"
                                      class="easyui-validatebox textbox"
                                   data-options="required:true,validType:['length[3,12]','password','username']" >

                </td>
            </tr>
            
            <tr>
            <tr>
                <th>手机:</th>
                <td>

                            <input id="userMobile" name="userMobile"  type="text"
                                    class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,50]',validType:'checkMobile'" />

                </td>
            </tr>

			<tr>
                <th>用户角色:</th>
                <td>

					<input id="roleids" name="roleids" class="easyui-combobox" data-options="    
							        valueField: 'roleId',    
							        textField: 'roleName', 
							        panelHeight:100,
							        required:true,
							        editable:false,
							        multiple:true,
							        url: '${ contextPath }/tSysRole/listAll',    
							        " />   

                </td>
            </tr>
          <tr>
            	<th>所属地区</th>
            	<td>
            		<div><input id="stepseqId"  class="easyui-combobox">
            		<input type="hidden" id="areaId" name="areaId"/>
					</div>
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
