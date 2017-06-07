//角色相关脚本
var checkNode = false;
function loadReportRights(){
	var roleid = $("#roleId").val();
	var type = $("#type").val();
	if(roleid){
		//异步获取当前角色已有的权限id
		$.post(contextPath + '/tReport/getRightids', { 'roleid': roleid ,'type':type}, function(data){
			loadRightreeType(data);
		});
		
	}else{
		loadRightreeType();
	}
}

function loadRightreeType(ids){
	var b = true;
	$('#treeType').tree({
		url : contextPath + '/tReport/getGroupReportTree',
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
				$('#treeType').tree('loadData', data);
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
	var pnode = $('#treeType').tree('getParent', node.target);
	if (pnode) {
		$('#treeType').tree('check', pnode.target);
		checkParent(pnode);
	}
}

function checkChild(node) {
	var chs = $('#treeType').tree('getChildren', node.target);
	if (chs) {
		for ( var i = 0; i < chs.length; i++) {
			$('#treeType').tree('check', chs[i].target);
		}
	}
}

function uncheckChild(node) {
	var chs = $('#treeType').tree('getChildren', node.target);
	if (chs) {
		for ( var i = 0; i < chs.length; i++) {
			$('#treeType').tree('uncheck', chs[i].target);
		}
	}
}


