package com.wellsys.pioneer.module.tSysRole.dao;


import java.util.Map;
import java.util.List;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.wellsys.pioneer.module.tSysRole.model.TSysRoleModel;

/**
* 数据库访问接口。
* TABLE CODE:	t_sys_role;
* TABLE NAME:	
* TABLE REMARK:	角色信息
* code tools version V1.0,created on Fri Dec 02 11:48:35 CST 2016
*/
@Service
@Transactional
public interface TSysRoleDao {


	TSysRoleModel getBeanById(TSysRoleModel item);

 	Map getBeanMapById(TSysRoleModel item);

	int save(TSysRoleModel data);

	int delete(TSysRoleModel item);

	int update(TSysRoleModel item);

	List listMap(PageBounds page, Map<String, Object> params);

 	List listMap(Map<String, Object> params);

	List listBean(PageBounds page, Map<String, Object> params);

    List listBean(Map<String, Object> params);



}
