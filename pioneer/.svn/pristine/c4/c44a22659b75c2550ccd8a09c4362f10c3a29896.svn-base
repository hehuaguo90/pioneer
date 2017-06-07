package com.wellsys.pioneer.module.tSysCustomArea.dao;


import java.util.Map;
import java.util.List;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.wellsys.pioneer.module.tSysCustomArea.model.TSysCustomAreaModel;

/**
* 数据库访问接口。
* TABLE CODE:	t_sys_custom_area;
* TABLE NAME:	
* TABLE REMARK:	功能区信息
* code tools version V1.0,created on Fri Dec 02 11:48:34 CST 2016
*/
@Service
@Transactional
public interface TSysCustomAreaDao {


	TSysCustomAreaModel getBeanById(TSysCustomAreaModel item);

 	Map getBeanMapById(TSysCustomAreaModel item);

	int save(TSysCustomAreaModel data);

	int delete(TSysCustomAreaModel item);

	int update(TSysCustomAreaModel item);

	List listMap(PageBounds page, Map<String, Object> params);

 	List listMap(Map<String, Object> params);

	List listBean(PageBounds page, Map<String, Object> params);

    List listBean(Map<String, Object> params);



}
