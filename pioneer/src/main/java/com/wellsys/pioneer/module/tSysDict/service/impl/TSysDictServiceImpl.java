package com.wellsys.pioneer.module.tSysDict.service.impl;

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

import com.wellsys.pioneer.module.tSysDict.service.TSysDictService;
import com.wellsys.pioneer.module.tSysDict.dao.TSysDictDao;
import com.wellsys.pioneer.module.tSysDict.model.TSysDictModel;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import org.springframework.transaction.annotation.Transactional;

/**
* 数据服务层接口实现。
* TABLE CODE:	t_sys_dict;
* TABLE NAME:	
* TABLE REMARK:	数据字典表
* code tools version V1.0,created on Fri Dec 02 11:48:34 CST 2016
*/
@Service(value="TSysDictServiceImpl")
@Scope("prototype")
public class TSysDictServiceImpl implements TSysDictService{
    @Autowired
    private TSysDictDao tSysDictDao;

    Logger log4j = Logger.getLogger(TSysDictServiceImpl.class);

    public List listBean(PageBounds page, Map    <String, Object> params)
    {
        return tSysDictDao.listBean(page,params);
    }

    public List listBean(Map<String, Object> params)
    {
        return tSysDictDao.listBean(params);
    }
    public List listMap(PageBounds page, Map<String, Object> params) {

        return tSysDictDao.listMap(page,params);

    }
    public List listMap(Map<String, Object> params) {

        return tSysDictDao.listMap(params);

    }

    public int save(TSysDictModel o) {

        return tSysDictDao.save(o);

    }

    @Transactional("dbTransaction")
    public int save(List<TSysDictModel> list) {

        for (TSysDictModel item : list)
        save(item);
        return list.size();
    }

    public Map getBeanMapById(TSysDictModel o)
    {
        return tSysDictDao.getBeanMapById(o);
    }

    public TSysDictModel getBeanById(TSysDictModel o) {


        return tSysDictDao.getBeanById(o);

    }

    public boolean update(TSysDictModel o) {
        tSysDictDao.update(o);

        return true;
    }

    public boolean delete(TSysDictModel[] items) {
        for(int i=0;items!=null&&i
        <items.length;i++)
        tSysDictDao.delete(items[i]);
        return true;
    }
    
    public List listMapDict(Map<String, Object> params) {
    	List list = tSysDictDao.listMap(params);
    	List<Map<String, Object>> dict = new ArrayList<Map<String, Object>>();
    	for(int i = 0; i < list.size(); i++){
    		Map<String, Object> m = (Map<String, Object>) list.get(i);
    		Map<String, Object> mp = new HashMap<String, Object>();
    		mp.put("id", m.get("code").toString());
    		mp.put("text", m.get("name").toString());
    		
    		dict.add(mp);
    	}
    	
    	return dict;
    }
}
