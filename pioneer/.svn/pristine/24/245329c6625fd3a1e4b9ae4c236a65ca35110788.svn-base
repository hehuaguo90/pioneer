package com.wellsys.common.utils;

import com.github.abel533.echarts.Option;
import com.github.abel533.echarts.axis.CategoryAxis;
import com.github.abel533.echarts.axis.ValueAxis;
import com.github.abel533.echarts.code.Trigger;
import com.github.abel533.echarts.series.Bar;
import com.github.abel533.echarts.series.Line;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.jdbc.support.rowset.SqlRowSetMetaData;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by zhyy on 2015/12/17.
 *
 */
public class EChartsUtils {


    /**
     * 加载数据到二维数组。 List<Object>中，每个object 是一个list装载一行数据。 第一行（list.get(0)）是字段名称。
     * 如果进行行列转换，字段名称在第一列，源数据库中第一行的数据在第一列。
     * @param rs 数据集
     * @param isConversion 是否进行行列转换，true，进行行列转换，false不转换。
     * @return 数据内容。List<Object>中，每个object 是一个list装载一行数据。
     */
    @SuppressWarnings("unchecked")
    public static List<Object> loadDatas(SqlRowSet rs,boolean isConversion) {
        // 第一列是X轴，值是Y轴，字段名称是数据名称

        SqlRowSetMetaData metaData = rs.getMetaData();

        List<Object> values = new ArrayList<Object>();

        if(!isConversion)
        {
            values.add(Arrays.asList(metaData.getColumnNames()));

            while (rs.next()) {
                List<Object> data = new LinkedList<Object>();
                for (int i = 1; i <= metaData.getColumnCount(); i++) {
                    data.add(rs.getString(i));
                }
                values.add(data);
            }
        }
        else {
            for (int i = 0; i < metaData.getColumnCount(); i++) {
                values.add(new ArrayList<Object>());
            }

            for (int i = 0; i < metaData.getColumnCount(); i++) {
                List<Object> data = (List<Object>) values.get(i);
                data.add(metaData.getColumnName(i + 1));
            }

            while (rs.next()) {
                for (int i = 0; i < metaData.getColumnCount(); i++) {
                    List<Object> data = (List<Object>) values.get(i);
                    data.add(rs.getString(i + 1));
                }
            }
        }
        return values;
    }

    @SuppressWarnings("unchecked")
    public static Option toBar(List<Object> values) {
        Option option = new Option();
        option.tooltip(Trigger.axis);
        option.yAxis(new ValueAxis());
        //横轴为值轴
        CategoryAxis category = new CategoryAxis();
        List head = (List<Object>) values.get(0);
        category.setData(head.subList(1, head.size()));
        option.xAxis().add(category);

        for (int i = 1; i < values.size(); i++) {
            List data = (List<Object>) values.get(i);
            String legend = (String) data.get(0);
            option.legend().data(legend);
            Bar bar = new Bar(legend);
            bar.setData(data.subList(1, data.size()));
            option.series(bar);
        }
        return option;
    }

    @SuppressWarnings("unchecked")
    public static Option toLine(List<Object> values) {
        Option option = new Option();
        option.tooltip(Trigger.axis);
        option.yAxis(new ValueAxis());
        //横轴为值轴
        CategoryAxis category = new CategoryAxis();
        List head = (List<Object>) values.get(0);
        category.setData(head.subList(1, head.size()));
        option.xAxis().add(category);

        for (int i = 1; i < values.size(); i++) {
            List data = (List<Object>) values.get(i);
            String legend = (String) data.get(0);
            option.legend().data(legend);
            Line line = new Line(legend);
            line.setData(data.subList(1, data.size()));
            option.series(line);
        }
        return option;
    }
}
