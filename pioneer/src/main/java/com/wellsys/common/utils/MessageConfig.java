package com.wellsys.common.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class MessageConfig {
	private static MessageSource messageSource;

	public static String getMessage(String key) {
		try {
			return messageSource.getMessage(key, new Object[] {}, Locale.ROOT);
		} catch (Exception e) {
			e.printStackTrace();
			return e.getMessage();
		}
	}

	@Autowired
	public void setMessageSource(MessageSource messageSource) {
		MessageConfig.messageSource = messageSource;
	}
}