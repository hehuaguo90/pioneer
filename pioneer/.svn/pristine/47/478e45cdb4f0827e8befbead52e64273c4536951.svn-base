package com.wellsys.pioneer.module.tSysOrg.service.impl;

import javax.annotation.Resource;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.wellsys.common.utils.TreeModel;

import com.wellsys.pioneer.module.tSysOrg.service.TSysOrgService;
import com.wellsys.pioneer.module.tSysOrg.dao.TSysOrgDao;
import com.wellsys.pioneer.module.tSysOrg.model.TSysOrgModel;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import org.springframework.transaction.annotation.Transactional;

/**
 * 数据服务层接口实现。 TABLE CODE: t_sys_org; TABLE NAME: TABLE REMARK: 机构信息 code tools
 * version V1.0,created on Tue Jan 03 18:53:49 CST 2017
 */
@Service(value = "TSysOrgServiceImpl")
@Scope("prototype")
public class TSysOrgServiceImpl implements TSysOrgService {
	@Autowired
	private TSysOrgDao tSysOrgDao;

	Logger log4j = Logger.getLogger(TSysOrgServiceImpl.class);

	public List listBean(PageBounds page, Map<String, Object> params) {
		return tSysOrgDao.listBean(page, params);
	}

	public List listBean(Map<String, Object> params) {
		return tSysOrgDao.listBean(params);
	}

	public List listMap(PageBounds page, Map<String, Object> params) {

		return tSysOrgDao.listMap(page, params);

	}

	public List listMap(Map<String, Object> params) {

		return tSysOrgDao.listMap(params);

	}

	public int save(TSysOrgModel o) {

		return tSysOrgDao.save(o);

	}

	@Transactional("dbTransaction")
	public int save(List<TSysOrgModel> list) {

		for (TSysOrgModel item : list)
			save(item);
		return list.size();
	}

	public Map getBeanMapById(TSysOrgModel o) {
		return tSysOrgDao.getBeanMapById(o);
	}

	public TSysOrgModel getBeanById(TSysOrgModel o) {

		return tSysOrgDao.getBeanById(o);

	}

	public boolean update(TSysOrgModel o) {
		tSysOrgDao.update(o);

		return true;
	}

	public String delete(TSysOrgModel[] items) {
		for (int i = 0; items != null && i < items.length; i++) {
			String orgId = items[i].getOrgId();
			// 判断是否有下级分组
			int c1 = tSysOrgDao.hasChildOrg(orgId);

			if (c1 > 0) {
				return "不允许删除，已被下级机构关联！";
			}

			// 是否有下级企业
			c1 = tSysOrgDao.hasChildComp(orgId);
			if (c1 > 0) {
				return "不允许删除，已被企业关联！";
			}

			// 判断是否被用户关联
			c1 = tSysOrgDao.hasChildUser(orgId);
			if (c1 > 0) {
				return "不允许删除，已被用户关联！";
			}
		}

		for (int i = 0; items != null && i < items.length; i++) {
			tSysOrgDao.delete(items[i]);
		}
		return "";
	}

	@SuppressWarnings("unchecked")
	@Override
	public String getOrgCompTree(String pid) {
		JSONArray tree = new JSONArray();
		if (StringUtils.isBlank(pid)) {
			pid = "0";
		}

		List<Map<String, Object>> list = tSysOrgDao.listOrgComp(null);
		if (list == null) {
			tree.toString();
		}

		getTree(list, pid, tree);

		// 如果不是0，则把自身也显示出来
		if (!"0".equals(pid)) {
			JSONArray toptree = new JSONArray();
			for (Map<String, Object> p : list) {
				if (pid.equals(p.get("id"))) {
					String id = p.get("id").toString();
					JSONObject pt = new JSONObject();
					pt.put("id", id);
					pt.put("text", p.get("text"));

					if (!tree.isEmpty()) {
						pt.put("children", tree);
					}
					toptree.add(pt);
				}
			}

			return toptree.toString();
		}

		return tree.toString();
	}

	// 树形结构
	private JSONArray getTree(List<Map<String, Object>> arealist, String pid,
			JSONArray tree) {
		for (Map<String, Object> p : arealist) {
			if (pid.equals(p.get("pid"))) {
				String id = p.get("id").toString();
				JSONObject pt = new JSONObject();
				pt.put("id", id);
				pt.put("text", p.get("text"));

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
	public String getOrgTree(String orgName, String pid) {
		JSONArray tree = new JSONArray();
		if (StringUtils.isBlank(pid)) {
			pid = "0";
		}

		Map<String, Object> params = new HashMap<String, Object>();
		if (!StringUtils.isBlank(orgName)) {
			params.put("orgName", "%" + orgName.trim() + "%");
			pid = null;
		}

		List<Map<String, Object>> list = tSysOrgDao.listOrg(params);
		if (list == null) {
			tree.toString();
		}
		orgTree(list, pid, tree);
		return tree.toString();
	}

	// 树形结构
	private JSONArray orgTree(List<Map<String, Object>> arealist, String pid,
			JSONArray tree) {
		if (!StringUtils.isBlank(pid)) {
			for (Map<String, Object> p : arealist) {
				if (pid.equals(p.get("pid"))) {
					String id = p.get("id").toString();
					JSONObject pt = new JSONObject();
					pt.put("id", id);
					pt.put("text", p.get("orgName"));
					pt.put("areaName", p.get("areaName"));
					pt.put("remark", p.get("remark"));

					JSONArray arr = new JSONArray();
					orgTree(arealist, id, arr);// 递归查询子节点
					if (!arr.isEmpty()) {
						pt.put("children", arr);
					}

					tree.add(pt);
				}

			}
		} else {
			for (Map<String, Object> p : arealist) {
				String id = p.get("id").toString();
				JSONObject pt = new JSONObject();
				pt.put("id", id);
				pt.put("text", p.get("orgName"));
				pt.put("areaName", p.get("areaName"));
				pt.put("remark", p.get("remark"));
				tree.add(pt);
			}
		}
		return tree;
	}

	@SuppressWarnings("unchecked")
	public String getOrgComb(String areaLevel) {
		JSONArray tree = new JSONArray();
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("areaLevel", areaLevel);
		List<Map<String, Object>> list = tSysOrgDao.listOrg(params);
		for (Map<String, Object> p : list) {
			JSONObject pt = new JSONObject();
			pt.put("orgId", p.get("id"));
			pt.put("orgName", p.get("orgName"));
			tree.add(pt);
		}

		return tree.toString();
	}
}
