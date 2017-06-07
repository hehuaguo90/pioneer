package com.wellsys.pioneer.module.tSysRole.service;

import java.util.Map;
import java.util.List;

import com.wellsys.pioneer.module.tSysRole.model.TSysRoleModel;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;


/**
* 数据服务层接口定义。
* TABLE CODE:	t_sys_role;
* TABLE NAME:	
* TABLE REMARK:	角色信息
* code tools version V1.0,created on Fri Dec 02 11:48:35 CST 2016
*/
public interface TSysRoleService {
	/****
	*
	* @Title: listBean
	* @Description: 获取列表数据，返回map格式
	* @param   page 分页参数
	* @param  params 查询参数
	* @throws
	*/
	List listBean(PageBounds page, Map<String, Object> params);

	/****
	*
	* @Title: listBean
	* @Description: 获取列表数据，返回map格式
	* @param  params 查询参数
	* @throws
	*/
	List listBean(Map<String, Object> params);

	/****
	 * 
	 * @Title: listMap
	 * @Description: 获取列表数据，返回map格式
	 * @param   page 分页参数
	 * @param  params 查询参数
	 * @throws
	 */
	List listMap(PageBounds page,Map<String, Object> params);

	/****
	*
	* @Title: listMap
	* @Description: 获取列表数据，返回bean格式
	* @param   page 分页参数
	* @param  params 查询参数
	* @throws
	*/
	List listMap(Map<String, Object> params);

	/**
	 * @param rightids **
	*
	* @Title: save
	* @Description: 保存实体信息
	* @param   o
	* @param
	* @throws
	*/
	int save(TSysRoleModel o, String rightids);

	
	/****
	 * 
	 * @Title: getBeanById
	 * @Description: 获取实体信息，返回bean对象。
	 * @param  item 查询参数，存放主键信息。
 	 * @throws
	 */
	public TSysRoleModel getBeanById(TSysRoleModel item);

	/****
	*
	* @Title: getBeanMapById
	* @Description: 获取实体信息，返回Map对象。
	* @param  item 查询参数，存放主键信息。
	* @throws
	*/
	Map getBeanMapById(TSysRoleModel item);
	
	/**
	 * @param rightids **
	 * 
	 * @Title: updateData 
	 * @Description: 更新实体信息
	 * @param   o
	 * @param
	 * @throws
	 */
	public boolean update(TSysRoleModel tSysRoleModel, String rightids);
	
	/****
	 * 
	 * @Title: delete
	 * @Description: 删除实体信息
	 * @param @param id
	 * @param @return
	 * @throws
	 */
	public String delete(TSysRoleModel[] items);

	String getRightids(String roleid);

}
