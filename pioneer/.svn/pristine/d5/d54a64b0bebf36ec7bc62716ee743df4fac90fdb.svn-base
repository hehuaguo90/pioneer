package com.wellsys.pioneer.module.tFormRight.service.impl;

import javax.annotation.Resource;

import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.wellsys.common.utils.TreeModel;
import com.wellsys.pioneer.module.tFormRight.service.TFormRightService;
import com.wellsys.pioneer.module.tFormRight.dao.TFormRightDao;
import com.wellsys.pioneer.module.tFormRight.model.TFormRightModel;
import com.wellsys.pioneer.module.tSysRoleRight.model.TSysRoleRightModel;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;

import org.springframework.transaction.annotation.Transactional;

/**
* 数据服务层接口实现。
* TABLE CODE:	t_form_right;
* TABLE NAME:	
* TABLE REMARK:	填报权限
* code tools version V1.0,created on Fri Dec 02 11:48:29 CST 2016
*/
@Service(value="TFormRightServiceImpl")
@Scope("prototype")
public class TFormRightServiceImpl implements TFormRightService{
    @Autowired
    private TFormRightDao tFormRightDao;

    Logger log4j = Logger.getLogger(TFormRightServiceImpl.class);

    public List listBean(PageBounds page, Map    <String, Object> params)
    {
        return tFormRightDao.listBean(page,params);
    }

    public List listBean(Map<String, Object> params)
    {
        return tFormRightDao.listBean(params);
    }
    public List listMap(PageBounds page, Map<String, Object> params) {

        return tFormRightDao.listMap(page,params);

    }
    public List listMap(Map<String, Object> params) {

        return tFormRightDao.listMap(params);

    }

    public int save(TFormRightModel o) {

        return tFormRightDao.save(o);

    }

    @Transactional("dbTransaction")
    public int save(List<TFormRightModel> list) {

        for (TFormRightModel item : list)
        save(item);
        return list.size();
    }

    public Map getBeanMapById(TFormRightModel o)
    {
        return tFormRightDao.getBeanMapById(o);
    }

    public TFormRightModel getBeanById(TFormRightModel o) {


        return tFormRightDao.getBeanById(o);

    }

    public boolean update(TFormRightModel o) {
        tFormRightDao.update(o);

        return true;
    }

    public boolean delete(TFormRightModel[] items) {
        for(int i=0;items!=null&&i<items.length;i++)
        tFormRightDao.delete(items[i]);
        return true;
    }
    @Override
    public boolean deleteByRoleid(TFormRightModel item) {
       if (item!=null) {
    	   tFormRightDao.deleteByRoleid(item);
       }
        return true;
    }
    
	@Override
	public String getFormids(String roleid,String type) {
		Map<String, Object> params =new  HashMap<String, Object>();
		params.put("roleId", roleid);
		params.put("rightType", type);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> list = tFormRightDao.listMap(params);
		List<String> ids = new ArrayList<String>();
		if(list != null && list.size() > 0){
			for(Map<String, Object> r : list){
				ids.add((String) r.get("formId"));
			}
		}
		
		return StringUtils.join(ids, ",");
	}
}
