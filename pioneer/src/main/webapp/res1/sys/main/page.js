/**
 * @file 在子页面中调用。
 *       <p>
 *       此框架依赖以下 JS 库：
 *       </p>
 *       <ul>
 *       <li>jquery-easyui-1.4.3</li>
 *       <li>kernel-v1.3</li>
 *       <li>AjaxUpload</li>
 *       </ul>
 */
(function() {
	if (window.page)
		return;

	var $ = jQuery;
	var kernel = window["kernel@1.3"];

	var URN = "urn:thtf:rota:main";
	var ALERT_TITLE = "操作提示";
	var ALERT_TYPES = [ "log", "info", "warning", "error" ];
	var ALERT_TEXTS = [ "", "操作成功！", "", "操作失败！" ];
	var RULE_PHONE = /^[+]{0,1}(\d){1,4}[ ]{0,1}([-]{0,1}((\d)|[ ]){1,12})+$/;
	var RULE_MOBILE = /^1[3|4|5|8][0-9]\d{4,8}$/;

	/**
	 * <p>
	 * 子页面的全局控制对象。
	 * </p>
	 * 
	 * <h5>成员列表</h5>
	 * <blockquote>
	 * <h6>窗口相关方法：</h6>
	 * <ul>
	 * <li>{@link page.panel}</li>
	 * <li>{@link page.dialog}</li>
	 * <li>{@link page.close}</li>
	 * </ul>
	 * 
	 * <h6>提示框相关方法：</h6>
	 * <ul>
	 * <li>{@link page.confirm}</li>
	 * <li>{@link page.show}</li>
	 * <li>{@link page.info}</li>
	 * <li>{@link page.warn}</li>
	 * <li>{@link page.error}</li>
	 * <li>{@link page.alert}</li>
	 * <li>{@link page.progress}/{@link page~progress}</li>
	 * </ul>
	 * 
	 * <h6>数据网格相关方法：</h6>
	 * <ul>
	 * <li>{@link page.newDataGrid}</li>
	 * <li>{@link page.editDataGrid}</li>
	 * <li>{@link page.delDataGrid}</li>
	 * <li>{@link page.loadDataGrid}</li>
	 * <li>{@link page.getSelectedRows}</li>
	 * </ul>
	 * 
	 * <h6>表单相关方法：</h6>
	 * <ul>
	 * <li>{@link page.loadForm}</li>
	 * <li>{@link page.saveForm}</li>
	 * <li>{@link page.resetForm}</li>
	 * <li>{@link page.loadView}</li>
	 * </ul>
	 * 
	 * <h6>控件相关方法：</h6>
	 * <ul>
	 * <li>{@link page.loadComboTree}</li>
	 * <li>{@link page.Cascade}</li>
	 * </ul>
	 * 
	 * <h6>事件／回调方法：</h6>
	 * <ul>
	 * <li>{@link page.onLoad}</li>
	 * <li>{@link page.onError}</li>
	 * <li>{@link page.onMessage}</li>
	 * <li>{@link page.onRefresh}</li>
	 * </ul>
	 * 
	 * <h6>其它：</h6>
	 * <ul>
	 * <li>{@link page.send} - 异步请求</li>
	 * <li>{@link page.external:upload page.upload} - 图片上传操作对象</li>
	 * <li>{@link page.external:opener page.opener} - 父窗口控制对象</li>
	 * </ul>
	 * </blockquote>
	 * 
	 * <h5>注意事项</h5>
	 * <ol>
	 * <li>子页面暂不支持独立使用。</li>
	 * </ol>
	 * 
	 * 
	 * @namespace page
	 */
	var page = window.page = {};

	var mainPromise = null;
	var req = null;
	var info = null;
	var searchData = null;

	$.extend($.fn.validatebox.defaults.rules, {
		equals : {
			validator : function(value, param) {
				return value == $(param[0]).val();
			},
			message : '密码不一致！'
		},
		mobile : {
			validator : function(value, param) {
				return RULE_MOBILE.test(value) && value.length == 11;
			},
			message : '手机号码不正确'
		},
		phone : {
			validator : function(value, param) {
				return RULE_PHONE.test(value);
			},
			message : '座机号码不正确'
		},
		numbers : {
			validator : function(value, param) {
				if (parseInt(value) != value) {
					return false;
				} else {
					if (isNaN(value)) {
						return false;
					} else if (value.indexOf('.') != -1) {
						return false;
					} else if (parseInt(value) < 0) {
						return false;
					} else {
						return true;
					}
				}
			},
			message : '请填写整数数字！'
		},
		compareDate : {
			validator : function(value, param) {
				return (function(startdate, enddate) {
					var starttime = new Date(startdate.replace(/-/g, "/"));
					var lktime = new Date(enddate.replace(/-/g, "/"));
					var starttimes = starttime.getTime();
					var lktimes = lktime.getTime();
					if (starttimes >= lktimes) {
						return false;
					} else
						return true;
				})($(param[0]).datetimebox('getValue'), value); // 注意easyui
				// 时间控制获取值的方式
			},
			message : "开始日期不能大于结束日期！"
		}
	});

	$().ready(function() {
		req = new kernel.message.Requestor();
		req.timeout = 1000 * 3;
		mainPromise = req.open(window.parent, URN).then(function() {
			req.timeout = 0;
			return req.send({
				name : ".init",
				param : null
			}).then(function(value) {
				info = value;
				init();
				uploadInit("uploadBtn");
				uploadInit("uploadBtn2");//【新增GIS专题】有两处图片上传
			}).then(function() {
				try {
					page.onLoad();
				} catch (e) {
					console.error(e);
					page.onError(e.message);
				}
			});
		}, function(e) {
			var msg = "初始化超时！";
			if (e) {
				msg = e.message || e;
			} else if (window.parent === window) {
				msg = "此页面不可独立访问！";
			}
			page.onError(msg);
			throw msg;
		});

		kernel.message.bind("refresh", function(evt) {
			page.onRefresh(evt.data);
		});

		kernel.message.bind("message", function(evt) {
			page.onMessage(evt.data);
		});

	});

	$(window).resize(function() {
		$(".easyui-datagrid").datagrid("resize");
		$(".easyui-treegrid").treegrid("resize");
	});

	function init() {
		if (!info.attributes)
			return;

		var paths = info.attributes.paths;
		if (paths && paths.length > 0) {
			var pathNode = document.getElementById("location");
			if (pathNode && pathNode.tagName === "DIV") {
				paths = kernel.lang.map(paths, function(text) {
					return "<span>" + kernel.xml.escapeXML(text) + "</span>";
				});
				pathNode.innerHTML = paths.join("&nbsp;&gt;&nbsp;");
			}
		}

		searchData = info.attributes.search;

		var menus = info.attributes.menus;
		if (menus && menus.length > 0) {
			window.menus = menus;
		}
	}

	/**
	 * 设置服务器的基本路径。
	 * 
	 * @member {string} page.base
	 * @private
	 * @default /
	 */
	page.base = "/";

	/**
	 * 打开一个对话框。
	 * 
	 * @function page.dialog
	 * @see main.dialog
	 * @param {Object}
	 *            param - 复合参数。
	 * @param {string}
	 *            param.url - 页面地址。
	 * @param {string}
	 *            param.title - 对话框标题。
	 * @param {number}
	 *            [param.width] - 对话框宽度。
	 * @param {number}
	 *            [param.height] - 对话框高度。
	 * @param {Object}
	 *            [param.attributes] - 自定义携带信息。
	 * @returns {Promise}
	 */
	page.dialog = function(param) {
		return exec("dialog", param);
	};

	/**
	 * 打开／定位一个选项卡面板。
	 * 
	 * @function page.panel
	 * @see main.panel
	 * @param {Object}
	 *            param - 复合参数。
	 * @param {string}
	 *            param.url - 页面地址。
	 * @param {string}
	 *            param.title - 选项卡标题。
	 * @param {Object}
	 *            [param.attributes] - 自定义携带信息。
	 * @returns {Promise}
	 */
	page.panel = function(param) {
		return exec("panel", param);
	};

	/**
	 * 关闭当前窗口。
	 * 
	 * @function page.close
	 * @returns {Promise}
	 */
	page.close = function() {
		return exec("close", info.id);
	};

	/**
	 * 在右下角弹出一个系统消息窗口。
	 * 
	 * @function page.show
	 * @param {string}
	 *            html - 消息内容。
	 */
	page.show = function(html) {
		return exec("show", {
			title : "系统消息",
			html : html
		});
	};

	/**
	 * 打开一个提示框。
	 * 
	 * @function page.alert
	 * @param {Object}
	 *            param - 复合参数。
	 * @param {number}
	 *            param.status - 消息状态。<br />
	 *            可能值：1（操作成功），2（操作警告），3（操作失败）。
	 * @param {string}
	 *            param.message - 消息内容。
	 * @returns {Promise}
	 */
	page.alert = function(param) {
		var i = param.status;
		return exec("alert", {
			title : ALERT_TITLE,
			type : ALERT_TYPES[i],
			html : param.message || ALERT_TEXTS[i]
		});
	};

	/**
	 * 打开一个信息框。
	 * 
	 * @function page.info
	 * @param {string}
	 *            html - 信息内容。
	 * @returns {Promise}
	 */
	page.info = function(html) {
		return exec("alert", {
			title : ALERT_TITLE,
			type : ALERT_TYPES[1],
			html : html
		});
	};

	/**
	 * 打开一个警告框。
	 * 
	 * @function page.warn
	 * @param {string}
	 *            html - 警告内容。
	 * @returns {Promise}
	 */
	page.warn = function(html) {
		return exec("alert", {
			title : ALERT_TITLE,
			type : ALERT_TYPES[2],
			html : html
		});
	};

	/**
	 * 打开一个错误框。
	 * 
	 * @function page.error
	 * @param {string}
	 *            html - 错误内容。
	 * @returns {Promise}
	 */
	page.error = function() {
		return exec("alert", {
			title : ALERT_TITLE,
			type : ALERT_TYPES[3],
			html : html
		});
	};

	/**
	 * 打开一个确认框。
	 * 
	 * @function page.confirm
	 * @param {string}
	 *            html - 确认内容。
	 * @returns {Promise}
	 */
	page.confirm = function(html) {
		return exec("confirm", {
			title : ALERT_TITLE,
			html : html
		});
	};

	/**
	 * 进度框的控制对象。
	 * 
	 * @typedef {Object} page~progress
	 * @property {function} close - 关闭进度框（会延时执行）。
	 * @property {function} setValue - 设置进度，取值范围：0~100。
	 */
	/**
	 * 
	 * 打开一个进度框。
	 * 
	 * @function page.progress
	 * @param {Object}
	 *            param - 复合参数。
	 * @param {string}
	 *            [param.title] - 进度框标题。
	 * @returns {page~progress}
	 */
	page.progress = function(param) {
		param = param || {};
		$.messager.progress({
			interval : 0,
			title : param.title || "请稍等..."
		});
		return {
			setValue : function(value) {
				$.messager.progress("bar").progressbar("setValue", value);
			},
            setV : function() {
				$.messager.progress("bar").progressbar("setValue", page.progress.value);
				if(page.progress.value>=100){
					page.progress.value=0;
				}
				else{
					page.progress.value += Math.floor(Math.random() * 10);
				}
			},
			xhxs : function(){
				page.progress.dsq = window.setInterval(this.setV, 500);
				return page.progress.dsq;
			},
			close : function(callback) {
				setTimeout(function() {
					if(page.progress.dsq){
						clearInterval(page.progress.dsq);
					}
					$.messager.progress("close");
					page.progress.value=0;
					callback && callback();
				}, 500);
			}
		};
	};
	page.progress.value=0;
	
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
	 * 加载一个数据网格。
	 * 
	 * @function page.loadDataGrid
	 * @param {Object}
	 *            param - 复合对象。
	 * @param {string}
	 *            [param.id=datagrid] - 装载数据网格的表格 ID。
	 * @param {function}
	 *            [param.setOptions] - 设置数据网格的选项，当返回值为 false 时，表示取消操作，即不请求。
	 */
	page.loadDataGrid = function(param) {
		param = param || {};
		var table = $('#' + (param.id || "datagrid"));
		var isTree = table.hasClass("easyui-treegrid");
		var boo = true;
		
		var opt;
		if (isTree) {
			opt = table.treegrid('options');
			opt.pagination = false;
			opt.singleSelect = true;
		} else {
			opt = table.datagrid('options');
			opt.striped = true;
			//如果自己没有手动设置单选，则默认为多选
			if(!opt.singleSelect){
				opt.singleSelect = false;
			}
			opt.ctrlSelect = true;
		}
		
		kernel.lang.forEach(searchData, function(value, id) {
			var input = $("#" + id);
			var node = input[0];
			if (!node)
				return;
			input.textbox("setValue", value);
			opt.queryParams[node.name || id] = value;
		}, false);

		if (param.setOptions) {
			boo = !(param.setOptions(opt) === false);
			if (boo && opt.pagination && !isTree) {
				table.datagrid('getPager').pagination({
					pageNumber : 1
				});
			}
		}

		if (boo) {
			if (isTree) {
				table.treegrid({
					loadFilter : treeGridFilter
				});
			} else {
				table.datagrid({
					loadFilter : function(data) {
						initColumnes(opt.columns[0]);
						return data;
					}
				});
			}
		}
	};

	function initColumnes(cols) {
		kernel.lang.forEach(cols, function(col) {
			if (col.formatter)
				return;

			col.formatter = function(v) {
				try {
					if (/^(\[|\{).*(\]|\})$/.test(v))
						v = kernel.json.parse(v);
				} catch (e) {
				}
				if (kernel.lang.isArray(v)) {
					var arr = [];
					kernel.lang.forEach(v, function(o) {
						var url = page.upload.getDownloadURL(o);
						if (url)
							arr.push(o.filename.link(url));
						else
							arr.push(o.filename);
					});
					return arr.join('<br />');
				} else if (kernel.lang.isString(v)) {
					return kernel.xml.escapeXML(v);
				}
				return v;
			};
		});
	}

	/**
	 * 打开新增页面。
	 * 
	 * @function page.newDataGrid
	 * @param {Object}
	 *            param - 复合参数。
	 * @param {string}
	 *            param.url - 页面地址。
	 * @param {string}
	 *            param.title - 窗口标题。
	 * @param {number}
	 *            [param.width=400] - 窗口宽度。
	 * @param {number}
	 *            [param.height=300] - 窗口高度。
	 */
	page.newDataGrid = function(param) {
		page.dialog(param);
	};

	/**
	 * 打开编辑页面。
	 * 
	 * @function page.editDataGrid
	 * @param {Object}
	 *            param - 复合参数。
	 * @param {function}
	 *            param.formatURL - 返回根据参数格式化后的地址。
	 * @param {string}
	 *            param.title - 窗口标题。
	 * @param {string}
	 *            [param.id=datagrid] - 装载数据网格的表格 ID。
	 * @param {number}
	 *            [param.width=400] - 窗口宽度。
	 * @param {number}
	 *            [param.height=300] - 窗口高度。
	 */
	page.editDataGrid = function(param) {
		var data = page.getSelectedRows({
			id : param.id,
			size : 1
		})[0];
		if (data) {
			var url = param.formatURL(data);
			page.dialog({
				title : param.title,
				width : param.width,
				height : param.height,
				url : url
			});
		}
	};


	/**
	 * 批量删除数据记录。
	 * 
	 * @function page.delDataGrid
	 * @param {Object}
	 *            param - 复合参数。
	 * @param {function}
	 *            param.formatURL - 返回根据参数格式化后的地址。
	 * @param {function}
	 *            [param.formatPostData] - 返回根据参数格式化请求数据对象，指定此方法则默认以POST方式请求。
	 * @param {string}
	 *            [param.id=datagrid] - 装载数据网格的表格 ID。
	 * @param {string}
	 *            [param.method=GET] - 强制指定请求方式。
	 */
	page.delDataGrid = function(param) {
		deleteData(page.getSelectedRows({
			id : param.id,
			min : 1
		}), param);
	};
	page.delTreeGrid = function(param) { //地区管理页面使用  或者其他treeGrid页面删除后刷新页面使用
		deleteTreeData(page.getSelectedRows({
			id : param.id,
			min : 1
		}), param);
	};
	
	page.updateOpenDataGrid = function(param) {
		updateOpenData(page.getSelectedRows({
			id : param.id,
			min : 1
		}), param);
	};
	page.updateStopDataGrid = function(param) {
		updateStopData(page.getSelectedRows({
			id : param.id,
			min : 1
		}), param);
	};
	/**
	 * 撤销发布内容。
	 *
	 * @function page.passDataGrid
	 * @param {Object}
	 *            param - 复合参数。
	 * @param {function}
	 *            param.formatURL - 返回根据参数格式化后的地址。
	 * @param {function}
	 *            [param.formatPostData] - 返回根据参数格式化请求数据对象，指定此方法则默认以POST方式请求。
	 * @param {string}
	 *            [param.id=datagrid] - 装载数据网格的表格 ID。
	 * @param {string}
	 *            [param.method=GET] - 强制指定请求方式。
	 */
	page.passDataGrid = function(param) {
		passData(page.getSelectedRows({
			id : param.id,
			size : 1
		}), param);

	};
	/**
	 * 获取数据网格的选择行，一般用于批量删除或编辑。
	 * 
	 * <p>
	 * 如果不满足条件，则返回空数组，并有相关操作警告。
	 * </p>
	 * 
	 * @function page.getSelectedRows
	 * @param {Object}
	 *            param - 复合对象。
	 * @param {string}
	 *            [param.id=datagrid] - 装载数据网格的表格 ID。
	 * @param {number}
	 *            [param.size] - 返回指定记录数。
	 * @param {number}
	 *            [param.min] - 返回最小记录数。
	 * @param {number}
	 *            [param.max] - 返回最大记录数。
	 * @returns {Array}
	 */
	page.getSelectedRows = function(param) {
		param = param || {};
		var table = $('#' + (param.id || "datagrid"));
		var isTree = table.hasClass("easyui-treegrid");
		var arr = table[isTree ? "treegrid" : "datagrid"]("getSelections");
		return selections(arr, param);
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
	page.saveForm = function(param) {
		param = param || {};

		if (!page.upload.check()) {
			page.warn("请上传图片！");
			return;
		}

		var prog = null;

		var form = param.id ? "#" + param.id : document.forms[0];

		var opt = {
			success : function(data) {
				if (new RegExp("^(\\{|\\[)").test(data)) {
					new kernel.util.Promise(function(resolve) {
						if (prog) {
							prog.setValue(100);
							prog.close(resolve);
						} else {
							resolve();
						}
					}).then(function() {
						data = kernel.json.parse(data);
						page.alert(data).then(function() {
							if (data.status === 1) {
								page.opener.refresh();
								page.close();
							}
						});
					});
				} else {
					document.body.innerHTML = data;
				}
			},
			onSubmit : function() {
				var isValid = $(this).form('validate');
				if (isValid) {
					prog = page.progress();
					prog.setValue(50);
				}
				return isValid;
			}
		};

		var boo = true;
		if (param.setOptions) {
			boo = !(param.setOptions(opt) === false);
		}

		if (boo) {
			$(form).form("submit", opt);
		}
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
	 * 加载一个树型下拉框。
	 * 
	 * @function page.loadComboTree
	 * @param {Object}
	 *            param - 复合对象。
	 * @param {string}
	 *            [param.id=combotree] - 选择框 ID。
	 * @param {string}
	 *            [param.url] - 数据请求地址。
	 * @param {Object}
	 *            [param.data] - 填充数据对象。
	 * @param {Object}
	 *            [param.filter] - 过滤填充数据。
	 * @returns {Promise}
	 */
	page.loadComboTree = function(param) {
		param = param || {};
		var select = $('#' + (param.id || "combotree"));

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
			return new kernel.util.Promise(function(resolve, reject) {
				select.combotree({
					onLoadSuccess : resolve,
					onLoadError : reject
				});
				select.combotree("loadData", data);
			});
		});
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

	/**
	 * 父窗口的操作对象。
	 * 
	 * @external page.opener
	 */
	page.opener = {

		/**
		 * 发送数据命令。
		 * 
		 * @function page.external:opener.post
		 * @see main.post
		 * @see page.onMessage
		 * @param {*}
		 *            data - 数据对象。
		 * @returns {Promise}
		 */
		post : function(data) {
			return exec("post", {
				id : info.pid,
				data : data
			});
		},

		/**
		 * 发送刷新命令。
		 * 
		 * @function page.external:opener.refresh
		 * @see main.post
		 * @see page.onRefresh
		 * @param {*}
		 *            [data] - 可附带的数据对象。
		 * @returns {Promise}
		 */
		refresh : function(data) {
			return exec("post", {
				id : info.pid,
				type : "refresh",
				data : data
			});
		}
	};

	/**
	 * 主窗口的操作对象。
	 * 
	 * @external page.parent
	 */
	page.parent = {

		/**
		 * 请求执行主窗口中的函数。
		 * 
		 * @function page.external:parent.run
		 * @param {string}
		 *            name - 全局函数名称。
		 * @param {Array}
		 *            args - 执行参数。
		 * @returns {Promise}
		 */
		run : function(name, args) {
			return exec(".run", {
				name : name,
				args : args
			});
		}
	};

	/**
	 * 图片上传操作对象。
	 * 
	 * @external page.upload
	 */
	page.upload = {
		self : null,
		/**
		 * 表示图片上传之后存放的根目录名称，主要用于区别不同系统之间上传的图片。
		 * 
		 * @member {string} page.external:upload.rootDir
		 * @default upload
		 */
		rootDir : "upload",

		/**
		 * 初始化上传控件。
		 * 
		 * @function page.external:upload.init
		 * @param {string}
		 *            id - 元素 ID。
		 */
		init : function(id) {
			uploadInit(id);
		},
		/**
		 * 表示图片上传之后存放的根目录名称，主要用于区别不同系统之间上传的图片。
		 * 
		 * @member {string} page.external:upload.rootDir
		 * @default upload
		 */
		
		rootDir : "upload",

		/**
		 * 返回预览图片地址。
		 * 
		 * @function page.external:upload.getViewURL
		 * @param {string}
		 *            url - 图片路径。
		 * @returns {string}
		 */
		getViewURL : function(url) {
			return url;
		},

		/**
		 * 返回图片的上传地址。
		 * 
		 * @function page.external:upload.getUploadURL
		 * @returns {string}
		 */
		getUploadURL : function() {
			return "";
		},

		getDownloadURL : function(data) {
			return '';
		},

		/**
		 * 返回图片删除地址。
		 * 
		 * @function page.external:upload.getDeleteURL
		 * @returns {string}
		 */
		getDeleteURL : function() {
			return "";
		},

		/**
		 * 加载已存在的图片。
		 * 
		 * @function page.external:upload.loadPictures
		 * @param {Array}
		 *            data
		 */
		loadPictures : function(data,id) {
			if (kernel.lang.isString(data))
				data = kernel.json.parse(data);
			new uploadPic().loadEnd(data,id);
		},

		/**
		 * 验证控件是否有效。
		 * 
		 * @function page.external:upload.check
		 * @returns {boolean}
		 */
		check : function() {
			// return !(upload && upload.required && upload.size() === 0)
			return true;
		},
		uploadPicUrls:new Object(),
		uploadObject:new Object()
	};

	/**
	 * 当连接或初始化子失败时，调用此方法。
	 * 
	 * @function page.onError
	 * @param {string}
	 *            data - 错误内容。
	 */
	page.onError = function(data) {
		$.messager.alert({
			title : "错误信息",
			msg : data,
			icon : "error"
		});
	};

	/**
	 * 当初始化子页面后，调用此方法。
	 * 
	 * @function page.onLoad
	 */
	page.onLoad = function() {
	};

	/**
	 * 当子页面向此页面发送数据时，调用此方法。
	 * 
	 * @function page.onMessage
	 * @see page.external:opener.post
	 * @param {*}
	 *            data - 消息数据。
	 */
	page.onMessage = function(data) {
	};

	/**
	 * 当接收到刷新命令时，调用此方法。默认情况为刷新页面，若想刷新局部可重写此方法。
	 * 
	 * @function page.onRefresh
	 * @see page.external:opener.refresh
	 * @param {*}
	 *            data - 消息数据。
	 */
	page.onRefresh = function(data) {
		location.reload();
	};

	function exec(name, param) {
		return mainPromise.then(function() {
			if (kernel.lang.isObject(param)) {
				param = kernel.lang.extend({
					pid : info.id
				}, param);
			}
			return req.send({
				name : name,
				param : param
			});
		});
	}

	function treeGridFilter(arr, parentId) {
		kernel.lang.forEach(arr, function(o) {
			if (o.children && o.children.length > 0)
				//o.state = "closed"; 禁止关闭
			kernel.lang.forEach(o, function(v, k) {
				if (kernel.lang.isString(v)) {
					o[k] = kernel.xml.escapeXML(v);
				} else if (kernel.lang.isArray(v)) {
					treeGridFilter(v);
				}
			}, false);
		}, true);
		return arr;
	}

	function selections(arr, param) {
		var errMsg = null;
		var len = arr.length;
		if (kernel.lang.isNumber(param.size)) {
			if (len === 0)
				errMsg = "当前操作需要选择 " + param.size + " 条记录！";
			else if (len !== param.size)
				errMsg = "当前操作只能选择 " + param.size + " 条记录！";
		} else {
			if (kernel.lang.isNumber(param.min) && len < param.min)
				errMsg = "当前操作必须至少选择 " + param.min + " 条记录！";

			if (kernel.lang.isNumber(param.max) && len > param.max)
				errMsg = "当前操作必须最多选择 " + param.max + " 条记录！";
		}

		if (errMsg) {
			page.warn(errMsg);
			arr = [];
		}
		return arr;
	}

	function deleteData(arr, param) {
		var len = arr.length;
		if (len > 0) {
			page.confirm("总共删除 " + len + " 条，确认删除请点击“确定”！").then(function(boo) {
				if (boo) {
					var method = "GET";
					var url = param.formatURL(arr);
					var data = null;
					if (param.formatPostData) {
						data = param.formatPostData(arr);
						method = "POST";
					}
					method = param.method || method;
					page.send({
						url : url,
						method : method,
						data : data
					}).then(function(data) {
						page.alert(data).then(function() {
							if (data.status === 1)
								page.loadDataGrid({
									id : param.id
								});
						});
					});
				}
			});
		}
	}
	
	function deleteTreeData(arr, param) {
		var len = arr.length;
		if (len > 0) {
			page.confirm("总共删除 " + len + " 条，确认删除请点击“确定”！").then(function(boo) {
				if (boo) {
					$('#datagrid').treegrid('reload');
					var method = "GET";
					var url = param.formatURL(arr);
					var data = null;
					if (param.formatPostData) {
						data = param.formatPostData(arr);
						method = "POST";
					}
					method = param.method || method;
					page.send({
						url : url,
						method : method,
						data : data
					}).then(function(data) {
						page.alert(data).then(function() {
							if (data.status === 1)
								page.loadDataGrid({
									id : param.id
								});
						});
					});
				}
			});
		}
	}
	
	function updateStopData(arr, param) {
		var len = arr.length;
		if (len > 0) {
			page.confirm("总共非公开 " + len + " 条，确认非公开请点击“确定”！").then(function(boo) {
				if (boo) {
					var method = "GET";
					var url = param.formatURL(arr);
					var data = null;
					if (param.formatPostData) {
						data = param.formatPostData(arr);
						method = "POST";
					}
					method = param.method || method;
					page.send({
						url : url,
						method : method,
						data : data
					}).then(function(data) {
						page.alert(data).then(function() {
							if (data.status === 1)
								page.loadDataGrid({
									id : param.id
								});
						});
					});
				}
			});
		}
	}
	function updateOpenData(arr, param) {
		var len = arr.length;
		if (len > 0) {
			page.confirm("总共公开 " + len + " 条，确认公开请点击“确定”！").then(function(boo) {
				if (boo) {
					var method = "GET";
					var url = param.formatURL(arr);
					var data = null;
					if (param.formatPostData) {
						data = param.formatPostData(arr);
						method = "POST";
					}
					method = param.method || method;
					page.send({
						url : url,
						method : method,
						data : data
					}).then(function(data) {
						page.alert(data).then(function() {
							if (data.status === 1)
								page.loadDataGrid({
									id : param.id
								});
						});
					});
				}
			});
		}
	}
	function passData(arr, param) {
		var len = arr.length;
		if (len ==1) {
			page.confirm("确认撤销发布请点击“确定”！").then(function(boo) {
				if (boo) {
					var method = "GET";
					var url = param.formatURL(arr);
					var data = null;
					if (param.formatPostData) {
						data = param.formatPostData(arr);
						method = "POST";
					}
					method = param.method || method;
					page.send({
						url : url,
						method : method,
						data : data
					}).then(function(data) {
						page.alert(data).then(function() {
							if (data.status === 1)
								page.loadDataGrid({
									id : param.id
								});
						});
					});
				}
			});
		}
	}

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
/**
 * 上传图片：支持一个页面多处上传图片
 */
	function uploadPic(){
		var upload={
				required : false,
				field : "files",
				_urlSet : new kernel.util.Set(),
				_loadNode : null,
				_infoNode : null,
				_listNode : null,
				_inputNode : null,
				imgURLs : []  // 上传的图片路径集合
			};
		upload.size = function() {
			return upload._urlSet.size();
		};

		upload.loadStart = function() {
			upload._loadNode.style.display = "";
			upload._infoNode.style.display = "none";
		};

		upload.loadEnd = function(arr,id) {
			kernel.lang.forEach(arr, function(url) {
				id= id || "uploadBtn";
				if(!upload._loadNode || !upload._infoNode){
					upload = page.upload.uploadObject[id] ;
				}
				if (!upload._urlSet.add(url)) {
					return;
				}
				upload.imgURLs[upload.imgURLs.length]=url;
				page.upload.uploadPicUrls[id] = upload.imgURLs;
				var ul=document.getElementById(id).parentNode.children[1].children[4].children[0].children[0];
				var li = kernel.html.createElement("LI", {}, null, {
					parentNode : ul
				});

				kernel.html.createElement("IMG", {
					src : page.upload.getViewURL(url)
				}, null, {
					parentNode : li
				});
				upload._listNode=ul;
				kernel.html.createElement("A", {
					href : "javascript:void(0)",
					className : "imgDel"
				}, {
					onclick : function() {
						page.send({
							url : page.upload.getDeleteURL(),
							data : {
								fileUrl : [ url ]
							}
						}).then(function(data) {
							if (data.status === 1) {
								upload._urlSet.remove(url);
								upload._listNode.removeChild(li);
								upload.show("",ul);
								for(var picIndex in upload.imgURLs){
									if(upload.imgURLs[picIndex] == url){
										upload.imgURLs.splice(picIndex,1);
										break;
									}
								}
								page.upload.uploadPicUrls[id] = upload.imgURLs;
							} else {
								page.alert(data);
							}
						});
					}
				}, {
					parentNode : li
				});
			});
			upload.show("",id);
		};

		upload.show = function(html,id) {
			id= id || "uploadBtn";
			if(!upload._loadNode || !upload._infoNode){
				upload = page.upload.uploadObject[id] ;
			}
			html = html || "总共上传了 " + upload.size() + " 张图片。";
				upload._loadNode.style.display = "none";
				upload._infoNode.style.display = "";
				upload._infoNode.innerHTML = html;
				upload._inputNode.value = kernel.json.stringify(upload._urlSet
						.toArray());
			
		};
		return upload;
	}
	var uploadInit = function(id) {
			id= id || "uploadBtn" ;
			var upload = new uploadPic();
			var uploadBtn = document.getElementById(id);
			if (!uploadBtn)
				return;

			var dataOpts = null;
			var opts = uploadBtn.getAttribute("data-options");
			if (opts) {
				dataOpts = eval("({" + opts + "})");
				upload.required = dataOpts.required;
				upload.field = dataOpts.field;
			}

			var panel = kernel.html.createElement("DIV", {
				className : "loadpanel"
			}, null, {
				parentNode : uploadBtn.parentNode
			});

			upload._loadNode = kernel.html.createElement("IMG", {
				className : "loading",
				src : page.base + "/res/sys/main/img/loading.gif",
				title : "图片上传中...",
				alt : "图片上传中...",
				style : {
					display : "none"
				}
			});

			upload._infoNode = document.createElement("SPAN");

			upload._listNode = kernel.html.createElement("UL", {
				className : "imgList"
			});

			upload._inputNode = kernel.html.createElement("INPUT", {
				type : "hidden",
				name : upload.field,
				value : "[]"
			}, null, {
				parentNode : panel
			});

			$(panel).layout({
				fix : true,
				collapse : "south",
				height : 180
			});

			$(panel).layout('add', {
				region : "south",
				height : 20,
				content : [ upload._loadNode, upload._infoNode ]
			});

			$(panel).layout('add', {
				region : "center",
				content : upload._listNode
			});
			
			var ajaxUpload = new AjaxUpload(uploadBtn, {
				autoSubmit : true,
				multiples : false,
				responseType : "json",
				onChange : function(file, extension) {
					this._settings.action = page.upload.getUploadURL();
					this._settings.data.folder = page.upload.rootDir;
					upload.loadStart();
				},
				onComplete : function(file, response) {
					if (response.status === 1) {
						if(dataOpts.picType){
							var picTypes=dataOpts.picType.split(",");
							for(var j in picTypes){
								if(response.images[0].substring(response.images[0].indexOf(".")).toLowerCase().indexOf(picTypes[j])==-1){
									if(j == (picTypes.length-1)){
										alert("请上传图片后缀名为"+dataOpts.picType+"的图片！");
										upload.loadEnd();
										return;
									}
								}else{
									break;
								}
							}
						}
						upload.loadEnd(response.images,id);
						if(upload.imgURLs.length > dataOpts.maxPic){
							alert("本处最多只能上传"+dataOpts.maxPic+"张图片！");
							page.send({
								url : page.upload.getDeleteURL(),
								data : {
									fileUrl : [ response.images[0] ]
								}
							}).then(function(data) {
								if (data.status === 1) {
									var ul=document.getElementById(id).parentNode.children[1].children[4].children[0].children[0];
									upload._urlSet.remove(response.images[0]);
									upload._listNode.removeChild(ul.children[dataOpts.maxPic]);
									upload.show("",ul);
									for(var picIndex in upload.imgURLs){
										if(upload.imgURLs[picIndex] == response.images[0]){
											upload.imgURLs.splice(picIndex,1);
											break;
										}
									}
								} else {
									page.alert(data);
								}
							});
						}
						page.upload.uploadPicUrls[id] = upload.imgURLs;
					} else {
						upload.show();
						page.alert(response);
					}
				}
			});
			upload.loadEnd(null);
			page.upload.uploadObject[id] = upload;
		};


	/**
	 * 级联框的配置对象。
	 * 
	 * @typedef page.Cascade~Config
	 * @property {function} formatURL - 返回数据请求地址。
	 * @property {Object} data - 填充的数据对象。
	 * @property {string} valueField - 作为选项值的属性名称。
	 * @property {string} textField - 作为选项显示的属性名称。
	 */
	/**
	 * 定义一个级联选择框。
	 * 
	 * @class page.Cascade
	 * @param {page.Cascade~Config[]}
	 *            list -
	 */
	page.Cascade = function(list) {
		list = list || [];

		function change(index) {
			var obj = list[index];
			if (!obj || !obj.$)
				return;
			var sun = obj.$;
			var parent = list[index - 1].$;
			var value = parent.combobox("getValue");
			if (value) {
				if (obj.parentValue !== value) {
					obj.parentValue = value;
					var url = obj.formatURL(value);
					sun.combobox({
						url : kernel.path.join(page.base, url),
						method : "get",
						valueField : obj.valueField,
						textField : obj.textField,
						onLoadSuccess : function() {
							change(index + 1);
						}
					});
				}
			} else {
				sun.combobox({
					url : null,
					data : []
				});
				change(index + 1);
			}
		}

		/**
		 * @function page.Cascade#load
		 * @param {*}
		 *            [value] - 请求参数。
		 * @returns {Promise}
		 */
		this.load = function(value) {
			return new kernel.util.Promise(function(resolve, reject) {
				(function(index) {
					var obj = list[index];
					if (!obj) {
						resolve();
						return;
					}

					var input = document.getElementById(obj.id);
					if (!input) {
						resolve();
						return;
					}

					var self = obj.$ = $(input);

					if (index === 0) {
						if (obj.data) {
							self.combobox({
								data : obj.data,
								valueField : obj.valueField,
								textField : obj.textField,
								onChange : function(newValue, oldValue) {
									change(index + 1);
								}
							});
						} else {
							var url = obj.formatURL(value);
							self.combobox({
								url : kernel.path.join(page.base, url),
								method : "get",
								valueField : obj.valueField,
								textField : obj.textField,
								onChange : function(newValue, oldValue) {
									change(index + 1);
								}
							});
						}
					} else {
						self.combobox({
							onChange : function(newValue, oldValue) {
								change(index + 1);
							}
						});
						change(index);
					}
					arguments.callee(index + 1);
				})(0);
			});
		};
	};

	/**
	 * 预置配置对象集合映射。
	 * 
	 * @member {Object} page.Cascade.map
	 */
	page.Cascade.map = {};

	/**
	 * @function page.Cascade.load
	 * @param {string}
	 *            key - 预置配置集合的名称。
	 * @param {string[]}
	 *            ids - 控件HTML元素的 ID 集合。
	 * @param {*}
	 *            value - 请求参数。
	 * @returns {Promise}
	 */
	page.Cascade.load = function(key, ids, value) {
		var source = page.Cascade.map[key];
		var target = [];

		if (source && source.length > 0) {
			kernel.lang.forEach(ids, function(id, i) {
				var obj = source[i];
				if (!obj)
					obj = source[source.length - 1];
				obj = kernel.lang.create(obj);
				obj.id = id;
				obj.$ = null;
				obj.parentValue = null;
				target.push(obj);
			});

			return new page.Cascade(target).load(value);
		}
		return kernel.util.Promise.reject("配置信息不存在！");
	};

})();

/**
 * 获取url后的参数转成array
 */
function GetRequest() { 
	var url = location.search; //获取url中"?"符后的字串 
	var theRequest = new Object(); 
	if (url.indexOf("?") != -1) { 
		var str = url.substr(1); 
		strs = str.split("&"); 
		for(var i = 0; i < strs.length; i ++) { 
			theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]); 
		} 
	} 
	return theRequest; 
}

window.alert=function(args){
	page.alert({status:"2",message:args});
};

/**
 * 生成一个随机的UUID
 *
 * USAGE: Math.uuid(length, radix)
 *   length - UUID位数
 *   radix  - UUID进制
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 *
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
(function() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
 
  Math.uuid = function (len, radix) {
    var chars = CHARS, uuid = [], i;
    radix = radix || chars.length;
 
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;
 
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
 
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
 
    return uuid.join('');
  };
 
  // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
  // by minimizing calls to random()
  Math.uuidFast = function() {
    var chars = CHARS, uuid = new Array(36), rnd=0, r;
    for (var i = 0; i < 36; i++) {
      if (i==8 || i==13 ||  i==18 || i==23) {
        uuid[i] = '-';
      } else if (i==14) {
        uuid[i] = '4';
      } else {
        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
        r = rnd & 0xf;
        rnd = rnd >> 4;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
    return uuid.join('');
  };
 
  // A more compact, but less performant, RFC4122v4 solution:
  Math.uuidCompact = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  };
})();