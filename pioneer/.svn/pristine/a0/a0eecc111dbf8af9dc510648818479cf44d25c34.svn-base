<%@ tag language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
</div>
</div>
</div>
</div>
<script type="text/javascript">  
           var off_sh = true;
           var off = true;
          $(document).ready(function() {
	          var batch_id = '${param.batchId}';
	          var isCheck = '${param.isCheck}';//是否是审核
            if(isCheck==1){
              	if(batch_id){//如果存在查询条件，加载数据
		              $.ajax({ url: contextPath+"/tFormWarnMsg/"+"getBeanBybatchId?batchId="+batch_id, success: function(data){
		        // alert(JSON.stringify(data));
	                 ajaxobj=eval("("+data+")"); 
		             var html ='';
		             if(ajaxobj.length>0){
		        	      for(var i=0; i <ajaxobj.length;i++){
   		        	          html += "<li><div class='xuhao'>"+(i+1)+"</div><div class='right'><div class='question'><strong>警告信息：</strong>"
   		        	           +ajaxobj[i].warn_msg+"</div><div class='answer'><strong>解释信息：</strong>"+ajaxobj[i].warn_explain +"</div></div></li>";
   		                     }
		             }else{
		        	     html+='<div class="nomsg"><span class="ico icon-coffee"></span>暂无告警信息！</div>';
		             }
		             $(".qanda").append(html);
		         }}); 
		     }
              	$("#form_check_box_sh").show();
        	    $("#form_check_box").remove();
          }else{
	         $("#form_check_box").show();
	         $("#form_check_box_sh").remove();
        }
            $("#form_check_turn").click(function(){
  	      	  if(off){
  	      		  showErrMsg();
  	      	  }else{
  	      		  hideErrMsg();
  	      	  }
           });
           
           $("#form_check_btn").click(function(){
               showErrMsg();
           });
           
            $("#form_check_turn_sh").click(function(){
          	  if(off_sh){
            		 $("#body_turn").removeClass("body_bottom_tuonon");
  	 	      	     $("#body_turn").addClass("body_bottom_tuonoff");
  			         $("#form_check_turn").html("显示验证信息");
  		      		 $("#form_check_turn_sh").html("显示验证信息");
  		            off_sh = false;
  	              }else{
  	            	 $("#body_turn").removeClass("body_bottom_tuonoff");
  			         $("#body_turn").addClass("body_bottom_tuonon");
  	 	      	     $("#form_check_turn").html("隐藏验证信息");
  	      		     $("#form_check_turn_sh").html("隐藏验证信息");
  		             off_sh = true;
  	              }
               });
          });
        function goBack(){
        	history.back();
         } 
        
        function showErrMsg(){
            $("#body_turn").removeClass("body_bottom_tuonoff");
    		  $("#body_turn").addClass("body_bottom_tuonon");
    		  off = false;
    		  
    		  $("#form_check_turn").html("隐藏验证信息");
    		  $("#form_check_turn_sh").html("隐藏验证信息");
       }
       
       function hideErrMsg(){
             $("#body_turn").removeClass("body_bottom_tuonon");
	      	   $("#body_turn").addClass("body_bottom_tuonoff");
	      	   off = true;
	      	   $("#form_check_turn").html("显示验证信息");
    		   $("#form_check_turn_sh").html("显示验证信息");
       }
        
        function saveSuccess(){//审核通过
       	 var shyj = $.trim($("#shyj2").val());
				if(!shyj2){
					$("#Msg2").text("请输入审核意见！");
					$("#Msg2").show();
					return false;
				}else{
					$("#myModal_yes").modal('hide');
					page.saveForm('${formId}', '${processId}', '', '21');
					$("#shyj2").val("");
					$("#Msg2").text("");
				}
        }
        
        function saveBack(){
       	 var shyj = $.trim($("#shyj1").val())
				if(!shyj){
					$("#Msg").text("请输入审核意见！");
					$("#Msg").show();
					return false;	
			    }else{
			    	$("#myModal_no").modal('hide');
			    	page.saveForm('${formId}', '${processId}', '', '22');
			    	$("#shyj1").val("");
			    	$("#Msg").text("");
			    }
        }
