package com.wellsys.pioneer.module.tSysYj.service.impl;

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
import com.wellsys.pioneer.module.tSysYj.dao.TSysYjDao;
import com.wellsys.pioneer.module.tSysYj.model.TSysYjModel;
import com.wellsys.pioneer.module.tSysYj.service.TSysYjService;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import org.springframework.transaction.annotation.Transactional;

/**
* 数据服务层接口实现。
* TABLE CODE:	t_sys_db_record;
* TABLE NAME:	
* TABLE REMARK:	数据库操作记录
* code tools version V1.0,created on Fri Dec 23 14:20:58 CST 2016
*/
@Service(value="TSysYjServiceImpl")
@Scope("prototype")
public class TSysYjServiceImpl implements TSysYjService{
    @Autowired
    private TSysYjDao tSysYjDao;

    Logger log4j = Logger.getLogger(TSysYjServiceImpl.class);

    public List listBean(PageBounds page, Map    <String, Object> params)
    {
        return tSysYjDao.listBean(page,params);
    }

    public List listBean(Map<String, Object> params)
    {
        return tSysYjDao.listBean(params);
    }
    public List listMap(PageBounds page, Map<String, Object> params) {

        return tSysYjDao.listMap(page,params);

    }
    public List listMap(Map<String, Object> params) {

        return tSysYjDao.listMap(params);

    }

    public int save(TSysYjModel o) {

        return tSysYjDao.save(o);

    }

    @Transactional("dbTransaction")
    public int save(List<TSysYjModel> list) {

        for (TSysYjModel item : list)
        save(item);
        return list.size();
    }

    public Map getBeanMapById(TSysYjModel o)
    {
        return tSysYjDao.getBeanMapById(o);
    }

    public TSysYjModel getBeanById(TSysYjModel o) {


        return tSysYjDao.getBeanById(o);

    }

    public boolean update(TSysYjModel o) {
        tSysYjDao.update(o);

        return true;
    }

    public boolean delete(TSysYjModel[] items) {
        for(int i=0;items!=null&&i
        <items.length;i++)
        tSysYjDao.delete(items[i]);
        return true;
    }
}
