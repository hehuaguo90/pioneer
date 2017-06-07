package  com.wellsys.pioneer.module.tSysJxs.model;

import  java.lang.String;

/**
* 数据实体定义。
* TABLE CODE:	t_sys_db_record;
* TABLE NAME:	
* TABLE REMARK:	数据库操作记录
* code tools version V1.0,created on Fri Dec 23 14:20:58 CST 2016
*/

public class TSysJxsModel implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 100085159882545459L;
	private String id="";
	private String area="";
	private String clcode="";
	private String adcode99="";
	private String name99="";
	private String sh2="";
	private String di2="";
	private String x2="";
	private String centroid_y="";
	private String centroid_x="";
	private String geometry="";
	private String ssqx="";
	private String info="";
	private String bak="";
	private String pic="";
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getClcode() {
		return clcode;
	}
	public void setClcode(String clcode) {
		this.clcode = clcode;
	}
	public String getAdcode99() {
		return adcode99;
	}
	public void setAdcode99(String adcode99) {
		this.adcode99 = adcode99;
	}
	public String getName99() {
		return name99;
	}
	public void setName99(String name99) {
		this.name99 = name99;
	}
	public String getSh2() {
		return sh2;
	}
	public void setSh2(String sh2) {
		this.sh2 = sh2;
	}
	public String getDi2() {
		return di2;
	}
	public void setDi2(String di2) {
		this.di2 = di2;
	}
	public String getX2() {
		return x2;
	}
	public void setX2(String x2) {
		this.x2 = x2;
	}
	public String getCentroid_y() {
		return centroid_y;
	}
	public void setCentroid_y(String centroid_y) {
		this.centroid_y = centroid_y;
	}
	public String getCentroid_x() {
		return centroid_x;
	}
	public void setCentroid_x(String centroid_x) {
		this.centroid_x = centroid_x;
	}
	public String getGeometry() {
		return geometry;
	}
	public void setGeometry(String geometry) {
		this.geometry = geometry;
	}
	public String getSsqx() {
		return ssqx;
	}
	public void setSsqx(String ssqx) {
		this.ssqx = ssqx;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	public String getBak() {
		return bak;
	}
	public void setBak(String bak) {
		this.bak = bak;
	}
	public String getPic() {
		return pic;
	}
	public void setPic(String pic) {
		this.pic = pic;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
 
}
