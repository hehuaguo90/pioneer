package com.wellsys.pioneer.module.tSysArea.service.impl;

import javax.annotation.Resource;

import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.wellsys.common.utils.Constant;
import com.wellsys.common.utils.TreeModel;
import com.wellsys.common.utils.Util;
import com.wellsys.pioneer.module.tSysArea.service.TSysAreaService;
import com.wellsys.pioneer.module.tSysArea.dao.TSysAreaDao;
import com.wellsys.pioneer.module.tSysArea.model.TSysAreaModel;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.itextpdf.xmp.impl.Utils;

import org.springframework.transaction.annotation.Transactional;

/**
 * 数据服务层接口实现。 TABLE CODE: t_sys_area; TABLE NAME: TABLE REMARK: 地区表 code tools
 * version V1.0,created on Fri Dec 02 11:48:33 CST 2016
 */
@Service(value = "TSysAreaServiceImpl")
@Scope("prototype")
public class TSysAreaServiceImpl implements TSysAreaService {
	@Autowired
	private TSysAreaDao tSysAreaDao;

	Logger log4j = Logger.getLogger(TSysAreaServiceImpl.class);

	public List listBean(PageBounds page, Map<String, Object> params) {
		return tSysAreaDao.listBean(page, params);
	}

	public List listBean(Map<String, Object> params) {
		return tSysAreaDao.listBean(params);
	}

	public List listMap(PageBounds page, Map<String, Object> params) {

		return tSysAreaDao.listMap(page, params);

	}

	public List listMap(Map<String, Object> params) {

		return tSysAreaDao.listMap(params);

	}

	public List searchListMap(Map<String, Object> params) {

		return tSysAreaDao.searchListMap(params);

	}

	public int save(TSysAreaModel o) {

		return tSysAreaDao.save(o);

	}

	@Transactional("dbTransaction")
	public int save(List<TSysAreaModel> list) {

		for (TSysAreaModel item : list)
			save(item);
		return list.size();
	}

	public Map getBeanMapById(TSysAreaModel o) {
		return tSysAreaDao.getBeanMapById(o);
	}

	public TSysAreaModel getBeanById(TSysAreaModel o) {

		return tSysAreaDao.getBeanById(o);

	}

	public boolean update(TSysAreaModel o) {
		tSysAreaDao.update(o);

		return true;
	}

	public boolean delete(TSysAreaModel[] items) {
		for (int i = 0; items != null && i < items.length; i++)
			tSysAreaDao.delete(items[i]);
		return true;
	}

	public String getAreaTree(String areaLevel) {
		JSONArray tree = new JSONArray();
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("areaLevel", areaLevel);
		List<Map<String, Object>> arealist = tSysAreaDao.listMapTree(params);

		if (arealist == null) {
			tree.toString();
		}
		getTree(arealist, "0", tree);
		return tree.toString();
	}

	// 树形结构
	private JSONArray getTree(List<Map<String, Object>> arealist, String pid,
			JSONArray tree) {
		for (Map<String, Object> p : arealist) {
			if (pid.equals(p.get("pid"))) {
				String id = p.get("areaId").toString();
				JSONObject pt = new JSONObject();
				pt.put("id", id);
				pt.put("text", p.get("shortName"));
				pt.put("code", p.get("areaCode"));
				pt.put("level", p.get("areaLevel"));
				pt.put("order", p.get("showOrder"));
				// if(Constant.CITY.equals(pid)){
				// pt.put("state", "closed");
				// }
				JSONArray arr = new JSONArray();
				getTree(arealist, id, arr);// 递归查询子节点
				if (!arr.isEmpty()) {
					pt.put("children", arr);
				}

				tree.add(pt);
			}

		}
		return tree;
	}

	@SuppressWarnings("unchecked")
	@Override
	public String getAreaTrees(String areaLevel, String pid) {
		JSONArray tree = new JSONArray();
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("areaLevel", areaLevel);
		params.put("pid", pid);

		List<Map<String, Object>> arealist = tSysAreaDao.getAreaTrees(params);

		if (arealist == null) {
			tree.toString();
		}
		String pAreaName = "";
		if (StringUtils.isBlank(pid)) {
			pid = "0";
		} else {
			TSysAreaModel item = new TSysAreaModel();
			item.setAreaId(pid);
			TSysAreaModel tSysAreaModel = tSysAreaDao.getBeanById(item);
			pAreaName = tSysAreaModel.getShortName();
		}

		getTrees(arealist, pid, pAreaName, tree);
		return tree.toString();
	}

