package com.wellsys.pioneer.module.tSysAreaUnite.service.impl;

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

import com.wellsys.pioneer.module.tSysAreaUnite.service.TSysAreaUniteService;
import com.wellsys.pioneer.module.tSysAreaUnite.dao.TSysAreaUniteDao;
import com.wellsys.pioneer.module.tSysAreaUnite.model.TSysAreaUniteModel;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import org.springframework.transaction.annotation.Transactional;

/**
* 数据服务层接口实现。
* TABLE CODE:	t_sys_area_unite;
* TABLE NAME:	
* TABLE REMARK:	功能区域关联表
* code tools version V1.0,created on Fri Dec 02 11:48:34 CST 2016
*/
@Service(value="TSysAreaUniteServiceImpl")
@Scope("prototype")
public class TSysAreaUniteServiceImpl implements TSysAreaUniteService{
    @Autowired
    private TSysAreaUniteDao tSysAreaUniteDao;

    Logger log4j = Logger.getLogger(TSysAreaUniteServiceImpl.class);

    public List listBean(PageBounds page, Map    <String, Object> params)
    {
        return tSysAreaUniteDao.listBean(page,params);
    }

    public List listBean(Map<String, Object> params)
    {
        return tSysAreaUniteDao.listBean(params);
    }
    public List listMap(PageBounds page, Map<String, Object> params) {

        return tSysAreaUniteDao.listMap(page,params);

    }
    public List listMap(Map<String, Object> params) {

        return tSysAreaUniteDao.listMap(params);

    }

    public int save(TSysAreaUniteModel o) {

        return tSysAreaUniteDao.save(o);

    }

    @Transactional("dbTransaction")
    public int save(List<TSysAreaUniteModel> list) {

        for (TSysAreaUniteModel item : list)
        save(item);
        return list.size();
    }

    public Map getBeanMapById(TSysAreaUniteModel o)
    {
        return tSysAreaUniteDao.getBeanMapById(o);
    }

    public TSysAreaUniteModel getBeanById(TSysAreaUniteModel o) {


        return tSysAreaUniteDao.getBeanById(o);

    }

    public boolean update(TSysAreaUniteModel o) {
        tSysAreaUniteDao.update(o);

        return true;
    }

    public boolean delete(TSysAreaUniteModel[] items) {
        for(int i=0;items!=null&&i
        <items.length;i++)
        tSysAreaUniteDao.delete(items[i]);
        return true;
    }
}
