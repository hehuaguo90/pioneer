package com.wellsys.pioneer.module.tSysRight.dao;


import java.util.Map;
import java.util.List;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.wellsys.pioneer.module.tSysRight.model.TSysRightModel;

/**
* 数据库访问接口。
* TABLE CODE:	t_sys_right;
* TABLE NAME:	
* TABLE REMARK:	权限信息
* code tools version V1.0,created on Fri Dec 02 11:48:35 CST 2016
*/
@Service
@Transactional
public interface TSysRightDao {


	TSysRightModel getBeanById(TSysRightModel item);

 	Map getBeanMapById(TSysRightModel item);

	int save(TSysRightModel data);

	int delete(TSysRightModel item);

	int update(TSysRightModel item);

	List listMap(PageBounds page, Map<String, Object> params);

 	List listMap(Map<String, Object> params);

	List listBean(PageBounds page, Map<String, Object> params);

    List listBean(Map<String, Object> params);



}
