package com.wellsys.common.utils.time;

import org.springframework.util.StringUtils;

import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;

/**
 * Property editor for &lt;code&gt;java.sql.Timestamp&lt;/code&gt;,&lt;br&gt;
 * supporting a custom &lt;code&gt;java.text.DateFormat&lt;/code&gt;.
 *
 * @author &lt;a href="http://www.micmiu.com"&gt;Michael Sun&lt;/a&gt;
 */
public class CustomTimeEditor extends PropertyEditorSupport {

	private final SimpleDateFormat dateFormat;
	private final boolean allowEmpty;

	public CustomTimeEditor() {
		this.dateFormat = new SimpleDateFormat("HH:mm:ss");
		this.allowEmpty = true;
	}

	public CustomTimeEditor(SimpleDateFormat dateFormat, boolean allowEmpty) {
		this.dateFormat = dateFormat;
		this.allowEmpty = allowEmpty;
	}


 
	public void setAsText(String text) throws IllegalArgumentException {
		if ((this.allowEmpty) && (!(StringUtils.hasText(text)))) {
			setValue(null);
		} else {
			try {
				setValue(new java.sql.Time(this.dateFormat.parse(text).getTime()));
			} catch (ParseException ex) {
				throw new IllegalArgumentException("Could not parse date: "
						+ ex.getMessage(), ex);
			}
		}
	}
 
	public String getAsText() {
		java.sql.Time value = (java.sql.Time) getValue();
		return ((value != null) ? this.dateFormat.format(value) : "");
	}
}