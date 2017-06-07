package com.wellsys.pioneer.module.tSysArea.dao;


import java.util.Map;
import java.util.List;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.wellsys.pioneer.module.tSysArea.model.TSysAreaModel;

/**
* 数据库访问接口。
* TABLE CODE:	t_sys_area;
* TABLE NAME:	
* TABLE REMARK:	地区表
* code tools version V1.0,created on Fri Dec 02 11:48:33 CST 2016
*/
@Service
@Transactional
public interface TSysAreaDao {

	TSysAreaModel getBeanById(TSysAreaModel item);

 	Map getBeanMapById(TSysAreaModel item);

	int save(TSysAreaModel data);

	int delete(TSysAreaModel item);

	int update(TSysAreaModel item);

	List listMap(PageBounds page, Map<String, Object> params);

 	List listMap(Map<String, Object> params);
 	List listMapTree(Map<String, Object> params);
 	List searchListMap(Map<String, Object> params);
 	
	List listBean(PageBounds page, Map<String, Object> params);

    List listBean(Map<String, Object> params);

    List getAreaTrees(Map<String, Object> params); 
    
    List getAreas(Map<String, Object> params);
    List homePageListPage2(PageBounds pageBounds,Map<String, Object> params);
    int updateInfo(Map<String, Object> params);
    List repairDepot(PageBounds pageBounds,Map<String, Object> params);
    int updateRepair(Map<String, Object> params);
    
    List repairRoute(PageBounds pageBounds,Map<String, Object> params);
    List repairRoute(Map<String, Object> params);
    int saveRepairRoute(Map<String, Object> params);
	int deleteRepairRoute(Map<String, Object> params);
	
	List districtTree(Map<String, Object> params);
	int updateRouteStatus(Map<String, Object> params);
	
	List repairWarn(PageBounds pageBounds,Map<String, Object> params);
    int saveRepairWarn(Map<String, Object> params);
    int updateRouteWarn(Map<String, Object> params);
	int deleteRepairWarn(Map<String, Object> params);
	List getJxsArea(Map<String, Object> params);
	
	 int updateRouteStatusAll(Map<String, Object> params);
}
