package com.wellsys.pioneer.module.tLoginObj.action;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

/**
 * 判断用户是否登录
 * 如果 未登录 或 session过期  
 * 页面自动跳转到登陆界面
 * @author Administrator
 *
 */
public class LoginFilter implements Filter{
	Logger visit = Logger.getLogger("visit_log");
	public void destroy(){
		// TODO Auto-generated method stub

	}

	public void doFilter(ServletRequest req, ServletResponse resp,
			FilterChain arg2) throws IOException, ServletException{
		 HttpServletRequest request = (HttpServletRequest)req;
		 HttpServletResponse response = (HttpServletResponse)resp;
		// /pages/login.jsp
		 String servletPath = request.getServletPath();
		 String[] arr = servletPath.split("/");
		 String actionName = arr[arr.length-1];
		 String message = tLoginObjAction.getIpAddr(request) + "," + servletPath;
	     visit.info(message);
	     //.jsp
	     //action   /tSysUser/export
	     
	     String regEx ="(\\/\\w+\\/\\w+)|(.+\\.jsp)";  
	     Pattern pattern = Pattern.compile(regEx);  
	     Matcher matcher = pattern.matcher(servletPath); 
	     if(matcher.matches()){
	    	 //if(actionName.length()==36){
	    	 //	 actionName = "saveAnswer.jsp";
	    	 // }
	    	 
		     if("login.jsp".equals(actionName) || "noLogin.jsp".equals(actionName) || "loginCP.jsp".equals(actionName) || "loginFP.jsp".equals(actionName) 
		         || "error.jsp".equals(actionName) || "userLogin".equals(actionName) ||"saveAnswer".equals(actionName) || "logOut".equals(actionName)){// || "userLogin".equals(actionName)
				 arg2.doFilter(request, response); 
		     }else{
				 //设为false不会自动创建session
				 HttpSession session = request.getSession();
				 if(session == null || session.getAttribute("login") == null ){
					  response.sendRedirect(request.getContextPath() + "/pages/noLogin.jsp");
					  return;
				 }else{
					  arg2.doFilter(request, response);
				 }
			 }
	     }else{
	    	 arg2.doFilter(request, response);
	     }
	     
	     /* 暂不进行地址验证
	     String regEx ="(\\/\\w+\\/\\w+)|(.+\\.jsp)";  
	     Pattern pattern = Pattern.compile(regEx);  
	     Matcher matcher = pattern.matcher(servletPath); 
	     
	     if(matcher.matches()){
	    	 if("login.jsp".equals(actionName)|| "userLogin".equals(actionName)){// || "userLogin".equals(actionName)
	    				 arg2.doFilter(request, response); 
	    	 }else{
	    				    //设为false不会自动创建session
	    					HttpSession session = request.getSession();
	    					if(session == null || session.getAttribute("login") == null ){
	    					    response.sendRedirect(request.getContextPath() + "/pages/login.jsp");
	    					    return;
	    					}else{
	    						 if("index.jsp".equals(actionName)|| "logOut".equals(actionName)|| "updatePassword.jsp".equals(actionName)|| "findUserInfo".equals(actionName)|| "updatePassword".equals(actionName)){// || "userLogin".equals(actionName)
	    		    				 arg2.doFilter(request, response); 
	    		    				 return;
	    		    	           }
	    						
	    						List<String> list = new ArrayList<String>();
	    						//如果servletPath 不在自己的权限列表里面，返回到无权操作页面
	    						List<Map>rightUrl = new ArrayList();
	    						LoginObj userObj = (LoginObj)session.getAttribute("login");
	    						rightUrl = userObj.getRightUrl();
	    						for(int i = 0;i<rightUrl.size();i++){
	    							if(rightUrl.get(i) != null){
	    								list.add(rightUrl.get(i).get("RIGHT_URL").toString());
	    							}
	    						}
	    						
	    						if(!list.contains(servletPath.substring(1))){
	    							  response.sendRedirect(request.getContextPath() + "/pages/login.jsp");
	 	    					      return;
	    						}
	    					}
	    					arg2.doFilter(request, response);
	    			 }
	     }else{
	    	 arg2.doFilter(request, response);
	     }
	     */
	     
	}
	public void init(FilterConfig arg0) throws ServletException{
		// TODO Auto-generated method stub
	}
}
