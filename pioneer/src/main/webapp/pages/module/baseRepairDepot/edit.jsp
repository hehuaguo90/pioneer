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
    	
    	var pic = req.PIC.replace(/\[|\]|\"/g,"");
    	var pics = pic.split(",");
    page.upload.loadPictures(pics);
		page.loadForm({data:req});
	};
</script>

</jsp:attribute>
	<jsp:body>
	<form method="post" action="${ contextPath }/tSysArea/anyWay?method=updateRepair">
        <table class="default_form_input1">
       		 <tr>
                <th>标题:</th>
                <td>
							<input name="ID"  type="hidden"/>
                            <input id="TITLE" name="TITLE"  type="text"
                                      class="easyui-validatebox textbox"
                                  data-options="required:true,validType:['length[1,50]','realname']"   style="width:440px;">

                </td>
            </tr>
            <tr>
                <th>检修所名称:</th>
                <td>
                            <input id="NAME99" name="NAME99"  type="text"
                                      class="easyui-validatebox textbox"
                                  data-options="required:true,validType:['length[1,50]','realname']"   style="width:440px;">

                </td>
            </tr>
            <tr>
                <th>图片:</th>
                <td>
                  <a class="easyui-linkbutton" id="uploadBtn"
						data-options="required:true,field:'PIC'">添加图片
				  </a>
                </td>
            </tr>
           
            <tr>
                <th>信息:</th>
                <td>

                            <input id="INFO" name="INFO"  type="text"
                                      class="easyui-textbox" 
                                   data-options="required:true,multiline:true,height:100,width:325,validType:['length[1,1000]']" style="width:440px;">

                </td>
            </tr>
             <tr>
                <th>备注:</th>
                <td>
                            <input id="BAK" name="BAK"  type="text"
                                      class="easyui-validatebox textbox"
                                  data-options="required:true,validType:['length[1,50]','realname']" style="width:440px;">

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
