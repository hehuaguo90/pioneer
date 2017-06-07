package com.wellsys.pioneer.module.tSysDbRecord.service.impl;

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

import com.wellsys.pioneer.module.tSysDbRecord.service.TSysDbRecordService;
import com.wellsys.pioneer.module.tSysDbRecord.dao.TSysDbRecordDao;
import com.wellsys.pioneer.module.tSysDbRecord.model.TSysDbRecordModel;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import org.springframework.transaction.annotation.Transactional;

/**
* 数据服务层接口实现。
* TABLE CODE:	t_sys_db_record;
* TABLE NAME:	
* TABLE REMARK:	数据库操作记录
* code tools version V1.0,created on Fri Dec 23 14:20:58 CST 2016
*/
@Service(value="TSysDbRecordServiceImpl")
@Scope("prototype")
public class TSysDbRecordServiceImpl implements TSysDbRecordService{
    @Autowired
    private TSysDbRecordDao tSysDbRecordDao;

    Logger log4j = Logger.getLogger(TSysDbRecordServiceImpl.class);

    public List listBean(PageBounds page, Map    <String, Object> params)
    {
        return tSysDbRecordDao.listBean(page,params);
    }

    public List listBean(Map<String, Object> params)
    {
        return tSysDbRecordDao.listBean(params);
    }
    public List listMap(PageBounds page, Map<String, Object> params) {

        return tSysDbRecordDao.listMap(page,params);

    }
    public List listMap(Map<String, Object> params) {

        return tSysDbRecordDao.listMap(params);

    }

    public int save(TSysDbRecordModel o) {

        return tSysDbRecordDao.save(o);

    }

    @Transactional("dbTransaction")
    public int save(List<TSysDbRecordModel> list) {

        for (TSysDbRecordModel item : list)
        save(item);
        return list.size();
    }

    public Map getBeanMapById(TSysDbRecordModel o)
    {
        return tSysDbRecordDao.getBeanMapById(o);
    }

    public TSysDbRecordModel getBeanById(TSysDbRecordModel o) {


        return tSysDbRecordDao.getBeanById(o);

    }

    public boolean update(TSysDbRecordModel o) {
        tSysDbRecordDao.update(o);

        return true;
    }

    public boolean delete(TSysDbRecordModel[] items) {
        for(int i=0;items!=null&&i
        <items.length;i++)
        tSysDbRecordDao.delete(items[i]);
        return true;
    }
}
