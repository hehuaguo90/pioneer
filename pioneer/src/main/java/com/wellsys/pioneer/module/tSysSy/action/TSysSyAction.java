package com.wellsys.pioneer.module.tSysSy.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.List;
import java.util.Map;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.wellsys.common.utils.*;
import com.wellsys.pioneer.module.tSysSy.service.TSysSyService;

/**
 * 数据访问层接口。 TABLE CODE: t_sys_db_record; TABLE NAME: TABLE REMARK: 数据库操作记录 code
 * tools version V1.0,created on Fri Dec 23 14:20:58 CST 2016
 */

@Controller
@RequestMapping("/TSysSy")
public class TSysSyAction {
	@Autowired
	private TSysSyService tSysSyService;
	// @Autowired
	// private LogService logService;
	@Autowired
	private HttpServletRequest request;

	/**
	 * 查询列表
	 */

	@RequestMapping(value = "/listAll")
	public void listAll(HttpServletResponse response) {

		try {
			@SuppressWarnings("unchecked")
			Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
			@SuppressWarnings("unchecked")
			List list = tSysSyService.listMap(param);

			JsonUtils.printJSONByObj(response, list, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 查询列表
	 */

	@RequestMapping(value = "/listStateSy")
	public void listStateSy(HttpServletResponse response) {

		try {
			@SuppressWarnings("unchecked")
			Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
			@SuppressWarnings("unchecked")
			List list = tSysSyService.listStateSy(param);

			JsonUtils.printJSONByObj(response, list, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/listAreaMap")
	public void listAreaMap(HttpServletResponse response) {

		try {
			@SuppressWarnings("unchecked")
			Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
			@SuppressWarnings("unchecked")
			List list = tSysSyService.listAreaMap(param);

			JsonUtils.printJSONByObj(response, list, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/listJxxlMap")
	public void listJxxlMap(Integer page, Integer rows, HttpServletResponse response) {

		try {
			@SuppressWarnings("unchecked")
			Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
			PageBounds pageBounds = new PageBounds(page, rows);
			@SuppressWarnings("unchecked")
			PageList list = (PageList) tSysSyService.listJxxlMap(pageBounds, param);

			PageModel page2 = new PageModel();
			page2.setRows(list);
			page2.setTotal(list.getPaginator().getTotalCount());
			JsonUtils.printJSONByObj(response, page2, null);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/listJxsMap")
	public void listJxsMap(HttpServletResponse response) {

		try {
			@SuppressWarnings("unchecked")
			Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
			@SuppressWarnings("unchecked")
			List list = tSysSyService.listJxsMap(param);

			JsonUtils.printJSONByObj(response, list, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value = "/listYjMap")
	public void listYjMap(HttpServletResponse response) {

		try {
			@SuppressWarnings("unchecked")
			Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
			@SuppressWarnings("unchecked")
			List list = tSysSyService.listYjMap(param);

			JsonUtils.printJSONByObj(response, list, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
