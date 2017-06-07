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
                page.send({
                    url : contextPath + "/tSysUser/getBeanMapById/?${pageContext.request.queryString}"
                }).then(function(data) {
                    //  item = kernel.json.parse(data);
                    page.loadForm({data:data });
                }).then(function() {
                	var areaValue=$("#areaId").val();
                //	$('#indexTree').combotree('setValues', areaValue);
                	$("#sysPassword").val("");
                });

                //$('#cc').combotree('setValues', newValue);
                //page.loadForm({url : contextPath + "/tSysUser/getBeanById/?${pageContext.request.queryString}"});

	};
	
	
	
	$.extend($.fn.validatebox.defaults.rules, {  
	    checkMobile: {  
			validator: function (value, param) {  
			    var myReg = /^(13([0-9])|15([0-9])|18([0-9]))\d{8}$/;
			    var result = "";
			    if(myReg.test(value)){
			    	var parmfile = "userMobile="+value+"&thisUserId="+$("#userId").val();
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
</script>

</jsp:attribute>
	<jsp:body>
	<form method="post" action="${ contextPath }/tSysUser/edit">
		<input id="userId" name="userId" type="hidden">
		<input type="hidden" id="areaId" name="areaId">
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
                                      class="easyui-validatebox textbox" disabled="disabled"
                                   data-options="required:true,validType:['length[3,50]','password','username']" >

                </td>
            </tr>
            <tr style="">
                <th>密码:</th>
                <td>

                            <input id="sysPassword" name="sysPassword"  type="text"
                                      class="easyui-validatebox textbox"
                                   data-options="validType:['length[3,12]','password','username']" >

                </td>
            </tr>
            <tr>
                <th>座机号码:</th>
                <td>

                            <input id="userTel" name="userTel"  type="text"
                                      class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,50]',validType:'phone'" >

                </td>
            </tr>
            <tr>
                <th>手机号码:</th>
                <td>

                            <input id="userMobile" name="userMobile"  type="text"
                                      class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,50]',validType:'checkMobile'" >

                </td>
            </tr>

			<tr>
                <th>用户角色:</th>
               <td>

					<input id="roleids"  name="roleids" class="easyui-combobox" data-options="    
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
            <%-- <tr>
            	<th>所属地区</th>
            	<td>
            		<div><input id="indexTree" >
					</div>
            	</td>
            </tr> --%>

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
