package com.wellsys.pioneer.module.tSysSy.service.impl;


import java.util.Map;
import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.wellsys.pioneer.module.tSysSy.dao.TSysSyDao;
import com.wellsys.pioneer.module.tSysSy.service.TSysSyService;


/**
* 数据服务层接口实现。
* TABLE CODE:	t_sys_db_record;
* TABLE NAME:	
* TABLE REMARK:	数据库操作记录
* code tools version V1.0,created on Fri Dec 23 14:20:58 CST 2016
*/
@Service(value="TSysSyServiceImpl")
@Scope("prototype")
public class TSysSyServiceImpl implements TSysSyService{
    @Autowired
    private TSysSyDao tSysSyDao;

    Logger log4j = Logger.getLogger(TSysSyServiceImpl.class);

    
 
    public List listMap(Map<String, Object> params) {

        return tSysSyDao.listMap(params);

    }



	@Override
	public List listStateSy(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return tSysSyDao.listStateSy(params);
	}



	@Override
	public List listAreaMap(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return tSysSyDao.listAreaMap(params);
	}



	@Override
	public List listJxxlMap(PageBounds page, Map<String, Object> params) {
		// TODO Auto-generated method stub
		return tSysSyDao.listJxxlMap(page,params);
	}



	@Override
	public List listJxsMap(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return tSysSyDao.listJxsMap(params);
	}



	@Override
	public List listYjMap(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return tSysSyDao.listYjMap(params);
	}

    
}
