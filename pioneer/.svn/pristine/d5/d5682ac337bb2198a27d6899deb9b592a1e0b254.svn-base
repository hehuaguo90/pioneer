package  com.wellsys.pioneer.module.tSysOptLog.model;

import  java.sql.Timestamp;
import  java.lang.String;
import java.util.List;

/**
* 数据实体定义。
* TABLE CODE:	t_sys_opt_log;
* TABLE NAME:	
* TABLE REMARK:	系统日志
* code tools version V1.0,created on Fri Dec 02 11:48:35 CST 2016
*/

public class TSysOptLogModel implements java.io.Serializable {

    /**
    *FIELD CODE:    log_id
    *FIELD NAME:    主键id
    *FIELD REMARKS: 主键id
    */
    private   String   logId ="";
    /**
    *FIELD CODE:    user_id
    *FIELD NAME:    操作人Id
    *FIELD REMARKS: 操作人Id
    */
    private   String   userId ="";
    /**
    *FIELD CODE:    user_name
    *FIELD NAME:    操作人姓名
    *FIELD REMARKS: 操作人姓名
    */
    private   String   userName ="";
    /**
    *FIELD CODE:    sys_name
    *FIELD NAME:    操作人账号
    *FIELD REMARKS: 操作人账号
    */
    private   String   sysName ="";
    /**
    *FIELD CODE:    role_name
    *FIELD NAME:    操作人角色名
    *FIELD REMARKS: 操作人角色名
    */
    private   String   roleName ="";
    /**
    *FIELD CODE:    op_time
    *FIELD NAME:    操作时间
    *FIELD REMARKS: 操作时间
    */
    private   Timestamp   opTime ;
    /**
    *FIELD CODE:    op_type
    *FIELD NAME:    操作类型
    *FIELD REMARKS: 操作类型，包括系统登陆0，数据的增1、删2、改 3 (字典表)
    */
    private   String   opType ="";
    /**
    *FIELD CODE:    content
    *FIELD NAME:    操作内容
    *FIELD REMARKS: 操作内容
    */
    private   String   content ="";
    /**
    *FIELD CODE:    ip
    *FIELD NAME:    操作人IP
    *FIELD REMARKS: 操作人IP
    */
    private   String   ip ="";


    // Constructors
	/** default constructor */
	public TSysOptLogModel() {
	}

	public TSysOptLogModel(String logId,String userId,String userName,String sysName,String opType,String content) {
		this.logId = logId;
		this.userId = userId;
		this.userName = userName;
		this.sysName = sysName;
		this.opType = opType;
		this.content = content;
		this.opTime = new Timestamp(System.currentTimeMillis()); 
	}
	
    public String getLogId(){
        return this.logId;
    }
    public void setLogId(String logId){
        this.logId = logId;
    }

    public String getUserId(){
        return this.userId;
    }
    public void setUserId(String userId){
        this.userId = userId;
    }

    public String getUserName(){
        return this.userName;
    }
    public void setUserName(String userName){
        this.userName = userName;
    }

    public String getSysName(){
        return this.sysName;
    }
    public void setSysName(String sysName){
        this.sysName = sysName;
    }

    public String getRoleName(){
        return this.roleName;
    }
    public void setRoleName(String roleName){
        this.roleName = roleName;
    }

    public Timestamp getOpTime(){
        return this.opTime;
    }
    public void setOpTime(Timestamp opTime){
        this.opTime = opTime;
    }

    public String getOpType(){
        return this.opType;
    }
    public void setOpType(String opType){
        this.opType = opType;
    }

    public String getContent(){
        return this.content;
    }
    public void setContent(String content){
        this.content = content;
    }

    public String getIp(){
        return this.ip;
    }
    public void setIp(String ip){
        this.ip = ip;
    }

}
