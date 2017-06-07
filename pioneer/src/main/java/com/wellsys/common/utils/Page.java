package com.wellsys.common.utils;

import java.util.Map;

/**
 * 分页类
 * 
 * @author Administrator
 */
public class Page {
	private int pageNumber = 10;// 每页显示数量
	private int recordCount = 0;// 总记录显示
	private int pageCount = 1;// 总页数
	private int pageIndex = 1;// 当前页数编号
//	private Object[] param ;
//	Map<Object, Object> sessionMap = null;

	
//	public Page(Map<Object, Object> sessionMap){
//		
//		if (this.sessionMap==null) {
//			this.sessionMap = sessionMap;
//		}
//		 
//	}
	
//	public Map<Object, Object> getSessionMap() {
//		return sessionMap;
//	}
//
//	public void setSessionMap(Map<Object, Object> sessionMap) {
//		this.sessionMap = sessionMap;
//	}

	/**
	 * 获取每页显示数量
	 */
	public int getPageNumber() {
//		if(sessionMap!=null&&sessionMap.get("pageNumber")!=null){
//			return Integer.parseInt(sessionMap.get("pageNumber").toString());
//		}
		return pageNumber;
	}

	/**
	 * 设置每页显示数量
	 * 
	 * @param pageNumber
	 */
	public void setPageNumber(int pageNumber) {
		try {
			this.pageNumber = pageNumber;
		} catch (Exception e) {
			// TODO: handle exception
			this.pageNumber = 1;
		}
		if (pageNumber < 1) {
			this.pageNumber = 1;
		}
		if (pageNumber > 100) {
			this.pageNumber = 100;
		}
//		if (this.sessionMap!=null) {
//			this.sessionMap.put("pageNumber", pageNumber);
//		}
		
	}

	public int getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(int recordCount) {
		this.recordCount = recordCount;
		if (recordCount < 0) {
			this.recordCount = 0;
		}

	}

	public int getPageCount() {
		this.pageCount = this.recordCount / this.pageNumber;
		if (this.recordCount % this.pageNumber != 0) {
			this.pageCount++;
		}
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
		
	}

	public int getPageIndex() {
		if (pageIndex < 1) {
			this.pageIndex = 1;
		}
		getPageCount();
		if (pageIndex > pageCount) {
			pageIndex = pageCount;
		}
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

//	public Object[] getParam() {
//		return param;
//	}
//
//	public void setParam(Object[] param) {
//		this.param = param;
//	}

}
