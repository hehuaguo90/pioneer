package com.wellsys.common.utils.file;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by zhyy on 2015/10/27.
 * 提取客户端上传的文件。
 */
public class UploadUtil {

    public static class UploadFileInfo {
        public String error = null;
        /**
         * 源文件名
         */
        public String filename;
        /**
         * 文件在服务器的存储文件名：包括路径和文件名称。
         */
        public String path;

        public UploadFileInfo(String sourceFileName, String newFileName) {
            this.filename = sourceFileName;
            this.path = newFileName;
        }

        public UploadFileInfo(String error) {
            this.error = error;
        }

        public UploadFileInfo() {
        }
    }



    /**
     * @param folder    接收文件的临时存放位置
     * @param request   http请求
     * @param fileTypes 接受的文件类型。
     * @return 接收的文件信息。
     */
    public static List<UploadFileInfo> loadFile(String folder, HttpServletRequest request, String fileTypes) {
        List<UploadFileInfo> files=new LinkedList<UploadFileInfo>();
        try {
            // 创建一个通用的多部分解析器
            CommonsMultipartResolver multipartResolver =
                    new CommonsMultipartResolver(request.getSession().getServletContext());
            // 判断 request 是否有文件上传,即多部分请求
            if (multipartResolver.isMultipart(request)) {
                // 转换成多部分request
                MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
                // 取得request中的所有文件名

                Iterator<String> iter = multiRequest.getFileNames();
                while (iter.hasNext()) {
                    // 记录上传过程起始时的时间，用来计算上传时间
                    int pre = (int) System.currentTimeMillis();
                    // 取得上传文件
                    MultipartFile file = multiRequest.getFile(iter.next());
                    if (file != null) {
                        UploadFileInfo upfile= new UploadFileInfo();
                        // 取得当前上传文件的文件名称
                        upfile.filename = file.getOriginalFilename();
                        // 如果名称不为“”,说明该文件存在，否则说明该文件不存在
                        if (!"".equals(upfile.filename.trim())) {
                            System.out.println(upfile.filename);
                            // 重命名上传后的文件名
                         //   String path = CreateUUID.createUUID();
                            // 定义上传路径
                          //  String file = file.getOriginalFilename();
                            String ext = upfile.filename.substring(upfile.filename.lastIndexOf("."));

                            if (!fileTypes.contains(ext + ":")) {
                                upfile.error="上传文件格式错误";
                            } else {

                                upfile.path = FileStorage.getTempFilename(ext );

                                File localFile = new File(folder+upfile.path);
                                file.transferTo(localFile);
                            }
                            files.add( upfile);

                        }
                    }
                }
                // 记录上传该文件后的时间
                int finaltime = (int) System.currentTimeMillis();

            }

        } catch (Exception e) {
            System.out.print(e);
        }
        return files;
      //  return new UploadFileInfo("上传文件错误");
    }




}
