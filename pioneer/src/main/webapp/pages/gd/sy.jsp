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
<meta name ="viewport" content ="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no">
<link rel="shortcut icon" href="${ contextPath }/pages/favicon.ico" type="image/x-icon" />
<title>重庆市畜牧系统</title>
<script type="text/javascript" src="${ contextPath }/res1/front/js/jquery.min.js"></script>
<link href="${ contextPath }/res1/front/style/webstyle.css" rel="stylesheet" type="text/css" />
<link href="${ contextPath }/res1/front/style/bootstrap_ext.css" rel="stylesheet" type="text/css">
<link href="${ contextPath }/res1/front/bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="${ contextPath }/res1/front/style/bootstrap_ext.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="${ contextPath }/res1/front/css/font-awesome.min.css">
<script src="${ contextPath }/res1/front/bootstrap/js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css" media="all" href="${ contextPath }/res1/front/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css" />

<script type="text/javascript" src="${ contextPath }/res1/front/plugins/bootstrap-daterangepicker/moment.js"></script>
<script type="text/javascript" src="${ contextPath }/res1/front/plugins/bootstrap-daterangepicker/daterangepicker.js"></script>
<link rel="stylesheet" href="${ contextPath }/res1/gis/ol.css" type="text/css">
 
<!-- The line below is only needed for old environments like Internet Explorer and Android 4.x -->
<script
	src="${ contextPath }/res1/front/plugins/gis/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
<script src="${ contextPath }/res1/gis/ol.js"></script>
 <!--    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>  -->
<link rel="stylesheet" href="${ contextPath }/res1/front/css/font-awesome.min.css">
<link href="${ contextPath }/res1/front/style/webstyle.css" rel="stylesheet" type="text/css" />
<script src="${ contextPath }/res1/gis/TableSorter.js"></script>
<script src="${ contextPath }/res1/gis/common.js"></script>
 <style type="text/css">
 .ol-zoom {
    top: 1em;
    left: .5em;
}
 

 .table-striped > tbody > tr:nth-of-type(2n+1) {
    background-color: #fff;
}
.table{
    background-color: #f9f9f9;
}

 
 
  </style>
<script type="text/javascript">
function updateRoute(){
	ajaxDirect("${ contextPath }/TSysJxxl/cntNum",{},function(data){
		$("#ALLNUM").html("总条数："+data[0].ALLNUM+"条");
		$("#msg1").html("当前总线路条数:"+data[0].ALLNUM+"条，其中正运行线路"+data[0].CNTNUM+"条，"+"<span style='color:red'>故障线路"+data[0].BADNUM+"条</span>，出动抢修车辆"+data[0].ZYCL+"辆，人次："+data[0].ZYRY+"人");
		$("#CNTNUM").html("<img src='${ contextPath }/res1/gis/green.png' style='margin-bottom: 8px'>在运："+data[0].CNTNUM+"条");
		$("#BADNUM").html("<img src='${ contextPath }/res1/gis/red.png' style='margin-bottom: 8px'>故障："+data[0].BADNUM+"条");
		
		
	});
}

var updateInfo = function(){
	ajaxDirect("${ contextPath }/TSysSy/listAll",{},function(data){
		$("#div_info").html(data[0].INFO); 
	});
}

var colorDataJson = '';

var updateState = function(){
	ajaxDirect("${ contextPath }/TSysSy/listStateSy",{},function(data){
        $('#div_tj').html('');	
   	   var html = ' <table class="table table-striped table-bordered table-hover  " id="sort" >';
	    	   html+='	<thead>'
 	  		  + '<th style="font-size:14px;margin-left:3px;cursor:pointer" id="data_dict_no">序号<span style="font-size:10px;margin-left:3px;" ></span></th>'
 	  	   	  + '<th style="font-size:14px;margin-left:3px;cursor:pointer" id="rzcpsl">分公司名称<span style="font-size:10px;margin-left:3px;" ></span></th>'
 	          + '<th style="font-size:14px;margin-left:3px;cursor:pointer" id="rzqysl">故障条数<span style="font-size:10px;margin-left:3px;"  ></span></th>'
 	          + '</tr>'
 	          + '</thead>'
 	          + '<tbody>';
   	    for(var i=0; i <data.length;i++){
   	    	html+='<tr style=\'cursor:pointer\'>'  + '<td align="center">'+(i+1)+'</td>'  
   	    		+ '<td align="center">'+data[i].NAME99+'</td>'
   	    		+ '<td align="center">'+data[i].GZSL+'</td>'
   	    		+ '</tr>';
   	    	
   	       	    	
   	    }
     	html += '</tbody>'
         		 + '<table>';
           //console.log(html);
        $('#div_tj').html(html);
        colorDataJson = data;	
        
	});
}




	$(document).ready(function(){
		var title = '${param.title}';
		if(title){
			$('.systemname', parent.document).html(title);
		}
	
		updateRoute();
		updateInfo();
		updateState();
		//实时更新 5秒
		setInterval(updateRoute,5000);
		setInterval(updateState,5000);
			
    //设置标题
	var name = 	getParentUrlParam('xtName');
    $('#span_xt').html(getParentUrlParam('xtName'));
    var activeObj = $('.leftmenu', window.parent.document);
    var pObj  = $(activeObj).find('p.active');
    $('#span_sub').html(pObj.text()); 
 
});

	function showLeftTime(){
		var now=new Date();
		var year=now.getFullYear();
		var month=now.getMonth()+1;
		var day=now.getDate();
		var hours=now.getHours()<10?"0"+now.getHours():now.getHours();
		var minutes=now.getMinutes()<10?"0"+now.getMinutes():now.getMinutes();
		var seconds=now.getSeconds()<10?"0"+now.getSeconds():now.getSeconds();
		var html=""+year+"年"+month+"月"+day+"日 "+hours+":"+minutes+":"+seconds+"";
		document.getElementById("showTime").innerHTML=html;
		//一秒刷新一次显示时间
		setTimeout(showLeftTime,1000);
		}	
