package com.wellsys.pioneer.module.tBaseYc.service.impl;

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
import com.wellsys.pioneer.module.tBaseYc.dao.TBaseYcDao;
import com.wellsys.pioneer.module.tBaseYc.model.TBaseYcModel;
import com.wellsys.pioneer.module.tBaseYc.service.TBaseYcService;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import org.springframework.transaction.annotation.Transactional;

/**
* 数据服务层接口实现。
* TABLE CODE:	t_sys_db_record;
* TABLE NAME:	
* TABLE REMARK:	数据库操作记录
* code tools version V1.0,created on Fri Dec 23 14:20:58 CST 2016
*/
@Service(value="TBaseYcServiceImpl")
@Scope("prototype")
public class TBaseYcServiceImpl implements TBaseYcService{
    @Autowired
    private TBaseYcDao tBaseYcDao;

    Logger log4j = Logger.getLogger(TBaseYcServiceImpl.class);

    public List listBean(PageBounds page, Map    <String, Object> params)
    {
        return tBaseYcDao.listBean(page,params);
    }

    public List listBean(Map<String, Object> params)
    {
        return tBaseYcDao.listBean(params);
    }
    public List listMap(PageBounds page, Map<String, Object> params) {

        return tBaseYcDao.listMap(page,params);

    }
    public List listMap(Map<String, Object> params) {

        return tBaseYcDao.listMap(params);

    }

    public int save(TBaseYcModel o) {

        return tBaseYcDao.save(o);

    }

    @Transactional("dbTransaction")
    public int save(List<TBaseYcModel> list) {

        for (TBaseYcModel item : list)
        save(item);
        return list.size();
    }

    public Map getBeanMapById(TBaseYcModel o)
    {
        return tBaseYcDao.getBeanMapById(o);
    }

    public TBaseYcModel getBeanById(TBaseYcModel o) {


        return tBaseYcDao.getBeanById(o);

    }

    public boolean update(TBaseYcModel o) {
        tBaseYcDao.update(o);

        return true;
    }

    public boolean delete(TBaseYcModel[] items) {
        for(int i=0;items!=null&&i
        <items.length;i++)
        tBaseYcDao.delete(items[i]);
        return true;
    }
}
