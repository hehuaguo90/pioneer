package com.wellsys.pioneer.module.tSysComp.service.impl;

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

import com.wellsys.pioneer.module.tSysComp.service.TSysCompService;
import com.wellsys.pioneer.module.tSysComp.dao.TSysCompDao;
import com.wellsys.pioneer.module.tSysComp.model.TSysCompModel;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import org.springframework.transaction.annotation.Transactional;

/**
* 数据服务层接口实现。
* TABLE CODE:	t_sys_comp;
* TABLE NAME:	
* TABLE REMARK:	企业信息
* code tools version V1.0,created on Wed Jan 04 10:51:25 CST 2017
*/
@Service(value="TSysCompServiceImpl")
@Scope("prototype")
public class TSysCompServiceImpl implements TSysCompService{
    @Autowired
    private TSysCompDao tSysCompDao;

    Logger log4j = Logger.getLogger(TSysCompServiceImpl.class);

    public List listBean(PageBounds page, Map    <String, Object> params)
    {
        return tSysCompDao.listBean(page,params);
    }

    public List listBean(Map<String, Object> params)
    {
        return tSysCompDao.listBean(params);
    }
    public List listMap(PageBounds page, Map<String, Object> params) {

        return tSysCompDao.listMap(page,params);

    }
    public List listMap(Map<String, Object> params) {

        return tSysCompDao.listMap(params);

    }

    public int save(TSysCompModel o) {

        return tSysCompDao.save(o);

    }

    @Transactional("dbTransaction")
    public int save(List<TSysCompModel> list) {

        for (TSysCompModel item : list)
        save(item);
        return list.size();
    }

    public Map getBeanMapById(TSysCompModel o)
    {
        return tSysCompDao.getBeanMapById(o);
    }

    public TSysCompModel getBeanById(TSysCompModel o) {


        return tSysCompDao.getBeanById(o);

    }

    public boolean update(TSysCompModel o) {
        tSysCompDao.update(o);

        return true;
    }

    public String delete(TSysCompModel[] items) {
    	for (int i = 0; items != null && i < items.length; i++){
			String pid = items[i].getCompId();
			int c1 = tSysCompDao.hasChildUser(pid);
			//判断是否被用户关联
			if(c1 > 0){
				return "不允许删除，已被用户关联！";
			}
		}
		
        for (int i = 0; items != null && i < items.length; i++){
        	tSysCompDao.delete(items[i]);
		}
		return "";
    }
}
