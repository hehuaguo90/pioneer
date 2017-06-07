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
                    url : contextPath + "/tSysCustomArea/getBeanById/?${pageContext.request.queryString}"
                }).then(function(data) {
                    //  item = kernel.json.parse(data);
                    page.loadForm({data:data });
                }).then(function() {
                	 var parmfile = "careaId="+$("#careaId").val();
	           		 $.ajax({
	        	         async : false,  
	        	         type : 'post',  
	        	         url : "${contextPath}/tSysAreaUnite/getAreaIds",
	        	         dataType: 'json',
	        	         data : parmfile,
	        	         success : function(data) {
	        	        		if(data.result != ''){
	        	                      $('#indexTree').combotree('setValues', data.result);
	        	        				 
	        	        		}
	        	         }  
	        	     }); 
                	
                
                });

                //page.loadForm({url : contextPath + "/tSysCustomArea/getBeanById/?${pageContext.request.queryString}"});

	};
	
	$(document).ready(function(){
		   $('#indexTree').combotree({
				url : contextPath + "/tSysArea/getAreaTree",
				//required : true,
				 multiple: true,
				onChange : function(newValue, oldValue){
					$("#areaIds").val(newValue);
				},
				onClick: function(node){
					console.log("node ", node)
					//如果点击的是指标
					if(node.iconCls == "icon-add"){
						getIndexConfig(node.id)
					}
				}
			});
		   
	});
</script>

</jsp:attribute>
	<jsp:body>
	<form method="post" action="${ contextPath }/tSysCustomArea/edit">
	<input type="hidden" id="careaId" name="careaId">
	<input type="hidden" id="areaIds" name="areaIds">
        <table class="default_form_input">
            <tr>
                <th>区域代码:</th>
                <td>

                            <input id="areaCode" name="areaCode"  type="text"
                                      class="easyui-validatebox textbox"
                                   data-options="validType:'length[1,32]'" >

                </td>
            </tr>
            <tr>
                <th>名称:</th>
                <td>

                            <input id="areaName" name="areaName"  type="text"
                                      class="easyui-validatebox textbox"
                                   data-options="required:true,validType:'length[1,50]'" />

                </td>
            </tr>
            <tr>
                <th>显示顺序:</th>
                <td>

                            <input id="showOrder" name="showOrder"  type="text"
                                      class="easyui-numberbox"
                                   data-options="required:true,validType:'length[1,10]'" />

                </td>
            </tr>
            
            <tr>
            	<th>所属地区</th>
            	<td>
            		<div><input id="indexTree" >
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
