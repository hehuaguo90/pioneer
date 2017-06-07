package com.wellsys.pioneer.module.tSysOrg.dao;


import java.util.Map;
import java.util.List;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.wellsys.pioneer.module.tSysOrg.model.TSysOrgModel;

/**
* 数据库访问接口。
* TABLE CODE:	t_sys_org;
* TABLE NAME:	
* TABLE REMARK:	机构信息
* code tools version V1.0,created on Tue Jan 03 18:53:49 CST 2017
*/
@Service
@Transactional
public interface TSysOrgDao {


	TSysOrgModel getBeanById(TSysOrgModel item);

 	Map getBeanMapById(TSysOrgModel item);

	int save(TSysOrgModel data);

	int delete(TSysOrgModel item);

	int update(TSysOrgModel item);

	List listMap(PageBounds page, Map<String, Object> params);

 	List listMap(Map<String, Object> params);

	List listBean(PageBounds page, Map<String, Object> params);

    List listBean(Map<String, Object> params);

    List listOrgComp(Map<String, Object> params);

    List listOrg(Map<String, Object> params);
    
    public int hasChildOrg(String pid);
    
    public int hasChildComp(String pid);
    
    public int hasChildUser(String pid);
}