	// 树形结构
	private JSONArray getTrees(List<Map<String, Object>> arealist, String pid,
			String pAreaName, JSONArray tree) {
		for (Map<String, Object> p : arealist) {
			if (pid.equals(p.get("pid"))) {
				String id = p.get("id").toString();
				String areaLevel = p.get("areaLevel").toString();
				JSONObject pt = new JSONObject();
				pt.put("id", id);
				pt.put("text", p.get("text"));
				pt.put("pid", p.get("pid"));
				pt.put("code", p.get("areaCode"));
				pt.put("level", p.get("areaLevel"));
				pt.put("order", p.get("showOrder"));
				pt.put("levelName", p.get("levelName"));
				pt.put("pAreaName", pAreaName);
				// 区县和乡镇级别关闭文件夹
				if (Constant.QXJ.equals(areaLevel)
						|| Constant.XZJ.equals(areaLevel)) {
					pt.put("state", "closed");
				}
				JSONArray arr = new JSONArray();
				getTrees(arealist, id, p.get("text").toString(), arr);// 递归查询子节点
				if (!arr.isEmpty()) {
					pt.put("children", arr);
				}
				tree.add(pt);
			}
		}
		return tree;
	}

	@Override
	public JSONArray getAreas(Map<String, Object> params) {
		List<Map<String, Object>> arealist = tSysAreaDao.getAreas(params);
		JSONArray tree = new JSONArray();
		for (Map<String, Object> p : arealist) {
			JSONObject pt = new JSONObject();
			pt.put("id", p.get("AREAID"));
			pt.put("text", p.get("AREANAME"));
			pt.put("level", "1");
			pt.put("pid", 0);
			JSONArray arr = new JSONArray();
			tree.add(pt);
		}
		return tree;
	}

	@Override
	public List anyWay(PageBounds pageBounds,Map<String, Object> params) {
		String method = (String) params.get("method");
		if ("updateInfo".equals(method)) {
			List list=new ArrayList();
			list.add(tSysAreaDao.updateInfo(params));
			return list;
		}else if("homePageListPage2".equals(method)){
			if(Util.isNotBlank(params.get("NAME99"))){
				params.put("NAME99", "%"+params.get("NAME99").toString().trim()+"%");
			}
			return tSysAreaDao.homePageListPage2(pageBounds,params);
		}else if("repairDepot".equals(method)){
			if(Util.isNotBlank(params.get("NAME99"))){
				params.put("NAME99", "%"+params.get("NAME99").toString().trim()+"%");
			}
			return tSysAreaDao.repairDepot(pageBounds,params);
		}else if("updateRepair".equals(method)){
			List list=new ArrayList();
			list.add(tSysAreaDao.updateRepair(params));
			return list;
		}else if("saveRepairRoute".equals(method)){
			List list=new ArrayList();
			params.put("id", UUID.randomUUID().toString().replaceAll("-", ""));
			list.add(tSysAreaDao.saveRepairRoute(params));
			return list;
		}else if("deleteRepairRoute".equals(method)){
			String ids[] = ((String)params.get("data")).split(","); 
			int delInt = 0;
			for (int i = 0; i < ids.length; i++) {
				params.put("id", ids[i]);
				delInt += tSysAreaDao.deleteRepairRoute(params);
			}
			List list=new ArrayList();
			list.add(delInt);
			return list;
		}else if("repairRoute".equals(method)){
			if(Util.isNotBlank(params.get("mc"))){
				params.put("mc", "%"+params.get("mc").toString().trim()+"%");
			}
			if("false".equals(params.get("isPage"))){
				return tSysAreaDao.repairRoute(params);
			}else{
				return tSysAreaDao.repairRoute(pageBounds,params);
			}
		}else if("districtTree".equals(method)){
			List<Map<String, Object>> arealist = tSysAreaDao.districtTree(params);
			List tree=new ArrayList();
			for (Map<String, Object> p : arealist) {
				JSONObject pt = new JSONObject();
				pt.put("id", p.get("ADCODE99"));
				pt.put("text", p.get("NAME99"));
				pt.put("level", "1");
				pt.put("pid", 0);
				JSONArray arr = new JSONArray();
				tree.add(pt);
			}
			
			return tree;
		}else if("updateRouteStatus".equals(method)){
			List list=new ArrayList();
			list.add(tSysAreaDao.updateRouteStatus(params));
			return list;
		}else if("repairWarn".equals(method)){
			if(Util.isNotBlank(params.get("jxsName"))){
				params.put("jxsName", "%"+params.get("jxsName").toString().trim()+"%");
			}
			return tSysAreaDao.repairWarn(pageBounds,params);
		}else if("saveRepairWarn".equals(method)){
			List list=new ArrayList();
			params.put("id", UUID.randomUUID().toString().replaceAll("-", ""));
			list.add(tSysAreaDao.saveRepairWarn(params));
			return list;
		}else if("deleteRepairWarn".equals(method)){
			String ids[] = ((String)params.get("data")).split(","); 
			int delInt = 0;
			for (int i = 0; i < ids.length; i++) {
				params.put("id", ids[i]);
				delInt += tSysAreaDao.deleteRepairWarn(params);
			}
			List list=new ArrayList();
			list.add(delInt);
			return list;
		}else if("updateRouteWarn".equals(method)){
			List list=new ArrayList();
			list.add(tSysAreaDao.updateRouteWarn(params));
			return list;
		}else if("getJxsArea".equals(method)){
			return tSysAreaDao.getJxsArea(params);
		}else if("updateRouteStatusAll".equals(method)){
			List list=new ArrayList();
			list.add(tSysAreaDao.updateRouteStatusAll(params));
			return list;
		}
		return null;
	}
}
