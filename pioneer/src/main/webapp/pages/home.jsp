<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html style="height:100%;">
<head>
<t:base />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>${title}</title>
<link rel="shortcut icon" href="${ contextPath }/pages/favicon.ico" type="image/x-icon" />	
<link href="${ contextPath }/res/front/bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="${ contextPath }/res/front/css/font-awesome.min.css">
<link href="${ contextPath }/res/front/style/charts_webstyle.css" rel="stylesheet" type="text/css" />
<link href="${ contextPath }/res/front/style/charts_bootstrap_ext.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="${ contextPath }/res/front/js/jquery.min.js"></script>
<script src="${ contextPath }/res/front/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript">
    var _reg = /^http:.+/;
    
    var _regScript = /^javascript:.+/;
    
    var contextPath = "${ contextPath }";
	function init(){
		var url = contextPath + "/tSysRight/getRootUserRight";
		var msg = "";
		$.post(url, function(data){
			var list = data.list;
			var rightType = data.rightType;
			var index = 1;
			for(var i = 0; i <　rightType.length; i++){
				var typeName = rightType[i].text;
		        var indexGroup = i + 1;
				msg += "<ul class='syslistbox1 box" + indexGroup + "'>";
				var tindex = 0;
				for(var j = 0; j < list.length; j++){
					var right = list[j];
					if(typeName == right.typeName){
						var logoUrl = right.logoUrl == null ? "" : right.logoUrl;
						var rightUrl = contextPath + "/" + right.rightUrl + "?rightId=" + right.rightId;
						
						var idx = right.rightUrl.indexOf('?');
						if(idx && idx > 0){
							rightUrl = contextPath + "/" + right.rightUrl + "&rightId=" + right.rightId;
						}
						
						if(_reg.test(right.rightUrl) || _regScript.test(right.rightUrl)){
							rightUrl = right.rightUrl;
						}
						
						if(right.isEnable == "0"){
							rightUrl = "javascript:void(0)"
						}
						
						var style = " ico_" + index;
						var title = "";
						if(right.isEnable == "0"){
							style = "menudisable";
							title = "没有权限";
						}
						
						var li = "<li>";
						if(
							(i == 0 && (tindex == 0 || tindex == 3))
						 || (i == 1 && (tindex == 0 || tindex == 2 || tindex == 5))
						){
							li = "<li class='box_col2'>";
						}
						
						msg += li;
						
						if(right.rightUrl == 'pages/chart/leader/index.jsp' || _reg.test(rightUrl)){
							msg += "<a target='_blank' class='" + style + "' href='" + rightUrl + "'>" + logoUrl + "<p>" + right.rightName + "</p></a>";
						}else{
							msg += "<a class='" + style + "' title='" + title + "' href='" + rightUrl + "'>" + logoUrl + "<p>" + right.rightName + "</p></a>";
						}
						
						msg += " </li>";
						
						index++;
						tindex++;
					}
				}
				
				msg += "</ul>";
			}
			
			msg += "<div class='clear'></div>";
			$("#msg").html(msg);
		});
	}
	$(document).ready(function(){
		var url = "${ contextPath }/tSysUser/getUserInfoById";
			$.post(url, function(data) {
					var dataJson = eval('(' + data + ')');
					for(var key in dataJson){  
            	  		$("input#"+key).val(dataJson[key]);
          		  } 
				});
	
		  $("#leftbar_turnbox").click(function(){
		 	 $("#bodybg_box").toggleClass("turn_off");

		  });
		  
		   $(".leftmenu li").click(function(){
			 $(".leftmenu li.active").removeClass("active");
			  $(this).addClass("active");
		  });
		});
	    
	    function exit() {
			location.href = contextPath + "/tLoginObjAction/"+"logOut"
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
			  	var url = contextPath + "/tSysUser/updatePassword";
	  	 	$.post(url,{'oldPassword':oldPassword,'newPassword':newPassword,'newPassword1':newPassword1},function(data){
	  			var data = eval('(' + data + ')');
	  			var element = document.getElementById("alertId");
	 			element.innerHTML = data.message ;
	 				$('#myModal2').modal('hide');
	 				$('#myModal4').modal('show');
	 		});
			}
		}
		 
		 
		 function closeModel(){
	 		document.getElementById("oldPassword").value = '';
		    document.getElementById("newPassword").value = '';
		    document.getElementById("newPassword1").value = '';
		   $('#myModal2').modal('hide');
		 }
		 
		 function updateUserInfo(){
		 	var userTel = document.getElementById("userTel").value; 
		 	var url = contextPath + "/tSysUser/updateUserInfo";
	  	 	$.post(url,{userTel:userTel},function(data){
	  			var data = eval('(' + data + ')');
	  			var element = document.getElementById("alertId");
	 			element.innerHTML = data.message ;
	 				$('#myModal').modal('hide');
	 				$('#myModal4').modal('show');
	 		});
		 }
		 
		 //显示更新用户弹窗
		 function showUpdateUserInfo(){
			 $('#myModal').modal('show');
		 }
		 
		 //显示更新密码
		 function showUpdatePassword(){
			 $('#myModal2').modal('show');
		 }
		
		 //显示退出系统
		 function showExit(){
			 $('#myModal3').modal('show');
		 }
