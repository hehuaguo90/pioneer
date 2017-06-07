package com.wellsys.pioneer.module.tBaseYc.service;

import java.util.Map;
import java.util.List;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.wellsys.pioneer.module.tBaseYc.model.TBaseYcModel;


/**
* 数据服务层接口定义。
* TABLE CODE:	t_sys_db_record;
* TABLE NAME:	
* TABLE REMARK:	数据库操作记录
* code tools version V1.0,created on Fri Dec 23 14:20:58 CST 2016
*/
public interface TBaseYcService {
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
	* @Title: save
	* @Description: 保存实体信息
	* @param   o
	* @param
	* @throws
	*/
	int save(TBaseYcModel o);

		/****
		*
		* @Title: save
		* @Description: 保存实体信息
		* @param   list
 		* @throws
		*/
	public int save(List<TBaseYcModel> list);
	
	/****
	 * 
	 * @Title: getBeanById
	 * @Description: 获取实体信息，返回bean对象。
	 * @param  item 查询参数，存放主键信息。
 	 * @throws
	 */
	public TBaseYcModel getBeanById(TBaseYcModel item);

	/****
	*
	* @Title: getBeanMapById
	* @Description: 获取实体信息，返回Map对象。
	* @param  item 查询参数，存放主键信息。
	* @throws
	*/
	Map getBeanMapById(TBaseYcModel item);
	
	/****
	 * 
	 * @Title: updateData 
	 * @Description: 更新实体信息
	 * @param   o
	 * @param
	 * @throws
	 */
	public boolean update(TBaseYcModel  o);
	
	/****
	 * 
	 * @Title: delete
	 * @Description: 删除实体信息
	 * @param @param id
	 * @param @return
	 * @throws
	 */
	public boolean delete(TBaseYcModel[] items);

}
