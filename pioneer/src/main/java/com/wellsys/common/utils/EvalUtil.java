package com.wellsys.common.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 满意度计算复杂类
 * @author Deng Xiao Ming
 * @date 2016-8-4 下午4:09:50
 *
 */
public class EvalUtil {
	 public static String INDEX_REG = "\\$(\\w+)";//提取指标
	 public static String MODELPARAM_REG = "@([A-Za-z]+)";//提取参数
	
   /**
	 * 获取方法中的全部指标
	 * @param method 方法内容
	 * @return
	 */
	public static List<String> getMatchStr(String target, String reg){
		Pattern p = Pattern.compile(reg);
		Matcher m = p.matcher(target);
		List<String> list = new ArrayList<String>();
		if(m == null){
			return list;
		}
		//重复匹配
		while(m.find()){
			list.add(m.group(1));
		}
		
		return list;
	}
	
	/**
	 * 获取方法中的全部参数
	 * @param method 方法内容
	 * @return
	 */
//	private static List<String> getMethodParam(String method){
//		Pattern p = Pattern.compile("\\@(\\w+)");
//		Matcher m = p.matcher(method);
//		List<String> list = new ArrayList<String>();
//		//重复匹配
//		while(m.find()){
//			list.add(m.group(1));
//		}
//		
//		return list;
//	}
}
