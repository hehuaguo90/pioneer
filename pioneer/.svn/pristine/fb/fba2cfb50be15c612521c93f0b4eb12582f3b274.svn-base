(function() {
	for ( var i in window)
		if (/^kernel@1\.\d+$/g.test(i))
			(function(kernel) {
				kernel.bundle["not_enough_args"] = "方法({0})没有足够的参数！";
				kernel.bundle["out_of_range"] = "超出允许范围(值)！";
				kernel.bundle["is_not_value"] = "参数/变量({0})不是有效值！";
				kernel.bundle["is_not_array"] = "参数/变量({0})不是数组！";
				kernel.bundle["is_blank"] = "参数/变量({0})为空值！";
				kernel.bundle["is_abstract"] = "此方法({0})为抽象方法！";

				kernel.bundle["browser_error"] = "浏览器问题！";
				kernel.bundle["logical_error"] = "逻辑(流程)上存在错误！";
				kernel.bundle["failure"] = "操作失败/无效操作！";
				kernel.bundle["catch_exception"] = "已处理异常！(信息：{0})";
				kernel.bundle["special_case"] = "特殊处理情况！";
				kernel.bundle["not_support"] = "您使用的浏览器不支持该功能！";
				kernel.bundle["invalid_character"] = "包含非法字符！";
				kernel.bundle["step_timeout"] = "操作超时！";

				kernel.bundle["prevent_default"] = "已取消默认操作！";
				kernel.bundle["stop_propagation"] = "已取消事件传播！";

			})(window[i]);
})();
