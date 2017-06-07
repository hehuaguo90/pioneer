package com.wellsys.pioneer.module.tSysUser.dao;


import java.util.Map;
import java.util.List;

import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.wellsys.pioneer.module.tSysUser.model.TSysUserModel;

/**
* 数据库访问接口。
* TABLE CODE:	t_sys_user;
* TABLE NAME:	
* TABLE REMARK:	用户信息
* code tools version V1.0,created on Fri Dec 02 11:48:36 CST 2016
*/
@Service
@Transactional
public interface TSysUserDao {


	TSysUserModel getBeanById(TSysUserModel item);

 	Map getBeanMapById(TSysUserModel item);
 	
 	Map getUserInfoById(Map<String, Object> params);

	int save(TSysUserModel data);

	int delete(TSysUserModel item);

	int update(TSysUserModel item);

	List listPage( Map<String, Object> params);

 	List listMap(Map<String, Object> params);

	List listBean(PageBounds page, Map<String, Object> params);

    List listBean(Map<String, Object> params);

	void updateStatus(Map<String, Object> param);
	int updatePassword(Map<String, Object> params);
	int updateUserInfo(Map<String, Object> params);

	List orgListMap(Map<String, Object> params);
	List getTotal(Map<String, Object> params);

}
