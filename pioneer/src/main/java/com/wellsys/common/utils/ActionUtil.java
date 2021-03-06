package com.wellsys.common.utils;



import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by zhyy on 2015/9/7.
 */
public class ActionUtil {

    public static class ParamMap<K, V> extends HashMap<K,V>

    {
        @Override
        public boolean containsKey(Object key) {
            return true;
        }
    }

    public static Map<String, String> getRequestMap(Map<String, String[]>  param) {
      //  Map<String, String> resultMap = new ParamMap<String, String>();
        Map<String, String> resultMap = new HashMap<String, String>();

        for ( Map.Entry<String, String[]> entry : param.entrySet()) {
            if (((String[]) entry.getValue()).length == 1) {
                String value=entry.getValue()[0].trim();
                if(! "".equals(value))
                resultMap.put((String) entry.getKey(), entry.getValue()[0]);

            } else {
                StringBuilder sb = new StringBuilder();
                for (String s : (String[]) entry.getValue()) {
                    if (sb.length() > 0)
                        sb.append(",");
                    sb.append(s);
                }
                String value=sb.toString().trim();
                if(!"".equals(value))
                resultMap.put((String) entry.getKey(),value);
            }
        }
        return resultMap;
    }

    /**
     * 记录用户操作日志
     * @param request 请求参数
     * @param infoType 信息类型
     * @param operType 操作类型
     * @param module 模块名称
     * @param     status 操作结果： true 成功，false 失败；
     * @param     message  描述信息；
     */

    public static  void  addLog(HttpServletRequest request,Integer infoType, String operType,String module ,boolean status,String message)
    {

    }
}
