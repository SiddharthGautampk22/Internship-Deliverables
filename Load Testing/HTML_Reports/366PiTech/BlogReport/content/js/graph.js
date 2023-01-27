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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 2.0, "series": [{"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-16", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-17", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-14", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-15", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-18", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-19", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-12", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-13", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-10", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-11", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673937958313&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1363261343&cv=2.0.1&z=1737347182&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fblogs&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22wp-block-editor%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=fe8b162d-cf98-500c-82db-0444f830aed0&ht=perf&tce=1673937955420&tcs=1673937955420&tdc=1673937958306&tdclee=1673937957971&tdcles=1673937957966&tdi=1673937957954&tdl=1673937956133&tdle=1673937955420&tdls=1673937955420&tfs=1673937955420&tns=1673937955417&trqs=1673937955424&tre=1673937956406&trps=1673937956127&tles=1673937958306&tlee=0&nt=navigate&lcp=1972&nav_type=hard", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-11", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-10", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-17", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-16", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-19", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-18", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-13", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-12", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-15", "isController": false}, {"data": [[7300.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-14", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-1", "isController": false}, {"data": [[200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-2", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-3", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-4", "isController": false}, {"data": [[100.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-0", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-9", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-5", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-6", "isController": false}, {"data": [[2500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-7", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-8", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-63", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673937957953&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1363261343&cv=2.0.1&z=846822903&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fblogs&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22wp-block-editor%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=ff859096-5db9-5e3c-9144-5b12e8e0c592&ht=pageview", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-64", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-61", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-62", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-65", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-66", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-60", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-42", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-41", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-58", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-44", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-59", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-43", "isController": false}, {"data": [[12900.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-40", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-52", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-53", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-49", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-50", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-51", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-56", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-46", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-57", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-45", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-54", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-48", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-55", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-47", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-49", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-53", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-52", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-47", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-55", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-48", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-54", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-51", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-50", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-41", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-42", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-40", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-45", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-57", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-46", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-56", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-43", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-44", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673937951352&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1675796460&cv=2.0.1&z=809928815&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=e2a74395-32b8-564e-8d24-0a4d00f40a82&ht=pageview", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-38", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-20", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-39", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-36", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-22", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-37", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-21", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-30", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-28", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-31", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-27", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-29", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-34", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-24", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-35", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-23", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-32", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-26", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-33", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-25", "isController": false}, {"data": [[4000.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673937952168&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1675796460&cv=2.0.1&z=434878393&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=48f3ccfa-65f2-5f0e-9b02-2d0cd9c1adb4&ht=perf&tce=1673937948721&tcs=1673937948162&tdc=1673937952141&tdclee=1673937951702&tdcles=1673937951699&tdi=1673937951385&tdl=1673937949502&tdle=1673937948162&tdls=1673937948141&tfs=1673937948138&tns=1673937948137&trqs=1673937948721&tre=1673937949775&trps=1673937949495&tles=1673937952141&tlee=0&nt=reload&lcp=3201&nav_type=hard", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-9", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-7", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-8", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-27", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-1", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-31", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-28", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-2", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-30", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-25", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-33", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-26", "isController": false}, {"data": [[0.0, 2.0], [800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-0", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-32", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-5", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-6", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-29", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-3", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-4", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-39", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-20", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-38", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-23", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-35", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-24", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-34", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-21", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-37", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-22", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-36", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 12900.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 4.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 114.0, "series": [{"data": [[0.0, 114.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 23.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 4.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.67393838E12, "maxY": 1.0, "series": [{"data": [[1.67393838E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.67393838E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-8", "isController": false}, {"data": [[1.67393838E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-6", "isController": false}, {"data": [[1.67393838E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-7", "isController": false}, {"data": [[1.67393838E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}, {"data": [[1.67393838E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-5", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67393838E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 40.0, "minX": 0.0, "maxY": 12919.0, "series": [{"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/-16", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/-16-Aggregated", "isController": false}, {"data": [[1.0, 299.0]], "isOverall": false, "label": "https://366pi.tech/-17", "isController": false}, {"data": [[1.0, 299.0]], "isOverall": false, "label": "https://366pi.tech/-17-Aggregated", "isController": false}, {"data": [[1.0, 1472.0]], "isOverall": false, "label": "https://366pi.tech/-14", "isController": false}, {"data": [[1.0, 1472.0]], "isOverall": false, "label": "https://366pi.tech/-14-Aggregated", "isController": false}, {"data": [[1.0, 291.0]], "isOverall": false, "label": "https://366pi.tech/-15", "isController": false}, {"data": [[1.0, 291.0]], "isOverall": false, "label": "https://366pi.tech/-15-Aggregated", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/-18", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/-18-Aggregated", "isController": false}, {"data": [[1.0, 1114.0]], "isOverall": false, "label": "https://366pi.tech/-19", "isController": false}, {"data": [[1.0, 1114.0]], "isOverall": false, "label": "https://366pi.tech/-19-Aggregated", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://366pi.tech/-12", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://366pi.tech/-12-Aggregated", "isController": false}, {"data": [[1.0, 276.0]], "isOverall": false, "label": "https://366pi.tech/-13", "isController": false}, {"data": [[1.0, 276.0]], "isOverall": false, "label": "https://366pi.tech/-13-Aggregated", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/-10", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/-10-Aggregated", "isController": false}, {"data": [[1.0, 592.0]], "isOverall": false, "label": "https://366pi.tech/-11", "isController": false}, {"data": [[1.0, 592.0]], "isOverall": false, "label": "https://366pi.tech/-11-Aggregated", "isController": false}, {"data": [[1.0, 352.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673937958313&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1363261343&cv=2.0.1&z=1737347182&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fblogs&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22wp-block-editor%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=fe8b162d-cf98-500c-82db-0444f830aed0&ht=perf&tce=1673937955420&tcs=1673937955420&tdc=1673937958306&tdclee=1673937957971&tdcles=1673937957966&tdi=1673937957954&tdl=1673937956133&tdle=1673937955420&tdls=1673937955420&tfs=1673937955420&tns=1673937955417&trqs=1673937955424&tre=1673937956406&trps=1673937956127&tles=1673937958306&tlee=0&nt=navigate&lcp=1972&nav_type=hard", "isController": false}, {"data": [[1.0, 352.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673937958313&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1363261343&cv=2.0.1&z=1737347182&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fblogs&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22wp-block-editor%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=fe8b162d-cf98-500c-82db-0444f830aed0&ht=perf&tce=1673937955420&tcs=1673937955420&tdc=1673937958306&tdclee=1673937957971&tdcles=1673937957966&tdi=1673937957954&tdl=1673937956133&tdle=1673937955420&tdls=1673937955420&tfs=1673937955420&tns=1673937955417&trqs=1673937955424&tre=1673937956406&trps=1673937956127&tles=1673937958306&tlee=0&nt=navigate&lcp=1972&nav_type=hard-Aggregated", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-11", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-11-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-10", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-10-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-17", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-17-Aggregated", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-16", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-16-Aggregated", "isController": false}, {"data": [[1.0, 274.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-19", "isController": false}, {"data": [[1.0, 274.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-19-Aggregated", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-18", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-18-Aggregated", "isController": false}, {"data": [[1.0, 275.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-13", "isController": false}, {"data": [[1.0, 275.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-13-Aggregated", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-12", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-12-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-15", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-15-Aggregated", "isController": false}, {"data": [[1.0, 7320.0]], "isOverall": false, "label": "https://366pi.tech/", "isController": false}, {"data": [[1.0, 7320.0]], "isOverall": false, "label": "https://366pi.tech/-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-14", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-14-Aggregated", "isController": false}, {"data": [[1.0, 342.0], [0.0, 140.0]], "isOverall": false, "label": "https://366pi.tech/-1", "isController": false}, {"data": [[0.33333333333333337, 207.33333333333334]], "isOverall": false, "label": "https://366pi.tech/-1-Aggregated", "isController": false}, {"data": [[1.0, 575.0], [0.0, 215.0]], "isOverall": false, "label": "https://366pi.tech/-2", "isController": false}, {"data": [[0.5, 395.0]], "isOverall": false, "label": "https://366pi.tech/-2-Aggregated", "isController": false}, {"data": [[1.0, 1116.0]], "isOverall": false, "label": "https://366pi.tech/-3", "isController": false}, {"data": [[1.0, 1116.0]], "isOverall": false, "label": "https://366pi.tech/-3-Aggregated", "isController": false}, {"data": [[1.0, 879.0]], "isOverall": false, "label": "https://366pi.tech/-4", "isController": false}, {"data": [[1.0, 879.0]], "isOverall": false, "label": "https://366pi.tech/-4-Aggregated", "isController": false}, {"data": [[1.0, 2000.0], [0.0, 185.5]], "isOverall": false, "label": "https://366pi.tech/-0", "isController": false}, {"data": [[0.33333333333333337, 790.3333333333333]], "isOverall": false, "label": "https://366pi.tech/-0-Aggregated", "isController": false}, {"data": [[1.0, 865.0]], "isOverall": false, "label": "https://366pi.tech/-9", "isController": false}, {"data": [[1.0, 865.0]], "isOverall": false, "label": "https://366pi.tech/-9-Aggregated", "isController": false}, {"data": [[1.0, 888.0]], "isOverall": false, "label": "https://366pi.tech/-5", "isController": false}, {"data": [[1.0, 888.0]], "isOverall": false, "label": "https://366pi.tech/-5-Aggregated", "isController": false}, {"data": [[1.0, 878.0]], "isOverall": false, "label": "https://366pi.tech/-6", "isController": false}, {"data": [[1.0, 878.0]], "isOverall": false, "label": "https://366pi.tech/-6-Aggregated", "isController": false}, {"data": [[1.0, 2551.0]], "isOverall": false, "label": "https://366pi.tech/-7", "isController": false}, {"data": [[1.0, 2551.0]], "isOverall": false, "label": "https://366pi.tech/-7-Aggregated", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-8", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-8-Aggregated", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/-63", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/-63-Aggregated", "isController": false}, {"data": [[1.0, 530.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673937957953&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1363261343&cv=2.0.1&z=846822903&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fblogs&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22wp-block-editor%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=ff859096-5db9-5e3c-9144-5b12e8e0c592&ht=pageview", "isController": false}, {"data": [[1.0, 530.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673937957953&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1363261343&cv=2.0.1&z=846822903&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fblogs&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22wp-block-editor%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=ff859096-5db9-5e3c-9144-5b12e8e0c592&ht=pageview-Aggregated", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/-64", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/-64-Aggregated", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-61", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-61-Aggregated", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/-62", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/-62-Aggregated", "isController": false}, {"data": [[1.0, 436.0]], "isOverall": false, "label": "https://366pi.tech/-65", "isController": false}, {"data": [[1.0, 436.0]], "isOverall": false, "label": "https://366pi.tech/-65-Aggregated", "isController": false}, {"data": [[1.0, 430.0]], "isOverall": false, "label": "https://366pi.tech/-66", "isController": false}, {"data": [[1.0, 430.0]], "isOverall": false, "label": "https://366pi.tech/-66-Aggregated", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-60", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-60-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-42", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-42-Aggregated", "isController": false}, {"data": [[1.0, 276.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-41", "isController": false}, {"data": [[1.0, 276.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-41-Aggregated", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/-58", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/-58-Aggregated", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-44", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-44-Aggregated", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/-59", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/-59-Aggregated", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-43", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-43-Aggregated", "isController": false}, {"data": [[1.0, 12919.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.0, 12919.0]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[1.0, 291.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-40", "isController": false}, {"data": [[1.0, 291.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-40-Aggregated", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/-52", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/-52-Aggregated", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-53", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-53-Aggregated", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-49", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-49-Aggregated", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/-50", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/-50-Aggregated", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/-51", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/-51-Aggregated", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-56", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-56-Aggregated", "isController": false}, {"data": [[1.0, 274.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-46", "isController": false}, {"data": [[1.0, 274.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-46-Aggregated", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-57", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-57-Aggregated", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-45", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-45-Aggregated", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-54", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-54-Aggregated", "isController": false}, {"data": [[1.0, 103.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-48", "isController": false}, {"data": [[1.0, 103.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-48-Aggregated", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/-55", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/-55-Aggregated", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-47", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-47-Aggregated", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/-49", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/-49-Aggregated", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-53", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-53-Aggregated", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-52", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-52-Aggregated", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/-47", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/-47-Aggregated", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-55", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-55-Aggregated", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/-48", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/-48-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-54", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-54-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-51", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-51-Aggregated", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-50", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-50-Aggregated", "isController": false}, {"data": [[1.0, 568.0]], "isOverall": false, "label": "https://366pi.tech/-41", "isController": false}, {"data": [[1.0, 568.0]], "isOverall": false, "label": "https://366pi.tech/-41-Aggregated", "isController": false}, {"data": [[1.0, 247.0]], "isOverall": false, "label": "https://366pi.tech/-42", "isController": false}, {"data": [[1.0, 247.0]], "isOverall": false, "label": "https://366pi.tech/-42-Aggregated", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/-40", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/-40-Aggregated", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/-45", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/-45-Aggregated", "isController": false}, {"data": [[1.0, 79.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-57", "isController": false}, {"data": [[1.0, 79.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-57-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/-46", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/-46-Aggregated", "isController": false}, {"data": [[1.0, 255.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-56", "isController": false}, {"data": [[1.0, 255.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-56-Aggregated", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/-43", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/-43-Aggregated", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/-44", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/-44-Aggregated", "isController": false}, {"data": [[1.0, 424.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673937951352&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1675796460&cv=2.0.1&z=809928815&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=e2a74395-32b8-564e-8d24-0a4d00f40a82&ht=pageview", "isController": false}, {"data": [[1.0, 424.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673937951352&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1675796460&cv=2.0.1&z=809928815&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=e2a74395-32b8-564e-8d24-0a4d00f40a82&ht=pageview-Aggregated", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/-38", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/-38-Aggregated", "isController": false}, {"data": [[1.0, 75.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-20", "isController": false}, {"data": [[1.0, 75.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-20-Aggregated", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/-39", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/-39-Aggregated", "isController": false}, {"data": [[1.0, 897.0]], "isOverall": false, "label": "https://366pi.tech/-36", "isController": false}, {"data": [[1.0, 897.0]], "isOverall": false, "label": "https://366pi.tech/-36-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-22", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-22-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/-37", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/-37-Aggregated", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-21", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-21-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/-30", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/-30-Aggregated", "isController": false}, {"data": [[1.0, 572.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-28", "isController": false}, {"data": [[1.0, 572.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-28-Aggregated", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-31", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-31-Aggregated", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-27", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-27-Aggregated", "isController": false}, {"data": [[1.0, 855.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-29", "isController": false}, {"data": [[1.0, 855.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-29-Aggregated", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-34", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-34-Aggregated", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-24", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-24-Aggregated", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/-35", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/-35-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-23", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-23-Aggregated", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/-32", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/-32-Aggregated", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-26", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-26-Aggregated", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "https://366pi.tech/-33", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "https://366pi.tech/-33-Aggregated", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-25", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-25-Aggregated", "isController": false}, {"data": [[1.0, 4007.0]], "isOverall": false, "label": "https://366pi.tech/blogs/", "isController": false}, {"data": [[1.0, 4007.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673937952168&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1675796460&cv=2.0.1&z=434878393&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=48f3ccfa-65f2-5f0e-9b02-2d0cd9c1adb4&ht=perf&tce=1673937948721&tcs=1673937948162&tdc=1673937952141&tdclee=1673937951702&tdcles=1673937951699&tdi=1673937951385&tdl=1673937949502&tdle=1673937948162&tdls=1673937948141&tfs=1673937948138&tns=1673937948137&trqs=1673937948721&tre=1673937949775&trps=1673937949495&tles=1673937952141&tlee=0&nt=reload&lcp=3201&nav_type=hard", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673937952168&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1675796460&cv=2.0.1&z=434878393&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=48f3ccfa-65f2-5f0e-9b02-2d0cd9c1adb4&ht=perf&tce=1673937948721&tcs=1673937948162&tdc=1673937952141&tdclee=1673937951702&tdcles=1673937951699&tdi=1673937951385&tdl=1673937949502&tdle=1673937948162&tdls=1673937948141&tfs=1673937948138&tns=1673937948137&trqs=1673937948721&tre=1673937949775&trps=1673937949495&tles=1673937952141&tlee=0&nt=reload&lcp=3201&nav_type=hard-Aggregated", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-9", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-9-Aggregated", "isController": false}, {"data": [[1.0, 276.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-7", "isController": false}, {"data": [[1.0, 276.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-7-Aggregated", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-8", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-8-Aggregated", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/-27", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/-27-Aggregated", "isController": false}, {"data": [[1.0, 131.0], [0.0, 105.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-1", "isController": false}, {"data": [[0.33333333333333337, 113.66666666666666]], "isOverall": false, "label": "https://366pi.tech/blogs/-1-Aggregated", "isController": false}, {"data": [[1.0, 566.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-31", "isController": false}, {"data": [[1.0, 566.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-31-Aggregated", "isController": false}, {"data": [[1.0, 592.0]], "isOverall": false, "label": "https://366pi.tech/-28", "isController": false}, {"data": [[1.0, 592.0]], "isOverall": false, "label": "https://366pi.tech/-28-Aggregated", "isController": false}, {"data": [[1.0, 285.0], [0.0, 40.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-2", "isController": false}, {"data": [[0.5, 162.5]], "isOverall": false, "label": "https://366pi.tech/blogs/-2-Aggregated", "isController": false}, {"data": [[1.0, 587.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-30", "isController": false}, {"data": [[1.0, 587.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-30-Aggregated", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/-25", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/-25-Aggregated", "isController": false}, {"data": [[1.0, 826.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-33", "isController": false}, {"data": [[1.0, 826.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-33-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/-26", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/-26-Aggregated", "isController": false}, {"data": [[1.0, 875.0], [0.0, 41.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-0", "isController": false}, {"data": [[0.33333333333333337, 319.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-0-Aggregated", "isController": false}, {"data": [[1.0, 573.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-32", "isController": false}, {"data": [[1.0, 573.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-32-Aggregated", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-5", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-5-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-6", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-6-Aggregated", "isController": false}, {"data": [[1.0, 592.0]], "isOverall": false, "label": "https://366pi.tech/-29", "isController": false}, {"data": [[1.0, 592.0]], "isOverall": false, "label": "https://366pi.tech/-29-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-3", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-3-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-4", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-4-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-39", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-39-Aggregated", "isController": false}, {"data": [[1.0, 705.0]], "isOverall": false, "label": "https://366pi.tech/-20", "isController": false}, {"data": [[1.0, 705.0]], "isOverall": false, "label": "https://366pi.tech/-20-Aggregated", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-38", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-38-Aggregated", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/-23", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/-23-Aggregated", "isController": false}, {"data": [[1.0, 291.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-35", "isController": false}, {"data": [[1.0, 291.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-35-Aggregated", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/-24", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/-24-Aggregated", "isController": false}, {"data": [[1.0, 291.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-34", "isController": false}, {"data": [[1.0, 291.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-34-Aggregated", "isController": false}, {"data": [[1.0, 229.0]], "isOverall": false, "label": "https://366pi.tech/-21", "isController": false}, {"data": [[1.0, 229.0]], "isOverall": false, "label": "https://366pi.tech/-21-Aggregated", "isController": false}, {"data": [[1.0, 568.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-37", "isController": false}, {"data": [[1.0, 568.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-37-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/-22", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/-22-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-36", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-36-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 2730.383333333333, "minX": 1.67393838E12, "maxY": 204696.4, "series": [{"data": [[1.67393838E12, 204696.4]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.67393838E12, 2730.383333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67393838E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 75.0, "minX": 1.67393838E12, "maxY": 12919.0, "series": [{"data": [[1.67393838E12, 280.0]], "isOverall": false, "label": "https://366pi.tech/-16", "isController": false}, {"data": [[1.67393838E12, 299.0]], "isOverall": false, "label": "https://366pi.tech/-17", "isController": false}, {"data": [[1.67393838E12, 1472.0]], "isOverall": false, "label": "https://366pi.tech/-14", "isController": false}, {"data": [[1.67393838E12, 291.0]], "isOverall": false, "label": "https://366pi.tech/-15", "isController": false}, {"data": [[1.67393838E12, 293.0]], "isOverall": false, "label": "https://366pi.tech/-18", "isController": false}, {"data": [[1.67393838E12, 1114.0]], "isOverall": false, "label": "https://366pi.tech/-19", "isController": false}, {"data": [[1.67393838E12, 296.0]], "isOverall": false, "label": "https://366pi.tech/-12", "isController": false}, {"data": [[1.67393838E12, 276.0]], "isOverall": false, "label": "https://366pi.tech/-13", "isController": false}, {"data": [[1.67393838E12, 289.0]], "isOverall": false, "label": "https://366pi.tech/-10", "isController": false}, {"data": [[1.67393838E12, 592.0]], "isOverall": false, "label": "https://366pi.tech/-11", "isController": false}, {"data": [[1.67393838E12, 352.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673937958313&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1363261343&cv=2.0.1&z=1737347182&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fblogs&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22wp-block-editor%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=fe8b162d-cf98-500c-82db-0444f830aed0&ht=perf&tce=1673937955420&tcs=1673937955420&tdc=1673937958306&tdclee=1673937957971&tdcles=1673937957966&tdi=1673937957954&tdl=1673937956133&tdle=1673937955420&tdls=1673937955420&tfs=1673937955420&tns=1673937955417&trqs=1673937955424&tre=1673937956406&trps=1673937956127&tles=1673937958306&tlee=0&nt=navigate&lcp=1972&nav_type=hard", "isController": false}, {"data": [[1.67393838E12, 287.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-11", "isController": false}, {"data": [[1.67393838E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-10", "isController": false}, {"data": [[1.67393838E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-17", "isController": false}, {"data": [[1.67393838E12, 287.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-16", "isController": false}, {"data": [[1.67393838E12, 274.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-19", "isController": false}, {"data": [[1.67393838E12, 289.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-18", "isController": false}, {"data": [[1.67393838E12, 275.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-13", "isController": false}, {"data": [[1.67393838E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-12", "isController": false}, {"data": [[1.67393838E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-15", "isController": false}, {"data": [[1.67393838E12, 7320.0]], "isOverall": false, "label": "https://366pi.tech/", "isController": false}, {"data": [[1.67393838E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-14", "isController": false}, {"data": [[1.67393838E12, 207.33333333333334]], "isOverall": false, "label": "https://366pi.tech/-1", "isController": false}, {"data": [[1.67393838E12, 395.0]], "isOverall": false, "label": "https://366pi.tech/-2", "isController": false}, {"data": [[1.67393838E12, 1116.0]], "isOverall": false, "label": "https://366pi.tech/-3", "isController": false}, {"data": [[1.67393838E12, 879.0]], "isOverall": false, "label": "https://366pi.tech/-4", "isController": false}, {"data": [[1.67393838E12, 790.3333333333333]], "isOverall": false, "label": "https://366pi.tech/-0", "isController": false}, {"data": [[1.67393838E12, 865.0]], "isOverall": false, "label": "https://366pi.tech/-9", "isController": false}, {"data": [[1.67393838E12, 888.0]], "isOverall": false, "label": "https://366pi.tech/-5", "isController": false}, {"data": [[1.67393838E12, 878.0]], "isOverall": false, "label": "https://366pi.tech/-6", "isController": false}, {"data": [[1.67393838E12, 2551.0]], "isOverall": false, "label": "https://366pi.tech/-7", "isController": false}, {"data": [[1.67393838E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/-8", "isController": false}, {"data": [[1.67393838E12, 287.0]], "isOverall": false, "label": "https://366pi.tech/-63", "isController": false}, {"data": [[1.67393838E12, 530.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673937957953&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1363261343&cv=2.0.1&z=846822903&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fblogs&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22wp-block-editor%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=ff859096-5db9-5e3c-9144-5b12e8e0c592&ht=pageview", "isController": false}, {"data": [[1.67393838E12, 293.0]], "isOverall": false, "label": "https://366pi.tech/-64", "isController": false}, {"data": [[1.67393838E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/-61", "isController": false}, {"data": [[1.67393838E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/-62", "isController": false}, {"data": [[1.67393838E12, 436.0]], "isOverall": false, "label": "https://366pi.tech/-65", "isController": false}, {"data": [[1.67393838E12, 430.0]], "isOverall": false, "label": "https://366pi.tech/-66", "isController": false}, {"data": [[1.67393838E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/-60", "isController": false}, {"data": [[1.67393838E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-42", "isController": false}, {"data": [[1.67393838E12, 276.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-41", "isController": false}, {"data": [[1.67393838E12, 295.0]], "isOverall": false, "label": "https://366pi.tech/-58", "isController": false}, {"data": [[1.67393838E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-44", "isController": false}, {"data": [[1.67393838E12, 277.0]], "isOverall": false, "label": "https://366pi.tech/-59", "isController": false}, {"data": [[1.67393838E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-43", "isController": false}, {"data": [[1.67393838E12, 12919.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.67393838E12, 291.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-40", "isController": false}, {"data": [[1.67393838E12, 293.0]], "isOverall": false, "label": "https://366pi.tech/-52", "isController": false}, {"data": [[1.67393838E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/-53", "isController": false}, {"data": [[1.67393838E12, 282.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-49", "isController": false}, {"data": [[1.67393838E12, 278.0]], "isOverall": false, "label": "https://366pi.tech/-50", "isController": false}, {"data": [[1.67393838E12, 287.0]], "isOverall": false, "label": "https://366pi.tech/-51", "isController": false}, {"data": [[1.67393838E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/-56", "isController": false}, {"data": [[1.67393838E12, 274.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-46", "isController": false}, {"data": [[1.67393838E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/-57", "isController": false}, {"data": [[1.67393838E12, 292.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-45", "isController": false}, {"data": [[1.67393838E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/-54", "isController": false}, {"data": [[1.67393838E12, 103.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-48", "isController": false}, {"data": [[1.67393838E12, 278.0]], "isOverall": false, "label": "https://366pi.tech/-55", "isController": false}, {"data": [[1.67393838E12, 282.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-47", "isController": false}, {"data": [[1.67393838E12, 287.0]], "isOverall": false, "label": "https://366pi.tech/-49", "isController": false}, {"data": [[1.67393838E12, 292.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-53", "isController": false}, {"data": [[1.67393838E12, 277.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-52", "isController": false}, {"data": [[1.67393838E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/-47", "isController": false}, {"data": [[1.67393838E12, 282.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-55", "isController": false}, {"data": [[1.67393838E12, 289.0]], "isOverall": false, "label": "https://366pi.tech/-48", "isController": false}, {"data": [[1.67393838E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-54", "isController": false}, {"data": [[1.67393838E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-51", "isController": false}, {"data": [[1.67393838E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-50", "isController": false}, {"data": [[1.67393838E12, 568.0]], "isOverall": false, "label": "https://366pi.tech/-41", "isController": false}, {"data": [[1.67393838E12, 247.0]], "isOverall": false, "label": "https://366pi.tech/-42", "isController": false}, {"data": [[1.67393838E12, 277.0]], "isOverall": false, "label": "https://366pi.tech/-40", "isController": false}, {"data": [[1.67393838E12, 289.0]], "isOverall": false, "label": "https://366pi.tech/-45", "isController": false}, {"data": [[1.67393838E12, 79.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-57", "isController": false}, {"data": [[1.67393838E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/-46", "isController": false}, {"data": [[1.67393838E12, 255.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-56", "isController": false}, {"data": [[1.67393838E12, 280.0]], "isOverall": false, "label": "https://366pi.tech/-43", "isController": false}, {"data": [[1.67393838E12, 287.0]], "isOverall": false, "label": "https://366pi.tech/-44", "isController": false}, {"data": [[1.67393838E12, 424.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673937951352&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1675796460&cv=2.0.1&z=809928815&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=e2a74395-32b8-564e-8d24-0a4d00f40a82&ht=pageview", "isController": false}, {"data": [[1.67393838E12, 289.0]], "isOverall": false, "label": "https://366pi.tech/-38", "isController": false}, {"data": [[1.67393838E12, 75.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-20", "isController": false}, {"data": [[1.67393838E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/-39", "isController": false}, {"data": [[1.67393838E12, 897.0]], "isOverall": false, "label": "https://366pi.tech/-36", "isController": false}, {"data": [[1.67393838E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-22", "isController": false}, {"data": [[1.67393838E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/-37", "isController": false}, {"data": [[1.67393838E12, 88.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-21", "isController": false}, {"data": [[1.67393838E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/-30", "isController": false}, {"data": [[1.67393838E12, 572.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-28", "isController": false}, {"data": [[1.67393838E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/-31", "isController": false}, {"data": [[1.67393838E12, 277.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-27", "isController": false}, {"data": [[1.67393838E12, 855.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-29", "isController": false}, {"data": [[1.67393838E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/-34", "isController": false}, {"data": [[1.67393838E12, 293.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-24", "isController": false}, {"data": [[1.67393838E12, 277.0]], "isOverall": false, "label": "https://366pi.tech/-35", "isController": false}, {"data": [[1.67393838E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-23", "isController": false}, {"data": [[1.67393838E12, 277.0]], "isOverall": false, "label": "https://366pi.tech/-32", "isController": false}, {"data": [[1.67393838E12, 282.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-26", "isController": false}, {"data": [[1.67393838E12, 297.0]], "isOverall": false, "label": "https://366pi.tech/-33", "isController": false}, {"data": [[1.67393838E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-25", "isController": false}, {"data": [[1.67393838E12, 4007.0]], "isOverall": false, "label": "https://366pi.tech/blogs/", "isController": false}, {"data": [[1.67393838E12, 286.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673937952168&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1675796460&cv=2.0.1&z=434878393&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=48f3ccfa-65f2-5f0e-9b02-2d0cd9c1adb4&ht=perf&tce=1673937948721&tcs=1673937948162&tdc=1673937952141&tdclee=1673937951702&tdcles=1673937951699&tdi=1673937951385&tdl=1673937949502&tdle=1673937948162&tdls=1673937948141&tfs=1673937948138&tns=1673937948137&trqs=1673937948721&tre=1673937949775&trps=1673937949495&tles=1673937952141&tlee=0&nt=reload&lcp=3201&nav_type=hard", "isController": false}, {"data": [[1.67393838E12, 289.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-9", "isController": false}, {"data": [[1.67393838E12, 276.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-7", "isController": false}, {"data": [[1.67393838E12, 287.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-8", "isController": false}, {"data": [[1.67393838E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/-27", "isController": false}, {"data": [[1.67393838E12, 113.66666666666666]], "isOverall": false, "label": "https://366pi.tech/blogs/-1", "isController": false}, {"data": [[1.67393838E12, 566.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-31", "isController": false}, {"data": [[1.67393838E12, 592.0]], "isOverall": false, "label": "https://366pi.tech/-28", "isController": false}, {"data": [[1.67393838E12, 162.5]], "isOverall": false, "label": "https://366pi.tech/blogs/-2", "isController": false}, {"data": [[1.67393838E12, 587.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-30", "isController": false}, {"data": [[1.67393838E12, 294.0]], "isOverall": false, "label": "https://366pi.tech/-25", "isController": false}, {"data": [[1.67393838E12, 826.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-33", "isController": false}, {"data": [[1.67393838E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/-26", "isController": false}, {"data": [[1.67393838E12, 319.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-0", "isController": false}, {"data": [[1.67393838E12, 573.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-32", "isController": false}, {"data": [[1.67393838E12, 292.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-5", "isController": false}, {"data": [[1.67393838E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-6", "isController": false}, {"data": [[1.67393838E12, 592.0]], "isOverall": false, "label": "https://366pi.tech/-29", "isController": false}, {"data": [[1.67393838E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-3", "isController": false}, {"data": [[1.67393838E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-4", "isController": false}, {"data": [[1.67393838E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-39", "isController": false}, {"data": [[1.67393838E12, 705.0]], "isOverall": false, "label": "https://366pi.tech/-20", "isController": false}, {"data": [[1.67393838E12, 289.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-38", "isController": false}, {"data": [[1.67393838E12, 292.0]], "isOverall": false, "label": "https://366pi.tech/-23", "isController": false}, {"data": [[1.67393838E12, 291.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-35", "isController": false}, {"data": [[1.67393838E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/-24", "isController": false}, {"data": [[1.67393838E12, 291.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-34", "isController": false}, {"data": [[1.67393838E12, 229.0]], "isOverall": false, "label": "https://366pi.tech/-21", "isController": false}, {"data": [[1.67393838E12, 568.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-37", "isController": false}, {"data": [[1.67393838E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/-22", "isController": false}, {"data": [[1.67393838E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/blogs/-36", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67393838E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 37.0, "minX": 1.67393838E12, "maxY": 7320.0, "series": [{"data": [[1.67393838E12, 7320.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.67393838E12, 37.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.67393838E12, 849.1999999999999]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.67393838E12, 5928.540000000041]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.67393838E12, 287.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.67393838E12, 1092.3000000000013]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67393838E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
        createLegend(choiceContainer, infos);
    }
};