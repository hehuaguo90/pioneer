package com.wellsys.pioneer.module.tSysJxs.service.impl;

import javax.annotation.Resource;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.wellsys.common.utils.TreeModel;
import com.wellsys.pioneer.module.tSysJxs.dao.TSysJxsDao;
import com.wellsys.pioneer.module.tSysJxs.model.TSysJxsModel;
import com.wellsys.pioneer.module.tSysJxs.service.TSysJxsService;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import org.springframework.transaction.annotation.Transactional;

/**
* 数据服务层接口实现。
* TABLE CODE:	t_sys_db_record;
* TABLE NAME:	
* TABLE REMARK:	数据库操作记录
* code tools version V1.0,created on Fri Dec 23 14:20:58 CST 2016
*/
@Service(value="TSysJxsServiceImpl")
@Scope("prototype")
public class TSysJxsServiceImpl implements TSysJxsService{
    @Autowired
    private TSysJxsDao tSysJxsDao;

    Logger log4j = Logger.getLogger(TSysJxsServiceImpl.class);

    public List listBean(PageBounds page, Map    <String, Object> params)
    {
        return tSysJxsDao.listBean(page,params);
    }

    public List listBean(Map<String, Object> params)
    {
        return tSysJxsDao.listBean(params);
    }
    public List listMap(PageBounds page, Map<String, Object> params) {

        return tSysJxsDao.listMap(page,params);

    }
    public List listMap(Map<String, Object> params) {

        return tSysJxsDao.listMap(params);

    }

    public int save(TSysJxsModel o) {

        return tSysJxsDao.save(o);

    }

    @Transactional("dbTransaction")
    public int save(List<TSysJxsModel> list) {

        for (TSysJxsModel item : list)
        save(item);
        return list.size();
    }

    public Map getBeanMapById(TSysJxsModel o)
    {
        return tSysJxsDao.getBeanMapById(o);
    }

    public TSysJxsModel getBeanById(TSysJxsModel o) {


        return tSysJxsDao.getBeanById(o);

    }

    public boolean update(TSysJxsModel o) {
        tSysJxsDao.update(o);

        return true;
    }

    public boolean delete(TSysJxsModel[] items) {
        for(int i=0;items!=null&&i
        <items.length;i++)
        tSysJxsDao.delete(items[i]);
        return true;
    }
}
