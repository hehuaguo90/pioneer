<%@ tag language="java" pageEncoding="UTF-8" %>
 <div class="page_bar row " style="display:none;margin-top: -28px;width:98%;">
        <div style="display:none">
       	共有<strong><span id="totalCountNew">1</span></strong>
       	条&nbsp;&nbsp;每页<strong><span id="pageSizeNew">10</span></strong>条&nbsp;&nbsp;共<strong><span id="pageCountNew">1</span></strong>页
       	&nbsp;&nbsp;
       	</div>
       	<div align="right">
       	<a href="javascript:void lastPageNew()" class='gd'>上一页</a>&nbsp;&nbsp;
       	<span id="nowPage2New">1</span>/<span id="pageCount2New">1</span>&nbsp;&nbsp;
       	<a href="javascript:void nextPageNew()" class='gd'>下一页</a>&nbsp;&nbsp;
       	<span style="display:none">第<input type="text" id="nowPageNew" class="form-control pageinput">页
         	<input class="btn btn-xs  btn-success" type="button" value="跳转" onclick="gotoPageNew()"/></span>
        </div>
</div>

	<script type="text/javascript">
	
	    var totalCountNew = 0;//总条数
	    var pageCountNew = 1;//总页数
	    var pageSizeNew = 2;//每页条数
	    var nowPageNew = 1;//当前页	
	    
	    //上一步
	    function lastPageNew(){
	        var _nowPage = parseInt($("#nowPage2New").html());
	        if(_nowPage - 1 > 0){
	            nowPageNew = _nowPage - 1;
	        }else{
	            return;
	        }
	        loadThridTable();
	    }
	    
	    //下一步
	    function nextPageNew(){
	        var _nowPage = parseInt($("#nowPage2New").html());
	        console.log(pageCountNew);
	        if(_nowPage + 1 <= pageCountNew){
	            nowPageNew = _nowPage  + 1;
	        }else{
	            return;
	        }
	        loadThridTable();
	    }
	    
	    function gotoPageNew(){
	        var toPage = $("#nowPageNew").val();
	        if(!toPage.match(/^\d+$/)){
	            $("#nowPageNew").css("color", "red");
	            return;
	        }
	        
	         $("#nowPageNew").css("color", "#555");
	        
	        toPage = parseInt($.trim(toPage));
	        if(toPage >　pageCountNew){
	            nowPageNew = pageCountNew;
	        }else{
	            nowPageNew = toPage;
	        }
	        
	        loadThridTable();
	    }
	</script>
