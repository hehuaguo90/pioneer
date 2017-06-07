package  com.wellsys.pioneer.module.tSysUser.model;

import  java.sql.Timestamp;
import  java.lang.String;
import java.util.List;

/**
* 数据实体定义。
* TABLE CODE:	t_sys_user;
* TABLE NAME:	
* TABLE REMARK:	用户信息
* code tools version V1.0,created on Fri Dec 02 11:48:36 CST 2016
*/

public class TSysUserModel implements java.io.Serializable {

    /**
    *FIELD CODE:    user_id
    *FIELD NAME:    主键，用户id
    *FIELD REMARKS: 主键，用户id
    */
    private   String   userId ="";
    /**
    *FIELD CODE:    area_id
    *FIELD NAME:    外键，所属地区id
    *FIELD REMARKS: 外键，所属地区id
    */
    private   String   areaId ="";
    
    private   String   pid ="";
    
    /**
    *FIELD CODE:    user_name
    *FIELD NAME:    用户姓名
    *FIELD REMARKS: 用户姓名
    */
    private   String   userName ="";
    /**
    *FIELD CODE:    sys_account
    *FIELD NAME:    系统登录名
    *FIELD REMARKS: 系统登录名
    */
    private   String   sysAccount ="";
    /**
    *FIELD CODE:    sys_password
    *FIELD NAME:    系统登录密码
    *FIELD REMARKS: 系统登录密码
    */
    private   String   sysPassword ="";
    /**
    *FIELD CODE:    user_tel
    *FIELD NAME:    座机
    *FIELD REMARKS: 座机
    */
    private   String   userTel ="";
    /**
    *FIELD CODE:    user_mobile
    *FIELD NAME:    手机
    *FIELD REMARKS: 手机
    */
    private   String   userMobile ="";
    /**
    *FIELD CODE:    status
    *FIELD NAME:    用户状态
    *FIELD REMARKS: 用户状态：0，停用；1，正常；2：删除；（字典表）, default=1
    */
    private   String   status ="";
    /**
    *FIELD CODE:    create_time
    *FIELD NAME:    创建时间
    *FIELD REMARKS: 创建时间
    */
    private   Timestamp   createTime ;
    /**
    *FIELD CODE:    last_log_time
    *FIELD NAME:    最后登陆时间
    *FIELD REMARKS: 最后登陆时间
    */
    private   Timestamp   lastLogTime ;
    /**
    *FIELD CODE:    log_error_count
    *FIELD NAME:    错误登陆次数
    *FIELD REMARKS: 错误登陆次数，default=0
    */
    private   int   logErrorCount ;
    /**
    *FIELD CODE:    remark
    *FIELD NAME:    备注
    *FIELD REMARKS: 备注
    */
    private   String   remark ="";

    // Constructors
	/** default constructor */
	public TSysUserModel() {
	}


    public String getUserId(){
        return this.userId;
    }
    public void setUserId(String userId){
        this.userId = userId;
    }

    public String getAreaId(){
        return this.areaId;
    }
    public void setAreaId(String areaId){
        this.areaId = areaId;
    }

    public String getUserName(){
        return this.userName;
    }
    public void setUserName(String userName){
        this.userName = userName;
    }

    public String getSysAccount(){
        return this.sysAccount;
    }
    public void setSysAccount(String sysAccount){
        this.sysAccount = sysAccount;
    }

    public String getSysPassword(){
        return this.sysPassword;
    }
    public void setSysPassword(String sysPassword){
        this.sysPassword = sysPassword;
    }

    public String getUserTel(){
        return this.userTel;
    }
    public void setUserTel(String userTel){
        this.userTel = userTel;
    }

    public String getUserMobile(){
        return this.userMobile;
    }
    public void setUserMobile(String userMobile){
        this.userMobile = userMobile;
    }

    public String getStatus(){
        return this.status;
    }
    public void setStatus(String status){
        this.status = status;
    }

    public Timestamp getCreateTime(){
        return this.createTime;
    }
    public void setCreateTime(Timestamp createTime){
        this.createTime = createTime;
    }

    public Timestamp getLastLogTime(){
        return this.lastLogTime;
    }
    public void setLastLogTime(Timestamp lastLogTime){
        this.lastLogTime = lastLogTime;
    }

    public int getLogErrorCount(){
        return this.logErrorCount;
    }
    public void setLogErrorCount(int logErrorCount){
        this.logErrorCount = logErrorCount;
    }

    public String getRemark(){
        return this.remark;
    }
    public void setRemark(String remark){
        this.remark = remark;
    }

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}
}
