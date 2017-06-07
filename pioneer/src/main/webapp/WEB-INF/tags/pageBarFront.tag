<%@ tag language="java" pageEncoding="UTF-8" %>
 <div class="col-md-3 page_bar row " style="display:none;margin-top: -28px;width:34%;">
        <div style="display:none">
       	共有<strong><span id="totalCount">1</span></strong>
       	条&nbsp;&nbsp;每页<strong><span id="pageSize">10</span></strong>条&nbsp;&nbsp;共<strong><span id="pageCount">1</span></strong>页
       	&nbsp;&nbsp;
       	</div>
       	<div align="right">
       	<a href="javascript:void lastPage()" class='gd'>上一页</a>&nbsp;&nbsp;
       	<span id="nowPage2">1</span>/<span id="pageCount2">1</span>&nbsp;&nbsp;
       	<a href="javascript:void nextPage()" class='gd'>下一页</a>&nbsp;&nbsp;
       	<span style="display:none">第<input type="text" id="nowPage" class="form-control pageinput">页
         	<input class="btn btn-xs  btn-success" type="button" value="跳转" onclick="gotoPage()"/></span>
        </div>
</div>

	<script type="text/javascript">
	
	    var totalCount = 0;//总条数
	    var pageCount = 1;//总页数
	    var pageSize = 2;//每页条数
	    var nowPage = 1;//当前页	
	    
	    //上一步
	    function lastPage(){
	        var _nowPage = parseInt($("#nowPage2").html());
	        if(_nowPage - 1 > 0){
	            nowPage = _nowPage - 1;
	        }else{
	            return;
	        }
	        loadTable();
	    }
	    
	    //下一步
	    function nextPage(){
	        var _nowPage = parseInt($("#nowPage2").html());
	        if(_nowPage + 1 <= pageCount){
	            nowPage = _nowPage  + 1;
	        }else{
	            return;
	        }
	        loadTable();
	    }
	    
	    function gotoPage(){
	        var toPage = $("#nowPage").val();
	        if(!toPage.match(/^\d+$/)){
	            $("#nowPage").css("color", "red");
	            return;
	        }
	        
	         $("#nowPage").css("color", "#555");
	        
	        toPage = parseInt($.trim(toPage));
	        if(toPage >　pageCount){
	            nowPage = pageCount;
	        }else{
	            nowPage = toPage;
	        }
	        
	        loadTable();
	    }
	</script>
