/**
 * @file
 */
(function(window) {
	/**
	 * @namespace kernel
	 * @version 1.3.150821-alpha
	 * @see {@link https://github.com/zuojiang/kernel GitHub}
	 */
	var FRAMEWORK_NAME = "kernel";
	var MAJOR_VERSION_NUMBER = 1;
	var MINOR_VERSION_NUMBER = 3;
	var REVISION_NUMBER = 150821;
	var ADDITIONAL_VERSION = "alpha";

	function getVersion() {
		var str = "", arr = [ ".", ".", "-" ];
		var i = 0, len = Math.min(arguments.length - 1, 4);
		for (; i < len; i++) {
			if (i > 0)
				str += arr[i - 1];
			str += arguments[i + 1];
		}
		return str;
	}

	function joinPaths(path1, path2) {
		var reg = /^([a-z]+[a-z0-9\.\+\-]*[a-z0-9]+:|\.{1,2}\/)/i;
		if (!reg.test(path2) && path1) {
			return path1.replace(/\/$/g, "") + "/" + path2.replace(/^\//g, "");
		} else {
			return path2;
		}
	}

	function checkDependency(param, dependencies, callback) {
		if (dependencies.length) {
			var dependency = dependencies.shift();
			loadDependency(param, dependency, function() {
				checkDependency(param, dependencies, callback);
			}, true);
		} else {
			callback();
		}
	}

	function loadDependency(param, dependency, callback, firstTime) {
		var framework = dependency.match(param.owner);
		if (framework) {
			dependency.ready(framework, param.owner);
			if (dependency.lazy || framework.autoLoad) {
				callback();
			} else {
				framework.load(callback, param.owner, param.originInvoker);
			}
		} else if (firstTime && dependency.source) {
			checkSource(param, [ dependency.source ], function() {
				loadDependency(param, dependency, callback, false);
			});
		} else {
			callback();
		}
	}

	function checkSource(param, sources, callback, update) {
		if (sources.length) {
			var source = sources.shift();
			if (source) {
				loadSource(param.owner, source, function() {
					if (update && /\/javascript$/i.test(source.type)) {
						update(function() {
							checkSource(param, sources, callback, update);
						});
					} else {
						checkSource(param, sources, callback);
					}
				});
			} else {
				callback();
			}
		} else {
			callback();
		}
	}

	function loadSource(owner, source, callback) {
		var onLoad = function() {
			source.onComplete(callback, owner);
		};
		if (source.check(owner)) {
			onLoad();
			return;
		}

		var url = joinPaths(owner.base, source.url);
		var isLink = /^text\/css$/ig.test(source.type);
		var element = null;

		if (isLink) {
			element = document.createElement("LINK");
			element.type = "text/css";
			element.rel = "stylesheet";
			element.href = url;
			onLoad();
		} else {
			element = document.createElement("SCRIPT");
			element.type = source.type;
			element.async = true;
			element.src = url;

			if ("onload" in element) {
				element.onload = element.onerror = function(event) {
					element.onload = element.onerror = null;
					onLoad();
				};
			} else {
				element.onreadystatechange = function() {
					if (this.readyState === "loaded"
							|| this.readyState === "complete") {
						element.onreadystatechange = null;
						onLoad();
					}
				};
			}
		}

		(document.head || document.getElementsByTagName("HEAD")[0])
				.appendChild(element);
	}

	function dispatch(instance, type, listeners, param) {
		var evt, arr = listeners.concat([]);
		for (var i = 0, len = arr.length; i < len; i++)
			if (arr[i].type === type) {
				evt = {
					type : type
				};
				switch (type) {
				case "loadStart":
				case "loadEnd":
					evt.invoker = param.invoker;
					evt.originInvoker = param.originInvoker;
					break;
				default:
					for ( var key in param)
						if (param.hasOwnProperty(key))
							evt[key] = param[key];
				}
				try {
					arr[i].handler.call(instance, evt);
				} catch (e) {
					window.console && console.error(e);
				}
			}
	}

	function addSources(framework, sources) {
		if (!sources)
			return;
		for (var i = 0, len = sources.length; i < len; i++) {
			var obj = sources[i];
			var sou = new Source(obj.url);
			if (obj.type)
				sou.type = obj.type;
			if (obj.check)
				sou.check = obj.check;
			if (obj.onComplete)
				sou.onComplete = obj.onComplete;
			framework.addSource(sou);
		}
	}

	function addAttributes(framework, attributes) {
		if (!attributes)
			return;
		for (var i = 0, len = attributes.length; i < len; i++) {
			var obj = attributes[i];
			framework.setAttribute(obj.name, obj.value);
		}
	}

	function addDependencies(framework, dependencies) {
		if (!dependencies)
			return;
		for (var i = 0, len = dependencies.length; i < len; i++)
			(function(obj) {
				var sou = null;
				if (obj.url) {
					sou = new Source(obj.url);
					sou.type = "text/javascript";
				} else if (obj.base && obj.namespace) {
					var filename = obj.namespace.split("@")[0] + ".js";
					sou = new Source(joinPaths(obj.base, filename));
				}
				var dep = new Dependency(obj.namespace, sou);
				dep.lazy = Boolean(obj.lazy);
				if (obj.match)
					dep.match = obj.match;
				dep.ready = function(framework, invoker) {
					if (obj.base)
						framework.base = obj.base;
					addSources(framework, obj.sources);
					addAttributes(framework, obj.attributes);
					if (obj.ready)
						obj.ready.apply(dep, arguments);
				};
				framework.addDependency(dep);
			})(dependencies[i]);
	}

	/**
	 * 
	 * @class kernel.Source
	 * @param {string}
	 *            url - {@link kernel.Source#url}.
	 */
	function Source(url) {
		/**
		 * @member {string} kernel.Source#url
		 */
		this.url = url;

		/**
		 * @member {string} kernel.Source#type
		 * @default text/javascript
		 */
		this.type = /\.css$/i.test(url) ? "text/css" : "text/javascript";
	}

	/**
	 * @member {number} kernel.Source#order
	 * @deprecated v1.3
	 */

	/**
	 * @function kernel.Source#check
	 * @param {kernel.Framework}
	 *            owner
	 * @returns {boolean}
	 */
	Source.prototype.check = function(owner) {
		return false;
	};

	/**
	 * @function kernel.Source#onComplete
	 * @param {function}
	 *            callback
	 * @param {kernel.Framework}
	 *            owner
	 */
	Source.prototype.onComplete = function(callback, owner) {
		callback();
	};

	/**
	 * @class kernel.Dependency
	 * @param {string}
	 *            namespace - {@link kernel.Dependency#namespace}
	 * @param {kernel.Source}
	 *            [source] - {@link kernel.Source}
	 */
	function Dependency(namespace, source) {

		/**
		 * @member {string} kernel.Dependency#namespace
		 */
		this.namespace = namespace;

		/**
		 * @member {kernel.Source} kernel.Dependency#source
		 */
		this.source = source;
	}

	/**
	 * 
	 * @member {boolean} kernel.Dependency#lazy
	 * @default false
	 * @since 1.2
	 */
	Dependency.prototype.lazy = false;

	/**
	 * @function kernel.Dependency#match
	 * @since 1.1
	 * @param {kernel.Framework}
	 *            invoker
	 * @returns {kernel.Framework}
	 */
	Dependency.prototype.match = function(invoker) {
		var framework = window[this.namespace] || invoker[this.namespace];
		return framework;
	};

	/**
	 * 
	 * @function kernel.Dependency#ready
	 * @since 1.1
	 * @param {kernel.Framework}
	 *            framework
	 * @param {kernel.Framework}
	 *            invoker
	 */
	Dependency.prototype.ready = function(framework, invoker) {
	};

	/**
	 * @class kernel.Framework
	 * @param {string}
	 *            name - The framework name.
	 * @param {(number|string)}
	 *            major_version_number - The major version.
	 * @param {(number|string)}
	 *            minor_version_number - The minor version.
	 * @param {(number|string)}
	 *            [revision_number] - The revision number.
	 * @param {string}
	 *            [additional_version] - The additional version.
	 */
	function Framework(name, major_version_number, minor_version_number,
			revision_number, additional_version) {
		var instance = this;
		var realNS, version;
		if (arguments.length >= 3) {
			realNS = name + "@" + major_version_number + "."
					+ minor_version_number;
			version = getVersion.apply(null, arguments);
			window[realNS] = instance;
		} else {
			realNS = version = name = major_version_number = minor_version_number = "";
		}

		/**
		 * @member {Object} kernel.Framework#bundle
		 */
		this.bundle = {};

		/**
		 * @function kernel.Framework#getName
		 * @returns {string}
		 */
		this.getName = function() {
			return name;
		};

		/**
		 * @function kernel.Framework#getVersion
		 * @returns {string}
		 */
		this.getVersion = function() {
			return version;
		};

		/**
		 * @function kernel.Framework#getNamespace
		 * @returns {string}
		 */
		this.getNamespace = function() {
			return realNS;
		};

		/**
		 * @function kernel.Framework#getMajorVersionNumber
		 * @returns {(number|string)}
		 */
		this.getMajorVersionNumber = function() {
			return major_version_number;
		};

		/**
		 * @function kernel.Framework#getMinorVersionNumber
		 * @returns {(number|string)}
		 */
		this.getMinorVersionNumber = function() {
			return minor_version_number;
		};

		var localObj = {};

		/**
		 * @function kernel.Framework#getAttribute
		 * @param {string}
		 *            key
		 * @returns {Object}
		 */
		this.getAttribute = function(key) {
			if (localObj.hasOwnProperty(key))
				return localObj[key];
			else
				return undefined;
		};

		/**
		 * @function kernel.Framework#setAttribute
		 * @param {string}
		 *            key
		 * @param {Object}
		 *            value
		 */
		this.setAttribute = function(key, value) {
			localObj[key] = value;
		};

		/**
		 * @function kernel.Framework#removeAttribute
		 * @since 1.2
		 * @param {string}
		 *            key
		 */
		this.removeAttribute = function(key) {
			if (localObj.hasOwnProperty(key))
				delete localObj[key];
		};

		/**
		 * @function kernel.Framework#getAttributeNames
		 * @since 1.2
		 * @returns {string[]}
		 */
		this.getAttributeNames = function() {
			var arr = [];
			for ( var key in localObj)
				if (localObj.hasOwnProperty(key))
					arr.push(key);
			return arr;
		};

		var dependencies = [];

		/**
		 * @function kernel.Framework#addDependency
		 * @param {...kernel.Dependency}
		 *            dependency
		 */
		this.addDependency = function(dependency) {
			var len = arguments.length;
			if (len > 0) {
				for (var i = 0; i < len; i++) {
					dependency = arguments[i];
					dependencies.push(dependency);
				}
			}
		};

		var sources = [];

		/**
		 * @function kernel.Framework#addSource
		 * @param {...kernel.Source}
		 *            source
		 */
		this.addSource = function(source) {
			var len = arguments.length;
			if (len > 0) {
				for (var i = 0; i < len; i++) {
					source = arguments[i];
					sources.push(source);
				}
			}
		};

		var listeners = [];

		/**
		 * @function kernel.Framework#addListener
		 * @param {string}
		 *            type
		 * @param {function}
		 *            handler
		 */
		this.addListener = function(type, handler) {
			listeners.push({
				type : type,
				handler : handler
			});
		};

		/**
		 * @function kernel.Framework#removeListener
		 * @param {string}
		 *            type
		 * @param {function}
		 *            handler
		 */
		this.removeListener = function(type, handler) {
			var i = 0, listener;
			while (i < listeners.length) {
				listener = listeners[i];
				if (listener.type === type && listener.handler === handler)
					listeners.splice(i, 1);
				else
					i++;
			}
		};

		var status = 0, queue = [];

		/**
		 * @function kernel.Framework#load
		 * @param {function}
		 *            [callback]
		 * @param {kernel.Framework}
		 *            [invoker]
		 * @param {kernel.Framework}
		 *            [originInvoker]
		 * @fires kernel.Framework#loadStart
		 * @fires kernel.Framework#loadEnd
		 */
		this.load = function(callback, invoker, originInvoker) {
			if (status === 1) {
				queue.push(arguments);
				return;
			} else {
				status = 1;
			}

			var param = {
				originInvoker : originInvoker || invoker || null,
				invoker : invoker || null,
				owner : instance
			};

			dispatch(instance, "loadStart", listeners, param);
			checkDependency(param, dependencies, function() {
				checkSource(param, sources, function() {
					dispatch(instance, "loadEnd", listeners, param);
					status = 2;
					callback && callback();
					var args = queue.shift();
					if (args)
						instance.load.apply(instance, args);
				}, function(next) {
					checkDependency(param, dependencies, next);
				});
			});
		};

	}

	/**
	 * @member {string} kernel.Framework#base
	 */
	Framework.prototype.base = "";

	/**
	 * @member {string} kernel.Framework#description
	 */
	Framework.prototype.description = "";

	/**
	 * @member {boolean} kernel.Framework#autoLoad
	 * @since 1.3
	 * @default false
	 */
	Framework.prototype.autoLoad = false;

	/**
	 * @function kernel.Framework#include
	 * @since 1.2
	 * @param {kernel.Framework~Config}
	 *            config
	 */
	Framework.prototype.include = function(config) {
		if (!config)
			return;
		var instance = this;
		if (config.base)
			instance.base = config.base;
		addDependencies(instance, config.dependencies);
		addSources(instance, config.sources);
		addAttributes(instance, config.attributes);
	};

	/**
	 * @function kernel.Framework#getMessage
	 * @this BaseBundle
	 * @param {string}
	 *            key
	 * @param {...string}
	 *            [param]
	 * @returns {string}
	 */
	Framework.prototype.getMessage = function(key, param) {
		var len = arguments.length;
		if (len === 0)
			return "";

		var value;
		if (typeof this.bundle === "object") {
			value = this.bundle[key];
		} else {
			value = key;
		}

		if (typeof value === "undefined") {
			return "[" + key + "]";
		} else if (typeof value === "function") {
			return value.apply(this, arguments);
		}
		value = String(value);
		var i = 0, j, index, start = 1;
		while (i < value.length) {
			if (value.charAt(i) === "\'") {
				if (i === value.length - 1) {
					value = value.substring(0, i);
				} else if (value.charAt(i + 1) === "\'") {
					value = value.substring(0, i) + value.substring(++i);
				} else {
					j = i + 2;
					while ((j = value.indexOf("\'", j)) !== -1) {
						if (j === value.length - 1
								|| value.charAt(j + 1) !== "\'") {
							value = value.substring(0, i)
									+ value.substring(i + 1, j)
									+ value.substring(j + 1);
							i = j - 1;
							break;
						} else {
							value = value.substring(0, j)
									+ value.substring(++j);
						}
					}
					if (j === -1) {
						value = value.substring(0, i) + value.substring(i + 1);
					}
				}
			} else if (value.charAt(i) === "{") {
				j = value.indexOf("}", i + 1);
				if (j === -1) {
					i++;
				} else {
					index = parseInt(value.substring(i + 1, j));
					if (index >= 0 && index + start < len) {
						var str = String(arguments[index + start]);
						value = value.substring(0, i) + str
								+ value.substring(j + 1);
						i += str.length;
					} else {
						i = j + 1;
					}
				}
			} else {
				i++;
			}
		}

		return value;
	};

	/**
	 * @function kernel.Framework#debug
	 * @since 1.2
	 * @param {Object}
	 *            info
	 * @param {string}
	 *            [info.key]
	 * @param {Array}
	 *            [info.params]
	 * @param {Object}
	 *            [info.bundle]
	 * @param {function}
	 *            [info.print]
	 */
	Framework.prototype.debug = function(info) {
		if (window.console) {
			var instance = Framework.prototype;
			var msg = null, bundle, args;
			if (info.key) {
				bundle = info.bundle || this.bundle || instance.bundle;
				args = [ info.key ].concat(info.params || []);
				msg = instance.getMessage.apply({
					bundle : bundle
				}, args);
			} else if (info.params) {
				msg = info.params;
			}
			try {
				if (info.print)
					info.print(msg);
				else
					console.log(msg);
			} catch (e) {
			}
		}
	};

	var kernel = new Framework(FRAMEWORK_NAME, MAJOR_VERSION_NUMBER,
			MINOR_VERSION_NUMBER, REVISION_NUMBER, ADDITIONAL_VERSION);

	kernel.Dependency = Dependency;
	kernel.Source = Source;
	kernel.Framework = Framework;

	kernel.description = "This is a Web application's core library.";

})(this);
/**
 * Type.
 * 
 * @typedef kernel~T
 */
/**
 * Element.
 * 
 * @typedef kernel~E
 */
/**
 * Key.
 * 
 * @typedef kernel~K
 */
/**
 * Value.
 * 
 * @typedef kernel~V
 */
/**
 * @event kernel.Framework#loadStart
 * @type {Object}
 * @property {string} type
 * @property {?kernel.Framework} invoker
 * @property {?kernel.Framework} originInvoker
 */

/**
 * @event kernel.Framework#loadEnd
 * @type {Object}
 * @property {string} type
 * @property {?kernel.Framework} invoker
 * @property {?kernel.Framework} originInvoker
 */

/**
 * @typedef {Object} kernel.Framework~Config
 * @property {?string} base
 * @property {?kernel.Framework~Dependency[]} dependencies
 * @property {?kernel.Framework~Source[]} sources
 * @property {?kernel.Framework~Attribute[]} attributes
 */
/**
 * @typedef {Object} kernel.Framework~Dependency
 * @property {string} namespace
 * @property {?string} url
 * @property {?string} base
 * @property {?boolean} lazy
 * @property {?function} match
 * @property {?function} ready
 * @property {?kernel.Framework~Source[]} sources
 * @property {?kernel.Framework~Attribute[]} attributes
 */
/**
 * @typedef {Object} kernel.Framework~Source
 * @property {string} url
 * @property {?string} type
 * @property {?function} check
 * @property {?function} onComplete
 */
/**
 * @typedef {Object} kernel.Framework~Attribute
 * @property {string} name
 * @property {*} value
 */
(function(window, kernel, debug) {

	/**
	 * @external kernel.net
	 */
	kernel.net = {};

	/**
	 * @class kernel.external:net.Path
	 * @deprecated v1.3
	 * @see kernel.external:path
	 */

	/**
	 * @class kernel.external:net.QueryPart
	 */
	kernel.net.QueryPart = function() {
		var instance = this;
		var list = new kernel.util.List();

		/**
		 * @function kernel.external:net.QueryPart#addParameter
		 * @param {string}
		 *            name
		 * @param {string}
		 *            value
		 */
		this.addParameter = function(name, value) {
			list.add({
				name : String(name),
				value : String(value)
			});
		};

		/**
		 * @function kernel.external:net.QueryPart#addParameterByURL
		 * @param {string}
		 *            url
		 */
		this.addParameterByURL = function(url) {
			url = (new kernel.net.URLParser(url)).getSearch();
			debug && console.log("QueryPart#addParameterByURL", url);
			var regExp_kv = /\??([^&]+)=([^&]*)/g;
			while (true) {
				var result = regExp_kv.exec(url);
				if (result) {
					debug && console.log("QueryPart#addParameterByURL", result);
					this.addParameter(decodeURIComponent(result[1]),
							decodeURIComponent(result[2]));
				} else {
					break;
				}
			}
		};

		/**
		 * @function kernel.external:net.QueryPart#addParameterByForm
		 * @param {HTMLFormElement}
		 *            form
		 */
		this.addParameterByForm = function(form) {
			var element, name;
			for (var i = 0, len = form.elements.length; i < len; i++) {
				element = form.elements[i];
				if (element.name && !kernel.lang.isUndefined(element, "type")
						&& !element.disabled) {
					name = element.name;
					debug
							&& console.log("QueryPart#addParameterByForm",
									element, name);
					switch (element.type) {
					case "radio":
					case "checkbox":
						if (element.checked) {
							instance.addParameter(name, element.value);
						}
						break;
					case "select-one":
						if (element.selectedIndex > -1) {
							instance.addParameter(name, element.value);
						}
						break;
					case "select-multiple":
						if (element.selectedIndex > -1) {
							var j = element.selectedIndex;
							var option, value;
							for (; j < element.options.length; j++) {
								option = element.options[j];
								if (option.selected) {
									value = kernel.lang.isUndefined(
											option.attributes, "value") ? option.text
											: option.value;
									instance.addParameter(name, value);
								}
							}
						}
						break;
					case "file":
					case "image":
					case "reset":
					case "button":
					case "submit":
						break;
					default:
						instance.addParameter(name, element.value);
					}
				}
			}
		};

		/**
		 * @function kernel.external:net.QueryPart#removeParameter
		 * @param {string}
		 *            name
		 */
		this.removeParameter = function(name) {
			list.forEach(function(param) {
				if (param.name === name) {
					list.remove(param);
				}
			});
		};

		/**
		 * @function kernel.external:net.QueryPart#getParameterNames
		 * @returns {string[]}
		 */
		this.getParameterNames = function() {
			var names = new kernel.util.Set();
			list.forEach(function(param) {
				names.add(param.name);
			});
			return names.toArray();
		};

		/**
		 * @function kernel.external:net.QueryPart#getParameterValue
		 * @param {string}
		 *            name
		 * @returns {string[]}
		 */
		this.getParameterValues = function(name) {
			var arr = [];
			list.forEach(function(param) {
				if (param.name === name) {
					arr.push(param.value);
				}
			});
			return arr;
		};

		/**
		 * @function kernel.external:net.QueryPart#getParameter
		 * @param {string}
		 *            name
		 * @returns {string}
		 */
		this.getParameter = function(name) {
			return this.getParameterValues(name).toString();
		};

		/**
		 * @function kernel.external:net.QueryPart#clear
		 */
		this.clear = function() {
			list.clear();
		};

		/**
		 * @function kernel.external:net.QueryPart#size
		 * @returns {number}
		 */
		this.size = function() {
			return list.size();
		};

		/**
		 * @function kernel.external:net.QueryPart#serializeToString
		 * @returns {string}
		 */
		this.serializeToString = function() {
			var arr = [];
			list.forEach(function(param) {
				arr.push(encodeURIComponent(param.name) + "="
						+ encodeURIComponent(param.value));
			});
			return arr.join("&");
		};

		/**
		 * @function kernel.external:net.QueryPart#toJSON
		 * @returns {string}
		 */
		this.toJSON = function() {
			var obj = {};
			list.forEach(function(param) {
				var arr = param.name.split(".");
				var i = 0;
				var tmp = obj;
				while (i < arr.length) {
					var key = arr[i++];

					if (i < length) {
						if (!tmp.hasOwnProperty(key))
							tmp[key] = {};
					} else {
						if (tmp.hasOwnProperty(key)) {
							if (kernel.lang.isArray(tmp, key))
								tmp[key].push(param.value);
							else
								tmp[key] = [ tmp[key], param.value ];
						} else {
							tmp[key] = param.value;
						}
					}
				}
			});
			return kernel.json.stringify(obj);
		};
	};

	/**
	 * @class kernel.external:net.URLParser
	 * @param {string}
	 *            url
	 */
	kernel.net.URLParser = function(url) {
		var instance = this;
		var _protocol = "";
		var _username = "";
		var _password = "";
		var _host = "";
		var _port = "";
		var _pathname = "";
		var _search = "";
		var _hash = "";

		/**
		 * @function kernel.external:net.URLParser#getProtocol
		 * @returns {string}
		 */
		this.getProtocol = function() {
			return _protocol;
		};

		/**
		 * @function kernel.external:net.URLParser#getUsername
		 * @returns {string}
		 */
		this.getUsername = function() {
			return _username;
		};

		/**
		 * @function kernel.external:net.URLParser#getPassword
		 * @returns {string}
		 */
		this.getPassword = function() {
			return _password;
		};

		/**
		 * @function kernel.external:net.URLParser#getHost
		 * @returns {string}
		 */
		this.getHost = function() {
			return _host;
		};

		/**
		 * @function kernel.external:net.URLParser#getPort
		 * @returns {string}
		 */
		this.getPort = function() {
			return _port;
		};

		/**
		 * @function kernel.external:net.URLParser#getHostname
		 * @returns {string}
		 */
		this.getHostname = function() {
			if (_host) {
				return _host + (_port ? ":" + _port : "");
			}
			return "";
		};

		/**
		 * @function kernel.external:net.URLParser#getPathname
		 * @returns {string}
		 */
		this.getPathname = function() {
			return _pathname;
		};

		/**
		 * @function kernel.external:net.URLParser#getSearch
		 * @returns {string}
		 */
		this.getSearch = function() {
			if (_search) {
				return _search.indexOf("?") === 0 ? _search : "?" + _search;
			}
			return "";
		};

		/**
		 * @function kernel.external:net.URLParser#getHash
		 * @returns {string}
		 */
		this.getHash = function() {
			if (_hash) {
				return _hash.indexOf("#") === 0 ? _hash : "#" + _hash;
			}
			return "";
		};

		/**
		 * @function kernel.external:net.URLParser#setProtocol
		 * @param {string}
		 *            protocol
		 */
		this.setProtocol = function(protocol) {
			var result = /^([A-Za-z]+[A-Za-z0-9\.\+\-]*[A-Za-z0-9]+:)/g
					.exec(protocol);
			if (result) {
				_protocol = result[0];
				debug && console.log("URLParser#setProtocol", _protocol);
			} else {
				kernel.debug({
					key : "failure",
					params : [ "protocol=" + protocol ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		};

		/**
		 * @function kernel.external:net.URLParser#setUsername
		 * @param {string}
		 *            username
		 */
		this.setUsername = function(username) {
			var result = /\w*/g.exec(username);
			if (result) {
				_username = result[0];
				debug && console.log("URLParser#setUsername", _username);
			} else {
				kernel.debug({
					key : "failure",
					params : [ "username=" + username ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		};

		/**
		 * @function kernel.external:net.URLParser#setPassword
		 * @param {string}
		 *            password
		 */
		this.setPassword = function(password) {
			var result = /\w*/g.exec(password);
			if (result) {
				_password = result[0];
				debug && console.log("URLParser#setPassword", _password);
			} else {
				kernel.debug({
					key : "failure",
					params : [ "password=" + password ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		};

		/**
		 * @function kernel.external:net.URLParser#setHost
		 * @param {string}
		 *            host
		 */
		this.setHost = function(host) {
			var result = /^([\w\u4e00-\u9fa5]+[\w\u4e00-\u9fa5\-\.]*[\w\u4e00-\u9fa5]+)*$/g
					.exec(host);
			if (result) {
				_host = result[0];
				debug && console.log("URLParser#setHost", _host);
			} else {
				kernel.debug({
					key : "failure",
					params : [ "host=" + host ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		};

		/**
		 * @function kernel.external:net.URLParser#setPort
		 * @param {string}
		 *            port
		 */
		this.setPort = function(port) {
			var result = /\d*/.exec(port);
			if (result) {
				_port = result[0];
				debug && console.log("URLParser#setPort", _port);
			} else {
				kernel.debug({
					key : "failure",
					params : [ "port=" + port ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		};

		/**
		 * @function kernel.external:net.URLParser#setHostname
		 * @param {string}
		 *            hostname
		 */
		this.setHostname = function(hostname) {
			var result = /^([\w\u4e00-\u9fa5]+[\w\u4e00-\u9fa5\-\.]*[\w\u4e00-\u9fa5]+)+:?(\d+)?$/g
					.exec(hostname);
			if (result) {
				this.setHost(result[1]);
				this.setPort(result[2]);
			} else {
				kernel.debug({
					key : "failure",
					params : [ "hostname=" + hostname ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		};

		/**
		 * @function kernel.external:net.URLParser#setPathname
		 * @param {string}
		 *            pathname
		 */
		this.setPathname = function(pathname) {
			var result = /^\/?[^\?#]*/g.exec(pathname);
			if (result) {
				_pathname = result[0];
				debug && console.log("URLParser#setPathname", _pathname);
			} else {
				kernel.debug({
					key : "failure",
					params : [ "pathname=" + pathname ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		};

		/**
		 * @function kernel.external:net.URLParser#setSearch
		 * @param {string}
		 *            search
		 */
		this.setSearch = function(search) {
			var result = /^\??([^#]+)?/g.exec(search);
			if (result) {
				_search = result[0];
				debug && console.log("URLParser#setSearch", _search);
			} else {
				kernel.debug({
					key : "failure",
					params : [ "search=" + search ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		};

		/**
		 * @function kernel.external:net.URLParser#setHash
		 * @param {string}
		 *            hash
		 */
		this.setHash = function(hash) {
			var result = /^#?\w*/g.exec(hash);
			if (result) {
				_hash = result[0];
				debug && console.log("URLParser#setHash", _hash);
			} else {
				kernel.debug({
					key : "failure",
					params : [ "hash=" + hash ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		};

		/**
		 * @function kernel.external:net.URLParser#parseFromString
		 * @param {string}
		 *            url
		 */
		this.parseFromString = function(url) {
			debug && console.log("URLParser#parseFromString", url);

			var boo = false;
			(function(regExp, setter) {
				if (url) {
					var boo = setter(regExp.exec(url));
					if (boo === true && regExp.lastIndex > 0) {
						url = url.substr(regExp.lastIndex);
					}
				}
				return arguments.callee;
			})(
					/^([A-Za-z]+[A-Za-z0-9\.\+\-]*[A-Za-z0-9]+:\/\/)/g,
					function(result) {
						debug
								&& console.log("URLParser#parseFromString",
										"protocol", result);
						if (result) {
							instance.setProtocol(result[1]);
							return boo = true;
						}
						return false;
					})(
					/^(\w+):?(\w+)?@/g,
					function(result) {
						debug
								&& console.log("URLParser#parseFromString",
										"user&pass", result);
						if (result) {
							instance.setUsername(result[1]);
							instance.setPassword(result[2]);
							return boo = true;
						}
						return false;
					})(
					/^([\w\u4e00-\u9fa5]+[^\/:\?#]*):?(\d+)?/g,
					function(result) {
						debug
								&& console.log("URLParser#parseFromString",
										"hostname", result);
						if (result) {
							if (result[2] || boo) {
								instance.setHostname(result[0]);
								return true;
							}
						}
						return false;
					})(
					/^\/?[^\?#]+/g,
					function(result) {
						debug
								&& console.log("URLParser#parseFromString",
										"pathname", result);
						if (result) {
							instance.setPathname(result[0]);
							return true;
						}
						return false;
					})(
					/^\??([^#]+)?/g,
					function(result) {
						debug
								&& console.log("URLParser#parseFromString",
										"search", result);
						if (result) {
							instance.setSearch(result[0]);
							return true;
						}
						return false;
					})(
					/^#?\w*/g,
					function(result) {
						debug
								&& console.log("URLParser#parseFromString",
										"hash", result);
						if (result) {
							instance.setHash(result[0]);
							return true;
						}
						return false;
					});
		};

		/**
		 * @function kernel.external:net.URLParser#toString
		 * @returns {string}
		 */
		this.toString = function() {
			var url = "";
			if (/^(\.\.\/|\.\/)/g.test(_pathname)) {
				url += _pathname;
			} else {
				if (_protocol) {
					url += _protocol + "//";
				}

				if (_username) {
					url += _username;
					if (_password) {
						url += ":" + _password;
					}
					url += "@";
				}

				url += this.getHostname();
				if (_pathname) {
					if (url) {
						url += "/";
						url += _pathname.replace(/^\//g, "");
					} else {
						url += _pathname;
					}
				}
			}
			url += this.getSearch() + this.getHash();
			debug && console.log("URLParser#toString", url);
			return url;
		};

		!kernel.lang.isBlank(url) && this.parseFromString(url);
	};

})(this, this["kernel@1.3"], false);(function(window, kernel, debug) {

	/**
	 * @external kernel.xml
	 */
	kernel.xml = {};

	/**
	 * @function kernel.external:xml.createXMLDocument
	 * @returns {?XMLDocument}
	 */
	kernel.xml.createXMLDocument = function() {
		var dom = null;
		try {
			dom = document.implementation.createDocument("", "", null);
		} catch (e1) {
			try {
				dom = new ActiveXObject("Microsoft.XMLDOM");
			} catch (e2) {
				kernel.debug({
					key : "catch_exception",
					params : [ e2.message ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		}
		return dom;
	};

	/**
	 * 
	 * @function kernel.external:xml.parseXMLDocument
	 * @param {(string|Node)}
	 *            xml
	 * @returns {?XMLDocument}
	 */
	kernel.xml.parseXMLDocument = function(xml) {
		var dom;
		if (xml) {
			dom = kernel.xml.getDocument(xml);
		} else {
			return null;
		}
		try {
			if (dom) {
				if (/^parsererror$/i.test(dom.documentElement.nodeName))
					return null;
				else
					return dom;
			} else if (window.DOMParser) {
				debug && console.log("parseXMLDocument", "DOMParser");
				dom = new DOMParser().parseFromString(xml, "application/xml");
			} else {
				debug && console.log("parseXMLDocument", "ActiveXObject");
				dom = new ActiveXObject("Microsoft.XMLDOM");
				dom.async = "false";
				dom.loadXML(xml);
			}
		} catch (e) {
			kernel.debug({
				key : "catch_exception",
				params : [ e.message ],
				print : function(msg) {
					console.warn(msg);
				}
			});
			return null;
		}
		return arguments.callee(dom);
	};

	/**
	 * @function kernel.external:xml.serializer
	 * @param {Node}
	 *            node
	 * @returns {string}
	 */
	kernel.xml.serializer = function(node) {
		var str = "";
		try {
			if (window.XMLSerializer) {
				str = new XMLSerializer().serializeToString(node);
				debug && console.log("serializer", "XMLSerializer");
			} else if ("xml" in node) {
				str = node.xml;
				debug && console.log("serializer", "xml property");
			} else {
				kernel.debug({
					key : "failure",
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		} catch (e) {
			kernel.debug({
				key : "catch_exception",
				params : [ e.message ],
				print : function(msg) {
					console.warn(msg);
				}
			});
		}
		return str;
	};

	/**
	 * @function kernel.external:xml.getDocument
	 * @param {Node}
	 *            node
	 * @returns {?Document}
	 */
	kernel.xml.getDocument = function(node) {
		var dom = null;
		if (kernel.lang.isNumber(node, "nodeType")) {
			switch (node.nodeType) {
			case 9:
				dom = node;
				break;
			default:
				dom = node.ownerDocument || node.document;
			}
		}
		return dom;
	};

	/**
	 * @function kernel.external:xml.getDefaultView
	 * @param {Node}
	 *            node
	 * @returns {?(Object|Window)}
	 */
	kernel.xml.getDefaultView = function(node) {
		var view = null;
		if (node) {
			if (node.nodeType === 9) {
				view = node.defaultView || node.parentWindow;
			} else {
				var dom = kernel.xml.getDocument(node);
				view = arguments.callee(dom);
			}
		}
		return view;
	};

	/**
	 * @function kernel.external:xml.escapeXML
	 * @since 1.2
	 * @param {string}
	 *            xml
	 * @returns {string}
	 */
	kernel.xml.escapeXML = function(xml) {
		return String(xml).replace(/&/g, "&amp;").replace(/</g, "&lt;")
				.replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g,
						"&quot;");
	};

	/**
	 * @function kernel.external:xml.unescapeXML
	 * @since 1.3
	 * @param {string}
	 *            text
	 * @returns {string}
	 */
	kernel.xml.unescapeXML = function(text) {
		return String(text).replace(/&lt;/g, "<").replace(/&gt;/g, ">")
				.replace(/&apos;/g, "'").replace(/&quot;/g, "\"").replace(
						/&amp;/g, "&");
	};

	/**
	 * @class kernel.external:xml.Analyzer
	 */
	kernel.xml.Analyzer = function() {
	};

	/* xml --> js */
	/**
	 * @function kernel.external:xml.Analyzer#filterChildNodes
	 * @param {Node}
	 *            node
	 * @returns {?(NodeList|Array)}
	 */
	kernel.xml.Analyzer.prototype.filterChildNodes = function(node) {
		return node.childNodes;
	};

	/**
	 * @function kernel.external:xml.Analyzer#filterAttributes
	 * @param {Node}
	 *            node
	 * @returns {?(NodeList|Array)}
	 */
	kernel.xml.Analyzer.prototype.filterAttributes = function(node) {
		if (node.nodeType === 1) {
			return node.attributes;
		} else {
			return null;
		}
	};

	/**
	 * @function kernel.external:xml.Analyzer#createObject
	 * @param {Node}
	 *            node
	 * @param {*}
	 *            obj
	 */
	kernel.xml.Analyzer.prototype.createObject = function(node, obj) {
		switch (node.nodeType) {
		case 1:
		case 9:
		case 11:
			if (kernel.lang.isUndefined(obj))
				obj = {};
			break;
		case 3:
		case 4:
		case 7:
		case 8:
			obj = node.data;
			break;
		}
		return obj;
	};

	/**
	 * @function kernel.external:xml.Analyzer#setProperty
	 * @param {Node}
	 *            node
	 * @param {Object}
	 *            obj
	 * @param {string}
	 *            key
	 * @param {*}
	 *            value
	 */
	kernel.xml.Analyzer.prototype.setProperty = function(node, obj, key, value) {
		obj[key] = value;
	};

	/**
	 * @function kernel.external:xml.Analyzer#parseValue
	 * @param {Node}
	 *            node
	 * @param {*}
	 *            value
	 * @returns {*}
	 */
	kernel.xml.Analyzer.prototype.parseValue = function(node, value) {
		return value;
	};

	/* js --> xml */
	/**
	 * @function kernel.external:xml.Analyzer#convert
	 * @param {Object}
	 *            obj
	 * @param {Node}
	 *            parentNode
	 * @returns {Object}
	 */
	kernel.xml.Analyzer.prototype.convert = function(obj, parentNode) {
		return obj;
	};

	/**
	 * @function kernel.external:xml.Analyzer#returnNodeType
	 * @param {Object}
	 *            obj
	 * @param {string}
	 *            key
	 * @param {*}
	 *            value
	 * @returns {number}
	 */
	kernel.xml.Analyzer.prototype.returnNodeType = function(obj, key, value) {
		var nodeType;
		switch (key) {
		case "#comment":
			nodeType = 8;
			break;
		case "#cdata-section":
			nodeType = 4;
			break;
		case "#text":
			nodeType = 3;
			break;
		default:
			nodeType = 1;
		}
		return nodeType;
	};

	/**
	 * @function kernel.external:xml.Analyzer#returnNodeName
	 * @param {Object}
	 *            obj
	 * @param {string}
	 *            key
	 * @param {*}
	 *            value
	 * @returns {string}
	 */
	kernel.xml.Analyzer.prototype.returnNodeName = function(obj, key, value) {
		return key;
	};

	/**
	 * @function kernel.external:xml.Analyzer#returnNodeValue
	 * @param {Object}
	 *            obj
	 * @param {string}
	 *            key
	 * @param {*}
	 *            value
	 * @returns {*}
	 */
	kernel.xml.Analyzer.prototype.returnNodeValue = function(obj, key, value) {
		return value;
	};

	/**
	 * @function kernel.external:xml.Analyzer#createUnknownNode
	 * @param {Object}
	 *            obj
	 * @param {string}
	 *            key
	 * @param {*}
	 *            value
	 * @param {number}
	 *            nodeType
	 * @param {string}
	 *            nodeName
	 * @param {*}
	 *            nodeValue
	 * @param {Node}
	 *            parentNode
	 */
	kernel.xml.Analyzer.prototype.createUnknownNode = function(obj, key, value,
			nodeType, nodeName, nodeValue, parentNode) {
	};

	/**
	 * @function kernel.external:xml.Analyzer#multiple
	 * @param {Object}
	 *            obj
	 * @param {string}
	 *            key
	 * @param {*}
	 *            value
	 * @param {number}
	 *            nodeType
	 * @param {string}
	 *            nodeName
	 * @param {*}
	 *            nodeValue
	 * @returns {boolean}
	 */
	kernel.xml.Analyzer.prototype.multiple = function(obj, key, value,
			nodeType, nodeName, nodeValue) {
		return kernel.lang.isArray(nodeValue);
	};

	/**
	 * @function kernel.external:xml.Analyzer#forEach
	 * @param {Object}
	 *            obj
	 * @param {string}
	 *            key
	 * @param {*}
	 *            value
	 * @param {number}
	 *            nodeType
	 * @param {string}
	 *            nodeName
	 * @param {*}
	 *            nodeValue
	 * @param {kernel.external:xml.Analyzer~forEachCallback}
	 *            callback
	 * @returns {boolean}
	 */
	kernel.xml.Analyzer.prototype.forEach = function(obj, key, value, nodeType,
			nodeName, nodeValue, callback) {
		for ( var i in nodeValue)
			callback(nodeValue[i]);
	};

	/**
	 * @class kernel.external:xml.Transformer
	 */
	kernel.xml.Transformer = function(analyzer) {

		/**
		 * @function kernel.external:xml.Transformer#attachTo
		 * @param {Object}
		 *            obj
		 * @param {Node}
		 *            node
		 * @returns {Object}
		 */
		this.attachTo = function(obj, node) {

			var nodeList = analyzer.filterChildNodes(node);
			debug && console.log("Transformer#attachTo", "nodeList:", nodeList);

			var attributes = analyzer.filterAttributes(node);
			debug
					&& console.log("Transformer#attachTo", "attributes:",
							attributes);

			debug && console.log("Transformer#attachTo", "before", node, obj);
			obj = analyzer.createObject(node, obj);
			debug && console.log("Transformer#attachTo", "after", node, obj);

			if (kernel.lang.isObject(obj)) {

				if (attributes) {
					var attr;
					for (var i = 0, len = attributes.length; i < len; i++) {
						attr = attributes[i];
						analyzer.setProperty(attr, obj, attr.name, analyzer
								.parseValue(attr, attr.value));
					}
				}

				if (nodeList) {
					var child, key, value;
					for (var i = 0, len = nodeList.length; i < len; i++) {
						child = nodeList[i];
						key = child.nodeName;
						value = obj[key];
						analyzer.setProperty(child, obj, key, arguments.callee(
								value, child));
					}
				}

				return obj;
			} else {
				if ((!attributes || attributes.length === 0) && nodeList
						&& nodeList.length === 1 && nodeList[0].nodeType === 3) {
					return analyzer.parseValue(node, nodeList[0].data);
				}
			}
			return analyzer.parseValue(node, obj);
		};

		/**
		 * @function kernel.external:xml.Transformer#toObject
		 * @param {Node}
		 *            node
		 * @returns {Object}
		 */
		this.toObject = function(node) {
			return this.attachTo({}, node);
		};

		/**
		 * @function kernel.external:xml.Transformer#appendTo
		 * @throws {Error}
		 * @param {Node}
		 *            parentNode
		 * @param {Object}
		 *            obj
		 */
		this.appendTo = function(parentNode, obj) {
			var xmlDOM = kernel.xml.getDocument(parentNode);
			obj = analyzer.convert(obj, parentNode);
			var value, nodeType, nodeName, nodeValue;
			for ( var key in obj) {
				value = obj[key];
				debug
						&& console.log("Transformer#appendTo", "before", obj,
								key, value);
				nodeType = analyzer.returnNodeType(obj, key, value);
				nodeName = analyzer.returnNodeName(obj, key, value);
				nodeValue = analyzer.returnNodeValue(obj, key, value);
				debug
						&& console.log("Transformer#appendTo", "after",
								nodeType, nodeName, nodeValue);

				switch (nodeType) {
				case 1:
					var appendTo = arguments.callee;
					if (analyzer.multiple(obj, key, value, nodeType, nodeName,
							nodeValue)) {
						var callback = function(obj) {
							var element = xmlDOM.createElement(nodeName);
							parentNode.appendChild(element);
							if (kernel.lang.isObject(obj)) {
								appendTo(element, obj);
							} else if (!kernel.lang.isUndefined(obj)) {
								element.appendChild(xmlDOM.createTextNode(obj));
							}
						};
						analyzer.forEach(obj, key, value, nodeType, nodeName,
								nodeValue, callback);
					} else {
						try {
							var element = xmlDOM.createElement(nodeName);
							parentNode.appendChild(element);
							if (kernel.lang.isObject(nodeValue)) {
								appendTo(element, nodeValue);
							} else if (!kernel.lang.isUndefined(nodeValue)) {
								element.appendChild(xmlDOM
										.createTextNode(nodeValue));
							}
						} catch (e) {
							kernel.debug({
								params : [ "Transformer#appendTo", "Element",
										obj, nodeName, nodeValue ],
								print : function(msg) {
									console.warn(msg);
								}
							});
							throw e;
						}
					}
					break;
				case 2:
					parentNode.setAttribute(nodeName, nodeValue);
					break;
				case 3:
					parentNode.appendChild(xmlDOM.createTextNode(nodeValue));
					break;
				case 4:
					parentNode
							.appendChild(xmlDOM.createCDATASection(nodeValue));
					break;
				case 7:
					if (analyzer.multiple(obj, key, value, nodeType, nodeName,
							nodeValue)) {
						var callback = function(str) {
							try {
								var node = xmlDOM.createProcessingInstruction(
										nodeName, str);
								parentNode.appendChild(node);
							} catch (e) {
								kernel.debug({
									key : "catch_exception",
									params : [ e.message ],
									print : function(msg) {
										console.warn(msg);
									}
								});
							}
						};
						analyzer.forEach(obj, key, value, nodeType, nodeName,
								nodeValue, callback);
					} else {
						try {
							parentNode.appendChild(xmlDOM
									.createProcessingInstruction(nodeName,
											nodeValue));
						} catch (e) {
							kernel.debug({
								params : [ "Transformer#appendTo",
										"ProcessingInstruction", obj, nodeName,
										nodeValue ],
								print : function(msg) {
									console.warn(msg);
								}
							});
							throw e;
						}
					}
					break;
				case 8:
					parentNode.appendChild(xmlDOM.createComment(nodeValue));
					break;
				default:
					analyzer.createUnknownNode(obj, key, value, nodeType,
							nodeName, nodeValue, parentNode);
				}
			}
		};

		/**
		 * @function kernel.external:xml.Transformer#toXMLDocument
		 * @param {Object}
		 *            obj
		 * @param {string}
		 *            rootName
		 * @returns {XMLDocument}
		 */
		this.toXMLDocument = function(obj, rootName) {
			var xmlDOM = kernel.xml.createXMLDocument();
			if (xmlDOM) {
				var root = xmlDOM.createElement(rootName);
				xmlDOM.appendChild(root);
				this.appendTo(root, obj);
			}
			return xmlDOM;
		};
	};

})(this, this["kernel@1.3"], false);
/**
 * @callback kernel.external:xml.Analyzer~forEachCallback
 * @param {Object}
 *            obj
 */
(function(window, kernel, debug) {

	var sucStatus = {
		0 : 200,
		1223 : 204
	};

	var URLENCODED = "application/x-www-form-urlencoded; charset=UTF-8";
	var PLAINTEXT = "text/plain; charset=UTF-8";

	/**
	 * @external kernel.ajax
	 */
	kernel.ajax = {};

	/**
	 * @typedef {Object} kernel.external:ajax~RequestOptions
	 * @property {string} url
	 * @property {string} [method]
	 * @property {number} [timeout]
	 * @property {(string|FormData)} [data]
	 * @property {function} [success]
	 * @property {function} [error]
	 * @property {string} [responseType]
	 */

	/**
	 * @function kernel.external:ajax.send
	 * @since 1.1
	 * @param {kernel.external:ajax~RequestOptions}
	 *            param
	 * @returns {kernel.external:util.Promise}
	 */
	/**
	 * @function kernel.external:ajax.send
	 * @since 1.3
	 * @param {String}
	 *            url
	 * @param {kernel.external:ajax~RequestOptions}
	 *            [opt]
	 * @returns {kernel.external:util.Promise}
	 */
	kernel.ajax.send = function(url, opt) {
		if (kernel.lang.isObject(url)) {
			opt = url;
			url = opt.url;
		} else {
			opt = opt || {};
		}
		var data = opt.data;
		var success = opt.success;
		var error = opt.error;
		var responseType = opt.responseType;

		var req = new kernel.ajax.HttpRequest(url);
		req.method = opt.method;
		req.timeout = opt.timeout;

		if ("json" === responseType) {
			req.responseType = "text";
			req.overrideMimeType("application/json");
		} else {
			req.responseType = responseType;
		}

		var promise = new kernel.util.Promise(function(resolve, reject) {
			req.onLoad = function() {
				var value;
				switch (responseType) {
				case "document":
					value = req.getResponseXML();
					value = kernel.xml.parseXMLDocument(value);
					break;
				case "json":
					try {
						value = kernel.json.parse(req.getResponseText(),
								kernel.json.dateReviver);
					} catch (e) {
						kernel.debug({
							params : [ e.message, req.getResponseText() ],
							print : function(msg) {
								console.warn(msg);
							}
						});
						value = null;
					}
					break;
				default:
					value = req.getResponse() || req.getResponseText();
				}
				resolve(value);
			};
			req.onError = req.onTimeout = req.onAbort = function() {
				reject();
			};
			req.send(data);
		});

		return promise.then(success, error);
	};

	function getStatus(xhr) {
		return sucStatus[xhr.status] || xhr.status;
	}

	function isSupportedOnLoad(xhr) {
		var boo = xhr ? "onload" in xhr : false;
		debug && console.log("~isSupportedOnLoad : " + boo);
		return boo;
	}
	function isSupportedOnError(xhr) {
		var boo = xhr ? "onerror" in xhr : false;
		debug && console.log("~isSupportedOnError : " + boo);
		return boo;
	}
	function isSupportedOnAbort(xhr) {
		var boo = xhr ? "onabort" in xhr : false;
		debug && console.log("~isSupportedOnAbort : " + boo);
		return boo;
	}
	function isSupportedOnTimeout(xhr) {
		var boo = xhr ? "ontimeout" in xhr : false;
		debug && console.log("~isSupportedOnTimeout : " + boo);
		return boo;
	}
	function isSupportedOnProgress(xhr) {
		var boo = xhr ? "onprogress" in xhr : false;
		debug && console.log("~isSupportedOnProgress : " + boo);
		return boo;
	}
	function isSupportedUpload(xhr) {
		var boo = xhr ? "upload" in xhr : false;
		debug && console.log("~isSupportedUpload : " + boo);
		return boo;
	}
	function isSupportedOverrideMimeType(xhr) {
		var boo = xhr ? "overrideMimeType" in xhr : false;
		debug && console.log("~isSupportedOverrideMimeType : " + boo);
		return boo;
	}

	function createXMLHttp() {
		var xhr = null;
		var versions = [ "Msxml2.XMLHttp.5.0", "Msxml2.XMLHttp.4.0",
				"Msxml2.XMLHttp.3.0", "Msxml2.XMLHttp", "Microsoft.XMLHttp" ];
		var version;
		for (var i = 0, len = versions.length; i < len; i++) {
			version = versions[i];
			try {
				xhr = new ActiveXObject(version);
			} catch (e) {
			}
		}
		return xhr;
	}

	/**
	 * @class kernel.external:ajax.WebRequest
	 */
	kernel.ajax.WebRequest = function() {
	};
	/**
	 * GET, POST, PUT, DELETE
	 * 
	 * @member {string} kernel.external:ajax.WebRequest#method
	 * @default GET
	 */
	kernel.ajax.WebRequest.prototype.method = "GET";

	/**
	 * @member {number} kernel.external:ajax.WebRequest#timeout
	 * @default 0
	 */
	kernel.ajax.WebRequest.prototype.timeout = 0;
	/**
	 * @member {string} kernel.external:ajax.WebRequest#url
	 */
	kernel.ajax.WebRequest.prototype.url = "";
	/**
	 * 
	 * @function kernel.external:ajax.WebRequest#send
	 * @abstract
	 * @param {kernel~T}
	 *            [data]
	 */
	kernel.ajax.WebRequest.prototype.send = function(data) {
	};
	/**
	 * @function kernel.external:ajax.WebRequest#abort
	 * @abstract
	 */
	kernel.ajax.WebRequest.prototype.abort = function() {
	};
	/**
	 * @function kernel.external:ajax.WebRequest#onLoad
	 * @abstract
	 */
	kernel.ajax.WebRequest.prototype.onLoad = function() {
	};
	/**
	 * @function kernel.external:ajax.WebRequest#onAbort
	 * @abstract
	 */
	kernel.ajax.WebRequest.prototype.onAbort = function() {
	};
	/**
	 * @function kernel.external:ajax.WebRequest#onTimeout
	 * @abstract
	 */
	kernel.ajax.WebRequest.prototype.onTimeout = function() {
	};
	/**
	 * @function kernel.external:ajax.WebRequest#onError
	 * @abstract
	 */
	kernel.ajax.WebRequest.prototype.onError = function() {
	};

	/**
	 * 
	 * @function kernel.external:ajax.WebRequest#getResponseText
	 * @abstract
	 * @returns {string}
	 */
	kernel.ajax.WebRequest.prototype.getResponseText = function() {
		return "";
	};

	/**
	 * 
	 * @class kernel.external:ajax.HttpRequest
	 * @augments kernel.external:ajax.WebRequest
	 * @param {string}
	 *            url
	 */
	kernel.ajax.HttpRequest = function(url) {
		kernel.ajax.WebRequest.call(this);
		this.constructor = arguments.callee;

		var xhr = null;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
			if (kernel.lang.isObject(xhr, "_object")) {
				xhr = xhr._object;
			}
			debug && console.log("HttpRequest", "XMLHttpRequest", xhr);
		} else {
			xhr = createXMLHttp();
			debug && console.log("HttpRequest", "ActiveXObject", xhr);
		}

		var headerMap = new kernel.util.HashMap();
		var uploadProgress = isSupportedUpload(xhr) ? 0 : -1;
		var downloadProgress = isSupportedOnProgress(xhr) ? 0 : -1;
		var _mimetype = null;

		var instance = this;
		var timeoutID = null;
		var status = 0;

		function _setTimeout(timeout) {
			if (timeout > 0 && isFinite(timeout)) {
				timeoutID = setTimeout(function() {
					onTimeout();
					xhr.abort();
				}, timeout);
			}
		}
		function _clearTimeout() {
			if (timeoutID !== null) {
				clearTimeout(timeoutID);
				timeoutID = null;
			}
		}

		function load() {
			_clearTimeout();
			if (status !== 0)
				return;

			if (downloadProgress >= 0 && downloadProgress < 1) {
				downloadProgress = 1;
				instance.onDownload();
			}

			status = 1;
			if (isSupportedOnAbort(xhr)) {
				instance.onLoad();
			} else {
				/* ie8- */
				setTimeout(function() {
					instance.onLoad();
				}, 0);
			}
		}
		function error() {
			_clearTimeout();
			if (status === 0 || status === 2) {
				status = -1;
				setTimeout(function() {
					instance.onError();
				});
			}
		}
		function onTimeout() {
			if (status === 0 || status === 3) {
				status = -1;
				instance.onTimeout();
			}
		}
		function onAbort() {
			_clearTimeout();
			if (status === 0 || status === 4) {
				status = -1;
				instance.onAbort();
			}
		}

		function send(data) {
			if (status !== 0) {
				status = 2;
				error();
				return;
			}

			var async = true;

			if (isSupportedOnLoad(xhr)) {
				xhr.onload = function(event) {
					load();
				};
			} else {
				xhr.onreadystatechange = function(event) {
					if (xhr.readyState === 4) {
						try {
							xhr.responseText;
							xhr.status;
							load();
						} catch (e) {
							kernel.debug({
								key : "browser_error",
								print : function(msg) {
									console.warn(msg, e.message);
								}
							});
							error();
						}
					}
				};
			}

			if (isSupportedOnError(xhr)) {
				xhr.onerror = error;
			}
			if (isSupportedOnAbort(xhr)) {
				xhr.onabort = onAbort;
			}
			if (isSupportedOnTimeout(xhr)) {
				xhr.ontimeout = onTimeout;
			}
			if (isSupportedUpload(xhr)) {
				uploadProgress = 0;
				xhr.upload.onprogress = function(event) {
					if (uploadProgress >= 0 && uploadProgress < 1) {
						event = event || window.event;
						if (event.lengthComputable) {
							uploadProgress = event.loaded / event.total;
							instance.onUpload();
						}
					}
				};
			}
			if (isSupportedOnProgress(xhr)) {
				downloadProgress = 0;
				xhr.onprogress = function(event) {
					if (uploadProgress >= 0 && uploadProgress < 1) {
						uploadProgress = 1;
						instance.onUpload();
					}
					if (downloadProgress >= 0 && downloadProgress < 1) {
						event = event || window.event;
						if (event.lengthComputable) {
							downloadProgress = event.loaded / event.total;
							instance.onDownload();
						}
					}
				};
			}

			if (kernel.lang.isBlank(instance.method)) {
				instance.method = "GET";
			} else {
				instance.method = String(instance.method).toUpperCase();
			}
			try {
				xhr.open(instance.method, instance.url, async);

				if (_mimetype && isSupportedOverrideMimeType(xhr))
					xhr.overrideMimeType(_mimetype);

				switch (instance.method) {
				case "POST":
					if (kernel.lang.isString(data)) {
						xhr.setRequestHeader("Content-Type", URLENCODED);
					}
					break;
				case "PUT":
					if (kernel.lang.isString(data)) {
						xhr.setRequestHeader("Content-Type", PLAINTEXT);
					}
					break;
				}
				xhr.setRequestHeader("Cache-Control", "no-cache");
				xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

				headerMap.forEach(function(value, name) {
					debug && console.log(name, value);
					xhr.setRequestHeader(name, value);
				});

				if (async) {
					if (instance.timeout > 0) {
						if (isSupportedOnTimeout(xhr))
							xhr.timeout = instance.timeout;
						else
							_setTimeout(instance.timeout);
					}
					if (!kernel.lang.isBlank(instance.responseType)
							&& !kernel.lang.isUndefined(xhr, "responseType")) {
						try {
							xhr.responseType = instance.responseType;
						} catch (e) {
						}
					}
				}
				debug && console.log(kernel.json.stringify({
					url : instance.url,
					method : instance.method,
					timeout : instance.timeout,
					data : data
				}, null, "\t"));
				xhr.send(data);
			} catch (e) {
				debug && alert(e.message);
				kernel.debug({
					key : "catch_exception",
					print : function(msg) {
						console.warn(msg, e.message);
					}
				});
				error();
			}
		}

		this.url = url;

		/**
		 * @function kernel.external:ajax.HttpRequest#getStatus
		 * @returns {number}
		 */
		this.getStatus = function() {
			return getStatus(xhr);
		};
		/**
		 * @function kernel.external:ajax.HttpRequest#getStatusText
		 * @returns {string}
		 */
		this.getStatusText = function() {
			return xhr.statusText;
		};

		/**
		 * @function kernel.external:ajax.HttpRequest#overrideMimeType
		 * @param {string}
		 *            mimetype
		 */
		this.overrideMimeType = function(mimetype) {
			_mimetype = mimetype;
		};

		/**
		 * @member {string} kernel.external:ajax.HttpRequest#responseType
		 */
		this.responseType = "";

		/**
		 * @function kernel.external:ajax.HttpRequest#getResponse
		 * @returns {*}
		 */
		this.getResponse = function() {
			return xhr.response;
		};

		/**
		 * @function kernel.external:ajax.HttpRequest#getResponseText
		 * @returns {string}
		 */
		this.getResponseText = function() {
			return xhr.responseText;
		};
		/**
		 * @function kernel.external:ajax.HttpRequest#getResponseXML
		 * @returns {XMLDocument}
		 */
		this.getResponseXML = function() {
			return xhr.responseXML;
		};

		/**
		 * 
		 * @function kernel.external:ajax.HttpRequest#setRequestHeader
		 * @param {string}
		 *            header
		 * @param {string}
		 *            value
		 */
		this.setRequestHeader = function(header, value) {
			headerMap.put(header, value);
		};

		/**
		 * @function kernel.external:ajax.HttpRequest#send
		 * @param {(String|FormData)}
		 *            [data]
		 */
		this.send = function(data) {
			send(data);
		};
		/**
		 * @function kernel.external:ajax.HttpRequest#abort
		 */
		this.abort = function() {
			if (status === 0) {
				status = 4;
				xhr.abort();
				if (!isSupportedOnAbort(xhr)) {
					onAbort();
				}
			}
		};

		/**
		 * @function kernel.external:ajax.HttpRequest#getUploadProgress
		 * @returns {number}
		 */
		this.getUploadProgress = function() {
			return uploadProgress;
		};

		/**
		 * @function kernel.external:ajax.HttpRequest#getDownloadProgress
		 * @returns {number}
		 */
		this.getDownloadProgress = function() {
			return downloadProgress;
		};

	};
	kernel.ajax.HttpRequest.prototype = new kernel.ajax.WebRequest();
	/**
	 * @function kernel.external:ajax.HttpRequest#onUpload
	 * @abstract
	 */
	kernel.ajax.HttpRequest.prototype.onUpload = function() {
	};
	/**
	 * @function kernel.external:ajax.HttpRequest#onDownload
	 * @abstract
	 */
	kernel.ajax.HttpRequest.prototype.onDownload = function() {
	};

	/**
	 * 
	 * @class kernel.external:ajax.CORSRequest
	 * @augments kernel.external:ajax.WebRequest
	 * @param {string}
	 *            url
	 */
	kernel.ajax.CORSRequest = function(url) {
		kernel.ajax.WebRequest.call(this);
		this.constructor = arguments.callee;

		var xdr = null;
		if (window.XMLHttpRequest) {
			xdr = new XMLHttpRequest();
			if (kernel.lang.isObject(xdr, "_object")) {
				xdr = xdr._object;
			}
		}

		if (xdr && "withCredentials" in xdr) {
			debug
					&& console.log("CORSRequest", "XMLHttpRequest2",
							xdr.withCredentials);
		} else if (window.XDomainRequest) {
			/* ie8+ */
			xdr = new XDomainRequest();
			debug && console.log("CORSRequest", "XDomainRequest");
		} else if (window.ActiveXObject) {
			xdr = createXMLHttp();
			debug && console.log("CORSRequest", "XMLHttpRequest1");
		}

		var instance = this;
		var timeoutID = null;
		var status = 0;

		function _setTimeout(timeout) {
			if (timeout > 0 && isFinite(timeout)) {
				timeoutID = setTimeout(function() {
					onTimeout();
					xdr.abort();
				}, timeout);
			}
		}
		function _clearTimeout() {
			if (timeoutID !== null) {
				clearTimeout(timeoutID);
				timeoutID = null;
			}
		}
		function load() {
			_clearTimeout();
			if (status === 0) {
				status = 1;
				setTimeout(function() {
					instance.onLoad();
				}, 0);
			}
		}
		function error() {
			_clearTimeout();
			if (status === 0 || status === 2) {
				status = -1;
				setTimeout(function() {
					instance.onError();
				}, 0);
			}
		}
		function onTimeout() {
			if (status === 0 || status === 3) {
				status = -1;
				instance.onTimeout();
			}
		}
		function onAbort() {
			_clearTimeout();
			if (status === 0 || status === 4) {
				status = -1;
				instance.onAbort();
			}
		}

		function send(data) {
			if (status !== 0) {
				status = 2;
				error();
				return;
			}

			if (isSupportedOnLoad(xdr)) {
				xdr.onload = function(event) {
					load();
				};
			} else {
				xdr.onreadystatechange = function(event) {
					if (xdr.readyState === 4) {
						try {
							xdr.responseText;
							xdr.status;
							load();
						} catch (e) {
							kernel.debug({
								key : "browser_error",
								print : function(msg) {
									console.warn(msg, e.message);
								}
							});
							error();
						}
					}
				};
			}

			if (isSupportedOnError(xdr)) {
				xdr.onerror = error;
			}

			if (isSupportedOnTimeout(xdr)) {
				xdr.ontimeout = onTimeout;
			}

			if (isSupportedOnAbort(xdr)) {
				xdr.onabort = onAbort;
			}

			var url = instance.url;
			try {
				if (/post/ig.test(instance.method)) {
					instance.method = "POST";
					if ("setRequestHeader" in xdr) {
						xdr.open(instance.method, url);
						xdr.setRequestHeader("Content-Type", URLENCODED);
					} else {
						var query = new kernel.net.QueryPart();
						query.addParameterByURL(instance.url);
						query.addParameterByURL(data);

						var urlParser = new kernel.net.URLParser(instance.url);
						urlParser.setSearch(query.serializeToString());
						url = urlParser.toString();
						data = null;

						xdr.open(instance.method, url);
					}
				} else {
					xdr.open(instance.method = "GET", url);
					data = null;
				}

				if ("setRequestHeader" in xdr) {
					xdr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				}

				if (instance.timeout > 0) {
					if (isSupportedOnTimeout(xdr))
						xdr.timeout = instance.timeout;
					else
						_setTimeout(instance.timeout);
				}
				debug && console.log(kernel.json.stringify({
					url : url,
					method : instance.method,
					timeout : instance.timeout,
					data : data
				}, null, "\t"));
				xdr.send(data);
			} catch (e) {
				debug && alert(e.message);
				kernel.debug({
					key : "catch_exception",
					print : function(msg) {
						console.warn(msg, e.message);
					}
				});
				error();
			}
		}

		this.url = url;

		/**
		 * @function kernel.external:ajax.CORSRequest#getResponseText
		 * @returns {string}
		 */
		this.getResponseText = function() {
			return xdr.responseText;
		};

		/**
		 * @function kernel.external:ajax.CORSRequest#send
		 * @param {string}
		 *            data
		 */
		this.send = function(data) {
			send(data);
		};

		/**
		 * @function kernel.external:ajax.CORSRequest#abort
		 */
		this.abort = function() {
			if (status === 0) {
				status = 4;
				xdr.abort();
				if (!isSupportedOnAbort(xdr)) {
					onAbort();
				}
			}
		};
	};
	kernel.ajax.CORSRequest.prototype = new kernel.ajax.WebRequest();

})(this, this["kernel@1.3"], false);(function(window, kernel, debug) {

	/**
	 * @external kernel.html
	 */
	kernel.html = {};

	/**
	 * @function kernel.external:html.createElement
	 * @param {string}
	 *            tagName
	 * @param {Object}
	 *            [properties]
	 * @param {Object}
	 *            [events]
	 * @param {Object}
	 *            [opt]
	 * @param {HTMLDocument}
	 *            [opt.document]
	 * @param {HTMLElement}
	 *            [opt.parentNode]
	 * @param {HTMLElement}
	 *            [opt.nextSibling]
	 * @returns {HTMLElement}
	 */
	kernel.html.createElement = function(tagName, properties, events, opt) {
		!opt && (opt = {});
		var nextSibling = opt.nextSibling || null;
		var parentNode = opt.parentNode
				|| (nextSibling ? nextSibling.parentNode : null);
		var document = kernel.xml.getDocument(parentNode || opt.document
				|| window.document);
		var element = document.createElement(tagName);

		(function(obj, members) {
			for ( var key in members) {
				if (kernel.lang.isObject(members, key)) {
					arguments.callee(obj[key], members[key]);
				} else {
					try {
						obj[key] = members[key];
					} catch (e) {
						window.console
								&& console.warn("createElement", e.message);
					}
				}
			}
		})(element, properties);

		for ( var key in events) {
			if (kernel.lang.isFunction(events, key))
				(function(key, handler) {
					element[key] = function(event) {
						if (!event)
							event = kernel.xml.getDefaultView(document).event;
						handler.call(element, event);
					};
				})(key, events[key]);
		}

		parentNode && parentNode.insertBefore(element, nextSibling);

		return element;
	};

	/**
	 * @function kernel.external:html.getHead
	 * @param {HTMLDocument}
	 *            [document]
	 * @returns {HTMLHeadElement}
	 */
	kernel.html.getHead = function(document) {
		document = kernel.xml.getDocument(document) || window.document;
		var head = document.head || document.getElementsByTagName("HEAD")[0];
		if (!head) {
			head = kernel.html.createElement("HEAD", null, null, {
				parentNode : document.documentElement
			});
		}
		return head;
	};

	/**
	 * @function kernel.external:html.getElementsByClassName
	 * @param {string}
	 *            className
	 * @param {HTMLElement}
	 *            [element]
	 * @returns {(NodeList|Array)}
	 */
	kernel.html.getElementsByClassName = function(className, element) {
		element = element || document.documentElement;
		if (element.getElementsByClassName) {
			return element.getElementsByClassName(className);
		} else {
			var arr = [];
			(function(element) {
				if (kernel.style.hasClassName(element, className)) {
					arr.push(element);
				}
				for (var i = 0, len = element.children.length; i < len; i++) {
					arguments.callee(element.children[i]);
				}
			})(element);
			return arr;
		}
	};

	/**
	 * @function kernel.external:html.loadScript
	 * @param {HTMLDocument}
	 *            document
	 * @param {string}
	 *            url
	 * @param {kernel.external:html~loadScriptCallback}
	 *            [callback]
	 */
	kernel.html.loadScript = function(document, url, callback) {
		var script = kernel.html.createElement("SCRIPT", {
			type : "text/javascript",
			src : url,
			async : true
		});

		if (callback) {
			if ("onload" in script) {
				script.onload = script.onerror = function(event) {
					script.onload = script.onerror = null;
					callback(script);
				};
			} else {
				script.onreadystatechange = function() {
					if (this.readyState === "loaded"
							|| this.readyState === "complete") {
						script.onreadystatechange = null;
						callback(script);
					}
				};
			}
		}
		kernel.html.getHead(document).appendChild(script);
	};

	/**
	 * @function kernel.external:html.importStyle
	 * @param {HTMLDocument}
	 *            document
	 * @param {string}
	 *            url
	 */
	kernel.html.importStyle = function(document, url) {
		kernel.html.createElement("LINK", {
			type : "text/css",
			rel : "stylesheet",
			href : url
		}, null, {
			parentNode : kernel.html.getHead(document)
		});
	};

	/**
	 * @function kernel.external:html.getOffsetParent
	 * @param {HTMLElement}
	 *            element
	 * @returns {HTMLElement}
	 */
	kernel.html.getOffsetParent = function(element) {
		var offsetParent = element.offsetParent;
		if (offsetParent) {
			if (offsetParent.tagName !== "BODY") {
				var css_position = kernel.style.computeStyle(offsetParent,
						"position");
				if (/^(static|)$/gi.test(css_position)) {
					offsetParent = arguments.callee(offsetParent);
				}
			}
		}
		return offsetParent;
	};

	/**
	 * @function kernel.external:html.getChain
	 * @param {HTMLElement}
	 *            element
	 * @returns {HTMLElement[]}
	 */
	kernel.html.getChain = function(element) {
		var chain = [];
		var tmp = element;
		while (tmp && tmp.nodeName !== "HTML") {
			chain.push(tmp);
			tmp = tmp.parentNode;
		}
		return chain;
	};

	/**
	 * @function kernel.external:html.getInnerWidth
	 * @returns {number}
	 */
	kernel.html.getInnerWidth = function() {
		if ("innerWidth" in window) {
			return window.innerWidth;
		} else {
			return document.documentElement.clientWidth;
		}
	};

	/**
	 * @function kernel.external:html.getInnerHeight
	 * @returns {number}
	 */
	kernel.html.getInnerHeight = function() {
		if ("innerHeight" in window) {
			return window.innerHeight;
		} else {
			return document.documentElement.clientHeight;
		}
	};

})(this, this["kernel@1.3"], false);
/**
 * @callback kernel.external:html~loadScriptCallback
 * @param {HTMLScriptElement}
 *            script
 */
(function(window, kernel, debug) {

	/**
	 * @external kernel.i18n
	 */
	kernel.i18n = {};

	function getCodes(language) {
		if (!language)
			return [];
		var arr = language.split(/(?:-|_)/g);
		var codes = [ arr[0] ];
		if (arr.length === 2)
			codes.push(arr[0] + "_" + arr[1].toUpperCase());
		return codes;
	}

	function getResources(name, language) {
		var arr = [ name ];
		var codes = getCodes(language);
		for (var i = 0; i < codes.length; i++)
			arr.push(name + "_" + codes[i]);
		return arr;
	}

	function parseData(text, each) {
		var lines = text.split(/\n/);
		var map = new kernel.util.HashMap();
		var line, pair, key, value;
		for (var i = 0; i < lines.length; i++) {
			line = kernel.lang.trim(lines[i]);
			if (kernel.lang.isBlank(line) || /^#/.test(line))
				continue;

			pair = line.split("=");
			key = kernel.lang.trim(unescape(pair.shift()));
			value = pair.join("=");
			while (/\\$/.test(value)) {
				value = value.substring(0, value.length - 1);
				value += lines[++i];
			}

			value = kernel.lang.trim(value);
			value = kernel.lang.unescapeUnicode(value);

			each && each(key, value);
			map.put(key, value);
		}
		return map;
	}

	function escapeCharacter(value) {
		var i = 0;
		while ((i = value.indexOf("\\", i)) != -1) {
			switch (value.charAt(i + 1)) {
			case "t":
				value = value.substring(0, i) + "\t"
						+ value.substring((i++) + 2);
				break;
			case "r":
				value = value.substring(0, i) + "\r"
						+ value.substring((i++) + 2);
				break;
			case "n":
				value = value.substring(0, i) + "\n"
						+ value.substring((i++) + 2);
				break;
			case "f":
				value = value.substring(0, i) + "\f"
						+ value.substring((i++) + 2);
				break;
			case "\\":
				value = value.substring(0, i) + "\\"
						+ value.substring((i++) + 2);
				break;
			default:
				value = value.substring(0, i) + value.substring(i + 1);
			}
		}
		return value;
	}

	/**
	 * @function kernel.external:i18n.browserLanguage
	 * @returns {string}
	 */
	kernel.i18n.browserLanguage = function() {
		return String(navigator.language || navigator.userLanguage);
	};

	/**
	 * 
	 * @class kernel.external:i18n.Properties
	 * @param {string}
	 *            path
	 */
	kernel.i18n.Properties = function(path) {
		/**
		 * @member {string} kernel.external:i18n.Properties#path
		 */
		this.path = path || "";

		/**
		 * @member {string} kernel.external:i18n.Properties#language
		 */
		this.language = kernel.i18n.browserLanguage();

		/**
		 * @member {boolean} kernel.external:i18n.Properties#cache
		 * @default true
		 */
		this.cache = true;

		var instance = this;
		var msgMap = new kernel.util.HashMap();
		var cacheMap = new kernel.util.HashMap();
		var queue = new kernel.util.Queue();
		var loading = false;

		function load(resources, index, path, callback) {
			if (index < resources.length) {
				var res = resources[index];
				var req = new kernel.ajax.HttpRequest(path + res
						+ ".properties");
				req.setRequestHeader("Accept", "text/plain");
				req.overrideMimeType("text/plain");
				req.onError = function() {
					load(resources, index + 1, path, callback);
				};
				req.onLoad = function() {
					var text = req.getResponseText();
					if (text) {
						parseData(text, function(key, value) {
							msgMap.put(key, value);
						});
					}
					req.onError();
				};
				req.send();
			} else {
				callback();
			}
		}

		/**
		 * @function kernel.external:i18n.Properties#load
		 * @param {string}
		 *            name
		 * @param {function}
		 *            callback
		 */
		this.load = function(name, callback) {
			if (loading) {
				queue.add([ name, callback ]);
			} else {
				var resources = getResources(name, this.language);
				load(resources, 0, this.path, function() {
					loading = false;
					callback && callback();
					var args = queue.poll();
					if (args)
						instance.load.apply(instance, args);
				});
				loading = true;
			}
		};

		/**
		 * @function kernel.external:i18n.Properties#getMessage
		 * @param {string}
		 *            key
		 * @param {...String}
		 *            value
		 * @returns {string}
		 */
		this.getMessage = function(key) {
			var value = null;

			if (this.cache)
				value = cacheMap.get(key);

			if (!kernel.lang.isValue(value)) {
				value = msgMap.get(key);
				if (!value)
					return "???" + key + "???";

				value = escapeCharacter(value);
				if (this.cache)
					cacheMap.put(key, value);
			}

			var obj = {
				bundle : {}
			};
			obj.bundle[key] = value;
			value = kernel.Framework.prototype.getMessage.apply(obj, arguments);
			return value;
		};
	};

})(this, this["kernel@1.3"], false);
(function(window, kernel, debug) {

	/**
	 * @external kernel.json
	 */
	kernel.json = {};

	var BASE64_PREFIX = "data:text/json;base64,";

	var BRACE_L = '{';
	var BRACE_R = '}';
	var BRACKET_L = '[';
	var BRACKET_R = ']';
	var COLON = ':';
	var COLON_SP = ': ';
	var QUOTE = '"';
	var COMMA_CR = ",\n";
	var CR = "\n";
	var COMMA = ',';

	var SPECIAL_REGEXP = /[\x00-\x07\x0b\x0e-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	var UNICODE_REGEXP = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	var ESCAPES_REGEXP = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
	var VALUES_REGEXP = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
	var BRACKETS_REGEXP = /(?:^|:|,)(?:\s*\[)+/g;
	var UNSAFE_REGEXP = /[^\],:{}\s]/;
	var DATE_REGEXP = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;

	function returnUnicode(_char) {
		return '\\u'
				+ ('0000' + (+(_char.charCodeAt(0))).toString(16)).slice(-4);
	}

	var COMMON = [];
	COMMON.push([ /\\/g, '\\\\' ]);
	COMMON.push([ /\"/g, '\\"' ]);
	COMMON.push([ /\x08/g, '\\b' ]);
	COMMON.push([ /\x09/g, '\\t' ]);
	COMMON.push([ /\x0a/g, '\\n' ]);
	COMMON.push([ /\x0c/g, '\\f' ]);
	COMMON.push([ /\x0d/g, '\\r' ]);

	function serializer(str) {
		var arr;
		for (var i = 0, len = COMMON.length; i < len; i++) {
			arr = COMMON[i];
			str = str.replace(arr[0], arr[1]);
		}
		return QUOTE + str.replace(SPECIAL_REGEXP, returnUnicode) + QUOTE;
	}

	function indent(str, space) {
		return str.replace(/^/gm, space);
	}

	function zeroize(num) {
		return num < 10 ? '0' + num : num;
	}

	function dateToString(date) {
		var str = "";
		str += date.getUTCFullYear();
		str += '-';
		str += zeroize(date.getUTCMonth() + 1);
		str += '-';
		str += zeroize(date.getUTCDate());
		str += 'T';
		str += zeroize(date.getUTCHours());
		str += ":";
		str += zeroize(date.getUTCMinutes());
		str += ":";
		str += zeroize(date.getUTCSeconds());
		str += 'Z';
		return str;
	}

	function stringify(obj, key, replacer, space) {
		var value = kernel.lang.isUndefined(obj) ? obj : obj[key];
		var result;

		if (kernel.lang.isString(space)) {
			space = space.substr(0, 10);
		} else if (kernel.lang.isNumber(space) && space >= 1) {
			space = new Array(Math.min(parseInt(space), 10) + 1).join(" ");
		} else {
			space = null;
		}

		if (kernel.lang.isObject(value)) {
			if (!debug && kernel.lang.isFunction(value, "toJSON")) {
				value = value.toJSON();
			} else if (kernel.lang.isDate(value)) {
				value = dateToString(value);
			}
		}

		if (kernel.lang.isFunction(replacer)) {
			value = replacer.call(obj, key, value);
		}

		if (kernel.lang.isString(value)) {
			return serializer(value);
		} else if (kernel.lang.isNumber(value) || kernel.lang.isBoolean(value)) {
			return value;
		} else if (kernel.lang.isFunction(value)
				|| kernel.lang.isUndefined(value)) {
			return undefined;
		} else if (kernel.lang.isArray(value)) {
			var arr = [];
			for (var i = 0, len = value.length; i < len; i++) {
				result = arguments.callee(value, String(i), replacer, space);
				if (!kernel.lang.isUndefined(result))
					arr.push(result);
			}

			if (space && arr.length) {
				return BRACKET_L + CR + indent(arr.join(COMMA_CR), space) + CR
						+ BRACKET_R;
			} else {
				return BRACKET_L + arr.join(COMMA) + BRACKET_R;
			}
		} else if (kernel.lang.isObject(value)) {
			var arr = [];
			var filter = null;
			if (kernel.lang.isArray(replacer)) {
				filter = new kernel.util.List();
				filter.addAll(replacer);
			}
			for ( var _key in value)
				if (value.hasOwnProperty(_key)) {
					if (filter && !filter.contains(_key)) {
						continue;
					}
					result = arguments.callee(value, _key, replacer, space);
					if (!kernel.lang.isUndefined(result))
						arr.push(serializer(_key) + (space ? COLON_SP : COLON)
								+ result);
				}

			if (space && arr.length) {
				return BRACE_L + CR + indent(arr.join(COMMA_CR), space) + CR
						+ BRACE_R;
			} else {
				return BRACE_L + arr.join(COMMA) + BRACE_R;
			}
		}
		return null;
	}

	function parse(data, reviver) {
		if (reviver) {
			return (function(obj, key) {
				var value = obj[key];
				var result;
				if (kernel.lang.isObject(value)) {
					for ( var _key in value)
						if (value.hasOwnProperty(_key)) {
							result = arguments.callee(value, _key);
							if (kernel.lang.isUndefined(result)) {
								delete value[_key];
							} else {
								value[_key] = result;
							}
						}
				}
				return reviver.call(obj, key, value);
			})({
				"" : data
			}, "");
		} else {
			return data;
		}
	}

	/**
	 * @function kernel.external:json.stringify
	 * @param {Object}
	 *            obj
	 * @param {(Array|kernel.external:json~stringifyReplacer)}
	 *            replacer
	 * @param {(String|Number)}
	 *            space
	 * @returns {string}
	 */
	kernel.json.stringify = function(obj, replacer, space) {
		if (!debug && window.JSON && JSON.stringify) {
			return JSON.stringify(obj, replacer, space);
		} else {
			return stringify({
				"" : obj
			}, "", replacer, space);
		}
	};

	/**
	 * @function kernel.external:json.parse
	 * @throws {Error}
	 * @param {string}
	 *            text
	 * @param {kernel.external:json~parseReviver}
	 *            reviver
	 * @returns {(Object|Array)}
	 */
	kernel.json.parse = function(text, reviver) {
		if (!debug && window.JSON && JSON.parse) {
			return JSON.parse(text, reviver);
		} else {
			if (!kernel.lang.isString(text)) {
				text = String(text);
			}
			text = text.replace(UNICODE_REGEXP, function(c) {
				return '\\u'
						+ ('0000' + (+(c.charCodeAt(0))).toString(16))
								.slice(-4);
			});
			if (!UNSAFE_REGEXP.test(text.replace(ESCAPES_REGEXP, '@').replace(
					VALUES_REGEXP, ']').replace(BRACKETS_REGEXP, ''))) {
				return parse(eval('(' + text + ')'), reviver);
			}
			var e = new Error();
			e.message = "JSON.parse: unexpected character";
			throw e;
		}
	};

	/**
	 * @function kernel.external:json.dateReviver
	 * @param {string}
	 *            key
	 * @param {*}
	 *            value
	 * @return {*}
	 */
	kernel.json.dateReviver = function(key, value) {
		if (kernel.lang.isString(value)) {
			var arr = DATE_REGEXP.exec(value);
			if (arr) {
				return new Date(Date.UTC(+arr[1], +arr[2] - 1, +arr[3],
						+arr[4], +arr[5], +arr[6]));
			}
		}
		return value;
	};

	/**
	 * @function kernel.external:json.replacer
	 * @since 1.2
	 * @param {string}
	 *            key
	 * @param {*}
	 *            value
	 * @return {*}
	 */
	kernel.json.replacer = function(key, value) {
		var base64 = null;
		if (kernel.lang.isRegExp(value)) {
			var flags = "";
			if (value.global)
				flags += "g";
			if (value.ignoreCase)
				flags += "i";
			if (value.multiline)
				flags += "m";

			base64 = objectToBase64({
				type : "RegExp",
				pattern : value.source,
				flags : flags,
				lastIndex : value.lastIndex
			});
		} else if (kernel.lang.isError(value)) {
			base64 = objectToBase64({
				type : "Error",
				name : value.name,
				message : value.message,
				description : value.description,
				fileName : value.fileName,
				lineNumber : value.lineNumber,
				number : value.number,
				stack : value.stack
			});
		} else if (kernel.lang.type(value) === "number") {
			if (isNaN(value)) {
				base64 = objectToBase64({
					type : "Number",
					value : "NaN"
				});
			} else if (!isFinite(value)) {
				base64 = objectToBase64({
					type : "Number",
					value : value > 0 ? "Infinity" : "-Infinity"
				});
			}
		}
		if (base64)
			value = BASE64_PREFIX + base64;
		return value;
	};

	/**
	 * @function kernel.external:json.reviver
	 * @since 1.2
	 * @param {string}
	 *            key
	 * @param {*}
	 *            value
	 * @return {*}
	 */
	kernel.json.reviver = function(key, value) {
		value = kernel.json.dateReviver.call(this, key, value);
		if (kernel.lang.isString(value)
				&& kernel.lang.startsWith(value, BASE64_PREFIX)) {
			var obj = base64ToObject(value.substr(BASE64_PREFIX.length));
			if (obj)
				switch (obj.type) {
				case "RegExp":
					value = new RegExp(obj.pattern, obj.flags);
					value.lastIndex = obj.lastIndex;
					break;
				case "Number":
					if (obj.value === "NaN") {
						value = Number.NaN;
					} else if (obj.value === "Infinity") {
						value = Number.POSITIVE_INFINITY;
					} else if (obj.value === "-Infinity") {
						value = Number.NEGATIVE_INFINITY;
					}
					break;
				case "Error":
					value = new Error();
					value.message = obj.message;
					try {
						value.name = obj.name;
						value.lineNumber = obj.lineNumber;
						value.fileName = obj.fileName;
						value.stack = obj.stack;
						value.number = obj.number;
						value.description = obj.description;
					} catch (e) {
					}
					break;
				}
		}
		return value;
	};

	/**
	 * 
	 * @function kernel.external:json.clone
	 * @param {Object}
	 *            obj
	 * @param {(Array|kernel.external:json~stringifyReplacer)}
	 *            replacer
	 * @param {kernel.external:json~parseReviver}
	 *            reviver
	 * @returns {Object}
	 */
	kernel.json.clone = function(obj, replacer, reviver) {
		var text = kernel.json.stringify(obj, replacer || kernel.json.replacer);
		return kernel.json.parse(text, reviver || kernel.json.reviver);
	};

	function objectToBase64(obj) {
		var text = kernel.json.stringify(obj);
		return kernel.base64.encode(text, encodeURI);
	}

	function base64ToObject(base64) {
		try {
			var text = kernel.base64.decode(base64, decodeURI);
			return kernel.json.parse(text);
		} catch (e) {
		}
		return null;
	}

})(this, this["kernel@1.3"], false);

/**
 * @callback kernel.external:json~stringifyReplacer
 * @param {string}
 *            key
 * @param {*}
 *            value
 * @returns {*}
 */

/**
 * @callback kernel.external:json~parseReviver
 * @param {string}
 *            key
 * @param {*}
 *            value
 * @returns {*}
 */
(function(window, kernel, debug) {

	/**
	 * @external kernel.lang
	 */
	kernel.lang = {};

	var WHITESPACE = "[\x09-\x0D\x20\xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+";

	/**
	 * @constant {string} kernel.external:lang.ARRAY
	 * @default array
	 */
	var ARRAY = kernel.lang.ARRAY = "array";

	/**
	 * @constant {string} kernel.external:lang.BOOLEAN
	 * @default boolean
	 */
	var BOOLEAN = kernel.lang.BOOLEAN = "boolean";

	/**
	 * @constant {string} kernel.external:lang.DATE
	 * @default date
	 */
	var DATE = kernel.lang.DATE = "date";

	/**
	 * @constant {string} kernel.external:lang.ERROR
	 * @default error
	 */
	var ERROR = kernel.lang.ERROR = "error";

	/**
	 * @constant {string} kernel.external:lang.FUNCTION
	 * @default function
	 */
	var FUNCTION = kernel.lang.FUNCTION = "function";

	/**
	 * @constant {string} kernel.external:lang.NUMBER
	 * @default number
	 */
	var NUMBER = kernel.lang.NUMBER = "number";

	/**
	 * @constant {string} kernel.external:lang.NULL
	 * @default null
	 */
	var NULL = kernel.lang.NULL = "null";

	/**
	 * @constant {string} kernel.external:lang.REGEXP
	 * @default regexp
	 */
	var REGEXP = kernel.lang.REGEXP = "regexp";

	/**
	 * @constant {string} kernel.external:lang.STRING
	 * @default string
	 */
	var STRING = kernel.lang.STRING = "string";

	/**
	 * @constant {string} kernel.external:lang.UNDEFINED
	 * @default undefined
	 */
	var UNDEFINED = kernel.lang.UNDEFINED = "undefined";

	/**
	 * @constant {string} kernel.external:lang.OBJECT
	 * @default object
	 */
	var OBJECT = kernel.lang.OBJECT = "object";

	var TYPE_MAP = {
		'undefined' : UNDEFINED,
		'number' : NUMBER,
		'boolean' : BOOLEAN,
		'string' : STRING,
		'function' : FUNCTION,
		'[object Number]' : NUMBER,
		'[object Boolean]' : BOOLEAN,
		'[object String]' : STRING,
		'[object Function]' : FUNCTION,
		'[object RegExp]' : REGEXP,
		'[object Array]' : ARRAY,
		'[object Date]' : DATE,
		'[object Error]' : ERROR,
		'[object Null]' : NULL
	};

	function returnObject(args) {
		if (args.length > 1) {
			var obj = args[0];

			var arr;
			if (args.length > 2) {
				arr = String(args[1]).split(args[2]);
			} else {
				arr = [ args[1] ];
			}

			for (var i = 0, len = arr.length; i < len; i++) {
				if (typeof obj === "undefined" || obj === null) {
					obj = undefined;
					break;
				}

				if (typeof arr[i] === "undefined" || arr[i] === "")
					continue;

				obj = obj[arr[i]];
			}
			return obj;
		} else {
			var value = args[0];
			return value;
		}
	}

	/**
	 * @function kernel.external:lang.type
	 * @param {*}
	 *            obj
	 * @param {string}
	 *            [path]
	 * @param {(string|RegExp)}
	 *            [separator]
	 * @returns {string}
	 */
	var type = kernel.lang.type = function(obj, path, separator) {
		obj = returnObject(arguments);
		return TYPE_MAP[typeof obj]
				|| TYPE_MAP[Object.prototype.toString.call(obj)]
				|| (obj ? OBJECT : NULL);
	};

	/**
	 * @function kernel.external:lang.isArray
	 * @param {*}
	 *            obj
	 * @param {string}
	 *            [path]
	 * @param {(string|RegExp)}
	 *            [separator]
	 * @returns {boolean}
	 */
	kernel.lang.isArray = function(obj, path, separator) {
		obj = returnObject(arguments);
		return type(obj) === ARRAY;
	};

	/**
	 * @function kernel.external:lang.isRegExp
	 * 
	 * @param {*}
	 *            obj
	 * @param {string}
	 *            [path]
	 * @param {(string|RegExp)}
	 *            [separator]
	 * @returns {boolean}
	 */
	kernel.lang.isRegExp = function(obj, path, separator) {
		obj = returnObject(arguments);
		return type(obj) === REGEXP;
	};

	/**
	 * @function kernel.external:lang.isBoolean
	 * @param {*}
	 *            obj
	 * @param {string}
	 *            [path]
	 * @param {(string|RegExp)}
	 *            [separator]
	 * @returns {boolean}
	 */
	kernel.lang.isBoolean = function(obj, path, separator) {
		obj = returnObject(arguments);
		return type(obj) === BOOLEAN;
	};

	/**
	 * @function kernel.external:lang.isFunction
	 * @param {*}
	 *            obj
	 * @param {string}
	 *            [path]
	 * @param {(string|RegExp)}
	 *            [separator]
	 * @returns {boolean}
	 */
	kernel.lang.isFunction = function(obj, path, separator) {
		obj = returnObject(arguments);
		return type(obj) === FUNCTION;
	};

	/**
	 * @function kernel.external:lang.isDate
	 * @param {*}
	 *            obj
	 * @param {string}
	 *            [path]
	 * @param {(string|RegExp)}
	 *            [separator]
	 * @returns {boolean}
	 */
	kernel.lang.isDate = function(obj, path, separator) {
		obj = returnObject(arguments);
		return type(obj) === DATE && obj.toString() !== "Invalid Date"
				&& !isNaN(obj);
	};

	/**
	 * @function kernel.external:lang.isNumber
	 * @param {*}
	 *            obj
	 * @param {string}
	 *            [path]
	 * @param {(string|RegExp)}
	 *            [separator]
	 * @returns {boolean}
	 */
	kernel.lang.isNumber = function(obj, path, separator) {
		obj = returnObject(arguments);
		return type(obj) === NUMBER && isFinite(obj);
	};

	/**
	 * @function kernel.external:lang.isObject
	 * @param {*}
	 *            obj
	 * @param {string}
	 *            [path]
	 * @param {(string|RegExp)}
	 *            [separator]
	 * @returns {boolean}
	 */
	kernel.lang.isObject = function(obj, path, separator) {
		obj = returnObject(arguments);
		var _type = type(obj);
		var exclusions = [ UNDEFINED, NULL, FUNCTION, STRING, NUMBER, BOOLEAN ];
		for (var i = 0, len = exclusions.length; i < len; i++)
			if (_type === exclusions[i])
				return false;
		return true;
	};

	/**
	 * @function kernel.external:lang.isError
	 * @since 1.2
	 * @param {*}
	 *            obj
	 * @param {string}
	 *            [path]
	 * @param {(string|RegExp)}
	 *            [separator]
	 * @returns {boolean}
	 */
	kernel.lang.isError = function(obj, path, separator) {
		obj = returnObject(arguments);
		return type(obj) === ERROR;
	};

	/**
	 * @function kernel.external:lang.isString
	 * @param {*}
	 *            obj
	 * @param {string}
	 *            [path]
	 * @param {(string|RegExp)}
	 *            [separator]
	 * @returns {boolean}
	 */
	kernel.lang.isString = function(obj, path, separator) {
		obj = returnObject(arguments);
		return type(obj) === STRING;
	};

	/**
	 * @function kernel.external:lang.isNull
	 * @param {*}
	 *            obj
	 * @param {string}
	 *            [path]
	 * @param {(string|RegExp)}
	 *            [separator]
	 * @returns {boolean}
	 */
	kernel.lang.isNull = function(obj, path, separator) {
		obj = returnObject(arguments);
		return type(obj) === NULL;
	};

	/**
	 * @function kernel.external:lang.isUndefined
	 * @param {*}
	 *            obj
	 * @param {string}
	 *            [path]
	 * @param {(string|RegExp)}
	 *            [separator]
	 * @returns {boolean}
	 */
	kernel.lang.isUndefined = function(obj, path, separator) {
		obj = returnObject(arguments);
		return typeof obj === UNDEFINED;
	};

	/**
	 * @function kernel.external:lang.isValue
	 * @param {*}
	 *            obj
	 * @param {string}
	 *            [path]
	 * @param {(string|RegExp)}
	 *            [separator]
	 * @returns {boolean}
	 */
	kernel.lang.isValue = function(obj, path, separator) {
		obj = returnObject(arguments);
		switch (type(obj)) {
		case NUMBER:
			return isFinite(obj);
		case NULL:
		case UNDEFINED:
			return false;
		default:
			return true;
		}
	};

	/**
	 * @function kernel.external:lang.isBlank
	 * @param {*}
	 *            obj
	 * @param {string}
	 *            [path]
	 * @param {(string|RegExp)}
	 *            [separator]
	 * @returns {boolean}
	 */
	kernel.lang.isBlank = function(obj, path, separator) {
		obj = returnObject(arguments);
		switch (type(obj)) {
		case NUMBER:
			return isNaN(obj);
		case STRING:
			if (kernel.lang.isString(obj))
				obj = kernel.lang.trim(obj);
			return obj === "";
		case NULL:
		case UNDEFINED:
			return true;
		default:
			return false;
		}
	};

	/**
	 * @function kernel.external:lang.trim
	 * @param {string}
	 *            str
	 * @returns {string}
	 */
	kernel.lang.trim = function(str) {
		if (str.trim) {
			return str.trim();
		} else {
			var reg = new RegExp("^" + WHITESPACE + "|" + WHITESPACE + "$", "g");
			return str.replace(reg, "");
		}
	};

	/**
	 * @function kernel.external:lang.trimLeft
	 * @param {string}
	 *            str
	 * @returns {string}
	 */
	kernel.lang.trimLeft = function(str) {
		if (str.trimLeft) {
			return str.trimLeft();
		} else if (str.trimStart) {
			return str.trimStart();
		} else {
			var reg = new RegExp("^" + WHITESPACE, "g");
			return str.replace(reg, "");
		}
	};

	/**
	 * @function kernel.external:lang.trimRight
	 * @param {string}
	 *            str
	 * @returns {string}
	 */
	kernel.lang.trimRight = function(str) {
		if (str.trimRight) {
			return str.trimRight();
		} else if (str.trimEnd) {
			return str.trimEnd();
		} else {
			var reg = new RegExp(WHITESPACE + "$", "g");
			return str.replace(reg, "");
		}
	};

	/**
	 * @function kernel.external:lang.startsWith
	 * @param {string}
	 *            str
	 * @param {string}
	 *            prefix
	 * @returns {boolean}
	 */
	kernel.lang.startsWith = function(str, prefix) {
		if (str.startsWith) {
			return str.startsWith(prefix);
		} else {
			return str.slice(0, prefix.length) === prefix;
		}
	};

	/**
	 * @function kernel.external:lang.endsWith
	 * @param {string}
	 *            str
	 * @param {string}
	 *            suffix
	 * @returns {boolean}
	 */
	kernel.lang.endsWith = function(str, suffix) {
		if (str.endsWith) {
			return str.endsWith(suffix);
		} else {
			return str.slice(-suffix.length) === suffix;
		}
	};

	/**
	 * @function kernel.external:lang.isASCII
	 * @param {string}
	 *            str
	 * @returns {boolean}
	 */
	kernel.lang.isASCII = function(str) {
		return /^[\x00-\x7F]*$/.test(str);
	};

	/**
	 * @function kernel.external:lang.isEASCII
	 * @param {string}
	 *            str
	 * @returns {boolean}
	 */
	kernel.lang.isEASCII = function(str) {
		return /^[\x00-\xFF]*$/.test(str);
	};

	/**
	 * @function kernel.external:lang.escapeUnicode
	 * @param {string}
	 *            str
	 * @param {string}
	 *            [prefix=\u]
	 * @returns {string}
	 */
	kernel.lang.escapeUnicode = function(str, prefix) {
		prefix = kernel.lang.isValue(prefix) ? prefix : "\\u";
		var code = "";
		for (var i = 0, len = str.length; i < len; i++) {
			code += prefix;
			code += kernel.lang.zeroize(str.charCodeAt(i).toString(16), 4);
		}
		return code;
	};

	/**
	 * @function kernel.external:lang.unescapeUnicode
	 * @param {string}
	 *            str
	 * @returns {string}
	 */
	kernel.lang.unescapeUnicode = function(str) {
		return str.replace(/(\%u[0-9a-f]{4})|(\\u[0-9a-f]{4})/ig, function(c) {
			var code = parseInt(c.substr(2), 16);
			if (code >= 0 && code < Math.pow(2, 16))
				return String.fromCharCode(code);
			else
				return c;
		});
	};

	/**
	 * @function kernel.external:lang.now
	 * @returns {number}
	 */
	kernel.lang.now = function() {
		if (Date.now) {
			return Date.now();
		} else {
			return new Date().getTime();
		}
	};

	/**
	 * @function kernel.external:lang.random
	 * @param {number}
	 *            [max]
	 * @param {number}
	 *            [min]
	 * @returns {number}
	 */
	kernel.lang.random = function(max, min) {
		if (arguments.length === 0) {
			max = 1;
			min = 0;
		} else if (arguments.length === 1) {
			min = 0;
		}
		return Math.random() * (max - min) + min;
	};

	/**
	 * @function kernel.external:lang.formatDate
	 * @param {Date}
	 *            date
	 * @param {string}
	 *            mask
	 * @param {Object}
	 *            [opt]
	 * @param {Array}
	 *            [opt.ddd]
	 * @param {Array}
	 *            [opt.dddd]
	 * @param {Array}
	 *            [opt.MMM]
	 * @param {Array}
	 *            [opt.MMMM]
	 * @param {Array}
	 *            [opt.tt]
	 * @param {Array}
	 *            [opt.TT]
	 * @returns {string}
	 */
	kernel.lang.formatDate = function(date, mask, opt) {
		opt = opt || {};

		var regExp = /(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT]){1,2}|[lLZ])/g;

		var ddd = opt.ddd
				|| [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat' ];
		var dddd = opt.dddd
				|| [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
						'Friday', 'Saturday' ];
		var MMM = opt.MMM
				|| [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
						'Sep', 'Oct', 'Nov', 'Dec' ];
		var MMMM = opt.MMMM
				|| [ 'January', 'February', 'March', 'April', 'May', 'June',
						'July', 'August', 'September', 'October', 'November',
						'December' ];
		var tt = opt.tt || [ 'am', 'pm' ];
		var TT = opt.TT || [ 'AM', 'PM' ];

		return mask.replace(regExp, function(c) {
			switch (c) {
			case 'd':
				return date.getDate();
			case 'dd':
				return kernel.lang.zeroize(date.getDate());
			case 'ddd':
				return ddd[date.getDay()];
			case 'dddd':
				return dddd[date.getDay()];
			case 'M':
				return date.getMonth() + 1;
			case 'MM':
				return kernel.lang.zeroize(date.getMonth() + 1);
			case 'MMM':
				return MMM[date.getMonth()];
			case 'MMMM':
				return MMMM[date.getMonth()];
			case 'yy':
				return String(date.getFullYear()).substr(2);
			case 'yyyy':
				return date.getFullYear();
			case 'h':
				return date.getHours() % 12 || 12;
			case 'hh':
				return kernel.lang.zeroize(date.getHours() % 12 || 12);
			case 'H':
				return date.getHours();
			case 'HH':
				return kernel.lang.zeroize(date.getHours());
			case 'm':
				return date.getMinutes();
			case 'mm':
				return kernel.lang.zeroize(date.getMinutes());
			case 's':
				return date.getSeconds();
			case 'ss':
				return kernel.lang.zeroize(date.getSeconds());
			case 'l':
				return kernel.lang.zeroize(date.getMilliseconds(), 3);
			case 'L':
				var m = date.getMilliseconds();
				if (m > 99)
					m = Math.round(m / 10);
				return kernel.lang.zeroize(m);
			case 'tt':
				return date.getHours() < 12 ? tt[0] : tt[1];
			case 'TT':
				return date.getHours() < 12 ? TT[0] : TT[1];
			case 'Z':
				return date.toUTCString().match(/[A-Z]+$/);
			}
			return c;
		});
	};

	/**
	 * @function kernel.external:lang.create
	 * @param {Object}
	 *            prototype
	 * @return {Object}
	 */
	kernel.lang.create = (function() {
		if (kernel.lang.isFunction(Object, "create")) {
			return function() {
				return Object.create.apply(null, arguments);
			};
		} else {
			var F = function() {
			};
			return function(prototype) {
				F.prototype = prototype;
				return new F();
			};
		}
	})();

	/**
	 * @function kernel.external:lang.extend
	 * @param {Object}
	 *            base
	 * @param {?Object}
	 *            extension
	 * @param {Array}
	 *            [whiteList]
	 * @returns {Object}
	 */
	kernel.lang.extend = function(base, extension, whiteList) {
		if (!kernel.lang.isValue(extension))
			return base;
		if (whiteList) {
			kernel.lang.forEach(whiteList, function(key) {
				if (!kernel.lang.isUndefined(extension, key))
					base[key] = extension[key];
			});
		} else {
			for ( var key in extension)
				base[key] = extension[key];
		}
		return base;
	};

	/**
	 * @function kernel.external:lang.zeroize
	 * @param {(string|number)}
	 *            value
	 * @param {number}
	 *            [length=2]
	 * @returns {string}
	 */
	kernel.lang.zeroize = function(value, length) {
		value = String(value);
		if (!kernel.lang.isNumber(length))
			length = 2;

		var zeros = '';
		var i = 0, len = length - value.length;
		for (; i < len; i++) {
			zeros += '0';
		}
		return zeros + value;
	};

	/**
	 * @function kernel.external:lang.objectToArray
	 * @param {Object}
	 *            obj
	 * @param {string}
	 *            [keyName=key]
	 * @param {string}
	 *            [valueName=value]
	 * @returns {Array}
	 */
	kernel.lang.objectToArray = function(obj, keyName, valueName) {
		keyName = kernel.lang.isValue(keyName) ? keyName : "key";
		valueName = kernel.lang.isValue(valueName) ? valueName : "value";
		var arr = [];
		kernel.lang.forEach(obj, function(value, key) {
			var data = {};
			data[keyName] = key;
			data[valueName] = value;
			arr.push(data);
			return false;
		}, false);
		return arr;
	};

	/**
	 * @function kernel.external:lang.arrayToObject
	 * @since 1.2
	 * @param {Array}
	 *            arr
	 * @param {string}
	 *            [keyName=key]
	 * @param {string}
	 *            [valueName=value]
	 * @returns {Object}
	 */
	kernel.lang.arrayToObject = function(arr, keyName, valueName) {
		keyName = kernel.lang.isValue(keyName) ? keyName : "key";
		valueName = kernel.lang.isValue(valueName) ? valueName : "value";
		var obj = {};
		kernel.lang.forEach(arr, function(data) {
			var key = data[keyName];
			var value = data[valueName];
			obj[key] = value;
		}, true);
		return obj;
	};

	/**
	 * @function kernel.external:lang.contains
	 * @param {Array}
	 *            arr
	 * @param {*}
	 *            obj
	 * @param {kernel.external:lang~containsMatch}
	 *            [match]
	 * @returns {boolean}
	 */
	kernel.lang.contains = function(arr, obj, match) {
		match = match || kernel.lang.equals;
		var boo = false;
		kernel.lang.forEach(arr, function(value, i) {
			if (match(value, obj, i))
				boo = true;
			return boo;
		}, true);
		return boo;
	};

	/**
	 * @function kernel.external:lang.filter
	 * @since 1.3
	 * @param {Array}
	 *            arr
	 * @param {kernel.external:lang~filterMatch}
	 *            [match]
	 * @returns {Array}
	 */
	kernel.lang.filter = function(arr, match) {
		var _arr = [];
		kernel.lang.forEach(arr, function(value, i) {
			match(value, i) && _arr.push(value);
		}, true);
		return _arr;
	};

	/**
	 * @function kernel.external:lang.find
	 * @since 1.3
	 * @param {Array}
	 *            arr
	 * @param {kernel.external:lang~filterMatch}
	 *            [match]
	 * @returns {*}
	 */
	kernel.lang.find = function(arr, match) {
		var obj = undefined;
		kernel.lang.forEach(arr, function(value, i) {
			if (match(value, i)) {
				obj = value;
				return true;
			} else {
				return false;
			}
		}, true);
		return obj;
	};

	/**
	 * @function kernel.external:lang.map
	 * @since 1.3
	 * @param {Array}
	 *            arr
	 * @param {kernel.external:lang~mapCallback}
	 *            [callback]
	 * @returns {Array}
	 */
	kernel.lang.map = function(arr, callback) {
		var _arr = [];
		kernel.lang.forEach(arr, function(value, i) {
			_arr.push(callback(value, i));
		}, true);
		return _arr;
	};

	/**
	 * @function kernel.external:lang.forEach
	 * @param {(Object|Array)}
	 *            obj
	 * @param {kernel.external:lang~forEachCallback}
	 *            callback
	 * @param {boolean}
	 *            [asArray]
	 */
	kernel.lang.forEach = function(obj, callback, asArray) {
		var status = 0;
		if (asArray === true) {
			if (kernel.lang.isObject(obj))
				status = 1;
		} else if (asArray === false) {
			if (kernel.lang.isObject(obj))
				status = 2;
		} else {
			if (kernel.lang.isArray(obj))
				status = 1;
			else if (kernel.lang.isObject(obj))
				status = 2;

		}
		if (status === 1) {
			for (var i = 0, len = obj.length; i < len; i++)
				if (callback.call(obj, obj[i], i))
					break;
		} else if (status === 2) {
			for ( var i in obj)
				if ((obj.hasOwnProperty ? obj.hasOwnProperty(i) : true)
						&& callback.call(obj, obj[i], i))
					break;
		}
	};

	/**
	 * @function kernel.external:lang.multiEach
	 * @since 1.2
	 * @param {(Object|Array)}
	 *            obj
	 * @param {kernel.external:lang~multiEachCallback}
	 *            callback
	 * @param {number}
	 *            depth
	 */
	kernel.lang.multiEach = function(obj, callback, depth) {
		(function(obj, chains, depth) {
			if (depth > 0) {
				var call = arguments.callee, arr;
				kernel.lang.forEach(obj, function(value, key) {
					arr = chains.concat([ key ]);
					if (callback.call(obj, value, arr))
						return true;
					call(value, arr, depth - 1);
					return false;
				}, false);
			}
		})(obj, [], depth);
	};

	/**
	 * @function kernel.external:lang.manyEach
	 * @since 1.3
	 * @param {kernel.external:lang~manyEachCallback}
	 *            callback
	 * @param {...Array}
	 *            arr
	 */
	kernel.lang.manyEach = function(callback, arr) {
		var args = arguments;
		var len = args.length;
		kernel.lang.forEach(arr, function(value, i) {
			var j = 1;
			var params = [];
			for (; j < len; j++) {
				params.push(args[j][i]);
			}
			callback.apply(null, params);
		}, true);
	}

	/**
	 * @function kernel.external:lang.equals
	 * @param {*}
	 *            a
	 * @param {*}
	 *            b
	 * @returns {boolean}
	 */
	kernel.lang.equals = function(a, b) {
		if (a === b)
			return true;

		var t1 = type(a);
		var t2 = type(b);
		if (t1 === t2) {
			if (t1 === NUMBER && isNaN(a) === true && isNaN(b) === true)
				return true;
			return a === b;
		}
		return false;
	};

	/**
	 * @function kernel.external:lang.rank
	 * @since 1.1
	 * @param {Array}
	 *            sorted
	 * @param {kernel.external:lang~rankEquals}
	 *            [equals={@link kernel.external:lang.equals}]
	 * @returns {Array}
	 */
	kernel.lang.rank = function(sorted, equals) {
		if (!equals) {
			equals = kernel.lang.equals;
		}
		var arr = [];
		var tmp = null, first = null;
		kernel.lang.forEach(sorted, function(obj, i) {
			if (i > 0 && equals(first, obj)) {
				tmp.push(obj);
			} else {
				tmp = [ first = obj ];
				arr.push(tmp);
			}
		}, true);
		return arr;
	};

	/**
	 * 
	 * @function kernel.external:lang.substitute
	 * @since 1.2
	 * @param {string}
	 *            str
	 * @param {Object}
	 *            [obj]
	 * @param {kernel.external:lang~substituteCallback}
	 *            [func]
	 * @param {boolean}
	 *            [recurse=false]
	 * @returns {string}
	 */
	kernel.lang.substitute = function(str, obj, func, recurse) {
		obj = obj || {};

		var LBRACE = "{", RBRACE = "}";
		var lBraceRegExp = /\{\s*LBRACE\s*\}/g, rBraceRegExp = /\{\s*RBRACE\s*\}/g;
		var i, j, len = str.length;
		var token, key, value;
		while (true) {
			if (len <= 0)
				break;

			i = str.lastIndexOf(LBRACE, len);
			if (i === -1)
				break;

			j = str.indexOf(RBRACE, i);
			if (i + 1 >= j)
				break;

			token = str.substring(i + 1, j);
			key = kernel.lang.trim(token);

			value = obj[key];

			if (kernel.lang.isFunction(value))
				value = obj[key]();

			if (func)
				value = func(key, value, obj);

			if (kernel.lang.isUndefined(value)) {
				if (/^(LBRACE|RBRACE)$/g.test(key)) {
					len = i - 1;
					continue;
				} else {
					value = token;
				}
			}

			str = str.substring(0, i) + value + str.substring(j + 1);

			if (recurse)
				len = str.length;
			else
				len = i - 1;
		}

		return str.replace(lBraceRegExp, LBRACE).replace(rBraceRegExp, RBRACE);
	};

})(this, this["kernel@1.3"], false);
/**
 * @callback kernel.external:lang~containsMatch
 * @param {*}
 *            value
 * @param {*}
 *            obj
 * @param {number}
 *            index
 * @returns {boolean}
 */
/**
 * @callback kernel.external:lang~filterMatch
 * @param {*}
 *            value
 * @param {number}
 *            index
 * @returns {boolean}
 */
/**
 * @callback kernel.external:lang~mapCallback
 * @param {*}
 *            value
 * @param {number}
 *            index
 * @returns {*}
 */
/**
 * @callback kernel.external:lang~forEachCallback
 * @param {*}
 *            value
 * @param {(string|number)}
 *            index
 * @returns {boolean}
 */
/**
 * @callback kernel.external:lang~multiEachCallback
 * @param {*}
 *            value
 * @param {string[]}
 *            keys
 * @returns {boolean}
 */
/**
 * @callback kernel.external:lang~manyEachCallback
 * @param {...*}
 *            value
 */
/**
 * @callback kernel.external:lang~rankEquals
 * @param {*}
 *            a
 * @param {*}
 *            b
 * @returns {boolean}
 */
/**
 * @callback kernel.external:lang~substituteCallback
 * @param {string}
 *            key
 * @param {*}
 *            value
 * @param {Object}
 *            obj
 * @returns {*}
 */
(function(window, kernel, debug) {
	
	/**
	 * @external kernel.path
	 * @since 1.3
	 */
	kernel.path = {};

	var PATH_TYPE_URI = "URI";
	var PATH_TYPE_UNIX = "UNIX";
	var PATH_TYPE_WIN = "WINDOWS";
	var PATH_TYPE_UNC = "UNC";

	function getPathType(path) {
		if (/^[A-Za-z]+[A-Za-z0-9\.\+\-]*[A-Za-z0-9]+:/.test(path))
			return PATH_TYPE_URI;
		if (/^\//.test(path))
			return PATH_TYPE_UNIX;
		if (/^[A-Za-z]:/.test(path))
			return PATH_TYPE_WIN;
		if (/^\\\\/.test(path))
			return PATH_TYPE_UNC;
		return null;
	}

	function getSeparator(path) {
		switch (getPathType(path)) {
		case PATH_TYPE_WIN:
		case PATH_TYPE_UNC:
			return "\\";
		}

		if (/^\.{0,2}\\/.test(path))
			return "\\";

		return "/";
	}

	/**
	 * @function kernel.external:path.isPathRooted
	 * @param {string}
	 *            path
	 * @returns {boolean}
	 */
	kernel.path.isPathRooted = function(path) {
		return Boolean(getPathType(path));
	};

	/**
	 * @function kernel.external:path.getDirectoryName
	 * @param {string}
	 *            path
	 * @returns {string}
	 */
	kernel.path.getDirectoryName = function(path) {
		var pathType = getPathType(path);
		if (pathType === PATH_TYPE_URI) {
			var url = new kernel.net.URLParser(path);
			path = url.getPathname();
			if (!kernel.lang.isBlank(path)) {

				var index = path.lastIndexOf("/");

				if (index > 0) {
					path = path.substring(0, index);
				} else {
					path = "";
				}
			}
			url.setPathname(path);
			url.setSearch("");
			url.setHash("");
			return url.toString();
		}

		var sep = getSeparator(path);
		var min, value;
		if (/\.{1,2}(\\|\/)?$/.test(path)) {
			min = path.length - 2;
			value = path;
		} else if (/^\.(\\|\/)/.test(path)) {
			min = 1;
			value = ".";
		} else if (pathType === PATH_TYPE_WIN) {
			min = 2;
			value = path.substr(0, min);
		} else if (pathType === PATH_TYPE_UNC) {
			min = 2;
			value = path;
		} else if (pathType === PATH_TYPE_UNIX) {
			min = 1;
			value = "/";
		} else if (/^\\/.test(path)) {
			min = 1;
			value = "\\";
		} else {
			min = 0;
			value = path;
		}

		var index = path.lastIndexOf(sep);
		if (index > min) {
			value = path.substring(0, index);
		}
		return value;
	};

	/**
	 * @function kernel.external:path.getFileName
	 * @param {string}
	 *            path
	 * @returns {string}
	 */
	kernel.path.getFileName = function(path) {
		var pathType = getPathType(path);
		if (pathType === PATH_TYPE_URI) {
			var url = new kernel.net.URLParser(path);
			path = url.getPathname();
		}
		if (!kernel.lang.isBlank(path) && !/\.{1,2}(\\|\/)?$/.test(path)) {
			var index = path.lastIndexOf(getSeparator(path));
			var fileName = path.substr(index + 1);
			if (/^.+\.\w+$/.test(fileName)) {
				return fileName;
			}
		}
		return "";
	};

	/**
	 * @function kernel.external:path.getFileNameWithoutExtension
	 * @param {string}
	 *            path
	 * @returns {string}
	 */
	kernel.path.getFileNameWithoutExtension = function(path) {
		var fileName = kernel.path.getFileName(path);
		return fileName.split(".")[0];
	};

	/**
	 * @function kernel.external:path.getExtension
	 * @param {string}
	 *            path
	 * @returns {string}
	 */
	kernel.path.getExtension = function(path) {
		var fileName = kernel.path.getFileName(path);
		if (fileName) {
			return /(.\w+)$/g.exec(fileName)[0];
		}
		return "";
	};

	/**
	 * @function kernel.external:path.combine
	 * @param {string}
	 *            frontalpath
	 * @param {string}
	 *            backpath
	 * @returns {string}
	 */
	kernel.path.combine = function(frontalPath, backPath) {
		if (kernel.lang.isBlank(frontalPath) && kernel.lang.isBlank(backPath)) {
			return "";
		} else if (kernel.lang.isBlank(backPath)) {
			return frontalPath;
		} else if (kernel.lang.isBlank(frontalPath)) {
			return backPath;
		} else if (kernel.path.isPathRooted(backPath)
				|| !kernel.path.isPathRooted(frontalPath)) {
			return backPath;
		}

		frontalPath = kernel.path.getDirectoryName(frontalPath);
		if (/^\.\.(\/|\\)/.test(backPath)) {
			backPath = backPath.substr(3);
			return arguments.callee(frontalPath, backPath);
		} else if (/^\.(\/|\\)/.test(backPath)) {
			backPath = backPath.substr(2);
		} else {
			backPath = backPath.replace(/^(\\|\/)/, "");
		}

		var sep = getSeparator(frontalPath);
		return (sep === frontalPath ? frontalPath : frontalPath + sep)
				+ backPath;
	};

	/**
	 * @function kernel.external:path.join
	 * @param {string}
	 *            leading
	 * @param {string}
	 *            trailing
	 * @returns {string}
	 */
	kernel.path.join = function(leading, trailing) {
		if (kernel.lang.isBlank(leading) && kernel.lang.isBlank(trailing)) {
			return "";
		} else if (kernel.lang.isBlank(trailing)) {
			return leading;
		} else if (kernel.lang.isBlank(leading)) {
			return trailing;
		} else if (!/^\//.test(trailing) && kernel.path.isPathRooted(trailing)) {
			return trailing;
		}

		var pathType = getPathType(leading);
		var sep;
		if (pathType === PATH_TYPE_URI) {
			var url = new kernel.net.URLParser(leading);
			url.setSearch("");
			url.setHash("");
			leading = url.toString();
			sep = "/";
		} else {
			sep = getSeparator(leading);
		}

		if (/.+(\\|\/)$/.test(leading))
			leading = leading.substr(0, leading.length - 1);

		if (/^(\\|\/)/.test(trailing)) {
			trailing = trailing.substr(1);
		} else if (/^\.(\\|\/)/.test(trailing)) {
			trailing = trailing.substr(2);
		} else if (kernel.path.isPathRooted(leading)
				&& /^\.{2}(\\|\/)/.test(trailing)) {
			leading = kernel.path.getDirectoryName(leading);
			trailing = trailing.substr(3);
			return arguments.callee(leading, trailing);
		}
		return (sep === leading ? leading : leading + sep) + trailing;
	};

})(this, this["kernel@1.3"], false);(function(window, kernel, debug) {

	/**
	 * @external kernel.test
	 * @since 1.1
	 */
	var test = kernel.test = {};

	var marker_index = 0;

	function now() {
		return new Date().getTime();
	}

	function runMethod(assert, method) {
		try {
			var args = [ assert ];
			if (method.args)
				args = args.concat(method.args);

			var boo = method.func.apply(null, args);
			if (boo === true) {
				assert.pass();
				assert.next();
			} else if (boo === false) {
				assert.fail();
				assert.next();
			}
		} catch (e) {
			assert.fail(e.message);
			assert.next();
		}
	}

	function runCase(testCase, finalResult, fire, callback) {
		var start = now();
		var tested = false;
		var methods = testCase.testMethods.concat([]);
		var result = new test.Result();
		var assert = new test.Assert(result);
		assert.fire = fire;
		assert.next = function() {
			if (!methods)
				return;

			!tested && testCase.init();
			if (methods.length) {
				tested = true;
				testCase.setUp();
				var method = methods.shift();
				fire({
					type : "TEST_METHOD",
					name : result.name = method.name
				});
				runMethod(assert, method);
			} else {
				methods = null;
				tested && testCase.tearDown();
				testCase.destroy();
				result.duration = now() - start;
				result.name = testCase.name;
				this.checkMarker();
				fire({
					type : "CASE_COMPLETE",
					result : result
				});
				finalResult.include(result);
				callback(result);
			}
		};
		assert.next();
	}

	function runSuite(testSuite, finalResult, fire, callback) {
		if (testSuite instanceof test.Case) {
			runCase(testSuite, finalResult, fire, callback);
		} else if (testSuite instanceof test.Suite) {
			var tested = false;
			var items = testSuite.items.concat([]);
			var suiteResult = new test.Result();
			suiteResult.name = testSuite.name;
			(function(result) {
				if (!items)
					return;

				suiteResult.include(result);

				if (items.length) {
					var child = items.shift();
					if (testSuite.isIgnored(child)) {
						arguments.callee();
					} else {
						tested = true;
						testSuite.setUp();
						runSuite(child, finalResult, fire, arguments.callee);
					}
				} else {
					items = null;
					tested && testSuite.tearDown();
					fire({
						type : "SUITE_COMPLETE",
						result : suiteResult
					});
					callback();
				}
			})(null);
		} else {
			callback();
		}
	}

	/**
	 * 
	 * @class kernel.external:test.Runner
	 * @param {Object}
	 *            suiteOpt
	 */
	test.Runner = function(suiteOpt) {

		var masterSuite = null, listeners = null;

		/**
		 * @function kernel.external:test.Runner#reset
		 */
		this.reset = function() {
			masterSuite = new test.Suite(suiteOpt);
			listeners = [];
		};

		/**
		 * 
		 * @function kernel.external:test.Runner#add
		 * @param {(kernel.external:test.Case|kernel.external:test.Suite)}
		 *            testCase
		 * @returns {?(kernel.external:test.Case|kernel.external:test.Suite)}
		 */
		this.add = function(testCase) {
			return masterSuite.add(testCase);
		};

		/**
		 * @function kernel.external:test.Runner#run
		 * @fires kernel.external:test.Runner#RUNNER_COMPLETE
		 * @fires kernel.external:test.Runner#SUITE_COMPLETE
		 * @fires kernel.external:test.Runner#CASE_COMPLETE
		 * @fires kernel.external:test.Runner#TEST_METHOD
		 * @fires kernel.external:test.Assert#PASS_EVENT
		 * @fires kernel.external:test.Assert#FAIL_EVENT
		 * @fires kernel.external:test.Assert#IGNORE_EVENT
		 */
		this.run = function() {
			var finalResult = new test.Result();
			runSuite(masterSuite, finalResult, fire, function() {
				finalResult.name = masterSuite.name;
				fire({
					type : "RUNNER_COMPLETE",
					result : finalResult
				});
			});
		};

		/**
		 * 
		 * @function kernel.external:test.Runner#addListener
		 * @param {string}
		 *            type
		 * @param {function}
		 *            handler
		 */
		this.addListener = function(type, handler) {
			listeners.push({
				type : type,
				handler : handler
			});
		};

		/**
		 * @function kernel.external:test.Runner#removeListener
		 * @param {string}
		 *            type
		 * @param {function}
		 *            handler
		 */
		this.removeListener = function(type, handler) {
			var i = 0, listener;
			while (i < listeners.length) {
				listener = listeners[i];
				if (listener.type === type && listener.handler === handler)
					listeners.splice(i, 1);
				else
					i++;
			}
		};

		function fire(event) {
			for (var i = 0; i < listeners.length; i++)
				if (listeners[i].type === event.type)
					listeners[i].handler.call(null, event);
		}

		this.reset();
	};

	/**
	 * @class kernel.external:test.Suite
	 * @param {Object}
	 *            [opt]
	 */
	test.Suite = function(opt) {

		/**
		 * @member {(kernel.external:test.Case[]|kernel.external:test.Suite[])}
		 *         kernel.external:test.Suite#items
		 */
		this.items = [];

		if (opt)
			for ( var key in opt)
				if (/^(name|isIgnored|setUp|tearDown)$/.test(key)) {
					this[key] = opt[key];
				}
	};

	/**
	 * @member {string} kernel.external:test.Suite#name
	 * @defualt null
	 */
	test.Suite.prototype.name = null;

	/**
	 * @function kernel.external:test.Suite#add
	 * @param {(kernel.external:test.Case|kernel.external:test.Suite)}
	 *            testCase
	 * @returns {?(kernel.external:test.Case|kernel.external:test.Suite)}
	 */
	test.Suite.prototype.add = function(testCase) {
		if (testCase instanceof test.Case || testCase instanceof test.Suite) {
			this.items.push(testCase);
			return testCase;
		}
		return null;
	};

	/**
	 * @function kernel.external:test.Suite#isIgnored
	 * @param {(kernel.external:test.Case|kernel.external:test.Suite)}
	 *            child
	 * @returns {boolean}
	 */
	test.Suite.prototype.isIgnored = function(child) {
		debug && console.log("------------- Suite#isIgnored --------------");
		return false;
	};

	/**
	 * @function kernel.external:test.Suite#setUp
	 */
	test.Suite.prototype.setUp = function() {
		debug && console.log("------------- Suite#setUp --------------");
	};

	/**
	 * @function kernel.external:test.Suite#tearDown
	 */
	test.Suite.prototype.tearDown = function() {
		debug && console.log("------------- Suite#tearDown --------------");
	};

	/**
	 * @class kernel.external:test.Case
	 * @param {Object}
	 *            [opt]
	 */
	test.Case = function(opt) {

		/**
		 * @member {Object[]} kernel.external:test.Case#testMethods
		 */
		this.testMethods = [];

		/**
		 * @function kernel.external:test.Case#addTestMethod
		 * @param {string}
		 *            name
		 * @param {function}
		 *            func
		 * @param {Array}
		 *            [args]
		 * @returns {kernel.external:test.Case}
		 */
		this.addTestMethod = function(name, func, args) {
			this.testMethods.push({
				name : name,
				func : func,
				args : args
			});
			return this;
		};

		if (opt)
			for ( var key in opt)
				if (/^test/.test(key)) {
					this.addTestMethod(key, opt[key]);
				} else if (/^(name|setUp|tearDown|init|destroy)$/.test(key)) {
					this[key] = opt[key];
				}
	};

	/**
	 * @member {string} kernel.external:test.Case#name
	 * @default null
	 */
	test.Case.prototype.name = null;

	/**
	 * @function kernel.external:test.Case#setUp
	 */
	test.Case.prototype.setUp = function() {
		debug && console.log("------------- Case#setUp --------------");
	};

	/**
	 * @function kernel.external:test.Case#tearDown
	 */
	test.Case.prototype.tearDown = function() {
		debug && console.log("------------- Case#tearDown --------------");
	};

	/**
	 * @function kernel.external:test.Case#init
	 */
	test.Case.prototype.init = function() {
		debug && console.log("------------- Case#init --------------");
	};

	/**
	 * @function kernel.external:test.Case#destroy
	 */
	test.Case.prototype.destroy = function() {
		debug && console.log("------------- Case#destroy --------------");
	};

	/**
	 * @class kernel.external:test.Assert
	 * @param {kernel.external:test.Result}
	 *            result
	 */
	test.Assert = function(result) {
		/**
		 * @function kernel.external:test.Assert#pass
		 * @param {string}
		 *            message
		 */
		this.pass = function(message) {
			result.passed += 1;
			result.total += 1;
			this.fire({
				type : "PASS_EVENT",
				name : result.name,
				message : message
			});
		};
		/**
		 * @function kernel.external:test.Assert#fail
		 * @param {string}
		 *            message
		 */
		this.fail = function(message) {
			result.failed += 1;
			result.total += 1;
			this.fire({
				type : "FAIL_EVENT",
				name : result.name,
				message : message
			});
		};
		/**
		 * @function kernel.external:test.Assert#ignore
		 * @param {string}
		 *            message
		 */
		this.ignore = function(message) {
			result.ignored += 1;
			result.total += 1;
			this.fire({
				type : "IGNORE_EVENT",
				name : result.name,
				message : message
			});
		};

		var markers = [];

		/**
		 * 
		 * @function kernel.external:test.Assert#setMarker
		 * @param {(kernel.external:test.Marker|Object|string)}
		 *            marker
		 * @returns {string}
		 */
		this.setMarker = function(marker) {
			if (marker instanceof test.Marker) {
				markers.push(marker);
				return marker.id;
			} else if (typeof marker === "object") {
				marker = new test.Marker(marker);
				return this.setMarker(marker);
			} else if (typeof marker === "string") {
				marker = new test.Marker({
					name : marker
				});
				return this.setMarker(marker);
			}
			return null;
		};

		/**
		 * @function kernel.external:test.Assert#clearMarker
		 * @param {string}
		 *            id
		 */
		this.clearMarker = function(id) {
			var marker;
			for (var i = 0; i < markers.length; i++) {
				marker = markers[i];
				if (marker.id === id) {
					markers.splice(i, 1);
					this.pass(marker.passedMsg === null ? marker.name
							: marker.passedMsg);
					break;
				}
			}
		};

		/**
		 * @function kernel.external:test.Assert#checkMarker
		 */
		this.checkMarker = function() {
			while (markers.length) {
				var marker = markers.shift();
				this.fail(marker.failedMsg === null ? marker.name
						: marker.failedMsg);
			}
		};
	};

	/**
	 * @function kernel.external:test.Assert#fire
	 * @param {Object}
	 *            event
	 */
	test.Assert.prototype.fire = function(event) {

	};

	/**
	 * @function kernel.external:test.Assert#next
	 */
	test.Assert.prototype.next = function() {

	};

	/**
	 * @function kernel.external:test.Assert#equals
	 * @param {*}
	 *            expected
	 * @param {*}
	 *            actual
	 * @param {string}
	 *            [passedMsg]
	 * @param {string}
	 *            [failedMsg]
	 * @returns {boolean}
	 */
	test.Assert.prototype.equals = function(expected, actual, passedMsg,
			failedMsg) {
		var boo = expected == actual;
		boo ? this.pass(arguments.length > 2 ? passedMsg : actual) : this
				.fail(arguments.length > 3 ? failedMsg : actual);
		return boo;
	};

	/**
	 * @function kernel.external:test.Assert#notEquals
	 * @param {*}
	 *            expected
	 * @param {*}
	 *            actual
	 * @param {string}
	 *            [passedMsg]
	 * @param {string}
	 *            [failedMsg]
	 * @returns {boolean}
	 */
	test.Assert.prototype.notEquals = function(expected, actual, passedMsg,
			failedMsg) {
		var boo = expected != actual;
		boo ? this.pass(arguments.length > 2 ? passedMsg : actual) : this
				.fail(arguments.length > 3 ? failedMsg : actual);
		return boo;
	};

	/**
	 * @function kernel.external:test.Assert#same
	 * @param {*}
	 *            expected
	 * @param {*}
	 *            actual
	 * @param {string}
	 *            [passedMsg]
	 * @param {string}
	 *            [failedMsg]
	 * @returns {boolean}
	 */
	test.Assert.prototype.same = function(expected, actual, passedMsg,
			failedMsg) {
		var boo = expected === actual;
		boo ? this.pass(arguments.length > 2 ? passedMsg : actual) : this
				.fail(arguments.length > 3 ? failedMsg : actual);
		return boo;
	};

	/**
	 * @function kernel.external:test.Assert#notSame
	 * @param {*}
	 *            expected
	 * @param {*}
	 *            actual
	 * @param {string}
	 *            [passedMsg]
	 * @param {string}
	 *            [failedMsg]
	 * @returns {boolean}
	 */
	test.Assert.prototype.notSame = function(expected, actual, passedMsg,
			failedMsg) {
		var boo = expected !== actual;
		boo ? this.pass(arguments.length > 2 ? passedMsg : actual) : this
				.fail(arguments.length > 3 ? failedMsg : actual);
		return boo;
	};

	/**
	 * @function kernel.external:test.Assert#isTrue
	 * @param {*}
	 *            actual
	 * @param {string}
	 *            [passedMsg]
	 * @param {string}
	 *            [failedMsg]
	 * @returns {boolean}
	 */
	test.Assert.prototype.isTrue = function(actual, passedMsg, failedMsg) {
		var boo = true === actual;
		boo ? this.pass(arguments.length > 1 ? passedMsg : actual) : this
				.fail(arguments.length > 2 ? failedMsg : actual);
		return boo;
	};

	/**
	 * @function kernel.external:test.Assert#isFalse
	 * @param {*}
	 *            actual
	 * @param {string}
	 *            [passedMsg]
	 * @param {string}
	 *            [failedMsg]
	 * @returns {boolean}
	 */
	test.Assert.prototype.isFalse = function(actual, passedMsg, failedMsg) {
		var boo = false === actual;
		boo ? this.pass(arguments.length > 1 ? passedMsg : actual) : this
				.fail(arguments.length > 2 ? failedMsg : actual);
		return boo;
	};

	/**
	 * @function kernel.external:test.Assert#isUndefined
	 * @param {*}
	 *            actual
	 * @param {string}
	 *            [passedMsg]
	 * @param {string}
	 *            [failedMsg]
	 * @returns {boolean}
	 */
	test.Assert.prototype.isUndefined = function(actual, passedMsg, failedMsg) {
		var boo = undefined === actual;
		boo ? this.pass(arguments.length > 1 ? passedMsg : actual) : this
				.fail(arguments.length > 2 ? failedMsg : actual);
		return boo;
	};

	/**
	 * @function kernel.external:test.Assert#isNotUndefined
	 * @param {*}
	 *            actual
	 * @param {string}
	 *            [passedMsg]
	 * @param {string}
	 *            [failedMsg]
	 * @returns {boolean}
	 */
	test.Assert.prototype.isNotUndefined = function(actual, passedMsg,
			failedMsg) {
		var boo = undefined !== actual;
		boo ? this.pass(arguments.length > 1 ? passedMsg : actual) : this
				.fail(arguments.length > 2 ? failedMsg : actual);
		return boo;
	};

	/**
	 * @function kernel.external:test.Assert#isNull
	 * @param {*}
	 *            actual
	 * @param {string}
	 *            [passedMsg]
	 * @param {string}
	 *            [failedMsg]
	 * @returns {boolean}
	 */
	test.Assert.prototype.isNull = function(actual, passedMsg, failedMsg) {
		var boo = null === actual;
		boo ? this.pass(arguments.length > 1 ? passedMsg : actual) : this
				.fail(arguments.length > 2 ? failedMsg : actual);
		return boo;
	};

	/**
	 * @function kernel.external:test.Assert#isNotNull
	 * @param {*}
	 *            actual
	 * @param {string}
	 *            [passedMsg]
	 * @param {string}
	 *            [failedMsg]
	 * @returns {boolean}
	 */
	test.Assert.prototype.isNotNull = function(actual, passedMsg, failedMsg) {
		var boo = null !== actual;
		boo ? this.pass(arguments.length > 1 ? passedMsg : actual) : this
				.fail(arguments.length > 2 ? failedMsg : actual);
		return boo;
	};

	/**
	 * @function kernel.external:test.Assert#isNaN
	 * @param {*}
	 *            actual
	 * @param {string}
	 *            [passedMsg]
	 * @param {string}
	 *            [failedMsg]
	 * @returns {boolean}
	 */
	test.Assert.prototype.isNaN = function(actual, passedMsg, failedMsg) {
		var boo = isNaN(actual);
		boo ? this.pass(arguments.length > 1 ? passedMsg : actual) : this
				.fail(arguments.length > 2 ? failedMsg : actual);
		return boo;
	};

	/**
	 * @function kernel.external:test.Assert#isNotNaN
	 * @param {*}
	 *            actual
	 * @param {string}
	 *            [passedMsg]
	 * @param {string}
	 *            [failedMsg]
	 * @returns {boolean}
	 */
	test.Assert.prototype.isNotNaN = function(actual, passedMsg, failedMsg) {
		var boo = !isNaN(actual);
		boo ? this.pass(arguments.length > 1 ? passedMsg : actual) : this
				.fail(arguments.length > 2 ? failedMsg : actual);
		return boo;
	};

	/**
	 * @function kernel.external:test.Assert#throwError
	 * @param {function}
	 *            func
	 * @param {string}
	 *            [passedMsg]
	 * @param {string}
	 *            [failedMsg]
	 * @returns {boolean}
	 */
	test.Assert.prototype.throwError = function(func, passedMsg, failedMsg) {
		var boo = false;
		try {
			func();
		} catch (e) {
			boo = true;
		}
		boo ? this.pass(arguments.length > 1 ? passedMsg : func) : this
				.fail(arguments.length > 2 ? failedMsg : func);
		return boo;
	};

	/**
	 * @class kernel.external:test.Marker
	 * @param {Object}
	 *            [opt]
	 */
	test.Marker = function(opt) {

		/**
		 * @member {string} kernel.external:test.Marker#id
		 */
		this.id = String(marker_index++);

		if (opt)
			for ( var key in opt)
				if (/^(name|passedMsg|failedMsg)$/.test(key)) {
					this[key] = opt[key];
				}

	};

	/**
	 * @member {string} kernel.external:test.Marker#name
	 * @default null
	 */
	test.Marker.prototype.name = null;
	/**
	 * @member {string} kernel.external:test.Marker#passedMsg
	 * @default null
	 */
	test.Marker.prototype.passedMsg = null;
	/**
	 * @member {string} kernel.external:test.Marker#failedMsg
	 * @default null
	 */
	test.Marker.prototype.failedMsg = null;

	/**
	 * @class kernel.external:test.Result
	 */
	test.Result = function() {

		/**
		 * @member {string} kernel.external:test.Result#name
		 * @default null
		 */
		this.name = null;

		/**
		 * @member {number} kernel.external:test.Result#passed
		 * @default 0
		 */
		this.passed = 0;

		/**
		 * @member {number} kernel.external:test.Result#failed
		 * @default 0
		 */
		this.failed = 0;

		/**
		 * @member {number} kernel.external:test.Result#ignored
		 * @default 0
		 */
		this.ignored = 0;

		/**
		 * @member {number} kernel.external:test.Result#total
		 * @default 0
		 */
		this.total = 0;

		/**
		 * @member {number} kernel.external:test.Result#duration
		 * @default 0
		 */
		this.duration = 0;
	};

	/**
	 * @function kernel.external:test.Result#include
	 * @param {kernel.external:test.Result}
	 *            result
	 * @returns {kernel.external:test.Result}
	 */
	test.Result.prototype.include = function(result) {
		if (result instanceof test.Result) {
			this.passed += result.passed;
			this.failed += result.failed;
			this.ignored += result.ignored;
			this.total += result.total;
			this.duration += result.duration;
		}
		return this;
	};

})(this, this["kernel@1.3"], false);
/**
 * @event kernel.external:test.Runner#RUNNER_COMPLETE
 * @property {string} type
 * @property {kernel.external:test.Result} result
 */
/**
 * @event kernel.external:test.Runner#SUITE_COMPLETE
 * @property {string} type
 * @property {kernel.external:test.Result} result
 */
/**
 * @event kernel.external:test.Runner#CASE_COMPLETE
 * @property {string} type
 * @property {kernel.external:test.Result} result
 */
/**
 * @event kernel.external:test.Runner#TEST_METHOD
 * @property {string} type
 * @property {string} name
 */

/**
 * @event kernel.external:test.Assert#PASS_EVENT
 * @property {string} type
 * @property {string} name
 * @property {string} message
 */
/**
 * @event kernel.external:test.Assert#FAIL_EVENT
 * @property {string} type
 * @property {string} name
 * @property {string} message
 */
/**
 * @event kernel.external:test.Assert#IGNORE_EVENT
 * @property {string} type
 * @property {string} name
 * @property {string} message
 */
(function(window, kernel, debug) {

	/**
	 * @external kernel.util
	 */
	kernel.util = {};

	/**
	 * @class kernel.external:util.QuickSort
	 */
	kernel.util.QuickSort = function() {

		var partition = function(array, left, right) {
			var index = left;
			var pivot = this.getElement(array, index);

			this.swap(array, index, right);

			for (var i = left; i < right; i++)
				if (this.compare(this.getElement(array, i), pivot)) {
					this.swap(array, index++, i);
				}

			this.swap(array, index, right);

			return index;
		};

		var sort = function(array, left, right) {
			if (left < right) {
				var index = partition.apply(this, arguments);
				arguments.callee.call(this, array, left, index - 1);
				arguments.callee.call(this, array, index + 1, right);
			}
		};

		/**
		 * @function kernel.external:util.QuickSort#sort
		 * @param {(Array|Object)}
		 *            array
		 */
		this.sort = function(array) {
			var length = this.getLength(array);
			if (length > 1) {
				sort.call(this, array, 0, length - 1);
			}
		};

	};

	/**
	 * @function kernel.external:util.QuickSort#compare
	 * @param {Object}
	 *            a
	 * @param {Object}
	 *            b
	 * @returns {boolean}
	 */
	kernel.util.QuickSort.prototype.compare = function(a, b) {
		return a > b;
	};

	/**
	 * @function kernel.external:util.QuickSort#swap
	 * @param {(Array|Object)}
	 *            array
	 * @param {number}
	 *            i
	 * @param {number}
	 *            j
	 */
	kernel.util.QuickSort.prototype.swap = function(array, i, j) {
		var tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
	};

	/**
	 * @function kernel.external:util.QuickSort#getElement
	 * @param {(Array|Object)}
	 *            array
	 * @param {number}
	 *            i
	 * @returns {Object}
	 */
	kernel.util.QuickSort.prototype.getElement = function(array, i) {
		return array[i];
	};

	/**
	 * @function kernel.external:util.QuickSort#getLength
	 * @param {(Array|Object)}
	 *            array
	 * @returns {number}
	 */
	kernel.util.QuickSort.prototype.getLength = function(array) {
		return array.length;
	};

	/**
	 * @class kernel.external:util.Color
	 */
	kernel.util.Color = function() {
		var named = {
			"black" : [ 0, 0, 0 ],
			"silver" : [ 192, 192, 192 ],
			"gray" : [ 128, 128, 128 ],
			"white" : [ 255, 255, 255 ],
			"maroon" : [ 128, 0, 0 ],
			"red" : [ 255, 0, 0 ],
			"purple" : [ 128, 0, 128 ],
			"fuchsia" : [ 255, 0, 255 ],
			"green" : [ 0, 128, 0 ],
			"lime" : [ 0, 255, 0 ],
			"olive" : [ 128, 128, 0 ],
			"yellow" : [ 255, 255, 0 ],
			"navy" : [ 0, 0, 128 ],
			"blue" : [ 0, 0, 255 ],
			"teal" : [ 0, 128, 128 ],
			"aqua" : [ 0, 255, 255 ],
			"transparent" : [ 0, 0, 0, 0 ]
		};
		var _red = 255;
		var _green = 255;
		var _blue = 255;
		var _alpha = 1;

		var _hue = 0;
		var _saturation = 0;
		var _brightness = 1;

		function rgb2hsb() {
			var rgb = [ _red, _green, _blue ];
			rgb.sort();

			var max = rgb[0];
			var min = rgb[2];

			_brightness = max / 255;
			_saturation = max === 0 ? 0 : (max - min) / max;

			if (max === _red && _green >= _blue) {
				_hue = (_green - _blue) * 60 / (max - min) + 0;
			} else if (max === _red && _green < _blue) {
				_hue = (_green - _blue) * 60 / (max - min) + 360;
			} else if (max === _green) {
				_hue = (_blue - _red) * 60 / (max - min) + 120;
			} else if (max === _blue) {
				_hue = (_red - _green) * 60 / (max - min) + 240;
			}
		}

		function hsb2rgb() {
			var i = parseInt((_hue / 60) % 6);
			var f = (_hue / 60) - i;
			var v = _brightness;
			var p = _brightness * (1 - _saturation);
			var q = _brightness * (1 - f * _saturation);
			var t = _brightness * (1 - (1 - f) * _saturation);
			var r = 1, g = 1, b = 1;
			switch (i) {
			case 0:
				r = v;
				g = t;
				b = p;
				break;
			case 1:
				r = q;
				g = v;
				b = p;
				break;
			case 2:
				r = p;
				g = v;
				b = t;
				break;
			case 3:
				r = p;
				g = q;
				b = v;
				break;
			case 4:
				r = t;
				g = p;
				b = v;
				break;
			case 5:
				r = v;
				g = p;
				b = q;
				break;
			}
			_red = parseInt(r * 255);
			_green = parseInt(g * 255);
			_blue = parseInt(b * 255);
		}

		hsb2rgb();

		/**
		 * @function kernel.external:util.Color#reset
		 */
		this.reset = function() {
			_red = _green = _blue = 255;
			_alpha = 1;
			rgb2hsb();
		};

		/**
		 * @function kernel.external:util.Color#getRed
		 * @returns {number}
		 */
		this.getRed = function() {
			return _red;
		};

		/**
		 * @function kernel.external:util.Color#getGreen
		 * @returns {number}
		 */
		this.getGreen = function() {
			return _green;
		};

		/**
		 * @function kernel.external:util.Color#getBlue
		 * @returns {number}
		 */
		this.getBlue = function() {
			return _blue;
		};

		/**
		 * @function kernel.external:util.Color#getAlpha
		 * @returns {number}
		 */
		this.getAlpha = function() {
			return _alpha;
		};

		/**
		 * @function kernel.external:util.Color#setRed
		 * @param {number}
		 *            red
		 */
		this.setRed = function(red) {
			if (!isNaN(red) && red >= 0 && red <= 255) {
				_red = parseInt(red);
				rgb2hsb();
			} else {
				kernel.debug({
					key : "out_of_range",
					params : [ "0<=" + arguments[0] + "<=255" ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		};

		/**
		 * @function kernel.external:util.Color#setGreen
		 * @param {number}
		 *            green
		 */
		this.setGreen = function(green) {
			if (!isNaN(green) && green >= 0 && green <= 255) {
				_green = parseInt(green);
				rgb2hsb();
			} else {
				kernel.debug({
					key : "out_of_range",
					params : [ "0<=" + arguments[0] + "<=255" ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		};

		/**
		 * @function kernel.external:util.Color#setBlue
		 * @param {number}
		 *            blue
		 */
		this.setBlue = function(blue) {
			if (!isNaN(blue) && blue >= 0 && blue <= 255) {
				_blue = parseInt(blue);
				rgb2hsb();
			} else {
				kernel.debug({
					key : "out_of_range",
					params : [ "0<=" + arguments[0] + "<=255" ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		};

		/**
		 * @function kernel.external:util.Color#setAlpha
		 * @param {number}
		 *            alpha
		 */
		this.setAlpha = function(alpha) {
			if (!isNaN(alpha) && alpha >= 0 && alpha <= 1) {
				_alpha = parseFloat(alpha);
			} else {
				kernel.debug({
					key : "out_of_range",
					params : [ "0<=" + arguments[0] + "<=1" ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		};

		/**
		 * @function kernel.external:util.Color#fromName
		 * @param {string}
		 *            name
		 * @returns {boolean}
		 */
		this.fromName = function(name) {
			var arr = named[name.toLowerCase()];
			if (arr) {
				_red = arr[0];
				_green = arr[1];
				_blue = arr[2];
				rgb2hsb();
				return true;
			}
			return false;
		};

		/**
		 * @function kernel.external:util.Color#fromRGB
		 * @param {string}
		 *            rgb
		 * @returns {boolean}
		 */
		this.fromRGB = function(rgb) {
			var arr = String(rgb).match(/^rgba?\(([\s\.,0-9]+)\)/i);
			if (arr.length > 1) {
				arr = arr[1].split(/\s*,\s*/);
				if (arr.length > 2) {
					this.setRed(arr[0]);
					this.setGreen(arr[1]);
					this.setBlue(arr[2]);
					this.setAlpha(arr[3]);
					return true;
				}
			}
			return false;
		};

		/**
		 * @function kernel.external:util.Color#toRGB
		 * @returns {string}
		 */
		this.toRGB = function() {
			return "rgb(" + [ _red, _green, _blue ].join(",") + ")";
		};

		/**
		 * @function kernel.external:util.Color#toRGBA
		 * @returns {string}
		 */
		this.toRGBA = function() {
			return "rgba(" + [ _red, _green, _blue, _alpha ].join(",") + ")";
		};

		/**
		 * @function kernel.external:util.Color#fromHex
		 * @param {string}
		 *            hex
		 * @returns {boolean}
		 */
		this.fromHex = function(hex) {
			var index = hex.indexOf("#");
			if (index > -1) {
				hex = hex.substr(index + 1);
			}
			var len = hex.length;
			if ((len === 6 || len === 3) && !isNaN(Number("0x" + hex))) {
				(function(i) {
					var value;
					if (len === 3) {
						var tmp = hex.substr(i, 1);
						value = Number("0x" + tmp + tmp);
					} else {
						value = Number("0x" + hex.substr(i * 2, 2));
					}
					value &= 255;
					if (i === 0) {
						_red = value;
					} else if (i === 1) {
						_green = value;
					} else {
						_blue = value;
					}
					return arguments.callee;
				})(0)(1)(2);
				rgb2hsb();
				return true;
			}
			return false;
		};

		/**
		 * @function kernel.external:util.Color#toHex
		 * @returns {string}
		 */
		this.toHex = function() {
			var hex = "#";
			(function(num) {
				var str = num.toString(16);
				if (str.length === 1) {
					str = "0" + str;
				}
				hex += str;
				return arguments.callee;
			})(_red)(_green)(_blue);
			return hex.toUpperCase();
		};

		/**
		 * @function kernel.external:util.Color#setHue
		 * @param {number}
		 *            hue
		 */
		this.setHue = function(hue) {
			if (!isNaN(hue) && hue >= 0 && hue <= 360) {
				_hue = parseInt(hue);
				hsb2rgb();
			} else {
				kernel.debug({
					key : "out_of_range",
					params : [ "0<=" + arguments[0] + "<=360" ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		};

		/**
		 * @function kernel.external:util.Color#setSaturation
		 * @param {number}
		 *            saturation
		 */
		this.setSaturation = function(saturation) {
			if (!isNaN(saturation) && saturation >= 0 && saturation <= 1) {
				_saturation = parseFloat(saturation);
				hsb2rgb();
			} else {
				kernel.debug({
					key : "out_of_range",
					params : [ "0<=" + arguments[0] + "<=1" ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		};

		/**
		 * @function kernel.external:util.Color#setBrightness
		 * @param {number}
		 *            brightness
		 */
		this.setBrightness = function(brightness) {
			if (!isNaN(brightness) && brightness >= 0 && brightness <= 1) {
				_brightness = parseFloat(brightness);
				hsb2rgb();
			} else {
				kernel.debug({
					key : "out_of_range",
					params : [ "0<=" + arguments[0] + "<=1" ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
		};

		/**
		 * @function kernel.external:util.Color#getHue
		 * @returns {number}
		 */
		this.getHue = function() {
			return _hue;
		};

		/**
		 * @function kernel.external:util.Color#getSaturation
		 * @returns {number}
		 */
		this.getSaturation = function() {
			return _saturation;
		};

		/**
		 * @function kernel.external:util.Color#getBrightness
		 * @returns {number}
		 */
		this.getBrightness = function() {
			return _brightness;
		};
	};

	/**
	 * @constant {string} kernel.external:util.Color.BLACK
	 * @default black
	 */
	kernel.util.Color.BLACK = "black";
	/**
	 * @constant {string} kernel.external:util.Color.SILVER
	 * @default silver
	 */
	kernel.util.Color.SILVER = "silver";
	/**
	 * @constant {string} kernel.external:util.Color.GRAY
	 * @default gray
	 */
	kernel.util.Color.GRAY = "gray";
	/**
	 * @constant {string} kernel.external:util.Color.WHITE
	 * @default white
	 */
	kernel.util.Color.WHITE = "white";
	/**
	 * @constant {string} kernel.external:util.Color.MAROON
	 * @default maroon
	 */
	kernel.util.Color.MAROON = "maroon";
	/**
	 * @constant {string} kernel.external:util.Color.RED
	 * @default red
	 */
	kernel.util.Color.RED = "red";
	/**
	 * @constant {string} kernel.external:util.Color.PURPLE
	 * @default purple
	 */
	kernel.util.Color.PURPLE = "purple";
	/**
	 * @constant {string} kernel.external:util.Color.FUCHSIA
	 * @default fuchsia
	 */
	kernel.util.Color.FUCHSIA = "fuchsia";
	/**
	 * @constant {string} kernel.external:util.Color.GREEN
	 * @default green
	 */
	kernel.util.Color.GREEN = "green";
	/**
	 * @constant {string} kernel.external:util.Color.LIME
	 * @default lime
	 */
	kernel.util.Color.LIME = "lime";
	/**
	 * @constant {string} kernel.external:util.Color.OLIVE
	 * @olive
	 */
	kernel.util.Color.OLIVE = "olive";
	/**
	 * @constant {string} kernel.external:util.Color.YELLOW
	 * @default yellow
	 */
	kernel.util.Color.YELLOW = "yellow";
	/**
	 * @constant {string} kernel.external:util.Color.NAVY
	 * @default navy
	 */
	kernel.util.Color.NAVY = "navy";
	/**
	 * @constant {string} kernel.external:util.Color.BLUE
	 * @default blue
	 */
	kernel.util.Color.BLUE = "blue";
	/**
	 * @constant {string} kernel.external:util.Color.TEAL
	 * @default teal
	 */
	kernel.util.Color.TEAL = "teal";
	/**
	 * @constant {string} kernel.external:util.Color.AQUA
	 * @default aqua
	 */
	kernel.util.Color.AQUA = "aqua";
	/**
	 * @constant {string} kernel.external:util.Color.TRANSPARENT
	 * @default transparent
	 */
	kernel.util.Color.TRANSPARENT = "transparent";

	/**
	 * @class kernel.external:util.Timer
	 * @since 1.2
	 * @param {kernel.external:util.Timer~executor}
	 *            executor
	 */
	kernel.util.Timer = function(executor) {
		var instance = this;
		var timeoutID = null;
		var status = 0;
		var count = 0;

		function run() {
			if (status !== 1)
				return;

			if (instance.maxCount > 0) {
				if (count > instance.maxCount) {
					instance.stop();
					instance.onTimeout();
					return;
				}
				count += 1;
			}

			try {
				executor(function() {
					if (instance.interval > 0)
						setTimeout(run, instance.interval);
				}, instance);
			} catch (e) {
				instance.stop();
				instance.onError(e);
			}
		}

		/**
		 * @function kernel.external:util.Timer#start
		 */
		this.start = function() {
			if (status === 0) {
				status = 1;
				if (instance.maxTime > 0) {
					timeoutID = setTimeout(function() {
						timeoutID = null;
						if (status === 1) {
							instance.stop();
							instance.onTimeout();
						}
					}, instance.maxTime);
				}
				run();
			}
		};

		/**
		 * @function kernel.external:util.Timer#stop
		 */
		this.stop = function() {
			status = 2;
			if (timeoutID) {
				clearTimeout(timeoutID);
				timeoutID = null;
			}
		};

		/**
		 * @function kernel.external:util.Timer#reset
		 */
		this.reset = function() {
			if (status === 2) {
				status = count = 0;
			}
		};
	};

	/**
	 * @member {number} kernel.external:util.Timer#interval
	 * @default 200
	 */
	kernel.util.Timer.prototype.interval = 200;

	/**
	 * @member {number} kernel.external:util.Timer#maxTime
	 * @default 0
	 */
	kernel.util.Timer.prototype.maxTime = 0;

	/**
	 * @member {number} kernel.external:util.Timer#maxCount
	 * @default 0
	 */
	kernel.util.Timer.prototype.maxCount = 0;

	/**
	 * @function kernel.external:util.Timer#onTimeout
	 * @abstract
	 */
	kernel.util.Timer.prototype.onTimeout = function() {
	};

	/**
	 * @function kernel.external:util.Timer#onError
	 * @abstract
	 * @param {Error}
	 *            error
	 */
	kernel.util.Timer.prototype.onError = function(error) {
	};

})(this, this["kernel@1.3"], false);
/**
 * @callback kernel.external:util.Timer~executor
 * @param {function}
 *            callback
 * @param {kernel.external:util.Timer}
 *            self
 */
(function(window, kernel, debug) {

	/**
	 * @external kernel.event
	 */
	kernel.event = {};

	/**
	 * @function kernel.external:event.addEventListener
	 * @param {Object}
	 *            obj
	 * @param {(string[]|string)}
	 *            types
	 * @param {function}
	 *            listener
	 */
	kernel.event.addEventListener = function(obj, types, listener) {
		if (kernel.lang.isString(types)) {
			types = types.split(/\s+/);
		}
		var type;
		for (var i = 0, len = types.length; i < len; i++) {
			type = types[i];
			if (obj.addEventListener) {
				obj.addEventListener(type, listener, false);
			} else {
				obj.attachEvent("on" + type, listener);
			}
		}
	};

	/**
	 * @function kernel.external:event.removeEventListener
	 * @param {Object}
	 *            obj
	 * @param {(string[]|string)}
	 *            types
	 * @param {function}
	 *            listener
	 */
	kernel.event.removeEventListener = function(obj, types, listener) {
		if (kernel.lang.isString(types)) {
			types = types.split(/\s+/);
		}
		var type;
		for (var i = 0, len = types.length; i < len; i++) {
			type = types[i];
			if (obj.removeEventListener) {
				obj.removeEventListener(type, listener, false);
			} else {
				obj.detachEvent("on" + type, listener);
			}
		}
	};

	/**
	 * @function kernel.external:event.preventDefault
	 * @param {Event}
	 *            event
	 */
	kernel.event.preventDefault = function(event) {
		event.preventDefault ? event.preventDefault()
				: event.returnValue = false;
		debug && kernel.debug({
			key : "prevent_default",
			params : [ event.type ],
			print : function(msg) {
				console.info(msg);
			}
		});
	};
	/**
	 * @function kernel.external:event.isDefaultPrevented
	 * @param {Event}
	 *            event
	 * @returns {boolean}
	 */
	kernel.event.isDefaultPrevented = function(event) {
		if ("defaultPrevented" in event) {
			return event.defaultPrevented;
		} else if (event.getPreventDefault) {
			return event.getPreventDefault();
		} else {
			return event.returnValue;
		}
	};

	/**
	 * @function kernel.external:event.stopPropagation
	 * @param {Event}
	 *            event
	 */
	kernel.event.stopPropagation = function(event) {
		event.stopPropagation ? event.stopPropagation()
				: event.cancelBubble = true;
		debug && kernel.debug({
			key : "stop_propagation",
			params : [ event.type ],
			print : function(msg) {
				console.info(msg);
			}
		});
	};
	/**
	 * @function kernel.external:event.isPropagationStopped
	 * @param {Event}
	 *            event
	 * @returns {boolean}
	 */
	kernel.event.isPropagationStopped = function(event) {
		return event.cancelBubble;
	};

	/**
	 * @function kernel.external:event.getPageCoords
	 * @param {Event}
	 *            event
	 * @returns {number[]}
	 */
	kernel.event.getPageCoords = function(event) {
		var pageX = 0, pageY = 0;
		if (event.touches && event.touches.length) {
			pageX = event.touches[0].pageX;
			pageY = event.touches[0].pageY;
		} else if ("pageX" in event) {
			pageX = event.pageX;
			pageY = event.pageY;
		} else {
			pageX = event.clientX;
			pageY = event.clientY;
			var target = kernel.event.getTarget(event);
			var dom = kernel.xml.getDocument(target);
			(function(node) {
				pageX += node.scrollLeft + node.clientLeft;
				pageY += node.scrollTop + node.clientTop;
				return arguments.callee;
			})(dom.body)(dom.documentElement);
		}
		return [ pageX, pageY ];
	};

	/**
	 * @function kernel.external:event.getTarget
	 * @param {Event}
	 *            event
	 * @returns {HTMLElement}
	 */
	kernel.event.getTarget = function(event) {
		return event.target || event.srcElement;
	};

	/**
	 * @function kernel.external:event.whichButton
	 * @param {Event}
	 *            event
	 * @param {number}
	 *            buttonCode - left=1,middle=2,right=3
	 * @returns {boolean}
	 */
	kernel.event.whichButton = function(event, buttonCode) {
		if ("which" in event) {
			debug && console.log("whichButton", "which", event.which);
			return event.which === buttonCode;
		} else {
			debug && console.log("whichButton", "button", event.button);
			switch (buttonCode) {
			case 1:
				return event.button === 1;
			case 2:
				return event.button === 4;
			case 3:
				return event.button === 2;
			}
		}
		return false;
	};

	/**
	 * @function kernel.external:event.getRollAmount
	 * @since 1.1
	 * @param {Event}
	 *            event
	 * @returns {number}
	 */
	kernel.event.getRollAmount = function(event) {
		if ("wheelDelta" in event)
			return event.wheelDelta;
		else
			return -40 * event.detail;
	};

	/**
	 * @function kernel.external:event.bindMouseWheel
	 * @since 1.1
	 * @param {Object}
	 *            obj
	 * @param {function}
	 *            handler
	 */
	kernel.event.bindMouseWheel = function(obj, handler) {
		if (obj.addEventListener) {
			if ("mousewheel" in obj)
				obj.addEventListener("mousewheel", handler, false);
			else
				obj.addEventListener("DOMMouseScroll", handler, false);
		} else {
			obj.attachEvent("onmousewheel", handler);
		}
	};

	/**
	 * @function kernel.external:event.bindChange
	 * @since 1.1
	 * @param {Object}
	 *            obj
	 * @param {function}
	 *            handler
	 */
	kernel.event.bindChange = function(obj, handler) {
		if (obj.tagName === "INPUT") {
			switch (obj.type) {
			case "checkbox":
			case "radio":
				kernel.event.addEventListener(obj, "click", handler);
				break;
			case "text":
			case "password":
			case "search":
				bindInput(obj, handler);
				break;
			default:
				kernel.event.addEventListener(obj, "change", handler);
			}
		} else if (obj.tagName === "TEXTAREA") {
			bindInput(obj, handler);
		} else {
			kernel.event.addEventListener(obj, "change", handler);
		}
	};

	function bindInput(obj, handler) {
		if (obj.addEventListener) {
			if ("oninput")
				obj.addEventListener("input", handler, false);
			else
				obj.addEventListener("textInput", handler, false);
		} else {
			obj.attachEvent("onpropertychange", handler);
		}
	}

})(this, this["kernel@1.3"], false);
(function(window, kernel, debug) {

	/**
	 * @external kernel.style
	 */
	kernel.style = {};

	function returnClassName(className) {
		var type = kernel.lang.type(className);
		var boo = true;
		switch (type) {
		case kernel.lang.STRING:
			if (className === "" || className.indexOf(" ") > -1) {
				boo = false;
			}
			break;
		case kernel.lang.ERROR:
			if (className.message) {
				boo = false;
			} else {
				className = "Error";
			}
			break;
		case kernel.lang.OBJECT:
		case kernel.lang.DATE:
		case kernel.lang.FUNCTION:
			boo = false;
		}

		if (!boo) {
			var err = new Error();
			err.message = kernel.getMessage("invalid_character");
			throw err;
		}
		return String(className);
	}

	/**
	 * @function kernel.external:style.hasClassName
	 * @throws {Error}
	 * @param {HTMLElement}
	 *            element
	 * @param {string}
	 *            className
	 * @returns {boolean}
	 */
	kernel.style.hasClassName = function(element, className) {
		if ("classList" in element) {
			return element.classList.contains(className);
		} else {
			className = returnClassName(className);
			var list = new kernel.util.List();
			list.addAll(element.className.split(/\s+/));
			return list.contains(className);
		}
		return false;
	};

	/**
	 * @function kernel.external:style.addClassName
	 * @throws {Error}
	 * @param {HTMLElement}
	 *            element
	 * @param {string}
	 *            className
	 * @returns {boolean}
	 */
	kernel.style.addClassName = function(element, className) {
		if ("classList" in element) {
			if (!element.classList.contains(className)) {
				element.classList.add(className);
				return true;
			}
		} else {
			className = returnClassName(className);
			var list = new kernel.util.List();
			list.addAll(element.className.split(/\s+/));
			if (!list.contains(className)) {
				list.add(className);
				element.className = list.toArray().join(" ");
				return true;
			}
		}
		return false;
	};

	/**
	 * @function kernel.external:style.removeClassName
	 * @throws {Error}
	 * @param {HTMLElement}
	 *            element
	 * @param {string}
	 *            className
	 * @returns {boolean}
	 */
	kernel.style.removeClassName = function(element, className) {
		if ("classList" in element) {
			if (element.classList.contains(className)) {
				element.classList.remove(className);
				return true;
			}
		} else {
			className = returnClassName(className);
			var list = new kernel.util.List();
			list.addAll(element.className.split(/\s+/));
			if (list.contains(className)) {
				list.remove(className);
				element.className = list.toArray().join(" ");
				return true;
			}
		}
		return false;
	};

	/**
	 * @function kernel.external:style.toggleClassName
	 * @throws {Error}
	 * @param {HTMLElement}
	 *            element
	 * @param {string}
	 *            className
	 */
	kernel.style.toggleClassName = function(element, className) {
		if ("classList" in element) {
			element.classList.toggle(className);
		} else {
			className = returnClassName(className);
			var list = new kernel.util.List();
			list.addAll(element.className.split(/\s+/));
			if (list.contains(className)) {
				list.remove(className);
			} else {
				list.add(className);
			}
			element.className = list.toArray().join(" ");
		}
	};

	/**
	 * @function kernel.external:style.computeStyle
	 * @param {HTMLElement}
	 *            element
	 * @param {string}
	 *            styleName
	 * @param {kernel.external:style~computeStyleParseValue}
	 *            [parseValue]
	 */
	kernel.style.computeStyle = function(element, styleName, parseValue) {
		var styleValue = element.style[styleName];
		try {
			if (window.getComputedStyle) {
				styleValue = window.getComputedStyle(element, "")[styleName];
			} else {
				styleValue = element.currentStyle[styleName];
			}
		} catch (e) {
			kernel.debug({
				key : "catch_exception",
				params : [ e.message ],
				print : function(msg) {
					console.warn(msg);
				}
			});
		}
		debug && console.log("computeStyle", element, styleName, styleValue);
		return parseValue ? parseValue(element, styleName, styleValue)
				: styleValue;
	};

	/**
	 * @class kernel.external:style.StyleSheet
	 * @param {(HTMLStyleElement|HTMLDocument)}
	 *            [node]
	 */
	kernel.style.StyleSheet = function(node) {
		var styleElement = null;
		if (node && /^(style)$/ig.test(node.nodeName)) {
			styleElement = node;
		} else {
			var document = kernel.xml.getDocument(node) || window.document;
			styleElement = kernel.html.createElement("STYLE", {
				type : "text/css"
			}, null, {
				parentNode : kernel.html.getHead(document)
			});
		}

		var sheet = styleElement.sheet || styleElement.styleSheet;

		var rules = sheet.cssRules || sheet.rules;

		/**
		 * @function kernel.external:style.StyleSheet#getStyleRules
		 * @returns {(CSSStyleRuleList|Array)}
		 */
		this.getStyleRules = function() {
			var rules;
			if (sheet.cssRules) {
				rules = [];
				var each = function(rule) {
					if (rule.type === 1) {
						rules.push(rule);
					} else if (rule.type === 4) {
						for (var i = 0, len = rule.cssRules.length; i < len; i++)
							arguments.callee(rule.cssRules[i]);
					}
				};
				kernel.lang.forEach(sheet.cssRules, each, true);
			} else {
				rules = sheet.rules;
			}
			return rules;
		};

		/**
		 * @function kernel.external:style.StyleSheet#appendStyleRule
		 * @param {string}
		 *            selector
		 * @param {string}
		 *            styleDef
		 * @returns {boolean}
		 */
		this.appendStyleRule = function(selector, styleDef) {
			var positionIndex = rules.length;

			try {
				if (sheet.insertRule) {
					var styleRule = selector + "{" + styleDef + "}";
					sheet.insertRule(styleRule, positionIndex);
				} else {
					var arr = selector.split(",");
					for (var i = 0, len = arr.length; i < len; i++)
						sheet.addRule(arr[i], styleDef, positionIndex);
				}
				return true;
			} catch (e) {
				kernel.debug({
					key : "catch_exception",
					params : [ e.message ],
					print : function(msg) {
						console.warn(msg);
					}
				});
			}
			return false;
		};

		/**
		 * 
		 * @function kernel.external:style.StyleSheet#setDisabled
		 * @param {boolean}
		 *            disabled
		 */
		this.setDisabled = function(disabled) {
			sheet.disabled = disabled;
		};

		/**
		 * @function kernel.external:style.StyleSheet#isDisabled
		 * @returns {boolean}
		 */
		this.isDisabled = function() {
			return sheet.disabled;
		};
	};

	/**
	 * @class kernel.external:style.RuntimeStyle
	 * @param {HTMLElement}
	 *            element
	 */
	kernel.style.RuntimeStyle = function(element) {
		var styleMap = new kernel.util.HashMap();
		var instance = this;

		/**
		 * @function kernel.external:style.RuntimeStyle#set
		 * @param {string}
		 *            styleName
		 * @param {*}
		 *            styleValue
		 */
		this.set = function(styleName, styleValue) {
			if (element.runtimeStyle) {
				element.runtimeStyle[styleName] = styleValue;
				styleMap.push(styleName, styleValue);
			} else {
				if (!styleMap.containsKey(styleName)) {
					styleMap.push(styleName, element.style[styleName]);
				}
				element.style[styleName] = styleValue;
			}
		};

		/**
		 * @function kernel.external:style.RuntimeStyle#restore
		 * @param {string}
		 *            styleName
		 */
		this.restore = function(styleName) {
			if (element.runtimeStyle) {
				element.runtimeStyle.removeAttribute(styleName);
			} else if (styleMap.containsKey(styleName)) {
				element.style[styleName] = styleMap.get(styleName);
			}
			styleMap.remove(styleName);
		};

		/**
		 * @function kernel.external:style.RuntimeStyle#restoreAll
		 */
		this.restoreAll = function() {
			styleMap.forEach(function(value, key) {
				instance.restore(key);
			});
			styleMap.clear();
		};

	};

})(this, this["kernel@1.3"], false);
/**
 * @callback kernel.external:style~computeStyleParseValue
 * @param {HTMLElement}
 *            element
 * @param {string}
 *            styleName
 * @param {*}
 *            styleValue
 * @returns {*}
 */
(function(window, kernel, debug) {

	/**
	 * @external kernel.base64
	 */
	kernel.base64 = {};

	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var base64DecodeChars = [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1,
			-1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1,
			-1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
			17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27,
			28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
			45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1 ];

	/**
	 * @function kernel.external:base64.encode
	 * @param {string}
	 *            str
	 * @param {kernel.external:base64~escape}
	 *            [escape]
	 * @returns {string}
	 */
	kernel.base64.encode = function(str, escape) {
		if (kernel.lang.isFunction(escape))
			str = escape(str);

		var c1, c2, c3;
		var returnVal = "", i = 0, len = str.length;
		while (i < len) {
			c1 = str.charCodeAt(i++) & 0xff;
			if (i === len) {
				returnVal += base64EncodeChars.charAt(c1 >> 2);
				returnVal += base64EncodeChars.charAt((c1 & 0x3) << 4);
				returnVal += "==";
				break;
			}
			c2 = str.charCodeAt(i++);
			if (i === len) {
				returnVal += base64EncodeChars.charAt(c1 >> 2);
				returnVal += base64EncodeChars.charAt(((c1 & 0x3) << 4)
						| ((c2 & 0xF0) >> 4));
				returnVal += base64EncodeChars.charAt((c2 & 0xF) << 2);
				returnVal += "=";
				break;
			}
			c3 = str.charCodeAt(i++);
			returnVal += base64EncodeChars.charAt(c1 >> 2);
			returnVal += base64EncodeChars.charAt(((c1 & 0x3) << 4)
					| ((c2 & 0xF0) >> 4));
			returnVal += base64EncodeChars.charAt(((c2 & 0xF) << 2)
					| ((c3 & 0xC0) >> 6));
			returnVal += base64EncodeChars.charAt(c3 & 0x3F);
		}
		return returnVal;
	};

	/**
	 * @function kernel.external:base64.decode
	 * @param {string}
	 *            str
	 * @param {kernel.external:base64~unescape}
	 *            [unescape]
	 * @returns {string}
	 */
	kernel.base64.decode = function(str, unescape) {
		if (!kernel.lang.isFunction(unescape))
			unescape = function(str) {
				return str;
			};

		var c1, c2, c3, c4;
		var returnVal = "", i = 0, len = str.length;
		while (i < len) {
			do {
				c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
			} while (i < len && c1 === -1);
			if (c1 === -1)
				break;
			do {
				c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
			} while (i < len && c2 === -1);
			if (c2 === -1)
				break;
			returnVal += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
			do {
				c3 = str.charCodeAt(i++) & 0xff;
				if (c3 === 61)
					return unescape(returnVal);
				c3 = base64DecodeChars[c3];
			} while (i < len && c3 === -1);
			if (c3 === -1)
				break;
			returnVal += String.fromCharCode(((c2 & 0XF) << 4)
					| ((c3 & 0x3C) >> 2));
			do {
				c4 = str.charCodeAt(i++) & 0xff;
				if (c4 === 61)
					return unescape(returnVal);
				c4 = base64DecodeChars[c4];
			} while (i < len && c4 === -1);
			if (c4 === -1)
				break;
			returnVal += String.fromCharCode(((c3 & 0x03) << 6) | c4);
		}
		return unescape(returnVal);
	};

})(this, this["kernel@1.3"], false);
/**
 * @callback kernel.external:base64~escape
 * @param {string}
 *            str
 * @returns {string}
 */
/**
 * @callback kernel.external:base64~unescape
 * @param {string}
 *            str
 * @returns {string}
 */
(function(window, kernel, debug) {

	/**
	 * @external kernel.cookie
	 */
	kernel.cookie = {};

	/**
	 * @function kernel.external:cookie.write
	 * @param {string}
	 *            name
	 * @param {string}
	 *            value
	 * @param {Object}
	 *            [opt]
	 * @param {(Date|string)}
	 *            [opt.expires]
	 * @param {number}
	 *            [opt.hours]
	 * @param {string}
	 *            [opt.path]
	 * @param {string}
	 *            [opt.domain]
	 * @param {boolean}
	 *            [opt.secure=false]
	 */
	kernel.cookie.write = function(name, value, opt) {
		opt = opt || {};
		var arr = [ name + "=" + encodeURIComponent(value) ];
		var expires = null;
		if (opt) {
			if (kernel.lang.isDate(opt, "expires")) {
				expires = opt.expires.toGMTString();
			} else if (opt.expires) {
				expires = opt.expires;
			} else if (kernel.lang.isNumber(opt, "hours") && opt.hours > 0) {
				expires = new Date().getTime() + opt.hours * 1000 * 60 * 60;
				expires = new Date(expires).toGMTString();
			}
			if (expires)
				arr.push("expires=" + expires);
			if (opt.path)
				arr.push("path=" + opt.path);
			if (opt.domain)
				arr.push("domain=" + opt.domain);
			if (opt.secure)
				arr.push("secure");
		}
		document.cookie = arr.join(";");
	};

	/**
	 * @function kernel.external:cookie.read
	 * @param {string}
	 *            name
	 * @returns {?string}
	 */
	kernel.cookie.read = function(name) {
		var cookieValue = null;
		var search = name + "=";
		if (document.cookie) {
			var offset = document.cookie.indexOf(search);
			if (offset > -1) {
				offset += search.length;
				var end = document.cookie.indexOf(";", offset);
				end === -1 && (end = document.cookie.length);
				cookieValue = decodeURIComponent(document.cookie.substring(
						offset, end));
			}
		}
		return cookieValue;
	};

	/**
	 * @function kernel.external:cookie.remove
	 * @param {string}
	 *            name
	 * @param {function}
	 *            [callback]
	 */
	kernel.cookie.remove = function(name, callback) {
		document.cookie = name + "=;expires=" + new Date().toGMTString();
		callback && setTimeout(callback);
	};

	/**
	 * @function kernel.external:cookie.isEnabled
	 * @returns {boolean}
	 */
	kernel.cookie.isEnabled = function() {
		return navigator.cookieEnabled;
	};

})(this, this["kernel@1.3"], false);(function(window, kernel, debug) {
	/**
	 * @external kernel.message
	 * @since 1.1
	 */
	kernel.message = {};

	var dispatcher = null, map = null;

	function getDispatcher() {
		if (!dispatcher) {
			dispatcher = new kernel.util.EventDispatcher();
			map = new kernel.util.HashMap();
			kernel.event.addEventListener(window, "message", onMessage);
		}
		return dispatcher;
	}

	/**
	 * @function kernel.external:message.isPostSupported
	 * @returns {boolean}
	 */
	kernel.message.isPostSupported = function() {
		return "postMessage" in window;
	};

	/**
	 * @function kernel.external:message.trigger
	 * @private
	 * @since 1.2
	 * @param {Window}
	 *            source
	 * @param {string}
	 *            json
	 */
	kernel.message.trigger = function(source, json) {
		debug && console.log("trigger", source, json);
		onMessage({
			type : "message",
			source : source,
			origin : "*",
			data : json
		});
	};

	/**
	 * @function kernel.external:message.post
	 * @throws {Error}
	 * @param {Window}
	 *            target
	 * @param {string}
	 *            type
	 * @param {*}
	 *            message
	 * @param {string}
	 *            [transferList]
	 */
	kernel.message.post = function(target, type, message, transferList) {
		var transferData = new TransferData();
		transferData.requestType = type;
		transferData.message = message;
		postMessage(target, transferData, transferList);
	};

	/**
	 * @function kernel.external:message.bind
	 * @param {string}
	 *            type
	 * @param {function}
	 *            handler
	 */
	kernel.message.bind = function(type, handler) {
		getDispatcher().addEventListener(type, handler);
	};

	/**
	 * @function kernel.external:message.unbind
	 * @param {string}
	 *            type
	 * @param {function}
	 *            handler
	 */
	kernel.message.unbind = function(type, handler) {
		getDispatcher().removeEventListener(type, handler);
	};

	/**
	 * 
	 * @class kernel.external:message.Requestor
	 */
	kernel.message.Requestor = function() {
		var worker = null;
		var key = null;
		var transferList = null;
		var handlerList = new kernel.util.List();
		var headerMap = new kernel.util.HashMap();

		/**
		 * @function kernel.external:message.Requestor#open
		 * @param {Window}
		 *            target
		 * @param {string}
		 *            urn
		 * @param {function}
		 *            [onComplete]
		 * @param {function}
		 *            [onErrorOrTimeout]
		 * @returns {kernel.external:util.Promise}
		 */
		this.open = function(target, urn, onComplete, onErrorOrTimeout) {
			this.close();
			var delay = this.timeout > 0 && isFinite(this.timeout) ? this.timeout
					: 0;
			var status = 0;

			var transferData = new TransferData("open");
			transferData.urn = urn;

			var promise = new kernel.util.Promise(function(resolve, reject) {

				var timer = new kernel.util.Timer(function(callback, self) {
					if (status !== 2) {
						status = 1;
						postMessage(target, transferData);
						callback();
					}
				});
				timer.interval = 100;
				timer.maxTime = delay;

				var handler = function(evt, err) {
					if (status === 2)
						return;

					status = 2;
					handlerList.remove(arguments.callee);
					kernel.message.unbind(transferData.responseType,
							arguments.callee);
					if (evt) {
						timer.stop();
						worker = target;
						key = urn;
						transferList = evt.origin;
						resolve();
					} else {
						reject(err);
					}
				};

				handlerList.add(handler);
				kernel.message.bind(transferData.responseType, handler);

				timer.onError = function(e) {
					handler(null, e);
				};
				timer.onTimeout = function() {
					handler();
				};
				timer.start();
			});

			return promise.then(onComplete, onErrorOrTimeout);
		};

		/**
		 * @function kernel.external:message.Requestor#send
		 * @param {*}
		 *            message
		 * @param {function}
		 *            [onComplete]
		 * @param {function}
		 *            [onErrorOrTimeout]
		 * @returns {kernel.external:util.Promise}
		 */
		this.send = function(message, onComplete, onErrorOrTimeout) {
			var delay = this.timeout > 0 && isFinite(this.timeout) ? this.timeout
					: 0;
			var status = 0;

			var promise = new kernel.util.Promise(function(resolve, reject) {

				if (!worker) {
					var err = new Error();
					err.message = kernel.getMessage("logical_error");
					throw err;
				}

				var transferData = new TransferData("send");
				transferData.urn = key;
				transferData.message = message;
				transferData.headers = headerMap.toObject();

				var handler = function(evt, err) {
					if (status === 2)
						return;

					status = 2;
					handlerList.remove(arguments.callee);
					kernel.message.unbind(transferData.responseType,
							arguments.callee);
					if (worker) {
						evt ? resolve(evt.data) : reject(err);
					}
				};

				handlerList.add(handler);
				kernel.message.bind(transferData.responseType, handler);
				delay && setTimeout(handler, delay);

				try {
					status = 1;
					postMessage(worker, transferData, transferList);
				} catch (e) {
					handler(null, e);
				}
			});

			return promise.then(onComplete, onErrorOrTimeout);
		};

		/**
		 * @function kernel.external:message.Requestor#close
		 */
		this.close = function() {
			handlerList.forEach(function(handler) {
				handler();
			});

			worker = null;
			key = null;
			transferList = null;
		};

		/**
		 * @function kernel.external:message.Requestor#addHeader
		 * @since 1.2
		 * @param {string}
		 *            name
		 * @param {string}
		 *            value
		 */
		this.addHeader = function(name, value) {
			var arr = headerMap.get(name);
			if (!arr) {
				headerMap.put(name, arr = []);
			}
			arr.unshift(value);
		};

		/**
		 * @function kernel.external:message.Requestor#setHeader
		 * @since 1.2
		 * @param {string}
		 *            name
		 * @param {string}
		 *            value
		 */
		this.setHeader = function(name, value) {
			var arr = headerMap.get(name);
			if (!arr) {
				headerMap.put(name, arr = []);
			}
			arr[0] = value;
		};

		/**
		 * @function kernel.external:message.Requestor#removeHeader
		 * @since 1.2
		 * @param {string}
		 *            name
		 */
		this.removeHeader = function(name) {
			headerMap.remove(name);
		};

		/**
		 * @function kernel.external:message.Requestor#getHeader
		 * @since 1.2
		 * @param {string}
		 *            name
		 * @returns {string}
		 */
		this.getHeader = function(name) {
			var arr = headerMap.get(name);
			if (arr) {
				return arr.join(",");
			} else {
				return "";
			}
		};

		/**
		 * @function kernel.external:message.Requestor#getHeaderValues
		 * @since 1.2
		 * @param {string}
		 *            name
		 * @returns {string[]}
		 */
		this.getHeaderValues = function(name) {
			var arr = headerMap.get(name);
			if (arr) {
				return arr.concat([]);
			} else {
				return [];
			}
		};

		/**
		 * @function kernel.external:message.Requestor#getHeaderNames
		 * @since 1.2
		 * @returns {string[]}
		 */
		this.getHeaderNames = function() {
			return headerMap.keys();
		};
	};

	/**
	 * @member {number} kernel.external:message.Requestor#timeout
	 * @default 300000
	 */
	kernel.message.Requestor.prototype.timeout = 300000;

	/**
	 * @class kernel.external:message.Provider
	 * @param {string}
	 *            urn
	 */
	kernel.message.Provider = function(urn) {
		getDispatcher();
		if (kernel.lang.isBlank(urn)) {
			kernel.debug({
				key : "is_blank",
				params : [ "urn" ],
				print : function(msg) {
					console.warn(msg);
				}
			});
		} else {
			map.put(urn, this);
			debug && console.log("Provider URN:", urn);
		}

		/**
		 * @function kernel.external:message.Provider#destroy
		 */
		this.destroy = function() {
			map.remove(urn);
		};
	};

	/**
	 * @function kernel.external:message.Provider#reply
	 * @param {Object}
	 *            info
	 * @param {string}
	 *            info.urn
	 * @param {*}
	 *            info.message
	 * @param {Window}
	 *            info.source
	 * @param {string}
	 *            info.origin
	 * @param {function}
	 *            callback
	 */
	kernel.message.Provider.prototype.reply = function(info, callback) {
		callback(null);
	};

	function TransferData(action) {
		this.urn = null;
		this.message = null;
		this.requestType = null;
		this.responseType = null;
		this.headers = null;

		if (action) {
			var num = serializer();
			this.responseType = action + ":1:" + num;
			this.requestType = action + ":0:" + num;
		}
	}

	function isTransferData(data) {
		var boo = kernel.lang.isObject(data);
		if (!boo) {
			return false;
		}

		kernel.lang.forEach(
				[ "urn", "message", "requestType", "responseType" ], function(
						name) {
					boo = data.hasOwnProperty(name);
					return !boo;
				});
		debug && console.log("isTransferData:", boo);
		return boo;
	}

	function postMessage(worker, data, transferList) {
		var json = kernel.json.stringify(data, kernel.json.replacer);
		debug && console.log(json);

		if (kernel.message.isPostSupported()) {
			if (kernel.lang.isBlank(transferList) || transferList === "null")
				transferList = "*";

			worker.postMessage(json, transferList);
		} else {
			var boo = true;
			try {
				kernel.lang.forEach(worker, function(obj, key) {
					boo = false;
					if (/^kernel@\d+\.\d+$/g.test(key)
							&& kernel.lang.isFunction(obj, "message.trigger",
									".")) {
						obj.message.trigger(window, json);
					}
				});
			} catch (e) {
			}
			if (boo) {
				var err = new Error();
				err.message = kernel.getMessage("not_support");
				throw err;
			}
		}
	}

	function onMessage(event) {
		debug && console.log("onmessage", event);

		var source = event.source;
		var origin = event.origin;
		var promise = new kernel.util.Promise(function(resolve) {
			if (kernel.lang.isString(event.data)) {
				var data = kernel.json.parse(event.data, kernel.json.reviver);
				if (isTransferData(data))
					resolve(data);
			}
		});
		promise.then(function(data) {
			debug && console.log("dispatch", data);
			var evt = new kernel.util.Event(data.requestType);
			evt.data = data.message;
			evt.source = source;
			evt.origin = origin;
			getDispatcher().dispatchEvent(evt);
		});
		promise.then(function(data) {
			if (kernel.lang.isBlank(data, "urn"))
				return;

			var provider = map.get(data.urn);
			if (!provider)
				return;

			var reg = /^(test|open|send|close):0:\d+\.\d{4}$/g;
			var arr = reg.exec(data.requestType);
			if (!arr)
				return;

			var callback = function(message) {
				if (kernel.lang.isBlank(data, "responseType"))
					return;

				var transferData = new TransferData();
				transferData.requestType = data.responseType;
				transferData.message = message;
				postMessage(source, transferData, origin);
			};
			var info = {
				urn : data.urn,
				message : data.message,
				headers : data.headers,
				source : source,
				origin : origin
			};

			switch (arr[1]) {
			case "test":
			case "open":
				callback(null);
				break;
			case "send":
				provider.reply(info, callback);
				break;
			}
		}).then(null, function(e) {
			kernel.debug({
				print : function() {
					console.error(e);
				}
			});
		});

	}

	function serializer() {
		var timestamp = kernel.lang.now();
		var num = parseInt(kernel.lang.random(0, 9999));
		num = kernel.lang.zeroize(num, 4);
		return timestamp + "." + num;
	}

})(this, this["kernel@1.3"], false);(function(window, kernel, debug) {

	/**
	 * @external kernel.storage
	 * @since 1.1
	 */
	kernel.storage = {};

	var userData = null;
	var prefix = "_";
	var url = "#default#userdata";

	/**
	 * @function kernel.external:storage.setItem
	 * @param {string}
	 *            key
	 * @param {string}
	 *            value
	 */
	kernel.storage.setItem = function(key, value) {
		key = prefix + key;
		if (window.localStorage) {
			localStorage.setItem(key, value);
			debug && console.log("storage.setItem", "localStorage");
		} else if ((userData = document.body).addBehavior) {
			userData.addBehavior(url);
			var expires = new Date();
			expires.setDate(expires.getDate() + 365);
			userData.expires = expires.toUTCString();
			userData.setAttribute(key, value);
			try {
				userData.save(key);
				debug && alert("storage.setItem:userData");
			} catch (e) {
			}
		} else {
			debug && alert("storage.setItem:none");
		}
	};

	/**
	 * @function kernel.external:storage.getItem
	 * @param {string}
	 *            key
	 * @returns {?string}
	 */
	kernel.storage.getItem = function(key) {
		key = prefix + key;
		if (window.localStorage) {
			return localStorage.getItem(key);
		} else if ((userData = document.body).addBehavior) {
			userData.addBehavior(url);
			try {
				userData.load(key);
			} catch (e) {
			}
			return userData.getAttribute(key);
		}
		return null;
	};

	/**
	 * @function kernel.external:storage.removeItem
	 * @param {string}
	 *            key
	 */
	kernel.storage.removeItem = function(key) {
		key = prefix + key;
		if (window.localStorage) {
			localStorage.removeItem(key);
		} else if ((userData = document.body).addBehavior) {
			userData.addBehavior(url);
			userData.removeAttribute(key);
			try {
				userData.save(key);
			} catch (e) {
			}
		}
	};

})(this, this["kernel@1.3"], false);
(function(window, kernel, debug) {

	/**
	 * @external kernel.platform
	 */
	kernel.platform = {};

	var next = 0;

	/**
	 * @function kernel.external:platform.requestAnimationFrame
	 * @param {Window}
	 *            window
	 * @param {function}
	 *            callback
	 * @returns {number}
	 */
	kernel.platform.requestAnimationFrame = function(window, callback) {
		var requestAnimationFrame = window.requestAnimationFrame
				|| window.mozRequestAnimationFrame
				|| window.webkitRequestAnimationFrame
				|| window.msRequestAnimationFrame;
		if (!kernel.lang.isFunction(requestAnimationFrame)) {
			requestAnimationFrame = function(callback) {
				var now = kernel.lang.now();
				next = Math.max(next + 16, now);
				return window.setTimeout(function() {
					callback(next);
				}, next - now);
			};
		}
		return requestAnimationFrame(callback);
	};

	/**
	 * @function kernel.external:platform.cancelAnimationFrame
	 * @param {Window}
	 *            window
	 * @param {number}
	 *            requestID
	 */
	kernel.platform.cancelAnimationFrame = function(window, requestID) {
		var cancelAnimationFrame = window.cancelAnimationFrame
				|| window.mozCancelAnimationFrame
				|| window.webkitCancelAnimationFrame
				|| window.msCancelAnimationFrame;
		if (!kernel.lang.isFunction(cancelAnimationFrame)) {
			cancelAnimationFrame = function(timeoutID) {
				clearTimeout(timeoutID);
			};
		}
		cancelAnimationFrame(requestID);
	};

	/**
	 * @function kernel.external:platform.getDevicePixelRatio
	 * @returns {number}
	 */
	kernel.platform.getDevicePixelRatio = function() {
		return Number(window.devicePixelRatio || 1);
	};

	/**
	 * @function kernel.external:platform.getBackingStoreRatio
	 * @param {CanvasRenderingContext2D}
	 *            context
	 * @returns {number}
	 */
	kernel.platform.getBackingStoreRatio = function(context) {
		return Number(context.webkitBackingStorePixelRatio
				|| context.mozBackingStorePixelRatio
				|| context.msBackingStorePixelRatio
				|| context.oBackingStorePixelRatio
				|| context.backingStorePixelRatio || 1);
	};

	/**
	 * @function kernel.external:platform.isSaveOrOpenSupported
	 * @since 1.1
	 * @returns {boolean}
	 */
	kernel.platform.isSaveOrOpenSupported = function() {
		if (kernel.lang.isFunction(navigator, "msSaveOrOpenBlob")) {
			return true;
		}

		var view = window;
		var URL = view.URL || view.webkitURL || view;
		if (kernel.lang.isFunction(URL, "createObjectURL")) {
			return true;
		}
		return false;
	};
	/**
	 * @function kernel.external:platform.saveOrOpen
	 * @since 1.1
	 * @param {(Blob|File)}
	 *            blob
	 * @param {string}
	 *            name
	 */
	kernel.platform.saveOrOpen = function(blob, name) {
		/* ie10+ */
		if (kernel.lang.isFunction(navigator, "msSaveOrOpenBlob")) {
			navigator.msSaveOrOpenBlob(blob, name);
			return;
		}

		var view = window;
		var URL = view.URL || view.webkitURL || view;
		if (kernel.lang.isFunction(URL, "createObjectURL")) {
			var doc = view.document;
			var url = URL.createObjectURL(blob);
			kernel.event.addEventListener(window, "unload", function() {
				URL.revokeObjectURL(url);
			});
			var link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a");
			if ("download" in link) {
				link.href = url;
				link.download = name;
				var event = doc.createEvent("MouseEvents");
				event.initMouseEvent("click", true, false, view, 0, 0, 0, 0, 0,
						false, false, false, false, 0, null);
				link.dispatchEvent(event);
			} else {
				try {
					window.open(url, "_blank");
				} catch (e) {
					location.href = url;
				}
			}
		}
	};

})(this, this["kernel@1.3"], false);(function(window, kernel, debug) {

	function returnKey(key) {
		var type = kernel.lang.type(key);
		switch (type) {
		case kernel.lang.BOOLEAN:
		case kernel.lang.NUMBER:
		case kernel.lang.NULL:
		case kernel.lang.UNDEFINED:
			key = String(key);
			break;
		}
		return key;
	}

	/**
	 * @class kernel.external:util.AbstractMap
	 */
	kernel.util.AbstractMap = function() {
	};

	/**
	 * 
	 * @function kernel.external:util.AbstractMap#put
	 * @abstract
	 * @param {kernel~K}
	 *            key
	 * @param {kernel~V}
	 *            value
	 */
	kernel.util.AbstractMap.prototype.put = function(key, value) {
	};

	/**
	 * 
	 * @function kernel.external:util.AbstractMap#putAll
	 * @param {kernel.external:util.AbstractMap}
	 *            map
	 */
	kernel.util.AbstractMap.prototype.putAll = function(map) {
		var instance = this;
		map.forEach(function(value, key) {
			instance.put(value, key);
		});
	};

	/**
	 * 
	 * @function kernel.external:util.AbstractMap#get
	 * @abstract
	 * @param {kernel~K}
	 *            key
	 * @returns {kernel~V}
	 */
	kernel.util.AbstractMap.prototype.get = function(key) {
		return undefined;
	};
	/**
	 * @function kernel.external:util.AbstractMap#remove
	 * @abstract
	 * @param {kernel~K}
	 *            key
	 */
	kernel.util.AbstractMap.prototype.remove = function(key) {
	};

	/**
	 * 
	 * @function kernel.external:util.AbstractMap#containsKey
	 * @abstract
	 * @param {kernel~K}
	 *            key
	 * @returns {boolean}
	 */
	kernel.util.AbstractMap.prototype.containsKey = function(key) {
		return false;
	};

	/**
	 * 
	 * @function kernel.external:util.AbstractMap#containsValue
	 * @abstract
	 * @param {kernel~V}
	 *            value
	 * @returns {boolean}
	 */
	kernel.util.AbstractMap.prototype.containsValue = function(value) {
		return false;
	};

	/**
	 * 
	 * @function kernel.external:util.AbstractMap#clear
	 * @abstract
	 */
	kernel.util.AbstractMap.prototype.clear = function() {
	};

	/**
	 * @function kernel.external:util.AbstractMap#size
	 * @returns {number}
	 */
	kernel.util.AbstractMap.prototype.size = function() {
		return this.keys().length;
	};

	/**
	 * @function kernel.external:util.AbstractMap#isEmpty
	 * @returns {boolean}
	 */
	kernel.util.AbstractMap.prototype.isEmpty = function() {
		return this.size() === 0;
	};

	/**
	 * 
	 * @function kernel.external:util.AbstractMap#keys
	 * @abstract
	 * @returns {kernel~K[]}
	 */
	kernel.util.AbstractMap.prototype.keys = function() {
		return [];
	};
	/**
	 * @function kernel.external:util.AbstractMap#values
	 * @abstract
	 * @returns {kernel~V[]}
	 */
	kernel.util.AbstractMap.prototype.values = function() {
		return [];
	};

	/**
	 * @function kernel.external:util.AbstractMap#forEach
	 * @abstract
	 * @param {kernel.external:util.AbstractMap~forEachCallback}
	 *            callback
	 */
	kernel.util.AbstractMap.prototype.forEach = function(callback) {
	};

	/**
	 * @class kernel.external:util.HashMap
	 * @augments kernel.external:util.AbstractMap
	 */
	kernel.util.HashMap = function() {
		this.constructor = arguments.callee;

		var obj = {};

		/**
		 * @function kernel.external:util.HashMap#put
		 * @param {string}
		 *            key
		 * @param {*}
		 *            value
		 */
		this.put = function(key, value) {
			obj[key] = value;
		};

		/**
		 * @function kernel.external:util.HashMap#get
		 * @param {string}
		 *            key
		 */
		this.get = function(key) {
			if (obj.hasOwnProperty(key)) {
				return obj[key];
			} else {
				return undefined;
			}
		};

		/**
		 * @function kernel.external:util.HashMap#remove
		 * @param {string}
		 *            key
		 */
		this.remove = function(key) {
			try {
				delete obj[key];
			} catch (e) {
				obj[key] = undefined;
			}
		};

		/**
		 * @function kernel.external:util.HashMap#containsKey
		 * @param {string}
		 *            key
		 * @returns {boolean}
		 */
		this.containsKey = function(key) {
			return obj.hasOwnProperty(key);
		};

		/**
		 * @function kernel.external:util.HashMap#containsValue
		 * @param {*}
		 *            value
		 * @returns {boolean}
		 */
		this.containsValue = function(value) {
			for ( var key in obj)
				if (obj.hasOwnProperty(key)
						&& kernel.lang.equals(value, obj[key])) {
					return true;
				}
			return false;
		};

		/**
		 * @function kernel.external:util.HashMap#clear
		 */
		this.clear = function() {
			obj = {};
		};

		/**
		 * @function kernel.external:util.HashMap#keys
		 * @returns {string[]}
		 */
		this.keys = function() {
			var arr = [];
			this.forEach(function(value, key) {
				arr.push(key);
			});
			return arr;
		};
		/**
		 * @function kernel.external:util.HashMap#values
		 * @returns {Array}
		 */
		this.values = function() {
			var arr = [];
			this.forEach(function(value, key) {
				arr.push(value);
			});
			return arr;
		};

		/**
		 * @function kernel.external:util.HashMap#forEach
		 * @param {kernel.external:util.HashMap~forEachCallback}
		 *            callback
		 */
		this.forEach = function(callback) {
			for ( var key in obj)
				obj.hasOwnProperty(key) && callback(obj[key], key);
		};

	};
	kernel.util.HashMap.prototype = new kernel.util.AbstractMap();

	/**
	 * @function kernel.external:util.HashMap#toObject
	 * @since 1.2
	 * @returns {Object}
	 */
	kernel.util.HashMap.prototype.toObject = function() {
		var obj = {};
		this.forEach(function(value, key) {
			obj[key] = value;
		});
		return obj;
	};

	/**
	 * @class kernel.external:util.Map
	 * @augments kernel.external:util.AbstractMap
	 */
	kernel.util.Map = function() {
		this.constructor = arguments.callee;

		if (kernel.lang.isFunction(window, "Map")) {
			debug && console.log("Window.Map");

			var _map = new Map();

			this.put = function(key, value) {
				key = returnKey(key);
				_map.set(key, value);
			};

			this.get = function(key) {
				key = returnKey(key);
				return _map.get(key);
			};

			this.remove = function(key) {
				key = returnKey(key);
				_map["delete"](key);
			};

			this.containsKey = function(key) {
				key = returnKey(key);
				return _map.has(key);
			};

			this.containsValue = function(value) {
				return kernel.lang.contains(this.values(), value);
			};

			this.clear = function() {
				_map.clear();
			};

			this.size = function() {
				return _map.size;
			};

			this.keys = function() {
				var arr = [];
				if (kernel.lang.isFunction(_map, "keys")) {
					var iterator = _map.keys();
					for (var i = 0, len = _map.size; i < len; i++)
						arr.push(iterator.next().value);
				} else {
					_map.forEach(function(value, key) {
						arr.push(key);
					});
				}
				return arr;
			};

			this.values = function() {
				var arr = [];
				if (kernel.lang.isFunction(_map, "values")) {
					var iterator = _map.values();
					for (var i = 0, len = _map.size; i < len; i++)
						arr.push(iterator.next().value);
				} else {
					_map.forEach(function(value, key) {
						arr.push(value);
					});
				}
				return arr;
			};

			this.forEach = function(callback) {
				if (_map.forEach) {
					_map.forEach(function(value, key) {
						callback(value, key);
					});
				} else {
					var iterator_key = _map.keys();
					var iterator_value = _map.values();
					for (var i = 0, len = _map.size; i < len; i++)
						callback(iterator_value.next().value, iterator_key
								.next().value);
				}
			};

		} else {
			var keyList = new kernel.util.List();
			var valueList = new kernel.util.List();

			/**
			 * @function kernel.external:util.Map#put
			 * @param {*}
			 *            key
			 * @param {*}
			 *            value
			 */
			this.put = function(key, value) {
				key = returnKey(key);
				var index = keyList.indexOf(key);
				if (index === -1) {
					keyList.add(key);
					valueList.add(value);
				} else {
					valueList.set(index, value);
				}
			};

			/**
			 * @function kernel.external:util.Map#get
			 * @param {*}
			 *            key
			 * @returns {*}
			 */
			this.get = function(key) {
				key = returnKey(key);
				return valueList.get(keyList.indexOf(key));
			};

			/**
			 * @function kernel.external:util.Map#remove
			 * @param {*}
			 *            key
			 */
			this.remove = function(key) {
				key = returnKey(key);
				var index = keyList.indexOf(key);
				if (index > -1) {
					keyList.removeByIndex(index);
					valueList.removeByIndex(index);
				}
			};

			/**
			 * @function kernel.external:util.Map#containsKey
			 * @param {*}
			 *            key
			 * @returns {boolean}
			 */
			this.containsKey = function(key) {
				key = returnKey(key);
				return keyList.contains(key);
			};

			/**
			 * @function kernel.external:util.Map#containsValue
			 * @param {*}
			 *            value
			 * @returns {boolean}
			 */
			this.containsValue = function(value) {
				return valueList.contains(value);
			};

			/**
			 * @function kernel.external:util.Map#clear
			 */
			this.clear = function() {
				keyList.clear();
				valueList.clear();
			};

			/**
			 * @function kernel.external:util.Map#size
			 * @returns {number}
			 */
			this.size = function() {
				return keyList.size();
			};

			/**
			 * @function kernel.external:util.Map#keys
			 * @returns {Array}
			 */
			this.keys = function() {
				return keyList.toArray();
			};

			/**
			 * @function kernel.external:util.Map#values
			 * @returns {Array}
			 */
			this.values = function() {
				return valueList.toArray();
			};

			/**
			 * @function kernel.external:util.Map#forEach
			 * @param {kernel.external:util.Map~forEachCallback}
			 *            callback
			 */
			this.forEach = function(callback) {
				var keys = this.keys();
				var values = this.values();
				for (var i = 0, len = keys.length; i < len; i++)
					callback(values[i], keys[i]);
			};

		}

	};
	kernel.util.Map.prototype = new kernel.util.AbstractMap();

})(this, this["kernel@1.3"], false);
/**
 * @callback kernel.external:util.AbstractMap~forEachCallback
 * @param {kernel~V}
 *            value
 * @param {kernel~K}
 *            key
 */
/**
 * @callback kernel.external:util.HashMap~forEachCallback
 * @param {*}
 *            value
 * @param {string}
 *            key
 */
/**
 * @callback kernel.external:util.Map~forEachCallback
 * @param {*}
 *            value
 * @param {*}
 *            key
 */
(function(window, kernel, debug) {

	/**
	 * @external kernel.selection
	 */
	kernel.selection = {};

	function deleteFromControl(input) {
		var index = input.selectionStart;
		input.value = input.value.substring(0, index)
				+ input.value.substr(input.selectionEnd);
		input.selectionStart = input.selectionEnd = index;
	}

	function updateFromControl(input, text) {
		var index = input.selectionStart;
		var value = input.value.substring(0, index);
		value += text;
		var length = value.length;
		input.value = value + input.value.substr(input.selectionEnd);
		input.selectionStart = index;
		input.selectionEnd = length;
	}

	function insertFromControl(input, text, offset) {
		var index = input.selectionStart;
		var value = input.value.substring(0, index);
		value += text;
		var length = value.length + offset;
		input.value = value + input.value.substr(index);
		input.selectionStart = index;
		input.selectionEnd = length;
	}

	function modify(window, content, replace) {
		var document = window.document;
		var node = document.activeElement;
		if (node && "selectionStart" in node) {
			if (replace) {
				updateFromControl(node, content);
			} else {
				var offset = kernel.selection.getText(window).length;
				insertFromControl(node, content, offset);
			}
		} else if (window.getSelection) {
			var selectionRange = window.getSelection();
			if (replace) {
				selectionRange.deleteFromDocument();
			}
			if (selectionRange.rangeCount > 0) {
				var range = selectionRange.getRangeAt(0);
				var node = kernel.lang.isUndefined(content, "nodeType") ? document
						.createTextNode(content)
						: content;
				range.insertNode(node);
				/* for webkit */
				selectionRange.removeAllRanges();
				selectionRange.addRange(range);
			}
		} else if (document.selection.createRange) {
			var textRange = document.selection.createRange();
			if (!replace) {
				textRange.collapse();
			}
			if (kernel.lang.isUndefined(content, "outerHTML"))
				textRange.text = content;
			else
				try {
					textRange.pasteHTML(content.outerHTML);
				} catch (e) {
					textRange.text = content;
				}
		}
	}

	/**
	 * @function kernel.external:selection.select
	 * @param {HTMLElement}
	 *            element
	 * @param {number}
	 *            [start]
	 * @param {number}
	 *            [end]
	 */
	kernel.selection.select = function(element, start, end) {
		var document = kernel.xml.getDocument(element);
		var window = kernel.xml.getDefaultView(document);

		if (isNaN(start)) {
			if (kernel.lang.isFunction(element, "select")) {
				element.select();
			} else if (window.getSelection) {
				var selectionRange = window.getSelection();
				selectionRange.removeAllRanges();
				selectionRange.selectAllChildren(element);
			} else if (document.body.createTextRange) {
				var textRange = document.body.createTextRange();
				textRange.moveToElementText(element);
				textRange.select();
			}
		} else if ("selectionStart" in element) {
			element.selectionStart = start;
			if (isNaN(end))
				end = element.value.length;
			element.selectionEnd = end;
			if (kernel.lang.isFunction(element, "focus"))
				element.focus();
		} else if (window.getSelection) {

			var index = 0, length = end - start;
			var startContainer = null, startOffset = 0;
			var endContainer = null, endOffset = 0;
			(function(element) {
				if (length <= 0)
					return;
				if (element.nodeType === 3) {
					if (start >= index && start < index + element.data.length) {
						var _start = start - index;
						var _end;
						if (isNaN(length)) {
							_end = element.data.length;
							start = index + element.data.length;
						} else if (_start + length > element.data.length) {
							_end = element.data.length;
							length -= _end - _start;
							start = index + element.data.length;
						} else {
							_end = _start + length;
							length = 0;
							start = index + _start;
						}
						if (!startContainer) {
							startContainer = element;
							startOffset = _start;
						}
						endContainer = element;
						endOffset = _end;
					}
					index += element.data.length;
				} else {
					for (var i = 0, len = element.childNodes.length; i < len; i++) {
						arguments.callee(element.childNodes[i]);
					}
				}
			})(element);

			var selectionRange = window.getSelection();
			selectionRange.removeAllRanges();
			if (startContainer) {
				var range = document.createRange();
				range.selectNodeContents(element);
				range.setStart(startContainer, startOffset);
				range.setEnd(endContainer, endOffset);
				selectionRange.addRange(range);
			}
		} else if (document.body.createTextRange) {
			var textRange = document.body.createTextRange();
			textRange.moveToElementText(element);
			textRange.moveStart("character", start);
			textRange.collapse();
			if (isNaN(end))
				end = (element.textContent || element.innerText
						|| element.nodeValue || "").length;
			textRange.moveEnd("character", end - start);
			textRange.select();
		}
	};

	/**
	 * @function kernel.external:selection.insert
	 * @param {Window}
	 *            window
	 * @param {(string|HTMLElement)}
	 *            content
	 */
	kernel.selection.insert = function(window, content) {
		modify(window, content, false);
	};

	/**
	 * @function kernel.external:selection.replace
	 * @param {Window}
	 *            window
	 * @param {(string|HTMLElement)}
	 *            content
	 */
	kernel.selection.replace = function(window, content) {
		modify(window, content, true);
	};

	/**
	 * @function kernel.external:selection.findText
	 * @param {Window}
	 *            window
	 * @param {string}
	 *            keyword
	 * @returns {boolean}
	 */
	kernel.selection.findText = function(window, keyword) {
		if (keyword === "") {
			return false;
		}
		if (window.find) {
			return window.find(keyword);
		} else if (window.document.selection) {
			var textRange = window.document.selection.createRange();
			if (textRange.findText) {
				if (textRange.text.length > 0) {
					textRange.collapse(true);
					textRange.move("character", 1);
				}

				if (textRange.findText(keyword)) {
					textRange.select();
					return true;
				} else {
					return false;
				}
			}
		}
		return false;
	};

	/**
	 * @function kernel.external:selection.getText
	 * @param {Window}
	 *            window
	 * @returns {string}
	 */
	kernel.selection.getText = function(window) {
		if (window.getSelection) {
			var element = window.document.activeElement;
			if (element && "selectionStart" in element) {
				return element.value.substring(element.selectionStart,
						element.selectionEnd);
			} else {
				var selectionRange = window.getSelection();
				return selectionRange.toString();
			}
		} else {
			var textRange = window.document.selection.createRange();
			return textRange.text;
		}
	};

	/**
	 * @function kernel.external:selection.empty
	 * @param {Window}
	 *            window
	 */
	kernel.selection.empty = function(window) {
		if (window.getSelection) {
			var selectionRange = window.getSelection();
			selectionRange.removeAllRanges();
		} else {
			window.document.selection.empty();
		}
	};

	/**
	 * @function kernel.external:selection.clear
	 * @param {Window}
	 *            window
	 */
	kernel.selection.clear = function(window) {
		if (window.getSelection) {
			var element = window.document.activeElement;
			if (element && "selectionStart" in element) {
				deleteFromControl(element);
			} else {
				var selectionRange = window.getSelection();
				if (selectionRange.rangeCount > 0)
					selectionRange.deleteFromDocument();
			}
		} else {
			window.document.selection.clear();
		}
	};

})(this, this["kernel@1.3"], false);(function(window, kernel, debug) {

	/**
	 * @class kernel.external:util.Event
	 * @param {string}
	 *            type
	 */
	kernel.util.Event = function(type) {

		/**
		 * @member {string} kernel.external:util.Event#type
		 */
		this.type = type;

		var stoped = false;
		/**
		 * @function kernel.external:util.Event#isPropagationStopped
		 * @returns {boolean}
		 */
		this.isPropagationStopped = function() {
			return stoped;
		};

		/**
		 * 
		 * @function kernel.external:util.Event#stopPropagation
		 * @see kernel.external:util.Event#preventDefault
		 */
		this.stopPropagation = function() {
			stoped = true;
		};

		var prevented = false;
		/**
		 * @function kernel.external:util.Event#isDefaultPrevented
		 * @returns {boolean}
		 */
		this.isDefaultPrevented = function() {
			return prevented;
		};

		/**
		 * @function kernel.external:util.Event#preventDefault
		 * @see kernel.external:util.Event#stopPropagation
		 */
		this.preventDefault = function() {
			prevented = true;
		};
	};

	/**
	 * 
	 * @constant kernel.external:util.Event.NONE
	 * @default 0
	 */
	kernel.util.Event.NONE = 0;
	/**
	 * @constant kernel.external:util.Event.CAPTURING_PHASE
	 * @default 1
	 */
	kernel.util.Event.CAPTURING_PHASE = 1;
	/**
	 * @constant kernel.external:util.Event.AT_TARGET
	 * @default 2
	 */
	kernel.util.Event.AT_TARGET = 2;
	/**
	 * @constant kernel.external:util.Event.BUBBLING_PHASE
	 * @default 3
	 */
	kernel.util.Event.BUBBLING_PHASE = 3;

	/**
	 * @member {boolean} kernel.external:util.Event#bubbles
	 */
	kernel.util.Event.prototype.bubbles = false;

	/**
	 * @member {number} kernel.external:util.Event#phase
	 * @default 0
	 */
	kernel.util.Event.prototype.phase = kernel.util.Event.NONE;

	/**
	 * @member {Object} kernel.external:util.Event#target
	 */
	kernel.util.Event.prototype.target = null;

	/**
	 * @member {Object} kernel.external:util.Event#currentTarget
	 */
	kernel.util.Event.prototype.currentTarget = null;

	/**
	 * 
	 * @class kernel.external:util.EventDispatcher
	 */
	kernel.util.EventDispatcher = function() {
		var instance = this;
		var map_bubbles = {};
		var map_capture = {};

		/**
		 * @function kernel.external:util.EventDispatcher#addEventListener
		 * @param {string}
		 *            type
		 * @param {kernel.external:util.EventDispatcher~listener}
		 *            listener
		 * @param {boolean}
		 *            useCapture
		 */
		this.addEventListener = function(type, listener, useCapture) {
			var map = useCapture ? map_capture : map_bubbles;
			if (!map.hasOwnProperty(type))
				map[type] = new kernel.util.Set();
			map[type].add(listener);
		};

		/**
		 * @function kernel.external:util.EventDispatcher#removeEventListener
		 * @param {string}
		 *            type
		 * @param {kernel.external:util.EventDispatcher~listener}
		 *            listener
		 * @param {boolean}
		 *            useCapture
		 */
		this.removeEventListener = function(type, listener, useCapture) {
			var map = useCapture ? map_capture : map_bubbles;
			if (map.hasOwnProperty(type))
				map[type].remove(listener);
		};

		/**
		 * @function kernel.external:util.EventDispatcher#hasEventListener
		 * @param {string}
		 *            type
		 * @returns {boolean}
		 */
		this.hasEventListener = function(type) {
			if (map_bubbles.hasOwnProperty(type))
				return !map_bubbles[type].isEmpty();
			if (map_capture.hasOwnProperty(type))
				return !map_capture[type].isEmpty();
			return false;
		};

		/**
		 * @function kernel.external:util.EventDispatcher#dispatchEvent
		 * @param {kernel.external:util.Event}
		 *            event
		 * @returns {boolean}
		 */
		this.dispatchEvent = function(event) {
			var type = event.type;
			var map;
			switch (event.phase) {
			case kernel.util.Event.CAPTURING_PHASE:
				map = map_capture;
				break;
			case kernel.util.Event.AT_TARGET:
				map = event.bubbles ? map_bubbles : map_capture;
				break;
			default:
				map = map_bubbles;
			}
			if (!event.target) {
				event.target = this;
			}
			event.currentTarget = this;
			if (map.hasOwnProperty(type))
				map[type].forEach(function(listener) {
					listener.call(instance, event);
				});
			return !event.isDefaultPrevented();
		};
	};

})(this, this["kernel@1.3"], false);
/**
 * 
 * @callback kernel.external:util.EventDispatcher~listener
 * @param {kernel.external:util.Event}
 *            event
 */(function(window, kernel, debug) {

	/**
	 * @external kernel.interaction
	 */
	kernel.interaction = {};

	function log(html) {
		if (!debug)
			return;
		document.body.innerHTML += "<br />" + html;
	}
	function clear() {
		if (!debug)
			return;
		document.body.innerHTML = "";
	}

	/**
	 * @class kernel.external:interaction.Action
	 */
	kernel.interaction.Action = function() {
		var _enabled = true;

		/**
		 * @function kernel.external:interaction.Action#isEnabled
		 * @returns {boolean}
		 */
		this.isEnabled = function() {
			return _enabled;
		};

		/**
		 * @function kernel.external:interaction.Action#setEnabled
		 * @param {boolean}
		 *            enabled
		 * 
		 */
		this.setEnabled = function(enabled) {
			_enabled = enabled;
		};

	};

	/**
	 * @function kernel.external:interaction.Action#destroy
	 * @abstract
	 */
	kernel.interaction.Action.prototype.destroy = function() {
	};

	/**
	 * @class kernel.external:interaction.Movable
	 * @augments kernel.external:interaction.Action
	 * @param {HTMLDocument}
	 *            document
	 */
	kernel.interaction.Movable = function(document) {
		kernel.interaction.Action.call(this);
		this.constructor = arguments.callee;

		var instance = this;
		var fireNode = null;
		var fireNodeList = new kernel.util.Set();
		var status = 0; /* 0:stop, 1:ready, 2:moving */

		function onMoveReady(event) {
			debug && console.log("Movable#onMoveReady", event.type);
			status = 1;
			instance.onMoveReady(event);
		}
		function onMoveStart(event) {
			debug && console.log("Movable#onMoveStart", event.type);
			status = 2;
			instance.onMoveStart(event);
		}
		function onMoving(event) {
			debug && console.log("Movable#onMoving", event.type);
			instance.onMoving(event);
		}
		function onMoveEnd(event) {
			debug && console.log("Movable#onMoveEnd", event.type);
			status = 0;
			instance.onMoveEnd(event);
		}
		function onMoveCancel(event) {
			debug && console.log("Movable#onMoveCancel", event.type);
			status = 0;
			instance.onMoveCancel(event);
		}

		function mousedown(event) {
			if (!instance.isEnabled())
				return;
			if (kernel.event.whichButton(event, kernel.event.MOUSE_BUTTON_LEFT)) {
				fireNode = kernel.event.getTarget(event);
				if (fireNodeList.contains(fireNode)) {
					kernel.event.stopPropagation(event);
					kernel.event.preventDefault(event);
					onMoveReady(event);
				}
			}
		}

		function mousemove(event) {
			if (!instance.isEnabled())
				return;
			if (status === 1) {
				onMoveStart(event);
			}
			if (status === 2) {
				onMoving(event);
			}
		}
		function mouseup(event) {
			if (!instance.isEnabled())
				return;
			if (status === 2) {
				onMoveEnd(event);
			} else if (status !== 0) {
				onMoveCancel(event);
			}
		}

		/**
		 * @function kernel.external:interaction.Movable#addFireNode
		 * @param {HTMLElement}
		 *            fireNode
		 * 
		 */
		this.addFireNode = function(fireNode) {
			if (fireNodeList.add(fireNode)) {
				kernel.event.addEventListener(fireNode, "mousedown", mousedown);
			}
		};

		/**
		 * @function kernel.external:interaction.Movable#removeFireNode
		 * @param {HTMLElement}
		 *            fireNode
		 */
		this.removeFireNode = function(fireNode) {
			if (fireNodeList.remove(fireNode)) {
				kernel.event.removeEventListener(fireNode, "mousedown",
						mousedown);
			}
		};

		/**
		 * @function kernel.external:interaction.Movable#removeAllFireNodes
		 */
		this.removeAllFireNodes = function() {
			fireNodeList.forEach(function(node) {
				kernel.event.removeEventListener(node, "mousedown", mousedown);
			});
			fireNodeList.clear();
		};

		/**
		 * @function kernel.external:interaction.Movable#getAllFireNodes
		 * @returns {Array}
		 */
		this.getAllFireNodes = function() {
			return fireNodeList.toArray();
		};

		/**
		 * @function kernel.external:interaction.Movable#destroy
		 */
		this.destroy = function() {
			this.removeAllFireNodes();
			kernel.event.removeEventListener(document, "mousemove", mousemove);
			kernel.event.removeEventListener(document, "mouseup", mouseup);
			document = fireNodeList = fireNode = instance = null;
		};

		kernel.event.addEventListener(document, "mousemove", mousemove);
		kernel.event.addEventListener(document, "mouseup", mouseup);
	};
	kernel.interaction.Movable.prototype = new kernel.interaction.Action();

	/**
	 * @function kernel.external:interaction.Movable#onMoveReady
	 * @abstract
	 * @param {Event}
	 *            event
	 * 
	 */
	kernel.interaction.Movable.prototype.onMoveReady = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Movable#onMoveStart
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Movable.prototype.onMoveStart = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Movable#onMoving
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Movable.prototype.onMoving = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Movable#onMoveEnd
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Movable.prototype.onMoveEnd = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Movable#onMoveCancel
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Movable.prototype.onMoveCancel = function(event) {
	};

	/**
	 * @class kernel.external:interaction.Selectable
	 * @augments kernel.external:interaction.Action
	 */
	kernel.interaction.Selectable = function(node) {
		kernel.interaction.Action.call(this);
		this.constructor = arguments.callee;

		var instance = this;
		var fireNode = null;
		var boo = false;

		function select(event, fire) {
			if (kernel.event.whichButton(event, kernel.event.MOUSE_BUTTON_LEFT)) {
				debug && console.log(event.type);
				kernel.event.stopPropagation(event);
				fire && instance.onSelect(event);
			}
			boo = false;
		}

		function onMouseDown(event) {
			if (!instance.isEnabled())
				return;

			if (instance.isSelected())
				boo = true;
			else
				select(event, true);

			fireNode = kernel.event.getTarget(event);
		}

		function onMouseUp(event) {
			if (!instance.isEnabled())
				return;

			if (fireNode === kernel.event.getTarget(event))
				select(event, boo);

			fireNode = null;
		}

		function onMouseOut(event) {
			fireNode = null;
		}

		kernel.event.addEventListener(node, "mousedown", onMouseDown);
		kernel.event.addEventListener(node, "mouseup", onMouseUp);
		kernel.event.addEventListener(node, "mouseout", onMouseOut);

		/**
		 * @function kernel.external:interaction.Selectable#destroy
		 */
		this.destroy = function() {
			kernel.event.removeEventListener(node, "mousedown", onMouseDown);
			kernel.event.removeEventListener(node, "mouseup", onMouseUp);
			kernel.event.removeEventListener(node, "mouseout", onMouseOut);
			instance = node = fireNode = null;
		};
	};
	kernel.interaction.Selectable.prototype = new kernel.interaction.Action();
	/**
	 * @function kernel.external:interaction.Selectable#onSelect
	 * @abstract
	 * @param {Event}
	 *            event
	 * 
	 */
	kernel.interaction.Selectable.prototype.onSelect = function(event) {
	};

	/**
	 * @function kernel.external:interaction.Selectable#isSelected
	 * @abstract
	 * @returns {boolean}
	 */
	kernel.interaction.Selectable.prototype.isSelected = function() {
		return false;
	};

	/**
	 * @class kernel.external:interaction.Draggable
	 * @augments kernel.external:interaction.Action
	 * @param {HTMLElement}
	 *            node
	 */
	kernel.interaction.Draggable = function(node) {
		kernel.interaction.Action.call(this);
		this.constructor = arguments.callee;

		var instance = this;

		/**
		 * @member {boolean} kernel.external:interaction.Draggable#draggable
		 * @readonly
		 */
		this.draggable = "draggable" in node;

		function onDragStart(event) {
			if (!instance.isEnabled())
				return;
			debug && console.log("DraggableNode#onDragStart", event.type);
			var dragImage = instance.getDragImage();
			if (dragImage) {
				event.dataTransfer.setDragImage(dragImage, instance
						.getDragImageX(), instance.getDragImageY());
			}
			event.dataTransfer.effectAllowed = instance.getEffectAllowed();
			event.dataTransfer
					.setData(instance.getFormat(), instance.getData());
			instance.onDragStart(event);
		}
		function onDrag(event) {
			if (!instance.isEnabled())
				return;
			debug && console.log("DraggableNode#onDrag", event.type);
			instance.onDrag(event);
		}
		function onDragEnd(event) {
			if (!instance.isEnabled())
				return;
			debug && console.log("DraggableNode#onDragEnd", event.type);
			instance.onDragEnd(event);
		}

		node.draggable = true;

		kernel.event.addEventListener(node, "dragstart", onDragStart);
		kernel.event.addEventListener(node, "drag", onDrag);
		kernel.event.addEventListener(node, "dragend", onDragEnd);

		/**
		 * @function kernel.external:interaction.Draggable#destroy
		 */
		this.destroy = function() {
			kernel.event.removeEventListener(node, "dragstart", onDragStart);
			kernel.event.removeEventListener(node, "drag", onDrag);
			kernel.event.removeEventListener(node, "dragend", onDragEnd);
			instance = node = null;
		};

		var _enabled = true;

		/**
		 * @function kernel.external:interaction.Draggable#isEnabled
		 * @returns {boolean}
		 */
		this.isEnabled = function() {
			return _enabled;
		};
		/**
		 * @function kernel.external:interaction.Draggable#setEnabled
		 * @param {boolean}
		 *            enabled
		 */
		this.setEnabled = function(enabled) {
			_enabled = node.draggable = enabled;
		};
	};
	kernel.interaction.Draggable.prototype = new kernel.interaction.Action();

	/**
	 * @function kernel.external:interaction.Draggable#getEffectAllowed
	 * @returns {string}
	 */
	kernel.interaction.Draggable.prototype.getEffectAllowed = function() {
		return "all";
	};

	/**
	 * @function kernel.external:interaction.Draggable#getFormat
	 * @returns {string}
	 */
	kernel.interaction.Draggable.prototype.getFormat = function() {
		return "Text";
	};

	/**
	 * IE10+
	 * 
	 * @function kernel.external:interaction.Draggable#getDragImage
	 * @abstract
	 * @returns {HTMLIMGElement}
	 */
	kernel.interaction.Draggable.prototype.getDragImage = function() {
		return null;
	};

	/**
	 * @function kernel.external:interaction.Draggable#getDragImageX
	 * @abstract
	 * @returns {number}
	 */
	kernel.interaction.Draggable.prototype.getDragImageX = function() {
		return 0;
	};

	/**
	 * @function kernel.external:interaction.Draggable#getDragImageY
	 * @abstract
	 * @returns {number}
	 */
	kernel.interaction.Draggable.prototype.getDragImageY = function() {
		return 0;
	};

	/**
	 * @function kernel.external:interaction.Draggable#getData
	 * @abstract
	 * @returns {string}
	 */
	kernel.interaction.Draggable.prototype.getData = function() {
		return "";
	};

	/**
	 * @function kernel.external:interaction.Draggable#onDragStart
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Draggable.prototype.onDragStart = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Draggable#onDrag
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Draggable.prototype.onDrag = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Draggable#onDragEnd
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Draggable.prototype.onDragEnd = function(event) {
	};

	/**
	 * @class kernel.external:interaction.Droppable
	 * @augments kernel.external:interaction.Action
	 * @param {HTMLElement}
	 *            node
	 */
	kernel.interaction.Droppable = function(node) {
		kernel.interaction.Action.call(this);
		this.constructor = arguments.callee;

		var instance = this;

		function onDragEnter(event) {
			if (!instance.isEnabled())
				return;
			debug && console.log("DroppableNode#onDragEnter", event.type);
			instance.onDragEnter(event);
		}
		function onDragLeave(event) {
			if (!instance.isEnabled())
				return;
			debug && console.log("DroppableNode#onDragLeave", event.type);
			instance.onDragLeave(event);
		}
		function onDragOver(event) {
			if (!instance.isEnabled())
				return;
			debug && console.log("DroppableNode#onDragOver", event.type);
			kernel.event.stopPropagation(event);
			kernel.event.preventDefault(event);
			event.dataTransfer.dropEffect = instance.getDropEffect(event);
			instance.onDragOver(event);
		}
		function onDrop(event) {
			if (!instance.isEnabled())
				return;
			debug && console.log("DroppableNode#onDrop", event.type);
			kernel.event.stopPropagation(event);
			kernel.event.preventDefault(event);
			instance.getData(event.dataTransfer.getData(instance.getFormat()));
			instance.onDrop(event);
		}

		kernel.event.addEventListener(node, "dragenter", onDragEnter);
		kernel.event.addEventListener(node, "dragleave", onDragLeave);
		kernel.event.addEventListener(node, "dragover", onDragOver);
		kernel.event.addEventListener(node, "drop", onDrop);

		/**
		 * @function kernel.external:interaction.Droppable#destroy
		 */
		this.destroy = function() {
			kernel.event.removeEventListener(node, "dragenter", onDragEnter);
			kernel.event.removeEventListener(node, "dragleave", onDragLeave);
			kernel.event.removeEventListener(node, "dragover", onDragOver);
			kernel.event.removeEventListener(node, "drop", onDrop);
			instance = node = null;
		};

	};
	kernel.interaction.Droppable.prototype = new kernel.interaction.Action();

	/**
	 * @function kernel.external:interaction.Droppable#getDropEffect
	 * @param {Event}
	 *            event
	 * @returns {string}
	 */
	kernel.interaction.Droppable.prototype.getDropEffect = function(event) {
		return "none";
	};

	/**
	 * @function kernel.external:interaction.Droppable#getFormat
	 * @returns {string}
	 */
	kernel.interaction.Droppable.prototype.getFormat = function() {
		return "Text";
	};

	/**
	 * @function kernel.external:interaction.Droppable#getData
	 * @abstract
	 * @param {string}
	 *            data
	 */
	kernel.interaction.Droppable.prototype.getData = function(data) {
	};

	/**
	 * @function kernel.external:interaction.Droppable#onDragEnter
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Droppable.prototype.onDragEnter = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Droppable#onDragLeave
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Droppable.prototype.onDragLeave = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Droppable#onDragOver
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Droppable.prototype.onDragOver = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Droppable#onDrop
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Droppable.prototype.onDrop = function(event) {
	};

	/**
	 * @class kernel.external:interaction.Touchable
	 * @augments kernel.external:interaction.Action
	 * @param {HTMLElement}
	 *            node
	 */
	kernel.interaction.Touchable = function(node) {
		kernel.interaction.Action.call(this);
		this.constructor = arguments.callee;

		var instance = this;
		var startTouches = null, prevTouches = null, holdTimer = null, now = null, direction = null;
		var held = false, moved = false, swiped = false, vClicked = false, canceled = false, prevented = false;
		var RIGHT = "right", LEFT = "left", UP = "up", DOWN = "down", NONE = "none";

		function holdClear() {
			if (holdTimer !== null) {
				clearTimeout(holdTimer);
				holdTimer = null;
			}
		}

		function computeSwipeDirection(event) {
			if (startTouches.length === 1 && event.touches.length === 1) {

				var hDis = event.touches[0].clientX - startTouches[0].clientX;
				var vDis = event.touches[0].clientY - startTouches[0].clientY;

				var maxHDis = Math.tan((instance.swipe_maxDegree / 180)
						* Math.PI)
						* Math.abs(vDis);
				var maxVDis = Math.tan((instance.swipe_maxDegree / 180)
						* Math.PI)
						* Math.abs(hDis);

				if (held) {
					var minVDis = instance.vClick_minOffset;
					if (minVDis > 0 && vDis > minVDis)
						return DOWN;
					else if (minVDis < 0 && vDis < minVDis)
						return UP;
				} else if (Math.abs(vDis) < maxVDis) {
					var minHDis = instance.swipe_minHDistance;
					log("[horizontal] " + hDis + "<>" + minHDis);
					if (hDis > minHDis)
						return RIGHT;
					else if (hDis < -minHDis)
						return LEFT;
				} else if (Math.abs(hDis) < maxHDis) {
					var minVDis = instance.swipe_minVDistance;
					log("[vertical] " + vDis + "<>" + minVDis);
					if (vDis < -minVDis)
						return UP;
					else if (vDis > minVDis)
						return DOWN;
				} else if (debug) {
					log(html);
				}
			}
			return NONE;
		}

		function onTouchStart(event) {
			holdClear();
			if (!instance.isEnabled() || !event.touches)
				return;
			instance.onTouchStart(event);
			startTouches = prevTouches = event.touches;
			direction = null;
			held = moved = swiped = vClicked = canceled = prevented = false;
			if (event.touches.length === 1) {
				if (instance.hold_delay > 0 && isFinite(instance.hold_delay))
					holdTimer = setTimeout(function() {
						holdTimer = null;
						if (!canceled) {
							held = true;
							instance.onTapHold(event);
							log("-------- hold --------");
						}
					}, instance.hold_delay);
			}
			clear();
			log("-------- start --------");
		}
		function onTouchMove(event) {
			holdClear();
			if (!instance.isEnabled() || !event.touches)
				return;
			if (canceled)
				return;
			if (moved && !prevented) {
				return;
			} else {
				instance.onTouchMove(event);
			}

			if (prevTouches.length === 1 && event.touches.length === 1) {
				var hDis = event.touches[0].clientX - prevTouches[0].clientX;
				var vDis = event.touches[0].clientY - prevTouches[0].clientY;

				if (Math.abs(hDis) > Math.abs(vDis)) {
					if (hDis > 0)
						instance.onTouchMoveRight(event);
					else if (hDis < 0)
						instance.onTouchMoveLeft(event);

				} else if (Math.abs(hDis) < Math.abs(vDis)) {
					if (vDis > 0)
						instance.onTouchMoveDown(event);
					else if (vDis < 0)
						instance.onTouchMoveUp(event);
				}
			}

			if (!swiped && !vClicked) {
				var _dire = computeSwipeDirection(event);
				if (!held) {
					if (kernel.lang.isNull(direction)) {
						if (_dire !== NONE) {
							direction = _dire;
							now = kernel.lang.now();
						}
					} else if (direction !== _dire) {
						direction = NONE;
					}
					log("[direction] " + direction + "/" + _dire);
					if (direction !== NONE) {
						var time = kernel.lang.now() - now;
						log("[time] " + time.toFixed(1) + "<"
								+ instance.swipe_duration);

						if (time < instance.swipe_duration)
							switch (direction) {
							case RIGHT:
								instance.onSwipeRight(event);
								swiped = true;
								break;
							case LEFT:
								instance.onSwipeLeft(event);
								swiped = true;
								break;
							case UP:
								instance.onSwipeUp(event);
								swiped = true;
								break;
							case DOWN:
								instance.onSwipeDown(event);
								swiped = true;
								break;
							}

					}
				} else if (_dire === UP || _dire === DOWN) {
					instance.onVClick(event);
					log("-------- vClick --------");
					vClicked = true;
				}
			}
			prevented = kernel.event.isDefaultPrevented(event);
			prevTouches = event.touches;
			moved = true;
		}
		function onTouchEnd(event) {
			holdClear();
			if (!instance.isEnabled())
				return;
			if (held || canceled)
				return;
			if (!moved) {
				instance.onTap(event);
				log("-------- tap --------");
			}
			if (prevented || !moved) {
				instance.onTouchEnd(event);
				log("-------- end --------");
			}
		}
		function onTouchCancel(event) {
			holdClear();
			if (!instance.isEnabled())
				return;
			canceled = true;
			instance.onTouchCancel(event);
		}

		kernel.event.addEventListener(node, "touchstart", onTouchStart);
		kernel.event.addEventListener(node, "touchmove", onTouchMove);
		kernel.event.addEventListener(node, "touchend", onTouchEnd);
		kernel.event.addEventListener(node, "touchcancel", onTouchCancel);

		/**
		 * @function kernel.external:interaction.Touchable#destroy
		 */
		this.destroy = function() {
			kernel.event.removeEventListener(node, "touchstart", onTouchStart);
			kernel.event.removeEventListener(node, "touchmove", onTouchMove);
			kernel.event.removeEventListener(node, "touchend", onTouchEnd);
			kernel.event
					.removeEventListener(node, "touchcancel", onTouchCancel);
			instance = touches = null;
		};
	};

	/**
	 * @function kernel.external:interaction.Touchable.isTouchSupported
	 * @returns {boolean}
	 */
	kernel.interaction.Touchable.isTouchSupported = function() {
		return "ontouchstart" in window;
	};

	kernel.interaction.Touchable.prototype = new kernel.interaction.Action();

	/**
	 * @member {number} kernel.external:interaction.Touchable#vClick_minOffset
	 * @default -10
	 */
	kernel.interaction.Touchable.prototype.vClick_minOffset = -10;

	/**
	 * @member {number} kernel.external:interaction.Touchable#swipe_minHDistance
	 * @default 20
	 */
	kernel.interaction.Touchable.prototype.swipe_minHDistance = 20;

	/**
	 * @member {number} kernel.external:interaction.Touchable#swipe_minVDistance
	 * @default 10
	 */
	kernel.interaction.Touchable.prototype.swipe_minVDistance = 10;

	/**
	 * @member {number} kernel.external:interaction.Touchable#swipe_maxDegree
	 * @default 30
	 */
	kernel.interaction.Touchable.prototype.swipe_maxDegree = 30;

	/**
	 * @member {number} kernel.external:interaction.Touchable#swipe_duration
	 * @default 1000
	 */
	kernel.interaction.Touchable.prototype.swipe_duration = 1000;

	/**
	 * @member {number} kernel.external:interaction.Touchable#hold_delay
	 * @default 750
	 */
	kernel.interaction.Touchable.prototype.hold_delay = 750;

	/**
	 * @function kernel.external:interaction.Touchable#onTouchStart
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Touchable.prototype.onTouchStart = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Touchable#onTouchMove
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Touchable.prototype.onTouchMove = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Touchable#onTouchMoveLeft
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Touchable.prototype.onTouchMoveLeft = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Touchable#onTouchMoveRight
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Touchable.prototype.onTouchMoveRight = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Touchable#onTouchMoveUp
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Touchable.prototype.onTouchMoveUp = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Touchable#onTouchMoveDown
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Touchable.prototype.onTouchMoveDown = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Touchable#onTouchEnd
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Touchable.prototype.onTouchEnd = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Touchable#onTouchCancel
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Touchable.prototype.onTouchCancel = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Touchable#onSwipeLeft
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Touchable.prototype.onSwipeLeft = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Touchable#onSwipeRight
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Touchable.prototype.onSwipeRight = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Touchable#onSwipeUp
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Touchable.prototype.onSwipeUp = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Touchable#onSwipeDown
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Touchable.prototype.onSwipeDown = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Touchable#onTap
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Touchable.prototype.onTap = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Touchable#onTapHold
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Touchable.prototype.onTapHold = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Touchable#onVClick
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Touchable.prototype.onVClick = function(event) {
	};

	/**
	 * 
	 * @class kernel.external:interaction.Selector
	 * @augments kernel.external:interaction.Action
	 */
	kernel.interaction.Selector = function() {
		kernel.interaction.Action.call(this);
		this.constructor = arguments.callee;

		var instance = this;
		var selectableMap = new kernel.util.Map();
		var firstWrapper = null;
		var lastWrapper = null;
		var activeWrapper = null;
		var activeCache = [];

		function clean(wrapper) {
			if (activeWrapper === wrapper)
				activeWrapper = null;

			for (var i = 0; i < activeCache.length; i++)
				if (activeCache[i] === wrapper) {
					activeCache.splice(i, 1);
					break;
				}
		}

		function activate(wrapper, event) {
			selectableMap.forEach(function(selectable, _wrapper) {
				if (_wrapper !== wrapper)
					_wrapper.isActive() && _wrapper.onDeactivate(event);
			});
			if (wrapper && !wrapper.isActive()) {
				clean(wrapper);
				activeCache.unshift(wrapper);
				activeWrapper = wrapper;
				wrapper.onActivate(event);
			}
		}

		function select(wrapper, event) {
			activate(wrapper, event);

			if (wrapper && event && instance.shiftKey_available
					&& event.shiftKey) {

				var selectedWrappers = instance.getSelectedNodeWrappers();
				if (selectedWrappers.length === 0) {
					firstWrapper = wrapper;
				} else if (firstWrapper === null) {
					debug && kernel.debug({
						key : "special_case",
						print : function(msg) {
							console.info(msg);
						}
					});
					firstWrapper = selectedWrappers[0];
				}
				lastWrapper = wrapper;

				var wrappers = instance
						.filterNodeWrappers(selectableMap.keys());
				wrappers.sort(instance.compare);

				var firstIndex = NaN, lastIndex = NaN;

				for (var i = 0, len = wrappers.length; i < len; i++) {
					if (firstWrapper === wrappers[i]) {
						firstIndex = i;
					}
					if (lastWrapper === wrappers[i]) {
						lastIndex = i;
					}
				}

				if (isNaN(firstIndex) || isNaN(lastIndex)) {
					kernel.debug({
						key : "logical_error",
						print : function(msg) {
							console.warn(msg);
						}
					});
				} else {
					var startIndex = Math.min(firstIndex, lastIndex);
					var endIndex = Math.max(firstIndex, lastIndex);
					for (var i = 0, len = wrappers.length; i < len; i++) {
						var _wrapper = wrappers[i];
						if (i < startIndex || i > endIndex) {
							_wrapper.isSelected() && _wrapper.onDeselect(event);
						} else {
							!_wrapper.isSelected() && _wrapper.onSelect(event);
						}
					}

					setTimeout(function() {
						kernel.selection.empty(window);
					}, 0);
				}
			} else if (wrapper && event && instance.ctrlKey_available
					&& event.ctrlKey) {
				firstWrapper = lastWrapper = wrapper;
				if (wrapper.isSelected()) {
					wrapper.onDeselect(event);
				} else {
					wrapper.onSelect(event);
				}
			} else {
				firstWrapper = lastWrapper = wrapper;
				selectableMap.forEach(function(selectable, _wrapper) {
					if (_wrapper === wrapper) {
						!_wrapper.isSelected() && _wrapper.onSelect(event);
					} else {
						_wrapper.isSelected() && _wrapper.onDeselect(event);
					}
				});
			}
		}

		function binding(wrapper) {
			if (!selectableMap.containsKey(wrapper)) {
				var selectable = new kernel.interaction.Selectable(wrapper.node);
				selectable.isSelected = function() {
					return wrapper.isSelected();
				};
				selectable.onSelect = function(event) {
					instance.onSelectStart(event);
					select(wrapper, event);
					instance.onSelectEnd(event);
				};
				selectable.isEnabled = function() {
					return instance.isEnabled() && !wrapper.isDisabled();
				};
				selectableMap.put(wrapper, selectable);
				return true;
			} else {
				return false;
			}
		}

		function unbinding(wrapper) {
			var selectable = selectableMap.get(wrapper);
			if (selectable) {
				selectableMap.remove(wrapper);
				selectable.destroy();
				wrapper.isActive() && wrapper.onDeactivate(null);
				wrapper.isSelected() && wrapper.onDeselect(null);
				clean(wrapper);
				activate(activeCache[0]);
				return true;
			} else {
				return false;
			}
		}

		/**
		 * @function kernel.external:interaction.Selector#trigger
		 * @param {kernel.external:interaction.NodeWrapper}
		 *            wrapper
		 * @param {Event}
		 *            [event]
		 */
		this.trigger = function(wrapper, event) {
			select(wrapper, event);
		};

		/**
		 * @function kernel.external:interaction.Selector#addNodeWrapper
		 * @param {kernel.external:interaction.NodeWrapper}
		 *            wrapper
		 * @returns {boolean}
		 */
		this.addNodeWrapper = function(wrapper) {
			return binding(wrapper);
		};
		/**
		 * @function kernel.external:interaction.Selector#removeNodeWrapper
		 * @param {kernel.external:interaction.NodeWrapper}
		 *            wrapper
		 * @returns {boolean}
		 */
		this.removeNodeWrapper = function(wrapper) {
			return unbinding(wrapper);
		};

		/**
		 * @function kernel.external:interaction.Selector#removeAllNodeWrappers
		 */
		this.removeAllNodeWrappers = function() {
			activate(null, null);
			activeWrapper = null;
			activeCache = [];
			selectableMap.forEach(function(selectable, wrapper) {
				selectableMap.remove(wrapper);
				selectable.destroy();
				wrapper.isSelected() && wrapper.onDeselect(null);
			});
		};

		/**
		 * @function kernel.external:interaction.Selector#getSelectNodeWrappers
		 * @returns {Array}
		 */
		this.getSelectedNodeWrappers = function() {
			var arr = [];
			selectableMap.forEach(function(selectable, wrapper) {
				if (wrapper.isSelected()) {
					arr.push(wrapper);
				}
			});
			return arr;
		};

		/**
		 * @function kernel.external:interaction.Selector#getAllNodeWrappers
		 * @returns {Array}
		 */
		this.getAllNodesWrappers = function() {
			return selectableMap.keys();
		};

		/**
		 * @function kernel.external:interaction.Selector#findNodeWrappers
		 * @param {kernel.external:interaction.Selector~findNodeWrappersMatch}
		 *            match
		 * @returns {Array}
		 */
		this.findNodeWrappers = function(match) {
			var arr = [];
			selectableMap.forEach(function(selectable, wrapper) {
				if (match(wrapper)) {
					arr.push(wrapper);
				}
			});
			return arr;
		};

		/**
		 * @function kernel.external:interaction.Selector#getActiveNodeWrapper
		 * @returns {kernel.external:interaction.NodeWrapper}
		 */
		this.getActiveNodeWrapper = function() {
			if (activeWrapper && activeWrapper.isActive())
				return activeWrapper;
			else
				return null;
		};

		/**
		 * @function kernel.external:interaction.Selector#getFirstNodeWrapper
		 * @returns {kernel.external:interaction.NodeWrapper}
		 */
		this.getFirstNodeWrapper = function() {
			return firstWrapper;
		};
		/**
		 * @function kernel.external:interaction.Selector#getLastNodeWrapper
		 * @returns {kernel.external:interaction.NodeWrapper}
		 */
		this.getLastNodeWrapper = function() {
			return lastWrapper;
		};

		/**
		 * @function kernel.external:interaction.Selector#destroy
		 */
		this.destroy = function() {
			this.removeAllNodeWrappers();
			instance = selectableMap = activeCache = activeWrapper = firstWrapper = lastWrapper = null;
		};
	};
	kernel.interaction.Selector.prototype = new kernel.interaction.Action();

	/**
	 * @member {boolean} kernel.external:interaction.Selector#ctrlKey_available
	 * @default false
	 */
	kernel.interaction.Selector.prototype.ctrlKey_available = false;
	/**
	 * @member {boolean} kernel.external:interaction.Selector#shiftKey_available
	 * @default false
	 */
	kernel.interaction.Selector.prototype.shiftKey_available = false;

	/**
	 * @function kernel.external:interaction.Selector#filterNodeWrappers
	 * @param {Array}
	 *            wrappers
	 */
	kernel.interaction.Selector.prototype.filterNodeWrappers = function(
			wrappers) {
		return wrappers;
	};
	/**
	 * @function kernel.external:interaction.Selector#compare
	 * @abstract
	 * @param {kernel.external:interaction.NodeWrapper}
	 *            a
	 * @param {kernel.external:interaction.NodeWrapper}
	 *            b
	 * @returns {number}
	 */
	kernel.interaction.Selector.prototype.compare = function(a, b) {
		return 0;
	};

	/**
	 * @function kernel.external:interaction.Selector#onSelectStart
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Selector.prototype.onSelectStart = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Selector#onSelectEnd
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Selector.prototype.onSelectEnd = function(event) {
	};

	/**
	 * 
	 * @class kernel.external:interaction.NodeWrapper
	 * @param {Node}
	 *            node
	 */
	kernel.interaction.NodeWrapper = function(node) {
		/**
		 * @member {Node} kernel.external:interaction.NodeWrapper#node
		 */
		this.node = node;
	};

	/**
	 * @function kernel.external:interaction.NodeWrapper#isDisabled
	 * @abstract
	 * @returns {boolean}
	 */
	kernel.interaction.NodeWrapper.prototype.isDisabled = function() {
		return false;
	};

	/**
	 * @function kernel.external:interaction.NodeWrapper#isSelected
	 * @abstract
	 * @returns {boolean}
	 */
	kernel.interaction.NodeWrapper.prototype.isSelected = function() {
		return false;
	};
	/**
	 * @function kernel.external:interaction.NodeWrapper#onSelect
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.NodeWrapper.prototype.onSelect = function(event) {
	};
	/**
	 * @function kernel.external:interaction.NodeWrapper#onDeselect
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.NodeWrapper.prototype.onDeselect = function(event) {
	};

	/**
	 * @function kernel.external:interaction.NodeWrapper#isActive
	 * @abstract
	 * @returns {boolean}
	 */
	kernel.interaction.NodeWrapper.prototype.isActive = function() {
		return false;
	};
	/**
	 * @function kernel.external:interaction.NodeWrapper#onActivate
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.NodeWrapper.prototype.onActivate = function(event) {
	};
	/**
	 * @function kernel.external:interaction.NodeWrapper#onDeactivate
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.NodeWrapper.prototype.onDeactivate = function(event) {
	};

	/**
	 * @class kernel.external:interaction.Mouse
	 * @augments kernel.external:interaction.Action
	 * @param {Node}
	 *            node
	 */
	kernel.interaction.Mouse = function(node) {
		kernel.interaction.Action.call(this);
		this.constructor = arguments.callee;

		var instance = this;
		var isTouch = kernel.interaction.Touchable.isTouchSupported();

		var onStart = function(event) {
			kernel.event.preventDefault(event);
			instance.onMouseDown(event);
		};
		var onMove = function(event) {
			kernel.event.preventDefault(event);
			instance.onMouseMove(event);
		};
		var onEnd = function(event) {
			kernel.event.preventDefault(event);
			instance.onMouseUp(event);
		};
		var onClick = function(event) {
			if (!instance.isEnabled())
				return;
			kernel.event.preventDefault(event);
			instance.onClick(event);
		};
		var document = kernel.xml.getDocument(node);
		var movable = new kernel.interaction.Movable(document);
		movable.addFireNode(node);
		movable.onMoveStart = onStart;
		movable.onMoving = onMove;
		movable.onMoveEnd = onEnd;
		movable.isEnabled = function() {
			return instance.isEnabled();
		};
		kernel.event.addEventListener(node, "click", onClick);

		var touchable = null;
		if (isTouch) {
			touchable = new kernel.interaction.Touchable(node);
			touchable.onTouchStart = onStart;
			touchable.onTouchMove = onMove;
			touchable.onTouchEnd = onEnd;
			touchable.onTap = onClick;
			touchable.onCancel = function(event) {
				kernel.event.preventDefault(event);
				instance.onCancel(event);
			};
			touchable.isEnabled = function() {
				return instance.isEnabled();
			};
		}

		/**
		 * @function kernel.external:interaction.Mouse#destroy
		 */
		this.destroy = function() {
			movable.destroy();
			touchable && touchable.destroy();
			instance = movable = touchable = node = null;
		};
	};

	kernel.interaction.Mouse.prototype = new kernel.interaction.Action();

	/**
	 * @function kernel.external:interaction.Mouse#onMouseDown
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Mouse.prototype.onMouseDown = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Mouse#onMouseMove
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Mouse.prototype.onMouseMove = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Mouse#onMouseUp
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Mouse.prototype.onMouseUp = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Mouse#onClick
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Mouse.prototype.onClick = function(event) {
	};
	/**
	 * @function kernel.external:interaction.Mouse#onCancel
	 * @abstract
	 * @param {Event}
	 *            event
	 */
	kernel.interaction.Mouse.prototype.onCancel = function(event) {
	};
})(this, this["kernel@1.3"], false);

/**
 * @callback kernel.external:interaction.Selector~findNodeWrappersMatch
 * @param {kernel.external:interaction.NodeWrapper}
 *            wrapper
 * @returns {boolean}
 */
(function(window, kernel, debug) {

	if (!debug && window.Promise && window.Promise.prototype) {
		var boo = true;
		(function(obj, key) {
			if (typeof obj[key] !== "function") {
				boo = false;
			}
			return arguments.callee;
		})(window.Promise.prototype, "then")(window.Promise.prototype, "catch")
				(window.Promise, "resolve")(window.Promise, "reject")(
						window.Promise, "all")(window.Promise, "race");
		if (boo) {
			debug && console.log("window.Promise is supported.");
			kernel.util.Promise = window.Promise;
			return;
		}
	}

	/**
	 * @class kernel.external:util.Promise
	 * @since 1.1
	 * @param {kernel.external:util.Promise~executor}
	 *            executor
	 * 
	 */
	kernel.util.Promise = function(executor) {
		var resolver = new Resolver(this);

		try {
			executor.call(this, function(value) {
				resolver.resolve(value);
			}, function(reason) {
				resolver.reject(reason);
			});
		} catch (e) {
			resolver.reject(e);
		}

		this.then = function(onFulfill, onReject) {
			return new kernel.util.Promise(function(resolve, reject) {
				var _onFulfill = kernel.lang.isFunction(onFulfill) ? wrap(
						resolve, reject, onFulfill) : resolve;

				var _onReject = kernel.lang.isFunction(onReject) ? wrap(
						resolve, reject, onReject) : reject;

				resolver.addCallbacks(_onFulfill, _onReject);
			});
		};

	};

	/**
	 * 
	 * @function kernel.external:util.Promise#then
	 * @param {kernel.external:util.Promise~callback}
	 *            onFulfill
	 * @param {kernel.external:util.Promise~callback}
	 *            onReject
	 * @returns {kernel.external:util.Promise}
	 */
	kernel.util.Promise.prototype.then = function(onFulfill, onReject) {
		kernel.debug({
			key : "is_abstract",
			params : [ "kernel.util.Promise#then" ],
			print : function(msg) {
				console.warn(msg);
			}
		});
	};

	/**
	 * 
	 * @function kernel.external:util.Promise#catch
	 * @param {kernel.external:util.Promise~callback}
	 *            onReject
	 * @returns {kernel.external:util.Promise}
	 */
	kernel.util.Promise.prototype["catch"] = function(onReject) {
		return this.then(null, onReject);
	};

	/**
	 * @function kernel.external:util.Promise.resolve
	 * @param {(kernel.external:util.Promise|*)}
	 *            value
	 * @returns {kernel.external:util.Promise}
	 */
	kernel.util.Promise.resolve = function(value) {
		return isPromise(value) ? value : new this(function(resolve) {
			resolve(value);
		});
	};

	/**
	 * @function kernel.external:util.Promise.reject
	 * @param {*}
	 *            reason
	 * @returns {kernel.external:util.Promise}
	 */
	kernel.util.Promise.reject = function(reason) {
		return new this(function(resolve, reject) {
			reject(reason);
		});
	};

	/**
	 * @function kernel.external:util.Promise.all
	 * @param {Array}
	 *            values
	 * @returns {kernel.external:util.Promise}
	 */
	kernel.util.Promise.all = function(values) {
		var results = [];
		return new kernel.util.Promise(function(resolve, reject) {
			if (!kernel.lang.isArray(values)) {
				var err = new Error();
				err.message = kernel.getMessage("is_not_array", "values");
				throw err;
			}

			var count = values.length;

			if (count < 1) {
				return resolve(results);
			}

			kernel.lang.forEach(values, function(promise, index) {
				kernel.util.Promise.resolve(promise).then(function(value) {
					results[index] = value;
					count--;
					if (count < 1) {
						resolve(results);
					}
				}, reject);
			});
			return undefined;
		});
	};

	/**
	 * @function kernel.external:util.Promise.race
	 * @param {Array}
	 *            values
	 * @returns {kernel.external:util.Promise}
	 */
	kernel.util.Promise.race = function(values) {
		return new kernel.util.Promise(function(resolve, reject) {
			if (!kernel.lang.isArray(values)) {
				var err = new Error();
				err.message = kernel.getMessage("is_not_array", "values");
				throw err;
			}
			kernel.lang.forEach(values, function(promise, index) {
				kernel.util.Promise.resolve(promise).then(resolve, reject);
			});
		});
	};

	function Resolver(promise) {
		var callbacks = [];
		var errbacks = [];

		var PENDING = "pending";
		var FULFILLED = "fulfilled";
		var REJECTED = "rejected";

		var status = PENDING;
		var result = null;
		var instance = this;

		this.then = function(onFulfill, onReject) {
			promise.then(onFulfill, onReject);
		};

		this.addCallbacks = function(onFulfill, onReject) {
			if (callbacks && kernel.lang.isFunction(onFulfill))
				callbacks.push(onFulfill);

			if (errbacks && kernel.lang.isFunction(onReject))
				errbacks.push(onReject);

			if (status === FULFILLED)
				this.fulfill(result);
			else if (status === REJECTED)
				this.reject(result);
		};

		this.resolve = function(value) {
			if (isPromise(value))
				value.then(function(value) {
					instance.resolve(value);
				}, function(reason) {
					instance.reject(reason);
				});
			else
				this.fulfill(value);
		};

		this.fulfill = function(value) {
			if (status === PENDING) {
				status = FULFILLED;
				result = value;
			}

			if (status === FULFILLED) {
				errbacks = null;
				notify(promise, callbacks, result);
			}
		};

		this.reject = function(reason) {
			if (status === PENDING) {
				status = REJECTED;
				result = reason;
			}
			if (status === REJECTED) {
				callbacks = null;
				notify(promise, errbacks, result);
			}
		};

		this.getStatus = function() {
			return status;
		};
	}

	function notify(promise, arr, result) {
		if (arr.length) {
			arr.shift().call(promise, result);
			arguments.callee.apply(null, arguments);
		}
	}

	function wrap(resolve, reject, executor) {
		return function(valueOrReason) {
			try {
				valueOrReason = executor.call(this, valueOrReason);
				resolve(valueOrReason);
			} catch (e) {
				reject(e);
			}
		};
	}

	function isPromise(promise) {
		return kernel.lang.isFunction(promise, "then");
	}

})(this, this["kernel@1.3"], false);
/**
 * @callback kernel.external:util.Promise~callback
 * @param {*}
 *            value
 * @returns {(kernel.external:util.Promise|*)}
 */
/**
 * @callback kernel.external:util.Promise~executor
 * @param {function}
 *            onFulfill
 * @param {function}
 *            onReject
 */
(function(window, kernel, debug) {
	/**
	 * @class kernel.external:util.Progress
	 * @since 1.2
	 * @param {string}
	 *            name
	 * @param {Array}
	 *            steps
	 */
	kernel.util.Progress = function(name, steps) {
		var PENDING = "pending";
		var PAUSE = "pause";
		var FINISHED = "finished";
		var UNFINISHED = "unfinished";

		var Promise = kernel.util.Promise;
		var instance = this;
		var status = PENDING;
		var count = 0, total = 0, rate = 0;
		var content = null, result = null;
		var promise = null;
		var next = null;
		var start = function(value) {
			var arr = steps.concat([]);
			total = arr.length;
			promise = Promise.resolve(value);

			kernel.lang.forEach(arr, function(step, index) {
				promise = promise.then(function(value) {
					if (!step)
						return value;

					value = instance.makeSure(value, step);

					return new Promise(function(resolve, reject) {
						next = function() {
							var timeoutID = null;
							count = index + 1;

							var p1 = new Promise(function(resolve, reject) {
								if (step.timeout > 0 && isFinite(step.timeout))
									timeoutID = setTimeout(function() {
										var err = new Error();
										err.message = kernel
												.getMessage("step_timeout");
										reject(err);
									}, step.timeout);
							});

							var p2 = step.run(value, {
								getIndex : function() {
									return index;
								},
								setDetail : function(detail) {
									content = detail;
								},
								change : function(progress) {
									if (status !== PENDING)
										return;

									rate = progress / total + index / total;
									if (rate > 1)
										rate = 1;
									instance.onChange();
								}
							}).then(function(value) {
								if (timeoutID !== null)
									clearTimeout(timeoutID);
								return instance.makeOver(value, step);
							}, function(err) {
								if (timeoutID !== null)
									clearTimeout(timeoutID);
								throw err;
							});

							Promise.race([ p1, p2 ]).then(resolve,
									step.ignorable ? function() {
										resolve(value);
									} : reject);
						};
						if (status === PENDING) {
							next();
						}
					});
				}, function(err) {
					throw err;
				});
			});

			promise.then(function(value) {
				next = function() {
					status = FINISHED;
					rate = 1;
					content = null;
					result = value;
					instance.onComplete();
				};
				if (status === PENDING) {
					next();
				}
				return value;
			}, function(err) {
				next = function() {
					status = UNFINISHED;
					content = null;
					result = err;
					instance.onComplete();
				};
				if (status === PENDING) {
					next();
				}
				throw err;
			});

		};

		/**
		 * @function kernel.external:util.Progress#getName
		 * @return {string}
		 */
		this.getName = function() {
			return name;
		};

		/**
		 * @function kernel.external:util.Progress#getDetail
		 * @returns {string}
		 */
		this.getDetail = function() {
			return content;
		};

		/**
		 * @function kernel.external:util.Progress#getResult
		 * @returns {*}
		 */
		this.getResult = function() {
			return result;
		};

		/**
		 * @function kernel.external:util.Progress#getCount
		 * @return {number}
		 */
		this.getCount = function() {
			return count;
		};

		/**
		 * @function kernel.external:util.Progress#getTotal
		 * @returns {number}
		 */
		this.getTotal = function() {
			return total;
		};

		/**
		 * @function kernel.external:util.Progress#getStatus
		 * @returns {string}
		 */
		this.getStatus = function() {
			return status;
		};

		/**
		 * @function kernel.external:util.Progress#getRate
		 * @returns {number}
		 */
		this.getRate = function() {
			return rate;
		};

		/**
		 * @function kernel.external:util.Progress#start
		 * @param {(kernel.external:util.Promise|*)}
		 *            value
		 * @returns {boolean}
		 */
		this.start = function(value) {
			if (!promise) {
				start(value);
				return true;
			}
			return false;
		};

		/**
		 * @function kernel.external:util.Progress#pause
		 * @returns {boolean}
		 */
		this.pause = function() {
			if (status === PENDING) {
				status = PAUSE;
				return true;
			}
			return false;
		};

		/**
		 * @function kernel.external:util.Progress#restore
		 * @returns {boolean}
		 */
		this.restore = function() {
			if (status === PAUSE) {
				status = PENDING;
				next();
				return true;
			}
			return false;
		};

		/**
		 * @function kernel.external:util.Progress#stop
		 * @returns {boolean}
		 */
		this.stop = function() {
			if (status !== UNFINISHED && status !== FINISHED) {
				status = UNFINISHED;
				return true;
			}
			return false;
		};
	};

	/**
	 * @function kernel.external:util.Progress#onChange
	 * @abstract
	 */
	kernel.util.Progress.prototype.onChange = function() {
	};

	/**
	 * @function kernel.external:util.Progress#onComplete
	 * @abstract
	 */
	kernel.util.Progress.prototype.onComplete = function() {
	};

	/**
	 * @function kernel.external:util.Progress#makeSure
	 * @param {*}
	 *            value
	 * @param {kernel.external:util.Step}
	 *            step
	 * @returns {*}
	 */
	kernel.util.Progress.prototype.makeSure = function(value, step) {
		return value;
	};

	/**
	 * @function kernel.external:util.Progress#makeOver
	 * @param {*}
	 *            value
	 * @param {kernel.external:util.Step}
	 *            step
	 * @returns {*}
	 */
	kernel.util.Progress.prototype.makeOver = function(value, step) {
		return value;
	};

	/**
	 * @class kernel.external:util.Step
	 * @since 1.2
	 * @param {string}
	 *            name
	 * @param {kernel.external:util.Step~executor}
	 *            executor
	 */
	kernel.util.Step = function(name, executor) {
		var Promise = kernel.util.Promise;

		/**
		 * @function kernel.external:util.Step#getName
		 * @returns {string}
		 */
		this.getName = function() {
			return name;
		};

		/**
		 * @function kernel.external:util.Step#run
		 * @param {(kernel.external:util.Promise|*)}
		 *            value
		 * @param {Object}
		 *            controller
		 * @returns {kernel.external:util.Promise}
		 */
		this.run = function(value, controller) {
			controller.setDetail(name);
			controller.change(0);
			var promise = null;
			try {
				promise = Promise.resolve(executor(value, controller));
			} catch (e) {
				promise = Promise.reject(e);
			}
			return promise;
		};
	};

	/**
	 * @member {number} kernel.external:util.Step#timeout
	 * @default 0
	 */
	kernel.util.Step.prototype.timeout = 0;

	/**
	 * @member {boolean} kernel.external:util.Step#ignorable
	 * @default false
	 */
	kernel.util.Step.prototype.ignorable = false;

})(this, this["kernel@1.3"], false);
/**
 * @callback kernel.external:util.Step~executor
 * @param {*}
 *            value
 * @param {Object}
 *            controller
 * @returns {(kernel.external:util.Promise|*)}
 */(function(window, kernel, debug) {

	function remove(arr, obj) {
		var i = 0, boo = false;
		while (i < arr.length) {
			if (kernel.lang.equals(arr[i], obj)) {
				arr.splice(i, 1);
				boo = true;
			} else {
				i++;
			}
		}
		return boo;
	}

	function retainAll(arr_0, arr_1) {
		if (kernel.lang.isArray(arr_1)) {
			var i = 0, boo;
			while (i < arr_0.length) {
				boo = true;
				for (var j = 0, len = arr_1.length; j < len; j++) {
					if (kernel.lang.equals(arr_0[i], arr_1[j])) {
						boo = false;
						break;
					}
				}
				boo ? arr_0.splice(i, 1) : i++;
			}
		}
	}

	function returnIndex(arr, index) {
		if (index < 0)
			index += arr.length;
		return index;
	}

	/**
	 * @class kernel.external:util.AbstractCollection
	 */
	kernel.util.AbstractCollection = function() {
	};
	/**
	 * 
	 * @function kernel.external:util.AbstractCollection#toArray
	 * @abstract
	 * @returns {Array} A array containing all of the elements in this
	 *          collection.
	 */
	kernel.util.AbstractCollection.prototype.toArray = function() {
		return [];
	};

	/**
	 * @function kernel.external:util.AbstractCollection#add
	 * @abstract
	 * @param {*}
	 *            obj
	 */
	kernel.util.AbstractCollection.prototype.add = function(obj) {
	};

	/**
	 * @function kernel.external:util.AbstractCollection#remove
	 * @abstract
	 * @param {*}
	 *            obj
	 */
	kernel.util.AbstractCollection.prototype.remove = function(obj) {
	};

	/**
	 * @function kernel.external:util.AbstractCollection#contains
	 * @abstract
	 * @param {*}
	 *            obj
	 * @returns {boolean}
	 */
	kernel.util.AbstractCollection.prototype.contains = function(obj) {
		return false;
	};

	/**
	 * @function kernel.external:util.AbstractCollection#size
	 * @abstract
	 * @returns {number}
	 */
	kernel.util.AbstractCollection.prototype.size = function() {
		return 0;
	};

	/**
	 * @function kernel.external:util.AbstractCollection#clear
	 * @abstract
	 */
	kernel.util.AbstractCollection.prototype.clear = function() {
	};

	/**
	 * @function kernel.external:util.AbstractCollection#addAll
	 * @param {Array}
	 *            arr
	 */
	kernel.util.AbstractCollection.prototype.addAll = function(arr) {
		for (var i = 0, len = arr.length; i < len; i++) {
			this.add(arr[i]);
		}
	};

	/**
	 * @function kernel.external:util.AbstractCollection#removeAll
	 * @param {Array}
	 *            arr
	 */
	kernel.util.AbstractCollection.prototype.removeAll = function(arr) {
		for (var i = 0, len = arr.length; i < len; i++) {
			this.remove(arr[i]);
		}
	};

	/**
	 * @function kernel.external:util.AbstractCollection#containsAll
	 * @param {Array}
	 *            arr
	 * @returns {boolean}
	 */
	kernel.util.AbstractCollection.prototype.containsAll = function(arr) {
		var boo = true;
		for (var i = 0, len = arr.length; i < len; i++)
			if (!this.contains(arr[i])) {
				boo = false;
				break;
			}
		return boo;
	};

	/**
	 * @function kernel.external:util.AbstractCollection#isEmpty
	 * @returns {boolean}
	 */
	kernel.util.AbstractCollection.prototype.isEmpty = function() {
		return this.size() === 0;
	};

	/**
	 * @function kernel.external:util.AbstractCollection#forEach
	 * @param {kernel.external:util.AbstractCollection~forEachCallback}
	 *            callback
	 */
	kernel.util.AbstractCollection.prototype.forEach = function(callback) {
		var arr = this.toArray();
		for (var i = 0, len = arr.length; i < len; i++)
			callback(arr[i]);
	};

	/**
	 * @class kernel.external:util.List
	 * @augments kernel.external:util.AbstractCollection
	 */
	kernel.util.List = function() {
		this.constructor = arguments.callee;

		var _arr = [];

		/**
		 * @function kernel.external:util.List#toArray
		 * @returns {Array}
		 */
		this.toArray = function() {
			return _arr.concat([]);
		};

		/**
		 * @function kernel.external:util.List#forEach
		 * @param {kernel.external:util.List~forEachCallback}
		 *            callback
		 */
		this.forEach = function(callback) {
			var arr = this.toArray();
			for (var i = 0, len = arr.length; i < len; i++)
				callback(arr[i], i);
		};

		/**
		 * @function kernel.external:util.List#add
		 * @param {*}
		 *            obj
		 */
		this.add = function(obj) {
			_arr.push(obj);
		};

		/**
		 * @function kernel.external:util.List#remove
		 * @param {*}
		 *            obj
		 */
		this.remove = function(obj) {
			remove(_arr, obj);
		};

		/**
		 * @function kernel.external:util.List#contains
		 * @param {*}
		 *            obj
		 * @returns {boolean}
		 */
		this.contains = function(obj) {
			return kernel.lang.contains(_arr, obj);
		};

		/**
		 * @function kernel.external:util.List#size
		 * @returns {number}
		 */
		this.size = function() {
			return _arr.length;
		};
		/**
		 * @function kernel.external:util.List#clear
		 */
		this.clear = function() {
			_arr = [];
		};

		/**
		 * @function kernel.external:util.List#addByIndex
		 * @param {number}
		 *            index
		 * @param {*}
		 *            obj
		 */
		this.addByIndex = function(index, obj) {
			index = returnIndex(_arr, index);
			_arr.splice(index, 0, obj);
		};
		/**
		 * @function kernel.external:util.List#removeByIndex
		 * @param {number}
		 *            index
		 */
		this.removeByIndex = function(index) {
			index = returnIndex(_arr, index);
			_arr.splice(index, 1);
		};
		/**
		 * @function kernel.external:util.List#get
		 * @param {number}
		 *            index
		 * @returns {*}
		 */
		this.get = function(index) {
			index = returnIndex(_arr, index);
			var value = _arr[index];
			return value;
		};
		/**
		 * 
		 * @function kernel.external:util.List#set
		 * @param {number}
		 *            index
		 * @param {*}
		 *            obj
		 */
		this.set = function(index, obj) {
			index = returnIndex(_arr, index);
			_arr[index] = obj;
		};

		/**
		 * @function kernel.external:util.List#retainAll
		 */
		this.retainAll = function(arr) {
			retainAll(_arr, arr);
		};

		/**
		 * @function kernel.external:util.List#reverse
		 */
		this.reverse = function() {
			_arr.reverse();
		};
	};
	kernel.util.List.prototype = new kernel.util.AbstractCollection();

	/**
	 * @function kernel.external:util.List#indexOf
	 * @param {*}
	 *            obj
	 * @param {number}
	 *            [fromIndex=0]
	 * @returns {number}
	 */
	kernel.util.List.prototype.indexOf = function(obj, fromIndex) {
		var arr = this.toArray();
		if ("indexOf" in arr) {
			return arr.indexOf.apply(arr, arguments);
		} else {
			var index = -1;
			var i = isNaN(fromIndex) ? 0 : returnIndex(arr, fromIndex);
			for (var len = arr.length; i < len; i++) {
				if (kernel.lang.equals(arr[i], obj)) {
					index = i;
					break;
				}
			}
			return index;
		}
	};

	/**
	 * 
	 * @function kernel.external:util.List#lastIndexOf
	 * @param {*}
	 *            obj
	 * @param {number}
	 *            [startIndex]
	 * @returns {number}
	 */
	kernel.util.List.prototype.lastIndexOf = function(obj, startIndex) {
		var arr = this.toArray();
		if ("lastIndexOf" in arr) {
			return arr.lastIndexOf.apply(arr, arguments);
		} else {
			var index = -1;
			var i = returnIndex(arr, isNaN(startIndex) ? -1 : startIndex);
			for (; i >= 0; i--) {
				if (arr[i] === obj) {
					index = i;
					break;
				}
			}
			return index;
		}
	};

	/**
	 * @function kernel.external:util.List#slice
	 * @param {number}
	 *            startIndex
	 * @param {number}
	 *            [endIndex=-1]
	 * @returns {Array}
	 */
	kernel.util.List.prototype.slice = function(startIndex, endIndex) {
		var arr = this.toArray();
		if ("slice" in arr) {
			return arr.slice.apply(arr, arguments);
		} else {
			startIndex = returnIndex(arr, startIndex);
			endIndex = isNaN(endIndex) ? arr.length
					: returnIndex(arr, endIndex);
			var newArr = [];
			var i = startIndex;
			var length = endIndex;
			for (; i < length; i++) {
				newArr.push(arr[i]);
			}
			return newArr;
		}
	};

	/**
	 * @function kernel.external:util.List#subList
	 * @param {number}
	 *            startIndex
	 * @param {number}
	 *            [endIndex=-1]
	 * @returns {kernel.external:util.List}
	 */
	kernel.util.List.prototype.subList = function(startIndex, endIndex) {
		var list = new kernel.util.List();
		list.addAll(this.slice(startIndex, endIndex));
		return list;
	};

	/**
	 * 
	 * @function kernel.external:util.List#sort
	 * @since 1.2
	 * @param {kernel.external:util.QuickSort#compare}
	 *            [compare]
	 */
	kernel.util.List.prototype.sort = function(compare) {
		var quickSort = new kernel.util.QuickSort();
		if (kernel.lang.isFunction(compare))
			quickSort.compare = function() {
				return compare.apply(null, arguments);
			};
		quickSort.swap = function(list, i, j) {
			var tmp = list.get(i);
			list.set(i, list.get(j));
			list.set(j, tmp);
		};
		quickSort.getElement = function(list, i) {
			return list.get(i);
		};
		quickSort.getLength = function(list) {
			return list.size();
		};
		quickSort.sort(this);
	};

	/**
	 * @class kernel.external:util.Set
	 * @augments kernel.external:util.AbstractCollection
	 */
	kernel.util.Set = function() {
		this.constructor = arguments.callee;

		if (kernel.lang.isFunction(window, "Set")) {
			debug && console.log("Window.Set");

			var _set = new Set();

			this.toArray = function() {
				var arr = [];
				if (kernel.lang.isFunction(_set, "values")) {
					var iterator = _set.values();
					for (var i = 0, len = _set.size; i < len; i++)
						arr.push(iterator.next().value);
				} else {
					_set.forEach(function(obj) {
						arr.push(obj);
					});
				}
				return arr;
			};

			this.add = function(obj) {
				if (!this.contains(obj)) {
					_set.add(obj);
					return true;
				}
				return false;
			};

			this.remove = function(obj) {
				if (this.contains(obj)) {
					_set["delete"](obj);
					return true;
				}
				return false;
			};

			this.contains = function(obj) {
				return _set.has(obj);
			};

			this.size = function() {
				return _set.size;
			};

			this.clear = function() {
				_set.clear();
			};

			this.forEach = function(callback) {
				if (_set.forEach) {
					_set.forEach(function(value) {
						callback(value);
					});
				} else {
					var iterator = _set.values();
					for (var i = 0, len = _set.size; i < len; i++)
						callback(iterator.next().value);
				}
			};

		} else {
			var _arr = [];

			/**
			 * @function kernel.external:util.List#toArray
			 * @returns {Array}
			 */
			this.toArray = function() {
				return _arr.concat([]);
			};

			/**
			 * @function kernel.external:util.Set#add
			 * @param {*}
			 *            obj
			 * @returns {boolean}
			 */
			this.add = function(obj) {
				if (this.contains(obj)) {
					return false;
				} else {
					_arr.push(obj);
					return true;
				}
			};
			/**
			 * @function kernel.external:util.Set#remove
			 * @param {*}
			 *            obj
			 * @returns {boolean}
			 */
			this.remove = function(obj) {
				return remove(_arr, obj);
			};
			/**
			 * @function kernel.external:util.Set#contains
			 * @param {*}
			 *            obj
			 * @returns {boolean}
			 */
			this.contains = function(obj) {
				return kernel.lang.contains(_arr, obj);
			};

			/**
			 * @function kernel.external:util.Set#size
			 * @returns {number}
			 */
			this.size = function() {
				return _arr.length;
			};
			/**
			 * @function kernel.external:util.Set#clear
			 */
			this.clear = function() {
				_arr = [];
			};
		}
	};
	kernel.util.Set.prototype = new kernel.util.AbstractCollection();

	/**
	 * @class kernel.external:util.Queue
	 * @augments kernel.external:util.AbstractCollection
	 */
	kernel.util.Queue = function() {
		this.constructor = arguments.callee;

		var _arr = [];

		/**
		 * @function kernel.external:util.Queue#add
		 * @returns {Array}
		 */
		this.toArray = function() {
			return _arr.concat([]);
		};

		/**
		 * @function kernel.external:util.Queue#add
		 * @param {*}
		 *            obj
		 * @returns {boolean}
		 */
		this.add = function(obj) {
			_arr.push(obj);
			return true;
		};
		/**
		 * @function kernel.external:util.Queue#remove
		 * @param {*}
		 *            obj
		 * @returns {boolean}
		 */
		this.remove = function(obj) {
			return remove(_arr, obj);
		};
		/**
		 * @function kernel.external:util.Queue#contains
		 * @param {*}
		 *            obj
		 * @returns {boolean}
		 */
		this.contains = function(obj) {
			return kernel.lang.contains(_arr, obj);
		};
		/**
		 * @function kernel.external:util.Queue#size
		 * @returns {number}
		 */
		this.size = function() {
			return _arr.length;
		};
		/**
		 * @function kernel.external:util.Queue#clear
		 */
		this.clear = function() {
			_arr = [];
		};

		/**
		 * 
		 * @function kernel.external:util.Queue#poll
		 * @returns {*}
		 */
		this.poll = function() {
			return _arr.shift();
		};

		/**
		 * @function kernel.external:util.Queue#peek
		 * @returns {*}
		 */
		this.peek = function() {
			var value = _arr[0];
			return value;
		};

	};
	kernel.util.Queue.prototype = new kernel.util.AbstractCollection();

})(this, this["kernel@1.3"], false);

/**
 * @callback kernel.external:util.AbstractCollection~forEachCallback
 * @param {*}
 *            value
 */

/**
 * @callback kernel.external:util.List~forEachCallback
 * @param {*}
 *            value
 * @param {number}
 *            index
 */
(function(window, kernel, debug) {

	/**
	 * @function kernel.external:platform.isFullScreenEnabled
	 * @returns {boolean}
	 */
	kernel.platform.isFullScreenEnabled = function() {
		try {
			var dom = window.top.document;
			return Boolean(dom.fullscreenEnabled || dom.msFullScreenEnabled
					|| dom.mozFullScreenEnabled || dom.webkitFullScreenEnabled
					|| dom.exitFullscreen || dom.msExitFullscreen
					|| dom.mozCancelFullScreen || dom.webkitExitFullscreen
					|| false);
		} catch (e) {
		}
		return false;
	};

	/**
	 * @function kernel.external:platform.getFullScreenElement
	 * @returns {?HTMLElement}
	 */
	kernel.platform.getFullScreenElement = function() {
		try {
			var dom = window.top.document;
			return dom.fullscreenElement || dom.mozFullScreenElement
					|| dom.webkitFullscreenElement || dom.msFullscreenElement
					|| null;
		} catch (e) {
		}
		return null;
	};

	/**
	 * @function kernel.external:platform.isFullScreen
	 * @returns {boolean}
	 */
	kernel.platform.isFullScreen = function() {
		try {
			var dom = window.top.document;
			if ("mozFullScreen" in dom)
				return dom.mozFullScreen;
			if ("webkitIsFullScreen" in dom)
				return dom.webkitIsFullScreen;
			return kernel.platform.getFullScreenElement() != null;
		} catch (e) {
		}
		return false;
	};

	/**
	 * @function kernel.external:platform.toggleFullScreen
	 * @param {HTMLElement}
	 *            element
	 * @returns {boolean}
	 */
	kernel.platform.toggleFullScreen = function(element) {
		try {
			if (kernel.platform.isFullScreen()) {
				var dom = window.top.document;
				if (dom.exitFullscreen) {
					dom.exitFullscreen();
				} else if (dom.msExitFullscreen) {
					dom.msExitFullscreen();
				} else if (dom.mozCancelFullScreen) {
					dom.mozCancelFullScreen();
				} else if (dom.webkitExitFullscreen) {
					dom.webkitExitFullscreen();
				} else {
					return false;
				}
			} else {
				element = element || window.top.document.documentElement;

				if (kernel.xml.getDefaultView(element) !== window.top)
					return false;

				if (element.requestFullscreen) {
					element.requestFullscreen();
				} else if (element.msRequestFullscreen) {
					element.msRequestFullscreen();
				} else if (element.mozRequestFullScreen) {
					element.mozRequestFullScreen();
				} else if (element.webkitRequestFullscreen) {
					element
							.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				} else {
					return false;
				}
			}
			return true;
		} catch (e) {
		}
		return false;
	};

})(this, this["kernel@1.3"], false);