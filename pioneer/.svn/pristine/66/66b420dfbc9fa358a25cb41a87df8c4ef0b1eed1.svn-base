package com.wellsys.pioneer.module.tSysRight.action;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wellsys.common.utils.*;
import com.wellsys.pioneer.module.tLoginObj.model.LoginObj;
import com.wellsys.pioneer.module.tSysDict.service.TSysDictService;
import com.wellsys.pioneer.module.tSysOptLog.service.TSysOptLogService;
import com.wellsys.pioneer.module.tSysRight.model.TSysRightModel;
import com.wellsys.pioneer.module.tSysRight.service.TSysRightService;

/**
 * 数据访问层接口。 TABLE CODE: t_sys_right; TABLE NAME: TABLE REMARK: 权限信息 code tools
 * version V1.0,created on Fri Dec 02 11:48:35 CST 2016
 */

@Controller
@RequestMapping("/tSysRight")
public class TSysRightAction {
	@Autowired
	private TSysRightService tSysRightService;
	// @Autowired
	// private LogService logService;
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private TSysOptLogService tSysOptLogService;

	@Autowired
	private TSysDictService tSysDictService;

	/**
	 * 新增 （ 权限信息）
	 * 
	 * @param item
	 *            数据内容。
	 * @param response
	 *            http response
	 * @throws IOException
	 *             异常信息
	 * */
	@RequestMapping("/add")
	public void addBean(TSysRightModel item, HttpServletResponse response,
			HttpSession session) throws IOException {
		try {

			// 添加UUID主键,如果不用UUID,自行修改
			item.setRightId(CreateUUID.createUUID());
			if ("".equals(item.getPid())) {
				item.setPid("0");
			}
			tSysRightService.save(item);
			// 添加到日志
			LoginObj loginObj = (LoginObj) session.getAttribute("login");
			tSysOptLogService.saveLog(loginObj, "1", "新增权限");

			ActionUtil.addLog(request, 0, "add", "tSysRight", true, "");
			JsonUtils.printJSONByObj(response, new MessageModel(1,
					MessageConfig.getMessage("opt_save_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request, 0, "add", "tSysRight", false,
					e.getMessage());

			JsonUtils.printJSONByObj(response, new MessageModel(3,
					MessageConfig.getMessage("opt_save_err")), null);
			e.printStackTrace();
		}
	}

	/**
	 * 根据id获取需要的数据对象
	 * 
	 * @throws IOException
	 * */
	@RequestMapping(value = "/getBeanById")
	public void getBeanById(TSysRightModel item, HttpServletResponse response)
			throws IOException {
		try {
			TSysRightModel tSysRightModel = tSysRightService.getBeanById(item);
			ActionUtil.addLog(request, 0, "getBeanById", "tSysRight", true, "");
			JsonUtils.printJSONByObj(response, tSysRightModel, null);
		} catch (Exception e) {
			ActionUtil.addLog(request, 0, "getBeanById", "tSysRight", false,
					e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3,
					MessageConfig.getMessage("opt_save_err")), null);
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/getBeanMapById/")
	public void getBeanMapById(TSysRightModel item, HttpServletResponse response)
			throws IOException {
		try {
			Map object = tSysRightService.getBeanMapById(item);
			ActionUtil.addLog(request, 0, "getBeanMapById", "tSysRight", true,
					"");
			JsonUtils.printJSONByObj(response, object, null);
		} catch (Exception e) {
			ActionUtil.addLog(request, 0, "getBeanMapById", "tSysRight", false,
					e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3,
					MessageConfig.getMessage("opt_save_err")), null);
			e.printStackTrace();
		}
	}

	/**
	 * 修改信息
	 * 
	 * @param tSysRightModel
	 *            tSysRightModel 数据内容。
	 * @throws IOException
	 * */
	@RequestMapping("/edit")
	public void update(TSysRightModel tSysRightModel,
			HttpServletResponse response, HttpSession session)
			throws IOException {

		try {
			if ("".equals(tSysRightModel.getPid())) {
				tSysRightModel.setPid("0");
			}
			tSysRightService.update(tSysRightModel);
			ActionUtil.addLog(request, 0, "update", "tSysRight", true, "");
			// 添加到日志
			LoginObj loginObj = (LoginObj) session.getAttribute("login");
			tSysOptLogService.saveLog(loginObj, "3", "修改权限");
			JsonUtils.printJSONByObj(response, new MessageModel(1,
					MessageConfig.getMessage("opt_edit_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request, 0, "update", "tSysRight", false,
					e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3,
					MessageConfig.getMessage("opt_edit_err")), null);
			e.printStackTrace();
		}
		// return "";
	}

	/**
	 * 删除
	 * 
	 * @throws IOException
	 * */
	@RequestMapping(value = "/delete")
	public void delete(@RequestParam(value = "data") String data,
			HttpServletResponse response, HttpSession session)
			throws IOException {
		try {

			ObjectMapper mapper = new ObjectMapper();
			TSysRightModel[] items = mapper.readValue(data,
					TSysRightModel[].class);

			String msg = tSysRightService.delete(items);
			if (msg == null) {
				// 添加到日志
				LoginObj loginObj = (LoginObj) session.getAttribute("login");
				tSysOptLogService.saveLog(loginObj, "2", "删除权限");
				ActionUtil.addLog(request, 0, "delete", "tGzQksb", true, "");
				JsonUtils.printJSONByObj(response, new MessageModel(1,
						MessageConfig.getMessage("opt_del_suc")), null);
			} else {
				JsonUtils.printJSONByObj(response, new MessageModel(1, msg),
						null);
			}

		} catch (Exception e) {
			ActionUtil.addLog(request, 0, "delete", "tSysRight", false,
					e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3,
					MessageConfig.getMessage("opt_del_err")), null);
			e.printStackTrace();
		}

	}

	/**
	 * 查询列表
	 * */

	@RequestMapping(value = "/listByPage")
	public void listByPage(Integer page, Integer rows,
			HttpServletResponse response) {
		try {
			@SuppressWarnings("unchecked")
			Map param = ActionUtil
					.getRequestMap((Map<String, String[]>) request
							.getParameterMap());
			PageBounds pageBounds = new PageBounds(page, rows);
			@SuppressWarnings("unchecked")
			PageList list = (PageList) tSysRightService.listMap(pageBounds,
					param);

			PageModel page2 = new PageModel();
			page2.setRows(list);
			page2.setTotal(list.getPaginator().getTotalCount());
			JsonUtils.printJSONByObj(response, page2, null);

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * 查询列表
	 * */

	@RequestMapping(value = "/listAll")
	public void listAll(HttpServletResponse response) {

		try {
			@SuppressWarnings("unchecked")
			Map param = ActionUtil
					.getRequestMap((Map<String, String[]>) request
							.getParameterMap());
			@SuppressWarnings("unchecked")
			List list = tSysRightService.listMap(param);

			JsonUtils.printJSONByObj(response, list, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 查询SYS_菜单功能权限表列表
	 * */
	@SuppressWarnings("all")
	@RequestMapping(value = "/getTreeGrid/{node}")
	public void getTreeGrid(@PathVariable("node") String node,
			String rightName, HttpServletResponse response) {
		try {
			List list = tSysRightService.getTreeGrid(node,
					StringUtils.trim(rightName));
			JsonUtils.printJSONByObj(response, list, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// getAreaTree
	/*
	 * 权限树
	 */
	@RequestMapping("/getRightTree")
	public void getRightTree(HttpServletResponse response) throws IOException {
		JsonUtils.printJson(tSysRightService.getRightTree(), response);
	}

	/**
	 * 查询权限表列表树
	 * */

	@RequestMapping(value = "/getTree/{node}")
	public void getTree(@PathVariable("node") String node,
			HttpServletResponse response) {
		try {

			List list = tSysRightService.getTree(node);

			JsonUtils.printJSONByObj(response, list, null);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 获取根权限
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("/getRootUserRight")
	public void getRootUserRight(HttpServletResponse response,
			HttpSession session) throws IOException {
		LoginObj loginObj = (LoginObj) session.getAttribute("login");
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("pid", "0");
		List<Map<String, Object>> list = tSysRightService.listMap(params);
		List<TSysRightModel> rightList = loginObj.getRightList();

		JSONArray arr = JSONArray.fromObject(JSONArray.fromObject(list)
				.toString());

		for (int i = 0; i < list.size(); i++) {
			Map<String, Object> map = list.get(i);
			map.put("isEnable", "0");// 设为不可用
		}

		for (int i = 0; i < list.size(); i++) {
			Map<String, Object> map = list.get(i);
			JSONObject obj = arr.getJSONObject(i);

			for (int j = 0; j < rightList.size(); j++) {
				TSysRightModel model = rightList.get(j);
				if (map.get("rightId").equals(model.getRightId())
						&& "1".equals(obj.get("isEnable"))) {
					map.put("isEnable", "1");// 设为可用
				}
			}
		}

		params.put("type", "RIGHT_TYPE");
		List rightType = tSysDictService.listMapDict(params);
		JSONObject json = new JSONObject();
		json.put("rightType", rightType);
		json.put("list", list);

		JsonUtils.printJson(json, response);
	}
}
