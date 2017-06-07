package com.wellsys.common.utils;


public class MessageModel {
	public Integer status;
	public String message;
	public String json;
	public MessageModel() {
	}

	public MessageModel(Integer status, String message, String json) {
		super();
		this.status = status;
		this.message = message;
		this.json = json;
	}

	public MessageModel(Integer status, String message) {
		this.status = status;
		this.message = message;
	}

	public Integer getStatus() {
		return status;
	}

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
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
	
//	public JSONObject getJson(){
//		System.out.println(instance.getStatus());
//		System.out.println(22);
//		return JSONObject.fromObject(instance);
//	}
}
