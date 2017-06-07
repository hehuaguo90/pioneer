/**  
 * @Title: Files.java
 * @Package com.wellsys.common.utils.file
 * @Description: TODO
 * @author tangfan
 * @date 2016-3-28
 */
package com.wellsys.common.utils.file;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;

import sun.misc.BASE64Decoder;

/**
 * ClassName: Files
 * @Description: TODO
 * @author tangfan
 * @date 2016-3-28
 */
public class Files {

	public static String GenerateImage(String timeName,String directory,String imgStr)  
    {   
		String imgName = timeName+".jpg";
		//对字节数组字符串进行Base64解码并生成图片  
        if (imgStr == null) //图像数据为空  
            return "";  
        BASE64Decoder decoder = new BASE64Decoder();  
        try   
        {  
            //Base64解码  
            byte[] b = decoder.decodeBuffer(imgStr);  
            for(int i=0;i<b.length;++i)  
            {  
                if(b[i]<0)  
                {//调整异常数据  
                    b[i]+=256;  
                }  
            }  
            //生成jpeg图片  
            String imgFilePath = directory+imgName;//新生成的图片  
            OutputStream out = new FileOutputStream(imgFilePath);      
            out.write(b);  
            out.flush();  
            out.close();  
            return imgName;  
        }   
        catch (Exception e)   
        {  
        	e.printStackTrace();
            return "";  
        }  
    } 
	
}
