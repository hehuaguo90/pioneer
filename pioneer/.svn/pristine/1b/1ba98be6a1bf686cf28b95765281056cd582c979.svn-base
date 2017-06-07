package com.wellsys.pioneer.module.tLoginObj.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.wellsys.pioneer.module.tLoginObj.dao.TLoginObjDao;
import com.wellsys.pioneer.module.tLoginObj.service.TLoginObjService;
import com.wellsys.pioneer.module.tSysRight.model.TSysRightModel;
import com.wellsys.pioneer.module.tSysUser.model.TSysUserModel;

@Service(value="TLoginObjServiceImpl")
@Scope("prototype")
public class TLoginObjServiceImpl implements TLoginObjService {
	@Autowired
    private TLoginObjDao  tLoginObjDao;
	
public List<TSysUserModel> checkLogin(Map<String, Object> params) {
	 return tLoginObjDao.listMap(params);
}

@Override
	public List<TSysRightModel> getSysRight(Map<String, Object> params) {
		return  tLoginObjDao.getSysRight(params);
	}

@Override
public void updateUserLastLoginTime(Map<String, Object> params) {
		tLoginObjDao.updateUserLastLoginTime(params);
}
@Override
public List findRoleName(Map<String, Object> params) {
	return  tLoginObjDao.findRoleName(params);
}
@Override
public List findRightUrl(Map<String, Object> params) {
	return tLoginObjDao.findRightUrl(params);
}

@Override
public Map<String, Object> getUserMsg(Map<String, Object> params) {
	return tLoginObjDao.getUserMsg(params);
}

}
