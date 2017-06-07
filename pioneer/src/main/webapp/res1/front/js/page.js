//表单辅助类
(function() {
	if (window.page)
		return;

	var kernel = window["kernel@1.3"];
	var page = window.page = {};

	/**
	 * 发送异步请求数据。
	 * 
	 * @function page.send
	 * @param {Object}
	 *            param - 复合参数。
	 * @param {string}
	 *            param.url - 请求地址。
	 * @param {Object}
	 *            [param.data] - 以 POST 方式发送的请求数据对象。
	 * @param {string}
	 *            [param.dataType=json] - 返回数据的格式。
	 * @param {string}
	 *            [param.method=GET] - 强制指定请求方式。
	 * @returns {Promise}
	 */
	page.send = function(param) {
		var method = "GET";
		var data = param.data;
		if (kernel.lang.isValue(data)) {
			method = "POST";
		}

		return new kernel.util.Promise(function(resolve, reject) {
			$.ajax({
				url : param.url,
				method : param.method || method,
				data : data,
				cache : false,
				dataType : param.dataType || "json",
				success : resolve,
				onError : reject
			});
		});
	};

	/**
	 * 保存一个表单，一般用于新增或编辑。
	 * 
	 * @function page.saveForm
	 * @param {Object}
	 *            param - 复合对象。
	 * @param {string}
	 *            [param.id] - 表单 ID，页面中仅一个表单时可省略此项。
	 * @param {function}
	 *            [param.setOptions] - 设置表单提交的选项，当返回值为 false 时，表示取消操作，即不请求。
	 */
	var flag = 0;
	page.url = contextPath+"/pages/form/pc/listCurrent.jsp";
	page.saveForm = function(formId, processId, fid, checkType) {
		// if(typeof param == 'string'){
		// param = JSON.parse(param);
		// }
		if(formId=="tXmZgzzdj"){
			var flag = validateZgzzdj();//验证子表字段规则
			if(!flag){
				return;
			}
		}
		
		var form = fid ? "#" + fid : document.forms[0];
		var validate=1;//是否需要验证表单(1：需要,2：不需要)
		var shyj = "";
        // form += "&"+"checkType="+checkType;
		
		if(checkType!=null&&checkType!=''){
			if(checkType.substring(0,1)==1){// 编辑页面(edit)
				$('#fromEdit').remove();
				var input = document.createElement('input');  // 创建input节点
				input.setAttribute('type', 'hidden');  // 定义类型是文本输入
				input.setAttribute('value', '1'); 
				input.setAttribute('id', 'fromEdit'); 
				input.setAttribute('name', 'fromEdit'); 
				form.appendChild(input ); // 添加到form中显示
			}
			if(checkType.substring(0,1)==2){// 查看页面(view)不需要校验
				$('#fromEdit').remove();
				var input = document.createElement('input');  
				input.setAttribute('type', 'hidden'); 
				input.setAttribute('value', '2'); 
				input.setAttribute('id', 'fromEdit'); 
				input.setAttribute('name', 'fromEdit'); 
				form.appendChild(input ); 
				validate=2;
			}
			if(checkType.substring(1,2)==1){// 审核通过
				$("#shzt").remove();
				var input = document.createElement('input');  // 创建input节点
				input.setAttribute('type', 'hidden');  // 定义类型是文本输入
				input.setAttribute('value', '1'); 
				input.setAttribute('id', 'shzt'); 
				input.setAttribute('name', 'shzt'); 
				form.appendChild(input ); // 添加到form中显示
				shyj = $.trim($("#shyj2").val());
			}
			if(checkType.substring(1,2)==2){// 审核驳回
				$("#shzt").remove();
				var input = document.createElement('input');  // 创建input节点
				input.setAttribute('type', 'hidden');  // 定义类型是文本输入
				input.setAttribute('value', '2'); 
				input.setAttribute('id', 'shzt'); 
				input.setAttribute('name', 'shzt'); 
				form.appendChild(input ); // 添加到form中显示
				shyj = $.trim($("#shyj1").val());
			}
			$("#isCheck").remove();
			$(form).append('<input type="hidden" id="isCheck" name="isCheck" value="1">');
			//alert(checkType);
			$("#shyj").remove();
			$(form).append('<textarea style="display:none;" name="shyj" id="shyj" >' + shyj + '</textarea>');
		} 
		
		// console.log("form ", form);
		
		var opt = {
			success : function(data) {
				if (new RegExp("^(\\{|\\[)").test(data)) {
					data = kernel.json.parse(data);
					if (data.status == 1) {
						$(window.parent.document).find("#alertId").html(data.message);
						$(window.parent.document).find("#myModal4").modal('show');
						if(page.url){
							window.location.href = page.url;
						}
					}
					if(data.status == 5  || data.status == 3 || data.status == 6){
						//6 数据已被审核，5没权限 3出错
						$(window.parent.document).find("#alertId").html(data.message);
						$(window.parent.document).find("#myModal4").modal('show');
					}			
				} else {
					document.body.innerHTML = data;
				}
			},
			onSubmit : function() {
				
				if(validate==2){
					
					return true;
				}
				
				var v = false;
				// 执行验证
				validateForm(formId, processId, function(b){
					v = b;
					if(b){
						//console.log("warnInfo ", warnInfo);
						// 插入警告信息
						if(warnInfo){
							for(var i = 0; i < warnInfo.length; i++){
								var info = warnInfo[i];
								var ruleId = info.ruleId;
								var warnExplain = $("#" + ruleId);
								//console.log("warnExplain ", warnExplain);
								
								if(!$.trim(warnExplain.val())){
									// 第一次不显示红色背景
									if(flag > 0){
										warnExplain.addClass("input-has-warn");
									}
									v = false;
								}
								
								info.warnExplain = warnExplain.val();
							}
							
							
							// 将解释信息插入表单中
							// formWarnMsg 格式：[{ruleId: 规则id,
							// warnMsg:警告信息,
							// warnExplain: 解释信息}, {...}]
							// console.log("JSON.stringify(warnInfo)",
							// JSON.stringify(warnInfo))
							
							$("#formWarnMsg").remove();
							$(form).append('<textarea style="display:none;" name="formWarnMsg" id="formWarnMsg" >' + JSON.stringify(warnInfo) + '</textarea>')
						}
					}
				});
				flag++;
				if(!v){
					showErrMsg();
				}
				
				return v;
				//return false;
			}
		}
		
		$(form).form("submit", opt);
	};

	/**
	 * 加载／填充一个表单。
	 * 
	 * @function page.loadForm
	 * @param {Object}
	 *            param - 复合对象。
	 * @param {string}
	 *            [param.id] - 表单 ID，页面中仅一个表单时可省略此项。
	 * @param {string}
	 *            [param.url] - 数据请求地址。
	 * @param {Object}
	 *            [param.data] - 填充数据对象。
	 * @param {Object}
	 *            [param.filter] - 过滤填充数据。
	 * @returns {Promise}
	 */
	page.loadForm = function(param) {
		param = param || {};
		var form = param.id ? "#" + param.id : document.forms[0];

		var promise;
		if (param.data) {
			promise = kernel.util.Promise.resolve(param.data);
		} else {
			promise = page.send({
				url : param.url
			});
		}
		return promise.then(function(data) {
			var arr = kernel.lang.objectToArray(data);
			arr.sort(function(a, b) {
				if (kernel.lang.isString(a.value)
						&& kernel.lang.isString(b.value)) {
					if (a.value.length > b.value.length) {
						return 1;
					} else if (a.value.length < b.value.length) {
						return -1;
					} else if (a.value > b.value) {
						return 1;
					} else if (a.value < b.value) {
						return -1;
					} else {
						return 0;
					}
				}
				return 0;
			});
			data = kernel.lang.arrayToObject(arr);
			if (param.filter) {
				data = param.filter(data);
			}
			return new kernel.util.Promise(function(resolve, reject) {
				$(form).form({
					onLoadSuccess : resolve,
					onLoadError : reject
				});
				$(form).form("load", data);
			});
		});
	};

	/**
	 * 重置一个表单。
	 * 
	 * @function page.resetForm
	 * @param {Object}
	 *            param - 复合对象。
	 * @param {string}
	 *            [param.id] - 表单 ID，页面中仅一个表单时可省略此项。
	 */
	page.resetForm = function(param, ids, callback) {
		param = param || {};
		var form = param.id ? "#" + param.id : document.forms[0];
		var values = [];
		if(ids){
			for(var i = 0; i < ids.length; i++){
				values.push($("#" + ids[i]).val());
			}
		}
		
		$(form).form("reset");
		
		if(values.length){
			for(var i = 0; i < ids.length; i++){
				values.push($("#" + ids[i]).val(values[i]));
			}
		}
		
		if(callback){
			callback();
		}
	};

	/**
	 * 加载／填充（表单）预览数据。
	 * 
	 * @function page.loadView
	 * @param {Object}
	 *            param - 复合参数。
	 * @param {string}
	 *            [param.url] - 数据语法地址
	 * @param {Object}
	 *            [param.data] - 填充的数据对象。
	 * @param {Object}
	 *            [param.filter] - 过滤填充数据。
	 * @returns {Promise}
	 */
	page.loadView = function(param) {
		param = param || {};
		var promise;
		if (param.data) {
			promise = kernel.util.Promise.resolve(param.data);
		} else {
			promise = page.send({
				url : param.url
			});
		}
		return promise.then(function(data) {
			if (param.filter) {
				data = param.filter(data);
			}

			var promise = kernel.util.Promise.resolve(null);
			kernel.lang.forEach(data, function(v, k) {
				var span = document.getElementById(k);
				if (!span) {
					span = document.getElementsByName(k)[0];
				}
				if (span) {
					promise = promise.then(function() {
						return writeToSpan(span, k, v, data);
					});
				}
			}, false);
			return promise;
		});

	};
	
	function writeToSpan(span, id, value, data) {
		var opts = span.getAttribute("data-options");
		if (opts) {
			opts = eval("({" + opts + "})");
		}
		opts = kernel.lang.extend({
			escapeXML : true
		}, opts);

		if (span.tagName === "IMG") {
			span.src = kernel.path.join(opts.base, value);
			return;
		}

		if (opts.view === 'list') {
			value = kernel.json.parse(value);
			var div = kernel.html.createElement("DIV", {
				className : "loadpanel"
			});

			var ul = kernel.html.createElement("UL", {
				className : "fileList"
			}, null, {
				parentNode : div
			});

			kernel.lang.forEach(value, function(a) {
				var li = kernel.html.createElement("LI", {}, null, {
					parentNode : ul
				});

				var anchor = kernel.html.createElement("A", {
					innerHTML : kernel.xml.escapeXML(a.filename)
				}, {}, {
					parentNode : li
				});

				var url = page.upload.getDownloadURL(a);
				if (url)
					anchor.href = url;
			});

			span.parentNode.appendChild(div);
			return;

		} else if (opts.view) {
			value = kernel.json.parse(value);

			var div = kernel.html.createElement("DIV", {
				className : "loadpanel",
				style : {
					border : "1px solid gray",
					height : "130px",
					overflow : "auto"
				}
			});

			var ul = kernel.html.createElement("UL", {
				className : "imgList"
			}, null, {
				parentNode : div
			});

			kernel.lang.forEach(value, function(a) {
				var url = page.upload.getViewURL(a.path);
				var li = kernel.html.createElement("LI", {}, null, {
					parentNode : ul
				});

				var a = kernel.html.createElement("A", {
					title : "双击可打开图片。"
				}, {
					ondblclick : function() {
						page.dialog({
							title : "图片预览",
							url : url,
							width : 1024,
							height : 768
						});
					}
				}, {
					parentNode : li
				});

				var img = kernel.html.createElement("IMG", {
					src : url
				}, null, {
					parentNode : a
				});

			});

			span.parentNode.appendChild(div);
			return;
		} else if (opts.map) {
			value = opts.map[value];
		} else if (opts.dict && window.dict) {
			// 已废弃！请使用 opts.map 替换此方式 opts.dict
			value = dict[opts.dict][value];
		}

		if (opts.formatURL) {
			opts.href = opts.formatURL(value);
		}

		if (opts.href) {
			span = kernel.html.createElement("A", {
				href : opts.href
			}, null, {
				parentNode : span
			});
		}

		if (opts.formatter) {
			value = opts.formatter(value, data);
		}

		if (!kernel.lang.isValue(value))
			return;

		if (opts.escapeXML) {
			span.innerHTML = kernel.xml.escapeXML(value);
		} else {
			span.innerHTML = value;
		}
	}
})();

