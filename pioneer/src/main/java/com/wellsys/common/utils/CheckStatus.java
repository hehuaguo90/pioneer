package com.wellsys.common.utils;

public class CheckStatus {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	
	public static String getStatus(int status){
		String str = "";
		switch(status){
		case -1 :  
			str = "未填报";
	         break;
		case 0 :  
			str = "已填报";
	         break;
		case 1 :  
			str = "市级审核通过";
	         break;
		case 2 :  
			str = "市级审核未通过";
	         break;
		case 3 :  
			str = "区县审核通过";
	         break;
		case 4 :  
			str = "区县审核未通过";
	         break;
		}
	    return str;
	}

}
