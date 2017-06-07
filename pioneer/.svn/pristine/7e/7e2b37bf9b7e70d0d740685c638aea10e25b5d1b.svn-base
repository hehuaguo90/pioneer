package com.wellsys.pioneer.module.tSysAreaUnite.dao;


import java.util.Map;
import java.util.List;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.wellsys.pioneer.module.tSysAreaUnite.model.TSysAreaUniteModel;

/**
* 数据库访问接口。
* TABLE CODE:	t_sys_area_unite;
* TABLE NAME:	
* TABLE REMARK:	功能区域关联表
* code tools version V1.0,created on Fri Dec 02 11:48:34 CST 2016
*/
@Service
@Transactional
public interface TSysAreaUniteDao {


	TSysAreaUniteModel getBeanById(TSysAreaUniteModel item);

 	Map getBeanMapById(TSysAreaUniteModel item);

	int save(TSysAreaUniteModel data);

	int delete(TSysAreaUniteModel item);
	int deleteByCareaId(String careaId);
	
	int update(TSysAreaUniteModel item);

	List listMap(PageBounds page, Map<String, Object> params);

 	List listMap(Map<String, Object> params);

	List listBean(PageBounds page, Map<String, Object> params);

    List listBean(Map<String, Object> params);



}
