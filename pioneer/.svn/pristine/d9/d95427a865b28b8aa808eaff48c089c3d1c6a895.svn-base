package com.wellsys.pioneer.module.tSysCustomArea.service.impl;

import javax.annotation.Resource;

import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.wellsys.common.utils.CreateUUID;
import com.wellsys.common.utils.TreeModel;
import com.wellsys.pioneer.module.tSysAreaUnite.dao.TSysAreaUniteDao;
import com.wellsys.pioneer.module.tSysAreaUnite.model.TSysAreaUniteModel;
import com.wellsys.pioneer.module.tSysCustomArea.service.TSysCustomAreaService;
import com.wellsys.pioneer.module.tSysCustomArea.dao.TSysCustomAreaDao;
import com.wellsys.pioneer.module.tSysCustomArea.model.TSysCustomAreaModel;
import com.wellsys.pioneer.module.tSysRoleRight.model.TSysRoleRightModel;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;

import org.springframework.transaction.annotation.Transactional;

/**
* 数据服务层接口实现。
* TABLE CODE:	t_sys_custom_area;
* TABLE NAME:	
* TABLE REMARK:	功能区信息
* code tools version V1.0,created on Fri Dec 02 11:48:34 CST 2016
*/
@Service(value="TSysCustomAreaServiceImpl")
@Scope("prototype")
public class TSysCustomAreaServiceImpl implements TSysCustomAreaService{
    @Autowired
    private TSysCustomAreaDao tSysCustomAreaDao;
    @Autowired
    private TSysAreaUniteDao tSysAreaUniteDao;
    
    Logger log4j = Logger.getLogger(TSysCustomAreaServiceImpl.class);

    public List listBean(PageBounds page, Map    <String, Object> params)
    {
        return tSysCustomAreaDao.listBean(page,params);
    }

    public List listBean(Map<String, Object> params)
    {
        return tSysCustomAreaDao.listBean(params);
    }
    public List listMap(PageBounds page, Map<String, Object> params) {

        return tSysCustomAreaDao.listMap(page,params);

    }
    public List listMap(Map<String, Object> params) {

        return tSysCustomAreaDao.listMap(params);

    }

    public int save(TSysCustomAreaModel o,String areaIds) {
    	if (!"".equals(areaIds) && areaIds!=null) {
	        String[] ids = areaIds.split(",");
	        if (!"".equals(areaIds) && areaIds!=null) {
	        for(int i = 0; i < ids.length; i++){
	        	TSysAreaUniteModel sr = new TSysAreaUniteModel();
	        	sr.setUniteId(CreateUUID.createUUID());
	        	sr.setAreaId(ids[i]);
	        	sr.setCareaId(o.getCareaId());
	        	tSysAreaUniteDao.save(sr);
	        }	
        }} 
        return tSysCustomAreaDao.save(o);

    }

 

    public Map getBeanMapById(TSysCustomAreaModel o)
    {
        return tSysCustomAreaDao.getBeanMapById(o);
    }

    public TSysCustomAreaModel getBeanById(TSysCustomAreaModel o) {


        return tSysCustomAreaDao.getBeanById(o);

    }

    public boolean update(TSysCustomAreaModel o,String areaIds) {
    	
    	tSysAreaUniteDao.deleteByCareaId(o.getCareaId());
    	String[] ids = areaIds.split(",");
    	if (!"".equals(areaIds) && areaIds!=null) {
        for(int i = 0; i < ids.length; i++){
        	TSysAreaUniteModel sr = new TSysAreaUniteModel();
         	sr.setUniteId(CreateUUID.createUUID());
        	sr.setAreaId(ids[i]);
        	sr.setCareaId(o.getCareaId());
        	tSysAreaUniteDao.save(sr);
         }
    	}
    	 tSysCustomAreaDao.update(o);
        return true;
    }

    public boolean delete(TSysCustomAreaModel[] items) {
        for(int i=0;items!=null&&i
        <items.length;i++)
        tSysCustomAreaDao.delete(items[i]);
        return true;
    }
}
