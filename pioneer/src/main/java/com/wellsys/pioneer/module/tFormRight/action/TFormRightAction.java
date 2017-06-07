package com.wellsys.pioneer.module.tFormRight.action;

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

import com.wellsys.pioneer.module.tFormRight.model.TFormRightModel;
import com.wellsys.pioneer.module.tFormRight.service.TFormRightService;

/**
* 数据访问层接口。
* TABLE CODE:	t_form_right;
* TABLE NAME:	
* TABLE REMARK:	填报权限
* code tools version V1.0,created on Fri Dec 02 11:48:29 CST 2016
*/

@Controller
@RequestMapping("/tFormRight")
public class TFormRightAction {
	@Autowired
	private TFormRightService tFormRightService ;
//	@Autowired
//	private LogService logService;
	@Autowired
	private  HttpServletRequest request;

	/**
	 * 新增  （ 填报权限）
	 * @param item 数据内容。
	 * @param response http response
	 * @throws IOException 异常信息
	 * */
	@RequestMapping("/add")
	public void addBean( TFormRightModel  item, HttpServletResponse response) throws IOException{
		try {

			//添加UUID主键,如果不用UUID,自行修改
    		item.setRightId(CreateUUID.createUUID());

			tFormRightService.save(item);

 			ActionUtil.addLog(request,0, "add","tFormRight" ,true,"");

			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_save_suc")),null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "add","tFormRight" ,false,e.getMessage());

			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}
	/**
	 * 根据id获取需要的数据对象
	 * @throws IOException 
	 * */
	@RequestMapping(value="/getBeanById")
	public void getBeanById(TFormRightModel  item,
			HttpServletResponse response) throws IOException{
		try {
		TFormRightModel  tFormRightModel = tFormRightService.getBeanById(item);
			ActionUtil.addLog(request,0, "getBeanById","tFormRight" ,true,"");
			JsonUtils.printJSONByObj(response, tFormRightModel, null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "getBeanById","tFormRight" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}

	@RequestMapping(value="/getBeanMapById/")
	public void getBeanMapById(TFormRightModel  item,
		HttpServletResponse response) throws IOException{
		try {
			Map object = tFormRightService.getBeanMapById(item);
			ActionUtil.addLog(request,0, "getBeanMapById","tFormRight" ,true,"");
			JsonUtils.printJSONByObj(response, object, null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "getBeanMapById","tFormRight" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}

	/**
	 * 修改信息
	 * @param tFormRightModel  tFormRightModel 数据内容。
	 * @throws IOException 
	 * */
	@RequestMapping("/edit")
	public void update(TFormRightModel  tFormRightModel,
			HttpServletResponse response) throws IOException{

		try {
			tFormRightService.update(tFormRightModel);
			ActionUtil.addLog(request,0, "update","tFormRight" ,true,"");
			
			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_edit_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "update","tFormRight" ,false,e.getMessage());
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
			TFormRightModel[] items= mapper.readValue(data, TFormRightModel[].class);

			tFormRightService.delete(items);

			ActionUtil.addLog(request,0, "delete","tGzQksb" ,true,"");
			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_del_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "delete","tFormRight" ,false,e.getMessage());
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
			PageList list = (PageList) tFormRightService.listMap(pageBounds, param);

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
			List list =  tFormRightService.listMap( param);

			JsonUtils.printJSONByObj(response, list, null);
	} catch (Exception e) {
		e.printStackTrace();
	}
}



}
