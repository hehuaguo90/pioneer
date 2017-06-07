package com.wellsys.common.utils;

import java.util.UUID;

public class CreateUUID {
	public static String createUUID() {
		UUID uuid = UUID.randomUUID();
		return uuid.toString().replaceAll("-", "");
	}
}
