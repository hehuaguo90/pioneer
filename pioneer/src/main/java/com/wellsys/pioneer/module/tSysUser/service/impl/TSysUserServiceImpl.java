package com.wellsys.pioneer.module.tSysUser.service.impl;

import javax.annotation.Resource;

import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.wellsys.common.utils.CreateUUID;
import com.wellsys.common.utils.TreeModel;
import com.wellsys.pioneer.module.tSysRole.dao.TSysRoleDao;
import com.wellsys.pioneer.module.tSysRole.model.TSysRoleModel;
import com.wellsys.pioneer.module.tSysUserRole.dao.TSysUserRoleDao;
import com.wellsys.pioneer.module.tSysUserRole.model.TSysUserRoleModel;
import com.wellsys.pioneer.module.tSysUser.service.TSysUserService;
import com.wellsys.pioneer.module.tSysUser.dao.TSysUserDao;
import com.wellsys.pioneer.module.tSysUser.model.TSysUserModel;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;

import org.springframework.transaction.annotation.Transactional;

/**
* 数据服务层接口实现。
* TABLE CODE:	t_sys_user;
* TABLE NAME:	
* TABLE REMARK:	用户信息
* code tools version V1.0,created on Fri Dec 02 11:48:36 CST 2016
*/
@Service(value="TSysUserServiceImpl")
@Scope("prototype")
public class TSysUserServiceImpl implements TSysUserService{
    @Autowired
    private TSysUserDao tSysUserDao;
    @Autowired
    private TSysUserRoleDao tSysUserRoleDao;
    @Autowired
    private TSysRoleDao tSysRoleDao;

    Logger log4j = Logger.getLogger(TSysUserServiceImpl.class);

    public List listBean(PageBounds page, Map    <String, Object> params)
    {
        return tSysUserDao.listBean(page,params);
    }

    public List listBean(Map<String, Object> params)
    {
        return tSysUserDao.listBean(params);
    }
    public List listMap(PageBounds page, Map<String, Object> params) {
    	params.put("firstIndex", page.getPage()*page.getLimit()-page.getLimit());
    	params.put("lastIndex", page.getPage()*page.getLimit());
        return tSysUserDao.listPage(params);

    }
    public List getTotal(Map<String, Object> params) {

        return tSysUserDao.getTotal(params);

    }
    public List listMap(Map<String, Object> params) {

        return tSysUserDao.listMap(params);

    }

    public int save(TSysUserModel o,String roleids) {
    	String[] ids = roleids.split(",");
		for(String id : ids){
			if (!"".equals(id) && id!=null) {
				TSysUserRoleModel userRole = new TSysUserRoleModel();
				userRole.setUserRoleId(CreateUUID.createUUID());
				userRole.setRoleId(id);
				userRole.setUserId(o.getUserId());
				tSysUserRoleDao.save(userRole);
			}
		}
        return tSysUserDao.save(o);

    }

 

    @SuppressWarnings("all")
	public Map getBeanMapById(TSysUserModel o)
    {
    	Map map = tSysUserDao.getBeanMapById(o);
    	Map<String, Object> params = new HashMap<String, Object>();
    	params.put("userId", o.getUserId());
    	List<TSysUserRoleModel> list = tSysUserRoleDao.listBean(params);
    	
    	List<String> ids = new ArrayList<String>();
    	List<String> names = new ArrayList<String>();
    	for(TSysUserRoleModel m : list){
    		ids.add(m.getRoleId());
    		
    		TSysRoleModel p = new TSysRoleModel();
    		p.setRoleId(m.getRoleId());
    		TSysRoleModel rm = tSysRoleDao.getBeanById(p);
    		names.add(rm.getRoleName());
    	}
    	if (ids.size()>0 && names.size()>0) {
        	map.put("roleids", StringUtils.join(ids, ","));
        	map.put("roleNames", StringUtils.join(names, ","));
        	
		}
      //  return tSysUserDao.getBeanMapById(o);
    	return map;
    }

    public TSysUserModel getBeanById(TSysUserModel o) {


        return tSysUserDao.getBeanById(o);

    }
    
    @Override
    public Map<String, Object> getUserInfoById(Map<String, Object> params) {
    	 
    	return tSysUserDao.getUserInfoById(params);
    }

    public boolean update(TSysUserModel o,String roleids) {
    	String userid = o.getUserId();
    	TSysUserRoleModel ur = new TSysUserRoleModel();
    	ur.setUserId(userid);
    	int i = tSysUserRoleDao.delete(ur);
    	
    	String[] ids = roleids.trim().split(",");
    	for(String id : ids){
			TSysUserRoleModel userRole = new TSysUserRoleModel();
			userRole.setUserRoleId(CreateUUID.createUUID());
			userRole.setRoleId(id);
			userRole.setUserId(userid);
			tSysUserRoleDao.save(userRole);
		}
    	
        tSysUserDao.update(o);

        return true;
    }

    public boolean delete(TSysUserModel[] items) {
        for(int i=0;items!=null&&i<items.length;i++){
        	 tSysUserDao.delete(items[i]);
        	 //删除关联表数据
        	 TSysUserRoleModel userRole = new TSysUserRoleModel();
        	 userRole.setUserId(items[i].getUserId());
        	 tSysUserRoleDao.delete(userRole);
        }
        return true;
    }
    /**
     * 账号  开启/停用
     */

	@Override
	public boolean updateStatus(Map params) {

		String id = params.get("id").toString();
		String[] ids = id.split(",");
		for (int i = 0; i < ids.length; i++) {
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("id", ids[i]);
			param.put("status", params.get("status"));
			param.put("loginErrorCount", params.get("loginErrorCount"));
			tSysUserDao.updateStatus(param);
		}		
		return true;
	    }
	
@Override
public boolean updatePassword(Map<String, Object> params) {
	int a = tSysUserDao.updatePassword(params);
	return true;
}

@Override
public boolean updateUserInfo(Map<String, Object> params) {
	tSysUserDao.updateUserInfo(params);
	return true;
}

@Override
public String getOrgTree() {
		JSONArray tree = new JSONArray();
		Map<String, Object> params = new HashMap<String, Object>();
		List<Map<String, Object>> list = tSysUserDao.orgListMap(params);
		if (list == null ) {
			tree.toString();
		}
		getTree(list, "0", tree);
		return tree.toString();
	}
//树形结构
private JSONArray getTree(List<Map<String, Object>> arealist, String pid, JSONArray tree) {
	for (Map<String, Object> p : arealist) {
		if (pid.equals(p.get("pid"))) {
			String id = p.get("id").toString();
			JSONObject pt = new JSONObject();
			pt.put("id", id);
			pt.put("text", p.get("name"));
			
			JSONArray arr = new JSONArray();
			getTree(arealist, id, arr);//递归查询子节点
			if(!arr.isEmpty()){
				pt.put("children", arr);
			}
			
			tree.add(pt);
		}

	}
	return tree;
} 
}
