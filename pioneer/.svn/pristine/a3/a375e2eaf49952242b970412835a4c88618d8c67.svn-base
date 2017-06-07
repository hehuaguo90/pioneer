package com.wellsys.common.utils;

import org.apache.poi.ss.usermodel.Cell;

public class ExcleTool {

	  /**
     * excel单元格格式转换
     * @param cell
     * @return
     */
    public static String cellFormatHandler(Cell cell)
    {
    	
    	//如果为null，返回空
    	String result = "";
    	if(cell == null)
    	{
    		return result;
    	}else{
    		cell.setCellType(Cell.CELL_TYPE_STRING);
    		result = cell.getStringCellValue();
    	}
    	
    	return result;
    }
    
}
