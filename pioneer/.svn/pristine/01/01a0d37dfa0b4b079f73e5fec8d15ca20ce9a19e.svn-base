
(function () {
    if (window.chart)
        return;

    var $ = jQuery;
    var kernel = window["kernel@1.3"];

    var chart = window.chart = {};

    chart.MyCharts = function(id,url){
        this.viewId=id;
        this.url=url;
        this.ec= echarts.init(document.getElementById(this.viewId));


        if(url)
            this.load(url);

    };

    chart.MyCharts.prototype.initAndLoad = function (id,url) {

        this.viewId=id;
        this.url=url;
        this.ec= echarts.init(document.getElementById(this.viewId));

        this.load(url);
    };

    chart.MyCharts.prototype.load = function (url) {
        var ch=this;
         page.send({
            url : url
        }).then(function(data) {
             ch.draw(data, true);
        });

    };
    chart.MyCharts.prototype.draw= function (data ) {

        this.ec.setOption(data, true);

    }
})();