var fileCodeName = null;
// 初始编辑和添加页面 验证信息窗口
function initValidateInfo(fromId, processId){
	var off = true;
	  $("#form_check_turn").click(function(){
		  if(off){
			  $("#body_turn").removeClass("body_bottom_tuonoff");
			  $("#body_turn").addClass("body_bottom_tuonon");
			  off = false;
		  }else{
			  $("#body_turn").removeClass("body_bottom_tuonon");
			  $("#body_turn").addClass("body_bottom_tuonoff");
			  off = true;
		  }
	  });
	  
	var url = contextPath + "/ruleEngin/getFormFileName";
	$.get(url, {formId : fromId}, function(data){
		fileCodeName = data;
	});
	
	/*
	 * // alert(processId) // 只有采集员操才显示表单按钮，form_btns if(processId){ var url =
	 * contextPath + "/ruleEngin/isReporter"; $.get(url, {processId :
	 * processId}, function(data){ if(data == "0"){ $("#form_btns").hide();
	 * $("#addOneRow").hide(); $("#delOneRow").hide(); $("#formHead").hide(); }
	 * }); }
	 */
}

var warnInfo;// 保存警告信息 [{ruleId: xx, warnMsg: xx, warn_explain: xx}]
// var oldWrnInfo;
var trids = null;
function validateForm(formId, processId, callback){
	 // console.log("formId", formId);
	 // console.log("processId", processId);
	 if(warnInfo){
		 // 克隆
		 // oldWrnInfo = JSON.parse(JSON.stringify(warnInfo));
		 for(var i = 0; i < warnInfo.length; i++){
			var info = warnInfo[i];
			var ruleId = info.ruleId;
			var warnExplain = $("#" + ruleId);
			if(!$.trim(warnExplain.val())){
				warnExplain.removeClass("input-has-warn");
			}
		 }
	  }
	  warnInfo = [];
	  var rowDatas = [];// 如果存在多行，数组中有多个data
	  if(typeof(trids) != "undefined" && trids && trids.length > 0){
		  for(var i = 0; i < trids.length; i++){
			  var rowData = {};
			  var a = "#" + trids[i] + " .form_input";
		 	  var inputs = $(a);
		 	  inputs.each(function(){
		 		  // 重置输入框样式
				  if(this.type == 'checkbox'){// 复选框 样式 form_checkbox  
					  this.className = "form_input form-control form_checkbox";  
				  }else{
					  this.className = "form_input form-control"; 
				  }
				  var fieldName = $(this).attr("id");
				  var value = $(this).val();
				  if(value){
					  value = encodeURIComponent(value);
				  }
				  rowData[fieldName] = value;
			  });
			  rowDatas.push(rowData);
		  }
	  }else{
		 // console.log("111", $(".form_input"));
		  var rowData = {};
		  $(".form_input").each(function(){
			  // 重置输入框样式
			  if(this.type == 'checkbox'){// 复选框 样式 form_checkbox  
				  this.className = "form_input form-control form_checkbox";  
			  }else{
				  this.className = "form_input form-control"; 
			  }
			  var fieldName = $(this).attr("id");
			  var value = $(this).val();
			  if(value){
				  value = encodeURIComponent(value);
			  }
			  rowData[fieldName] = value;
		  });
		  
		  rowDatas.push(rowData);
	  }
	  
	  var url = contextPath + "/ruleEngin/validateForm";
	  var params = "formId=" + formId + "&processId=" + processId + "&datas=" + JSON.stringify(rowDatas);
	  var hasErr = false;// true 存在错误
	  $.ajax({
		   type: "POST",
		   url: url,
		   data: params,
		   async: false,
		   success: function(msgs){
			   //console.log("msgs", msgs);
			   var showMsg = "";
			   var index = 0;
			   
			   var err_form = msgs.err_form;
			   var err_in_form = msgs.err_in_form;
			   if(err_form){// 单值规则
				   hasErr = true;
				   if(err_form.length == 1){
					   var msg = err_form[0];
					   // form_input error
					   for(var key in msg){
						   index++;
						   $("#" + key).addClass("error");
						   showMsg += '<p class="text-danger" onclick="locationErr(\'' + key + '\', this)">' + index + "、" + fileCodeName[key] + "，" + msg[key] + "</p>";
					   }
				   }else{
					   for(var i = 0; i < err_form.length; i++){
						   var msg = err_form[i];
						   // form_input error
						   var rowNum = i + 1;
						   for(var key in msg){
							   index++;
							   var _id = trids[i] + " #" + key;
							   $("#" +_id).addClass("error");
							   showMsg += '<p class="text-danger" onclick="locationErr(\'' + _id + '\', this)">' + index + "、第" + rowNum + "行，"  + fileCodeName[key] + "，" + msg[key] + "</p>";
						   }
					   }
				   }
			   }else if(err_in_form){// 表内规则
				   for(var i = 0; i < err_in_form.length; i++){
					   var row = err_in_form[i];
					   // form_input error
					   var rownum = row.rownum;
					   var msgs = row.msgs;
					   
					   var rowId = "";
					   if(trids &&　trids.length > 0){
						   rowId = trids[i]; // trids 里面取 id;
						   $(rowId).addClass("error");
					   }
					   for(var j = 0; j < msgs.length; j++){
						   index++;
						   var msg = msgs[j];
						   var errMsg = msg.err;
						   var ruleLevel = msg.ruleLevel;
						   var ruleId = msg.ruleId;
						   
						   var className = "text-danger";
						   if(ruleLevel == "警告"){
							   className = "has-warning";
						   }else{
							   hasErr = true;
						   }
						   
						   showMsg += '<p class="' + className + '" onclick="locationErr(\'' + rowId + '\', this)">' + index + "、";
						   
						   var _errMsg = "";
						   if(err_in_form.length > 1){
							   _errMsg = "第" + rownum +　"行，";
						   }
						   
						   _errMsg += errMsg;
						   
						   showMsg += _errMsg + "</p>";
						   
						   if(ruleLevel == "警告"){
							   var rv = $("#" + ruleId).val();
							   if(rv){
								   showMsg += '<p><input type="text" id=' +　ruleId　 +　' value="' + rv + '" class="form-control" name="content" placeholder="请输入解释信息"></p>';
							   }else{
								   // 将规则id作为input的id
								   showMsg += '<p><input type="text" id=' +　ruleId　 +　' class="form-control" name="content" placeholder="请输入解释信息"></p>';
							   }
						   }
						   
						   var info = {
							   ruleId: ruleId,
							   warnMsg: _errMsg,
							   warnExplain: '' // 提交时从input里获取
						   }
						   
						   // 警告信息
						   warnInfo.push(info);
					   }
				   }
			   }else{
				   
			   }
			   
			   var nomsg = '<div class="nomsg"><span class="ico icon-coffee"></span>暂无验证信息！</div>';
			   if(showMsg){
				   $("#form_check_msg").html(showMsg);
				   $("#form_check_msg").show();
			   }else{
				   $("#form_check_msg").html(nomsg);
			   }
			   
			   if(processId){
				   loadFormWarnMsg(processId); 
			   }
			   
			   if(callback){
				   if(hasErr){// 存在异常
					   callback(false);
				   }else{
					   callback(true);
				   }
			   }
		   }
		});
}

