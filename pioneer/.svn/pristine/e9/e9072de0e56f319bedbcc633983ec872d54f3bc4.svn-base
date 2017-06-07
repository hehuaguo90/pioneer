package com.wellsys.common.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;


public class Util {
	private static Logger log=Logger.getLogger(Util.class);
	/**
	 * 获取客户端ip
	 * @date 2016-7-11 下午4:07:24
	 *
	 * @param request
	 * @return
	 */
	 public static String getIpAddr(HttpServletRequest request) { 
	        String ip = request.getHeader("x-forwarded-for"); 
	        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	            ip = request.getHeader("Proxy-Client-IP"); 
	        } 
	        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	            ip = request.getHeader("WL-Proxy-Client-IP"); 
	        } 
	        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	            ip = request.getRemoteAddr(); 
	        } 
	        return ip; 
	 }
	 
	 public static String clearNull(String str){
		 if("null".equals(str) || str == null)
			 return "";
		 else
			 return str;
	 }
	 /**
	  * 删除目录下的文件
	  * @param path
	  * @Author hehg
	  * @Date 2016-12-20 下午4:47:55
	  */
	 public static void delFile(String path){
		 try{
			 File file=new File(path);
			 if(file.exists()){
				 file.delete();
			 } 
		 }catch(Exception e){
			 log.error("delFile exception:  "+e);
		 }
	 }
	 
	 /******
	  * 数据格式化
	  * @param object
	  * @param style
	  * @return
	  */
	 public static String formatString(Object object,String style) {
		 DecimalFormat df = new DecimalFormat(style); 
		 return df.format(object);
	 }
	 /**
	  * 当前时间
	  * @param format
	  * @return
	  * @Author hehg
	  * @Date 2017-1-19 上午10:23:18
	  */
	 public static String getCurrentTime(String format){
		 if(format == null){
			 format ="yyyy-MM-dd HH:mm:ss";
		 }
		return new SimpleDateFormat(format).format(new Date());
	 }
	 /**
	  * 去掉小数点后面无用的零
	  * @param param
	  * @return
	  */
	 public static String replaceZero(String param) {
			if(param.indexOf(".") > 0){//参数包含小数点
				param = param.replaceAll("0+?$", "");//去掉后面无用的零

				param = param.replaceAll("[.]$", "");//如小数点后面全是零则去掉小数点
			}
			return param;
		}
	 
	 public static String decodeSpecialCharsWhenLikeUseBackslash(String content)
	    {
	        // 单引号是oracle字符串的边界,oralce中用2个单引号代表1个单引号
	        String afterDecode = content.replaceAll("'", "''");
	        // 由于使用了/作为ESCAPE的转义特殊字符,所以需要对该字符进行转义
	        // 这里的作用是将"a/a"转成"a//a"
//	        afterDecode = afterDecode.replaceAll("/", "//");
//	        // 使用转义字符 /,对oracle特殊字符% 进行转义,只作为普通查询字符，不是模糊匹配
//	        afterDecode = afterDecode.replaceAll("%", "/%");
//	        // 使用转义字符 /,对oracle特殊字符_ 进行转义,只作为普通查询字符，不是模糊匹配
//	        afterDecode = afterDecode.replaceAll("_", "/_");
	        return afterDecode;
	    }
	 
	 /**
	  * 判断是否为空:空字符串，null,undefined
	  * @param param 
	  * @return 为空 返回 false, 其他返回 true
	  */
	 public static boolean isNotBlank(Object param){
		 if(param == null || StringUtils.isBlank(param.toString()) || "undefined".equals(param)){
			 return false;
		 }
		 return true;
	 }
	 
	 /**
	  * 判断是否为空：空字符串，null,undefined
	  * @param param
	  * @return 为空 返回 true, 其他返回 false
	  */
	 public static boolean isBlank(Object param){
		 return !isNotBlank(param);
	 }
	 
	 /**
	  * 复制文件
	  * @param srcFileName 源文件路径
	  * @param destFileName  目的文件路径
	  * @param overlay 是否覆盖
	  * @return 是否复制成功
	  * @Author hehg
	  * @Date 2017-3-24 下午3:34:57
	  */
	    public static boolean copyFile(String srcFileName, String destFileName,  
	            boolean overlay) {  
	        File srcFile = new File(srcFileName);  
	        // 判断源文件是否存在  
	        if (!srcFile.isFile()) {  
	            return false;  
	        }  
	        // 判断目标文件是否存在  
	        File destFile = new File(destFileName);  
	        if (destFile.exists()) {  
	            // 如果目标文件存在并允许覆盖  
	            if (overlay) {  
	                // 删除已经存在的目标文件，无论目标文件是目录还是单个文件  
	                new File(destFileName).delete();  
	            }else{
	            	return false;
	            }  
	        } else {  
	            // 如果目标文件所在目录不存在，则创建目录  
	            if (!destFile.getParentFile().exists()) {  
	                // 目标文件所在目录不存在  
	                if (!destFile.getParentFile().mkdirs()) {  
	                    // 复制文件失败：创建目标文件所在目录失败  
	                    return false;  
	                }  
	            }  
	        }  
	        // 复制文件  
	        int byteread = 0; // 读取的字节数  
	        InputStream in = null;  
	        OutputStream out = null;  
	        try {  
	            in = new FileInputStream(srcFile);  
	            out = new FileOutputStream(destFile);  
	            byte[] buffer = new byte[1024];  
	            while ((byteread = in.read(buffer)) != -1) {  
	                out.write(buffer, 0, byteread);  
	            }  
	            return true;  
	        } catch (FileNotFoundException e) {  
	            return false;  
	        } catch (IOException e) {  
	            return false;  
	        } finally {  
	            try {  
	                if (out != null)  
	                    out.close();  
	                if (in != null)  
	                    in.close();  
	            } catch (IOException e) {  
	                e.printStackTrace();  
	            }  
	        }  
	    }  
	    /**
	     * JSONObject 转 Map<String,Object>
	     * @param json
	     * @return
	     * @Author hehg
	     * @Date 2017-4-25 上午10:07:49
	     */
	    @SuppressWarnings("unchecked")
		public static Map<String,Object> parserToMap(JSONObject json){  
	        Map<String,Object> map=new HashMap<String,Object>();  
	        Iterator<String> keys=json.keys();  
	        while(keys.hasNext()){  
	            String key=(String) keys.next();  
	            String value=json.get(key).toString();  
	            if(value.startsWith("{")&&value.endsWith("}")){  
	                map.put(key, parserToMap(JSONObject.fromObject(value)));  
	            }else{  
	                map.put(key, value);  
	            }  
	        }  
	        return map;  
	    } 
	    /**
	     * JSONOArray 转 List<Map<String,Object>>
	     * @param json
	     * @return
	     * @Author hehg
	     * @Date 2017-4-25 上午10:07:49
	     */
		public static List<Map<String,Object>> parseToList(JSONArray json){  
	    	List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
	        for (int i = 0; i < json.size(); i++) {
				list.add(parserToMap(json.getJSONObject(i)));
			} 
	        return list;  
	    }
		
	    /**
	     * 判断字符串是否含有汉字
	     * @param str
	     * @return
	     * @Author hehg
	     * @Date 2017-5-9 下午2:26:54
	     */
		public static boolean isChineseChar(String str){
	        boolean temp = false;
	        Pattern p=Pattern.compile("[\u4e00-\u9fa5]"); 
	        Matcher m=p.matcher(str); 
	        if(m.find()){ 
	            temp =  true;
	        }
	        return temp;
	    }
}
