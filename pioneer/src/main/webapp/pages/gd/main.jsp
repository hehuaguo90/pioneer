<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<t:base />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no">
<link rel="shortcut icon" href="${ contextPath }/pages/favicon.ico" type="image/x-icon" />
<title>${title}</title>
<link href="${ contextPath }/res1/front/style/webstyle.css"
	rel="stylesheet" type="text/css" />
<link href="${ contextPath }/res1/front/bootstrap/css/bootstrap.min.css"
	rel="stylesheet">
<link href="${ contextPath }/res1/front/style/bootstrap_ext.css"
	rel="stylesheet" type="text/css">
<link rel="stylesheet"
	href="${ contextPath }/res1/front/css/font-awesome.min.css">
<script type="text/javascript"
	src="${ contextPath }/res1/front/js/jquery.min.js"></script>
<script src="${ contextPath }/res1/front/bootstrap/js/bootstrap.min.js"></script>
 
<script type="text/javascript">
	$(document).ready(
			function() {
				ajaxDirect("${contextPath}/tLoginObjAction/getLoginObj",{},function(data){
					if(data.sysAccount.indexOf("sys_")!=-1){
						$('#iframe1').attr("src",'${contextPath}/pages/main.jsp');
					}else{
						$('#iframe1').attr("src",'${contextPath}/pages/gd/sy.jsp');
					}
				});
			});
 
	function gohome(){
		
		window.location.href="${contextPath}/pages/home.jsp"
			
		
		 }
	function exit() {
		location.href = "${contextPath}/tLoginObjAction/logOut";
    }
	function closeModel(){
	 		document.getElementById("oldPassword").value = '';
		    document.getElementById("newPassword").value = '';
		    document.getElementById("newPassword1").value = '';
		   $('#myModal2').modal('hide');
    }

	function updatePassword(){
		var isTrue = true;
		var oldPassword = document.getElementById("oldPassword").value;
		var newPassword = document.getElementById("newPassword").value;
		var newPassword1 = document.getElementById("newPassword1").value;
		if(newPassword.length < 3 || newPassword.length > 12){
			isTrue = false;
			$("#newPassword1_err").html("密码长度在3到12位之间");		//回填错误提示
		}
		if(newPassword != newPassword1){
			isTrue = false;
			$("#newPassword1_err").html("两次密码输入不一致");		//回填错误提示
		}
		if(isTrue){
		  	var url =  "${ contextPath }/tSysUser/updatePassword";
  	 	$.post(url,{'oldPassword':oldPassword,'newPassword':newPassword,'newPassword1':newPassword1},function(data){
  			var data = eval('(' + data + ')');
  			var element = document.getElementById("alertId");
	 			element.innerHTML = data.message ;
	 				$('#myModal2').modal('hide');
 				$('#myModal4').modal('show');
 		});
		}
	}
	
	
	function createTreeNode() {
		$
				.ajax({
					url : "${ contextPath }/tLoginObjAction/sysTree",
					data : {
						xtId : '${param.xtId}'
					},
					success : function(data) {
						$(".leftmenu").html('');
						var htmlstr = '';
						$
								.each(
										data,
										function(itemsIndex, item) {
											 
											var spanHtml = "";
											if(item.html){
												spanHtml = item.html;
											}
											htmlstr += "<li>";
											var url='';
											var canselect = '';
											if(item.children){
												
											}else{
												canselect = 'canselect="true"';
											}
											
											if(item.href){
												htmlstr += '<a href="'+item.href+ '" '+canselect+ ' target="iframe1" title="'+item.text+'">'
												//+ ' <span class="ico_box icon-time"></span> '
												+  spanHtml
												+ '  <span class="leftmenu_txt">'
												+ item.text
												+ '</span></a> ';														
											}else{
												htmlstr += '<a href="#" '+canselect+ ' title="'+item.text+'">'
												//+ ' <span class="ico_box icon-time"></span> '
												+  spanHtml
												+ '  <span class="leftmenu_txt">'
												+ item.text
												+ '</span></a> ';														
											}
								
											if(item.children){
												htmlstr += '<div class="submenu" style="display:none">';
												$
												.each(
														item.children,
														function(itemsIndex, item) {
															var subUrl = "";
															if(item.href){
																htmlstr += '<p><a target="iframe1" href="'+item.href+'">'+ item.text+'</a></p>';
															}else{
																htmlstr += '<p><a   href="#">'+ item.text+'</a></p>';
															}
															
														
												});	
												htmlstr += '</div>';
											}
											htmlstr += "</li>";
										});
						 //console.log(htmlstr);
						$(".leftmenu").html(htmlstr);
						
						$(".leftmenu span").parent().click(function() {
							$("#bodybg_box").removeClass("turn_off");
							$(".leftmenu li.active").removeClass("active");
							$(this).parent().addClass("active");
							$(".submenu").hide();
							$(this).parent().find('div').show();
						});
						
						$(".leftmenu p").click(function() {
							$(".leftmenu p.active").removeClass("active");
							$(this).addClass("active");		
						});		
						$(".leftmenu span").parent().children(":first").trigger('click');
						var el = $(".leftmenu li.active").find('.submenu a');
						if(el[0]){
							el[0].target = 'iframe1';  
							el[0].click();							
						}
					}
					
					
				});
	}
	
	function checkHttp(url){
		return url=url.substr(0,7).toLowerCase()=="http://"?true:false;
	}
 
