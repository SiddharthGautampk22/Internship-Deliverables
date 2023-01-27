/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 3.0, "series": [{"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-16", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-17", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-14", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-15", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-18", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-19", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-12", "isController": false}, {"data": [[4400.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-13", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939783015&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=200064135&cv=2.0.1&z=2092270200&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fcareers-at-366pi-tech&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=72ea74d7-3da0-5775-8e8b-a55ca230259c&ht=perf&tce=1673939779721&tcs=1673939779721&tdc=1673939783009&tdclee=1673939782638&tdcles=1673939782632&tdi=1673939782071&tdl=1673939780319&tdle=1673939779721&tdls=1673939779721&tfs=1673939779721&tns=1673939779718&trqs=1673939779726&tre=1673939780338&trps=1673939780312&tles=1673939783009&tlee=0&nt=navigate&lcp=2664&nav_type=hard", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-10", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-11", "isController": false}, {"data": [[9500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939782070&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=200064135&cv=2.0.1&z=211979270&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fcareers-at-366pi-tech&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=725c4f67-2b3f-5809-b748-49b3d5834590&ht=pageview", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-9", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-8", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-7", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-2", "isController": false}, {"data": [[0.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-1", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-0", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-6", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-5", "isController": false}, {"data": [[1400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-4", "isController": false}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-3", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-15", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-14", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-13", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-12", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-19", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-18", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-17", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-16", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-1", "isController": false}, {"data": [[200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-2", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-3", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-4", "isController": false}, {"data": [[100.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-0", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-9", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-5", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-6", "isController": false}, {"data": [[2500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-7", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-8", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-63", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-64", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-61", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-62", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-11", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-10", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-65", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-66", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-26", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-25", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-24", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-23", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-60", "isController": false}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-29", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-28", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-27", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-58", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-59", "isController": false}, {"data": [[15500.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-52", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-53", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-50", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-51", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-56", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-22", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-57", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-21", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-54", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-20", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-55", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-37", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-36", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-35", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-34", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-39", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-38", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-49", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-47", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-48", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-41", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-42", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-40", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-45", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-33", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-46", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-32", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-43", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-31", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-44", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-30", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-48", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-47", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939777227&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=158400799&cv=2.0.1&z=260732967&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=6a60487b-6d99-51d8-93dd-164080717f35&ht=perf&tce=1673939773421&tcs=1673939773421&tdc=1673939777214&tdclee=1673939776534&tdcles=1673939776531&tdi=1673939776510&tdl=1673939774181&tdle=1673939773421&tdls=1673939773421&tfs=1673939773421&tns=1673939773419&trqs=1673939773423&tre=1673939774457&trps=1673939774175&tles=1673939777214&tlee=0&nt=reload&lcp=2278&nav_type=hard", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-46", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-45", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-49", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-38", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-39", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-36", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-37", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-30", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-40", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-31", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-34", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-44", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-35", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-43", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-32", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-42", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-33", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-41", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939776504&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=158400799&cv=2.0.1&z=1796504295&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=97264e84-bf1e-5db2-a53e-bf39e4a8aeb4&ht=pageview", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-27", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-28", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-25", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-26", "isController": false}, {"data": [[4500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-29", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-51", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-20", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-50", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-23", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-24", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-21", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-53", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-22", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-52", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 15500.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 6.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 114.0, "series": [{"data": [[0.0, 114.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 22.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 6.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.67394E12, "maxY": 1.0, "series": [{"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-8", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-6", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-7", "isController": false}, {"data": [[1.67394E12, 1.0], [1.67394006E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67394006E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 82.0, "minX": 0.0, "maxY": 15599.0, "series": [{"data": [[1.0, 297.0]], "isOverall": false, "label": "https://366pi.tech/-16", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "https://366pi.tech/-16-Aggregated", "isController": false}, {"data": [[1.0, 304.0]], "isOverall": false, "label": "https://366pi.tech/-17", "isController": false}, {"data": [[1.0, 304.0]], "isOverall": false, "label": "https://366pi.tech/-17-Aggregated", "isController": false}, {"data": [[1.0, 582.0]], "isOverall": false, "label": "https://366pi.tech/-14", "isController": false}, {"data": [[1.0, 582.0]], "isOverall": false, "label": "https://366pi.tech/-14-Aggregated", "isController": false}, {"data": [[1.0, 1419.0]], "isOverall": false, "label": "https://366pi.tech/-15", "isController": false}, {"data": [[1.0, 1419.0]], "isOverall": false, "label": "https://366pi.tech/-15-Aggregated", "isController": false}, {"data": [[1.0, 885.0]], "isOverall": false, "label": "https://366pi.tech/-18", "isController": false}, {"data": [[1.0, 885.0]], "isOverall": false, "label": "https://366pi.tech/-18-Aggregated", "isController": false}, {"data": [[1.0, 868.0]], "isOverall": false, "label": "https://366pi.tech/-19", "isController": false}, {"data": [[1.0, 868.0]], "isOverall": false, "label": "https://366pi.tech/-19-Aggregated", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-12", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-12-Aggregated", "isController": false}, {"data": [[1.0, 4434.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/", "isController": false}, {"data": [[1.0, 4434.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-Aggregated", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/-13", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/-13-Aggregated", "isController": false}, {"data": [[1.0, 647.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939783015&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=200064135&cv=2.0.1&z=2092270200&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fcareers-at-366pi-tech&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=72ea74d7-3da0-5775-8e8b-a55ca230259c&ht=perf&tce=1673939779721&tcs=1673939779721&tdc=1673939783009&tdclee=1673939782638&tdcles=1673939782632&tdi=1673939782071&tdl=1673939780319&tdle=1673939779721&tdls=1673939779721&tfs=1673939779721&tns=1673939779718&trqs=1673939779726&tre=1673939780338&trps=1673939780312&tles=1673939783009&tlee=0&nt=navigate&lcp=2664&nav_type=hard", "isController": false}, {"data": [[1.0, 647.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939783015&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=200064135&cv=2.0.1&z=2092270200&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fcareers-at-366pi-tech&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=72ea74d7-3da0-5775-8e8b-a55ca230259c&ht=perf&tce=1673939779721&tcs=1673939779721&tdc=1673939783009&tdclee=1673939782638&tdcles=1673939782632&tdi=1673939782071&tdl=1673939780319&tdle=1673939779721&tdls=1673939779721&tfs=1673939779721&tns=1673939779718&trqs=1673939779726&tre=1673939780338&trps=1673939780312&tles=1673939783009&tlee=0&nt=navigate&lcp=2664&nav_type=hard-Aggregated", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/-10", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/-10-Aggregated", "isController": false}, {"data": [[1.0, 603.0]], "isOverall": false, "label": "https://366pi.tech/-11", "isController": false}, {"data": [[1.0, 603.0]], "isOverall": false, "label": "https://366pi.tech/-11-Aggregated", "isController": false}, {"data": [[1.0, 9532.0]], "isOverall": false, "label": "https://366pi.tech/", "isController": false}, {"data": [[1.0, 9532.0]], "isOverall": false, "label": "https://366pi.tech/-Aggregated", "isController": false}, {"data": [[1.0, 268.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939782070&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=200064135&cv=2.0.1&z=211979270&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fcareers-at-366pi-tech&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=725c4f67-2b3f-5809-b748-49b3d5834590&ht=pageview", "isController": false}, {"data": [[1.0, 268.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939782070&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=200064135&cv=2.0.1&z=211979270&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fcareers-at-366pi-tech&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=725c4f67-2b3f-5809-b748-49b3d5834590&ht=pageview-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-9", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-9-Aggregated", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-8", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-8-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-7", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-7-Aggregated", "isController": false}, {"data": [[1.0, 294.0], [0.0, 107.5]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-2", "isController": false}, {"data": [[0.33333333333333337, 169.66666666666666]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-2-Aggregated", "isController": false}, {"data": [[1.0, 126.0], [0.0, 99.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-1", "isController": false}, {"data": [[0.25, 105.75]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-1-Aggregated", "isController": false}, {"data": [[1.0, 849.0], [0.0, 152.66666666666666]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-0", "isController": false}, {"data": [[0.25, 326.75]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-0-Aggregated", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-6", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-6-Aggregated", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-5", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-5-Aggregated", "isController": false}, {"data": [[1.0, 296.0], [0.0, 1425.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-4", "isController": false}, {"data": [[0.5, 860.5]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-4-Aggregated", "isController": false}, {"data": [[1.0, 286.0], [0.0, 281.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-3", "isController": false}, {"data": [[0.5, 283.5]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-3-Aggregated", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-15", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-15-Aggregated", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-14", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-14-Aggregated", "isController": false}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-13", "isController": false}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-13-Aggregated", "isController": false}, {"data": [[1.0, 300.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-12", "isController": false}, {"data": [[1.0, 300.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-12-Aggregated", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-19", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-19-Aggregated", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-18", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-18-Aggregated", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-17", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-17-Aggregated", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-16", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-16-Aggregated", "isController": false}, {"data": [[1.0, 321.0], [0.0, 146.0]], "isOverall": false, "label": "https://366pi.tech/-1", "isController": false}, {"data": [[0.33333333333333337, 204.33333333333334]], "isOverall": false, "label": "https://366pi.tech/-1-Aggregated", "isController": false}, {"data": [[1.0, 571.0], [0.0, 297.0]], "isOverall": false, "label": "https://366pi.tech/-2", "isController": false}, {"data": [[0.5, 434.0]], "isOverall": false, "label": "https://366pi.tech/-2-Aggregated", "isController": false}, {"data": [[1.0, 1449.0]], "isOverall": false, "label": "https://366pi.tech/-3", "isController": false}, {"data": [[1.0, 1449.0]], "isOverall": false, "label": "https://366pi.tech/-3-Aggregated", "isController": false}, {"data": [[1.0, 887.0]], "isOverall": false, "label": "https://366pi.tech/-4", "isController": false}, {"data": [[1.0, 887.0]], "isOverall": false, "label": "https://366pi.tech/-4-Aggregated", "isController": false}, {"data": [[1.0, 2012.0], [0.0, 171.5]], "isOverall": false, "label": "https://366pi.tech/-0", "isController": false}, {"data": [[0.33333333333333337, 785.0]], "isOverall": false, "label": "https://366pi.tech/-0-Aggregated", "isController": false}, {"data": [[1.0, 862.0]], "isOverall": false, "label": "https://366pi.tech/-9", "isController": false}, {"data": [[1.0, 862.0]], "isOverall": false, "label": "https://366pi.tech/-9-Aggregated", "isController": false}, {"data": [[1.0, 881.0]], "isOverall": false, "label": "https://366pi.tech/-5", "isController": false}, {"data": [[1.0, 881.0]], "isOverall": false, "label": "https://366pi.tech/-5-Aggregated", "isController": false}, {"data": [[1.0, 909.0]], "isOverall": false, "label": "https://366pi.tech/-6", "isController": false}, {"data": [[1.0, 909.0]], "isOverall": false, "label": "https://366pi.tech/-6-Aggregated", "isController": false}, {"data": [[1.0, 2518.0]], "isOverall": false, "label": "https://366pi.tech/-7", "isController": false}, {"data": [[1.0, 2518.0]], "isOverall": false, "label": "https://366pi.tech/-7-Aggregated", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-8", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-8-Aggregated", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-63", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-63-Aggregated", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "https://366pi.tech/-64", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "https://366pi.tech/-64-Aggregated", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-61", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-61-Aggregated", "isController": false}, {"data": [[1.0, 298.0]], "isOverall": false, "label": "https://366pi.tech/-62", "isController": false}, {"data": [[1.0, 298.0]], "isOverall": false, "label": "https://366pi.tech/-62-Aggregated", "isController": false}, {"data": [[1.0, 298.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-11", "isController": false}, {"data": [[1.0, 298.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-11-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-10", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-10-Aggregated", "isController": false}, {"data": [[1.0, 520.0]], "isOverall": false, "label": "https://366pi.tech/-65", "isController": false}, {"data": [[1.0, 520.0]], "isOverall": false, "label": "https://366pi.tech/-65-Aggregated", "isController": false}, {"data": [[1.0, 413.0]], "isOverall": false, "label": "https://366pi.tech/-66", "isController": false}, {"data": [[1.0, 413.0]], "isOverall": false, "label": "https://366pi.tech/-66-Aggregated", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-26", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-26-Aggregated", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-25", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-25-Aggregated", "isController": false}, {"data": [[1.0, 299.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-24", "isController": false}, {"data": [[1.0, 299.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-24-Aggregated", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-23", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-23-Aggregated", "isController": false}, {"data": [[1.0, 560.0]], "isOverall": false, "label": "https://366pi.tech/-60", "isController": false}, {"data": [[1.0, 560.0]], "isOverall": false, "label": "https://366pi.tech/-60-Aggregated", "isController": false}, {"data": [[1.0, 1809.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-29", "isController": false}, {"data": [[1.0, 1809.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-29-Aggregated", "isController": false}, {"data": [[1.0, 574.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-28", "isController": false}, {"data": [[1.0, 574.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-28-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-27", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-27-Aggregated", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/-58", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/-58-Aggregated", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/-59", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/-59-Aggregated", "isController": false}, {"data": [[1.0, 15599.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.0, 15599.0]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "https://366pi.tech/-52", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "https://366pi.tech/-52-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/-53", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/-53-Aggregated", "isController": false}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "https://366pi.tech/-50", "isController": false}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "https://366pi.tech/-50-Aggregated", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/-51", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/-51-Aggregated", "isController": false}, {"data": [[1.0, 262.0]], "isOverall": false, "label": "https://366pi.tech/-56", "isController": false}, {"data": [[1.0, 262.0]], "isOverall": false, "label": "https://366pi.tech/-56-Aggregated", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-22", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-22-Aggregated", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "https://366pi.tech/-57", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "https://366pi.tech/-57-Aggregated", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-21", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-21-Aggregated", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/-54", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/-54-Aggregated", "isController": false}, {"data": [[1.0, 82.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-20", "isController": false}, {"data": [[1.0, 82.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-20-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/-55", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/-55-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-37", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-37-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-36", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-36-Aggregated", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-35", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-35-Aggregated", "isController": false}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-34", "isController": false}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-34-Aggregated", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-39", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-39-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-38", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-38-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/-49", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/-49-Aggregated", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://366pi.tech/-47", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://366pi.tech/-47-Aggregated", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/-48", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/-48-Aggregated", "isController": false}, {"data": [[1.0, 291.0]], "isOverall": false, "label": "https://366pi.tech/-41", "isController": false}, {"data": [[1.0, 291.0]], "isOverall": false, "label": "https://366pi.tech/-41-Aggregated", "isController": false}, {"data": [[1.0, 251.0]], "isOverall": false, "label": "https://366pi.tech/-42", "isController": false}, {"data": [[1.0, 251.0]], "isOverall": false, "label": "https://366pi.tech/-42-Aggregated", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/-40", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/-40-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/-45", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/-45-Aggregated", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-33", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-33-Aggregated", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/-46", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/-46-Aggregated", "isController": false}, {"data": [[1.0, 849.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-32", "isController": false}, {"data": [[1.0, 849.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-32-Aggregated", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://366pi.tech/-43", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://366pi.tech/-43-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-31", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-31-Aggregated", "isController": false}, {"data": [[1.0, 309.0]], "isOverall": false, "label": "https://366pi.tech/-44", "isController": false}, {"data": [[1.0, 309.0]], "isOverall": false, "label": "https://366pi.tech/-44-Aggregated", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-30", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-30-Aggregated", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-48", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-48-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-47", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-47-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939777227&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=158400799&cv=2.0.1&z=260732967&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=6a60487b-6d99-51d8-93dd-164080717f35&ht=perf&tce=1673939773421&tcs=1673939773421&tdc=1673939777214&tdclee=1673939776534&tdcles=1673939776531&tdi=1673939776510&tdl=1673939774181&tdle=1673939773421&tdls=1673939773421&tfs=1673939773421&tns=1673939773419&trqs=1673939773423&tre=1673939774457&trps=1673939774175&tles=1673939777214&tlee=0&nt=reload&lcp=2278&nav_type=hard", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939777227&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=158400799&cv=2.0.1&z=260732967&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=6a60487b-6d99-51d8-93dd-164080717f35&ht=perf&tce=1673939773421&tcs=1673939773421&tdc=1673939777214&tdclee=1673939776534&tdcles=1673939776531&tdi=1673939776510&tdl=1673939774181&tdle=1673939773421&tdls=1673939773421&tfs=1673939773421&tns=1673939773419&trqs=1673939773423&tre=1673939774457&trps=1673939774175&tles=1673939777214&tlee=0&nt=reload&lcp=2278&nav_type=hard-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-46", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-46-Aggregated", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-45", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-45-Aggregated", "isController": false}, {"data": [[1.0, 1195.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-49", "isController": false}, {"data": [[1.0, 1195.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-49-Aggregated", "isController": false}, {"data": [[1.0, 593.0]], "isOverall": false, "label": "https://366pi.tech/-38", "isController": false}, {"data": [[1.0, 593.0]], "isOverall": false, "label": "https://366pi.tech/-38-Aggregated", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/-39", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/-39-Aggregated", "isController": false}, {"data": [[1.0, 596.0]], "isOverall": false, "label": "https://366pi.tech/-36", "isController": false}, {"data": [[1.0, 596.0]], "isOverall": false, "label": "https://366pi.tech/-36-Aggregated", "isController": false}, {"data": [[1.0, 299.0]], "isOverall": false, "label": "https://366pi.tech/-37", "isController": false}, {"data": [[1.0, 299.0]], "isOverall": false, "label": "https://366pi.tech/-37-Aggregated", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/-30", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/-30-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-40", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-40-Aggregated", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-31", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-31-Aggregated", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/-34", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/-34-Aggregated", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-44", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-44-Aggregated", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://366pi.tech/-35", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://366pi.tech/-35-Aggregated", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-43", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-43-Aggregated", "isController": false}, {"data": [[1.0, 300.0]], "isOverall": false, "label": "https://366pi.tech/-32", "isController": false}, {"data": [[1.0, 300.0]], "isOverall": false, "label": "https://366pi.tech/-32-Aggregated", "isController": false}, {"data": [[1.0, 110.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-42", "isController": false}, {"data": [[1.0, 110.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-42-Aggregated", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-33", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-33-Aggregated", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-41", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-41-Aggregated", "isController": false}, {"data": [[1.0, 432.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939776504&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=158400799&cv=2.0.1&z=1796504295&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=97264e84-bf1e-5db2-a53e-bf39e4a8aeb4&ht=pageview", "isController": false}, {"data": [[1.0, 432.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939776504&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=158400799&cv=2.0.1&z=1796504295&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=97264e84-bf1e-5db2-a53e-bf39e4a8aeb4&ht=pageview-Aggregated", "isController": false}, {"data": [[1.0, 305.0]], "isOverall": false, "label": "https://366pi.tech/-27", "isController": false}, {"data": [[1.0, 305.0]], "isOverall": false, "label": "https://366pi.tech/-27-Aggregated", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/-28", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/-28-Aggregated", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/-25", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/-25-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/-26", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/-26-Aggregated", "isController": false}, {"data": [[1.0, 4537.0]], "isOverall": false, "label": "https://366pi.tech/-29", "isController": false}, {"data": [[1.0, 4537.0]], "isOverall": false, "label": "https://366pi.tech/-29-Aggregated", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-51", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-51-Aggregated", "isController": false}, {"data": [[1.0, 694.0]], "isOverall": false, "label": "https://366pi.tech/-20", "isController": false}, {"data": [[1.0, 694.0]], "isOverall": false, "label": "https://366pi.tech/-20-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-50", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-50-Aggregated", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://366pi.tech/-23", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://366pi.tech/-23-Aggregated", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/-24", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/-24-Aggregated", "isController": false}, {"data": [[1.0, 242.0]], "isOverall": false, "label": "https://366pi.tech/-21", "isController": false}, {"data": [[1.0, 242.0]], "isOverall": false, "label": "https://366pi.tech/-21-Aggregated", "isController": false}, {"data": [[1.0, 161.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-53", "isController": false}, {"data": [[1.0, 161.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-53-Aggregated", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-22", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-22-Aggregated", "isController": false}, {"data": [[1.0, 132.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-52", "isController": false}, {"data": [[1.0, 132.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-52-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 230.73333333333332, "minX": 1.67394E12, "maxY": 173586.65, "series": [{"data": [[1.67394E12, 43876.13333333333], [1.67394006E12, 173586.65]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.67394E12, 230.73333333333332], [1.67394006E12, 2577.5833333333335]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67394006E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 82.0, "minX": 1.67394E12, "maxY": 15599.0, "series": [{"data": [[1.67394E12, 297.0]], "isOverall": false, "label": "https://366pi.tech/-16", "isController": false}, {"data": [[1.67394E12, 304.0]], "isOverall": false, "label": "https://366pi.tech/-17", "isController": false}, {"data": [[1.67394E12, 582.0]], "isOverall": false, "label": "https://366pi.tech/-14", "isController": false}, {"data": [[1.67394E12, 1419.0]], "isOverall": false, "label": "https://366pi.tech/-15", "isController": false}, {"data": [[1.67394E12, 885.0]], "isOverall": false, "label": "https://366pi.tech/-18", "isController": false}, {"data": [[1.67394E12, 868.0]], "isOverall": false, "label": "https://366pi.tech/-19", "isController": false}, {"data": [[1.67394E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/-12", "isController": false}, {"data": [[1.67394006E12, 4434.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/", "isController": false}, {"data": [[1.67394E12, 295.0]], "isOverall": false, "label": "https://366pi.tech/-13", "isController": false}, {"data": [[1.67394006E12, 647.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939783015&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=200064135&cv=2.0.1&z=2092270200&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fcareers-at-366pi-tech&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=72ea74d7-3da0-5775-8e8b-a55ca230259c&ht=perf&tce=1673939779721&tcs=1673939779721&tdc=1673939783009&tdclee=1673939782638&tdcles=1673939782632&tdi=1673939782071&tdl=1673939780319&tdle=1673939779721&tdls=1673939779721&tfs=1673939779721&tns=1673939779718&trqs=1673939779726&tre=1673939780338&trps=1673939780312&tles=1673939783009&tlee=0&nt=navigate&lcp=2664&nav_type=hard", "isController": false}, {"data": [[1.67394E12, 294.0]], "isOverall": false, "label": "https://366pi.tech/-10", "isController": false}, {"data": [[1.67394E12, 603.0]], "isOverall": false, "label": "https://366pi.tech/-11", "isController": false}, {"data": [[1.67394006E12, 9532.0]], "isOverall": false, "label": "https://366pi.tech/", "isController": false}, {"data": [[1.67394006E12, 268.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939782070&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=200064135&cv=2.0.1&z=211979270&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fcareers-at-366pi-tech&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=725c4f67-2b3f-5809-b748-49b3d5834590&ht=pageview", "isController": false}, {"data": [[1.67394006E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-9", "isController": false}, {"data": [[1.67394006E12, 278.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-8", "isController": false}, {"data": [[1.67394006E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-7", "isController": false}, {"data": [[1.67394006E12, 169.66666666666666]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-2", "isController": false}, {"data": [[1.67394006E12, 105.75]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-1", "isController": false}, {"data": [[1.67394006E12, 326.75]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-0", "isController": false}, {"data": [[1.67394006E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-6", "isController": false}, {"data": [[1.67394006E12, 280.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-5", "isController": false}, {"data": [[1.67394006E12, 860.5]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-4", "isController": false}, {"data": [[1.67394006E12, 283.5]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-3", "isController": false}, {"data": [[1.67394006E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-15", "isController": false}, {"data": [[1.67394006E12, 277.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-14", "isController": false}, {"data": [[1.67394006E12, 283.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-13", "isController": false}, {"data": [[1.67394006E12, 300.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-12", "isController": false}, {"data": [[1.67394006E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-19", "isController": false}, {"data": [[1.67394006E12, 295.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-18", "isController": false}, {"data": [[1.67394006E12, 293.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-17", "isController": false}, {"data": [[1.67394006E12, 287.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-16", "isController": false}, {"data": [[1.67394E12, 321.0], [1.67394006E12, 146.0]], "isOverall": false, "label": "https://366pi.tech/-1", "isController": false}, {"data": [[1.67394E12, 571.0], [1.67394006E12, 297.0]], "isOverall": false, "label": "https://366pi.tech/-2", "isController": false}, {"data": [[1.67394E12, 1449.0]], "isOverall": false, "label": "https://366pi.tech/-3", "isController": false}, {"data": [[1.67394E12, 887.0]], "isOverall": false, "label": "https://366pi.tech/-4", "isController": false}, {"data": [[1.67394E12, 2012.0], [1.67394006E12, 171.5]], "isOverall": false, "label": "https://366pi.tech/-0", "isController": false}, {"data": [[1.67394E12, 862.0]], "isOverall": false, "label": "https://366pi.tech/-9", "isController": false}, {"data": [[1.67394E12, 881.0]], "isOverall": false, "label": "https://366pi.tech/-5", "isController": false}, {"data": [[1.67394E12, 909.0]], "isOverall": false, "label": "https://366pi.tech/-6", "isController": false}, {"data": [[1.67394006E12, 2518.0]], "isOverall": false, "label": "https://366pi.tech/-7", "isController": false}, {"data": [[1.67394E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/-8", "isController": false}, {"data": [[1.67394006E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/-63", "isController": false}, {"data": [[1.67394006E12, 297.0]], "isOverall": false, "label": "https://366pi.tech/-64", "isController": false}, {"data": [[1.67394006E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/-61", "isController": false}, {"data": [[1.67394006E12, 298.0]], "isOverall": false, "label": "https://366pi.tech/-62", "isController": false}, {"data": [[1.67394006E12, 298.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-11", "isController": false}, {"data": [[1.67394006E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-10", "isController": false}, {"data": [[1.67394006E12, 520.0]], "isOverall": false, "label": "https://366pi.tech/-65", "isController": false}, {"data": [[1.67394006E12, 413.0]], "isOverall": false, "label": "https://366pi.tech/-66", "isController": false}, {"data": [[1.67394006E12, 278.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-26", "isController": false}, {"data": [[1.67394006E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-25", "isController": false}, {"data": [[1.67394006E12, 299.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-24", "isController": false}, {"data": [[1.67394006E12, 297.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-23", "isController": false}, {"data": [[1.67394006E12, 560.0]], "isOverall": false, "label": "https://366pi.tech/-60", "isController": false}, {"data": [[1.67394006E12, 1809.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-29", "isController": false}, {"data": [[1.67394006E12, 574.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-28", "isController": false}, {"data": [[1.67394006E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-27", "isController": false}, {"data": [[1.67394006E12, 292.0]], "isOverall": false, "label": "https://366pi.tech/-58", "isController": false}, {"data": [[1.67394006E12, 292.0]], "isOverall": false, "label": "https://366pi.tech/-59", "isController": false}, {"data": [[1.67394006E12, 15599.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.67394006E12, 297.0]], "isOverall": false, "label": "https://366pi.tech/-52", "isController": false}, {"data": [[1.67394006E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/-53", "isController": false}, {"data": [[1.67394006E12, 283.0]], "isOverall": false, "label": "https://366pi.tech/-50", "isController": false}, {"data": [[1.67394006E12, 278.0]], "isOverall": false, "label": "https://366pi.tech/-51", "isController": false}, {"data": [[1.67394006E12, 262.0]], "isOverall": false, "label": "https://366pi.tech/-56", "isController": false}, {"data": [[1.67394006E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-22", "isController": false}, {"data": [[1.67394006E12, 297.0]], "isOverall": false, "label": "https://366pi.tech/-57", "isController": false}, {"data": [[1.67394006E12, 91.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-21", "isController": false}, {"data": [[1.67394006E12, 293.0]], "isOverall": false, "label": "https://366pi.tech/-54", "isController": false}, {"data": [[1.67394006E12, 82.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-20", "isController": false}, {"data": [[1.67394006E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/-55", "isController": false}, {"data": [[1.67394006E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-37", "isController": false}, {"data": [[1.67394006E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-36", "isController": false}, {"data": [[1.67394006E12, 296.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-35", "isController": false}, {"data": [[1.67394006E12, 283.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-34", "isController": false}, {"data": [[1.67394006E12, 295.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-39", "isController": false}, {"data": [[1.67394006E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-38", "isController": false}, {"data": [[1.67394006E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/-49", "isController": false}, {"data": [[1.67394006E12, 296.0]], "isOverall": false, "label": "https://366pi.tech/-47", "isController": false}, {"data": [[1.67394006E12, 295.0]], "isOverall": false, "label": "https://366pi.tech/-48", "isController": false}, {"data": [[1.67394006E12, 291.0]], "isOverall": false, "label": "https://366pi.tech/-41", "isController": false}, {"data": [[1.67394006E12, 251.0]], "isOverall": false, "label": "https://366pi.tech/-42", "isController": false}, {"data": [[1.67394006E12, 295.0]], "isOverall": false, "label": "https://366pi.tech/-40", "isController": false}, {"data": [[1.67394006E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/-45", "isController": false}, {"data": [[1.67394006E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-33", "isController": false}, {"data": [[1.67394006E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/-46", "isController": false}, {"data": [[1.67394006E12, 849.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-32", "isController": false}, {"data": [[1.67394006E12, 296.0]], "isOverall": false, "label": "https://366pi.tech/-43", "isController": false}, {"data": [[1.67394006E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-31", "isController": false}, {"data": [[1.67394006E12, 309.0]], "isOverall": false, "label": "https://366pi.tech/-44", "isController": false}, {"data": [[1.67394006E12, 297.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-30", "isController": false}, {"data": [[1.67394006E12, 282.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-48", "isController": false}, {"data": [[1.67394006E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-47", "isController": false}, {"data": [[1.67394006E12, 286.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939777227&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=158400799&cv=2.0.1&z=260732967&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=6a60487b-6d99-51d8-93dd-164080717f35&ht=perf&tce=1673939773421&tcs=1673939773421&tdc=1673939777214&tdclee=1673939776534&tdcles=1673939776531&tdi=1673939776510&tdl=1673939774181&tdle=1673939773421&tdls=1673939773421&tfs=1673939773421&tns=1673939773419&trqs=1673939773423&tre=1673939774457&trps=1673939774175&tles=1673939777214&tlee=0&nt=reload&lcp=2278&nav_type=hard", "isController": false}, {"data": [[1.67394006E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-46", "isController": false}, {"data": [[1.67394006E12, 282.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-45", "isController": false}, {"data": [[1.67394006E12, 1195.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-49", "isController": false}, {"data": [[1.67394006E12, 593.0]], "isOverall": false, "label": "https://366pi.tech/-38", "isController": false}, {"data": [[1.67394006E12, 278.0]], "isOverall": false, "label": "https://366pi.tech/-39", "isController": false}, {"data": [[1.67394006E12, 596.0]], "isOverall": false, "label": "https://366pi.tech/-36", "isController": false}, {"data": [[1.67394006E12, 299.0]], "isOverall": false, "label": "https://366pi.tech/-37", "isController": false}, {"data": [[1.67394006E12, 293.0]], "isOverall": false, "label": "https://366pi.tech/-30", "isController": false}, {"data": [[1.67394006E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-40", "isController": false}, {"data": [[1.67394006E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/-31", "isController": false}, {"data": [[1.67394006E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/-34", "isController": false}, {"data": [[1.67394006E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-44", "isController": false}, {"data": [[1.67394006E12, 296.0]], "isOverall": false, "label": "https://366pi.tech/-35", "isController": false}, {"data": [[1.67394006E12, 295.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-43", "isController": false}, {"data": [[1.67394006E12, 300.0]], "isOverall": false, "label": "https://366pi.tech/-32", "isController": false}, {"data": [[1.67394006E12, 110.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-42", "isController": false}, {"data": [[1.67394006E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/-33", "isController": false}, {"data": [[1.67394006E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-41", "isController": false}, {"data": [[1.67394006E12, 432.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939776504&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=158400799&cv=2.0.1&z=1796504295&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=97264e84-bf1e-5db2-a53e-bf39e4a8aeb4&ht=pageview", "isController": false}, {"data": [[1.67394006E12, 305.0]], "isOverall": false, "label": "https://366pi.tech/-27", "isController": false}, {"data": [[1.67394006E12, 295.0]], "isOverall": false, "label": "https://366pi.tech/-28", "isController": false}, {"data": [[1.67394E12, 294.0]], "isOverall": false, "label": "https://366pi.tech/-25", "isController": false}, {"data": [[1.67394006E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/-26", "isController": false}, {"data": [[1.67394006E12, 4537.0]], "isOverall": false, "label": "https://366pi.tech/-29", "isController": false}, {"data": [[1.67394006E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-51", "isController": false}, {"data": [[1.67394E12, 694.0]], "isOverall": false, "label": "https://366pi.tech/-20", "isController": false}, {"data": [[1.67394006E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-50", "isController": false}, {"data": [[1.67394E12, 296.0]], "isOverall": false, "label": "https://366pi.tech/-23", "isController": false}, {"data": [[1.67394E12, 287.0]], "isOverall": false, "label": "https://366pi.tech/-24", "isController": false}, {"data": [[1.67394E12, 242.0]], "isOverall": false, "label": "https://366pi.tech/-21", "isController": false}, {"data": [[1.67394006E12, 161.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-53", "isController": false}, {"data": [[1.67394E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/-22", "isController": false}, {"data": [[1.67394006E12, 132.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-52", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67394006E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.67394E12, "maxY": 3091.0, "series": [{"data": [[1.67394E12, 297.0]], "isOverall": false, "label": "https://366pi.tech/-16", "isController": false}, {"data": [[1.67394E12, 303.0]], "isOverall": false, "label": "https://366pi.tech/-17", "isController": false}, {"data": [[1.67394E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/-14", "isController": false}, {"data": [[1.67394E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/-15", "isController": false}, {"data": [[1.67394E12, 299.0]], "isOverall": false, "label": "https://366pi.tech/-18", "isController": false}, {"data": [[1.67394E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/-19", "isController": false}, {"data": [[1.67394E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/-12", "isController": false}, {"data": [[1.67394006E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/", "isController": false}, {"data": [[1.67394E12, 295.0]], "isOverall": false, "label": "https://366pi.tech/-13", "isController": false}, {"data": [[1.67394006E12, 647.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939783015&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=200064135&cv=2.0.1&z=2092270200&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fcareers-at-366pi-tech&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=72ea74d7-3da0-5775-8e8b-a55ca230259c&ht=perf&tce=1673939779721&tcs=1673939779721&tdc=1673939783009&tdclee=1673939782638&tdcles=1673939782632&tdi=1673939782071&tdl=1673939780319&tdle=1673939779721&tdls=1673939779721&tfs=1673939779721&tns=1673939779718&trqs=1673939779726&tre=1673939780338&trps=1673939780312&tles=1673939783009&tlee=0&nt=navigate&lcp=2664&nav_type=hard", "isController": false}, {"data": [[1.67394E12, 294.0]], "isOverall": false, "label": "https://366pi.tech/-10", "isController": false}, {"data": [[1.67394E12, 305.0]], "isOverall": false, "label": "https://366pi.tech/-11", "isController": false}, {"data": [[1.67394006E12, 1176.0]], "isOverall": false, "label": "https://366pi.tech/", "isController": false}, {"data": [[1.67394006E12, 267.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939782070&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=200064135&cv=2.0.1&z=211979270&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fcareers-at-366pi-tech&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=725c4f67-2b3f-5809-b748-49b3d5834590&ht=pageview", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-9", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-8", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-7", "isController": false}, {"data": [[1.67394006E12, 57.66666666666667]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-2", "isController": false}, {"data": [[1.67394006E12, 70.25]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-1", "isController": false}, {"data": [[1.67394006E12, 163.5]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-0", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-6", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-5", "isController": false}, {"data": [[1.67394006E12, 576.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-4", "isController": false}, {"data": [[1.67394006E12, 86.5]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-3", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-15", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-14", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-13", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-12", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-19", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-18", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-17", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-16", "isController": false}, {"data": [[1.67394E12, 280.0], [1.67394006E12, 129.0]], "isOverall": false, "label": "https://366pi.tech/-1", "isController": false}, {"data": [[1.67394E12, 287.0], [1.67394006E12, 243.0]], "isOverall": false, "label": "https://366pi.tech/-2", "isController": false}, {"data": [[1.67394E12, 881.0]], "isOverall": false, "label": "https://366pi.tech/-3", "isController": false}, {"data": [[1.67394E12, 887.0]], "isOverall": false, "label": "https://366pi.tech/-4", "isController": false}, {"data": [[1.67394E12, 1176.0], [1.67394006E12, 171.5]], "isOverall": false, "label": "https://366pi.tech/-0", "isController": false}, {"data": [[1.67394E12, 291.0]], "isOverall": false, "label": "https://366pi.tech/-9", "isController": false}, {"data": [[1.67394E12, 881.0]], "isOverall": false, "label": "https://366pi.tech/-5", "isController": false}, {"data": [[1.67394E12, 909.0]], "isOverall": false, "label": "https://366pi.tech/-6", "isController": false}, {"data": [[1.67394006E12, 846.0]], "isOverall": false, "label": "https://366pi.tech/-7", "isController": false}, {"data": [[1.67394E12, 289.0]], "isOverall": false, "label": "https://366pi.tech/-8", "isController": false}, {"data": [[1.67394006E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/-63", "isController": false}, {"data": [[1.67394006E12, 296.0]], "isOverall": false, "label": "https://366pi.tech/-64", "isController": false}, {"data": [[1.67394006E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/-61", "isController": false}, {"data": [[1.67394006E12, 298.0]], "isOverall": false, "label": "https://366pi.tech/-62", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-11", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-10", "isController": false}, {"data": [[1.67394006E12, 178.0]], "isOverall": false, "label": "https://366pi.tech/-65", "isController": false}, {"data": [[1.67394006E12, 165.0]], "isOverall": false, "label": "https://366pi.tech/-66", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-26", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-25", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-24", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-23", "isController": false}, {"data": [[1.67394006E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/-60", "isController": false}, {"data": [[1.67394006E12, 289.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-29", "isController": false}, {"data": [[1.67394006E12, 287.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-28", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-27", "isController": false}, {"data": [[1.67394006E12, 291.0]], "isOverall": false, "label": "https://366pi.tech/-58", "isController": false}, {"data": [[1.67394006E12, 292.0]], "isOverall": false, "label": "https://366pi.tech/-59", "isController": false}, {"data": [[1.67394006E12, 3091.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.67394006E12, 296.0]], "isOverall": false, "label": "https://366pi.tech/-52", "isController": false}, {"data": [[1.67394006E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/-53", "isController": false}, {"data": [[1.67394006E12, 283.0]], "isOverall": false, "label": "https://366pi.tech/-50", "isController": false}, {"data": [[1.67394006E12, 278.0]], "isOverall": false, "label": "https://366pi.tech/-51", "isController": false}, {"data": [[1.67394006E12, 262.0]], "isOverall": false, "label": "https://366pi.tech/-56", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-22", "isController": false}, {"data": [[1.67394006E12, 297.0]], "isOverall": false, "label": "https://366pi.tech/-57", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-21", "isController": false}, {"data": [[1.67394006E12, 293.0]], "isOverall": false, "label": "https://366pi.tech/-54", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-20", "isController": false}, {"data": [[1.67394006E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/-55", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-37", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-36", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-35", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-34", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-39", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-38", "isController": false}, {"data": [[1.67394006E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/-49", "isController": false}, {"data": [[1.67394006E12, 296.0]], "isOverall": false, "label": "https://366pi.tech/-47", "isController": false}, {"data": [[1.67394006E12, 294.0]], "isOverall": false, "label": "https://366pi.tech/-48", "isController": false}, {"data": [[1.67394006E12, 282.0]], "isOverall": false, "label": "https://366pi.tech/-41", "isController": false}, {"data": [[1.67394006E12, 250.0]], "isOverall": false, "label": "https://366pi.tech/-42", "isController": false}, {"data": [[1.67394006E12, 295.0]], "isOverall": false, "label": "https://366pi.tech/-40", "isController": false}, {"data": [[1.67394006E12, 283.0]], "isOverall": false, "label": "https://366pi.tech/-45", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-33", "isController": false}, {"data": [[1.67394006E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/-46", "isController": false}, {"data": [[1.67394006E12, 295.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-32", "isController": false}, {"data": [[1.67394006E12, 294.0]], "isOverall": false, "label": "https://366pi.tech/-43", "isController": false}, {"data": [[1.67394006E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-31", "isController": false}, {"data": [[1.67394006E12, 309.0]], "isOverall": false, "label": "https://366pi.tech/-44", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-30", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-48", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-47", "isController": false}, {"data": [[1.67394006E12, 285.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939777227&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=158400799&cv=2.0.1&z=260732967&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=6a60487b-6d99-51d8-93dd-164080717f35&ht=perf&tce=1673939773421&tcs=1673939773421&tdc=1673939777214&tdclee=1673939776534&tdcles=1673939776531&tdi=1673939776510&tdl=1673939774181&tdle=1673939773421&tdls=1673939773421&tfs=1673939773421&tns=1673939773419&trqs=1673939773423&tre=1673939774457&trps=1673939774175&tles=1673939777214&tlee=0&nt=reload&lcp=2278&nav_type=hard", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-46", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-45", "isController": false}, {"data": [[1.67394006E12, 1195.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-49", "isController": false}, {"data": [[1.67394006E12, 301.0]], "isOverall": false, "label": "https://366pi.tech/-38", "isController": false}, {"data": [[1.67394006E12, 277.0]], "isOverall": false, "label": "https://366pi.tech/-39", "isController": false}, {"data": [[1.67394006E12, 291.0]], "isOverall": false, "label": "https://366pi.tech/-36", "isController": false}, {"data": [[1.67394006E12, 299.0]], "isOverall": false, "label": "https://366pi.tech/-37", "isController": false}, {"data": [[1.67394006E12, 293.0]], "isOverall": false, "label": "https://366pi.tech/-30", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-40", "isController": false}, {"data": [[1.67394006E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/-31", "isController": false}, {"data": [[1.67394006E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/-34", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-44", "isController": false}, {"data": [[1.67394006E12, 296.0]], "isOverall": false, "label": "https://366pi.tech/-35", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-43", "isController": false}, {"data": [[1.67394006E12, 300.0]], "isOverall": false, "label": "https://366pi.tech/-32", "isController": false}, {"data": [[1.67394006E12, 110.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-42", "isController": false}, {"data": [[1.67394006E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/-33", "isController": false}, {"data": [[1.67394006E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-41", "isController": false}, {"data": [[1.67394006E12, 432.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939776504&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=158400799&cv=2.0.1&z=1796504295&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=97264e84-bf1e-5db2-a53e-bf39e4a8aeb4&ht=pageview", "isController": false}, {"data": [[1.67394006E12, 305.0]], "isOverall": false, "label": "https://366pi.tech/-27", "isController": false}, {"data": [[1.67394006E12, 292.0]], "isOverall": false, "label": "https://366pi.tech/-28", "isController": false}, {"data": [[1.67394E12, 294.0]], "isOverall": false, "label": "https://366pi.tech/-25", "isController": false}, {"data": [[1.67394006E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/-26", "isController": false}, {"data": [[1.67394006E12, 299.0]], "isOverall": false, "label": "https://366pi.tech/-29", "isController": false}, {"data": [[1.67394006E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-51", "isController": false}, {"data": [[1.67394E12, 263.0]], "isOverall": false, "label": "https://366pi.tech/-20", "isController": false}, {"data": [[1.67394006E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-50", "isController": false}, {"data": [[1.67394E12, 296.0]], "isOverall": false, "label": "https://366pi.tech/-23", "isController": false}, {"data": [[1.67394E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/-24", "isController": false}, {"data": [[1.67394E12, 241.0]], "isOverall": false, "label": "https://366pi.tech/-21", "isController": false}, {"data": [[1.67394006E12, 39.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-53", "isController": false}, {"data": [[1.67394E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/-22", "isController": false}, {"data": [[1.67394006E12, 42.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-52", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67394006E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.67394E12, "maxY": 1044.0, "series": [{"data": [[1.67394E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-16", "isController": false}, {"data": [[1.67394E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-17", "isController": false}, {"data": [[1.67394E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-14", "isController": false}, {"data": [[1.67394E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-15", "isController": false}, {"data": [[1.67394E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-18", "isController": false}, {"data": [[1.67394E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-19", "isController": false}, {"data": [[1.67394E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-12", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/", "isController": false}, {"data": [[1.67394E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-13", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939783015&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=200064135&cv=2.0.1&z=2092270200&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fcareers-at-366pi-tech&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=72ea74d7-3da0-5775-8e8b-a55ca230259c&ht=perf&tce=1673939779721&tcs=1673939779721&tdc=1673939783009&tdclee=1673939782638&tdcles=1673939782632&tdi=1673939782071&tdl=1673939780319&tdle=1673939779721&tdls=1673939779721&tfs=1673939779721&tns=1673939779718&trqs=1673939779726&tre=1673939780338&trps=1673939780312&tles=1673939783009&tlee=0&nt=navigate&lcp=2664&nav_type=hard", "isController": false}, {"data": [[1.67394E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-10", "isController": false}, {"data": [[1.67394E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-11", "isController": false}, {"data": [[1.67394006E12, 880.0]], "isOverall": false, "label": "https://366pi.tech/", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939782070&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=200064135&cv=2.0.1&z=211979270&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fcareers-at-366pi-tech&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=725c4f67-2b3f-5809-b748-49b3d5834590&ht=pageview", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-9", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-8", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-7", "isController": false}, {"data": [[1.67394006E12, 41.66666666666667]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-2", "isController": false}, {"data": [[1.67394006E12, 43.75]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-1", "isController": false}, {"data": [[1.67394006E12, 43.25]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-0", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-6", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-5", "isController": false}, {"data": [[1.67394006E12, 41.5]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-4", "isController": false}, {"data": [[1.67394006E12, 61.5]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-3", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-15", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-14", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-13", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-12", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-19", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-18", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-17", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-16", "isController": false}, {"data": [[1.67394E12, 171.0], [1.67394006E12, 82.0]], "isOverall": false, "label": "https://366pi.tech/-1", "isController": false}, {"data": [[1.67394E12, 0.0], [1.67394006E12, 181.0]], "isOverall": false, "label": "https://366pi.tech/-2", "isController": false}, {"data": [[1.67394E12, 588.0]], "isOverall": false, "label": "https://366pi.tech/-3", "isController": false}, {"data": [[1.67394E12, 595.0]], "isOverall": false, "label": "https://366pi.tech/-4", "isController": false}, {"data": [[1.67394E12, 880.0], [1.67394006E12, 126.5]], "isOverall": false, "label": "https://366pi.tech/-0", "isController": false}, {"data": [[1.67394E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-9", "isController": false}, {"data": [[1.67394E12, 588.0]], "isOverall": false, "label": "https://366pi.tech/-5", "isController": false}, {"data": [[1.67394E12, 610.0]], "isOverall": false, "label": "https://366pi.tech/-6", "isController": false}, {"data": [[1.67394006E12, 566.0]], "isOverall": false, "label": "https://366pi.tech/-7", "isController": false}, {"data": [[1.67394E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-8", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-63", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-64", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-61", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-62", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-11", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-10", "isController": false}, {"data": [[1.67394006E12, 140.0]], "isOverall": false, "label": "https://366pi.tech/-65", "isController": false}, {"data": [[1.67394006E12, 113.0]], "isOverall": false, "label": "https://366pi.tech/-66", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-26", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-25", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-24", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-23", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-60", "isController": false}, {"data": [[1.67394006E12, 173.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-29", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-28", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-27", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-58", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-59", "isController": false}, {"data": [[1.67394006E12, 1044.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-52", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-53", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-50", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-51", "isController": false}, {"data": [[1.67394006E12, 152.0]], "isOverall": false, "label": "https://366pi.tech/-56", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-22", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-57", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-21", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-54", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-20", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-55", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-37", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-36", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-35", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-34", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-39", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-38", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-49", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-47", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-48", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-41", "isController": false}, {"data": [[1.67394006E12, 145.0]], "isOverall": false, "label": "https://366pi.tech/-42", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-40", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-45", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-33", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-46", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-32", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-43", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-31", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-44", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-30", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-48", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-47", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939777227&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=158400799&cv=2.0.1&z=260732967&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=6a60487b-6d99-51d8-93dd-164080717f35&ht=perf&tce=1673939773421&tcs=1673939773421&tdc=1673939777214&tdclee=1673939776534&tdcles=1673939776531&tdi=1673939776510&tdl=1673939774181&tdle=1673939773421&tdls=1673939773421&tfs=1673939773421&tns=1673939773419&trqs=1673939773423&tre=1673939774457&trps=1673939774175&tles=1673939777214&tlee=0&nt=reload&lcp=2278&nav_type=hard", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-46", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-45", "isController": false}, {"data": [[1.67394006E12, 900.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-49", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-38", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-39", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-36", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-37", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-30", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-40", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-31", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-34", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-44", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-35", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-43", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-32", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-42", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-33", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-41", "isController": false}, {"data": [[1.67394006E12, 164.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939776504&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=158400799&cv=2.0.1&z=1796504295&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990335%22%7D&hit_id=97264e84-bf1e-5db2-a53e-bf39e4a8aeb4&ht=pageview", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-27", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-28", "isController": false}, {"data": [[1.67394E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-25", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-26", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-29", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-51", "isController": false}, {"data": [[1.67394E12, 182.0]], "isOverall": false, "label": "https://366pi.tech/-20", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-50", "isController": false}, {"data": [[1.67394E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-23", "isController": false}, {"data": [[1.67394E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-24", "isController": false}, {"data": [[1.67394E12, 158.0]], "isOverall": false, "label": "https://366pi.tech/-21", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-53", "isController": false}, {"data": [[1.67394E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-22", "isController": false}, {"data": [[1.67394006E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/careers-at-366pi-tech/-52", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67394006E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 39.0, "minX": 1.67394E12, "maxY": 9532.0, "series": [{"data": [[1.67394E12, 2012.0], [1.67394006E12, 9532.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.67394E12, 242.0], [1.67394006E12, 39.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.67394E12, 1431.0], [1.67394006E12, 593.6]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.67394E12, 2012.0], [1.67394006E12, 8632.899999999965]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.67394E12, 571.0], [1.67394006E12, 286.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.67394E12, 1843.0999999999997], [1.67394006E12, 1463.3999999999978]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67394006E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 285.0, "minX": 1.0, "maxY": 2814.5, "series": [{"data": [[1.0, 647.0], [8.0, 287.0], [9.0, 296.0], [18.0, 288.5], [5.0, 881.0], [10.0, 300.5], [20.0, 285.5], [21.0, 285.0], [3.0, 2814.5], [14.0, 290.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 21.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 881.0, "series": [{"data": [[1.0, 647.0], [8.0, 0.0], [9.0, 286.0], [18.0, 286.0], [5.0, 881.0], [10.0, 294.5], [20.0, 0.0], [21.0, 0.0], [3.0, 365.5], [14.0, 284.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 21.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.5166666666666667, "minX": 1.67394E12, "maxY": 1.85, "series": [{"data": [[1.67394E12, 0.5166666666666667], [1.67394006E12, 1.85]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67394006E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.1, "minX": 1.67394E12, "maxY": 1.1, "series": [{"data": [[1.67394E12, 0.4166666666666667], [1.67394006E12, 1.1]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.67394006E12, 0.1]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.67394006E12, 0.75]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67394006E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    axisLabelUseCanvas: true,
        },
