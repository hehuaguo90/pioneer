package com.wellsys.common.utils.file;
import java.io.File;
import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.log4j.Logger;

import com.wellsys.common.utils.StaticVal;
import com.wellsys.common.utils.Util;
/**
 * @Description: 定时（24小时）删除的类
 * @Author hehg
 * @Date 2017-1-19 下午1:53:24
 */
public class FileDeleter extends TimerTask {
    private static final String targetPath1 = StaticVal.TENDANALYZEWORD_DOC_DIR;
    private Timer timer = new Timer();
    
    private Calendar calendar = Calendar.getInstance();
    private Logger log=Logger.getLogger(getClass());
    public static void main(String[] args) {
        FileDeleter fm = new FileDeleter();
        fm.start();
    }
    private static void delFiles(String[] dir) {
        for (int i = 0; i < dir.length; i++) {
            File f = new File(dir[i]);
            File[] files = null;
            if (f.exists()) {
                files = f.listFiles();
                for (int j = 0; j < files.length; j++) {
                    files[j].delete();
                }
            }
        }
    }
    public void start() {
        //每隔24小时删除一次
        timer.scheduleAtFixedRate(this, new Date(), 1000 * 3600 * 24);   
    }
    public void run() {    
    	String info=Util.getCurrentTime(null)+"删除目录"+targetPath1+"下的文件。";
    	log.info(info);
        delFiles(new String[] { targetPath1 });    
        /*下班之前停止任务 ~.~
        if(calendar.get(Calendar.HOUR_OF_DAY) == 17 && calendar.get(Calendar.MINUTE) == 15){
            this.cancel();
        }*/
    }
}
