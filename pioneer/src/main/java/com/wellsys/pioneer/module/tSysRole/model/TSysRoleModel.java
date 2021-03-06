package  com.wellsys.pioneer.module.tSysRole.model;

import  java.lang.String;
import java.util.List;

/**
* 数据实体定义。
* TABLE CODE:	t_sys_role;
* TABLE NAME:	
* TABLE REMARK:	角色信息
* code tools version V1.0,created on Fri Dec 02 11:48:35 CST 2016
*/

public class TSysRoleModel implements java.io.Serializable {

    /**
    *FIELD CODE:    role_id
    *FIELD NAME:    主键，角色id
    *FIELD REMARKS: 主键，角色id
    */
    private   String   roleId ="";

    /**
    *FIELD CODE:    role_name
    *FIELD NAME:    角色名称
    *FIELD REMARKS: 角色名称
    */
    private   String   roleName ="";
    /**
    *FIELD CODE:    remark
    *FIELD NAME:    备注
    *FIELD REMARKS: 备注
    */
    private   String   remark ="";


    // Constructors
	/** default constructor */
	public TSysRoleModel() {
	}


    public String getRoleId(){
        return this.roleId;
    }
    public void setRoleId(String roleId){
        this.roleId = roleId;
    }



    public String getRoleName(){
        return this.roleName;
    }
    public void setRoleName(String roleName){
        this.roleName = roleName;
    }

    public String getRemark(){
        return this.remark;
    }
    public void setRemark(String remark){
        this.remark = remark;
    }

}
