/**  
* @Title: Download.java 
* @Package com.thtf.dataCenter.utils 
* @Description: (用一句话描述该文件做什么) 
* @author TangFan  
* @date 2014-10-21 下午4:50:06 
* @version V1.0  
*/ 
package com.wellsys.common.utils;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

/** 
 * @ClassName: Download 
 * @Description: (这里用一句话描述这个类的作用) 
 * @author TangFan 
 * @date 2014-10-21 下午4:50:06  
 */
public class Download {
	private static InputStream fileStream;
	
	   /*******************
	    * 
	    * @Title: setDownLoad 
	    * @Description: (下载文件) 
	    * @param @param filePath
	    * @param @param filename
	    * @param @param gObjRes
	    * @param @throws Exception    设定文件 
	    * @return void    返回类型 
	    * @author TangFan
	    * @throws
	    */
	    public static void setDownLoad(String filePath,String filename,HttpServletResponse gObjRes) throws Exception{
	    	fileStream = new FileInputStream(filePath);
	        if (filename == null)
	            filename = "下载文件";
	        if (filename.equals("") == true)
	            filename = "下载文件";
	        
	        OutputStream out = null;
	        try{
	        	gObjRes.addHeader("Content-Disposition", "attachment; filename="
		                + new String(filename.getBytes("GBK"),"8859_1"));
	            
		        gObjRes.addHeader("Content-Length", String.valueOf(fileStream.available()));
		        gObjRes.setContentType(getContentType(filename)+";charset=utf-8");
		        out = gObjRes.getOutputStream();
		        
		        byte[] b = new byte[4096];
		        int i = 0;
		        while ((i = fileStream.read(b)) > 0) {
		            out.write(b, 0, i);
		            out.flush();
		        }
		        out.flush();
	        }finally{
	            if (fileStream != null) fileStream.close();
	            if (out != null) out.close();
	        }
	    }
	    
	    /****
	     * 
	     * @Title: getDownName 
	     * @Description: 获取下载临时文件的名称
	     * @param @param name
	     * @param @return
	     * @throws
	     * @author tangfan
	     * @date 2016-3-2
	     */
	    public static String getDownName(String name){
	    	StringBuffer nameBuff = new StringBuffer();
	    	nameBuff.append(DateTool.getStrTime("yyyyMMddHHmm"));
	    	nameBuff.append("_");
	    	nameBuff.append(name);
	    	return nameBuff.toString();
		}
	    
	    public static void deleFile(String wordAddress){
			File file = new File(wordAddress);
			String[] filelist = file.list();
			if(filelist==null){
				return;
			}
			for (int i = 0; i < filelist.length; i++) {
				String fileName = filelist[i].substring(0, filelist[i].indexOf("."));		
				//删除1小时以前的临时文件
				if((Long.parseLong(fileName.split("_")[0])+(1000*60*60))<new Date().getTime()){
					File delfile = new File(wordAddress + "\\" + filelist[i]);
		            delfile.delete();
				}   
			}
		}
	    
	    public static void delTempImg(String imgAddress){
			File file = new File(imgAddress);
			String[] filelist = file.list();
			if(filelist==null){
				return;
			}
			for (int i = 0; i < filelist.length; i++) {
				String fileName = filelist[i].substring(0, filelist[i].length()-4);		
				//删除1小时以前的临时文件
				if((Long.parseLong(fileName)+(1000*60*60))<new Date().getTime()){
					File delfile = new File(imgAddress + "\\" + filelist[i]);
		            delfile.delete();
				}  
			}
		}
	    
	    public void setDownLoad_byte(String Str,String filename,HttpServletResponse gObjRes) throws Exception{
	    	InputStream myIn=new ByteArrayInputStream(Str.getBytes());
	        if (filename == null)
	            filename = "下载文件";
	        if (filename.equals("") == true)
	            filename = "下载文件";
	        OutputStream out = null;
	        try{
	        	gObjRes.addHeader("Content-Disposition", "attachment; filename="
		                + new String(filename.getBytes("GBK"),"8859_1"));
	            
		        gObjRes.addHeader("Content-Length", String.valueOf(myIn.available()));
		        gObjRes.setContentType(getContentType(filename)+";charset=utf-8");
		        out = gObjRes.getOutputStream();
		        byte[] b = new byte[4096];
		        int i = 0;
		        while ((i = myIn.read(b)) > 0) {
		            out.write(b, 0, i);
		            out.flush();
		        }
		        out.flush();
	        }finally{
	            if (myIn != null) myIn.close();
	            if (out != null) out.close();
	        }
	    }
	    
	    private static String getContentType(String fileName) {
	        String ext = "";
	        if (fileName.lastIndexOf(".") >= 0)
	            ext = fileName.substring(fileName.lastIndexOf("."));

	        if (ext.equals(".asf"))
	            return "video/x-ms-asf";
	        else if (ext.equals(".avi"))
	            return "video/avi";
	        else if (ext.equals(".doc"))
	            return "application/msword";
	        else if (ext.equals(".docx"))
	            return "application/msword";
	        else if (ext.equals(".zip"))
	            return "application/zip";
	        else if (ext.equals(".xls"))
	            return "application/vnd.ms-excel";
	        else if (ext.equals(".gif"))
	            return "image/gif";
	        else if (ext.equals(".jpg"))
	            return "image/jpeg";
	        else if (ext.equals(".jpeg"))
	            return "image/jpeg";
	        else if (ext.equals(".wav"))
	            return "audio/wav";
	        else if (ext.equals(".mp3"))
	            return "audio/mpeg3";
	        else if (ext.equals(".mpg"))
	            return "video/mpeg";
	        else if (ext.equals(".mpeg"))
	            return "video/mpeg";
	        else if (ext.equals(".rtf"))
	            return "application/rtf";
	        else if (ext.equals(".htm"))
	            return "text/html";
	        else if (ext.equals(".html"))
	            return "text/html";
	        else if (ext.equals(".txt"))
	            return "text/plain";
	        else
	            return "application/octet-stream";
	    }
}
