package com.wellsys.pioneer.module.tLoginObj.model;

import java.util.List;

import com.wellsys.pioneer.module.tSysRight.model.TSysRightModel;

public class LoginObj {
	private String userid;//用户id
	private String sysAccount;//用户账号
	private String username; //用户姓名
	private String ipAddress;//登陆ip
	private String roleName;//角色名称，多个用,号隔开
	private String sysName;//暂未使用
	private List rightUrl;//权限地址集合
	private List<TSysRightModel> rightList;//权限对象集合
	/**
	 * 所属地区id，如果是畜牧站用户是区域Id,如果是企业用户是企业编码
	 */
	private String areaId;
	/**
	 * 所属机构id，如果是畜牧站用户是机构Id,如果是企业用户是企业id
	 */
	private String orgId;
	
	 /**
	  * 机构名称，如果是企业则是企业名称
	  */
	private String orgName;
	 
	/**
	 * 所属行政区，如果是企业，则显示‘企业’
	 */
	private String areaName;
	
	private String stepseqId;//步骤id
	private String areaLevel;//地区级别
	
	/**
	 * 地区code前缀，市取前3位,区县前6位，乡镇前9位，其余完整编码
	 */
	private String areaPrefix;
	
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getIpAddress() {
		return ipAddress;
	}
	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getSysName() {
		return sysName;
	}
	public void setSysName(String sysName) {
		this.sysName = sysName;
	}
	public List<TSysRightModel> getRightList() {
		return rightList;
	}
	public void setRightList(List<TSysRightModel> rightList) {
		this.rightList = rightList;
	}
	public List getRightUrl() {
		return rightUrl;
	}
	public void setRightUrl(List rightUrl) {
		this.rightUrl = rightUrl;
	}
	public String getSysAccount() {
		return sysAccount;
	}
	public void setSysAccount(String sysAccount) {
		this.sysAccount = sysAccount;
	}
	public String getAreaId() {
		return areaId;
	}
	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}
	public String getStepseqId() {
		return stepseqId;
	}
	public void setStepseqId(String stepseqId) {
		this.stepseqId = stepseqId;
	}
	public String getAreaLevel() {
		return areaLevel;
	}
	public void setAreaLevel(String areaLevel) {
		this.areaLevel = areaLevel;
	}
	public String getOrgId() {
		return orgId;
	}
	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	public String getOrgName() {
		return orgName;
	}
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	public String getAreaPrefix() {
		return areaPrefix;
	}
	public void setAreaPrefix(String areaPrefix) {
		this.areaPrefix = areaPrefix;
	}
}
