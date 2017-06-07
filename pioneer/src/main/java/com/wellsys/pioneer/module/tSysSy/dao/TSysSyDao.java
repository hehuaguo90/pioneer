package com.wellsys.pioneer.module.tSysSy.dao;


import java.util.Map;
import java.util.List;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.wellsys.pioneer.module.tSysJxxl.model.TSysJxxlModel;


@Service
@Transactional
public interface TSysSyDao {


	List listAreaMap(Map<String, Object> params);

	List listJxsMap(Map<String, Object> params);
	
 	List listMap(Map<String, Object> params);

 	List listStateSy(Map<String, Object> params);
 	
 	List listJxxlMap(PageBounds page, Map<String, Object> params);
 	
 	List listYjMap(Map<String, Object> params);
}
