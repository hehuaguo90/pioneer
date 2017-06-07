<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*,java.io.*" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page import="org.apache.commons.fileupload.disk.*" %>
<%@ page import="org.apache.commons.fileupload.servlet.*" %>
<%@ page import="net.sf.json.*" %>
<%@ page import="org.apache.commons.io.output.DeferredFileOutputStream" %>
<%

	//文件保存目录路径
	//String savePath = application.getAttribute("filePath") + "goods/";
	String savePath = System.getProperty("user.dir");
	//文件保存目录URL
	String saveUrl  = application.getAttribute("fileUrl") + "goods/";
	
	//之 Shop s = (Shop)session.getAttribute("loginShop");
	//int sid = s.getShopId();
   //	int sid = 1;
	 int sid = savePath.lastIndexOf(File.separator);
	
	//System.out.println(savePath);
	
	//System.out.println(saveUrl);
	
	//System.out.println(sid);
	
	//定义允许上传的文件扩展名
	HashMap<String, String> extMap = new HashMap<String, String>();
	//extMap.put("image", "gif,jpg,jpeg,png,bmp");
	//extMap.put("flash", "swf,flv");
	//extMap.put("media", "swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb");
	extMap.put("file", "doc,docx,xls,xlsx,ppt,htm,html,txt,zip,rar,gz,bz2");
	
	//允许最大上传文件大小 
	long maxSize = 20000000; //2*1024*1024
	
	response.setContentType("text/html; charset=UTF-8");
	
	if(!ServletFileUpload.isMultipartContent(request)){
		out.println(getError("请选择文件。"));
		return;
	}
	 String suffixName1 = savePath.substring(0, sid);
     SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		String tmp = sdf.format(new Date());
		
     savePath = suffixName1 + "/cityManageUploads/"+tmp+"/";
	//检查目录
//	sysout.println(savePath);
//	System.out.println(savePath);
	File uploadDir = new File(savePath);
	if (!uploadDir.exists()) {  
		uploadDir.mkdirs();  
    }  
	if(!uploadDir.isDirectory()){
		out.println(getError("上传目录不存在。"));
		return;
	}
	//检查目录写权限
	if(!uploadDir.canWrite()){
		out.println(getError("上传目录没有写权限。"));
		return;
	}
	
	String dirName = request.getParameter("dir");//image
//	System.out.println(dirName);
	if (dirName == null) {
		dirName = "file";
	}
	if(!extMap.containsKey(dirName)){
		out.println(getError("目录名不正确。"));
		return;
	}
	//创建文件夹
	//savePath += dirName + "/";//D:\Tomcat6.0\webapps\zswz\attached/image/
	saveUrl += dirName + "/";///zswz/attached/image/
	File saveDirFile = new File(savePath);
	if (!saveDirFile.exists()) {
		saveDirFile.mkdirs();
	}
	//SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
	//String ymd = sdf.format(new Date());
	//savePath += sid + "/";//D:\Tomcat6.0\webapps\zswz\attached/image/20111129/
	saveUrl += sid + "/";///zswz/attached/image/20111129/
	File dirFile = new File(savePath);
	if (!dirFile.exists()) {
		dirFile.mkdirs();
	}
	if (!dirFile.isDirectory()) {
	    out.println(getError("上传目录不存在 。"));
	    return;
	}
	//检查目录写入权限
	if (!dirFile.canWrite()) {
	    out.println(getError("上传目录没有写入权限。"));
	    return;
	}
	
	FileItemFactory factory = new DiskFileItemFactory();
	ServletFileUpload upload = new ServletFileUpload(factory);
	upload.setHeaderEncoding("UTF-8");
	List items = upload.parseRequest(request);
	Iterator itr = items.iterator();
	while (itr.hasNext()) {
		FileItem item = (FileItem) itr.next();
		String fileName = item.getName();
		long fileSize = item.getSize();
		if (!item.isFormField()) {
			//检查文件大小
			if(item.getSize() > maxSize){
				out.println(getError("上传文件大小超过限制，需小于2M"));
				return;
			}
			//检查扩展名
			String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
			if(!Arrays.<String>asList(extMap.get(dirName).split(",")).contains(fileExt)){
				out.println(getError("上传文件扩展名是不允许的扩展名，\n只允许" + extMap.get(dirName) + "格式。"));
				return;
			}

			SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
			String newFileName = sid + df.format(new Date()) + "_" + new Random().nextInt(1000) + "." + fileExt;
			try{
		//		 System.out.println(savePath);
				File uploadedFile = new File(savePath, newFileName);
				item.write(uploadedFile);
			}catch(Exception e){
				e.printStackTrace();
				out.println(getError("上传文件失败。"));
				return;
			}

			//发送给 信息
			JSONObject obj = new JSONObject();
			obj.put("error", 0);
			//obj.put("url", saveUrl +"/" + newFileName);
			obj.put("fileId", newFileName);
			///zswz/attached/image/20111129/  image 20111129195421_593.jpg
			out.println(obj.toString());
		}
	}
%>
<%!
private String getError(String message) {
	JSONObject obj = new JSONObject();
	obj.put("error", 1);
	obj.put("message", message);
	return obj.toString();
}
%>