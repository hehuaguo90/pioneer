package com.wellsys.pioneer.module.tSysOptLog.dao;


import java.util.Map;
import java.util.List;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.wellsys.pioneer.module.tSysOptLog.model.TSysOptLogModel;

/**
* 数据库访问接口。
* TABLE CODE:	t_sys_opt_log;
* TABLE NAME:	
* TABLE REMARK:	系统日志
* code tools version V1.0,created on Fri Dec 02 11:48:35 CST 2016
*/
@Service
@Transactional
public interface TSysOptLogDao {


	TSysOptLogModel getBeanById(TSysOptLogModel item);

 	Map getBeanMapById(TSysOptLogModel item);

	int save(TSysOptLogModel data);

	int delete(TSysOptLogModel item);

	int update(TSysOptLogModel item);

	List listMap(PageBounds page, Map<String, Object> params);

 	List listMap(Map<String, Object> params);

	List listBean(PageBounds page, Map<String, Object> params);

    List listBean(Map<String, Object> params);



}
