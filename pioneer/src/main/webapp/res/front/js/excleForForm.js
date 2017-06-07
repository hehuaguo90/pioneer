	/**
	*  根据form表单Id
	*  导出相应的excle模板
	**/
  function exportExcle(formId,formName){ 
	   window.location.href =  contextPath+"/excelHelp/downExcelOfForm.action?formId="+formId+"&formName="+encodeURIComponent(formName);
	}
  function uploadExcle(){
	  jQuery('#file_upload').uploadifive('upload');
  }
  
  /**
  *  根据form表单Id
  *  导入excle文件至页面表单 
  *  fileName 上传到服务器上的文件名
  **/ 
 function importExcle(fileName){
//	 var h4= document.getElementById("myModalLabel");
//	    h4.innerHTML = "你想要改变的内容";
	 
	 var fileIds=$("input[name='fileId']");
		 var ary = '';
	    for(var i=0;i<fileIds.length;i++){
			if(i==0){
				ary = fileIds[i].defaultValue;
			}else{
				ary = ary + ","+ fileIds[i].defaultValue;
			}
		}
	    if(fileName){
	    	  var formId = document.getElementById("form_id").value;
	    	  var url = contextPath + "/excelHelp/upExcelToForm.action";
	 		 $.post(url,{'fileId':fileName,'formId':formId},function(data){
	 			//alert(JSON.stringify(eval('(' + data + ')')));
	 			//enumaKey(eval('(' + data + ')'));
	 			data = kernel.json.parse(data);
	 			 if(data.errorMsg){
	 				 $('#importMsg').html(data.errorMsg);
	 				$('#importError').modal('show');
	 			 }else{
	 				 //清空表单数据
	 				$('input',document.forms[0]).not(':button, :submit, :reset, :hidden, :checkbox').val('');  
	 				$(':checkbox',document.forms[0]).attr("checked",false);
	 				if("tXmZgzzdj"==formId){
	 					page.loadForm({data:data.tXmZgzzdj});
							for(var i=0;i<data.tXmZgzqk.length;i++){
								loadZgzqk(i,data.tXmZgzqk);
							}
							for(var i=0;i<data.tXmZgzzyqsb.length;i++){
								loadYqsb(i,data.tXmZgzzyqsb);
							}
	 				}else{
	 					page.loadForm({data: data});
	 				}
	 			 }
	 			
	 	});
	    }
	    cancelFile(fileId);
 } 
 
 // 全局变量  判断用户是否点击  添加一行数据
 var rowNum = 0;
 // 全局变量  判断用户第一行 是否存在数据
 var b = false;
 
 /**
  * 判断第一个tr 是否存在数据；
  * 如果不存在，则将全局变量 b 变为true
  */
 function pdRow(){
	 if(rowNum == 0){
		 var inputs = $('#'+trids[0] + " .form_input");
		 for(var j = 0;j < inputs.length; j++){
				if(inputs[j].tagName.toLowerCase() != 'select' && $.trim(inputs[j].value)){
					b = true;
					break;
				}
			}
	 }
	 if(rowNum > 0){
		 b = true;
	 }
 }
 
 
 /**
  * 将后台返回的信息显示在页面上
  */
 function enumaKey(smsTypeDesc){
	 pdRow();
	 var atr = trids[trids.length-1];
	 var tr = $('#'+atr);
	if(tr&&tr[0]){
	 	for (var i=0;i<smsTypeDesc.length;i++){
	 			var _tr = tr.clone();
	 			var rowId =  getRowId();
	 			_tr.attr("id", rowId);
	 			tr.after(_tr);
	 			tr = _tr;
	 		var a = "#" + tr.attr("id") + " .form_input";
	 		var inputs = $(a);
	 		for(var key in smsTypeDesc[i]){
	 			for(var j = 0;j < inputs.length; j++){
	 				
	 				if(key == inputs[j].id){
	 					inputs[j].value = smsTypeDesc[i][key];
	 					break;
	 				}
	 			}
		     }  
		}
	 	//如果第一行数据没有数据，则 删除第一个 <tr>
	 	if(!b){
			 $('#'+trids[0]).remove();
			 trids.splice(0,1);
			 rowNum = 1;
			 b = true;
		 }
	}else{
		   for(var key in smsTypeDesc[0]){  
			   
          //子向父赋值 
          //  window.opener.document.getElementByIdx(key).value= smsTypeDesc[key];
              $("input#"+key).val(smsTypeDesc[0][key]);
            } 
	}
}
 
 // 全局变量 <tr> 数组；
 var trids = [];
 // 全局变量 <tr> id累加
 var id = 0;
 
 
 /**
  * 获取 'tr'的id 
  * @returns {String}
  */
 function getRowId(){
	 id++;
	 var rowId = "dataRow" + id;
	 trids.push(rowId);
	 return rowId;
 }
 
 
/** 
 * 添加一行数据
 */
function insertOneRow(){
	rowNum++;
	var atr = trids[trids.length-1];
	var tr = $('#'+atr);
	var _tr = tr.clone();
	var rowId =  getRowId();
	
	_tr.attr("id", rowId);
	tr.after(_tr);
	//将新加的一行数据清空
	var rtr = document.getElementById(rowId); // 取得ID为Id1的tr对象
	inps = rtr.getElementsByTagName('input'); // 从tr 对象中获取所有input对象
	for(var i = 0, len = inps.length; i < len; i++) {
	    inps[i].value = ''; // 将每一个input的value置为空
	  //  $("#" + inps[i])
	  //$(inps[i]).setAttribute("class","form_input");
	    
	}
	

}
	

