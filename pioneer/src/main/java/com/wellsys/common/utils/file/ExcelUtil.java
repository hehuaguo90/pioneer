package com.wellsys.common.utils.file;

import com.wellsys.common.utils.JsonUtils;
import com.wellsys.common.utils.MessageConfig;
import com.wellsys.common.utils.MessageModel;
import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import org.apache.commons.lang.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zhyy on 2015/10/25.
 * excel 文件上传下载处理。
 */
public class ExcelUtil {
    public interface ICheckValue {
        String check(int row, int col, String field, String value);
    }

    public static void excelPreview(HttpServletRequest multiRequest, HttpServletResponse response, ExcelUtil.ICheckValue iCheckValue, String[] importFields) {
        String root = FileStorage.getTempDir();//MessageConfig.getMessage("export_folder");
        try {
            List<UploadUtil.UploadFileInfo> files = UploadUtil.loadFile(root, multiRequest, ".xls:");

            if (files.size()>0&& files.get(0).error != null) {

                JsonUtils.printJSONByObj(response,
                        new MessageImportModel(3, files.get(0).error, files.get(0).path),
                        null);
            } else {

                MessageImportModel msg = ExcelUtil.excelDataCheck( files.get(0).path, importFields, iCheckValue);

                if (msg.getStatus() != 0) {
                    File f = new File(files.get(0).path);
                    f.delete();
                }

                msg.setMessage(MessageConfig.getMessage("opt_upload_suc"));
                msg.setFilename(files.get(0).path);
                JsonUtils.printJSONByObj(response, msg, null);

            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }



    public static String exportExcel(HttpServletRequest request, HttpServletResponse response, String title, String[] heads, String[] fields, List dataList) {
        WritableWorkbook wwb;
        String fileName =FileStorage.getTempDir()+ FileStorage.getTempFilename(".xls");
        File file = new File(fileName);
        try {

            wwb = Workbook.createWorkbook(file);

            WritableSheet sheet = wwb.createSheet(title, 0);
            WritableCellFormat wc = new WritableCellFormat();

            // 设置居中
            wc.setAlignment(Alignment.CENTRE);
            // 设置边框线
            wc.setBorder(Border.ALL, BorderLineStyle.THIN);
            // 设置单元格的背景颜色
            wc.setBackground(jxl.format.Colour.GRAY_25);


            //填写表头
            for (int col = 0; col < heads.length; col++)
                sheet.addCell(new Label(col, 0, heads[col], wc));


            WritableCellFormat wc2 = new WritableCellFormat();
            // 设置居中
            wc2.setAlignment(Alignment.LEFT);
            // 设置边框线
            wc2.setBorder(Border.ALL, BorderLineStyle.THIN);
            int row = 1;
            if (dataList != null)
                for (Object o : dataList) {
                    @SuppressWarnings("unchecked")
                    Map<String, Object> item = (Map<String, Object>) o;

                    //填写数据
                    for (int col = 0; col < heads.length; col++) {
                        Object value;
                        value = item.get(fields[col]);
                        sheet.addCell(new Label(col, row, (value != null) ? value.toString() : "", wc2));
                    }
                    row += 1;
                }

            // 写入数据
            wwb.write();
            // 关闭文件
            wwb.close();
            downloadFile(request, response, title + ".xls", fileName);
            return fileName;

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            file.delete();
        }
        return null;
    }

    public static void deleteFile(String fileName, HttpServletResponse response) throws IOException {
        String root = MessageConfig.getMessage("excelTempDir");

        try {
            File f = new File(root + fileName);
            if (f.exists()) {
                f.delete();
                JsonUtils.printJSONByObj(response, new MessageModel(1, "删除成功！"), null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            JsonUtils.printJSONByObj(response, new MessageModel(3, "删除失败！"), null);
        }
    }

    /**
     * 向客户端下载文件,弹出下载框.
     *
     * @param response (HttpServletResponse)
     * @param filename (需要下载的文件)
      * @param request  HttpServletRequest
     * @throws IOException
     */
    public static void downloadFile(HttpServletRequest request, HttpServletResponse response, String filename, String filePath) throws Exception {
        OutputStream out;
        InputStream in;

        File file = new File(filePath);
        // 获得文件名
        // String filename = URLEncoder.encode(fileName, "UTF-8");
        // 定义输出类型(下载)'
        final String userAgent = request.getHeader("USER-AGENT");

        if (StringUtils.contains(userAgent, "MSIE")) {//IE浏览器
            filename = URLEncoder.encode(filename, "UTF8");
        } else if (StringUtils.contains(userAgent, "Mozilla")) {//google,火狐浏览器
            filename = new String(filename.getBytes(), "ISO8859-1");
        } else {
            filename = URLEncoder.encode(filename, "UTF8");//其他浏览器
        }

        response.setContentType("application/vnd.ms-excel");

        //response.setContentType("application/force-download");
        //response.setHeader("Location", filename);
        // 定义输出文件头
        response.setHeader("Content-Disposition", "attachment;filename=" + filename);
        out = response.getOutputStream();
        in = new FileInputStream(file.getPath());

        byte[] buffer = new byte[1024];
        int i;
        while ((i = in.read(buffer)) != -1) {
            out.write(buffer, 0, i);
        }

        in.close();
        out.close();


    }

    public static void importExcel(HttpServletRequest request, HttpServletResponse response,
                                   String[] heads, String[] fields, UploadUtil.UploadFileInfo fileInfo) {

    }


    public static MessageImportModel excelDataCheck(String newFileName, String[] fields, ICheckValue iCheckValue) {
        Workbook book = null;
        List<Map> excelData;
        MessageImportModel msg = new MessageImportModel();
        try {
            book = Workbook.getWorkbook(new File(newFileName));
            // 获得第一个工作表对象
            Sheet sheet = book.getSheet(0);
            int rows = sheet.getRows();
            int columns = sheet.getColumns();

            excelData = new ArrayList<Map>(rows > 100 ? 100 : rows);
            // 遍历每行每列的单元格
            for (int i = 1; i < rows; i++) {

                Map<String, String> item = new HashMap<String, String>();
                item.put("excel_pos", i + "");
                for (int j = 0; j < columns; j++) {
                    Cell cell = sheet.getCell(j, i);

                    String value = cell.getContents();
                    String error = null;
                    if (iCheckValue != null) {
                        error = iCheckValue.check(i, j, fields[j], value);
                    }
                    if (error != null) {
                        if (value == null || value.trim().length() == 0)
                            value = "{空}";
                        value = "<a href=\"#\" Title=\"" + error + "\" class=\"warning\">" + value + "</a>";
                    }

                    item.put(fields[j], value);
                }
                if (excelData.size() < 100)
                    excelData.add(item);
            }

            msg.setData(excelData);
            msg.setStatus(0);

        } catch (Exception e) {
            msg.setStatus(2);
        } finally {
            if (book != null) {
                book.close();
            }
        }

        return msg;
    }
}
