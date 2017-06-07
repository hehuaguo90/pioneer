(function() {
	var kernel = window["kernel@1.3"];
	var links = new kernel.util.List();
	var urlMap = new kernel.util.Map();
	var idMap = new kernel.util.Map();

	window.loadMenu = function(url, callback) {
		var node = document.getElementById("loading");
		if (!node)
			return;
		kernel.ajax.send({
			url : url,
			responseType : "json"
		}).then(function(arr) {
			var frag = document.createDocumentFragment();
			createMenu(arr, frag, 0, []);
			node.parentNode.appendChild(frag);
			node.parentNode.removeChild(node);
			callback && setTimeout(callback, 200);
		});
	}

	window.openPanel = function(path) {
		var a = null;
		urlMap.forEach(function(v, k) {
			if (k.indexOf(path) === 0) {
				a = v;
			}
		});
		if (a) {
			a.click();
		}
	};

	window.openPanelById = function(id, search) {
		var obj = idMap.get(id);
		if (obj) {
			var a = urlMap.get(obj.href);
			obj.search = search;
			a && a.click();
		}
	};

	window.findMenus = function(match) {
		var arr = [];
		idMap.forEach(function(v, k) {
			if (match(v))
				arr.push(v);
		});
		return arr;
	};

	function createMenu(arr, parentNode, level, paths) {
		var class_ul = [ "leftmenu", "menu_lv1_submenubox",
				"menu_lv2_submenubox" ];
		var class_li = [ "menu_lv1", "menu_lv1_submenu", "menu_lv3" ];
		var class_a = [ "menu_lv1_title", "menu_lv2_title", "" ];

		if (arr && arr.length > 0) {
			var ul = kernel.html.createElement("UL", {
				className : class_ul[level]
			}, null, {
				parentNode : parentNode
			});
			kernel.lang.forEach(arr, function(obj, index) {
				var _paths = paths.concat([ obj.text ]);

				var li = kernel.html.createElement("LI", {
					className : class_li[level]
				}, null, {
					parentNode : ul
				});

				/*
				if (level === 0 && index === 0) {
					li.className += " menu_lv1_active";
				} else if (level === 1 && index > 0) {
					li.className += " menu_lv2_close";
				}
				*/
				//全部关闭菜单
				if (level === 1) {
					li.className += " menu_lv2_close";
				}
				
				var title = kernel.xml.escapeXML(obj.text);
				var a = kernel.html.createElement("A", {
					innerHTML : title,
					className : class_a[level]
				}, {
					onclick : function() {
						switch (level) {
						case 0:
							openLevel0(ul.childNodes, li);
							break;
						default:
							if (obj.href && obj.href !== "#") {
								var url = kernel.path.join(contextPath,
										obj.href);
								main.panel({
									reload : obj.search ? true : false,
									attributes : {
										search : obj.search,
										paths : _paths
									},
									title : title,
									url : url
								});
								updateActive(this, level);
							} else {
								openLevel1(ul.childNodes, li);
							}
						}
					}
				}, {
					parentNode : li
				});

				links.add(a);

				if (obj.href) {
					a.href = "javascript:void(0)";
					urlMap.put(obj.href, a);
				}

				if (obj.id) {
					idMap.put(obj.id, obj);
				}

				createMenu(obj.children, li, level + 1, _paths);
			}, true);
		}
	}

	function updateActive(a, level) {
		var className = "menu_lv" + (level + 1) + "_title_active";
		links.forEach(function(b) {
			if (a === b) {
				kernel.style.addClassName(b, className);
			} else {
				kernel.style.removeClassName(b, className);
			}
		});
	}

	function openLevel0(nodeList, li) {
		var className = "menu_lv1_active";
		
		//判断当前菜单是否在激活状态,如果已激活，则关闭
		var classNames = li.className;
		if(classNames.indexOf(className) > 0){
			kernel.style.removeClassName(li, className);
			return;
		}
			
		kernel.lang.forEach(nodeList, function(node) {
			if (node === li) {
				kernel.style.addClassName(node, className);
			} else {
				kernel.style.removeClassName(node, className);
			}
		}, true);
		nodeList = li.getElementsByTagName("LI");
		openLevel1(nodeList, nodeList[0]);
	}

	function openLevel1(nodeList, li) {
		var className = "menu_lv2_close";
		kernel.lang.forEach(nodeList, function(node) {
			if (node === li) {
				kernel.style.removeClassName(node, className);
			} else {
				kernel.style.addClassName(node, className);
			}
		}, true);
	}
})();