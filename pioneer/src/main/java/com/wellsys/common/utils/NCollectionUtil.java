package com.wellsys.common.utils;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.reflect.MethodUtils;


public class NCollectionUtil {
	private NCollectionUtil() {
		super();
	}

	public static boolean isNull(Collection list) {
		if (list == null) {
			return true;
		}
		return false;
	}

	public static boolean isNull(Map map) {
		if (map == null) {
			return true;
		}
		return false;
	}

	public static boolean isNullOrEmpty(Collection list) {
		if (list == null) {
			return true;
		}
		if (list.size() == 0) {
			return true;
		}
		return false;
	}

	public static boolean isNullOrEmpty(Map map) {
		if (map == null) {
			return true;
		}
		if (map.size() == 0) {
			return true;
		}
		return false;
	}

	public static boolean isNotNullAndEmpty(Collection list) {
		if (list == null) {
			return false;
		}
		if (list.size() == 0) {
			return false;
		}
		return true;
	}
	public static boolean isNotNullAndEmpty(Object[] list) {
		if (list == null) {
			return false;
		}
		if (list.length == 0) {
			return false;
		}
		return true;
	}
	public static boolean isNotNullAndEmpty(Map map) {
		if (map == null) {
			return false;
		}
		if (map.size() == 0) {
			return false;
		}
		return true;
	}

	public static Map<String, Object> convertToMap(List list, String methodName) {
		Map<String, Object> map = new HashMap<String, Object>();
		for (Object o : list) {
			String key = getKey(o, methodName);
			key = key == null ? "" : key;
			map.put(key, o);
		}
		return map;
	}

	public static Map<String, List<Object>> convertToMapList(List list,
			String methodName) {
		Map<String, List<Object>> map = new HashMap<String, List<Object>>();
		for (Object o : list) {
			String key = getKey(o, methodName);
			key = key == null ? "" : key;
			List<Object> l = (List<Object>) map.get(key);
			if (isNull(l)) {
				l = new ArrayList<Object>();
			}
			l.add(o);
			map.put(key, l);
		}
		return map;
	}

	public static List<Object> intersect(List list, String methodName,
			List toIntersect) {
		List<Object> data = new ArrayList<Object>();
		Map<String, Object> map = convertToMap(toIntersect, "toString");
		for (Object o : list) {
			String key = getKey(o, methodName);
			key = key == null ? "" : key;
			if (map.containsKey(key)) {
				data.add(o);
			}

		}
		return data;
	}

	
	public static String arrayToString(String[] arrays,String format) {
		String ids="";
		if(NCollectionUtil.isNotNullAndEmpty(arrays)){
			for (String array : arrays) {
				if(NStringUtil.isNotNullAndEmpty(array)){
					ids+=array+format;					
				}
			}
		}
		if(ids!="") ids=ids.substring(0, ids.lastIndexOf(format));
		return ids;
	}
	
	private static String getKey(Object obj, String key) {
		try {
			return String
					.valueOf(MethodUtils.invokeExactMethod(obj, key, null));
		} catch (Exception e) {
			return null;
		}
	}
}