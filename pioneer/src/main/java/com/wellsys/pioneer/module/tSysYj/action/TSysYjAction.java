package com.wellsys.pioneer.module.tSysYj.action;

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
import java.util.List;
import java.util.Map;
import com.wellsys.common.utils.*;
import com.wellsys.pioneer.module.tSysYj.model.TSysYjModel;
import com.wellsys.pioneer.module.tSysYj.service.TSysYjService;

/**
* 数据访问层接口。
* TABLE CODE:	t_sys_db_record;
* TABLE NAME:	
* TABLE REMARK:	数据库操作记录
* code tools version V1.0,created on Fri Dec 23 14:20:58 CST 2016
*/

@Controller
@RequestMapping("/TSysYj")
public class TSysYjAction {
	@Autowired
	private TSysYjService tSysYjService ;
//	@Autowired
//	private LogService logService;
	@Autowired
	private  HttpServletRequest request;

	/**
	 * 新增  （ 数据库操作记录）
	 * @param item 数据内容。
	 * @param response http response
	 * @throws IOException 异常信息
	 * */
	@RequestMapping("/add")
	public void addBean( TSysYjModel  item, HttpServletResponse response) throws IOException{
		try {

			//添加UUID主键,如果不用UUID,自行修改
    		item.setId(CreateUUID.createUUID());

			tSysYjService.save(item);

 			ActionUtil.addLog(request,0, "add","TSysYj" ,true,"");

			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_save_suc")),null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "add","TSysYj" ,false,e.getMessage());

			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}
	/**
	 * 根据id获取需要的数据对象
	 * @throws IOException 
	 * */
	@RequestMapping(value="/getBeanById")
	public void getBeanById(TSysYjModel  item,
			HttpServletResponse response) throws IOException{
		try {
		TSysYjModel  TSysYjModel = tSysYjService.getBeanById(item);
			ActionUtil.addLog(request,0, "getBeanById","TSysYj" ,true,"");
			JsonUtils.printJSONByObj(response, TSysYjModel, null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "getBeanById","TSysYj" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}

	@RequestMapping(value="/getBeanMapById/")
	public void getBeanMapById(TSysYjModel  item,
		HttpServletResponse response) throws IOException{
		try {
			Map object = tSysYjService.getBeanMapById(item);
			ActionUtil.addLog(request,0, "getBeanMapById","TSysYj" ,true,"");
			JsonUtils.printJSONByObj(response, object, null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "getBeanMapById","TSysYj" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}

	/**
	 * 修改信息
	 * @param TSysYjModel  TSysYjModel 数据内容。
	 * @throws IOException 
	 * */
	@RequestMapping("/edit")
	public void update(TSysYjModel  TSysYjModel,
			HttpServletResponse response) throws IOException{

		try {
			tSysYjService.update(TSysYjModel);
			ActionUtil.addLog(request,0, "update","TSysYj" ,true,"");
			
			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_edit_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "update","TSysYj" ,false,e.getMessage());
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
			TSysYjModel[] items= mapper.readValue(data, TSysYjModel[].class);

			tSysYjService.delete(items);

			ActionUtil.addLog(request,0, "delete","tGzQksb" ,true,"");
			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_del_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "delete","TSysYj" ,false,e.getMessage());
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
			PageList list = (PageList) tSysYjService.listMap(pageBounds, param);

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
			List list =  tSysYjService.listMap( param);

			JsonUtils.printJSONByObj(response, list, null);
	} catch (Exception e) {
		e.printStackTrace();
	}
}



}
