<%@ tag language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript">
var off = true;
function showErrMsg(){
    $("#form_check_msg").show();
	  
}

function dataHold(){
	 
	     $.ajax({ url: contextPath+"/tianBao/"+"form.dataHold",
		        data:  $("form").serialize(), 
		      success: function(data){
          //alert(JSON.stringify(data));
          if (new RegExp("^(\\{|\\[)").test(data)) {
				data = kernel.json.parse(data);
	            if(data.status){
					$(document).find("#alertId").html(data.message);
					$(document).find("#myModal4").modal('show');
	            }
          }
  		 
     }});         	 
}
	     
</script>

<div id="form_check_msg" class="form_check_msg" style="display:none;">
<div class="form_title"><span >验证信息</span></div>
	<div class="nomsg"><span class="ico icon-coffee"></span>数据填写无误！</div>
	    <!-- 
		<p class="text-warning">1、专用型鸡蛋价格超出平均价10倍</p>
		<p>
			<input type="text" class="form-control" id="name"
				placeholder="请输入解释信息">
		</p>
		<p class="text-danger">2、有价格未填写，请全部填写后提交</p>
		-->
</div>
</div>


	<!-- 提示弹出框 -->
	<div class="modal fade" id="myModal4" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true" style="top:30%">
		<div class="modal-dialog" style="width:90%;margin:auto;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">×</button>
					<h4 class="modal-title" id="myModalLabel">提示信息</h4>
				</div>
			 	<div id = "alertId" class="modal-body" >
				   
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>  
    <div class="form_btn_tools navbar-fixed-bottom">
  	    <c:if test="${empty zanCun }">
	        <a href="javascript:history.back()" class="cannel" style="width:33%!important;" ><span class="glyphicon glyphicon-share-alt">&nbsp;</span>放弃</a>
	        <a href="javascript:validateForm('${formId}', '${processId}')" class="save" style="width:33%!important;"><span class="glyphicon glyphicon-eye-open">&nbsp;</span>校验</a>
	        <a href="javascript:page.saveForm('${formId}', '${processId}','','')" class="submit" style="width:34%!important;"><span class="glyphicon glyphicon-ok">&nbsp;</span>提交</a>
  		</c:if>      
        <c:if test="${not empty zanCun }">
	    	<a href="javascript:history.back()" class="cannel" style="width:25%!important;" ><span class="glyphicon glyphicon-share-alt">&nbsp;</span>放弃</a>
	    	<a href="javascript:dataHold()" class="xy" style="width:25%!important;"><span class="glyphicon glyphicon-floppy-saved">&nbsp;</span>暂存</a>
	        <a href="javascript:validateForm('${formId}', '${processId}')" class="save" style="width:25%!important;"><span class="glyphicon glyphicon-eye-open">&nbsp;</span>校验</a>
	        <a href="javascript:page.saveForm('${formId}', '${processId}','','')" class="submit" style="width:25%!important;"><span class="glyphicon glyphicon-ok">&nbsp;</span>提交</a>
        </c:if>
    </div>
    
    
    
<c:if test="${not empty zanCun }">
<script>
function getDataHold(){
    $.ajax({ url: contextPath+"/tianBao/"+"form.getDataHold",
       data:  $("form").serialize(), 
     success: function(data){
      //alert(JSON.stringify(data));
   	    data = kernel.json.parse(data);
   	    page.loadForm({data:data });
	  }});  
} 
getDataHold()
</script>
</c:if>
<br>
<br>



