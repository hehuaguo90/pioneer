package com.wellsys.pioneer.module.tSysComp.action;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import com.wellsys.common.utils.*;

import com.wellsys.pioneer.module.tSysComp.model.TSysCompModel;
import com.wellsys.pioneer.module.tSysComp.service.TSysCompService;
import com.wellsys.pioneer.module.tSysOrg.model.TSysOrgModel;
import com.wellsys.pioneer.module.tSysOrg.service.TSysOrgService;

/**
* 数据访问层接口。
* TABLE CODE:	t_sys_comp;
* TABLE NAME:	
* TABLE REMARK:	企业信息
* code tools version V1.0,created on Wed Jan 04 10:51:25 CST 2017
*/

@Controller
@RequestMapping("/tSysComp")
public class TSysCompAction {
	@Autowired
	private TSysCompService tSysCompService ;
//	@Autowired
//	private LogService logService;
	@Autowired
	private  HttpServletRequest request;
	
	@Autowired
	private TSysOrgService tSysOrgService;

	/**
	 * 新增  （ 企业信息）
	 * @param item 数据内容。
	 * @param response http response
	 * @throws IOException 异常信息
	 * */
	@RequestMapping("/add")
	public void addBean( TSysCompModel  item, HttpServletResponse response) throws IOException{
		try {
            
			String orgId = item.getOrgId();
			TSysOrgModel p = new TSysOrgModel();
			p.setOrgId(orgId);
			TSysOrgModel s = tSysOrgService.getBeanById(p);
			//添加UUID主键,如果不用UUID,自行修改
			String id = s.getAreaId() + new Date().getTime();
    		item.setCompId(id);
    		item.setCompCode(id);
    		item.setAreaLevel(Integer.parseInt(Constant.CZ));
    		item.setStepseqId(Integer.parseInt(Constant.CZ));
    		
			tSysCompService.save(item);

 			ActionUtil.addLog(request,0, "add","tSysComp" ,true,"");

			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_save_suc")),null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "add","tSysComp" ,false,e.getMessage());

			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}
	/**
	 * 根据id获取需要的数据对象
	 * @throws IOException 
	 * */
	@RequestMapping(value="/getBeanById")
	public void getBeanById(TSysCompModel  item,
			HttpServletResponse response) throws IOException{
		try {
		TSysCompModel  tSysCompModel = tSysCompService.getBeanById(item);
			ActionUtil.addLog(request,0, "getBeanById","tSysComp" ,true,"");
			JsonUtils.printJSONByObj(response, tSysCompModel, null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "getBeanById","tSysComp" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}

	@RequestMapping(value="/getBeanMapById/")
	public void getBeanMapById(TSysCompModel  item,
		HttpServletResponse response) throws IOException{
		try {
			Map object = tSysCompService.getBeanMapById(item);
			ActionUtil.addLog(request,0, "getBeanMapById","tSysComp" ,true,"");
			JsonUtils.printJSONByObj(response, object, null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "getBeanMapById","tSysComp" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_save_err")),	null);
			e.printStackTrace();
		}
	}

	/**
	 * 修改信息
	 * @param tSysCompModel  tSysCompModel 数据内容。
	 * @throws IOException 
	 * */
	@RequestMapping("/edit")
	public void update(TSysCompModel  tSysCompModel,
			HttpServletResponse response) throws IOException{

		try {
			tSysCompService.update(tSysCompModel);
			ActionUtil.addLog(request,0, "update","tSysComp" ,true,"");
			
			JsonUtils.printJSONByObj(response, new MessageModel(1, MessageConfig.getMessage("opt_edit_suc")), null);
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "update","tSysComp" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_edit_err")), null);
			e.printStackTrace();
		}
		//return "";
	}
	/**
	 * 删除
	 * @throws IOException 
	 * */
	@RequestMapping(value="/delete")
	public void delete(@RequestParam(value = "data") String data,
								HttpServletResponse response) throws IOException{
		try {

			ObjectMapper mapper=new ObjectMapper();
			TSysCompModel[] items= mapper.readValue(data, TSysCompModel[].class);

			String msg = tSysCompService.delete(items);

			if(StringUtils.isBlank(msg)){
				ActionUtil.addLog(request, 0, "delete", "tGzQksb", true, "");
				JsonUtils.printJSONByObj(response, new MessageModel(1,
						MessageConfig.getMessage("opt_del_suc")), null);
			}else{
				JsonUtils.printJSONByObj(response, new MessageModel(3,
						msg), null);
			}
		} catch (Exception e) {
			ActionUtil.addLog(request,0, "delete","tSysComp" ,false,e.getMessage());
			JsonUtils.printJSONByObj(response, new MessageModel(3, MessageConfig.getMessage("opt_del_err")), null);
			e.printStackTrace();
		}
		
	}
	/**
	 * 查询列表
	 * */

	@RequestMapping(value="/listByPage")
	public void listByPage(Integer page,Integer rows, HttpServletResponse response){
		try {
			@SuppressWarnings("unchecked")
			Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
			PageBounds pageBounds = new PageBounds(page, rows);
			@SuppressWarnings("unchecked")
			PageList list = (PageList) tSysCompService.listMap(pageBounds, param);

			PageModel page2 = new PageModel();
			page2.setRows(list);
			page2.setTotal(list.getPaginator().getTotalCount());
			JsonUtils.printJSONByObj(response, page2, null);

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	/**
	* 查询列表
	* */

	@RequestMapping(value="/listAll")
	public void listAll(HttpServletResponse response){

	try {
			@SuppressWarnings("unchecked")
			Map param = ActionUtil.getRequestMap((Map<String, String[]>) request.getParameterMap());
			@SuppressWarnings("unchecked")
			List list =  tSysCompService.listMap( param);

			JsonUtils.printJSONByObj(response, list, null);
	} catch (Exception e) {
		e.printStackTrace();
	}
}



}
