package com.dateTest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import com.wellsys.common.utils.Constant;
import com.wellsys.common.utils.DateTool;

public class DateTest {
	public static void main(String[] args) throws ParseException {
//		//http://www.iteye.com/problems/91538
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//		Calendar cl = Calendar.getInstance();
//		cl.setFirstDayOfWeek(Calendar.THURSDAY);  //
//		cl.setTime(sdf.parse("2016-01-01"));
//		int week = cl.get(Calendar.WEEK_OF_YEAR);
//		System.out.println(week); 
//		
//		DateTest t = new DateTest();
//		
//		System.out.println(t.getWeekYear("2016-01-01"));
		
		String date = "2016-01-01";
		String wk = DateTool.transformDate(date, Constant.PERIOD_WEEK);
		System.out.println(wk);
		
	    //System.out.println(cl.getFirstDayOfWeek()); //SUNDAY  
	    //System.out.println(cl.getMinimalDaysInFirstWeek());//1  
	}
	
	//按照iso标准计算周
	private SimpleDateFormat df_yyyyMMdd = new SimpleDateFormat("yyyy-MM-dd");  
	public  String getWeekYear(String today) throws ParseException {  
	        Date date = df_yyyyMMdd.parse(today);  
	        Calendar calendar = Calendar.getInstance();  
	        calendar.setFirstDayOfWeek(Calendar.MONDAY);  
	        calendar.setTime(date);  
	        //先处理第一周从几号开始的问题  
	        Calendar cl = Calendar.getInstance();//计算一年开始周的情况  
	        cl.setFirstDayOfWeek(Calendar.MONDAY);  
	        cl.setTime(df_yyyyMMdd.parse(cl.get(Calendar.YEAR)+"-01"+"-"+cl.getMinimalDaysInFirstWeek()));  
	        System.out.println(cl.getTime()+"-------"+cl.get(Calendar.DAY_OF_WEEK));  
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
    public String getFristDate_Week(Integer year, Integer weekNO) {  
        Calendar cal = Calendar.getInstance();  
        cal.set(Calendar.YEAR, year);  
        cal.set(Calendar.WEEK_OF_YEAR, weekNO);  
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);  
        return df_yyyyMMdd.format(cal.getTime());  
    }  

}
