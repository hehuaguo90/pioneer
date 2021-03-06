package  com.wellsys.pioneer.module.tFormRight.model;

import  java.lang.String;
import java.util.List;

/**
* 数据实体定义。
* TABLE CODE:	t_form_right;
* TABLE NAME:	
* TABLE REMARK:	填报权限
* code tools version V1.0,created on Fri Dec 02 11:48:29 CST 2016
*/

public class TFormRightModel implements java.io.Serializable {

    /**
    *FIELD CODE:    right_id
    *FIELD NAME:    主键id
    *FIELD REMARKS: 主键id
    */
    private   String   rightId ="";
    /**
    *FIELD CODE:    form_id
    *FIELD NAME:    外键，表单id
    *FIELD REMARKS: 外键，表单id
    */
    private   String   formId ="";
    /**
    *FIELD CODE:    role_id
    *FIELD NAME:    外键，角色id
    *FIELD REMARKS: 外键，角色id
    */
    private   String   roleId ="";
    /**
    *FIELD CODE:    right_type
    *FIELD NAME:    权限类型
    *FIELD REMARKS: 权限类型：0填报权限，1审核权限（字典表）
    */
    private   String   rightType ="";


    // Constructors
	/** default constructor */
	public TFormRightModel() {
	}


    public String getRightId(){
        return this.rightId;
    }
    public void setRightId(String rightId){
        this.rightId = rightId;
    }

    public String getFormId(){
        return this.formId;
    }
    public void setFormId(String formId){
        this.formId = formId;
    }

    public String getRoleId(){
        return this.roleId;
    }
    public void setRoleId(String roleId){
        this.roleId = roleId;
    }

    public String getRightType(){
        return this.rightType;
    }
    public void setRightType(String rightType){
        this.rightType = rightType;
    }

}
