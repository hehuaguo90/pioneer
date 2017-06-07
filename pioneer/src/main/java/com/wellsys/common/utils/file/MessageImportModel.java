package com.wellsys.common.utils.file;

import java.util.List;

public class MessageImportModel {
	/**
	 * 导入状态：0成功，非0失败
	 */
	private Integer status;
	/**
	 * 显示的信息
	 */
	private String message;
	/**
	 * 服务器存储的临时文件名。
	 */
	private String filename;

	/**
	 * 预览数据
	 */
	private List data;


	public MessageImportModel() {
	}

	public MessageImportModel(Integer status, String message,
							  String filename,List data) {
		this.status = status;
		this.message = message;
		this.filename = filename;
		this.data=data;
	}
	public MessageImportModel(Integer status, String message,
							  String filename) {
		this.status = status;
		this.message = message;
		this.filename = filename;

	}
	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public List getData() {
		return data;
	}

	public void setData(List data) {
		this.data = data;
	}
}
