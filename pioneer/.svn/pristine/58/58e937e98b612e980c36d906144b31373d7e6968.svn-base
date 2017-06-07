package com.wellsys.pioneer.module.tLoginObj.action;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.wellsys.common.utils.ActionUtil;
import com.wellsys.common.utils.Constant;
import com.wellsys.common.utils.JsonUtils;
import com.wellsys.common.utils.MD5Tool;
import com.wellsys.common.utils.System_ConfigUtil;
import com.wellsys.pioneer.module.tLoginObj.model.LoginObj;
import com.wellsys.pioneer.module.tLoginObj.service.TLoginObjService;
import com.wellsys.pioneer.module.tSysOptLog.service.impl.TSysOptLogServiceImpl;
import com.wellsys.pioneer.module.tSysRight.model.TSysRightModel;
import com.wellsys.pioneer.module.tSysUser.model.TSysUserModel;

import freemarker.template.utility.StringUtil;
@Controller
@RequestMapping("/tLoginObjAction")
public class tLoginObjAction {
	
	 @Autowired
	 private TLoginObjService tLoginObjService ;
	 private String sysAccount;
	 private String sysPassword;
	 @Autowired
	 private  HttpServletRequest request;
	 @Autowired
	 private  TSysOptLogServiceImpl logService;
	 private String opObject = "用户登录";
	 
	 //private static String SYPT = "0";//所有平台类型的权限分类标识
	 /**
	  * 用户登录
	  * @param request
	  * @param response
	  * @param model
	  * @return
	  * @throws IOException
	  */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/userLogin")
	public String userLogin( HttpServletRequest request,
			HttpServletResponse response, Model model) throws IOException{
		Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
		/*
		HttpSession session = request.getSession(false); 
		if(session != null){
	         session.invalidate();
	         Cookie cookie = request.getCookies()[0];
	         cookie.setMaxAge(0);
		}
		*/
		Object loginType = param.get("loginType");
		String returnType = "login";
		
		if(Constant.LOGIN_WEB.equals(loginType)){
			returnType = "login";
		}
		
		//手机填报平台
		if(Constant.LOGIN_CONSOLE.equals(loginType)){
			returnType = "loginFP";
		}
		
		//手机图表
		if(Constant.LOGIN_CHART_ME.equals(loginType)){
			returnType = "loginCP";
		}
		
		HttpSession session = request.getSession(true);
		String IpAddress = this.getIpAddr(request);
		
		if(param.get("account") == null || param.get("account").toString().equals("")){
			model.addAttribute("message","用户名不能为空！");
			return returnType;
		}
		
		if(param.get("password") == null || param.get("password").toString().equals("")){
			model.addAttribute("message","密码不能为空！");
			return returnType;
		}
		
		sysPassword = param.get("password").toString();
		sysAccount = param.get("account").toString();
		
		Object vCode = session.getAttribute("validateCodeImage");
		Object validateCode = param.get("validateCode");
		
		if(Constant.LOGIN_WEB.equals(loginType)){
			if(vCode == null || vCode.toString().equals("") || validateCode == null || validateCode.toString().equals("")){
				model.addAttribute("message","验证码不能为空！");
				session.removeAttribute("validateCodeImage");
				model.addAttribute("account", sysAccount);
				model.addAttribute("password", sysPassword);
				return returnType;
			}
			
			if(!vCode.toString().equalsIgnoreCase(validateCode.toString())){
				model.addAttribute("message","验证码错误！");
				session.removeAttribute("validateCodeImage");
				model.addAttribute("account", sysAccount);
				model.addAttribute("password", sysPassword);
				return returnType;
			}
		}
		
		session.removeAttribute("validateCodeImage");
		List<TSysUserModel> list = tLoginObjService.checkLogin(param);
		
		if ((list == null) || (list.size() == 0)) {
			model.addAttribute("message","用户名不存在！");
			return returnType;
		}
		
		TSysUserModel userObj = (TSysUserModel)list.get(0);
		if (!userObj.getSysPassword().equals(MD5Tool.encodeByMD5(sysPassword))) {
			model.addAttribute("account", sysAccount);
			model.addAttribute("password", sysPassword);
			model.addAttribute("message","用户名或密码错误！");
			return returnType;
		}
		
		if ("0".equals(userObj.getStatus())) {
			model.addAttribute("account", sysAccount);
			model.addAttribute("password", sysPassword);
			model.addAttribute("message","该账号已被锁定！");
			return returnType;
		}
		
		if ("2".equals(userObj.getStatus())) {
			model.addAttribute("account", sysAccount);
			model.addAttribute("password", sysPassword);
			model.addAttribute("message","该账号已被删除！");
			return returnType;
		}
		
		request.getSession().setAttribute("gesUrl", System_ConfigUtil.getProperty("ges_url"));
		
		LoginObj loginObj = new LoginObj();
		loginObj.setUsername(userObj.getUserName());
		loginObj.setSysAccount(userObj.getSysAccount());
		loginObj.setUserid(userObj.getUserId());
		loginObj.setIpAddress(IpAddress);
		Map userMap = new HashMap();
		userMap.put("userid", userObj.getUserId());
		List<TSysRightModel> rightList = tLoginObjService.getSysRight(userMap);
		List<Map<String,Object>> rightUrl = tLoginObjService.findRightUrl(userMap);
		loginObj.setRightUrl(rightUrl);
		loginObj.setRightList(rightList);
		//获取用户角色名称
		 List<Map> roleNameList = tLoginObjService.findRoleName(userMap);
		 List<String> names = new ArrayList<String>();
		 for(Map st:roleNameList){
			 names.add(st.get("role_name").toString());
		 }
		 String roleName = StringUtils.join(names, ",");
		 loginObj.setRoleName(roleName);
		 
		 Map<String, Object> params = new HashMap<String, Object>();
		 params.put("userid", userObj.getUserId());
		 Map<String, Object> msg = tLoginObjService.getUserMsg(params);
		 if(msg != null){
			 loginObj.setAreaId(msg.get("areaId") == null ? "" : msg.get("areaId").toString());
			 loginObj.setOrgId(msg.get("orgId") == null ? "" : msg.get("orgId").toString());
			 loginObj.setAreaLevel(msg.get("areaLevel") == null ? "" : msg.get("areaLevel").toString());
			 loginObj.setStepseqId(msg.get("stepseqId") == null ? "" : msg.get("stepseqId").toString());
			 loginObj.setAreaName(msg.get("areaName") == null ? "" : msg.get("areaName").toString());
			 loginObj.setOrgName(msg.get("orgName") == null ? "" : msg.get("orgName").toString());
			 
			 if(!StringUtils.isBlank(loginObj.getAreaLevel()) || !StringUtils.isBlank(loginObj.getAreaId())){
				 if(Constant.SJ.equals(loginObj.getAreaLevel())){
					 loginObj.setAreaPrefix(loginObj.getAreaId().substring(0, 3));
					 
				 }else if(Constant.QXJ.equals(loginObj.getAreaLevel())){
					 loginObj.setAreaPrefix(loginObj.getAreaId().substring(0, 6));
					 
				 }else if(Constant.XZJ.equals(loginObj.getAreaLevel())){
					 loginObj.setAreaPrefix(loginObj.getAreaId().substring(0, 9));
				 }else{
					 loginObj.setAreaPrefix(loginObj.getAreaId());
				 }
			 }
		 }
		 
		request.getSession().setAttribute("login", loginObj);
		//最后登录时间
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = new Date();
		String time = dateFormat.format(date);
		param.put("userid", userObj.getUserId());
		param.put("lastLoginTime", Timestamp.valueOf(time));
		tLoginObjService.updateUserLastLoginTime(param);
		logService.saveLoginLog(IpAddress, sysAccount, opObject, loginObj);
		request.getSession().setAttribute("loginType", loginType);//session保存登陆入口方式
		SimpleDateFormat dfweek = new SimpleDateFormat("EEEE");
		SimpleDateFormat dfdate = new SimpleDateFormat("yyyy年MM月dd日");
		String currentTime = dfdate.format(date)+" "+dfweek.format(date);
		request.getSession().setAttribute("currentTime", currentTime);
		if(Constant.LOGIN_WEB.equals(loginType)){
			return "redirect:/pages/gd/main.jsp";
		}
		
		//后台管理
		if(Constant.LOGIN_CONSOLE.equals(loginType)){
			return "redirect:/pages/gd/main.jsp";
		}
		
		//手机图表入口
		if(Constant.LOGIN_CHART_ME.equals(loginType)){
			return "redirect:/pages/gd/main.jsp";
		}
		
		return "redirect:/pages/gd/main.jsp";
		//return "selectSys/index";
	}
	
