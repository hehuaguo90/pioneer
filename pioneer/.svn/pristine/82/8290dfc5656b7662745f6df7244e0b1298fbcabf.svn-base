package com.wellsys.pioneer.module.tSysOrg.action;

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
import java.util.List;
import java.util.Map;
import com.wellsys.common.utils.*;

import com.wellsys.pioneer.module.tSysOrg.model.TSysOrgModel;
import com.wellsys.pioneer.module.tSysOrg.service.TSysOrgService;

/**
 * 数据访问层接口。 TABLE CODE: t_sys_org; TABLE NAME: TABLE REMARK: 机构信息 code tools
 * version V1.0,created on Tue Jan 03 18:53:49 CST 2017
 */

@Controller
@RequestMapping("/tSysOrg")
public class TSysOrgAction {
	@Autowired
	private TSysOrgService tSysOrgService;
	// @Autowired
	// private LogService logService;
	@Autowired
	private HttpServletRequest request;

	/**
	 * 新增 （ 机构信息）
	 * 
	 * @param item
	 *            数据内容。
	 * @param response
	 *            http response
	 * @throws IOException
	 *             异常信息
	 * */
	@RequestMapping("/add")
	public void addBean(TSysOrgModel item, HttpServletResponse response)
			throws IOException {
		try {

			// 添加UUID主键,如果不用UUID,自行修改
			item.setOrgId(CreateUUID.createUUID());
            if(StringUtils.isBlank(item.getPid())){
            	item.setPid("0");
            }
            
            if(item.getShowOrder() == 0){
            	item.setShowOrder(1);
            }
            
			tSysOrgService.save(item);

			ActionUtil.addLog(request, 0, "add", "tSysOrg", true, "");

			JsonUtils.printJSONByObj(response, new MessageModel(1,
					MessageConfig.getMessage("opt_save_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request, 0, "add", "tSysOrg", false,
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
	public void getBeanById(TSysOrgModel item, HttpServletResponse response)
			throws IOException {
		try {
			TSysOrgModel tSysOrgModel = tSysOrgService.getBeanById(item);
			ActionUtil.addLog(request, 0, "getBeanById", "tSysOrg", true, "");
			JsonUtils.printJSONByObj(response, tSysOrgModel, null);
		} catch (Exception e) {
			ActionUtil.addLog(request, 0, "getBeanById", "tSysOrg", false,
					e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3,
					MessageConfig.getMessage("opt_save_err")), null);
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/getBeanMapById/")
	public void getBeanMapById(TSysOrgModel item, HttpServletResponse response)
			throws IOException {
		try {
			Map object = tSysOrgService.getBeanMapById(item);
			ActionUtil
					.addLog(request, 0, "getBeanMapById", "tSysOrg", true, "");
			JsonUtils.printJSONByObj(response, object, null);
		} catch (Exception e) {
			ActionUtil.addLog(request, 0, "getBeanMapById", "tSysOrg", false,
					e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3,
					MessageConfig.getMessage("opt_save_err")), null);
			e.printStackTrace();
		}
	}

	/**
	 * 修改信息
	 * 
	 * @param tSysOrgModel
	 *            tSysOrgModel 数据内容。
	 * @throws IOException
	 * */
	@RequestMapping("/edit")
	public void update(TSysOrgModel tSysOrgModel, HttpServletResponse response)
			throws IOException {

		try {
			
			if(StringUtils.isBlank(tSysOrgModel.getPid())){
				tSysOrgModel.setPid("0");
            }
			
			if(tSysOrgModel.getShowOrder() == 0){
				tSysOrgModel.setShowOrder(1);
            }
			
			tSysOrgService.update(tSysOrgModel);
			ActionUtil.addLog(request, 0, "update", "tSysOrg", true, "");

			JsonUtils.printJSONByObj(response, new MessageModel(1,
					MessageConfig.getMessage("opt_edit_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request, 0, "update", "tSysOrg", false,
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
			TSysOrgModel[] items = mapper.readValue(data, TSysOrgModel[].class);

			String msg = tSysOrgService.delete(items);

			if(StringUtils.isBlank(msg)){
				ActionUtil.addLog(request, 0, "delete", "tGzQksb", true, "");
				JsonUtils.printJSONByObj(response, new MessageModel(1,
						MessageConfig.getMessage("opt_del_suc")), null);
			}else{
				JsonUtils.printJSONByObj(response, new MessageModel(3,
						msg), null);
			}
		} catch (Exception e) {
			ActionUtil.addLog(request, 0, "delete", "tSysOrg", false,
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
			PageList list = (PageList) tSysOrgService
					.listMap(pageBounds, param);

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
			List list = tSysOrgService.listMap(param);

			JsonUtils.printJSONByObj(response, list, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/*
	 * 机构和企业树
	 * id 父节点,默认0，查询该节点之下的所有子节点
	 */
	@RequestMapping("/getOrgCompTree")
	public void getOrgCompTree(HttpServletResponse response, String id) throws IOException{
		JsonUtils.printJson(tSysOrgService.getOrgCompTree(id), response);
	}
	
	/*
	 * 机构分组
	 * id 父节点,默认0，查询该节点之下的所有子节点
	 */
	@RequestMapping("/getOrgTree")
	public void getOrgTree(HttpServletResponse response, String orgName, String id) throws IOException{
		JsonUtils.printJson(tSysOrgService.getOrgTree(orgName, id), response);
	}

	@RequestMapping("/getOrgComb")
	public void getOrgComb(HttpServletResponse response, String areaLevel) throws IOException{
		JsonUtils.printJson(tSysOrgService.getOrgComb(areaLevel), response);
	}

}