</script>
<style>
body,html{height:100%;}
</style>
</head>
<body onload="init();" class="bodybg">
<!--页面顶部LOGO及主菜单栏开始--><!--手机用导航条-->

<!--页面顶部LOGO及主菜单栏结束--> 

<!--内容区开始-->

<div class="chart_bodybg_box1" style="height:100%!important;position:relative;">


<div style="text-align:left;margin:auto;width:850px;height:500px;position:absolute;left:50%;top:50%;margin-top:-250px;margin-left:-420px;">
<img src="${ contextPath }/res/front/style/images/sys_select_logo.png" width="612" height="109" style="margin-bottom:20px;"> <br>
<div class="syslistbox_area1" id="msg">

</div>
</div>
</div>
	<!-- 弹出框1 -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true" style="top:30%;">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">×</button>
					<h4 class="modal-title" id="myModalLabel"><span class="icon-comments " style="font-size:30px;margin-right:20px;">${null }</span>用户信息</h4>
				</div>
				<div class="modal-body tkform">
				<table>
				<tr>
				<th style="width:25%;">用户姓名：</th>
				<td><input id="userName" name="userName" class="form-control" type="text" readOnly="readOnly" style="border:0;"/></td>
				</tr>
				<tr>
				<th>所属区域：</th>
				<td><input id="shortName" name="shortName" class="form-control" type="text" readOnly="readOnly" style="border:0;"/></td>
				</tr>
				<tr>
				<th>联系方式：</th>
				<td><input id="userTel" name="userTel" class="form-control" type="text"  /></td>
				</tr>
				<!--  
				<tr>
				<th>上次登录时间：</th>
				<td><input id="lastLogTime" name="lastLogTime" class="form-control" type="text" readOnly="readOnly" style="border:0;"/></td>
				</tr>
				-->
				</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭
					</button>
					<button type="button" class="btn btn-success"  
						onclick="updateUserInfo()">提交更改</button>
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
					<h4 class="modal-title" id="myModalLabel"><span class="icon-comments " style="font-size:30px;margin-right:20px;">${null }</span><span class="text">修改密码</span></h4>
				</div>
				<div class="modal-body tkform">
				<table>
				<tr>
				<th  style="width:25%;">用户名：</th>
				<td><input id="sysAccount" name="sysAccount" class="form-control" type="text" readOnly="readOnly" style="border:0;"/></td>
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
					<button type="button" class="btn btn-default" onclick="closeModel()" >关闭
					</button>
					<button type="button" class="btn btn-success"  
						onclick="updatePassword()">提交更改</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- 弹出框3 -->
	<div class="modal fade" id="myModal3" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true" style="top:30%;">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">×</button>
					<h4 class="modal-title" id="myModalLabel"><span class="icon-comments " style="font-size:30px;margin-right:20px;">${null }</span>退出系统</h4>
				</div>
				<div class="modal-body">
					<div class="alert alert-warning"> 是否确认退出系统？</div>
					
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default"  data-dismiss="modal">关闭
					</button>
					<button type="button" class="btn btn-warning"   onclick ="exit()">确认退出
					</button>
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
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">×</button>
					<h4 class="modal-title" id="myModalLabel">提示信息</h4>
				</div>
			 	<div id="alertId" class="modal-body" >
				   
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</body>
</html>