</script>

       
</head>




<body  onload="showLeftTime()">
<div class="iframe_body"><!--此DIV为必要的body以下最外层页面容器-->


    <div id="paper_box_bg" class="paper_box_bg paper_layout_full">
    	<div class="paper_box">
        <!--此DIV为内容区的最外层容器，所有内容均应放置于本DIV以内-->
       <div class="location_box" style="margin-bottom:8px;display:none">
       		 <a href="#fdf" style="font-size:24px"><span class="active" style="position:absolute;left:45%;font-weight:bold;color:rgb(52,83,145)">配网故障抢修应急指挥系统</span></a> 
       </div>
        <div class="location_box" style="margin-bottom:8px;">
					<span class="ico icon-home"  ></span> <span class="active gd" style='margin-top:8px'>当前位置&gt;<a href="${ contextPath }/pages/gd/sy.jsp" style="font-size: 15px">首页</a></span><span id="showTime" class='gd' style="position: absolute; left: 85%;"></span>
				</div>
       <div class="paper_content_box_table row">
       
        <div class="col-md-9 mapbox">
  
        	<!--浮动在地图上方的三品一标选项卡开始-->
   
            <!--浮动在地图上方的三品一标选项卡结束-->
          <div id="map_content">
    	    <div id="map" class="map"  style='cursor:pointer;'>
 			<div id="popup"></div>
	      <!-- <div class="ol-toggle-options ol-unselectable"><a title="Toggle options toolbar" onClick="toggleControlPanel()" href="#toggle">...</a></div> -->
		    </div>
 
         </div>  

       </div>

					<div class="col-md-3 gd" id='div_info' style="width: 34%;">
					</div>
			       <div class="col-md-3"  id='div_tj' style="width:34%;margin-top:20px;">
			       <table class="table table-striped table-bordered table-hover">
				
				<thead style="display: block;">
					<tr>
						<th style="width:14%">序号</th>
						<th style="width:14%">分公司</th>
						<th style="width:14%">故障线路条数</th>
					</tr>
				</thead>
				<tbody style="display: block;overflow: auto; ">
			 
					<tr class="tr_onselect">
						<td style="width:14%">1</td>
						<td style="width:14%">永川分公司</td>
						<td style="width:14%">2</td>
					</tr>
					<tr >
						<td>2</td>
						<td>荣昌分公司</td>
						<td>3</td>
					</tr>
			 
				</tbody>
			</table>  
			         </div>
			         
			         <div class="col-md-3 gd"  id='msg1'  style="width: 34%;">
			                    
					</div>
            <div class="col-md-12 "" style="margin-top:18px;width:100%">
					<span class="ico icon-home" style='display:none'></span> <a href="#fdf"
						style="font-size: 13px"><span class="active gd"
						style="position: absolute; left:1%; " ID="ALLNUM"></span><span class="active gd"
						style="position: absolute; left:25%;" id="CNTNUM"></span><span class="active gd"
						style="position: absolute; left:56%; color: red" id="BADNUM"></span> </a>
				</div>
    </div>


		</div>
    
</div>


