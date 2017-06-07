package com.wellsys.pioneer.module.tLoginObj.dao;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.wellsys.pioneer.module.tSysRight.model.TSysRightModel;
import com.wellsys.pioneer.module.tSysUser.model.TSysUserModel;
@Service
@Transactional
public interface TLoginObjDao {
	
	/**
	 * 登陆验证
	 * @param sysAccount
	 * @return
	 */
	List<TSysUserModel> listMap(Map<String, Object> params);
	/**
	 * 获得用户的权限列表
	 * @param userId
	 * @return
	 */
	List<TSysRightModel> getSysRight(Map<String, Object> params);
	
	/**
	 * 修改用户最后登录时间
	 */
	int updateUserLastLoginTime(Map<String, Object> params);
	
	/**
	 * 获取用户角色名称
	 */
	List findRoleName(Map<String, Object> params);
	
	/**
	 * 获取登录权限的url
	 */
	List findRightUrl(Map<String, Object> params);
	
	/**
	 * 获取地区和流程步骤信息
	 * @param params
	 * @return
	 */
	Map<String, Object> getUserMsg(Map<String, Object> params);
}
