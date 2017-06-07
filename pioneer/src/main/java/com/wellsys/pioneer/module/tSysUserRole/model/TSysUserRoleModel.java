package  com.wellsys.pioneer.module.tSysUserRole.model;

import  java.lang.String;
import java.util.List;

/**
* 数据实体定义。
* TABLE CODE:	t_sys_user_role;
* TABLE NAME:	
* TABLE REMARK:	用户角色关联表
* code tools version V1.0,created on Fri Dec 02 11:48:36 CST 2016
*/

public class TSysUserRoleModel implements java.io.Serializable {

    /**
    *FIELD CODE:    user_role_id
    *FIELD NAME:    主键,id
    *FIELD REMARKS: 主键,id
    */
    private   String   userRoleId ="";
    /**
    *FIELD CODE:    role_id
    *FIELD NAME:    外键，角色id
    *FIELD REMARKS: 外键，角色id
    */
    private   String   roleId ="";
    /**
    *FIELD CODE:    user_id
    *FIELD NAME:    外键，用户Id
    *FIELD REMARKS: 外键，用户Id
    */
    private   String   userId ="";


    // Constructors
	/** default constructor */
	public TSysUserRoleModel() {
	}


    public String getUserRoleId(){
        return this.userRoleId;
    }
    public void setUserRoleId(String userRoleId){
        this.userRoleId = userRoleId;
    }

    public String getRoleId(){
        return this.roleId;
    }
    public void setRoleId(String roleId){
        this.roleId = roleId;
    }

    public String getUserId(){
        return this.userId;
    }
    public void setUserId(String userId){
        this.userId = userId;
    }

}
