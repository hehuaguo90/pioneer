package  com.wellsys.pioneer.module.tSysComp.model;

import  java.lang.String;
import java.util.List;

/**
* 数据实体定义。
* TABLE CODE:	t_sys_comp;
* TABLE NAME:	
* TABLE REMARK:	企业信息
* code tools version V1.0,created on Wed Jan 04 10:51:25 CST 2017
*/

public class TSysCompModel implements java.io.Serializable {

    /**
    *FIELD CODE:    comp_id
    *FIELD NAME:    主键，企业id
    *FIELD REMARKS: 主键，机构id
    */
    private   String   compId ="";
    /**
    *FIELD CODE:    org_id
    *FIELD NAME:    外键，所属组织id
    *FIELD REMARKS: 外键，所属组织id
    */
    private   String   orgId ="";
    /**
    *FIELD CODE:    comp_name
    *FIELD NAME:    企业名称
    *FIELD REMARKS: 机构名称/fq
    */
    private   String   compName ="";
    /**
    *FIELD CODE:    comp_code
    *FIELD NAME:    企业编码
    *FIELD REMARKS: 企业编码
    */
    private   String   compCode ="";
    /**
    *FIELD CODE:    stepseq_id
    *FIELD NAME:    外键，步骤阶段default=5
    *FIELD REMARKS: 外键，步骤阶段default=5
    */
    private   int   stepseqId ;
    /**
    *FIELD CODE:    area_level
    *FIELD NAME:    地区级别, default=5
    *FIELD REMARKS: 地区级别, default=5
    */
    private   int   areaLevel ;
    /**
    *FIELD CODE:    show_order
    *FIELD NAME:    显示顺序,default=1
    *FIELD REMARKS: 显示顺序,default=1
    */
    private   int   showOrder ;
    /**
    *FIELD CODE:    remark
    *FIELD NAME:    备注
    *FIELD REMARKS: 备注
    */
    private   String   remark ="";


    // Constructors
	/** default constructor */
	public TSysCompModel() {
	}


    public String getCompId(){
        return this.compId;
    }
    public void setCompId(String compId){
        this.compId = compId;
    }

    public String getOrgId(){
        return this.orgId;
    }
    public void setOrgId(String orgId){
        this.orgId = orgId;
    }

    public String getCompName(){
        return this.compName;
    }
    public void setCompName(String compName){
        this.compName = compName;
    }

    public String getCompCode(){
        return this.compCode;
    }
    public void setCompCode(String compCode){
        this.compCode = compCode;
    }

    public int getStepseqId(){
        return this.stepseqId;
    }
    public void setStepseqId(int stepseqId){
        this.stepseqId = stepseqId;
    }

    public int getAreaLevel(){
        return this.areaLevel;
    }
    public void setAreaLevel(int areaLevel){
        this.areaLevel = areaLevel;
    }

    public int getShowOrder(){
        return this.showOrder;
    }
    public void setShowOrder(int showOrder){
        this.showOrder = showOrder;
    }

    public String getRemark(){
        return this.remark;
    }
    public void setRemark(String remark){
        this.remark = remark;
    }

}
