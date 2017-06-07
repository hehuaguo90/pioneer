package com.wellsys.pioneer.module.tSysUser.action;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wellsys.common.utils.*;
import com.wellsys.pioneer.module.tLoginObj.model.LoginObj;
import com.wellsys.pioneer.module.tSysOptLog.service.TSysOptLogService;
import com.wellsys.pioneer.module.tSysUser.model.TSysUserModel;
import com.wellsys.pioneer.module.tSysUser.service.TSysUserService;

/**
* 数据访问层接口。
* TABLE CODE:	t_sys_user;
* TABLE NAME:	
* TABLE REMARK:	用户信息
* code tools version V1.0,created on Fri Dec 02 11:48:36 CST 2016
*/

@Controller
@RequestMapping("/tSysUser")
public class TSysUserAction {
	@Autowired
	private TSysUserService tSysUserService ;
	@Autowired
	private TSysOptLogService tSysOptLogService;
//	@Autowired
//	private LogService logService;
	@Autowired
	private  HttpServletRequest request;

	/**
	 * 新增  （ 用户信息）
	 * @param item 数据内容。
	 * @param response http response
	 * @throws IOException 异常信息
	 * */
	@RequestMapping("/add")
	public void addBean( TSysUserModel  item,String roleids, HttpServletResponse response,HttpSession session) throws IOException{
		try {

			//添加UUID主键,如果不用UUID,自行修改
    		item.setUserId(CreateUUID.createUUID());
    		item.getSysPassword();
			//密码进行Md5加密
    		item.setSysPassword(MD5Tool.encodeByMD5(item.getSysPassword()));
    		item.setStatus("1");
    		item.setLogErrorCount(0);
    		Timestamp date = new Timestamp(System.currentTimeMillis()); 
    		item.setCreateTime(date);
    		item.setLastLogTime(date);
			tSysUserService.save(item, roleids);
			
			//添加到日志
			LoginObj loginObj = (LoginObj) session.getAttribute("login");
			tSysOptLogService.saveLog(loginObj,"1","新增用户");
 			ActionUtil.addLog(request,0, "add","tSysUser" ,true,"");
			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_save_suc")),null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "add","tSysUser" ,false,e.getMessage());

			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}
	/**
	 * 根据id获取需要的数据对象
	 * @throws IOException 
	 * */
	@RequestMapping(value="/getBeanById")
	public void getBeanById(TSysUserModel  item,
			HttpServletResponse response) throws IOException{
		try {
		TSysUserModel  tSysUserModel = tSysUserService.getBeanById(item);
			ActionUtil.addLog(request,0, "getBeanById","tSysUser" ,true,"");
			JsonUtils.printJSONByObj(response, tSysUserModel, null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "getBeanById","tSysUser" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}
	
	/**
	 * 
	 *<p>Title:  getUserInfoById</p> 
	 *<p>Description: 获取登录者用户信息 用于信息填报前台页面显示</p>
	 * @author rlk
	 * @date 2016-12-21 下午7:59:44
	 *
	 */
	@RequestMapping(value="/getUserInfoById")
	public void getUserInfoById(HttpServletResponse response) throws IOException{
		try {
			LoginObj obj = (LoginObj)request.getSession().getAttribute("login");
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("userId", obj.getUserid());
			Map<String,Object> userMap = tSysUserService.getUserInfoById(map);
			ActionUtil.addLog(request,0, "getBeanById","tSysUser" ,true,"");
			JsonUtils.printJSONByObj(response, userMap, null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "getBeanById","tSysUser" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}

	@RequestMapping(value="/getBeanMapById/")
	public void getBeanMapById(TSysUserModel  item,
		HttpServletResponse response) throws IOException{
		try {
			Map object = tSysUserService.getBeanMapById(item);
			ActionUtil.addLog(request,0, "getBeanMapById","tSysUser" ,true,"");
			JsonUtils.printJSONByObj(response, object, null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "getBeanMapById","tSysUser" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}

	 /**
     * 查找用户信息
     * @param response
     */
    @RequestMapping(value="/findUserInfo")
    public void findUserInfo(HttpServletResponse response){
    	try {
    	HttpSession session = request.getSession(); 
    	LoginObj loginObj = (LoginObj) session.getAttribute("login");
    	String userId = loginObj.getUserid();
    	TSysUserModel t = new TSysUserModel();
    	t.setUserId(userId);
    	Map object = tSysUserService.getBeanMapById(t);
		JsonUtils.printJSONByObj(response, object, null);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
    
	/**
	 * 修改信息
	 * @param tSysUserModel  tSysUserModel 数据内容。
	 * @throws IOException 
	 * */
	@RequestMapping("/edit")
	public void update(TSysUserModel  tSysUserModel,String roleids,
			HttpServletResponse response,HttpSession session) throws IOException{

		try {
			String sysPassword = tSysUserModel.getSysPassword();
			if (!"".equals(sysPassword) && sysPassword!=null) {
				//密码进行Md5加密
				tSysUserModel.setSysPassword(MD5Tool.encodeByMD5(sysPassword));
			}else {
				tSysUserModel.setSysPassword(null);
			}
			tSysUserService.update(tSysUserModel,roleids);
			ActionUtil.addLog(request,0, "update","tSysUser" ,true,"");
			//添加到日志
			LoginObj loginObj = (LoginObj) session.getAttribute("login");
			tSysOptLogService.saveLog(loginObj,"3","修改用户");
			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_edit_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "update","tSysUser" ,false,e.getMessage());
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
			TSysUserModel[] items= mapper.readValue(data, TSysUserModel[].class);

			tSysUserService.delete(items);
			//添加到日志
			LoginObj loginObj = (LoginObj) session.getAttribute("login");
			tSysOptLogService.saveLog(loginObj,"2","删除用户");
			ActionUtil.addLog(request,0, "delete","tSysUser" ,true,"");
			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_del_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "delete","tSysUser" ,false,e.getMessage());
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
			if(Util.isNotBlank(param.get("userName"))){
				param.put("userName", "'%"+param.get("userName").toString().trim()+"%'");
			}
			@SuppressWarnings("unchecked")
			List list = tSysUserService.listMap(pageBounds, param);

			PageModel page2 = new PageModel();
			page2.setRows(list);
			int total  = 0;
			try{
				List list2 =tSysUserService.getTotal(param);
				total = Integer.parseInt(JSONArray.fromObject(list2).getJSONObject(0).getString("CNT"));
			}catch(Exception e){
				e.getStackTrace();
			}
			page2.setTotal(total);
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
			List list =  tSysUserService.listMap( param);

			JsonUtils.printJSONByObj(response, list, null);
	} catch (Exception e) {
		e.printStackTrace();
	}
}

	/**
	 *  	账号 开启/停用
	 */
	@RequestMapping(value="/updateStatus")
	public void updateStatus(HttpServletResponse response) throws IOException{
		try {
			TSysUserModel newObj = new TSysUserModel();
			TSysUserModel oldObj =new TSysUserModel();
			@SuppressWarnings("unchecked")
			Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
			tSysUserService.updateStatus(param);
			ActionUtil.addLog(request,0, "update","tSysUser" ,true,"");
			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage(" 操作成功")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "update","tSysUser" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("操作失败")), null);
			e.printStackTrace();
		}
		
	}
	
	 /**
     * 修改密码
     */
    @SuppressWarnings("unchecked")
	@RequestMapping(value="/updatePassword")
    public void updatePassword(HttpServletResponse response){
    	try {
    		@SuppressWarnings("unchecked")
			Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
    		TSysUserModel t = new TSysUserModel();
    		LoginObj obj = (LoginObj)request.getSession().getAttribute("login");
        	t.setUserId(obj.getUserid().toString());
        	Map object = tSysUserService.getBeanMapById(t);
        	if(!MD5Tool.encodeByMD5(param.get("oldPassword").toString()).equals(object.get("sysPassword").toString())){
        		JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("原密码输入有误")), null);
        		return;
        	}
    		if( !param.get("newPassword").equals( param.get("newPassword1"))){
    			
    			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("密码不一致")), null);
    		}else{
    			String password = MD5Tool.encodeByMD5(param.get("newPassword").toString());
    			Map map = new HashMap();
    			map.put("sysPassword", password);
    			map.put("userId", obj.getUserid().toString());
    			tSysUserService.updatePassword(map);
    			
				JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("修改成功")), null);
    		}
				} catch (IOException e) {
					e.printStackTrace();
    		}
	}
    
    @RequestMapping(value="/updateUserInfo")
    public void updateUserInfo(HttpServletResponse response){
    	try {
    		@SuppressWarnings("unchecked")
			Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
        	
        	LoginObj obj = (LoginObj)request.getSession().getAttribute("login");
			String userTel =  param.get("userTel").toString();
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("userTel", userTel);
			map.put("id", obj.getUserid());
    		tSysUserService.updateUserInfo(map);
				JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("修改成功")), null);
			} catch (IOException e) {
					e.printStackTrace();
				}
	}
    
	/**
	 * 校验手机号码
	 * */
	@SuppressWarnings("all")
	@RequestMapping(value="/checkMobile")
	public void checkMobile(HttpServletResponse response){
		try {
			boolean result = false;
			Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
			List list = tSysUserService.listMap(param);
			if (list.size()>0) {
				result=true;
			}else {
				result=false;
			}
			JsonUtils.printJSONByObj(response, result, null);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	/*
	 * 组织机构树
	 * 
	 */
	@RequestMapping("/getOrgTree")
	public void getGroupTree(HttpServletResponse response) throws IOException{
		JsonUtils.printJson(tSysUserService.getOrgTree(), response);
	}
}
