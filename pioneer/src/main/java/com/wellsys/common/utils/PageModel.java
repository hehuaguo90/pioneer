package com.wellsys.common.utils;

import java.util.List;

public class PageModel {
	private long total;
	private List<?> rows;

	public PageModel() {
		super();
	}

	public PageModel(long total, List<?> rows) {
		super();
		this.total = total;
		this.rows = rows;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public List<?> getRows() {
		return rows;
	}

	public void setRows(List<?> rows) {
		this.rows = rows;
	}

}
