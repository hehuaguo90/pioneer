package  com.wellsys.pioneer.module.tSysAreaUnite.model;

import  java.lang.String;
import java.util.List;

/**
* 数据实体定义。
* TABLE CODE:	t_sys_area_unite;
* TABLE NAME:	
* TABLE REMARK:	功能区域关联表
* code tools version V1.0,created on Fri Dec 02 11:48:34 CST 2016
*/

public class TSysAreaUniteModel implements java.io.Serializable {

    /**
    *FIELD CODE:    unite_id
    *FIELD NAME:    主键id
    *FIELD REMARKS: 主键id
    */
    private   String   uniteId ="";
    /**
    *FIELD CODE:    carea_id
    *FIELD NAME:    功能区域id
    *FIELD REMARKS: 功能区域id
    */
    private   String   careaId ="";
    /**
    *FIELD CODE:    area_id
    *FIELD NAME:    地区id
    *FIELD REMARKS: 地区id
    */
    private   String   areaId ="";


    // Constructors
	/** default constructor */
	public TSysAreaUniteModel() {
	}


    public String getUniteId(){
        return this.uniteId;
    }
    public void setUniteId(String uniteId){
        this.uniteId = uniteId;
    }

    public String getCareaId(){
        return this.careaId;
    }
    public void setCareaId(String careaId){
        this.careaId = careaId;
    }

    public String getAreaId(){
        return this.areaId;
    }
    public void setAreaId(String areaId){
        this.areaId = areaId;
    }

}
