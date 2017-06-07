package com.wellsys.common.utils.file;


import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.wellsys.common.utils.ActionUtil;
import com.wellsys.common.utils.CreateUUID;
import com.wellsys.common.utils.JsonUtils;
import com.wellsys.common.utils.MessageConfig;
import com.wellsys.common.utils.MessageModel;
import com.wellsys.common.utils.MessageUploadModel;

@Controller
@RequestMapping("/files")
public class UploadAction {


    @RequestMapping("/upload")
    public void upload(HttpServletRequest request,
                       HttpServletResponse response) throws IllegalStateException,
            IOException {
        try {

            String tempDir = FileStorage.getTempDir();

            String fileType = getAcceptFileTypes(request);

            List<UploadUtil.UploadFileInfo> files = UploadUtil.loadFile(tempDir, request, fileType);

            if (files.size() > 0 && files.get(0).error != null) {

                JsonUtils.printJSONByObj(response,
                        new MessageUploadModel(3, "上传错误：上传文件中有文件格式错误，允许格式："
                                + fileType.replaceAll(":", "，"), files), null);

                ActionUtil.addLog(request, 2, "upload", "upload", false, "上传文件错误!");
            } else {
                JsonUtils.printJSONByObj(response, new MessageUploadModel(1, "上传成功！", files), null);
                ActionUtil.addLog(request, 2, "upload", "upload", true, "上传文件错误!");
            }
        } catch (Exception e) {
            System.out.print(e);
        }
    }

    private String getAcceptFileTypes(HttpServletRequest request) {
         String fileType = request.getSession().getServletContext().getInitParameter(request.getParameter("_fileType"));
        if (fileType == null)
             fileType = request.getSession().getServletContext().getInitParameter("pic_type");
        return fileType;
    }

    @RequestMapping("/upload2")
    public void upload2(HttpServletRequest request,
                        HttpServletResponse response) throws IllegalStateException,
            IOException {
        try {
            // 创建一个通用的多部分解析器
            CommonsMultipartResolver multipartResolver =
                    new CommonsMultipartResolver(request.getSession().getServletContext());
            List<Map<String, String>> list = new ArrayList<Map<String, String>>();
            Boolean flag = false;

            String fileType = getAcceptFileTypes(request);

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
                        // 取得当前上传文件的文件名称
                        String myFileName = file.getOriginalFilename();
                        // 如果名称不为“”,说明该文件存在，否则说明该文件不存在
                        if (!"".equals(myFileName.trim())) {
                            System.out.println(myFileName);
                            // 重命名上传后的文件名
                            // 定义上传路径
                            String sourceFileName = file.getOriginalFilename();
                            String ext = sourceFileName.substring(sourceFileName.lastIndexOf("."));
                            String newFileName = CreateUUID.createUUID() + ext;
                            if (fileType.indexOf(ext.toLowerCase() + ":") < 0) {
                                flag = true;
                            } else {
                                String root = MessageConfig.getMessage("upload_folder");
                                String folder = getFileStoragePath(newFileName);
                                String path = root + File.separator + folder + File.separator;
                                //list.add(folder.replace("\\","/") + "/"+path + ext);
                                HashMap<String, String> map = new HashMap<String, String>();
                                map.put("filename", myFileName);
                                map.put("path", folder.replace("\\", "/") + "/" + newFileName);
                                list.add(map);
                                File dir = new File(path);
                                if (!dir.exists()) {
                                    dir.mkdirs();
                                }
                                File localFile = new File(path + newFileName);
                                file.transferTo(localFile);
                            }
                        }
                    }
                    // 记录上传该文件后的时间
                    int finaltime = (int) System.currentTimeMillis();

                    ActionUtil.addLog(request, 0, "upload", "upload", true, "上传文件用时：" + (finaltime - pre) + "毫秒");

                }
            }
            if (flag) {

                JsonUtils.printJSONByObj(response,
                        new MessageUploadModel(3, "上传错误：上传文件中有文件格式错误，允许格式："
                                + fileType.replaceAll(":", "，"), list), null);

                ActionUtil.addLog(request, 2, "upload", "upload", false, "上传文件错误!");
            } else {
                JsonUtils.printJSONByObj(response, new MessageUploadModel(1, "上传成功！", list), null);
                ActionUtil.addLog(request, 2, "upload", "upload", true, "上传文件错误!");
            }
        } catch (Exception e) {
            System.out.print(e);
        }
    }

    private String getFileStoragePath(String newFileName) {

        return newFileName.substring(0, 2) + File.separator + newFileName.substring(2, 4)
                + File.separator + newFileName.substring(4, 6);
    }

    @RequestMapping("/delete")
    public void delUpload(@RequestParam(value = "fileUrl[]") String[] fileUrl,
                          HttpServletRequest request, HttpServletResponse response)
            throws IllegalStateException, IOException {
        try {
            for (String url : fileUrl) {
                url = url.replaceAll("/", "\\" + File.separator);
                FileStorage.deleteFile(url);
            }
            JsonUtils.printJSONByObj(response, new MessageModel(1, "删除成功！"), null);
            ActionUtil.addLog(request, 2, "delUpload", "upload", true, "删除上传文件成功!");
        } catch (Exception e) {
            e.printStackTrace();
            JsonUtils.printJSONByObj(response, new MessageModel(3, "删除异常！"), null);
            ActionUtil.addLog(request, 2, "delUpload", "upload", false, "删除上传文件异常!");
        }
    }


    @RequestMapping("/load/{fileName}/")
    public void loadAttach(@PathVariable(value = "fileName") String fileName,
                           HttpServletRequest request, HttpServletResponse response)
            throws IllegalStateException, IOException {
  //      fileName=fileName+".jpg";

         String contentType = request.getSession().getServletContext().getMimeType(fileName);

        FileOutputStream fis = null;
        response.setContentType(contentType);
        try {

            if (fileName.length() > 6) {
                File file = new File(FileStorage.getStorageFileFullPath(fileName));
                if (file.exists()) {
                    OutputStream out = response.getOutputStream();
                    FileInputStream  in = new FileInputStream(file.getPath());

                    byte[] buffer = new byte[1024];
                    int i;
                    while ((i = in.read(buffer)) != -1) {
                        out.write(buffer, 0, i);
                    }
                    in.close();
                    out.flush();
                    return;
                }
            }
            response.sendError(response.SC_NOT_FOUND);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }


}
