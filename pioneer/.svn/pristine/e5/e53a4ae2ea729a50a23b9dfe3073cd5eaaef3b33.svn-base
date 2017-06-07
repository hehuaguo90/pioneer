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
<link rel="stylesheet" href="${ contextPath }/res1/front/css/font-awesome.min.css">
<link href="${ contextPath }/res1/front/style/webstyle.css" rel="stylesheet" type="text/css" />
<script src="${ contextPath }/res1/gis/TableSorter.js"></script>
<script src="${ contextPath }/res1/gis/common.js"></script>
 <style type="text/css">
 .ol-zoom {
    top: 8em;
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
function showLeftTime(){
	var now=new Date();
	var year=now.getFullYear();
	var month=now.getMonth();
	var day=now.getDate();
	var hours=now.getHours();
	var minutes=now.getMinutes();
	var seconds=now.getSeconds();
	var html=""+year+"年"+month+"月"+day+"日 "+hours+":"+minutes+":"+seconds+"";
	document.getElementById("showTime").innerHTML=html;
	//一秒刷新一次显示时间
	setTimeout(showLeftTime,1000);
	}
</script>
<style>
#titleLogo{
height:86px;
}

</style>
              
</head>



<t:form>
<body  onload="showLeftTime()">
<div class="iframe_body"  style="height:100%"><!--此DIV为必要的body以下最外层页面容器-->


    <div id="paper_box_bg" class="paper_box_bg paper_layout_full"  style="height:100%">
    	<div class="paper_box"  style="height:100%">
        <!--此DIV为内容区的最外层容器，所有内容均应放置于本DIV以内-->
       <div class="location_box" id="titleLogo" style="margin-bottom:8px;">
     <div class="col-md-2"  >
  <span class="ico icon-home"></span>
   <span  style="line-height:20px"> 重庆电力公司 <br style="margin:0px;padding:0px;line-height:0px;"/>永川电力分公司</span>  
   </div> 
       		
    <div class="col-md-3">
           电网故障抢修应急指挥系统（V 1.0.0）       
   </div> 
    <div class="col-md-4">
   </div> 
    <div class="col-md-3">
          <div id="showTime"></div>
   </div> 
       </div>
       
       <div class="paper_content_box_table row" style="height:100%">
       
        <div class="col-md-9 mapbox">
         <div style="position:absolute;top:10px;left:20px;"><a href="#fdf" style="font-size:16px"><span id='span_title' style="font-weight:bold;"></span><span style="font-weight:bold;">认证分布图</span></a></div> 
        	<!--浮动在地图上方的三品一标选项卡开始-->
            <div class="map_icotab" style="z-index:999;left:10px;top:38px;display:none">
            	 
            	<ul class="map_icotab_list">
                	<li class="active" title='无公害农产品' data='1'><img src="${ contextPath }/res1/front/style/images/map_product_ico_1.png" width="47" height="47" ><span class="arrow icon-sort-down "></span></li>
                    <li title='绿色食品' data='2'><img src="${ contextPath }/res1/front/style/images/map_product_ico_2.png" width="47" height="47"><span class="arrow icon-sort-down "></span></li>
                    <li title='有机食品' data='3'><img src="${ contextPath }/res1/front/style/images/map_product_ico_3.png" width="47" height="47"><span class="arrow icon-sort-down "></span></li>
                    <li title='农产品地理标志' data='4'><img src="${ contextPath }/res1/front/style/images/map_product_ico_4.png" width="47" height="47"><span class="arrow icon-sort-down "></span></li>
                    <li title='名牌农产品' data='5'><img src="${ contextPath }/res1/front/style/images/map_product_ico_5.png" width="47" height="47"><span class="arrow icon-sort-down "></span></li>
                </ul>        
                <div class="map_check" style='display:none'><input style="" id="check1" name="" type="checkbox" value="" checked >&nbsp;<label for="check1">显示地理位置</label></div>    
                
          </div>
            <!--浮动在地图上方的三品一标选项卡结束-->
          <div id="map_content">
    	    <div id="map" class="map"  style='cursor:pointer;'>
 			<div id="popup"></div>
	      <!-- <div class="ol-toggle-options ol-unselectable"><a title="Toggle options toolbar" onClick="toggleControlPanel()" href="#toggle">...</a></div> -->
		    </div>
 
         </div>  
            
             <!--地图标记图例-->
      <ul class="map_tl2" style='display:none'>
      
      	<li><img src="${ contextPath }/res1/front/style/images/map_ex_ico_1.png" width="35">水产</li>
        <li><img src="${ contextPath }/res1/front/style/images/map_ex_ico_2.png" width="35">畜牧</li>
        <li><img src="${ contextPath }/res1/front/style/images/map_ex_ico_3.png" width="35">蔬菜</li>
        <li><img src="${ contextPath }/res1/front/style/images/map_ex_ico_4.png" width="35">粮油</li>
        <li><img src="${ contextPath }/res1/front/style/images/map_ex_ico_5.png" width="35">经作</li>
      </ul>
       </div>
       
       <!--  <div class="subtitle"><span id='span_title'></span>认证分布图</div>-->
       <div class="col-md-3"  id='div_xz' style="width:34%;height:80%">
