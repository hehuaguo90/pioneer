package com.wellsys.pioneer.module.tSysJxs.dao;


import java.util.Map;
import java.util.List;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.wellsys.pioneer.module.tSysJxs.model.TSysJxsModel;

/**
* 数据库访问接口。
* TABLE CODE:	t_sys_db_record;
* TABLE NAME:	
* TABLE REMARK:	数据库操作记录
* code tools version V1.0,created on Fri Dec 23 14:20:58 CST 2016
*/
@Service
@Transactional
public interface TSysJxsDao {


	TSysJxsModel getBeanById(TSysJxsModel item);

 	Map getBeanMapById(TSysJxsModel item);

	int save(TSysJxsModel data);

	int delete(TSysJxsModel item);

	int update(TSysJxsModel item);

	List listMap(PageBounds page, Map<String, Object> params);

 	List listMap(Map<String, Object> params);

	List listBean(PageBounds page, Map<String, Object> params);

    List listBean(Map<String, Object> params);



}
