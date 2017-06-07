/**
 * 返回JSON形式的数据
 * @param url  地址
 * @param data  参数
 * @param func  返回函数
 * @param async  是否异步
 */
function ajaxDirect(url,data,func,async){
	if(!async){
		async = false;
	}
	$.ajax({
		url:url,
		type:"post",
		dataType:"json",
		async:async,
		data:data,
		success:func
	});
}