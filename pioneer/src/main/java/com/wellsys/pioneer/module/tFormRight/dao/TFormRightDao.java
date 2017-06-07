package com.wellsys.pioneer.module.tFormRight.dao;


import java.util.Map;
import java.util.List;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.wellsys.pioneer.module.tFormRight.model.TFormRightModel;

/**
* 数据库访问接口。
* TABLE CODE:	t_form_right;
* TABLE NAME:	
* TABLE REMARK:	填报权限
* code tools version V1.0,created on Fri Dec 02 11:48:29 CST 2016
*/
@Service
@Transactional
public interface TFormRightDao {


	TFormRightModel getBeanById(TFormRightModel item);

 	Map getBeanMapById(TFormRightModel item);

	int save(TFormRightModel data);

	int delete(TFormRightModel item);
	
	int deleteByRoleid(TFormRightModel item);

	int update(TFormRightModel item);

	List listMap(PageBounds page, Map<String, Object> params);

 	List listMap(Map<String, Object> params);

	List listBean(PageBounds page, Map<String, Object> params);

    List listBean(Map<String, Object> params);



}
