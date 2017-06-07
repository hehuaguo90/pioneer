function format_number(n){
	
	if(!n){
		return '-';
	}
	
   var b=parseInt(n).toString();
   var len=b.length;
   if(len<=3){return b;}
   var r=len%3;
   return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(",");
 }

/****
json排序
****/
function getSortFun(order, sortBy) {
    var ordAlpah = (order == 'asc') ? '>' : '<';
    var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
    return sortFun;
}

/******
 * 获取最大值
 * @param mydata
 * @returns {Number} 返回值
 */
function getMaxData(mydata){
    var fgs = [];
	var maxData = 0;
	if(mydata){
		for(var i = 0; i < mydata.length; i++){
			if(maxData<mydata[i].value){
				maxData = Math.floor(mydata[i].value*1.1);
			}
		}
	}
	return maxData;
}

/*****
 * 获取最小值
 * @param mydata
 * @returns {Number} 返回值
 */
function getMinData(mydata){
    var fgs = [];
	var maxData = 0;
	if(mydata){
		for(var i = 0; i < mydata.length; i++){
			if(maxData>mydata[i].value&&maxData>0){
				maxData = Math.floor(mydata[i].value*0.9);
			}else{
				maxData = Math.floor(mydata[i].value*0.9);
			}
		}
	}
	return maxData;
}

/*****
 * 获取显示需要的JSON数据
 * @param jsonArray		数据集
 * @param keyArray		字段	
 * @returns 
 */
function findSeriesDataByKey(jsonArray,keyArray) {
	var data = new Array();
	for ( var key in keyArray) {
		var subData = new Array();
		for ( var obj in jsonArray) {
			if(jsonArray[obj][keyArray[key]]=='0'){
				subData.push('');
			}else{
				subData.push(jsonArray[obj][keyArray[key]]);
			}
		}
		data.push(subData);
	}
	return data;
}

/****
 * 获取echarts 带样式的示例图
 * @param jsonArray		数据集
 * @param keyArray		字段
 * @param ico			title样式
 * @returns 
 */
function buildTitle(jsonArray,ico) {
	var seriesArray = [];
	for(var i=0;i<=jsonArray.length-1;i++){
		seriesArray.push(
		{
		     name:jsonArray[i],
		     icon:ico
		     }
		);
	 }
	return seriesArray;
}

/*****
 * 获取显示需要的JSON数据(倒序)
 * @param jsonArray		数据集
 * @param keyArray		字段	
 * @returns 
 */
function findSeriesDataByKeyDesc(jsonArray,keyArray) {
	var data = new Array();
	for ( var key in keyArray) {
		var subData = new Array();
		for(var i=jsonArray.length-1;i>=0;i--){
			if(jsonArray[i][keyArray[key]]=='0'){
				subData.push('');
			}else{
				subData.push(jsonArray[i][keyArray[key]]);
			}
		 }
		data.push(subData);
	}
	return data;
}