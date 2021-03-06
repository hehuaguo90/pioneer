package com.wellsys.common.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class DateTool {
	protected static Log log = LogFactory.getLog(DateTool.class);
	// 格式：年－月－日 小时：分钟：秒
	public static final String COMMON_DATETIME = "yyyy-MM-dd HH:mm:ss";
	// 格式：年－月－日
	public static final String LONG_DATE = "yyyy-MM-dd";
	
	public static String getStrTime(String style){
		Date now = new Date(); 
		String format = "";
		if(style==null){
			format = "yyyy-MM-dd HH:mm:ss";
		}else{
			format = style;
		}
		SimpleDateFormat dateFormat = new SimpleDateFormat(format);//可以方便地修改日期格式 


		String nowTime = dateFormat.format(now); 

		return nowTime;
	}


	/******************
	 * 
	 * @Title: getStrTime 
	 * @Description: (返回格式化后的时间字符串) 
	 * @param @param style
	 * @param @param StrDate
	 * @param @return    设定文件 
	 * @return String    返回类型 
	 * @author TangFan
	 * @throws
	 */
	public static String getStrTime(String style,Object StrDate){
		String format = "";
		if(StrDate==null){
			return "";
		}
		
		if(style==null){
			format = "yyyy-MM-dd HH:mm:ss";
		}else{
			format = style;
		}
		SimpleDateFormat dateFormat = new SimpleDateFormat(format);//可以方便地修改日期格式 


		String nowTime = dateFormat.format(StrDate); 

		return nowTime;
	}

	/**取得当年当月的第一天
	 * @return 日期
	 */
	public static String getFirstDayofMonth() throws Exception
	{
		String style = "yyyy-MM-dd";
		SimpleDateFormat format = new SimpleDateFormat(style); 
		String firstDay = "";
		Calendar   cal_1=Calendar.getInstance();//获取当前日期 
		cal_1.set(Calendar.DAY_OF_MONTH,1);//设置为1号,当前日期既为本月第一天 
		firstDay = format.format(cal_1.getTime());

		return firstDay;
	}

	/************
	 * 
	 * @Title: getEdnDayofMonth
	 * @Description: (获取当前月最后一天)
	 * @param @return    设定文件
	 * @return String    返回类型
	 * @throws
	 */
	public static String getEdnDayofMonth() throws Exception
	{
		String style = "yyyy-MM-dd";
		SimpleDateFormat format = new SimpleDateFormat(style); 
		String lastDay = "";
		Calendar cale = Calendar.getInstance();   
		cale.add(Calendar.MONTH, 1);
		cale.set(Calendar.DAY_OF_MONTH,0);//设置为1号,当前日期既为本月第一天 
		lastDay = format.format(cale.getTime());

		return lastDay;
	}

	public Date ParseStringToDate(String d,String style)
	{
		GregorianCalendar thisday = new GregorianCalendar();
		String format = "";
		Date t = null;

		if(style!=null){
			format = style; 
		}else{
			format = "yyyy-MM-dd HH:mm:ss";
		}

		try {
			SimpleDateFormat dt = new SimpleDateFormat(format);
			t = dt.parse(d);
			thisday.setTime(t);
			t = thisday.getTime();          
		}
		catch (Exception e)
		{
			System.out.println(e.getMessage());
			return null;
		}

		return t;
	}

	public boolean isValidDate(String d,String style)
	{
		String format = "";
		if(style!=null){
			format = style; 
		}else{
			format = "yyyy-MM-dd HH:mm:ss";
		}

		try {
			SimpleDateFormat dt = new SimpleDateFormat(format);
			dt.parse(d);
			return true;         
		}
		catch (Exception e)
		{
			return false;
		}
	}


	public Date getDateTime(String style) throws ParseException{

		String StrDate = null;
		Date DateNow = null;
		Date now = new Date(); 
		String format = "";

		if(style!=null){
			format = "yyyy-MM-dd HH:mm:ss";
		}else{
			format = style;
		}
		SimpleDateFormat formatDate = new SimpleDateFormat(format);

		StrDate = formatDate.format(now);
		DateNow = formatDate.parse(StrDate);

		return DateNow;
	}

	/**把字符串 d 转为行如 Style 的日期时间字符串
	 * @return
	 */
	public String ParseDate(String d,String style) throws Exception
	{
		String strDate = "";
		GregorianCalendar thisday = new GregorianCalendar();
		SimpleDateFormat dt = new SimpleDateFormat(style);
		strDate = dt.format(d); 
		Date t = dt.parse(d);
		thisday.setTime(t);
		t = thisday.getTime();
		strDate = dt.format(t);   
		return strDate;
	}

	public String ParseDate1(String d,String style,String styleDate) throws ParseException
	{
		String strDate = "";
		SimpleDateFormat sdf=new SimpleDateFormat(style);
		SimpleDateFormat sdfDate=new SimpleDateFormat(styleDate);
		Date date = sdf.parse(d);
		strDate = sdfDate.format(date);

		return strDate;
	}

	/***************
	 * 
	 * @Title: GetDate 
	 * @Description: (增加年、月、日) 
	 * @param @param strDate
	 * @param @param AddYEAR
	 * @param @param AddMONTH
	 * @param @param AddDATE
	 * @param @param style
	 * @param @return    设定文件 
	 * @return String    返回类型 
	 * @author TangFan
	 * @throws
	 */
	public String GetDate(String strDate,int AddYEAR , int AddMONTH,int AddDATE,String style) throws Exception
	{
		String strDate1="";
		GregorianCalendar thisday = new GregorianCalendar();
		SimpleDateFormat dt = new SimpleDateFormat(style);
		Date t = dt.parse(strDate);
		thisday.setTime(t); 
		thisday.add(GregorianCalendar.YEAR,AddYEAR);//再加N年
		thisday.add(GregorianCalendar.MONTH,AddMONTH);//再加N月
		thisday.add(GregorianCalendar.DATE,AddDATE);//再加N天
		Date m = thisday.getTime();
		strDate1 = dt.format(m);
		return strDate1;
	}

	/***********************
	 * 
	 * @Title: compare_date
	 * @Description: (比较DATE1是否在DATE2之前)
	 * @param @param DATE1
	 * @param @param DATE2
	 * @param @param style
	 * @param @return    设定文件
	 * @return boolean    返回类型
	 * @throws
	 */
	public static boolean compare_date(String DATE1,String DATE2,String style) throws Exception {
		String format = "";

		if(style!=null){
			format = "yyyy-MM-dd";
		}else{
			format = style;
		}

		SimpleDateFormat dt = new SimpleDateFormat(format);
		Date dt1 = dt.parse(DATE1);
		Date dt2 = dt.parse(DATE2);
		if (dt1.getTime() > dt2.getTime()) {
			return false;
		} else if (dt1.getTime() < dt2.getTime()) {
			return true;
		} else {
			return false;
		}
	}
	
	/***
	 * 
	 * @Title: compare_date 
	 * @Description: 比较日期dt1是否在dt2之前
	 * @param @param dt1
	 * @param @param dt2
	 * @param @return
	 * @param @throws Exception
	 * @throws
	 * @author tangfan
	 * @date 2015-7-22
	 */
	public static boolean compare_date(Date dt1,Date dt2) throws Exception {
		if (dt1.getTime() > dt2.getTime()) {
			return false;
		} else if (dt1.getTime() < dt2.getTime()) {
			return true;
		} else {
			return false;
		}
	}

	/*****************
	 * 
	 * @Title: getYearDroplist
	 * @Description: (获取十年前，到当前年的年份)
	 * @param @return    设定文件
	 * @return List<Object[]>    返回类型
	 * @throws
	 */
	public List<Object[]> getYearDroplist() {  
		List<Object[]> list = new ArrayList<Object[]>();  
		String yearStr = getStrTime("yyyy");
		int yearInt = Integer.parseInt(yearStr);

		for(int i=0;i<10;i++){
			Object[] objArr  = {yearInt-i,yearInt-i};
			list.add(objArr);
		}

		return list;
	} 
	
	public String toFormat(String date){
		String[] s=date.split("-");
		String h=s[0]+s[1]+s[2];
		System.out.println(h);
		return h;
	}
	
	/**
	 * 取得指定日期过 day 天后的日期 (当 day 为负数表示指日期之前);
	 * 
	 * @param date
	 *            日期 为null时表示当天
	 * @param days
	 *            相加(相减)的天数
	 */
	public static Date nextDay(Date date, int days) {
		Calendar cal = Calendar.getInstance();
		if (date != null) {
			cal.setTime(date);
		}
		cal.add(Calendar.DAY_OF_YEAR, days);
		return cal.getTime();
	}
	
	/**
	 * 把日期转换为字符串
	 * 
	 * @param date
	 * @return
	 */
	public static String date2String(java.util.Date date, String format) {
		if(date == null){
			return "";
		}
		String result = "";
		SimpleDateFormat formater = new SimpleDateFormat(format);
		try {
			result = formater.format(date);
		} catch (Exception e) {
			log.error("DateUtil.date2String(" + date + "," + format + ")转化失败");
		} finally {
			formater = null;
		}
		return result;
	}
	
	/**
	 * 把符合日期格式的字符串转换为日期类型
	 * 
	 * @param dateStr
	 * @return
	 */
	public static java.util.Date string2Date(String dateStr, String format) {
		Date d = null;
		SimpleDateFormat formater = new SimpleDateFormat(format);
		try {
			formater.setLenient(false);// 严格解析
			d = formater.parse(dateStr);
		} catch (Exception e) {
			d = null;
		} finally {
			formater = null;
		}
		return d;
	}
	
	/**
	 * 取得指定日期过 months 月后的日期 (当 months 为负数表示指定月之前);
	 * 
	 * @param date
	 *            日期 为null时表示当天
	 * @param month
	 *            相加(相减)的月数
	 */
	public static Date nextMonth(Date date, int months) {
		Calendar cal = Calendar.getInstance();
		if (date != null) {
			cal.setTime(date);
		}
		cal.add(Calendar.MONTH, months);
		return cal.getTime();
	}
	
	/**
	 * 得到该日期所在月的第一天的凌晨
	 * @param date
	 * @return
	 */
	public static Date getBeginTimeOfMonth(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.DAY_OF_MONTH, 1);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE,0);
        cal.set(Calendar.SECOND,0);
        return cal.getTime();
    }
	
	/**
	 * 获取iso标准的周期数
	 * 参数格式："2016-01-01"
	 */
	private static SimpleDateFormat df_yyyyMMdd = new SimpleDateFormat("yyyy-MM-dd");  
	public static String getWeekYear(String today) throws ParseException {  
	        Date date = df_yyyyMMdd.parse(today);  
	        Calendar calendar = Calendar.getInstance();  
	        calendar.setFirstDayOfWeek(Calendar.MONDAY);  
	        calendar.setTime(date);  
	        //先处理第一周从几号开始的问题  
	        Calendar cl = Calendar.getInstance();//计算一年开始周的情况  
	        cl.setFirstDayOfWeek(Calendar.MONDAY);  
	        cl.setTime(df_yyyyMMdd.parse(cl.get(Calendar.YEAR)+"-01"+"-"+cl.getMinimalDaysInFirstWeek()));  
	        //System.out.println(cl.getTime()+"-------"+cl.get(Calendar.DAY_OF_WEEK));  
	        //判断如果大于5的话每年的第一周开始的号数推迟到下一周,现在开始计算下一周的开始天数  
	        String startDate=getFristDate_Week(cl.get(Calendar.YEAR),2);  
	        if(cl.get(Calendar.DAY_OF_WEEK)>=6){  
	            calendar.setMinimalDaysInFirstWeek(Integer.valueOf(startDate.split("-")[2]));  
	        }  
	        return calendar.get(Calendar.YEAR)+"-"+calendar.get(Calendar.WEEK_OF_YEAR);  
	    }  
	
	/** 
     * 通过此方法返回对应周的第一天（以周一为开始时间） 
     *  
     * @param year 
     * @param weekNO 
     * @return 
     */  
    private static String getFristDate_Week(Integer year, Integer weekNO) {  
        Calendar cal = Calendar.getInstance();  
        cal.set(Calendar.YEAR, year);  
        cal.set(Calendar.WEEK_OF_YEAR, weekNO);  
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);  
        return df_yyyyMMdd.format(cal.getTime());  
    }  
    
	/**
	 * 按不同频度，将日期转换为对应的字符串
	 * @param date 日期
	 * @param statFreq 统计频度
	 * @return
	 */
	public static String transformDate(String date, String statFreq){
		String d = null;
		try {
			if(Constant.PERIOD_WEEK.equals(statFreq)){//2016-25
				if(date.length() > 7){
					d = getWeekYear(date);
				}else{
					d = date;
				}
				
				if(d.length() == 6){
					d = d.substring(0, 5) + "0" + d.substring(5);
				}
				
			}else if(Constant.PERIOD_MONTH.equals(statFreq)){//2016-12
				//2016-1的日期
				if(date.length() == 6){
					d = date.substring(0, 5) + "0" + date.substring(5);
				}else{
					d = date.substring(0, 7);
				}
				
			}else if(Constant.PERIOD_QUARTER.equals(statFreq)){
				if(date.length() > 6){
					int month = Integer.parseInt(date.substring(5, 7));
					String year = date.substring(0, 4);
					if(month >= 1 && month <= 3){
						d = year + "-" + 1;
						
					}else if(month >= 4 && month <= 6){
						d = year + "-" + 2;
						
					}else if(month >= 7 && month <= 9){
						d = year + "-" + 3;
					}else{
						d = year + "-" + 4;
					}
				}else{
					d = date;
				}
				
			}else if(Constant.PERIOD_YEAR.equals(statFreq)){
				d = date.substring(0, 4);
				
			}else{
				d = date;
			}
			
		} catch (Exception e) {
			log.error("DateUtil.transformDate(" + date + ")转化失");
		}
		
		return d;
	}
	
	public static String transformDateCN(String date, String statFreq){
		if(StringUtils.isBlank(date)){
			return date;
		}
		
		String d = transformDate(date, statFreq);
		
		return tfDate(d, statFreq);
	}
	
	//将日期转换为友好的格式
	private static String tfDate(String date, String statFreq){
		if(StringUtils.isBlank(date)){
			return date;
		}
		String d = date;
		String year = date.substring(0, 4);
		if(Constant.PERIOD_WEEK.equals(statFreq)){//2015-01 -> 2015年11周
			String week = date.substring(5);
			d = year + "年" + week + "周";
			
		}else if(Constant.PERIOD_MONTH.equals(statFreq)){//2016-12 -> 2015年12月
			String month = date.substring(5);
			d = year + "年" + month + "月";
			
		}else if(Constant.PERIOD_QUARTER.equals(statFreq)){//2016-1 -> 2016年1季度
			String quarter = date.substring(5);
			d = year + "年" + quarter + "季度";
			
		}else if(Constant.PERIOD_YEAR.equals(statFreq)){//2016 -> 2016年
			d = year + "年";
			
		}
		
		return d;
	}
	
	/**
	 * yyyy-MM-dd形式的日期上一年
	 * @param date 日期
	 * */
	public static String preYear(String dateStr){
		String d="";
			try {
				
				 SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			     Date dt;
				dt = sdf.parse(dateStr);
				Calendar rightNow = Calendar.getInstance();
		        rightNow.setTime(dt);
		        rightNow.add(Calendar.YEAR,-1);//日期减1年
		        Date dtN=rightNow.getTime();
		        d = sdf.format(dtN);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	     return d;   
	}
	/**
	 * yyyy-MM-dd形式的日期上一周
	 * @param date 日期
	 * */
	public static String preWeek(String dateStr){
		String d="";
			try {
				
				 SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			     Date dt;
				dt = sdf.parse(dateStr);
				Calendar rightNow = Calendar.getInstance();
		        rightNow.setTime(dt);
		        rightNow.add(Calendar.YEAR,-1);//日期减1年
		        Date dtN=rightNow.getTime();
		        d = sdf.format(dtN);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	     return d;   
	}
}
