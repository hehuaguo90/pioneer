package com.wellsys.common.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class System_ConfigUtil {
	private static String CONFIG_FILE = "/system_config.properties";
	private static Properties prop = new Properties();
	
	private System_ConfigUtil(){
		
	}
	static{
		try {
			System.out.println(CONFIG_FILE);
			InputStream is = System_ConfigUtil.class.getResourceAsStream(CONFIG_FILE);
			prop.load(is);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static String getProperty(String key){
		return prop.getProperty(key);
	}

	
}

