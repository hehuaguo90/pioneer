/**
 * @file 在主页面中调用。
 *       <p>
 *       此框架依赖以下 JS 库：
 *       </p>
 *       <ul>
 *       <li>jquery-easyui-1.4.3</li>
 *       <li>kernel-v1.3</li>
 *       </ul>
 */

/**
 * Promise 模式对象。
 * 
 * @class Promise
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise}
 */
/**
 * 添加回调函数。
 * 
 * @function Promise#then
 * @param {function}
 *            resolve - 逻辑正常时调用。
 * @param {function}
 *            reject - 逻辑错误时调用。
 * @returns {Promise}
 */
(function() {
	if (window.main)
		return;

	var $ = jQuery;
	var kernel = window["kernel@1.3"];
	var Promise = kernel.util.Promise;

	var BLANK_TITLE = "空白标题";
	var URN = "urn:thtf:rota:main"

	/**
	 * 主页面的全局服务对象。
	 * 
	 * <p>
	 * 说明：
	 * </p>
	 * <ol>
	 * <li><strong>窗口</strong>是指每个子页面，包括选项卡和对话框的打开的页面，不是指的浏览器窗口。</li>
	 * </ol>
	 * 
	 * @namespace main
	 */
	var main = window.main = {};
	var mainTabs = null;
	var showPanel = new kernel.util.HashMap();

	var meta = {
		_count : 0,
		_map : new kernel.util.HashMap()
	};
	meta.put = function(value) {
		value = kernel.lang.extend({
			id : meta._count++
		}, value);
		meta._map.put(value.id, value);
		return value.id;
	};
	meta.get = function(id) {
		return meta._map.get(id);
	};
	meta.rm = function(id) {
		meta._map.remove(id);
	};
	meta.each = function(callback) {
		meta._map.forEach(callback);
	};
	meta.find = function(match) {
		var arr = [];
		meta._map.forEach(function(a, b) {
			if (match(a)) {
				arr.push(a);
			}
		});
		return arr;
	};

	$().ready(function() {
		var tab = null;

		mainTabs = $("#mainTabs");
		mainTabs.tabs({
			tools : [ {
				iconCls : 'tab-close',
				handler : function() {
					var curTab = mainTabs.tabs("getSelected");
					var index = mainTabs.tabs("getTabIndex", curTab);
					if (index > 0)
						mainTabs.tabs("close", index);
				}
			}, {
				iconCls : 'tab-closeOther',
				handler : function() {
					var curTab = mainTabs.tabs("getSelected");
					var index = 1;
					while (true) {
						var tab = mainTabs.tabs("getTab", index);
						if (tab === curTab) {
							index++;
						} else if (tab) {
							mainTabs.tabs("close", index);
						} else {
							break;
						}
					}
					mainTabs.tabs("select", index - 1);
				}
			}, {
				iconCls : 'tab-clearAll',
				handler : function() {
					var index = 1;
					while (true) {
						var tab = mainTabs.tabs("getTab", index);
						if (tab) {
							mainTabs.tabs("close", index);
						} else {
							break;
						}
					}
				}
			} ],
			onSelect : function(title, index) {
				tab = mainTabs.tabs("getTab", index);
	        	var refresh_ifram = tab.find('iframe')[0];			//获取到选定的tab下的iframe
	        	if(refresh_ifram!=null){
	        		var refresh_doc = refresh_ifram.contentWindow;		//获取到选定的tab下的iframe中的内容 
	                var obj = refresh_doc.document.getElementById("datagrid");
	                if (obj){
	                	var reholle = refresh_doc.$("#datagrid");
	                    reholle.datagrid("reload");
	                }
	        	}
			},
			onBeforeClose : function(title, index) {
				tab = mainTabs.tabs("getTab", index);
			},
			onClose : function(title, index) {
				meta.each(function(a, b) {
					var c = a.tab;
					if (c && (tab === c || tab[0] === c[0])) {
						meta.rm(b);
					}
				});
			}
		});

		var provider = new kernel.message.Provider(URN);
		provider.reply = function(info, callback) {
			var data = info.message;
			var name = data.name;
			var param = data.param;
			var value = null;

			switch (name) {
			case ".init":
				value = {
					version : "1.0"
				};
				var obj = meta.find(function(a, b) {
					return a.frame.contentWindow == info.source;
				})[0];

				if (obj) {
					value.id = obj.id;
					value.pid = obj.pid;
					value.attributes = obj.attributes;
				}
				break;
			case ".run":
				value = new Promise(function(resolve, reject) {
					var fn = window[param.name];
					if (kernel.lang.isFunction(fn)) {
						try {
							fn.apply(null, param.args || []);
						} catch (e) {
							resolve(e.message);
						}
					}
					resolve();
				});

				break;
			default:
				var func = main[name];
				if (kernel.lang.isFunction(func)) {
					value = func(param);
				}
			}
			Promise.resolve(value).then(function(v) {
				if (kernel.lang.isUndefined(v))
					v = null;
				callback(v);
			});
		};
		try {
			main.onLoad();
		} catch (e) {
			main.alert({
				title : "错误信息",
				type : "error",
				html : e.message
			});
		}
	});

	/**
	 * 打开／定位一个选项卡面板。
	 * 
	 * <p>
	 * 目前以 URL 地址作为唯一标识，如果指定的地址已经打开，则当前操作定位到该选项卡。
	 * </p>
	 * 
	 * @function main.panel
	 * @param {Object}
	 *            param - 复合参数。
	 * @param {string}
	 *            param.url - 页面地址。
	 * @param {string}
	 *            param.title - 选项卡标题。
	 * @param {boolean}
	 *            [param.reload=false] - 当选项卡已打开时，是否重新加载。
	 * @param {Object}
	 *            [param.attributes] - 自定义携带信息。
	 * @returns {(string|number)} 窗口 ID，可用于关闭该选项卡等操作。
	 */
	main.panel = function(param) {
		var url = param.url || "javascript:void(0);";
		var obj = meta.find(function(a) {
			return a.url === url;
		})[0];

		var index = 0;
		var id = null;

		if (obj && obj.tab) {
			index = mainTabs.tabs("getTabIndex", obj.tab);
			id = obj.id;
		} else {
			var curTab = mainTabs.tabs("getSelected");
			index = mainTabs.tabs("getTabIndex", curTab) + 1;

			var iframe = createIFrame(url);

			mainTabs.tabs("add", {
				index : index,
				content : iframe,
				border : false,
				closable : true,
				cache : false,
				selected : true,
				title : param.title || BLANK_TITLE
			});
			var tab = mainTabs.tabs("getTab", index);
			id = meta.put({
				attributes : param.attributes,
				type : "tabs",
				url : url,
				tab : tab,
				frame : iframe
			});
		}
		mainTabs.tabs("select", index);
		if (param.reload) {
			meta.get(id).frame.src = url;
		}
		return id;
	};

	/**
	 * 打开一个对话框。
	 * 
	 * @function main.dialog
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
	 * @param {(string|number)}
	 *            [param.pid] - 父窗口 ID。
	 * @returns {(string|number)} 窗口 ID，可用于关闭该选项卡等操作。
	 */
	main.dialog = function(param) {
		var width = kernel.html.getInnerWidth() - 40;
		var height = kernel.html.getInnerHeight() - 40;

		if (param.width < width)
			width = param.width;
		if (param.height < height)
			height = param.height;

		var iframe = createIFrame(param.url);
		document.body.appendChild(iframe);

		var id = meta.put({
			attributes : param.attributes,
			type : "dialog",
			pid : param.pid,
			url : param.url,
			frame : iframe
		});

		$(iframe).dialog({
			width : width,
			height : height,
			cache : false,
			modal : true,
			resizable : true,
			maximizable : true,
			title : param.title || BLANK_TITLE
		}).window({
			onClose : function() {
				meta.rm(id);
			}
		});
		return id;
	};

	/**
	 * 根据 ID 关闭指定窗口。
	 * 
	 * @function main.close
	 * @param {(string|number)}
	 *            id - 需要关闭的窗口 ID。
	 */
	main.close = function(id) {
		var obj = meta.get(id);
		if (obj) {
			switch (obj.type) {
			case "dialog":
				$(obj.frame).dialog("close");
				break;
			case "tabs":
				var index = mainTabs.tabs("getTabIndex", obj.tab);
				mainTabs.tabs("close", index);
				break;
			}
		}
	};

	/**
	 * 打开一个提示框。
	 * 
	 * @function main.alert
	 * @param {Object}
	 *            param - 复合对象。
	 * @param {string}
	 *            param.title - 提示框标题。
	 * @param {string}
	 *            param.html - 提示内容。
	 * @param {string}
	 *            [param.type] - 提示框类型，可能值：info,warning,error。
	 * @returns {Promise}
	 */
	main.alert = function(param) {
		return new Promise(function(resolve, reject) {
			var title = param.title || BLANK_TITLE;
			var icon = param.type || "info";
			$.messager.alert(title, param.html, icon, resolve);
		});
	};

	/**
	 * 打开一个确认框。
	 * 
	 * @function main.confirm
	 * @param {Object}
	 *            param - 复合对象。
	 * @param {string}
	 *            param.title - 确认框标题。
	 * @param {string}
	 *            param.html - 确认内容。
	 * @returns {Promise}
	 */
	main.confirm = function(param) {
		return new Promise(function(resolve, reject) {
			var title = param.title || BLANK_TITLE;
			$.messager.confirm(title, param.html, resolve);
		});
	};

	/**
	 * 在右下角弹出一个信息窗口。
	 * 
	 * @function main.show
	 * @param {Object}
	 *            param - 复合对象。
	 * @param {string}
	 *            param.title - 窗口标题。
	 * @param {string}
	 *            param.html - 信息内容。
	 * @param {string}
	 *            [param.name]- 窗口名称，用于重复打开的情况。
	 * @param {number}
	 *            [param.timeout=5000] - 指定毫秒数后自动关闭窗口。
	 */
	main.show = function(param) {
		var timeout = kernel.lang.isNumber(param.timeout) ? param.timeout
				: 5000;

		var name = param.name;
		if (name) {
			if (showPanel.get(name))
				return;

			showPanel.put(name, true);
			setTimeout(function() {
				showPanel.remove(name);
			}, timeout);
		}

		$.messager.show({
			title : param.title || BLANK_TITLE,
			msg : param.html,
			width : 300,
			height : 200,
			showType : 'slide',
			timeout : timeout
		});
	};

	/**
	 * 向指定窗口发送消息。
	 * 
	 * @function main.post
	 * @param {Object}
	 *            param - 复合参数。
	 * @param {(string|number)}
	 *            param.id - 发送消息的窗口 ID。
	 * @param {string}
	 *            [param.type=message] - 消息类型。
	 * @param {*}
	 *            [param.data] - 消息内容。
	 */
	main.post = function(param) {
		var obj = meta.get(param.id);
		if (obj) {
			var target = obj.frame.contentWindow;
			var type = param.type || "message";
			var data = kernel.lang.isUndefined(param.data) ? null : param.data;
			kernel.message.post(target, type, data);
		}
	};

	/**
	 * 
	 * 当初始化主页面后，调用此方法。
	 * 
	 * @function main.onLoad
	 */
	main.onLoad = function() {
	};

	function createIFrame(url) {
		var iframe = document.createElement("iframe");
		iframe.src = url;
		iframe.frameBorder = 0;
		iframe.width = "100%";
		iframe.height = "100%";
		return iframe;
	}
	
	var isCollapse = false;
	main.changeLeftMenu = function(){
		//$("#leftSide").css("display","none");
		//$("#mainBody").panel("maximize");
		
		var content = $('#mainBody').layout('panel', 'center');
		//var bar = $('#mainBody').layout('panel', 'west');
		//var leftMenu = $('#main').layout('panel', 'west');
		var ct = $('#main').layout('panel', 'center');
		if(!isCollapse){
			$('#main').layout('collapse','west');
			$("#switchbtn").attr("src", contextPath + '/res/sys/main/img/swich_for_open.png');
			//mainBody.panel("restore");
			var w1 = content.panel("options").width;
			var w2 = content.panel("options").width;
			//content.panel("maximize");
			
			content.panel('resize',{
				left: 10,
				width: w1 + 180
			});
			
			ct.panel('resize',{
				left: 0,
				width: w2 + 190
			});
			
			//content.panel('move',{
			//	left: 5
		    //});
			
			isCollapse = true;
		}else{
			$('#main').layout('expand','west');
			$("#switchbtn").attr("src", contextPath + '/res/sys/main/img/swich_for_close.png');
			//content.panel("restore");
			//ct.panel("restore");
			//content.panel('move',{
			//	left: 0
		    //});
			var w1 = content.panel("options").width;
			var w2 = content.panel("options").width;
			
			content.panel('resize',{
				left: 10,
				width: w1 - 180
			});
			
			ct.panel('resize',{
				left: 180,
				width: w2 - 190
			});
			
			isCollapse = false;
		}
	}
	window.alert=function(args){
		page.alert({status:"2",message:args});
	}
})();