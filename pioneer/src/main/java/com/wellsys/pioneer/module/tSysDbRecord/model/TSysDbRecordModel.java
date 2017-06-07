package  com.wellsys.pioneer.module.tSysDbRecord.model;

import  java.sql.Timestamp;
import  java.lang.String;
import java.util.List;

/**
* 数据实体定义。
* TABLE CODE:	t_sys_db_record;
* TABLE NAME:	
* TABLE REMARK:	数据库操作记录
* code tools version V1.0,created on Fri Dec 23 14:20:58 CST 2016
*/

public class TSysDbRecordModel implements java.io.Serializable {

    /**
    *FIELD CODE:    record_id
    *FIELD NAME:    主键id
    *FIELD REMARKS: 主键id
    */
    private   String   recordId ="";
    /**
    *FIELD CODE:    user_id
    *FIELD NAME:    外键，操作用户id
    *FIELD REMARKS: 外键，操作用户id
    */
    private   String   userId ="";
    /**
    *FIELD CODE:    file_name
    *FIELD NAME:    文件名
    *FIELD REMARKS: 文件名
    */
    private   String   fileName ="";
    /**
    *FIELD CODE:    begin_time
    *FIELD NAME:    操作时间
    *FIELD REMARKS: 操作时间
    */
    private   Timestamp   beginTime ;
    /**
    *FIELD CODE:    end_time
    *FIELD NAME:    完成时间
    *FIELD REMARKS: 完成时间
    */
    private   Timestamp   endTime ;
    /**
    *FIELD CODE:    record_type
    *FIELD NAME:    记录类型
    *FIELD REMARKS: 记录类型，0备份，1恢复
    */
    private   String   recordType ="";


    // Constructors
	/** default constructor */
	public TSysDbRecordModel() {
	}


    public String getRecordId(){
        return this.recordId;
    }
    public void setRecordId(String recordId){
        this.recordId = recordId;
    }

    public String getUserId(){
        return this.userId;
    }
    public void setUserId(String userId){
        this.userId = userId;
    }

    public String getFileName(){
        return this.fileName;
    }
    public void setFileName(String fileName){
        this.fileName = fileName;
    }

    public Timestamp getBeginTime(){
        return this.beginTime;
    }
    public void setBeginTime(Timestamp beginTime){
        this.beginTime = beginTime;
    }

    public Timestamp getEndTime(){
        return this.endTime;
    }
    public void setEndTime(Timestamp endTime){
        this.endTime = endTime;
    }

    public String getRecordType(){
        return this.recordType;
    }
    public void setRecordType(String recordType){
        this.recordType = recordType;
    }

}
