package com.wellsys.common.utils.time;

import java.text.SimpleDateFormat;

import org.springframework.beans.propertyeditors.CustomNumberEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.support.WebBindingInitializer;
import org.springframework.web.context.request.WebRequest;

/**
 * 自定义日期、时间的类型绑定
 *
 * @author &lt;a href="http://www.micmiu.com"&gt;Michael Sun&lt;/a&gt;
 */
public class MyDataBinding implements WebBindingInitializer {

    public void initBinder(WebDataBinder binder, WebRequest request) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        dateFormat.setLenient(false);

        SimpleDateFormat datetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        datetimeFormat.setLenient(false);

        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");
        datetimeFormat.setLenient(false);

        binder.registerCustomEditor(java.sql.Date.class,
                new CustomSqlDateEditor(dateFormat, true));

        binder.registerCustomEditor(java.sql.Timestamp.class,
                new CustomTimestampEditor(datetimeFormat, true));

        binder.registerCustomEditor(java.sql.Time.class,
                new CustomTimeEditor(timeFormat, true));

        binder.registerCustomEditor(short.class,                new MyCustomNumberEditor(Short.class, true));
        binder.registerCustomEditor(int.class,                new MyCustomNumberEditor(Integer.class, true));
        binder.registerCustomEditor(float.class,                new MyCustomNumberEditor(Float.class, true));
        binder.registerCustomEditor(double.class,                new MyCustomNumberEditor(Double.class, true));



    }
}