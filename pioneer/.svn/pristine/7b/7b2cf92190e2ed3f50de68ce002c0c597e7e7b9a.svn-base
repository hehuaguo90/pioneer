package com.wellsys.pioneer.module.tSysCustomArea.action;

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
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import com.wellsys.common.utils.*;
import com.wellsys.pioneer.module.tSysCustomArea.model.TSysCustomAreaModel;
import com.wellsys.pioneer.module.tSysCustomArea.service.TSysCustomAreaService;

/**
* 数据访问层接口。
* TABLE CODE:	t_sys_custom_area;
* TABLE NAME:	
* TABLE REMARK:	功能区信息
* code tools version V1.0,created on Fri Dec 02 11:48:34 CST 2016
*/

@Controller
@RequestMapping("/tSysCustomArea")
public class TSysCustomAreaAction {
	@Autowired
	private TSysCustomAreaService tSysCustomAreaService ;
//	@Autowired
//	private LogService logService;
	@Autowired
	private  HttpServletRequest request;

	/**
	 * 新增  （ 功能区信息）
	 * @param item 数据内容。
	 * @param response http response
	 * @throws IOException 异常信息
	 * */
	@RequestMapping("/add")
	public void addBean( TSysCustomAreaModel  item,String areaIds, HttpServletResponse response) throws IOException{
		try {

			//添加UUID主键,如果不用UUID,自行修改
    		item.setCareaId(CreateUUID.createUUID());
    		item.setCreateTime(new Timestamp(System.currentTimeMillis()));
			tSysCustomAreaService.save(item,areaIds);

 			ActionUtil.addLog(request,0, "add","tSysCustomArea" ,true,"");

			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_save_suc")),null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "add","tSysCustomArea" ,false,e.getMessage());

			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}
	/**
	 * 根据id获取需要的数据对象
	 * @throws IOException 
	 * */
	@RequestMapping(value="/getBeanById")
	public void getBeanById(TSysCustomAreaModel  item,
			HttpServletResponse response) throws IOException{
		try {
		TSysCustomAreaModel  tSysCustomAreaModel = tSysCustomAreaService.getBeanById(item);
			ActionUtil.addLog(request,0, "getBeanById","tSysCustomArea" ,true,"");
			JsonUtils.printJSONByObj(response, tSysCustomAreaModel, null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "getBeanById","tSysCustomArea" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}

	@RequestMapping(value="/getBeanMapById/")
	public void getBeanMapById(TSysCustomAreaModel  item,
		HttpServletResponse response) throws IOException{
		try {
			Map object = tSysCustomAreaService.getBeanMapById(item);
			ActionUtil.addLog(request,0, "getBeanMapById","tSysCustomArea" ,true,"");
			JsonUtils.printJSONByObj(response, object, null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "getBeanMapById","tSysCustomArea" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}

	/**
	 * 修改信息
	 * @param tSysCustomAreaModel  tSysCustomAreaModel 数据内容。
	 * @throws IOException 
	 * */
	@RequestMapping("/edit")
	public void update(TSysCustomAreaModel  tSysCustomAreaModel,String areaIds,
			HttpServletResponse response) throws IOException{

		try {
			tSysCustomAreaService.update(tSysCustomAreaModel,areaIds);
			ActionUtil.addLog(request,0, "update","tSysCustomArea" ,true,"");
			
			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_edit_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "update","tSysCustomArea" ,false,e.getMessage());
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
			TSysCustomAreaModel[] items= mapper.readValue(data, TSysCustomAreaModel[].class);

			tSysCustomAreaService.delete(items);

			ActionUtil.addLog(request,0, "delete","tGzQksb" ,true,"");
			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_del_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "delete","tSysCustomArea" ,false,e.getMessage());
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
			PageList list = (PageList) tSysCustomAreaService.listMap(pageBounds, param);

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
			List list =  tSysCustomAreaService.listMap( param);

			JsonUtils.printJSONByObj(response, list, null);
	} catch (Exception e) {
		e.printStackTrace();
	}
}



}
