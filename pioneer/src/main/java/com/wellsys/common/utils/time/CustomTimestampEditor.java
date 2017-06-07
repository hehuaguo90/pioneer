package com.wellsys.common.utils.time;
 
import java.beans.PropertyEditorSupport;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import org.springframework.util.StringUtils;
import java.text.ParseException;
 
/**
 * Property editor for &lt;code&gt;java.sql.Timestamp&lt;/code&gt;,&lt;br&gt;
 * supporting a custom &lt;code&gt;java.text.DateFormat&lt;/code&gt;.
 *
 * @author &lt;a href="http://www.micmiu.com"&gt;Michael Sun&lt;/a&gt;
 */
public class CustomTimestampEditor extends PropertyEditorSupport {
 
	private final SimpleDateFormat dateFormat;
	private final boolean allowEmpty;

	public CustomTimestampEditor() {
		this.dateFormat = new SimpleDateFormat("yyyy-MM-dd ");
		this.allowEmpty = true;
	}

	public CustomTimestampEditor(SimpleDateFormat dateFormat, boolean allowEmpty) {
		this.dateFormat = dateFormat;
		this.allowEmpty = allowEmpty;
	}
 

	public void setAsText(String text) throws IllegalArgumentException {
		if ((this.allowEmpty) && (!(StringUtils.hasText(text)))) {
			setValue(null);
		} else {
			try {
				setValue(new Timestamp(this.dateFormat.parse(text).getTime()));
			} catch (ParseException ex) {
				throw new IllegalArgumentException("Could not parse date: "
						+ ex.getMessage(), ex);
			}
		}
	}
 
	public String getAsText() {
		Timestamp value = (Timestamp) getValue();
		return ((value != null) ? this.dateFormat.format(value) : "");
	}
}