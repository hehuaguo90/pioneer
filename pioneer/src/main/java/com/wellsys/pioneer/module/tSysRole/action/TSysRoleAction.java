package com.wellsys.pioneer.module.tSysRole.action;

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
import javax.servlet.http.HttpSession;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.wellsys.common.utils.*;
import com.wellsys.pioneer.module.tLoginObj.model.LoginObj;
import com.wellsys.pioneer.module.tSysOptLog.service.TSysOptLogService;
import com.wellsys.pioneer.module.tSysRight.service.TSysRightService;
import com.wellsys.pioneer.module.tSysRole.model.TSysRoleModel;
import com.wellsys.pioneer.module.tSysRole.service.TSysRoleService;

/**
* 数据访问层接口。
* TABLE CODE:	t_sys_role;
* TABLE NAME:	
* TABLE REMARK:	角色信息
* code tools version V1.0,created on Fri Dec 02 11:48:35 CST 2016
*/

@Controller
@RequestMapping("/tSysRole")
public class TSysRoleAction {
	@Autowired
	private TSysRoleService tSysRoleService ;
//	@Autowired
//	private LogService logService;
	@Autowired
	private  HttpServletRequest request;
	@Autowired
	private TSysRightService tSysRightService ;
	@Autowired
	private TSysOptLogService tSysOptLogService;
	/**
	 * 新增  （ 角色信息）
	 * @param item 数据内容。
	 * @param response http response
	 * @throws IOException 异常信息
	 * */
	@RequestMapping("/add")
	public void addBean( TSysRoleModel  item,String rightids, HttpServletResponse response,HttpSession session) throws IOException{
		try {
			tSysRoleService.save(item,rightids);

 			ActionUtil.addLog(request,0, "add","tSysRole" ,true,"");
 			//添加到日志
			LoginObj loginObj = (LoginObj) session.getAttribute("login");
			tSysOptLogService.saveLog(loginObj,"1","新增角色");
			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_save_suc")),null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "add","tSysRole" ,false,e.getMessage());

			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}
	/**
	 * 根据id获取需要的数据对象
	 * @throws IOException 
	 * */
	@RequestMapping(value="/getBeanById")
	public void getBeanById(TSysRoleModel  item,
			HttpServletResponse response) throws IOException{
		try {
		TSysRoleModel  tSysRoleModel = tSysRoleService.getBeanById(item);
			ActionUtil.addLog(request,0, "getBeanById","tSysRole" ,true,"");
			JsonUtils.printJSONByObj(response, tSysRoleModel, null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "getBeanById","tSysRole" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}

	@RequestMapping(value="/getBeanMapById/")
	public void getBeanMapById(TSysRoleModel  item,
		HttpServletResponse response) throws IOException{
		try {
			Map object = tSysRoleService.getBeanMapById(item);
			ActionUtil.addLog(request,0, "getBeanMapById","tSysRole" ,true,"");
			JsonUtils.printJSONByObj(response, object, null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "getBeanMapById","tSysRole" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}

	/**
	 * 修改信息
	 * @param tSysRoleModel  tSysRoleModel 数据内容。
	 * @throws IOException 
	 * */
	@RequestMapping("/edit")
	public void update(TSysRoleModel  tSysRoleModel,String rightids,
			HttpServletResponse response,HttpSession session) throws IOException{

		try {
			tSysRoleService.update(tSysRoleModel,rightids);
			ActionUtil.addLog(request,0, "update","tSysRole" ,true,"");
			
			//添加到日志
			LoginObj loginObj = (LoginObj) session.getAttribute("login");
			tSysOptLogService.saveLog(loginObj,"3","修改角色");
			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_edit_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "update","tSysRole" ,false,e.getMessage());
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
								HttpServletResponse response,HttpSession session) throws IOException{
		try {

			ObjectMapper mapper=new ObjectMapper();
			TSysRoleModel[] items= mapper.readValue(data, TSysRoleModel[].class);

			String msg = tSysRoleService.delete(items);
			if (msg==null) {
				//添加到日志
				LoginObj loginObj = (LoginObj) session.getAttribute("login");
				tSysOptLogService.saveLog(loginObj,"2","删除角色");
				ActionUtil.addLog(request,0, "delete","tGzQksb" ,true,"");
				JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_del_suc")), null);
			}else {
				JsonUtils.printJSONByObj(response,new MessageModel(1, msg), null);
			}
			
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "delete","tSysRole" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_del_err")), null);
			e.printStackTrace();
		}
		
	}
	/**
	 * 查询列表
	 * */
	@SuppressWarnings("all")
	@RequestMapping(value="/listByPage")
	public void listByPage(Integer page,Integer rows, HttpServletResponse response){
		try {
			
			Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
			PageBounds pageBounds = new PageBounds(page, rows);
			PageList list = (PageList) tSysRoleService.listMap(pageBounds, param);

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
			List list =  tSysRoleService.listMap( param);

			JsonUtils.printJSONByObj(response, list, null);
	} catch (Exception e) {
		e.printStackTrace();
	}
}

	@RequestMapping("/getRightids")
	public void getRightids(String roleid, HttpServletResponse response){
		String rightids = tSysRoleService.getRightids(roleid);
		JsonUtils.printHtml(rightids, response);
	}
	
	@RequestMapping("/treeRight")
	public void treeRight(HttpServletResponse response){
		try {
			String json = JsonUtils.modelToJsonArray(tSysRightService.listBean(null), "rightId",
					"pid", "rightName", "0", null, false);
			JsonUtils.printJson(json, response);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
