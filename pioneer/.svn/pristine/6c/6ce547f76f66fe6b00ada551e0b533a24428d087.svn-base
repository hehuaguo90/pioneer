package com.wellsys.pioneer.module.tSysArea.action;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.wellsys.common.utils.ActionUtil;
import com.wellsys.common.utils.CreateUUID;
import com.wellsys.common.utils.JsonUtils;
import com.wellsys.common.utils.MessageModel;
import com.wellsys.common.utils.MessageUploadModel;
import com.wellsys.common.utils.StaticVal;
import com.wellsys.common.utils.System_ConfigUtil;

@Controller
public class UploadPicAction {
	/**
	 * 上传图片的文件夹名称
	 */
	public static final String TEMP_FOLDER = "dessertation";
	
	/**
	 * @param um
	 * @return
	 */

	@RequestMapping("/upload/upload")
	public void upload(HttpServletRequest request, HttpServletResponse response)
			throws IllegalStateException, IOException {
		// 创建一个通用的多部分解析器
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
				request.getSession().getServletContext());
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		Boolean flag = false;
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
						// System.out.println(myFileName);
						// 重命名上传后的文件名
						// 定义上传路径
						String sourceFileName = file.getOriginalFilename();
						String ext = sourceFileName.substring(sourceFileName
								.lastIndexOf("."));
						String newFileName = CreateUUID.createUUID() + ext;
						String fileType = StaticVal.PIC_TYPE;
						if (fileType.indexOf(ext.toLowerCase() + ":") < 0) {
							flag = true;
						} else {
							String root = StaticVal.UPLOAD_FOLDER;
							String folder = TEMP_FOLDER
									+ File.separator
									+ getFileStoragePath(newFileName);
							String path = root + folder
									+ File.separator;
							// list.add(folder.replace("\\","/") + "/"+path +
							// ext);
							HashMap<String, String> map = new HashMap<String, String>();
							map.put("filename", myFileName);
							map.put("path", folder.replace("\\", "/") + "/"
									+ newFileName);
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
				ActionUtil.addLog(request, 0, "uploadPic", "uploadPic", true,
						"上传图片用时：" + (finaltime - pre) + "毫秒");
			}
		}
		if (flag) {
			JsonUtils.printJSONByObj(response,
					new MessageUploadModel(3, "上传错误：上传文件中有文件格式错误，允许格式："
							+ StaticVal.PIC_TYPE
									.replaceAll(":", "，"), list), null);
		} else {
			List<String> listURL = new ArrayList<String>();
			for (int i = 0; i < list.size(); i++) {
				listURL.add(list.get(i).get("path"));
			}
			JsonUtils.printJSONByObj(response, new MessageUploadModel(1,
					"上传成功！", listURL), null);
		}
	}

	@RequestMapping("/upload/delUpload")
	public void delUpload(@RequestParam(value = "fileUrl[]") String[] fileUrl,
			HttpServletRequest request, HttpServletResponse response)
			throws IllegalStateException, IOException {
		String root = StaticVal.UPLOAD_FOLDER;
		try {
			for (String url : fileUrl) {
				if(url.indexOf("transientImg.png") != -1){
					continue;
				}
				url = url.replaceAll("/", "\\" + File.separator);
				File f = new File(root + url);
				if (f.exists()) {
					f.delete();
				}
			}
			JsonUtils.printJSONByObj(response, new MessageModel(1, "删除成功！"),
					null);
		} catch (Exception e) {
			e.printStackTrace();
			JsonUtils.printJSONByObj(response, new MessageModel(3, "删除异常！"),
					null);
		}
	}

	private String getFileStoragePath(String newFileName) {

		return newFileName.substring(0, 2) + File.separator
				+ newFileName.substring(2, 4) + File.separator
				+ newFileName.substring(4, 6);
	}

	private String getAcceptFileTypes(HttpServletRequest request) {
		String fileType = request.getSession().getServletContext()
				.getInitParameter(request.getParameter("_fileType"));
		if (fileType == null)
			fileType = request.getSession().getServletContext()
					.getInitParameter("pic_type");
		return fileType;
	}
}
