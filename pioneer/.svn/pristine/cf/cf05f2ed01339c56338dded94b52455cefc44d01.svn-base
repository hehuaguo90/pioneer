//package com.wellsys.common.utils.file;
//
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.IOException;
//import java.lang.reflect.Method;
//import java.sql.Timestamp;
//import java.text.DecimalFormat;
//import java.text.ParseException;
//import java.text.SimpleDateFormat;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Iterator;
//import java.util.LinkedList;
//import java.util.List;
//import java.util.Map;
//import java.util.Set;
//
//import javax.servlet.http.HttpServletRequest;
//
//import org.apache.commons.lang.StringEscapeUtils;
//import org.apache.poi.hssf.usermodel.HSSFCell;
//import org.apache.poi.hssf.usermodel.HSSFDateUtil;
//import org.apache.poi.hssf.usermodel.HSSFRow;
//import org.apache.poi.hssf.usermodel.HSSFSheet;
//import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//import org.apache.poi.ss.usermodel.Cell;
//import org.apache.poi.xssf.usermodel.XSSFCell;
//import org.apache.poi.xssf.usermodel.XSSFRow;
//import org.apache.poi.xssf.usermodel.XSSFSheet;
//import org.apache.poi.xssf.usermodel.XSSFWorkbook;
//import org.apache.struts2.ServletActionContext;
//
//import com.opensymphony.xwork2.ActionContext;
//
//
//public class Util {
//	public static Long getCaseId(){
//		return 0l;
//	}
//	/**
//	 * 判断string是否是int
//	 * @param testString
//	 * @return
//	 */
//	public static boolean isNumberString(String testString)
//	{
//	   String numAllString="0123456789";
//	   if(testString.length()<=0)
//	    return false;
//	   for(int i=0;i<testString.length();i++)
//	   {
//	    String charInString=testString.substring(i, i+1);
//	    if(!numAllString.contains(charInString))
//	     return false;
//	   }
//	   return true;
//	}
//	/**
//	 * 判断string是否是float
//	 * @param testString
//	 * @return
//	 */
//	public static boolean isFloathString(String testString)
//	{
//	   if(!testString.contains("."))
//	   {
//	    return isNumberString(testString);
//	   }
//	   else
//	   {
//	    String[] floatStringPartArray=testString.split("\\.");
//	    if(floatStringPartArray.length==2)
//	    {
//	     if(isNumberString(floatStringPartArray[0])&&isNumberString(floatStringPartArray[1]))
//	      return true;
//	     else
//	      return false;
//	    }
//	    else
//	     return false;
//	   }
//	}
//	public static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//	public static SimpleDateFormat sdfShort = new SimpleDateFormat("yyyy-MM-dd");
//	public static Date parshStringToDate(String day){
//		try {
//			if(day==null){
//				return null;
//			}
//			day = day.trim();
//			if(day.length()==0){
//				return null;
//			}
//			if(day.length()>10){
//				return sdf.parse(day);
//			}else{
//				return sdfShort.parse(day);
//			}
//
//		} catch (ParseException e) {
//			System.out.println("无效的时间类型");
//			e.printStackTrace();
//		}
//		return null;
//	}
//
//	/**
//	 * 用于获取系统日志对象
//	 * 设置日志用户ip
//	 * 设置日志用户id
//	 * 设置日志提交时间
//	 */
///*	public static void setSysLogs(){
//		StaticVal.sysLogs.setLogIP(getRequest().getRemoteAddr());//获取当前用户IP
//		if(null!=getSession().get("user")){
//			StaticVal.sysLogs.setUserID(((UserInfo)getSession().get("user")).getUserId());//获取当前用户ID
//		}
//		StaticVal.sysLogs.setLogTime(new Timestamp(new Date().getTime()));//获取系统时间
//	}*/
//
//	/**
//	 * 获取session
//	 * @return
//	 */
//	@SuppressWarnings("unchecked")
//	public static Map<Object, Object> getSession() {
//		return ActionContext.getContext().getSession();
//	}
//	/**
//	 * 获取request
//	 * @return
//	 */
//	public static HttpServletRequest getRequest() {
//		HttpServletRequest req = (HttpServletRequest)ActionContext.getContext().get(
//				ServletActionContext.HTTP_REQUEST);
//		return req ;
//	}
//	/**
//	 * 根据代码获取种类
//	 * @param typeCode
//	 * @return
//	 */
//	public static String getApplyType(String typeCode){
//		String applyType = "";
//		if ("00".equals(typeCode)) {
//			applyType="新办证";
//		}
//		if ("10".equals(typeCode)) {
//			applyType="到期换证";
//		}
//		if ("20".equals(typeCode)) {
//			applyType="到期变更";
//		}
//		if ("30".equals(typeCode)) {
//			applyType="变更换证";
//		}
//		if ("40".equals(typeCode)) {
//			applyType="补证";
//		}
//		if ("50".equals(typeCode)) {
//			applyType="年检";
//		}
//		return applyType;
//	}
//	/**
//	 * 传入对象转换成Map
//	 * @param thisObj
//	 * @return
//	 */
//
//    @SuppressWarnings("unchecked")
//	public static Map getMapByObj(Object thisObj)
//    {
//      Map map = new HashMap();
//      Class c;
//      try
//      {
//        c = Class.forName(thisObj.getClass().getName());
//        Method[] m = c.getMethods();
//        for (int i = 0; i < m.length; i++)
//        {
//          String method = m[i].getName();
//          if (method.startsWith("get"))
//          {
//            try{
//            Object value = m[i].invoke(thisObj);
//            if (value != null)
//            {
//              String key=method.substring(3);
//              key=key.substring(0,1)+key.substring(1).toUpperCase();
//              map.put(key, value);
//            }
//            }catch (Exception e) {
//              // TODO: handle exception
//              System.out.println("error:"+method);
//            }
//          }
//        }
//        System.out.println();
//      }
//      catch (Exception e)
//      {
//        // TODO: handle exception
//        e.printStackTrace();
//      }
//      return map;
//    }
//    /**
//     * 将Map对应赋值到对象中
//     * @param map
//     * @param thisObj
//     */
//    @SuppressWarnings("unchecked")
//	public static void setObjByMap(Map map,Object thisObj)
//    {
//      Set set = map.keySet();
//      Iterator iterator = set.iterator();
//      while (iterator.hasNext())
//      {
//        Object obj = iterator.next();
//        Object val = map.get(obj);
//        setMethod(obj, val, thisObj);
//      }
//    }
//    /**
//     * 对象调用set方法进行赋值
//     * @param method
//     * @param value
//     * @param thisObj
//     */
//    @SuppressWarnings("unchecked")
//	public static void setMethod(Object method, Object value ,Object thisObj)
//    {
//      Class c;
//      try
//      {
//        c = Class.forName(thisObj.getClass().getName());
//        String met = (String) method;
//        met = met.trim();
//        if (!met.substring(0, 1).equals(met.substring(0, 1).toUpperCase()))
//        {
//          met = met.substring(0, 1).toUpperCase() + met.substring(1);
//        }
//        if (!String.valueOf(method).startsWith("set"))
//        {
//          met = "set" + met;
//        }
//        Class types[] = new Class[1];
//        types[0] = Class.forName("java.lang.String");
//        Method m = c.getMethod(met, types);
//        m.invoke(thisObj, value);
//      }
//      catch (Exception e)
//      {
//        // TODO: handle exception
//        e.printStackTrace();
//      }
//    }
//    /**
//     * 对外提供读取excel 的方法
//     * 返回List<List<Object>> 外面一个List是总共行，里面那List是每行的列值
//     * */
//	public static List<List<Object>> readExcel(File file,String fileN) throws IOException{
//		   String fileName = fileN;
//		   String extension = fileName.lastIndexOf(".")==-1?"":fileName.substring(fileName.lastIndexOf(".")+1);
//		   if("xls".equals(extension)){
//		    return read2003Excel(file);
//		   }else if("xlsx".equals(extension)){
//		    return read2007Excel(file);
//		   }else{
//		    throw new IOException("不支持的文件类型");
//		   }
//		}
//	/**
//	* 读取 office 2003 excel
//	* @throws java.io.IOException
//	* */
//	private static List<List<Object>> read2003Excel(File file) throws IOException{
//	   List<List<Object>> list = new LinkedList<List<Object>>();
//	   HSSFWorkbook hwb = new HSSFWorkbook(new FileInputStream(file));
//	   HSSFSheet sheet = hwb.getSheetAt(0);
//	   Object value = null;
//	   HSSFRow row = null;
//	   HSSFCell cell = null;
//	   for(int i = sheet.getFirstRowNum();i<= sheet.getPhysicalNumberOfRows();i++){
//	    row = sheet.getRow(i);
//	    if (row == null) {
//	     continue;
//	    }
//	    List<Object> linked = new LinkedList<Object>();
////	    System.out.println(row.getLastCellNum()+"..........");
////	    System.out.println(row.getFirstCellNum()+"..........");
//	    for (int j = 0; j < 10; j++) {  //int j = row.getFirstCellNum(); j <= row.getLastCellNum(); j++
//	     cell = row.getCell(j);
//	     if (cell == null&&j<=10) {
//	      linked.add("");
//	      continue;
//	     }
//	     if (cell == null&&j>10) {
////		      linked.add("");
////		      System.out.println(".ppppp");
//		      continue;
//		     }
//	     DecimalFormat df = new DecimalFormat("0");// 格式化 number String 字符
//	     SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 格式化日期字符串
//	     DecimalFormat nf = new DecimalFormat("0.00");// 格式化数字
//	     System.out.println(cell.getCellType()+"<<<<");
//	     switch (cell.getCellType()) {
//	     case XSSFCell.CELL_TYPE_STRING:
//	      System.out.println(i+"行"+j+" 列 is String type");
//	      value = cell.getStringCellValue();
//	      break;
//	     case XSSFCell.CELL_TYPE_NUMERIC:
//	      System.out.println(i+"行"+j+" 列 is Number type ; DateFormt:"+cell.getCellStyle().getDataFormatString());
//	      if("@".equals(cell.getCellStyle().getDataFormatString())){
//	         value = df.format(cell.getNumericCellValue());
//	      } else if("General".equals(cell.getCellStyle().getDataFormatString())){
//	         value = nf.format(cell.getNumericCellValue());
//	      }else{
//	        value = sdf.format(HSSFDateUtil.getJavaDate(cell.getNumericCellValue()));
//	      }
//	      break;
//	     case XSSFCell.CELL_TYPE_BOOLEAN:
//	      System.out.println(i+"行"+j+" 列 is Boolean type");
//	      value = cell.getBooleanCellValue();
//	      break;
//	     case XSSFCell.CELL_TYPE_BLANK:
//	      System.out.println(i+"行"+j+" 列 is Blank type");
//	      value = new StringBuilder("");
//	      break;
//	     default:
//	      System.out.println(i+"行"+j+" 列 is default type");
//	      value = new StringBuilder("");
//	     }
//	     if (value == null || "".equals(value)) {
//	      value="";
//	     }
//	     linked.add(value.toString().replaceAll("'", "‘"));
//	   }
//	    System.out.println(linked.size()+"/////");
//	    for(int x=0;x<10;x++){
//	    	if(linked.get(x).toString().equals("")){
//
//	    	}
//	    	else{
//	    		list.add(linked);
//	    		break;
//	    	}
//	    }
//
//	   }
//	   return list;
//	}
//	/**
//	* 读取Office 2007 excel
//	* */
//	private static List<List<Object>> read2007Excel(File file) throws IOException {
//	   List<List<Object>> list = new LinkedList<List<Object>>();
//	   // 构造 XSSFWorkbook 对象，strPath 传入文件路径
//	   XSSFWorkbook xwb = new XSSFWorkbook(new FileInputStream(file));
//	   // 读取第一章表格内容
//	   XSSFSheet sheet = xwb.getSheetAt(0);
//	   Object value = null;
//	   XSSFRow row = null;
//	   XSSFCell cell = null;
//	   for (int i = sheet.getFirstRowNum(); i <= sheet
//	     .getPhysicalNumberOfRows(); i++) {
//	    row = sheet.getRow(i);
//	    if (row == null) {
//	     continue;
//	    }
//	    List<Object> linked = new LinkedList<Object>();
//	    for (int j = 0; j < 10; j++) {  //int j = row.getFirstCellNum(); j <= row.getLastCellNum(); j++
//	     cell = row.getCell(j);
//	     if (cell == null) {
//	      continue;
//	     }
//	     DecimalFormat df = new DecimalFormat("0");// 格式化 number String 字符
//	     SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 格式化日期字符串
//	     DecimalFormat nf = new DecimalFormat("0.00");// 格式化数字
//	     switch (cell.getCellType()) {
//	     case XSSFCell.CELL_TYPE_STRING:
//	      System.out.println(i+"行"+j+" 列 is String type");
//	      value = cell.getStringCellValue();
//	      break;
//	     case XSSFCell.CELL_TYPE_NUMERIC:
//	      System.out.println(i+"行"+j+" 列 is Number type ; DateFormt:"+cell.getCellStyle().getDataFormatString());
//	      System.out.println(cell.getCellStyle().getDataFormatString()+".......--------.........");
//	      if("@".equals(cell.getCellStyle().getDataFormatString())){
//	        value = df.format(cell.getNumericCellValue());
//	      } else if("General".equals(cell.getCellStyle().getDataFormatString())){
//	        value = nf.format(cell.getNumericCellValue());
//	      }else{
//	       value = sdf.format(HSSFDateUtil.getJavaDate(cell.getNumericCellValue()));
//	      }
//	      break;
//	     case XSSFCell.CELL_TYPE_BOOLEAN:
//	      System.out.println(i+"行"+j+" 列 is Boolean type");
//	      value = cell.getBooleanCellValue();
//	      break;
//	     case XSSFCell.CELL_TYPE_BLANK:
//	      System.out.println(i+"行"+j+" 列 is Blank type");
//	      value = "";
//	      break;
//	     default:
//	      System.out.println(i+"行"+j+" 列 is default type");
//	      value = cell.toString();
//	     }
//	     if (value == null || "".equals(value)) {
//	      continue;
//	     }
//	     System.out.println("值："+value);
//	     linked.add(value);
//	    }
//	    list.add(linked);
//	   }
//	   return list;
//	}
//	public static String requestEscape(String str) {
//		if (str == null) {
//			return null;
//		}
//		// str = Utility.escapeSql(str);
//		str = Util.escapeSql(Util.changescript(str));
//		System.out.println();
//		return str;
//	}
//
//	/** 防止script脚本等注入 */
//	public static String changescript(String html) {
//		if (html.indexOf("<") != -1) {
//			html = html.replaceAll("<", "&lt;");
//		}
//		return html;
//	}
//	//防sql注入
//	public static String escapeSql(String sqlStr) {
//		sqlStr = StringEscapeUtils.escapeSql(sqlStr);
//		return sqlStr;
//	}
//
//    /**
//     * excel单元格格式转换
//     * @param cell
//     * @return
//     */
//    public static String cellFormatHandler(Cell cell)
//    {
//
//    	//如果为null，返回空
//    	String result = "";
//    	if(cell == null)
//    	{
//    		return result;
//    	}else{
//    		cell.setCellType(Cell.CELL_TYPE_STRING);
//    		result = cell.getStringCellValue();
//    	}
//
//    	return result;
//    }
//}