<div class="tree well">
        <ul>
            <li>
                <span><i class="icon-minus-sign"></i> 区县</span> <a href=""></a>
                <ul>
                    <li>
                        <span><i class="icon-leaf"></i> 永川区</span> <a href=""></a>
                    </li>
                    <li>
                        <span><i class="icon-leaf"></i> 荣昌区</span> <a href=""></a>
                    </li>
                    <li>
                        <span><i class="icon-leaf"></i> 双桥区</span> <a href=""></a>
                    </li>
                </ul>
            </li>
<%--            <li>--%>
<%--                <span><i class="icon-folder-open"></i> 顶级节点2</span> <a href=""></a>--%>
<%--                <ul>--%>
<%--                    <li>--%>
<%--                        <span><i class="icon-leaf"></i> 一级节点2_1</span> <a href=""></a>--%>
<%--                    </li>--%>
<%--                </ul>--%>
<%--            </li>--%>
        </ul>
    </div>
         </div>
   <div class="col-md-12"  >
   <div class="col-md-3"  >
     总条数：50
   </div> 
   <div class="col-md-3" >
   在运：42
   </div> 
   <div class="col-md-3"   >
   故障：8
   </div> 
   <div class="col-md-3"  >
   
   </div> 
   
   </div>        
         
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
					<button type="button" class="close" onclick="closeModel();"  aria-hidden="true">×</button>
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
</body>


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
    $('#map').css("height",document.documentElement.clientHeight*0.81);  
    var map = new ol.Map({
      layers: [cqmap, vector],
      target: 'map',
      view : new ol.View({
			projection : 'EPSG:4326',
			center : [ 105.76864, 29.392503 ],
			zoom : 11,
			zoomFactor : 1.89
		})
    });
    
    
    //var bounds = [105.260704754372, 29.164127,
    //              110.242637933198, 32.212044];
   // map.getView().fit(bounds, map.getSize());
    
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

 
    
    var changeHight = function(height){    
    	var divHeight  = $('#div_xz').height();
    	 if(height <= divHeight){
     	 	if(height < 0){
     	 	 $("table tbody").scrollTop(height+70); 
     	 	}
    	 } else
    		$("table tbody").scrollTop(height);  
    }

     var highlight;
     
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
        	alert("1");
        	window.location = '${ contextPath }/pages/gd/yongchuan.jsp';
            var areaName = feature.get('NAME99');
            var name = feature.get('name');
            
            //vectorSource.clear();
             if(name){
            	 loadDatas(name);	
             }
            
	          if(areaName){
	        	  setFeature(areaName);
	        	  $("table").find("tr").each(function(){
	        		  $(this).removeClass('tr_onselect');
	        		  var tdArr = $(this).children();
	        		  // console.log(tdArr.eq(1).text());
	        		  if(areaName == tdArr.eq(1).text()){
	        			  $(this).addClass('tr_onselect');
	        			  var obj = $(this);
	        			  var offset = obj.offset();  	  
	        			  //alert(obj.position().top);
	        			  changeHight(obj.position().top);
	        			   //loadDatas(areaName);	
	        		  }
	        	  });
	        	  
	              if (feature !== highlight) {  
	          	    if (highlight) {  
	          	    	vectorSource.removeFeature(highlight);  
	          	    	
	          	    }  
	          	    if (feature) {  
	          	      vectorLayer.setStyle(style1);   
	                  vectorSource.addFeature(feature);
	          	    }  
	          	    highlight = feature;  
	          	  } 
	          		  
	          }
 
        }        
      };

 

      map.on('click', function(evt) {
       displayFeatureInfo(evt.pixel);
       // alert(444);
     // var pixel = map.getEventPixel(evt.originalEvent);  
      // var arrayFeature = vectorLayer.getSource().getFeatures();
      // var coordinate = evt.coordinate;  
      // alert(coordinate);
     
      });
      
 
        
      
      loadPoint = function(rzcplx){ 
    	  
    	  
	    	var sou = vectorLayer.getSource();
 
	    	if(sou!=null){
	    		sou.clear(); 
	    	}
	    	var season = getMaxSeason(rzcplx);
	    	 
			$.ajax({  
                url: contextPath + "/dcQX/comList",  
                data:{tab:"DC_SPYB_TJ", zb:"RZCPSL",sjpc:season,rzcplx:rzcplx},
                dataType: "json",  
                beforeSend:function(){
			    	   $('#loading').modal('show');
			   	  },
                success: function (data) {  
              	 loadLays(data);
              	 //setTimeout(" $('#loading').modal('hide')", 500 ) ;
              	 $('#loading').modal('hide');
                },
                error:function(){
                 //setTimeout(" $('#loading').modal('hide')", 500 ) ;
                 $('#loading').modal('hide');
                }
           }); 
		}

	      
	     getMaxSeason = function(rzlx){
	    	 var jsonMaxReason = '${jsonMaxReason}';
	    	 var dataObj=eval("("+jsonMaxReason+")");
	    	 var season = '';
	    	 $.each(dataObj, function(i) {
	    		    if(dataObj[i].RZCPLX == rzlx){
	    		    	season = dataObj[i].SJPC;
	    		    }	    		    	
	    		});	
	    	  return  season;
	     } 
	     	     
             var vectorLayer = new ol.layer.Vector({
		 		     //   source: vectorSource
		 		      });
		       
		       //加载坐标点开始
		       var vectorSource = new ol.source.Vector({
		 	      //  features: [iconFeature]
		 	  });  
	   

		
	      
	      
	      
	      
	      function loadLays(data){
	    	highlight = '';
        	for (var i = 0; i < data.length; i++) {
				var obj = data[i];
			    //  <!--地图标记点击后信息气泡-->				   
				    var imgUrl = "/res1/gis/map_mark_1.png";
					var iconFeature = new ol.Feature({
				        geometry: new ol.geom.Point([obj.CENTROID_X, obj.CENTROID_Y]),
				        name:obj.NAME99,
				        population: 4000,
				        rainfall: 500
				      });
			    if(obj.SL!=undefined){
					var a = '<a>' + obj.SL +'</a>';
					var iconStyle = new ol.style.Style({
		        	        image: new ol.style.Icon(({
		        	           anchor: [0.5, 33],
		        	          anchorXUnits: 'fraction',
		        	          anchorYUnits: 'pixels',
		        	          src: contextPath+imgUrl
		        	        })) , 
		        	        text:  createTextStyle(iconFeature,obj.SL==undefined?" ":obj.SL+'',1,1)
		        	      });					
					iconFeature.setStyle(iconStyle);
					vectorSource.addFeature(iconFeature);  
			    	
					
			    }		
			    
	 
			}   
          
          vectorLayer.setSource(vectorSource); 
 
		  map.addLayer(vectorLayer);  
		  map.render();
	      }
	 
	      
	      var createTextStyle = function(feature, text,xValue,yValue) {
	          var align = 'Center';
	          var baseline = 'Middle';
	          var size = '12px';
	          var offsetX = parseInt(-xValue, 10);
	          var offsetY = parseInt(yValue, 10);
	          var weight = 'bold';
	          var rotation = parseFloat('Arial');
	          var font = weight + ' ' + size + ' ' + 'Arial';
	          var fillColor = 'white';
	          var outlineColor ='#ffffff';
	          var outlineWidth = parseInt('8', 10);
			  var x=0;
			  var y=25;
	          var length = text.length;
	          if(length){
	        	  if(length == 1){
	        		  x = 3;
	        		  y = 20;
	        	  }else if(length == 2){
	        		  x = 6;
	        		  y = 20;
	        	  }else if(length == 3){
	        		  x=10;
	        		  y=20;
	        	  }
	          }
	          
	          return new ol.style.Text({
	            textAlign: align,
	            textBaseline: baseline,
	            font: font,
	         //   text: getText(feature, resolution, dom),
	        	 text: text,
	             fill: new ol.style.Fill({color: fillColor}),
	           // stroke: new ol.style.Stroke({color: outlineColor, width: outlineWidth}),
	            offsetX: offsetX-x,
	            offsetY: offsetY-y,
	            rotation: rotation
	          });
	        };	      
	      
	      $(document).ready(function() {
	    	  $(".map_icotab_list li.active").trigger('click');
			});
  </script>

</t:form>
</html>
