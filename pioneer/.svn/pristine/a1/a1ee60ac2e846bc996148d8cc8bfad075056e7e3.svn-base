package com.wellsys.pioneer.module.tSysRoleRight.service.impl;

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

import com.wellsys.pioneer.module.tSysRoleRight.service.TSysRoleRightService;
import com.wellsys.pioneer.module.tSysRoleRight.dao.TSysRoleRightDao;
import com.wellsys.pioneer.module.tSysRoleRight.model.TSysRoleRightModel;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import org.springframework.transaction.annotation.Transactional;

/**
* 数据服务层接口实现。
* TABLE CODE:	t_sys_role_right;
* TABLE NAME:	
* TABLE REMARK:	角色权限关联表
* code tools version V1.0,created on Fri Dec 02 11:48:35 CST 2016
*/
@Service(value="TSysRoleRightServiceImpl")
@Scope("prototype")
public class TSysRoleRightServiceImpl implements TSysRoleRightService{
    @Autowired
    private TSysRoleRightDao tSysRoleRightDao;

    Logger log4j = Logger.getLogger(TSysRoleRightServiceImpl.class);

    public List listBean(PageBounds page, Map    <String, Object> params)
    {
        return tSysRoleRightDao.listBean(page,params);
    }

    public List listBean(Map<String, Object> params)
    {
        return tSysRoleRightDao.listBean(params);
    }
    public List listMap(PageBounds page, Map<String, Object> params) {

        return tSysRoleRightDao.listMap(page,params);

    }
    public List listMap(Map<String, Object> params) {

        return tSysRoleRightDao.listMap(params);

    }

    public int save(TSysRoleRightModel o) {

        return tSysRoleRightDao.save(o);

    }

    @Transactional("dbTransaction")
    public int save(List<TSysRoleRightModel> list) {

        for (TSysRoleRightModel item : list)
        save(item);
        return list.size();
    }

    public Map getBeanMapById(TSysRoleRightModel o)
    {
        return tSysRoleRightDao.getBeanMapById(o);
    }

    public TSysRoleRightModel getBeanById(TSysRoleRightModel o) {


        return tSysRoleRightDao.getBeanById(o);

    }

    public boolean update(TSysRoleRightModel o) {
        tSysRoleRightDao.update(o);

        return true;
    }

    public boolean delete(TSysRoleRightModel[] items) {
        for(int i=0;items!=null&&i
        <items.length;i++)
        tSysRoleRightDao.delete(items[i]);
        return true;
    }
}
