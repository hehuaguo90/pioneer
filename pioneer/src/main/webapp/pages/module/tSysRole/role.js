//角色相关脚本
var checkNode = false;
function loadRights(){
	var roleid = $("#roleId").val();
	if(roleid){
		//异步获取当前角色已有的权限id
		$.post(contextPath + '/tSysRole/getRightids', { 'roleid': roleid }, function(data){
			loadRightTree(data);
		});
		
	}else{
		loadRightTree();
	}
}

function loadRightTree(ids){
	var b = true;
	$('#ttree').tree({
		url : contextPath + '/tSysRole/treeRight',
		method : 'post',
		animate : true,
		lines : true,
		checkbox : true,
		cascadeCheck : false,
		onLoadSuccess : function(node, data) {
			if (ids && b) {
				b = false;
				(function(ds) {
					var rids = ids.split(',');
					for ( var i = 0; i < ds.length; i++) {
						var d = ds[i];
						for ( var j = 0; j < rids.length; j++) {
							if (d.id == rids[j]) {
								d.checked = true;
							}
						}
						if (d.children) {
							arguments.callee(d.children);
						}
					}
				})(data);
				$('#ttree').tree('loadData', data);
			}
		},
		onCheck : function(node, checked) {
			//只响应点击的选中，排除自动被选中的事件
			if (!checkNode) {
				checkNode = true;
				if (checked) {
					checkParent(node);
					checkChild(node);
				} else {
					uncheckChild(node);
				}
				checkNode = false;
			}
		}
	});
}

function checkParent(node) {
	var pnode = $('#ttree').tree('getParent', node.target);
	if (pnode) {
		$('#ttree').tree('check', pnode.target);
		checkParent(pnode);
	}
}

function checkChild(node) {
	var chs = $('#ttree').tree('getChildren', node.target);
	if (chs) {
		for ( var i = 0; i < chs.length; i++) {
			$('#ttree').tree('check', chs[i].target);
		}
	}
}

function uncheckChild(node) {
	var chs = $('#ttree').tree('getChildren', node.target);
	if (chs) {
		for ( var i = 0; i < chs.length; i++) {
			$('#ttree').tree('uncheck', chs[i].target);
		}
	}
}

function sForm() {
	var nodes = $('#ttree').tree('getChecked');
	if (!nodes || nodes.length == 0) {
		$.messager.alert('系统信息', '必须授限', 'warning');
		return;
	}

	var nodeIds = "";
	for ( var i = 0; i < nodes.length; i++) {
		nodeIds += nodes[i].id;
		if (i < nodes.length - 1) {
			nodeIds += ",";
		}
	}
	$("#rightids").val(nodeIds);
	page.saveForm();
}