// 定位错误，/窗口移动到错误输入框位置，并进行标识
function locationErr(nodeid, field){
	$(".form_input").removeClass("has-error");
	var obj = $("#" + nodeid);
	//alert($("#" + nodeid).offset().top - 200)
	if(obj && obj[0]){
		obj.addClass("has-error");
		var webPage = $(".body_main");
		if(webPage.length > 0){
			var t = obj.offset().top;//取到的值不是与文档的距离，而是和上方可视范围的距离，需要特殊处理
		    t = webPage.scrollTop() + t;//已滚动的值 + 据页面上方的值
			webPage.animate({scrollTop: t - 200}, 1000);
		}else{//手机滚动
			$("html,body").animate({scrollTop: obj.offset().top - 200}, 1000);
		}
	}
}

// 加载警告信息，填报员操作（修改数据时）加载的信息
function loadFormWarnMsg(processId){
	// console.log("processId ", processId);
	var url = contextPath + "/tFormWarnMsg/listMsgs";
	$.post(url, {processId : processId}, function(data){
		if(data && data != "null"){
			for(var i = 0; i < data.length; i++){
				var warnExplain = data[i].warnExplain;
				var ruleId = data[i].ruleId;
				$("#" + ruleId).val(warnExplain);
			}
		}
	});
}