<!--弹出框开始-->
<div class="modal fade" id="loading" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="loading_box row">
    <div class="col-md-2">
    <i class="icon-spinner icon-spin" style="font-size:36px;"></i>
    </div>
    <div class="col-md-10 loading_box_txt">
    正在加载中，请稍候...
    </div>
    
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->



   	<!-- 弹出框2 -->
   	<div class=''>
	<div class="modal fade" id="myModal2" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true" style="top:1%;margin-left:-500px;" style="z-index:999;">
		<div class="modal-dialog">
			<div class="modal-content" style="width:1000px">
				<div class="modal-header">
					<button type="button" class="close" onclick="closeModel()"
						aria-hidden="true">×</button>
					<h4 class="modal-title" id="myModalLabel"><span class="icon-comments " style="font-size:30px;margin-right:20px;">${null }</span><span class="text"></span></h4>
				</div>
				<div class="modal-body tkform easy"> </div>
				<div style="padding-left:20px;"><input type='hidden' id='hidAreaName'><input type='hidden' id='hidAreaName2'><t:pageBarFront></t:pageBarFront></div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	</div>

 


 <script>
    var vector = new ol.layer.Vector({
      source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: '${gesUrl}/cite/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite:BASE_SY&maxFeatures=50&outputFormat=application%2Fjson'
      }),
      style: new ol.style.Style({
          fill: new ol.style.Fill({
        	  color: 'rgba(255,0,0,0.1)'
          }),
          stroke: new ol.style.Stroke({
            color: '#319FD3',
            width: 1
          })
        })
    });
    
    var cqmap = new ol.layer.Image({
		source : new ol.source.ImageWMS({
			ratio : 1,
			url : '${gesUrl}/cite/wms',
			params : {
				'FORMAT' : 'image/png',
				'VERSION' : '1.1.1',
				STYLES : '',
				LAYERS : 'cite:BASE_SY',
			}
		})
	});
    $('#map').css("height",document.documentElement.clientHeight*0.79);  
   
    var map = new ol.Map({
      layers: [cqmap, vector],
      target: 'map',
      view : new ol.View({
			projection : 'EPSG:4326',
			center : [ 105.76864, 29.292503 ],
			zoom : 11,
			zoomFactor : 1.86
		})
    });
     var featureOverlay = new ol.layer.Vector({
        source: new ol.source.Vector(),
        map: map,
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: '#f00',
            width: 2
          }),
          fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
          })
        })
      });

        var arrayFeature = vector.getSource().getFeatures();
 
 	 	for(var i =0; i <arrayFeature.length;i++){
 	 		var obj = arrayFeature[i];
 	 		if(obj.I.NAME99 === name){
       	        vectorLayer.setStyle(style1);   
                 vectorSource.addFeature(obj); 	
                 highlight[i] = obj;
 	 		} 
 	 	}
    
    var changeHight = function(height){    
    	var divHeight  = $('#div_xz').height();
    	 if(height <= divHeight){
     	 	if(height < 0){
     	 	 $("table tbody").scrollTop(height+70); 
     	 	}
    	 } else
    		$("table tbody").scrollTop(height);  
    }

    
     
     var style1 =   new ol.style.Style({
         stroke: new ol.style.Stroke({
           color: '#f00',
           width: 2
         }) });
     
     
 
 
     

     
      var displayFeatureInfo = function(pixel) {

        var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
          return feature;
        });

  
        if (feature) {
        	 var areaName = feature.get('NAME99');
        	 var ADCODE99 = feature.get('ADCODE99');
        	 var FGSMC = feature.get('FGSMC');
        	if(areaName != '大足区')
        		$('#iframe1', parent.document).attr("src",'${contextPath}/pages/gd/yongchuan.jsp?areaName='+areaName+"&ADCODE99="+ADCODE99+"&FGSMC="+FGSMC); 
        }        
      };

 	var highlight = new Array(3);

     //点击行政区 切换地图
    setFeature = function(){
	 	
	 	   for(var m =0;m<highlight.length;m++){
 	         var temp = highlight[m];
 	         if(temp){
 	            vectorSource.removeFeature(temp);  
 	            highlight[m] = '';
 	         }
 	      }
	 	
	 	
	    for(var j=0;j < colorDataJson.length; j++){
	      var name = colorDataJson[j].NAME99;
    	  var arrayFeature = vector.getSource().getFeatures();
          for(var i =0; i <arrayFeature.length;i++){
 	 		    var obj = arrayFeature[i];	 		 
 	 		   if(obj.I.NAME99 === name){
 	 		     if(colorDataJson[j].GZSL > 0){
       	          vectorLayer.setStyle(style1);   
                  vectorSource.addFeature(obj); 	
                  highlight[i]= obj;
 	 		     } 
 	 	      }
 	       }

 	 	}
	 	     
	 	          
          vectorLayer.setSource(vectorSource); 
 
		  map.addLayer(vectorLayer);  
		  map.render();
		  
		 setTimeout("setFeature()",5000);
     }
 
       setTimeout("setFeature()",2000);
      map.on('click', function(evt) {
         displayFeatureInfo(evt.pixel);
 
      });
      
           var vectorLayer = new ol.layer.Vector({
		 		     //   source: vectorSource
		 		      });
		       
		       //加载坐标点开始
		       var vectorSource = new ol.source.Vector({
		 	      //  features: [iconFeature]
		 	  });  
 
  </script>


</body>

</html>