</script>
<div class="body_bottom">   
<div id="form_check_box" class="form_check_box">
	<div class="form_check_tools" id="form_btns">
	<c:if test="${empty preView}">
 		<button type="button" class="btn btn-success" onclick="goBack()" >
			<span class="glyphicon glyphicon-share-alt"></span>&nbsp;返回
		</button>
	</div>
   </c:if>
 </div>
 
  <div id="form_check_box_sh" class="form_check_box">
					<div class="form_check_msg row" 
						style="border-bottom:1px solid #d9ddde;overflow:hidden;">
						<div class="col-md-6">
							<h4>验证信息</h4>
							<div class="checkmsg_2" id="form_check_msg">
							<div class="nomsg"><span class="ico icon-coffee"></span>暂无验证信息！</div>
							<!-- 
								<p class="text-warning">1、专用型鸡蛋价格超出平均价10倍</p>
								<p>
									<input type="text" class="form-control errorinput" id="name"
										placeholder="请输入解释信息">
								</p>
								<p class="text-danger">2、有价格未填写，请全部填写后提交</p>
								<p class="text-danger">3、有价格未填写，请全部填写后提交</p>
								<p class="text-danger">4、有价格未填写，请全部填写后提交</p>
								<p class="text-danger">5、有价格未填写，请全部填写后提交</p>
							 -->
							</div>
						</div>
						<!-- <div class="col-md-4" style="padding:0 30px;">
							<h4>审核操作</h4>
														<div class="form-group">
							    <label for="name" style="color:#333;font-weight:normal;">审核意见:</label>
							    <textarea id="shyj" name="shyj" class="form-control" rows="6" ></textarea>
							     <p id="Msg" name="Msg" class="col-md-12 login_errorbox" style="display:none;color:red"  value=""/>
							  </div>
							  
						</div> -->
						<div class="col-md-6">
							<h4>告警信息</h4>
							<ul class="qanda">
								
							</ul>
						</div>
					</div>
					<%-- <div class="form_check_tools">
                	
                    <button type="button" class="btn btn-primary" onclick="page.saveForm('${formId}', '${processId}', '', '12')"><span class="icon-remove"></span>&nbsp;驳回</button>
                    <button id="form_check_turn_sh" type="button" class="btn btn-danger">隐藏验证信息</button>	
                    
                    <button type="button" class="btn btn-success" onclick="page.saveForm('${formId}', '${processId}', '', '11')"><span  class="glyphicon glyphicon-ok"></span>&nbsp;通过</button>
                   
                   </div> --%>
                   <div class="form_check_tools">
                	
                    <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#myModal_no"><span class="icon-remove"></span>&nbsp;驳回</button>
                    <button id="form_check_turn" type="button" class="btn btn-danger">显示验证信息</button>	
                    
                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal_yes" onClick="javascript: $('#shyj2').val('通过！');"><span class="glyphicon glyphicon-ok"></span>&nbsp;通过</button>
                   
                  </div>


		</div>
</div>

  <div class="modal fade" id="myModal_no" tabindex="-1" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="top:20%;">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" 
						aria-hidden="true">×
				</button>
				<h4 class="modal-title" id="myModalLabel">
					<span class="icon-comments " style="font-size:30px;margin-right:20px;"></span>审核操作
				</h4>
			</div>
			<div class="modal-body">
				<div class="" style="padding:0 30px;">
						
					          <div class="form-group">
							    <label for="name" style="color:#333;font-weight:normal;">审核意见:</label>
							    <textarea id="shyj1" name="shyj1" class="form-control" rows="5"></textarea>
							    <p id="Msg" name="Msg" class="col-md-12 login_errorbox" style="display:none;color:red"  value=""/>
							  </div>
							  
						</div>
			</div>
			<div class="modal-footer">
			    <button type="button" class="btn btn-success" aria-hidden="true"
						 onclick="saveBack()">确定
				</button>
				<button type="button" class="btn btn-default" 
						data-dismiss="modal">取消
				</button>
				
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

  <div class="modal fade" id="myModal_yes" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="top:20%;">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" 
						aria-hidden="true">×
				</button>
				<h4 class="modal-title" id="myModalLabel">
					<span class="icon-comments " style="font-size:30px;margin-right:20px;"></span>审核操作
				</h4>
			</div>
			<div class="modal-body">
				<div class="" style="padding:0 30px;">
						
						      <div class="form-group">
							    <label for="name" style="color:#333;font-weight:normal;">审核意见:</label>
							    <textarea id="shyj2" name="shyj2" class="form-control" rows="5"></textarea>
							     <p id="Msg2" name="Msg2" class="col-md-12 login_errorbox" style="display:none;color:red"  value=""/>
							  </div>
							  
						</div>
			</div>
			<div class="modal-footer">
			    <button type="button" class="btn btn-success" 
						 onclick="saveSuccess()">确定
				</button>
				<button type="button" class="btn btn-default" 
						data-dismiss="modal">取消
				</button>
				
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