// 唯一性验证, false 发生异常； true 验证通过
function validateUnique(fieldId, msg){
	uniqueArr = [];
	if(!fieldId){
		return;
	}
	
	 var obj = {};
	 if(trids && trids.length > 0){
		  for(var i = 0; i < trids.length; i++){
			  var a = "#" + trids[i] + " #" + fieldId;
		 	  var pt = $(a);
		 	  var val = pt.val();
		 	  pt.removeClass("has-error");
		 	 
		 	  if(obj[val]){
		 		 setUniqueArr(obj[val]);
		 		 setUniqueArr(trids[i]);
		 	  }else{
		 		 obj[val] = trids[i]; 
		 	  }
		  }
	  }
	 
	 if(uniqueArr.length > 0 ){
		 //console.log("uniqueArr  ", uniqueArr);
		   for(var j = 0; j < uniqueArr.length; j++){
		       var err = "#" + uniqueArr[j] + " #" + fieldId;
		       $(err).addClass("has-error");
		   }
		 
		   if(!msg){
			   msg = "输入项重复";
		   }
		   
		   var showMsg = '<p class="text-danger" >1、' + msg + '</p>';
		   
		   $("#form_check_msg").html(showMsg);
		   $("#form_check_msg").show();
		   
		   return false;
		 
	 }
	 
	 return true;
}

// 唯一值的数组
var uniqueArr = [];
function setUniqueArr(data){ 
	if(uniqueArr.length == 0){
		uniqueArr.push(data);
		return;
	}
	
	var b = true;
	for(var i = 0; i <　uniqueArr.length; i++){
		if(uniqueArr[i] == data){
			b = false;
		}
	}
	
	if(b){
		uniqueArr.push(data);
	}
}

//根据窗口高度，自动设置容器高度
//nodeid 要设置的节点id,
//mheigth 要减去的高度,默认250
function setPaneSize(nodeid, mheigth){
	if(!mheigth){
		mheigth = 220;
	}
	var h = $(window).height() - mheigth;
	$("#" + nodeid).height(h);
}

