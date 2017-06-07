package com.wellsys.pioneer.module.tLoginObj.service;

import java.util.List;
import java.util.Map;

import com.wellsys.pioneer.module.tSysRight.model.TSysRightModel;
import com.wellsys.pioneer.module.tSysUser.model.TSysUserModel;

public interface TLoginObjService {
	/**
	 * 登陆验证
	 * @param sysAccount
	 * @return
	 */
	public List<TSysUserModel> checkLogin(Map<String, Object> params);
	
	/**
	 * 获得用户的权限列表
	 * @param userId
	 * @return
	 */
	public List<TSysRightModel> getSysRight(Map<String, Object> params);
	/**
	 * 修改用户最后登录时间
	 * @param params
	 */
	public void updateUserLastLoginTime(Map<String, Object> params);
	/**
	 * 获取用户角色名称
	 */
	public List findRoleName(Map<String, Object> params);
	
	public List findRightUrl(Map<String, Object> params);
	
	/**
	 * 获取地区和流程步骤信息
	 * @param params
	 * @return
	 */
	Map<String, Object> getUserMsg(Map<String, Object> params);
}
