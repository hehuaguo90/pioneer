package  com.wellsys.pioneer.module.tSysRight.model;

import  java.lang.String;
import java.util.List;

/**
* 数据实体定义。
* TABLE CODE:	t_sys_right;
* TABLE NAME:	
* TABLE REMARK:	权限信息
* code tools version V1.0,created on Fri Dec 02 11:48:35 CST 2016
*/

public class TSysRightModel implements java.io.Serializable {

    /**
    *FIELD CODE:    right_id
    *FIELD NAME:    主键，角色id
    *FIELD REMARKS: 主键，角色id
    */
    private   String   rightId ="";
    /**
    *FIELD CODE:    pid
    *FIELD NAME:    上级Id
    *FIELD REMARKS: 上级Id
    */
    private   String   pid ="";
    /**
    *FIELD CODE:    right_name
    *FIELD NAME:    权限名称
    *FIELD REMARKS: 角色名称
    */
    private   String   rightName ="";
    /**
    *FIELD CODE:    show_order
    *FIELD NAME:    显示顺序
    *FIELD REMARKS: 显示顺序，default=1
    */
    private   int   showOrder ;
    /**
    *FIELD CODE:    right_url
    *FIELD NAME:    权限地址
    *FIELD REMARKS: 权限地址
    */
    private   String   rightUrl ="";
    /**
     *FIELD CODE:    right_type
     *FIELD NAME:    权限类型
     *FIELD REMARKS: 权限类型
     */
     private   String   rightType ="";
     
    /**
    *FIELD CODE:    remark
    *FIELD NAME:    备注
    *FIELD REMARKS: 备注
    */
    private   String   remark ="";
    
    private   String   logoUrl ="";
    
    private   String   isEnable ="";


    // Constructors
	/** default constructor */
	public TSysRightModel() {
	}


    public String getRightId(){
        return this.rightId;
    }
    public void setRightId(String rightId){
        this.rightId = rightId;
    }

    public String getPid(){
        return this.pid;
    }
    public void setPid(String pid){
        this.pid = pid;
    }

    public String getRightName(){
        return this.rightName;
    }
    public void setRightName(String rightName){
        this.rightName = rightName;
    }

    public int getShowOrder(){
        return this.showOrder;
    }
    public void setShowOrder(int showOrder){
        this.showOrder = showOrder;
    }

    public String getRightUrl(){
        return this.rightUrl;
    }
    public void setRightUrl(String rightUrl){
        this.rightUrl = rightUrl;
    }

    public String getRemark(){
        return this.remark;
    }
    public void setRemark(String remark){
        this.remark = remark;
    }

	public String getRightType() {
		return rightType;
	}
	public void setRightType(String rightType) {
		this.rightType = rightType;
	}

	public String getLogoUrl() {
		return logoUrl;
	}

	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}

	public String getIsEnable() {
		return isEnable;
	}

	public void setIsEnable(String isEnable) {
		this.isEnable = isEnable;
	}
}
