package com.wellsys.pioneer.module.tSysDict.dao;


import java.util.Map;
import java.util.List;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.wellsys.pioneer.module.tSysDict.model.TSysDictModel;

/**
* 数据库访问接口。
* TABLE CODE:	t_sys_dict;
* TABLE NAME:	
* TABLE REMARK:	数据字典表
* code tools version V1.0,created on Fri Dec 02 11:48:34 CST 2016
*/
@Service
@Transactional
public interface TSysDictDao {


	TSysDictModel getBeanById(TSysDictModel item);

 	Map getBeanMapById(TSysDictModel item);

	int save(TSysDictModel data);

	int delete(TSysDictModel item);

	int update(TSysDictModel item);

	List listMap(PageBounds page, Map<String, Object> params);

 	List listMap(Map<String, Object> params);

	List listBean(PageBounds page, Map<String, Object> params);

    List listBean(Map<String, Object> params);



}
