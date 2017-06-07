package com.wellsys.pioneer.module.tSysBreed.service.impl;

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

import com.wellsys.common.utils.NStringUtil;
import com.wellsys.common.utils.TreeModel;

import com.wellsys.pioneer.module.tSysBreed.service.TSysBreedService;
import com.wellsys.pioneer.module.tSysBreed.dao.TSysBreedDao;
import com.wellsys.pioneer.module.tSysBreed.model.TSysBreedModel;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import org.springframework.transaction.annotation.Transactional;

/**
* 数据服务层接口实现。
* TABLE CODE:	t_sys_breed;
* TABLE NAME:	
* TABLE REMARK:	品种信息
* code tools version V1.0,created on Fri Dec 02 11:48:34 CST 2016
*/
@Service(value="TSysBreedServiceImpl")
@Scope("prototype")
public class TSysBreedServiceImpl implements TSysBreedService{
    @Autowired
    private TSysBreedDao tSysBreedDao;

    Logger log4j = Logger.getLogger(TSysBreedServiceImpl.class);

    public List listBean(PageBounds page, Map    <String, Object> params)
    {
        return tSysBreedDao.listBean(page,params);
    }

    public List listBean(Map<String, Object> params)
    {
        return tSysBreedDao.listBean(params);
    }
    public List listMap(PageBounds page, Map<String, Object> params) {

        return tSysBreedDao.listMap(page,params);

    }
    public List listMap(Map<String, Object> params) {

        return tSysBreedDao.listMap(params);

    }

    public int save(TSysBreedModel o) {

        return tSysBreedDao.save(o);

    }

    @Transactional("dbTransaction")
    public int save(List<TSysBreedModel> list) {

        for (TSysBreedModel item : list)
        save(item);
        return list.size();
    }

    public Map getBeanMapById(TSysBreedModel o)
    {
        return tSysBreedDao.getBeanMapById(o);
    }

    public TSysBreedModel getBeanById(TSysBreedModel o) {


        return tSysBreedDao.getBeanById(o);

    }

    public boolean update(TSysBreedModel o) {
        tSysBreedDao.update(o);

        return true;
    }

    public boolean delete(TSysBreedModel[] items) {
        for(int i=0;items!=null&&i
        <items.length;i++)
        tSysBreedDao.delete(items[i]);
        return true;
    }
    
	public List getTreeGrid(String node, String breedName) {
		Map<String, Object> params = new HashMap<String, Object>();
		if(!StringUtils.isBlank(breedName)){
			params.put("breedName", "%" + breedName + "%");
			node = null;
		}

		List<Map<String,Object>> list = (List<Map<String,Object>>)tSysBreedDao.listMap(params);
        List<TreeModel> listTree = buildTreeGrid(node, list);
        return listTree;
	}
	
	private List<TreeModel> buildTreeGrid(String node, List<Map<String,Object>> list) {
	     List<TreeModel> listTree = new ArrayList<TreeModel>();
	     if(node != null){
	    	 for(Map<String, Object> item : list){
	    		 if((item.get("pid")).equals(node)){ 
	    			 TreeModel treeItem = new TreeModel();
	    			 treeItem.setId(item.get("breedId").toString());
	    			 treeItem.setText(NStringUtil.changeHtmlString(item.get("breedName").toString()));
	    			 if(item.get("remark") != null){
	    				 treeItem.setRemark(item.get("remark").toString());
	    			 }
	    			 treeItem.setOrder(Integer.parseInt(item.get("showOrder").toString()));
	    			 treeItem.setChildren(buildTreeGrid(treeItem.getId(), list));
	    			 treeItem.setState("open");
	    			 listTree.add(treeItem);
	    		 }
	    	 }
	     }else{
	    	 for(Map<String, Object> item : list){
	    			 TreeModel treeItem = new TreeModel();
	    			 treeItem.setId(item.get("breedId").toString());
	    			 treeItem.setText(NStringUtil.changeHtmlString(item.get("breedName").toString()));
	    			 if(item.get("remark") != null){
	    				 treeItem.setRemark(item.get("remark").toString());
	    			 }
	    			 treeItem.setOrder( Integer.parseInt(item.get("showOrder").toString()));
	    			 listTree.add(treeItem);
	    	 } 
	     }
	    return listTree;
	}
}
