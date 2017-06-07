package com.wellsys.common.utils;

public class Constant {
	/**
	 * 	系统日志插入类型 -增加
	 */
	public final static String INSERT = "1";
	/**
	 * 	系统日志插入类型 -删除
	 */
	public final static String DELETE = "2";
	/**
	 * 	系统日志插入类型 -修改
	 */
	public final static String UPDATE = "3";
	/**
	 * 	系统日志插入类型 -其它
	 */
	public final static String OTHER = "4";
	
	
	/** 系统分组类型 */
	/**
	 * 指标分组
	 */
	public final static String INDEX_GROUP = "4";
	
	/**
	 * 数据源分组
	 */
	public final static String SOURCE_GROUP = "3";
	
	/**
	 * 启用状态
	 */
	public final static String QY = "1";
	
	/**
	 * 填报和分析的频度：周
	 */
	public final static String PERIOD_WEEK = "1";
	
	/**
	 * 填报和分析的频度：月
	 */
	public final static String PERIOD_MONTH = "2";
	
	/**
	 * 填报和分析的频度：季度
	 */
	public final static String PERIOD_QUARTER = "3";
	
	/**
	 * 填报和分析的频度：年
	 */
	public final static String PERIOD_YEAR = "4";
	
	/**
	 * 填报不限制
	 */
	public final static String PERIOD_NOT_LIMT = "0";
	
	/**
	 * Oralce数据库类型
	 */
	public final static String DB_ORACLE = "1";
	
	/**
	 * mysql数据库类型
	 */
	public final static String DB_MYSQL = "2";
	
	/**
	 * sqlserver数据库类型
	 */
	public final static String DB_SQLSERVER = "3";
	/**
	 * 重庆市行政区划
	 */
	public final static String CITY = "500000000000";
	
	/**
	 * 是否可见，1是，0否
	 */
	public final static String IS_SHOW_Y = "1";
	public final static String IS_SHOW_N = "0";
	
	/*规则类型*/
	/**
	 * 长度范围
	 */
	public final static String RULE_LENGTH_RANGE = "1";
	
	/**
	 * 数字范围
	 */
	public final static String RULE_NUMBER_RANGE = "2";
	
	/**
	 * 日期范围
	 */
	public final static String RULE_DATE_RANGE = "3";
	
	/**
	 * 不为空
	 */
	public final static String RULE_NOT_NULL = "4";
	
	/**
	 * 正则表达式
	 */
	public final static String RULE_REG = "5";
	
	
	/*登陆类型*/
	
	/**
	 * 平台登陆
	 */
	public static final String LOGIN_WEB = "1";
	
	/**
	 * 登录后台
	 */
	public static final String LOGIN_CONSOLE = "2";
	
	/**
	 * 分析手机端
	 */
	public static final String LOGIN_CHART_ME = "3";
	
	/**
	 * 表单查看
	 */
	public static final String VIEW = "view";
	/**
	 * 表单编辑
	 */
	public static final String EDIT = "edit";
	/**
	 * 文件分割
	 */
	public static final String SEPARATE = "/";
	/**
	 * MODULE
	 */
	public static final String MODULE = "module";
	
	/**
	 * 警告级别
	 */
	public static final String RULE_LEVEL_WAR = "0";
	
	/**
	 * 错误级别
	 */
	public static final String RULE_LEVEL_ERR = "1";
	
	/*分组类型*/
	/**
	 * 1表单
	 */
	public static final String GROUP_FORM = "1";
	/**
	 * 2报表
	 */
	public static final String GROUP_REPORT = "2";
	
	/**
	 * 3数据资源
	 */
	public static final String GROUP_SOURCE = "3";
	
	/**
	 * 4指标
	 */
	public static final String GROUP_INDEX = "4";
	
	/**
	 * 5专题图
	 */
	public static final String GROUP_CHART = "5";
 
	/**
	 * 表单填报权限
	 */
	public static final String FORM_REPORT_RIGHT = "0";
	
	/**
	 * 表单审核权限
	 */
	public static final String FORM_CHECK_RIGHT = "1";
	
	/*流程阶段 市1，区县2，乡镇3，村4，站/场5*/
	/**
	 * 市级
	 */
	public static final String SJ = "1";
	/**
	 * 区县级别
	 */
	public static final String QXJ = "2";
	/**
	 * 乡镇级别
	 */
	public static final String XZJ = "3";
	/**
	 * 村级
	 */
	public static final String CJ = "4";
	/**
	 * 企业，场站级别
	 */
	public static final String CZ = "5";
	
	/*代填报权限*/
	/**
	 * 村
	 */
	public static final String PRIGHT_FORM_CJ = "0";
	/**
	 * 企业
	 */
	public static final String PRIGHT_FORM_QY = "1";
	/**
	 * 填报权限
	 */
	public static final String ROLE_TIANBAO = "0";
	/**
	 * 审核权限
	 */
	public static final String ROLE_SHENGHE = "1";
	
}
