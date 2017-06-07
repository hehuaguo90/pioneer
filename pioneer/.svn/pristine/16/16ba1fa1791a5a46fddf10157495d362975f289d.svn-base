package com.wellsys.common.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Field;
import java.sql.Timestamp;
//import java.security.Timestamp;
//import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;



import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;


public class JsonUtils {
    final static String defaultFormat = "yyyy-MM-dd";
    
    /**
     * 返回json格式
     * @param response
     * @param obj
     * @param format
     * @throws IOException 
     */
    public static void printJSONByObj(HttpServletResponse response, Object obj, String format) throws IOException{
        ObjectMapper objectMapper = new ObjectMapper();

        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		dateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));
		SimpleModule module = new SimpleModule();
		module.addSerializer(java.sql.Date.class, new JavaDateSerializer());
		module.addSerializer(java.sql.Timestamp.class, new JavaTimestampSerializer());
        objectMapper.registerModule(module);
       // objectMapper.setDateFormat(dateFormat);
        String content = objectMapper.writeValueAsString(obj);

        response.setContentType("text/plain;charset=UTF-8");

        response.getWriter().print(content);
    }
    
    public static void printJSONArrayByList(HttpServletResponse response, List<Map<String, Object>> list, String format){
    	if(format == null){
    		format = defaultFormat;
    	}
    	printJson(toJsonArray(list, format), response);
    }
    
    /**
	 * 转换成json数组
	 * @param list
	 * @return
	 */
    public static String toJsonArray(List<Map<String, Object>> list, String format){
    	if(list == null){
    		return "[]";
    	}
    	
    	if(format == null){
    		format = defaultFormat;
    	}
    	
    	//时间字段格式化
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(Timestamp.class, new JsonDateValueProcessor(format));
    	
    	JSONArray json = JSONArray.fromObject(list, jsonConfig);
		return json.toString();
    }
    
    /**
   	 * 转换成json数组
   	 * @param list
   	 * @return
   	 */
       public static String toJsonObject(Object obj, String format){
       	if(obj == null){
       		return "";
       	}
       	
       	if(format == null){
    		format = defaultFormat;
    	}
       	
       	//时间字段格式化
   		JsonConfig jsonConfig = new JsonConfig();
   		jsonConfig.registerJsonValueProcessor(Timestamp.class, new JsonDateValueProcessor(format));
       	
   		JSONObject json = JSONObject.fromObject(obj, jsonConfig);
   		return json.toString();
       }
    
	static class JavaDateSerializer extends JsonSerializer<java.sql.Date> {

		@Override
		public void serialize(java.sql.Date value, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {

			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			String formattedDate = formatter.format(value);
			jgen.writeString(formattedDate);


		}
	}
	static class JavaTimestampSerializer extends JsonSerializer<java.sql.Timestamp> {

		@Override
		public void serialize(java.sql.Timestamp value, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {

			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String formattedDate = formatter.format(value);
			jgen.writeString(formattedDate);


		}
	}
    public static void printHtml(Object obj, HttpServletResponse response){
  		response.setContentType("text/html; charset=UTF-8");
  		PrintWriter out = null;
  		try {
  			out = response.getWriter();
  			out.print(obj);
  		}catch(Exception e){
  			e.printStackTrace();
  		}finally{
  			out.flush();
  			out.close();
  		}
  	}
  	
  	public static void printJson(Object obj, HttpServletResponse response){
  		response.setContentType("application/json; charset=UTF-8");
  		PrintWriter out = null;
  		try {
  			out = response.getWriter();
  			out.print(obj);
  		}catch(Exception e){
  			e.printStackTrace();
  		}finally{
  			out.flush();
  			out.close();
  		}
  	}
  	
      /**
       * 递归方式组装json数组
       * @param list
       * @param idName
       * @param pidName
       * @param rootId   根id的值
       * @param exclueId 要排除的id，包括其下的子节点
       * @return
       */
      public static String modelToJsonArray(List<?> list, String idName, String pidName, 
      		String textName, String rootId, String exclueId, boolean emptyText){
      	try {
      		if(list == null || list.size() == 0){
          		return "[]";
          	}
      		
      		//数据库中顶级分组 的pid
      		if(StringUtils.isBlank(rootId)){
      			rootId = "0";
      		}
      		//获取顶级分组，即不存在父的分组
      		List<Object> topList = new ArrayList<Object>();
      		for(int i = 0; i < list.size(); i++){
      			Object obj = list.get(i);
      			Field[] fields = obj.getClass().getDeclaredFields();
      			boolean b = true;
      			for(int j = 0; j < fields.length; j++){
      				Field field = fields[j];
      				field.setAccessible(true);
      				
      				if(field.getName().equals(pidName)){
      					//当前对象的pid为根id,则为顶级分组
      					String fvpid = field.get(obj).toString();
      					if(rootId.equals(fvpid)){
      						break;
      					}
      					
      					//当不是从根开始递归时，比如树的查询中只显示查询到的节点以及子节点，不显示父节点
      					for(int k = 0; k < list.size(); k++){
      						Object aobj = list.get(k);
      						if(obj.equals(aobj)){
      							continue;
      						}
      						
      						Field[] afields = aobj.getClass().getDeclaredFields();
      						
      						for(int m = 0; m < afields.length; m++){
      							Field afield = afields[m];
      							afield.setAccessible(true);
      							if(afield.getName().equals(idName)){
      								String fvid = afield.get(aobj).toString();
      								//如果当前验证的对象pid能找到和其他对象id相同，表示非顶级分组对象
      								if(fvid.equals(fvpid)){
      									b = false;
      									break;
      								}
      							}
      						}
      						if(!b){
      							break;
      						}
      					}
      					break;
      				}
      			}
      			
      			if(b){
      				topList.add(obj);
      			}
      		}
      		
      		JSONArray arr = new JSONArray();
      		
      		//添加一个空节点，运行用户选择空
      		if(emptyText){
      			JSONObject empty = new JSONObject();
          		empty.put("id", "0");
          		empty.put("text", "");
          		arr.add(empty);
      		}
      		
      		for(int i = 0; i < topList.size(); i++){
      			Object obj = topList.get(i);
      			Field[] fields = obj.getClass().getDeclaredFields();
      			JSONObject jobj = new JSONObject();
      			for(int j = 0; j < fields.length; j++){
      				Field field = fields[j];
      				field.setAccessible(true);
      				if(field.getName().equals(idName)){
      					 String id = field.get(obj).toString();
      					 if(!StringUtils.isBlank(exclueId)){
      						 //如果id为要排除的id，跳过该分支，不加入树
      						 if(exclueId.equals(id)){
      							 jobj = null;
      							 break;
      						 }
      					 }
      					 jobj.put("id", field.get(obj));
      					 
      					 JSONArray c = toJsonArray(list, idName, pidName, textName, id, exclueId);
      					 if(c != null && !"[]".equals(c)){
  							 jobj.put("children", c);
  						 }
      				}
      				
                      if(field.getName().equals(textName)){
                      	 jobj.put("text", NStringUtil.changeHtmlString(field.get(obj)));
  					}    				
      			}
      			
      			if(jobj != null && !jobj.isEmpty()){
          			arr.add(jobj);
          		}
      		}
      		
      		return arr.toString();
  		} catch (Exception e) {
  			throw new E4Log(e, "model->json失败！");
  		}
      }
      
      private static JSONArray toJsonArray(List<?> list, String idName, String pidName, 
      		String textName, String pid, String exclueId) throws Exception{
      	JSONArray arr = new JSONArray();
      	for(int i = 0; i < list.size(); i++){
      		Object obj = list.get(i);
      		Field[] fields = obj.getClass().getDeclaredFields();
      		JSONObject jobj = new JSONObject();
      		for(int j = 0; j < fields.length; j++){
      			Field field = fields[j];
      			field.setAccessible(true);
                  if(field.getName().equals(pidName)){
                  	//得到符合的 obj对象
  					if(pid.equals(field.get(obj).toString())){
  						for(int k = 0; k < fields.length; k++){
  							Field cfield = fields[k];								
  							cfield.setAccessible(true);
  							 if(cfield.getName().equals(idName)){
  								 String id = cfield.get(obj).toString();
  								 if(!StringUtils.isBlank(exclueId)){
  									 //去除id为exclueId的分支
  									 if(exclueId.equals(id)){
  										 jobj = null;
  										 break;
  									 }
  								 }
  								 
  								 jobj.put("id", id);
  								 JSONArray c = toJsonArray(list, idName, pidName, textName, id, exclueId);
  								 if(!"[]".equals(c)){
  									 jobj.put("children", c);
  								 }
  							 }
  							 
                               if(cfield.getName().equals(textName)){
                              	 jobj.put("text", NStringUtil.changeHtmlString(cfield.get(obj)));
                              	 //jobj.put("state", "closed");
  							 }
  						}
  						break;
  					}
      			}
      		}
      		
      		if(jobj != null && !jobj.isEmpty()){
      			arr.add(jobj);
      		}
      	}
      	
      	return arr;
      }
      public static List JSONToList(String jsonArray) {  
	      
  	    JSONArray array = JSONArray.fromObject(jsonArray);
  	    List<Map<String,Object>> list = JSONArray.toList(array, new HashMap<String, Object>(), new JsonConfig());//参数1为要转换的JSONArray数据，参数2为要转换的目标数据，即List盛装的数据
  	    return list;  
  	}
     public static Map JSONToMap(String jsonArray) {  
	      
    	  JSONObject array = JSONObject.fromObject(jsonArray);
  	      Map<String,Object> map = JSONObject.fromObject(array);//参数1为要转换的JSONArray数据，参数2为要转换的目标数据，即List盛装的数据
  	    return array;  
  	}
}


