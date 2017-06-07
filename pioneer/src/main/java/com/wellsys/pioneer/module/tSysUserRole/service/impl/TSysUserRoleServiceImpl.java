package com.wellsys.pioneer.module.tSysUserRole.service.impl;

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

import com.wellsys.pioneer.module.tSysUserRole.service.TSysUserRoleService;
import com.wellsys.pioneer.module.tSysUserRole.dao.TSysUserRoleDao;
import com.wellsys.pioneer.module.tSysUserRole.model.TSysUserRoleModel;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import org.springframework.transaction.annotation.Transactional;

/**
* 数据服务层接口实现。
* TABLE CODE:	t_sys_user_role;
* TABLE NAME:	
* TABLE REMARK:	用户角色关联表
* code tools version V1.0,created on Fri Dec 02 11:48:36 CST 2016
*/
@Service(value="TSysUserRoleServiceImpl")
@Scope("prototype")
public class TSysUserRoleServiceImpl implements TSysUserRoleService{
    @Autowired
    private TSysUserRoleDao tSysUserRoleDao;

    Logger log4j = Logger.getLogger(TSysUserRoleServiceImpl.class);

    public List listBean(PageBounds page, Map    <String, Object> params)
    {
        return tSysUserRoleDao.listBean(page,params);
    }

    public List listBean(Map<String, Object> params)
    {
        return tSysUserRoleDao.listBean(params);
    }
    public List listMap(PageBounds page, Map<String, Object> params) {

        return tSysUserRoleDao.listMap(page,params);

    }
    public List listMap(Map<String, Object> params) {

        return tSysUserRoleDao.listMap(params);

    }

    public int save(TSysUserRoleModel o) {

        return tSysUserRoleDao.save(o);

    }

    @Transactional("dbTransaction")
    public int save(List<TSysUserRoleModel> list) {

        for (TSysUserRoleModel item : list)
        save(item);
        return list.size();
    }

    public Map getBeanMapById(TSysUserRoleModel o)
    {
        return tSysUserRoleDao.getBeanMapById(o);
    }

    public TSysUserRoleModel getBeanById(TSysUserRoleModel o) {


        return tSysUserRoleDao.getBeanById(o);

    }

    public boolean update(TSysUserRoleModel o) {
        tSysUserRoleDao.update(o);

        return true;
    }

    public boolean delete(TSysUserRoleModel[] items) {
        for(int i=0;items!=null&&i
        <items.length;i++)
        tSysUserRoleDao.delete(items[i]);
        return true;
    }
}
