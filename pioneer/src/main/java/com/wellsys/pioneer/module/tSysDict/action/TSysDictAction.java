package com.wellsys.pioneer.module.tSysDict.action;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.wellsys.common.utils.*;

import com.wellsys.pioneer.module.tSysDict.model.TSysDictModel;
import com.wellsys.pioneer.module.tSysDict.service.TSysDictService;

/**
 * 数据访问层接口。 TABLE CODE: t_sys_dict; TABLE NAME: TABLE REMARK: 数据字典表 code tools
 * version V1.0,created on Fri Dec 02 11:48:34 CST 2016
 */

@Controller
@RequestMapping("/tSysDict")
public class TSysDictAction {
	@Autowired
	private TSysDictService tSysDictService;
	// @Autowired
	// private LogService logService;
	@Autowired
	private HttpServletRequest request;

	/**
	 * 新增 （ 数据字典表）
	 * 
	 * @param item
	 *            数据内容。
	 * @param response
	 *            http response
	 * @throws IOException
	 *             异常信息
	 * */
	@RequestMapping("/add")
	public void addBean(TSysDictModel item, HttpServletResponse response)
			throws IOException {
		try {

			// 添加UUID主键,如果不用UUID,自行修改
			item.setDictId(CreateUUID.createUUID());

			tSysDictService.save(item);

			ActionUtil.addLog(request, 0, "add", "tSysDict", true, "");

			JsonUtils.printJSONByObj(response, new MessageModel(1,
					MessageConfig.getMessage("opt_save_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request, 0, "add", "tSysDict", false,
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
	public void getBeanById(TSysDictModel item, HttpServletResponse response)
			throws IOException {
		try {
			TSysDictModel tSysDictModel = tSysDictService.getBeanById(item);
			ActionUtil.addLog(request, 0, "getBeanById", "tSysDict", true, "");
			JsonUtils.printJSONByObj(response, tSysDictModel, null);
		} catch (Exception e) {
			ActionUtil.addLog(request, 0, "getBeanById", "tSysDict", false,
					e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3,
					MessageConfig.getMessage("opt_save_err")), null);
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/getBeanMapById/")
	public void getBeanMapById(TSysDictModel item, HttpServletResponse response)
			throws IOException {
		try {
			Map object = tSysDictService.getBeanMapById(item);
			ActionUtil.addLog(request, 0, "getBeanMapById", "tSysDict", true,
					"");
			JsonUtils.printJSONByObj(response, object, null);
		} catch (Exception e) {
			ActionUtil.addLog(request, 0, "getBeanMapById", "tSysDict", false,
					e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3,
					MessageConfig.getMessage("opt_save_err")), null);
			e.printStackTrace();
		}
	}

	/**
	 * 修改信息
	 * 
	 * @param tSysDictModel
	 *            tSysDictModel 数据内容。
	 * @throws IOException
	 * */
	@RequestMapping("/edit")
	public void update(TSysDictModel tSysDictModel, HttpServletResponse response)
			throws IOException {

		try {
			tSysDictService.update(tSysDictModel);
			ActionUtil.addLog(request, 0, "update", "tSysDict", true, "");

			JsonUtils.printJSONByObj(response, new MessageModel(1,
					MessageConfig.getMessage("opt_edit_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request, 0, "update", "tSysDict", false,
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
			HttpServletResponse response) throws IOException {
		try {

			ObjectMapper mapper = new ObjectMapper();
			TSysDictModel[] items = mapper.readValue(data,
					TSysDictModel[].class);

			tSysDictService.delete(items);

			ActionUtil.addLog(request, 0, "delete", "tGzQksb", true, "");
			JsonUtils.printJSONByObj(response, new MessageModel(1,
					MessageConfig.getMessage("opt_del_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request, 0, "delete", "tSysDict", false,
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
			Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
			PageBounds pageBounds = new PageBounds(page, rows);
			@SuppressWarnings("unchecked")
			PageList list = (PageList) tSysDictService.listMap(pageBounds,param);

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
			List list = tSysDictService.listMap(param);

			JsonUtils.printJSONByObj(response, list, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 字典表easyui的下拉框数据
	 * type 数据字典类型
	 * showNull 显示为空的字段
	 */
	@RequestMapping(value = "/listDict")
	public void listDict(HttpServletResponse response, String type, String showNull){
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("type", type);
			List list  = tSysDictService.listMapDict(params);
			
			if(!StringUtils.isBlank(showNull)){
				Map<String, Object> n = new HashMap<String, Object>();
				n.put("id", "");
				n.put("text", "无");
				list.add(0, n);
			}
			
			JsonUtils.printJSONArrayByList(response, list, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
