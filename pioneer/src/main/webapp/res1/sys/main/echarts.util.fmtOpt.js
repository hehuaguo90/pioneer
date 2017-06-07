(function() {

	var exclude = /^(_.|id)$/i;

	/**
	 * 
	 * 格式化柱状图和折线图选项。
	 * 
	 * @param {Object}
	 *            param - 复合参数。
	 * @param {Object}
	 *            chartType - 展示类型。
	 * @param {Object}
	 *            data - 展示数据。
	 * @param {Object}
	 *            [opt] - 图表选项。
	 * @param {Object}
	 *            [settings] - 格式化设置。
	 * @param {Object}
	 *            [settings.xFields] - X 轴字段映射。
	 * @param {Object}
	 *            [settings.yFields] - Y 轴字段映射。
	 * @param {Object}
	 *            [settings.fields] - 字段映射（用于地图，饼图）。
	 * @throws 若没有匹配的格式化方法，将抛出异常。
	 */
	echarts.util.fmtOpt = function(param) {
		switch (param.chartType) {
		case 'line':
		case 'bar':
			return fmtAxis(param);
		case 'pie':
			return fmtPie(param);
		case 'map':
			return fmtMap(param);
		default:
			throw '图表类型 ' + param.chartType + ' 没有对应的格式化方法！';
		}
	};

	function fmtAxis(param) {
		var chartType = param.chartType || 'bar';
		var conf = param.settings || {};
		var list = param.data.rows || [];
		var opt = mix({
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				data : []
			},
			calculable : true,
			xAxis : [],
			yAxis : [ {
				type : 'value'
			} ],
			series : []
		}, param.option);

		var i, j, o, k, v, len = list.length;

		if (len === 0)
			return opt;

		if (!conf.xFields || !conf.yFields) {
			i = 0;
			conf.xFields = {};
			conf.yFields = {};
			for (k in list[0]) {
				if (exclude.test(k)) {
					continue;
				} else if (i === 0) {
					conf.xFields[k] = k;
				} else {
					conf.yFields[k] = k;
				}
				i++;
			}
		}

		var xAxis = separate(conf.xFields);
		var yAxis = separate(conf.yFields);

		for (i = 0; i < len; i++) {
			o = list[i];
			for (j = 0; j < xAxis.length; j++) {
				k = xAxis.keys[j];
				if (!opt.xAxis[j]) {
					opt.xAxis[j] = {
						type : 'category',
						boundaryGap : chartType === 'bar',
						data : []
					};
				}
				opt.xAxis[j].data.push(o[k]);
			}

			for (j = 0; j < yAxis.length; j++) {
				k = yAxis.keys[j];
				v = yAxis.values[j];
				if (!opt.series[j]) {
					opt.series[j] = {
						name : v,
						type : chartType,
						data : []
					};
				}
				opt.series[j].data.push(o[k]);
			}
		}

		opt.legend.data = yAxis.values;
		return opt;
	}

	function fmtPie(param) {
		var chartType = 'pie';
		var conf = param.settings || {};
		var list = param.data.rows || [];
		var opt = mix({
			tooltip : {
				trigger : 'item',
				formatter : "{b} ({d}%)"
			},
			legend : {
				data : []
			},
			series : []
		}, param.option);

		var i, j, o, k, v, len = list.length;

		if (len === 0)
			return opt;

		if (!conf.fields) {
			conf.fields = {};
			for (k in list[0]) {
				if (exclude.test(k)) {
					continue;
				}
				conf.fields[k] = k;
			}
		}

		var item = separate(conf.fields);
		for (i = 0; i < len; i++) {
			o = list[i];
			v = {
				type : chartType,
				data : []
			};
			opt.series.push(v);
			for (j = 0; j < item.length; j++) {
				k = item.keys[j];
				v.data.push({
					name : item.values[j],
					value : o[k]
				});
			}
		}

		opt.legend.data = item.values;
		return opt;
	}

	function fmtMap(param) {
		var chartType = 'map';
		var conf = param.settings || {};
		var list = param.data.rows || [];
		var opt = mix({
			tooltip : {
				trigger : 'item',
				formatter : "{b} ({c})"
			},
			dataRange : {
				min : 0,
				max : 100,
				realtime : false,
				calculable : true,
				color : [ 'orangered', 'yellow', 'lightskyblue' ]
			},
			series : []
		}, param.option);

		var i, j, o, k, v, len = list.length;

		if (len === 0)
			return opt;

		if (!conf.fields) {
			conf.fields = {};
			for (k in list[0]) {
				if (exclude.test(k)) {
					continue;
				}
				conf.fields[k] = k;
			}
		}

		var item = separate(conf.fields);
		for (i = 0; i < len; i++) {
			o = list[i];
			v = {
				type : chartType,
				mapType : o['_MapType'],
				nameMap : conf.fields,
				itemStyle : {
					normal : {
						label : {
							show : true
						}
					},
					emphasis : {
						label : {
							show : true
						}
					}
				},
				data : []
			};
			opt.series.push(v);
			for (j = 0; j < item.length; j++) {
				k = item.keys[j];
				v.data.push({
					name : item.values[j],
					value : typeof o[k] === 'undefined' ? o[item.values[j]]
							: o[k]
				});
			}
		}
		return opt;
	}

	function separate(o) {
		var keys = [], values = [], count = 0;
		for ( var k in o) {
			keys.push(k);
			values.push(o[k]);
			count++;
		}
		return {
			keys : keys,
			values : values,
			length : count
		};
	}

	function mix(a, b) {
		a = a || {};
		var k, v;
		for (k in b) {
			v = b[k];
			if (v.constructor === Object) {
				a[k] = arguments.callee(a[k], v);
			} else {
				a[k] = v;
			}
		}
		return a;
	}

})();