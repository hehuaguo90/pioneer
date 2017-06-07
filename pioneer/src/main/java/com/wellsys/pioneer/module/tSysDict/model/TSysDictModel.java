package  com.wellsys.pioneer.module.tSysDict.model;

import  java.lang.String;
import java.util.List;

/**
* 数据实体定义。
* TABLE CODE:	t_sys_dict;
* TABLE NAME:	
* TABLE REMARK:	数据字典表
* code tools version V1.0,created on Fri Dec 02 11:48:34 CST 2016
*/

public class TSysDictModel implements java.io.Serializable {

    /**
    *FIELD CODE:    dict_id
    *FIELD NAME:    主键，id
    *FIELD REMARKS: 主键，id
    */
    private   String   dictId ="";
    /**
    *FIELD CODE:    type
    *FIELD NAME:    字典类型
    *FIELD REMARKS: 字典类型
    */
    private   String   type ="";
    /**
    *FIELD CODE:    code
    *FIELD NAME:    字典代码
    *FIELD REMARKS: 字典代码
    */
    private   String   code ="";
    /**
    *FIELD CODE:    name
    *FIELD NAME:    名称
    *FIELD REMARKS: 名称
    */
    private   String   name ="";
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
	public TSysDictModel() {
	}


    public String getDictId(){
        return this.dictId;
    }
    public void setDictId(String dictId){
        this.dictId = dictId;
    }

    public String getType(){
        return this.type;
    }
    public void setType(String type){
        this.type = type;
    }

    public String getCode(){
        return this.code;
    }
    public void setCode(String code){
        this.code = code;
    }

    public String getName(){
        return this.name;
    }
    public void setName(String name){
        this.name = name;
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
