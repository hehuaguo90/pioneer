package com.wellsys.pioneer.module.tSysAreaUnite.action;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;

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
import com.wellsys.pioneer.module.tSysAreaUnite.model.TSysAreaUniteModel;
import com.wellsys.pioneer.module.tSysAreaUnite.service.TSysAreaUniteService;

/**
* 数据访问层接口。
* TABLE CODE:	t_sys_area_unite;
* TABLE NAME:	
* TABLE REMARK:	功能区域关联表
* code tools version V1.0,created on Fri Dec 02 11:48:34 CST 2016
*/

@Controller
@RequestMapping("/tSysAreaUnite")
public class TSysAreaUniteAction {
	@Autowired
	private TSysAreaUniteService tSysAreaUniteService ;
//	@Autowired
//	private LogService logService;
	@Autowired
	private  HttpServletRequest request;

	/**
	 * 新增  （ 功能区域关联表）
	 * @param item 数据内容。
	 * @param response http response
	 * @throws IOException 异常信息
	 * */
	@RequestMapping("/add")
	public void addBean( TSysAreaUniteModel  item, HttpServletResponse response) throws IOException{
		try {

			//添加UUID主键,如果不用UUID,自行修改
    		item.setUniteId(CreateUUID.createUUID());

			tSysAreaUniteService.save(item);

 			ActionUtil.addLog(request,0, "add","tSysAreaUnite" ,true,"");

			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_save_suc")),null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "add","tSysAreaUnite" ,false,e.getMessage());

			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}
	/**
	 * 根据id获取需要的数据对象
	 * @throws IOException 
	 * */
	@RequestMapping(value="/getBeanById")
	public void getBeanById(TSysAreaUniteModel  item,
			HttpServletResponse response) throws IOException{
		try {
		TSysAreaUniteModel  tSysAreaUniteModel = tSysAreaUniteService.getBeanById(item);
			ActionUtil.addLog(request,0, "getBeanById","tSysAreaUnite" ,true,"");
			JsonUtils.printJSONByObj(response, tSysAreaUniteModel, null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "getBeanById","tSysAreaUnite" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}

	@RequestMapping(value="/getBeanMapById/")
	public void getBeanMapById(TSysAreaUniteModel  item,
		HttpServletResponse response) throws IOException{
		try {
			Map object = tSysAreaUniteService.getBeanMapById(item);
			ActionUtil.addLog(request,0, "getBeanMapById","tSysAreaUnite" ,true,"");
			JsonUtils.printJSONByObj(response, object, null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "getBeanMapById","tSysAreaUnite" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}

	/**
	 * 修改信息
	 * @param tSysAreaUniteModel  tSysAreaUniteModel 数据内容。
	 * @throws IOException 
	 * */
	@RequestMapping("/edit")
	public void update(TSysAreaUniteModel  tSysAreaUniteModel,
			HttpServletResponse response) throws IOException{

		try {
			tSysAreaUniteService.update(tSysAreaUniteModel);
			ActionUtil.addLog(request,0, "update","tSysAreaUnite" ,true,"");
			
			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_edit_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "update","tSysAreaUnite" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_edit_err")), null);
			e.printStackTrace();
		}
		//return "";
	}
	/**
	 * 删除
	 * @throws IOException 
	 * */
	@RequestMapping(value="/delete")
	public void delete(@RequestParam(value = "data") String data,
								HttpServletResponse response) throws IOException{
		try {

			ObjectMapper mapper=new ObjectMapper();
			TSysAreaUniteModel[] items= mapper.readValue(data, TSysAreaUniteModel[].class);

			tSysAreaUniteService.delete(items);

			ActionUtil.addLog(request,0, "delete","tGzQksb" ,true,"");
			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_del_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "delete","tSysAreaUnite" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_del_err")), null);
			e.printStackTrace();
		}
		
	}
	/**
	 * 查询列表
	 * */

	@RequestMapping(value="/listByPage")
	public void listByPage(Integer page,Integer rows, HttpServletResponse response){
		try {
			@SuppressWarnings("unchecked")
			Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
			PageBounds pageBounds = new PageBounds(page, rows);
			@SuppressWarnings("unchecked")
			PageList list = (PageList) tSysAreaUniteService.listMap(pageBounds, param);

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

	@RequestMapping(value="/listAll")
	public void listAll(HttpServletResponse response){

	try {
			@SuppressWarnings("unchecked")
			Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
			@SuppressWarnings("unchecked")
			List list =  tSysAreaUniteService.listMap( param);

			JsonUtils.printJSONByObj(response, list, null);
	} catch (Exception e) {
		e.printStackTrace();
	}
}

	/**
	* 查询列表
	* */
	@SuppressWarnings("all")
	@RequestMapping(value="/getAreaIds")
	public void getAreaIds(HttpServletResponse response){

	try {
			Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
			List list =  tSysAreaUniteService.listMap( param);
			Map<String, Object> map = new HashMap<String, Object>();
			String result = "";
			for (int i = 0; i < list.size(); i++) {
				Map<String, String> uniteModel = (Map<String, String>) list.get(i);
				result+=uniteModel.get("areaId");
				if (i!=list.size()-1) {
					result+=",";
				}
			}
			map.put("result", result);
			JsonUtils.printJSONByObj(response, map, null);
	} catch (Exception e) {
		e.printStackTrace();
	}
}

}
