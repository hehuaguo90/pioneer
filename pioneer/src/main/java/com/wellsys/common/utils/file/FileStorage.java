package com.wellsys.common.utils.file;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellsys.common.utils.CreateUUID;
import com.wellsys.common.utils.StaticVal;

import java.io.File;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by zhyy on 2015/12/9.
 * 处理文件存储操作
 */
public class FileStorage {
    public static final String TEMP_FILE_PRE="TMP_";


    public static String getTempDir() {
        File dir = new File(getStorageRootDir()+"tmp/");
        if (!dir.exists()) {
            dir.mkdirs();
        }
        return getStorageRootDir()+"tmp/";
    }

    public  static  String getStorageRootDir()
    {
        String root = StaticVal.CACHE_PATH + "temp/";
        File dir = new File(root);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        return root;
    }

    {
        File dir = new File(getStorageRootDir());
        if (!dir.exists()) {
            dir.mkdirs();
        }

          dir = new File(getTempDir());
        if (!dir.exists()) {
            dir.mkdirs();
        }
    }
    public static String formatPath(String folder) {
        if (folder == null || folder.length() == 0)
            return "";

        String path = folder.trim();

        if (path.length() == 0)
            return "";

        if (!(path.charAt(path.length() - 1) == '/' || path.charAt(path.length() - 1) == '\\'))
            path = path + File.separator;

        path = path.replace("\\", "/");
        return path;
    }



    /**
     * 将文件从本地临时目录上传到文件服务器。
     * 本例只是简单讲文件移动到正式的文件存储目录。
     * @param filename 移动的文件
     * @return 移动成返回true。否则返回false；
     */

    public static String moveFileToStorageServer(String filename)
    {

        if(filename.substring(0,filename.lastIndexOf(".")).length()!=(TEMP_FILE_PRE.length()+32))
            return filename;

        String newFilename=filename.substring(TEMP_FILE_PRE.length());

        String storagePath=getStorageRootDir()+getFileStoragePath(newFilename)+File.separator+newFilename;

        File file=new File(getTempDir()+filename);

         file.renameTo(new File(storagePath));

        return newFilename;

    }
    public  static  String getFileStoragePath(String filename) {

        String path= filename.substring(0, 2) + File.separator + filename.substring(2, 4)
                + File.separator + filename.substring(4, 6) ;
        File dir = new File(getStorageRootDir()+path);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        return path;
    }
    public static String getStorageFileFullPath(String file)
    {
        if(file.startsWith(TEMP_FILE_PRE))
        {
            return getTempDir() +  File.separator + file;
        }
        else {
            return getStorageRootDir() + getFileStoragePath(file) + File.separator + file;
        }
    }


    public static String getTempFilename(String ext) {
        return  FileStorage.TEMP_FILE_PRE+ CreateUUID.createUUID() + ext;
    }

    public static boolean deleteFile(String filename)
    {
        filename=filename.trim();
       String name= filename.substring(0,filename.lastIndexOf("."));
       String path;
        if(name.length() ==(TEMP_FILE_PRE.length()+32) && name.startsWith(TEMP_FILE_PRE) )
        {
            path=getTempDir()+filename;
        }
        else  if(name.length() == 32)
        {
            path=getStorageFileFullPath(filename);
        }
        else
        return false;


        File file=new File(path);

        return  file.delete();
    }

    public  static String  processStorageFiles(String filesJson)
    {

        if(filesJson==null || filesJson.length()==0)
            return filesJson;

        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        try {
          //  List< UploadUtil.UploadFileInfo> files;
            UploadUtil.UploadFileInfo[]  files = mapper.readValue(filesJson,  UploadUtil.UploadFileInfo[].class);

            for(UploadUtil.UploadFileInfo file:files)
            {
                file.path= moveFileToStorageServer(file.path);
            }

            return mapper.writeValueAsString(files);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return  filesJson;
    }
}
