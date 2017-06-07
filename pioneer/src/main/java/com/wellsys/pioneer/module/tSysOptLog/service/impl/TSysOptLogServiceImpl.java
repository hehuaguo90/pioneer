package com.wellsys.pioneer.module.tSysOptLog.service.impl;

import javax.annotation.Resource;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.wellsys.common.utils.CreateUUID;
import com.wellsys.common.utils.TreeModel;
import com.wellsys.pioneer.module.tLoginObj.model.LoginObj;
import com.wellsys.pioneer.module.tSysOptLog.service.TSysOptLogService;
import com.wellsys.pioneer.module.tSysOptLog.dao.TSysOptLogDao;
import com.wellsys.pioneer.module.tSysOptLog.model.TSysOptLogModel;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;

import org.springframework.transaction.annotation.Transactional;

/**
* 数据服务层接口实现。
* TABLE CODE:	t_sys_opt_log;
* TABLE NAME:	
* TABLE REMARK:	系统日志
* code tools version V1.0,created on Fri Dec 02 11:48:35 CST 2016
*/
@Service(value="TSysOptLogServiceImpl")
@Scope("prototype")
public class TSysOptLogServiceImpl implements TSysOptLogService{
    @Autowired
    private TSysOptLogDao tSysOptLogDao;

    Logger log4j = Logger.getLogger(TSysOptLogServiceImpl.class);

    public List listBean(PageBounds page, Map    <String, Object> params)
    {
        return tSysOptLogDao.listBean(page,params);
    }

    public List listBean(Map<String, Object> params)
    {
        return tSysOptLogDao.listBean(params);
    }
    public List listMap(PageBounds page, Map<String, Object> params) {

        return tSysOptLogDao.listMap(page,params);

    }
    public List listMap(Map<String, Object> params) {

        return tSysOptLogDao.listMap(params);

    }

    public int save(TSysOptLogModel o) {

        return tSysOptLogDao.save(o);

    }

    @Transactional("dbTransaction")
    public int save(List<TSysOptLogModel> list) {

        for (TSysOptLogModel item : list)
        save(item);
        return list.size();
    }

    public Map getBeanMapById(TSysOptLogModel o)
    {
        return tSysOptLogDao.getBeanMapById(o);
    }

    public TSysOptLogModel getBeanById(TSysOptLogModel o) {


        return tSysOptLogDao.getBeanById(o);

    }

    public boolean update(TSysOptLogModel o) {
        tSysOptLogDao.update(o);

        return true;
    }

    public boolean delete(TSysOptLogModel[] items) {
        for(int i=0;items!=null&&i
        <items.length;i++)
        tSysOptLogDao.delete(items[i]);
        return true;
    }
    
    /**
     * 记录登录日志
     */
      public void saveLoginLog(String IpAddress, String sysAccount,String opObject,LoginObj loginObj) {
      	TSysOptLogModel log = new TSysOptLogModel();
      	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
  		Date date  = new Date();
  		String time = dateFormat.format(date);
  		log.setOpTime(Timestamp.valueOf(time));
  		log.setLogId(CreateUUID.createUUID());
  		log.setIp(IpAddress);
  		log.setSysName(sysAccount);
  		log.setOpType("0");
  		log.setUserId(loginObj.getUserid());
  		log.setUserName(loginObj.getUsername());
  		tSysOptLogDao.save(log);
      }

	@Override
	public void saveLog(LoginObj loginObj,String type,String content) {
		TSysOptLogModel sysOptLogModel = new TSysOptLogModel(
				CreateUUID.createUUID(),
				loginObj.getUserid(), 
				loginObj.getUsername(), 
				loginObj.getSysAccount(),
				type, content);
		sysOptLogModel.setIp(loginObj.getIpAddress());
		tSysOptLogDao.save(sysOptLogModel);
		
	}
}
