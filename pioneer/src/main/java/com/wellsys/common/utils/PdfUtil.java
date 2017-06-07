/**  
 * @Title: PdfMgr.java
 * @Package com.wellsys.common.utils
 * @Description: 用于生成PDF文件
 * @author tangfan
 * @date 2016-2-23
 */
package com.wellsys.common.utils;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;

import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;

/**
 * ClassName: PdfMgr
 * @Description: 用于生成PDF文件
 * @author tangfan
 * @date 2016-2-23
 */
public class PdfUtil {
	/**************
	 * 
	 * @Title: parseHTML2PDFFile 
	 * @Description: html转换为PDF
	 * @param @param pdfFile
	 * @param @param htmlFileStream
	 * @param @throws Exception
	 * @throws
	 * @author tangfan
	 * @date 2016-2-29
	 */
	public static void parseHTML2PDFFile(String pdfFile,
			InputStream htmlFileStream) throws Exception {
		Document document = new Document();
		PdfWriter pdfwriter = PdfWriter.getInstance(document,new FileOutputStream(pdfFile));
		pdfwriter.setViewerPreferences(PdfWriter.HideToolbar);
		document.open();
		// html文件
		InputStreamReader isr = new InputStreamReader(htmlFileStream, "gb2312");
		
		XMLWorkerHelper.getInstance().parseXHtml(pdfwriter, document, isr);
		document.close();
	}
}
