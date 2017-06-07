package com.wellsys.pioneer.module.tSysArea.service;

import java.util.Map;
import java.util.List;

import net.sf.json.JSONArray;

import com.wellsys.pioneer.module.tSysArea.model.TSysAreaModel;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;


/**
* 数据服务层接口定义。
* TABLE CODE:	t_sys_area;
* TABLE NAME:	
* TABLE REMARK:	地区表
* code tools version V1.0,created on Fri Dec 02 11:48:33 CST 2016
*/
public interface TSysAreaService {
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
	/****
	*
	* @Title: searchListMap  地区管理点击查询用
	* @Description: 获取列表数据，返回bean格式
	* @param   page 分页参数
	* @param  params 查询参数
	* @throws
	*/
	List searchListMap(Map<String, Object> params);
	
	/****
	*
	* @Title: save
	* @Description: 保存实体信息
	* @param   o
	* @param
	* @throws
	*/
	int save(TSysAreaModel o);

		/****
		*
		* @Title: save
		* @Description: 保存实体信息
		* @param   list
 		* @throws
		*/
	public int save(List<TSysAreaModel> list);
	
	/****
	 * 
	 * @Title: getBeanById
	 * @Description: 获取实体信息，返回bean对象。
	 * @param  item 查询参数，存放主键信息。
 	 * @throws
	 */
	public TSysAreaModel getBeanById(TSysAreaModel item);

	/****
	*
	* @Title: getBeanMapById
	* @Description: 获取实体信息，返回Map对象。
	* @param  item 查询参数，存放主键信息。
	* @throws
	*/
	Map getBeanMapById(TSysAreaModel item);
	
	/****
	 * 
	 * @Title: updateData 
	 * @Description: 更新实体信息
	 * @param   o
	 * @param
	 * @throws
	 */
	public boolean update(TSysAreaModel  o);
	
	/****
	 * 
	 * @Title: delete
	 * @Description: 删除实体信息
	 * @param @param id
	 * @param @return
	 * @throws
	 */
	public boolean delete(TSysAreaModel[] items);

	public String getAreaTree(String areaLevel);
	
	public String getAreaTrees(String areaLevel, String pid);
	
	public JSONArray getAreas(Map<String, Object> params);
	
	public List anyWay(PageBounds pageBounds,Map<String, Object> params);
}
