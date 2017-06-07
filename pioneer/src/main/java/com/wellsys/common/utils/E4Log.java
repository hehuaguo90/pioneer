package com.wellsys.common.utils;

import org.apache.log4j.Logger;

@SuppressWarnings("serial")
public class E4Log extends RuntimeException {
	private Logger log = Logger.getLogger(E4Log.class);
	private String errMessage;
	private String err;
	
	public String getErr() {
		return err;
	}

	public void setErr(String err) {
		this.err = err;
	}

	public String getErrMessage() {
		return errMessage;
	}

	public void setErrMessage(String errMessage) {
		this.errMessage = errMessage;
	}
	
	public E4Log(){
		super();
	}
	/*
	public E4Log(Exception e){
		super();
		StackTraceElement stacks = e.getStackTrace()[0];
		this.errMessage = "err:"+e.getMessage()+" "+stacks.getClassName()+" "+stacks.getLineNumber()+" "+stacks.getMethodName();
		Logger log = Logger.getLogger(this.getClass());
		log.error(this.getErrMessage());
		e.printStackTrace();
	}*/
	
	public E4Log(Exception e, String message){
		super();
		this.err = message;
		StackTraceElement stacks = e.getStackTrace()[0];
		this.errMessage = "err:"+message+"/n"+e.getMessage()+" "+stacks.getClassName()+" "+stacks.getLineNumber()+" "+stacks.getMethodName();
		log.error(this.getErrMessage());
		e.printStackTrace();
	}
	
	public E4Log(String message){
		super();
		this.errMessage = "err:"+message+"/n";
		log.error(this.getErrMessage());
	}
}
