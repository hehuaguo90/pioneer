<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:if test="${corpInfoModel==null}">
<%--
	<c:redirect url="${ contextPath }/pages/login.jsp" />
--%>
</c:if>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Strict//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<t:common />
<link type="text/css" rel="stylesheet"
	href="${ contextPath }/res/sys/main/main.css" />
<script type="text/javascript"
	src="${ contextPath }/res/sys/main/main.js"></script>

<link type="text/css" rel="stylesheet"
	href="${ contextPath }/res/sys/main/menu.css" />
<script type="text/javascript"
	src="${ contextPath }/res/sys/main/menu.js"></script>
<script type="text/javascript"
	src="${ contextPath }/res/sys/main/page.js"></script>

<link type="text/css" rel="stylesheet"
	href="${ contextPath }/res/sys/themes/default/main.css" />
<link rel="stylesheet" href="${ contextPath }/res/front/css/font-awesome.min.css"/>



<script type="text/javascript">
	var rshow = 1;
	var usershow = 1;
	function init() {
		loadMenu(contextPath + "/pages/menu2.json");
	 	//loadMenu(contextPath + "/tLoginObjAction/rightTree?pid=${param.rightId}" + "&_" + new Date().getTime());
	 	/*
	 	var week; 
		if(new Date().getDay()==0) week="星期日"
		if(new Date().getDay()==1) week="星期一"
		if(new Date().getDay()==2) week="星期二" 
		if(new Date().getDay()==3) week="星期三"
		if(new Date().getDay()==4) week="星期四"
		if(new Date().getDay()==5) week="星期五"
		if(new Date().getDay()==6) week="星期六"
		$("#date").text(new Date().getFullYear()+"年"+(new Date().getMonth()+1)+"月"+new Date().getDate()+"日 "+week);
		*/
		$("body").bind("click", function(){
			$("#rootRight").hide();
			$("#userRootRight").hide();
			rshow = 1;
			usershow = 1;
		});
		
		$("#selectRight").bind("click", function(event){
			if(rshow == 1){
				$("#rootRight").show();
				rshow = 0;
			}else{
				$("#rootRight").hide();
				rshow = 1;
			}
			
			event.stopPropagation();
		});
		
		$("#userSelectRight").bind("click", function(event){
			if(usershow == 1){
				$("#userRootRight").show();
				usershow = 0;
			}else{
				$("#userRootRight").hide();
				usershow = 1;
			}
			
			event.stopPropagation();
		});
	}
	
	function modpwd() {
		main.dialog({
			url : contextPath + "/pages/updatePassword.jsp",
			title : "修改密码",
			width:450,
			height:300
		});
	}

	function exit() {
		main.confirm({
			title : "操作提示",
			html : "您确认退出系统？"
		}).then(function(boo) {
			if (boo) {
				location.href = contextPath + "/tLoginObjAction/"+"logOut"
			}
		});
	}
	
	function detail(){
		main.dialog({
			url : contextPath + "/pages/company/detailCompany.jsp?corpId=${corpInfoModel.corpId}",
			title : "企业详情",
			width:700,
			height:600
		});
		
	}
	
</script>

<style type="text/css">
    .rootRight{
        position: absolute;
        top:45px;
        right:30px;
        width: 110px;
        padding:10px 0;
        overflow: hidden;
        background-color: #fff;
        border:1px solid #eaeaea;
        z-index: 20000;
        display: none;
        font-size:14px;
        color:#333333;
	    -webkit-background-clip: padding-box;
	    background-clip: padding-box;
	    border: 1px solid #ccc;
	    border: 1px solid rgba(0,0,0,.15);
	    border-radius: 4px;
	    -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
	    box-shadow: 0 6px 12px rgba(0,0,0,.175);
	     text-align: left;
	    list-style: none;
    }
     .rootRight a{color:#333333;}
     .rootRight li{height:30px;line-height:30px;padding-left:20px;}
     .rootRight li:hover{background-color:#f5f5f5;}
     

     
     .userRootRight{
        position: absolute;
        top:45px;
        right:130px;
        width: 100px;
        padding:2px 0;
        overflow: hidden;
        background-color: #fff;
        border:1px solid #eaeaea;
        z-index: 20000;
        display: none;
        font-size:14px;
        color:#333333;
	    -webkit-background-clip: padding-box;
	    background-clip: padding-box;
	    border: 1px solid #ccc;
	    border: 1px solid rgba(0,0,0,.15);
	    border-radius: 4px;
	    -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
	    box-shadow: 0 6px 12px rgba(0,0,0,.175);
	     text-align: left;
	    list-style: none;
    }
     .userRootRight a{color:#333333;}
     .userRootRight li{height:30px;line-height:30px;padding-left:20px;}
     .userRootRight li:hover{background-color:#f5f5f5;}
    
</style>
</head>
<body onload="init();">

	<div id="main" class="easyui-layout" data-options="fit:true">
		
		<div id="leftSide" data-options="region:'west',split:false" style="width:180px;" border="false">
			<div class="leftmenubox">
				<div class="leftmenutitle"></div>
				<div class="datagrid-mask" id="loading">
					<div class="datagrid-mask-msg">加载中...</div>
				</div>
			</div>
		</div>
		
		<div id="mainBody" class="easyui-layout" data-options="region:'center'" border="false">
			<div  id="switchbar" data-options="region:'west',split:false" border="false" style="width:7px!important;">
				<a href="javascript:void main.changeLeftMenu()"><img id="switchbtn" src="${ contextPath }/res/sys/main/img/swich_for_close.png" /></a>
			</div>
			<div data-options="region:'center'" border="false">
				<div id="mainTabs" class="easyui-tabs"
					data-options="fit:true,border:false">
					<div title="欢迎">
						<iframe src="${ contextPath }/pages/welcome.jsp?imgName=welcome" frameborder="0"
							width="100%" height="100%"></iframe>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</body>
</html>
