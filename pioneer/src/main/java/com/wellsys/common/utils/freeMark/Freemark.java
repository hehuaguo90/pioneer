/**  
 * @Title: Freemark.java
 * @Package com.wellsys.common.utils.FreeMark
 * @Description: TODO
 * @author tangfan
 * @date 2016-2-26
 */
package com.wellsys.common.utils.freeMark;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Map;

import com.wellsys.common.utils.Download;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

public class Freemark {
	
	public void fprint(String ftlName,Map<String, Object> root, String outPath) {
        FileWriter out = null;
        try {
            // 通过一个文件输出流，就可以写到相应的文件中，此处用的是绝对路径
            out = new FileWriter(new File(outPath));
            Template temp = this.getTemplate(ftlName);
            temp.process(root, out);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (TemplateException e) {
            e.printStackTrace();
        } finally {
            try {
                if (out != null)
                    out.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
	
	public Template getTemplate(String name) {
		try {
			// 通过Freemaker的Configuration读取相应的ftl
			Configuration cfg = new Configuration();
			// 设定去哪里读取相应的ftl模板文件
			cfg.setClassForTemplateLoading(getClass(),"");
			cfg.setDefaultEncoding("UTF-8");
			// 在模板文件目录中找到名称为name的文件
			Template temp = cfg.getTemplate(name);
			temp.setEncoding("UTF-8");
			return temp;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/****
	 * 
	 * @Title: checkPath 
	 * @Description: 检查文件目录是否存在
	 * @param @param filePath
	 * @throws
	 * @author tangfan
	 * @date 2016-2-26
	 */
	public static void checkPath(String filePath){
		File file =new File(filePath);    
		//如果文件夹不存在则创建
		if  (!file.exists()  && !file.isDirectory())      
		{        
		    file.mkdirs();    
		}
	}
}
