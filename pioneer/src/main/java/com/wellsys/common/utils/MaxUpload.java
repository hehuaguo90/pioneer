package com.wellsys.common.utils;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.coobird.thumbnailator.Thumbnails;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.web.bind.annotation.RequestMapping;

	@SuppressWarnings("serial")
	public class MaxUpload extends HttpServlet { 
		  @SuppressWarnings("unchecked")
	    public void doPost(HttpServletRequest request, HttpServletResponse response)  
	            throws ServletException, IOException {  
	        String savePath = System.getProperty("user.dir");
	        int dotIndex1 = savePath.lastIndexOf(File.separator);
	        
	        String suffixName1 = savePath.substring(0, dotIndex1);
	        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			String tmp = sdf.format(new Date());
			
	        savePath = suffixName1 + "/cityManageUploads/"+tmp+"/";
	        File f1 = new File(savePath);  
	        if (!f1.exists()) {  
	            f1.mkdirs();  
	        }  
	        DiskFileItemFactory fac = new DiskFileItemFactory();  
	        ServletFileUpload upload = new ServletFileUpload(fac);  
	        upload.setHeaderEncoding("utf-8");  
	        List fileList = null;  
	        try {  
	            fileList = upload.parseRequest(request);  
	        } catch (FileUploadException ex) {  
	            return;  
	        }  
	  
	        Iterator<FileItem> it = fileList.iterator();  
	        String name = "";  
	        String extName = "";
	        String reduceName = "";
			
	        while (it.hasNext()) {  
	            FileItem item = it.next();  
	            if (!item.isFormField()) {  
	                name = item.getName();  
	                long size = item.getSize();  
	                float reduce = 1f;
	                if (name == null || name.trim().equals("")) {  
	                    continue;  
	                }  
	  
	                //扩展名格式：   
	                if (name.lastIndexOf(".") >= 0) {  
	                    extName = name.substring(name.lastIndexOf("."));  
	                };
	               
	                File file = null;  
	                do {  
	                    //生成文件名：  
	                    name = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());  
	                    file = new File(savePath + name + extName);
	                } while (file.exists()); 
	                
	                //计算压缩比例
	                if(size>500*1024){
	                	reduce = ((float)(500*1024)/size);
	                	//当压缩比例小于0.3后，图片失真严重
	                	if(reduce<0.3f){
	                		reduce = 0.3f;
	                	}
	                	reduceName = name+"reduce";
	                }else{
	                	reduceName = name;
	                }
	                
	                File saveFile = new File(savePath + reduceName + extName);
	                try {  
	                    item.write(file);
	                    if(size>500*1024){
	                    	//压缩图片
	                        Thumbnails.of(savePath + name + extName)
	                        .scale(reduce)
	                        .outputFormat(extName.substring(1, extName.length()))   
	                        .toFile(savePath + reduceName + extName);
	                    }
	                    
	                //    HttpPostUtil.sendFile(StaticVal.UPLOAD_ADTION, "xx", StaticVal.UPLOAD_URL+tmp+"/", reduceName + extName, saveFile);
	                } catch (Exception e) {  
	                    e.printStackTrace();  
	                }
	            }  
	        }
	        
	        request.getSession().setAttribute("filePath", savePath  + reduceName + extName);
	        request.setAttribute("sp",savePath + reduceName + extName );
	        response.getWriter().print(reduceName + extName);  
	    }  
	    
	}  
