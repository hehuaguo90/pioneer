<%@ tag language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div id="body_turn" class="iframe_body body_bottom_tuonoff"><!--此DIV为必要的body以下最外层页面容器-->
<div class="body_main">
		<!--此DIV为必要的body以下最外层页面容器-->
		<div class="paper_box_bg">
			<div class="paper_box">
<div class="paper_head">
	<div class="col-md-3 row" style="padding-top:8px;" id="formHead">
		<div class="col-md-3">
			<span class="icon-edit paperico"></span>
		</div>
		<div class="col-md-9">
			<p class="lanmu_name">信息查看</p>
			<p class="lanmu_memo">进行畜牧信息的查看</p>
		</div>
	</div>
	<div class="col-md-9 papertitle">
		<h3>${formName}<c:if test="${empty preView }"><small>${noRole}</small></c:if></h3>
	</div>
</div>

<div class="paper_content_box_form">

       		<div class="modal fade" id="loadinga" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="loading_box row">
		    <div class="col-md-2">
		    <i class="icon-spinner icon-spin" style="font-size:36px;"></i>
		    </div>
		    <div class="col-md-10 loading_box_txt">
		    正在加载中，请稍候...
		    </div>
		    <script type="text/javascript">
		   		 $(document).ready(function(){ 
						$('#loadinga').modal('show');
						setTimeout(" $('#loadinga').modal('hide')", 500 );
		    	}); 

		   
		    </script>
		    </div><!-- /.modal-dialog -->
</div>
 
		