package com.wellsys.common.utils.time;

//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

import org.springframework.util.NumberUtils;
import org.springframework.util.StringUtils;

import java.beans.PropertyEditorSupport;
import java.text.NumberFormat;


import java.beans.PropertyEditorSupport;
import java.text.NumberFormat;
import org.springframework.util.NumberUtils;
import org.springframework.util.StringUtils;

public class MyCustomNumberEditor extends PropertyEditorSupport {
    private final Class<? extends Number> numberClass;
    private final NumberFormat numberFormat;
    private final boolean allowEmpty;

    public MyCustomNumberEditor(Class<? extends Number> numberClass, boolean allowEmpty) throws IllegalArgumentException {
        this(numberClass, (NumberFormat)null, allowEmpty);
    }

    public MyCustomNumberEditor(Class<? extends Number> numberClass, NumberFormat numberFormat, boolean allowEmpty) throws IllegalArgumentException {
        if(numberClass != null && Number.class.isAssignableFrom(numberClass)) {
            this.numberClass = numberClass;
            this.numberFormat = numberFormat;
            this.allowEmpty = allowEmpty;
        } else {
            throw new IllegalArgumentException("Property class must be a subclass of Number");
        }
    }

    public void setAsText(String text) throws IllegalArgumentException {
        if(this.allowEmpty && !StringUtils.hasText(text)) {
            this.setValue(0);
        } else if(this.numberFormat != null) {
            this.setValue(NumberUtils.parseNumber(text, this.numberClass, this.numberFormat));
        } else {
            this.setValue(NumberUtils.parseNumber(text, this.numberClass));
        }

    }

    public void setValue(Object value) {
        if(value instanceof Number) {
            super.setValue(NumberUtils.convertNumberToTargetClass((Number)value, this.numberClass));
        } else {
            super.setValue(value);
        }

    }

    public String getAsText() {
        Object value = this.getValue();
        return value == null?"":(this.numberFormat != null?this.numberFormat.format(value):value.toString());
    }
}
