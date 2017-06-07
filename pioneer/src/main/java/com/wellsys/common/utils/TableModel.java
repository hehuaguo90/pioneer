package com.wellsys.common.utils;



import java.io.File;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


/**
 * Created by zhyy on 2015/8/26.
 * 表模型信息描述
 */
public class TableModel{
	 private String tableCode = "";//表英文名称
	 private String tableName = "";//表中文名称
	 private String tableDesc = "";//表描述信息
	public String getTableCode() {
		return tableCode;
	}
	public void setTableCode(String tableCode) {
		this.tableCode = tableCode;
	}
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public String getTableDesc() {
		return tableDesc;
	}
	public void setTableDesc(String tableDesc) {
		this.tableDesc = tableDesc;
	}
}