</script>


<style type="text/css">
body, html {
	height: 100%;
}

</style>
</head>

<body class="bodybg" >
<div class="banner-box">
				<!--顶条平铺块-->
				<div class="banner-contentbox row" style="margin: 0px 20px;max-width:100%;">
					<!--顶条内容块-->

					<!--页面顶部LOGO及用户信息框开始-->

					<div class="col-md-8 logobox">
						<img src="${ contextPath }/res1/logo.png">
						<span class="systemname">${title}</span>
					</div>


	 						<div class="dropdown "
							style="display: inline-block; z-index: 7200;margin-top:70px;margin-left:15%">

							<button class="btn dropdown-toggle btn-success" type="button" id="menu1"
								data-toggle="dropdown">
								<span class="icon-user" style="color:#ace1ff;font-size:18px;margin-right:5px;"></span><span>${login.username}</span>
								<span class="icon-caret-down "></span>
							</button>
							<ul class="dropdown-menu pull-right" role="menu"
								aria-labelledby="menu1" style="z-index: 7210;">
								<li role="presentation"><a href="#" target="iframe1" data-toggle="modal" data-target="#myModal2">
								<span class="ico icon-key"></span>修改密码</a></li>
								<li role="presentation"><a href="#" target="iframe1" data-toggle="modal" data-target="#myModal3">
								<span class="ico icon-signout"></span>退出登录</a></li>
							</ul>
						</div>
					<!--页面顶部LOGO及用户信息框结束-->


				</div>
			</div>
	<div id="bodybg_box" class="bodybg_box" style="top:105px;bottom:40px;">
		

 
		<!--页面左侧菜单栏结束-->

		<!--内容区开始-->
		<div class="body_box" style='left:0px;'>
			

			
			<div class="iframebox" style="top:0px;bottom:0px;">
				<iframe  id="iframe1" name="iframe1"
					frameborder="0" width="100%" height="100%"  ></iframe>
			</div>

			



		</div>
		<!--内容区结束-->

	</div>
<div class="footbox">国网重庆永川供电公司V1.0</div>
 
	<!-- 弹出框3 -->
	<div class="modal fade" id="myModal3" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true" style="top:30%;">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">×</button>
					<h4 class="modal-title" id="myModalLabel"><span class="icon-comments " style="font-size:30px;margin-right:20px;"></span>退出系统</h4>
				</div>
				<div class="modal-body">
					<div class="alert alert-warning"> 是否确认退出系统？</div>
					
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default"  data-dismiss="modal">关闭
					</button>
					<button type="button" class="btn btn-warning"   onclick="exit()">确认退出
					</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>


	<!-- 弹出框2 -->
	<div class="modal fade" id="myModal2" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true" style="top:30%;">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" onclick="closeModel()"
						aria-hidden="true">×</button>
					<h4 class="modal-title" id="myModalLabel"><span class="icon-comments " style="font-size:30px;margin-right:20px;"></span>密码修改</h4>
				</div>
				<div class="modal-body tkform">
				<table>
				<tr>
				<th  style="width:25%;">用户名：</th>
				<td><input id="sysAccount" name="sysAccount" class="form-control" type="text" readOnly="readOnly" style="border:0;" value='${login.username}'/></td>
				</tr>
				<tr>
				<th>原密码：</th>
				<td><input id="oldPassword" name="oldPassword" class="form-control" type="password" /></td>
				</tr>
				<tr>
				<th>新密码：</th>
				<td><input id="newPassword" name="newPassword" class="form-control" type="password"  />
					<span class="text-warning">新密码长度不小于3位</span>
				</td>
				</tr>
				<tr>
				<th>新密码确认：</th>
				<td><input id="newPassword1" name="newPassword" class="form-control" type="password"  />
					<span  style="color: red;" id="newPassword1_err" >${null }</span>
				</td>
				</tr>
				
				</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" onclick="closeModel()"  >关闭
					</button>
					<button type="button" class="btn btn-success"  
						onclick="updatePassword()">提交更改</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- 提示弹出框 -->
	<div class="modal fade" id="myModal4" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true" style="top:30%">
		<div class="modal-dialog" style="width:400px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" id="btn_close"
						aria-hidden="true">×</button>
					<h4 class="modal-title" id="myModalLabel">提示信息</h4>
				</div>
			 	<div id = "alertId" class="modal-body" >
				   
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭
					</button>
		        </div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</body>


</html>