	/**
	 * 获取当前登陆用户的权限树
	 * @param session
	 */
	@RequestMapping(value="/rightTree")
	public void rightTree(String pid, HttpSession session, HttpServletResponse response){
		LoginObj loginObj = (LoginObj) session.getAttribute("login");
		List<TSysRightModel> rightList = loginObj.getRightList();
//		List<TSysRightModel> nlist = new ArrayList<TSysRightModel>();
//		for(int i = 0; i < rightList.size(); i++){
//			TSysRightModel ml = rightList.get(i);
//			if(SYPT.equals(ml.getRightSort()) || ml.getRightSort().equals(sort)){
//				nlist.add(ml);
//			}
//		}
		JSONArray arr = buildTree(pid, pid, rightList);
		JsonUtils.printJson(arr.toString(), response);
	}
	
	private JSONArray buildTree(String rootNode, String node, List<TSysRightModel> list) {
		 JSONArray arr = new JSONArray();
    	 for(TSysRightModel item : list){
    		 if((item.getPid()).equals(node)){
    			 JSONObject obj = new JSONObject();
    			 obj.put("id", item.getRightId());
    			 obj.put("text", item.getRightName());
    			 obj.put("href", item.getRightUrl());
    			 if(rootNode.equals(node)){
    			 	 obj.put("parentId", null);
    			 }
    			 obj.put("sort", item.getShowOrder());
    			 JSONArray json = buildTree(rootNode, item.getRightId(), list);
    			 if(!json.isEmpty()){
    				 obj.put("children", buildTree(rootNode, item.getRightId(), list)); 
    			 }else{
    				 obj.put("children", null); 
    			 }
    			 arr.add(obj);
    		 }
    	 }
	    return arr;
	}
	/**
	 * 退出登录
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/logOut")
	public String logOut( HttpServletRequest request,
			HttpServletResponse response)throws IOException{
		
		HttpSession session = request.getSession(); 
		session.invalidate();
		return "login";
		
	}
	/**
	 * 获取登录用户信息
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/getLoginObj")
	public void getLoginObj( HttpServletRequest request,
			HttpServletResponse response){
		LoginObj loginObj = new LoginObj();
		loginObj = (LoginObj)request.getSession().getAttribute("login");
		try {
			JsonUtils.printJSONByObj(response, loginObj, null);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/****
	 * 
	 * @Title: getIpAddr 
	 * @Description: 获取IP地址 
	 * @param @param request
	 * @param @return
	 */
	public static String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("CLIENTIP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}
}
