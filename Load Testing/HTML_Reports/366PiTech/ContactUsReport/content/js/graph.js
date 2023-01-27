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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 2.0, "series": [{"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-32", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-31", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-30", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-16", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-36", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-17", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-35", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-14", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-34", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-15", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-33", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-39", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-18", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-38", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-19", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-37", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-12", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-13", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-10", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-11", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-43", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-42", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-41", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-40", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-47", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-46", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-45", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-44", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-48", "isController": false}, {"data": [[7300.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-10", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-14", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939244686&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=169966051&cv=2.0.1&z=1826799806&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=f1760727-02cd-5aff-a886-1cabfbc64319&ht=perf&tce=1673939234881&tcs=1673939234323&tdc=1673939244679&tdclee=1673939241384&tdcles=1673939241384&tdi=1673939241361&tdl=1673939235866&tdle=1673939234323&tdls=1673939234323&tfs=1673939234192&tns=1673939234190&trqs=1673939234881&tre=1673939235860&trps=1673939235859&tles=1673939244679&tlee=0&nt=reload&lcp=7133&nav_type=hard", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-13", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-12", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-11", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-18", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-17", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-16", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-15", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-19", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939241354&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=169966051&cv=2.0.1&z=1176551699&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=701bc53d-7614-5b31-ba85-c32dcc538bd0&ht=pageview", "isController": false}, {"data": [[3100.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-1", "isController": false}, {"data": [[200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-2", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-3", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-21", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-20", "isController": false}, {"data": [[100.0, 2.0], [1900.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-0", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-9", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-3", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-25", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-2", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-24", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-1", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-23", "isController": false}, {"data": [[0.0, 2.0], [800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-0", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-22", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-5", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-7", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-29", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-6", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-6", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-28", "isController": false}, {"data": [[2500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-7", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-5", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-27", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-8", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-4", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-26", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-63", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-64", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-61", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-9", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-62", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-8", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-65", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-66", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-60", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-58", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-59", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939250496&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1143584341&cv=2.0.1&z=1837785342&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fhome%2Fcontact-us-366pi&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=dd12f7d6-4b6a-5f5d-8018-c06044bb8d1c&ht=perf&tce=1673939246581&tcs=1673939246581&tdc=1673939250489&tdclee=1673939249831&tdcles=1673939249821&tdi=1673939249549&tdl=1673939247249&tdle=1673939246581&tdls=1673939246581&tfs=1673939246581&tns=1673939246578&trqs=1673939246586&tre=1673939247523&trps=1673939247243&tles=1673939250490&tlee=0&nt=navigate&lcp=3014&nav_type=hard", "isController": false}, {"data": [[12100.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939249543&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1143584341&cv=2.0.1&z=49937929&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fhome%2Fcontact-us-366pi&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=c8bb4f74-3c51-54d6-88e7-a9b53f0e8542&ht=pageview", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-52", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-53", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-50", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-51", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-56", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-57", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-54", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-55", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-49", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-47", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-48", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-41", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-42", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-40", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-45", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-46", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-43", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-44", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/wp-json/contact-form-7/v1/contact-forms/1376/feedback/schema", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-38", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-39", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-36", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-37", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-30", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-31", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-34", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-35", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-32", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-33", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-27", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-28", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-25", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-26", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-29", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-20", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-23", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-24", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-21", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://366pi.tech/-22", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 12100.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 4.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 109.0, "series": [{"data": [[0.0, 109.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 20.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 4.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.6739397E12, "maxY": 1.0, "series": [{"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-8", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-6", "isController": false}, {"data": [[1.6739397E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-4", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-5", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6739397E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 48.0, "minX": 0.0, "maxY": 12100.0, "series": [{"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-32", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-32-Aggregated", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-31", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-31-Aggregated", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-30", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-30-Aggregated", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/-16", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/-16-Aggregated", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-36", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-36-Aggregated", "isController": false}, {"data": [[1.0, 581.0]], "isOverall": false, "label": "https://366pi.tech/-17", "isController": false}, {"data": [[1.0, 581.0]], "isOverall": false, "label": "https://366pi.tech/-17-Aggregated", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-35", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-35-Aggregated", "isController": false}, {"data": [[1.0, 572.0]], "isOverall": false, "label": "https://366pi.tech/-14", "isController": false}, {"data": [[1.0, 572.0]], "isOverall": false, "label": "https://366pi.tech/-14-Aggregated", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-34", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-34-Aggregated", "isController": false}, {"data": [[1.0, 851.0]], "isOverall": false, "label": "https://366pi.tech/-15", "isController": false}, {"data": [[1.0, 851.0]], "isOverall": false, "label": "https://366pi.tech/-15-Aggregated", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-33", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-33-Aggregated", "isController": false}, {"data": [[1.0, 315.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-39", "isController": false}, {"data": [[1.0, 315.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-39-Aggregated", "isController": false}, {"data": [[1.0, 559.0]], "isOverall": false, "label": "https://366pi.tech/-18", "isController": false}, {"data": [[1.0, 559.0]], "isOverall": false, "label": "https://366pi.tech/-18-Aggregated", "isController": false}, {"data": [[1.0, 108.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-38", "isController": false}, {"data": [[1.0, 108.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-38-Aggregated", "isController": false}, {"data": [[1.0, 1179.0]], "isOverall": false, "label": "https://366pi.tech/-19", "isController": false}, {"data": [[1.0, 1179.0]], "isOverall": false, "label": "https://366pi.tech/-19-Aggregated", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-37", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-37-Aggregated", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/-12", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/-12-Aggregated", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/-13", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/-13-Aggregated", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-10", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-10-Aggregated", "isController": false}, {"data": [[1.0, 592.0]], "isOverall": false, "label": "https://366pi.tech/-11", "isController": false}, {"data": [[1.0, 592.0]], "isOverall": false, "label": "https://366pi.tech/-11-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-43", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-43-Aggregated", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-42", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-42-Aggregated", "isController": false}, {"data": [[1.0, 327.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-41", "isController": false}, {"data": [[1.0, 327.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-41-Aggregated", "isController": false}, {"data": [[1.0, 338.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-40", "isController": false}, {"data": [[1.0, 338.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-40-Aggregated", "isController": false}, {"data": [[1.0, 261.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-47", "isController": false}, {"data": [[1.0, 261.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-47-Aggregated", "isController": false}, {"data": [[1.0, 281.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-46", "isController": false}, {"data": [[1.0, 281.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-46-Aggregated", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-45", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-45-Aggregated", "isController": false}, {"data": [[1.0, 299.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-44", "isController": false}, {"data": [[1.0, 299.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-44-Aggregated", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-48", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-48-Aggregated", "isController": false}, {"data": [[1.0, 7394.0]], "isOverall": false, "label": "https://366pi.tech/", "isController": false}, {"data": [[1.0, 7394.0]], "isOverall": false, "label": "https://366pi.tech/-Aggregated", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-10", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-10-Aggregated", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-14", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-14-Aggregated", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939244686&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=169966051&cv=2.0.1&z=1826799806&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=f1760727-02cd-5aff-a886-1cabfbc64319&ht=perf&tce=1673939234881&tcs=1673939234323&tdc=1673939244679&tdclee=1673939241384&tdcles=1673939241384&tdi=1673939241361&tdl=1673939235866&tdle=1673939234323&tdls=1673939234323&tfs=1673939234192&tns=1673939234190&trqs=1673939234881&tre=1673939235860&trps=1673939235859&tles=1673939244679&tlee=0&nt=reload&lcp=7133&nav_type=hard", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939244686&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=169966051&cv=2.0.1&z=1826799806&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=f1760727-02cd-5aff-a886-1cabfbc64319&ht=perf&tce=1673939234881&tcs=1673939234323&tdc=1673939244679&tdclee=1673939241384&tdcles=1673939241384&tdi=1673939241361&tdl=1673939235866&tdle=1673939234323&tdls=1673939234323&tfs=1673939234192&tns=1673939234190&trqs=1673939234881&tre=1673939235860&trps=1673939235859&tles=1673939244679&tlee=0&nt=reload&lcp=7133&nav_type=hard-Aggregated", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-13", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-13-Aggregated", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-12", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-12-Aggregated", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-11", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-11-Aggregated", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-18", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-18-Aggregated", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-17", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-17-Aggregated", "isController": false}, {"data": [[1.0, 281.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-16", "isController": false}, {"data": [[1.0, 281.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-16-Aggregated", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-15", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-15-Aggregated", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-19", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-19-Aggregated", "isController": false}, {"data": [[1.0, 411.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939241354&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=169966051&cv=2.0.1&z=1176551699&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=701bc53d-7614-5b31-ba85-c32dcc538bd0&ht=pageview", "isController": false}, {"data": [[1.0, 411.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939241354&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=169966051&cv=2.0.1&z=1176551699&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=701bc53d-7614-5b31-ba85-c32dcc538bd0&ht=pageview-Aggregated", "isController": false}, {"data": [[1.0, 3166.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/", "isController": false}, {"data": [[1.0, 3166.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-Aggregated", "isController": false}, {"data": [[1.0, 343.0], [0.0, 112.5]], "isOverall": false, "label": "https://366pi.tech/-1", "isController": false}, {"data": [[0.33333333333333337, 189.33333333333334]], "isOverall": false, "label": "https://366pi.tech/-1-Aggregated", "isController": false}, {"data": [[1.0, 569.0], [0.0, 230.0]], "isOverall": false, "label": "https://366pi.tech/-2", "isController": false}, {"data": [[0.5, 399.5]], "isOverall": false, "label": "https://366pi.tech/-2-Aggregated", "isController": false}, {"data": [[1.0, 1463.0]], "isOverall": false, "label": "https://366pi.tech/-3", "isController": false}, {"data": [[1.0, 1463.0]], "isOverall": false, "label": "https://366pi.tech/-3-Aggregated", "isController": false}, {"data": [[1.0, 890.0]], "isOverall": false, "label": "https://366pi.tech/-4", "isController": false}, {"data": [[1.0, 890.0]], "isOverall": false, "label": "https://366pi.tech/-4-Aggregated", "isController": false}, {"data": [[1.0, 84.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-21", "isController": false}, {"data": [[1.0, 84.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-21-Aggregated", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-20", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-20-Aggregated", "isController": false}, {"data": [[1.0, 1938.0], [0.0, 176.0]], "isOverall": false, "label": "https://366pi.tech/-0", "isController": false}, {"data": [[0.33333333333333337, 763.3333333333333]], "isOverall": false, "label": "https://366pi.tech/-0-Aggregated", "isController": false}, {"data": [[1.0, 845.0]], "isOverall": false, "label": "https://366pi.tech/-9", "isController": false}, {"data": [[1.0, 845.0]], "isOverall": false, "label": "https://366pi.tech/-9-Aggregated", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-3", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-3-Aggregated", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-25", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-25-Aggregated", "isController": false}, {"data": [[1.0, 279.0], [0.0, 48.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-2", "isController": false}, {"data": [[0.5, 163.5]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-2-Aggregated", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-24", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-24-Aggregated", "isController": false}, {"data": [[1.0, 130.0], [0.0, 99.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-1", "isController": false}, {"data": [[0.33333333333333337, 109.33333333333334]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-1-Aggregated", "isController": false}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-23", "isController": false}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-23-Aggregated", "isController": false}, {"data": [[1.0, 834.0], [0.0, 48.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-0", "isController": false}, {"data": [[0.33333333333333337, 310.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-0-Aggregated", "isController": false}, {"data": [[1.0, 291.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-22", "isController": false}, {"data": [[1.0, 291.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-22-Aggregated", "isController": false}, {"data": [[1.0, 854.0]], "isOverall": false, "label": "https://366pi.tech/-5", "isController": false}, {"data": [[1.0, 854.0]], "isOverall": false, "label": "https://366pi.tech/-5-Aggregated", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-7", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-7-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-29", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-29-Aggregated", "isController": false}, {"data": [[1.0, 845.0]], "isOverall": false, "label": "https://366pi.tech/-6", "isController": false}, {"data": [[1.0, 845.0]], "isOverall": false, "label": "https://366pi.tech/-6-Aggregated", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-6", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-6-Aggregated", "isController": false}, {"data": [[1.0, 561.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-28", "isController": false}, {"data": [[1.0, 561.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-28-Aggregated", "isController": false}, {"data": [[1.0, 2542.0]], "isOverall": false, "label": "https://366pi.tech/-7", "isController": false}, {"data": [[1.0, 2542.0]], "isOverall": false, "label": "https://366pi.tech/-7-Aggregated", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-5", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-5-Aggregated", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-27", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-27-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/-8", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/-8-Aggregated", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-4", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-4-Aggregated", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-26", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-26-Aggregated", "isController": false}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "https://366pi.tech/-63", "isController": false}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "https://366pi.tech/-63-Aggregated", "isController": false}, {"data": [[1.0, 281.0]], "isOverall": false, "label": "https://366pi.tech/-64", "isController": false}, {"data": [[1.0, 281.0]], "isOverall": false, "label": "https://366pi.tech/-64-Aggregated", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/-61", "isController": false}, {"data": [[1.0, 287.0]], "isOverall": false, "label": "https://366pi.tech/-61-Aggregated", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-9", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-9-Aggregated", "isController": false}, {"data": [[1.0, 302.0]], "isOverall": false, "label": "https://366pi.tech/-62", "isController": false}, {"data": [[1.0, 302.0]], "isOverall": false, "label": "https://366pi.tech/-62-Aggregated", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-8", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-8-Aggregated", "isController": false}, {"data": [[1.0, 462.0]], "isOverall": false, "label": "https://366pi.tech/-65", "isController": false}, {"data": [[1.0, 462.0]], "isOverall": false, "label": "https://366pi.tech/-65-Aggregated", "isController": false}, {"data": [[1.0, 346.0]], "isOverall": false, "label": "https://366pi.tech/-66", "isController": false}, {"data": [[1.0, 346.0]], "isOverall": false, "label": "https://366pi.tech/-66-Aggregated", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-60", "isController": false}, {"data": [[1.0, 290.0]], "isOverall": false, "label": "https://366pi.tech/-60-Aggregated", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/-58", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/-58-Aggregated", "isController": false}, {"data": [[1.0, 298.0]], "isOverall": false, "label": "https://366pi.tech/-59", "isController": false}, {"data": [[1.0, 298.0]], "isOverall": false, "label": "https://366pi.tech/-59-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939250496&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1143584341&cv=2.0.1&z=1837785342&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fhome%2Fcontact-us-366pi&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=dd12f7d6-4b6a-5f5d-8018-c06044bb8d1c&ht=perf&tce=1673939246581&tcs=1673939246581&tdc=1673939250489&tdclee=1673939249831&tdcles=1673939249821&tdi=1673939249549&tdl=1673939247249&tdle=1673939246581&tdls=1673939246581&tfs=1673939246581&tns=1673939246578&trqs=1673939246586&tre=1673939247523&trps=1673939247243&tles=1673939250490&tlee=0&nt=navigate&lcp=3014&nav_type=hard", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939250496&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1143584341&cv=2.0.1&z=1837785342&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fhome%2Fcontact-us-366pi&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=dd12f7d6-4b6a-5f5d-8018-c06044bb8d1c&ht=perf&tce=1673939246581&tcs=1673939246581&tdc=1673939250489&tdclee=1673939249831&tdcles=1673939249821&tdi=1673939249549&tdl=1673939247249&tdle=1673939246581&tdls=1673939246581&tfs=1673939246581&tns=1673939246578&trqs=1673939246586&tre=1673939247523&trps=1673939247243&tles=1673939250490&tlee=0&nt=navigate&lcp=3014&nav_type=hard-Aggregated", "isController": false}, {"data": [[1.0, 12100.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.0, 12100.0]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[1.0, 281.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939249543&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1143584341&cv=2.0.1&z=49937929&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fhome%2Fcontact-us-366pi&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=c8bb4f74-3c51-54d6-88e7-a9b53f0e8542&ht=pageview", "isController": false}, {"data": [[1.0, 281.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939249543&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1143584341&cv=2.0.1&z=49937929&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fhome%2Fcontact-us-366pi&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=c8bb4f74-3c51-54d6-88e7-a9b53f0e8542&ht=pageview-Aggregated", "isController": false}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "https://366pi.tech/-52", "isController": false}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "https://366pi.tech/-52-Aggregated", "isController": false}, {"data": [[1.0, 291.0]], "isOverall": false, "label": "https://366pi.tech/-53", "isController": false}, {"data": [[1.0, 291.0]], "isOverall": false, "label": "https://366pi.tech/-53-Aggregated", "isController": false}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "https://366pi.tech/-50", "isController": false}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "https://366pi.tech/-50-Aggregated", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/-51", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/-51-Aggregated", "isController": false}, {"data": [[1.0, 260.0]], "isOverall": false, "label": "https://366pi.tech/-56", "isController": false}, {"data": [[1.0, 260.0]], "isOverall": false, "label": "https://366pi.tech/-56-Aggregated", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-57", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-57-Aggregated", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/-54", "isController": false}, {"data": [[1.0, 294.0]], "isOverall": false, "label": "https://366pi.tech/-54-Aggregated", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-55", "isController": false}, {"data": [[1.0, 284.0]], "isOverall": false, "label": "https://366pi.tech/-55-Aggregated", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://366pi.tech/-49", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://366pi.tech/-49-Aggregated", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/-47", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/-47-Aggregated", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/-48", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/-48-Aggregated", "isController": false}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "https://366pi.tech/-41", "isController": false}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "https://366pi.tech/-41-Aggregated", "isController": false}, {"data": [[1.0, 240.0]], "isOverall": false, "label": "https://366pi.tech/-42", "isController": false}, {"data": [[1.0, 240.0]], "isOverall": false, "label": "https://366pi.tech/-42-Aggregated", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/-40", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/-40-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/-45", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/-45-Aggregated", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/-46", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/-46-Aggregated", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/-43", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "https://366pi.tech/-43-Aggregated", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://366pi.tech/-44", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://366pi.tech/-44-Aggregated", "isController": false}, {"data": [[1.0, 281.0]], "isOverall": false, "label": "https://366pi.tech/wp-json/contact-form-7/v1/contact-forms/1376/feedback/schema", "isController": false}, {"data": [[1.0, 281.0]], "isOverall": false, "label": "https://366pi.tech/wp-json/contact-form-7/v1/contact-forms/1376/feedback/schema-Aggregated", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/-38", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/-38-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/-39", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "https://366pi.tech/-39-Aggregated", "isController": false}, {"data": [[1.0, 864.0]], "isOverall": false, "label": "https://366pi.tech/-36", "isController": false}, {"data": [[1.0, 864.0]], "isOverall": false, "label": "https://366pi.tech/-36-Aggregated", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/-37", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "https://366pi.tech/-37-Aggregated", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/-30", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/-30-Aggregated", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/-31", "isController": false}, {"data": [[1.0, 295.0]], "isOverall": false, "label": "https://366pi.tech/-31-Aggregated", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/-34", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "https://366pi.tech/-34-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/-35", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://366pi.tech/-35-Aggregated", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/-32", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://366pi.tech/-32-Aggregated", "isController": false}, {"data": [[1.0, 578.0]], "isOverall": false, "label": "https://366pi.tech/-33", "isController": false}, {"data": [[1.0, 578.0]], "isOverall": false, "label": "https://366pi.tech/-33-Aggregated", "isController": false}, {"data": [[1.0, 584.0]], "isOverall": false, "label": "https://366pi.tech/-27", "isController": false}, {"data": [[1.0, 584.0]], "isOverall": false, "label": "https://366pi.tech/-27-Aggregated", "isController": false}, {"data": [[1.0, 566.0]], "isOverall": false, "label": "https://366pi.tech/-28", "isController": false}, {"data": [[1.0, 566.0]], "isOverall": false, "label": "https://366pi.tech/-28-Aggregated", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/-25", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/-25-Aggregated", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/-26", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/-26-Aggregated", "isController": false}, {"data": [[1.0, 841.0]], "isOverall": false, "label": "https://366pi.tech/-29", "isController": false}, {"data": [[1.0, 841.0]], "isOverall": false, "label": "https://366pi.tech/-29-Aggregated", "isController": false}, {"data": [[1.0, 704.0]], "isOverall": false, "label": "https://366pi.tech/-20", "isController": false}, {"data": [[1.0, 704.0]], "isOverall": false, "label": "https://366pi.tech/-20-Aggregated", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/-23", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "https://366pi.tech/-23-Aggregated", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/-24", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/-24-Aggregated", "isController": false}, {"data": [[1.0, 230.0]], "isOverall": false, "label": "https://366pi.tech/-21", "isController": false}, {"data": [[1.0, 230.0]], "isOverall": false, "label": "https://366pi.tech/-21-Aggregated", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/-22", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "https://366pi.tech/-22-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 2574.9166666666665, "minX": 1.6739397E12, "maxY": 186513.11666666667, "series": [{"data": [[1.6739397E12, 186513.11666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.6739397E12, 2574.9166666666665]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6739397E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 77.0, "minX": 1.6739397E12, "maxY": 12100.0, "series": [{"data": [[1.6739397E12, 277.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-32", "isController": false}, {"data": [[1.6739397E12, 277.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-31", "isController": false}, {"data": [[1.6739397E12, 292.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-30", "isController": false}, {"data": [[1.6739397E12, 294.0]], "isOverall": false, "label": "https://366pi.tech/-16", "isController": false}, {"data": [[1.6739397E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-36", "isController": false}, {"data": [[1.6739397E12, 581.0]], "isOverall": false, "label": "https://366pi.tech/-17", "isController": false}, {"data": [[1.6739397E12, 294.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-35", "isController": false}, {"data": [[1.6739397E12, 572.0]], "isOverall": false, "label": "https://366pi.tech/-14", "isController": false}, {"data": [[1.6739397E12, 282.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-34", "isController": false}, {"data": [[1.6739397E12, 851.0]], "isOverall": false, "label": "https://366pi.tech/-15", "isController": false}, {"data": [[1.6739397E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-33", "isController": false}, {"data": [[1.6739397E12, 315.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-39", "isController": false}, {"data": [[1.6739397E12, 559.0]], "isOverall": false, "label": "https://366pi.tech/-18", "isController": false}, {"data": [[1.6739397E12, 108.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-38", "isController": false}, {"data": [[1.6739397E12, 1179.0]], "isOverall": false, "label": "https://366pi.tech/-19", "isController": false}, {"data": [[1.6739397E12, 280.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-37", "isController": false}, {"data": [[1.6739397E12, 294.0]], "isOverall": false, "label": "https://366pi.tech/-12", "isController": false}, {"data": [[1.6739397E12, 278.0]], "isOverall": false, "label": "https://366pi.tech/-13", "isController": false}, {"data": [[1.6739397E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/-10", "isController": false}, {"data": [[1.6739397E12, 592.0]], "isOverall": false, "label": "https://366pi.tech/-11", "isController": false}, {"data": [[1.6739397E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-43", "isController": false}, {"data": [[1.6739397E12, 293.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-42", "isController": false}, {"data": [[1.6739397E12, 327.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-41", "isController": false}, {"data": [[1.6739397E12, 338.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-40", "isController": false}, {"data": [[1.6739397E12, 261.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-47", "isController": false}, {"data": [[1.6739397E12, 281.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-46", "isController": false}, {"data": [[1.6739397E12, 289.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-45", "isController": false}, {"data": [[1.6739397E12, 299.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-44", "isController": false}, {"data": [[1.6739397E12, 81.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-48", "isController": false}, {"data": [[1.6739397E12, 7394.0]], "isOverall": false, "label": "https://366pi.tech/", "isController": false}, {"data": [[1.6739397E12, 282.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-10", "isController": false}, {"data": [[1.6739397E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-14", "isController": false}, {"data": [[1.6739397E12, 282.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939244686&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=169966051&cv=2.0.1&z=1826799806&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=f1760727-02cd-5aff-a886-1cabfbc64319&ht=perf&tce=1673939234881&tcs=1673939234323&tdc=1673939244679&tdclee=1673939241384&tdcles=1673939241384&tdi=1673939241361&tdl=1673939235866&tdle=1673939234323&tdls=1673939234323&tfs=1673939234192&tns=1673939234190&trqs=1673939234881&tre=1673939235860&trps=1673939235859&tles=1673939244679&tlee=0&nt=reload&lcp=7133&nav_type=hard", "isController": false}, {"data": [[1.6739397E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-13", "isController": false}, {"data": [[1.6739397E12, 294.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-12", "isController": false}, {"data": [[1.6739397E12, 282.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-11", "isController": false}, {"data": [[1.6739397E12, 297.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-18", "isController": false}, {"data": [[1.6739397E12, 294.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-17", "isController": false}, {"data": [[1.6739397E12, 281.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-16", "isController": false}, {"data": [[1.6739397E12, 277.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-15", "isController": false}, {"data": [[1.6739397E12, 292.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-19", "isController": false}, {"data": [[1.6739397E12, 411.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939241354&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=169966051&cv=2.0.1&z=1176551699&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=701bc53d-7614-5b31-ba85-c32dcc538bd0&ht=pageview", "isController": false}, {"data": [[1.6739397E12, 3166.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/", "isController": false}, {"data": [[1.6739397E12, 189.33333333333334]], "isOverall": false, "label": "https://366pi.tech/-1", "isController": false}, {"data": [[1.6739397E12, 399.5]], "isOverall": false, "label": "https://366pi.tech/-2", "isController": false}, {"data": [[1.6739397E12, 1463.0]], "isOverall": false, "label": "https://366pi.tech/-3", "isController": false}, {"data": [[1.6739397E12, 890.0]], "isOverall": false, "label": "https://366pi.tech/-4", "isController": false}, {"data": [[1.6739397E12, 84.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-21", "isController": false}, {"data": [[1.6739397E12, 77.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-20", "isController": false}, {"data": [[1.6739397E12, 763.3333333333333]], "isOverall": false, "label": "https://366pi.tech/-0", "isController": false}, {"data": [[1.6739397E12, 845.0]], "isOverall": false, "label": "https://366pi.tech/-9", "isController": false}, {"data": [[1.6739397E12, 282.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-3", "isController": false}, {"data": [[1.6739397E12, 278.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-25", "isController": false}, {"data": [[1.6739397E12, 163.5]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-2", "isController": false}, {"data": [[1.6739397E12, 292.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-24", "isController": false}, {"data": [[1.6739397E12, 109.33333333333334]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-1", "isController": false}, {"data": [[1.6739397E12, 283.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-23", "isController": false}, {"data": [[1.6739397E12, 310.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-0", "isController": false}, {"data": [[1.6739397E12, 291.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-22", "isController": false}, {"data": [[1.6739397E12, 854.0]], "isOverall": false, "label": "https://366pi.tech/-5", "isController": false}, {"data": [[1.6739397E12, 289.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-7", "isController": false}, {"data": [[1.6739397E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-29", "isController": false}, {"data": [[1.6739397E12, 845.0]], "isOverall": false, "label": "https://366pi.tech/-6", "isController": false}, {"data": [[1.6739397E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-6", "isController": false}, {"data": [[1.6739397E12, 561.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-28", "isController": false}, {"data": [[1.6739397E12, 2542.0]], "isOverall": false, "label": "https://366pi.tech/-7", "isController": false}, {"data": [[1.6739397E12, 292.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-5", "isController": false}, {"data": [[1.6739397E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-27", "isController": false}, {"data": [[1.6739397E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/-8", "isController": false}, {"data": [[1.6739397E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-4", "isController": false}, {"data": [[1.6739397E12, 278.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-26", "isController": false}, {"data": [[1.6739397E12, 283.0]], "isOverall": false, "label": "https://366pi.tech/-63", "isController": false}, {"data": [[1.6739397E12, 281.0]], "isOverall": false, "label": "https://366pi.tech/-64", "isController": false}, {"data": [[1.6739397E12, 287.0]], "isOverall": false, "label": "https://366pi.tech/-61", "isController": false}, {"data": [[1.6739397E12, 277.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-9", "isController": false}, {"data": [[1.6739397E12, 302.0]], "isOverall": false, "label": "https://366pi.tech/-62", "isController": false}, {"data": [[1.6739397E12, 278.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-8", "isController": false}, {"data": [[1.6739397E12, 462.0]], "isOverall": false, "label": "https://366pi.tech/-65", "isController": false}, {"data": [[1.6739397E12, 346.0]], "isOverall": false, "label": "https://366pi.tech/-66", "isController": false}, {"data": [[1.6739397E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/-60", "isController": false}, {"data": [[1.6739397E12, 280.0]], "isOverall": false, "label": "https://366pi.tech/-58", "isController": false}, {"data": [[1.6739397E12, 298.0]], "isOverall": false, "label": "https://366pi.tech/-59", "isController": false}, {"data": [[1.6739397E12, 285.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939250496&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1143584341&cv=2.0.1&z=1837785342&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fhome%2Fcontact-us-366pi&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=dd12f7d6-4b6a-5f5d-8018-c06044bb8d1c&ht=perf&tce=1673939246581&tcs=1673939246581&tdc=1673939250489&tdclee=1673939249831&tdcles=1673939249821&tdi=1673939249549&tdl=1673939247249&tdle=1673939246581&tdls=1673939246581&tfs=1673939246581&tns=1673939246578&trqs=1673939246586&tre=1673939247523&trps=1673939247243&tles=1673939250490&tlee=0&nt=navigate&lcp=3014&nav_type=hard", "isController": false}, {"data": [[1.6739397E12, 12100.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.6739397E12, 281.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939249543&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1143584341&cv=2.0.1&z=49937929&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fhome%2Fcontact-us-366pi&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=c8bb4f74-3c51-54d6-88e7-a9b53f0e8542&ht=pageview", "isController": false}, {"data": [[1.6739397E12, 283.0]], "isOverall": false, "label": "https://366pi.tech/-52", "isController": false}, {"data": [[1.6739397E12, 291.0]], "isOverall": false, "label": "https://366pi.tech/-53", "isController": false}, {"data": [[1.6739397E12, 283.0]], "isOverall": false, "label": "https://366pi.tech/-50", "isController": false}, {"data": [[1.6739397E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/-51", "isController": false}, {"data": [[1.6739397E12, 260.0]], "isOverall": false, "label": "https://366pi.tech/-56", "isController": false}, {"data": [[1.6739397E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/-57", "isController": false}, {"data": [[1.6739397E12, 294.0]], "isOverall": false, "label": "https://366pi.tech/-54", "isController": false}, {"data": [[1.6739397E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/-55", "isController": false}, {"data": [[1.6739397E12, 296.0]], "isOverall": false, "label": "https://366pi.tech/-49", "isController": false}, {"data": [[1.6739397E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/-47", "isController": false}, {"data": [[1.6739397E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/-48", "isController": false}, {"data": [[1.6739397E12, 283.0]], "isOverall": false, "label": "https://366pi.tech/-41", "isController": false}, {"data": [[1.6739397E12, 240.0]], "isOverall": false, "label": "https://366pi.tech/-42", "isController": false}, {"data": [[1.6739397E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/-40", "isController": false}, {"data": [[1.6739397E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/-45", "isController": false}, {"data": [[1.6739397E12, 280.0]], "isOverall": false, "label": "https://366pi.tech/-46", "isController": false}, {"data": [[1.6739397E12, 289.0]], "isOverall": false, "label": "https://366pi.tech/-43", "isController": false}, {"data": [[1.6739397E12, 296.0]], "isOverall": false, "label": "https://366pi.tech/-44", "isController": false}, {"data": [[1.6739397E12, 281.0]], "isOverall": false, "label": "https://366pi.tech/wp-json/contact-form-7/v1/contact-forms/1376/feedback/schema", "isController": false}, {"data": [[1.6739397E12, 295.0]], "isOverall": false, "label": "https://366pi.tech/-38", "isController": false}, {"data": [[1.6739397E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/-39", "isController": false}, {"data": [[1.6739397E12, 864.0]], "isOverall": false, "label": "https://366pi.tech/-36", "isController": false}, {"data": [[1.6739397E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/-37", "isController": false}, {"data": [[1.6739397E12, 277.0]], "isOverall": false, "label": "https://366pi.tech/-30", "isController": false}, {"data": [[1.6739397E12, 295.0]], "isOverall": false, "label": "https://366pi.tech/-31", "isController": false}, {"data": [[1.6739397E12, 293.0]], "isOverall": false, "label": "https://366pi.tech/-34", "isController": false}, {"data": [[1.6739397E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/-35", "isController": false}, {"data": [[1.6739397E12, 277.0]], "isOverall": false, "label": "https://366pi.tech/-32", "isController": false}, {"data": [[1.6739397E12, 578.0]], "isOverall": false, "label": "https://366pi.tech/-33", "isController": false}, {"data": [[1.6739397E12, 584.0]], "isOverall": false, "label": "https://366pi.tech/-27", "isController": false}, {"data": [[1.6739397E12, 566.0]], "isOverall": false, "label": "https://366pi.tech/-28", "isController": false}, {"data": [[1.6739397E12, 280.0]], "isOverall": false, "label": "https://366pi.tech/-25", "isController": false}, {"data": [[1.6739397E12, 280.0]], "isOverall": false, "label": "https://366pi.tech/-26", "isController": false}, {"data": [[1.6739397E12, 841.0]], "isOverall": false, "label": "https://366pi.tech/-29", "isController": false}, {"data": [[1.6739397E12, 704.0]], "isOverall": false, "label": "https://366pi.tech/-20", "isController": false}, {"data": [[1.6739397E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/-23", "isController": false}, {"data": [[1.6739397E12, 280.0]], "isOverall": false, "label": "https://366pi.tech/-24", "isController": false}, {"data": [[1.6739397E12, 230.0]], "isOverall": false, "label": "https://366pi.tech/-21", "isController": false}, {"data": [[1.6739397E12, 280.0]], "isOverall": false, "label": "https://366pi.tech/-22", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6739397E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.6739397E12, "maxY": 2927.0, "series": [{"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-32", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-31", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-30", "isController": false}, {"data": [[1.6739397E12, 294.0]], "isOverall": false, "label": "https://366pi.tech/-16", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-36", "isController": false}, {"data": [[1.6739397E12, 293.0]], "isOverall": false, "label": "https://366pi.tech/-17", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-35", "isController": false}, {"data": [[1.6739397E12, 283.0]], "isOverall": false, "label": "https://366pi.tech/-14", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-34", "isController": false}, {"data": [[1.6739397E12, 281.0]], "isOverall": false, "label": "https://366pi.tech/-15", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-33", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-39", "isController": false}, {"data": [[1.6739397E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/-18", "isController": false}, {"data": [[1.6739397E12, 107.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-38", "isController": false}, {"data": [[1.6739397E12, 297.0]], "isOverall": false, "label": "https://366pi.tech/-19", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-37", "isController": false}, {"data": [[1.6739397E12, 293.0]], "isOverall": false, "label": "https://366pi.tech/-12", "isController": false}, {"data": [[1.6739397E12, 278.0]], "isOverall": false, "label": "https://366pi.tech/-13", "isController": false}, {"data": [[1.6739397E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/-10", "isController": false}, {"data": [[1.6739397E12, 298.0]], "isOverall": false, "label": "https://366pi.tech/-11", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-43", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-42", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-41", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-40", "isController": false}, {"data": [[1.6739397E12, 54.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-47", "isController": false}, {"data": [[1.6739397E12, 281.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-46", "isController": false}, {"data": [[1.6739397E12, 289.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-45", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-44", "isController": false}, {"data": [[1.6739397E12, 42.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-48", "isController": false}, {"data": [[1.6739397E12, 1106.0]], "isOverall": false, "label": "https://366pi.tech/", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-10", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-14", "isController": false}, {"data": [[1.6739397E12, 282.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939244686&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=169966051&cv=2.0.1&z=1826799806&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=f1760727-02cd-5aff-a886-1cabfbc64319&ht=perf&tce=1673939234881&tcs=1673939234323&tdc=1673939244679&tdclee=1673939241384&tdcles=1673939241384&tdi=1673939241361&tdl=1673939235866&tdle=1673939234323&tdls=1673939234323&tfs=1673939234192&tns=1673939234190&trqs=1673939234881&tre=1673939235860&trps=1673939235859&tles=1673939244679&tlee=0&nt=reload&lcp=7133&nav_type=hard", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-13", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-12", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-11", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-18", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-17", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-16", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-15", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-19", "isController": false}, {"data": [[1.6739397E12, 411.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939241354&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=169966051&cv=2.0.1&z=1176551699&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=701bc53d-7614-5b31-ba85-c32dcc538bd0&ht=pageview", "isController": false}, {"data": [[1.6739397E12, 281.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/", "isController": false}, {"data": [[1.6739397E12, 164.0]], "isOverall": false, "label": "https://366pi.tech/-1", "isController": false}, {"data": [[1.6739397E12, 238.0]], "isOverall": false, "label": "https://366pi.tech/-2", "isController": false}, {"data": [[1.6739397E12, 884.0]], "isOverall": false, "label": "https://366pi.tech/-3", "isController": false}, {"data": [[1.6739397E12, 890.0]], "isOverall": false, "label": "https://366pi.tech/-4", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-21", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-20", "isController": false}, {"data": [[1.6739397E12, 486.0]], "isOverall": false, "label": "https://366pi.tech/-0", "isController": false}, {"data": [[1.6739397E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/-9", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-3", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-25", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-2", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-24", "isController": false}, {"data": [[1.6739397E12, 89.33333333333334]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-1", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-23", "isController": false}, {"data": [[1.6739397E12, 125.66666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-0", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-22", "isController": false}, {"data": [[1.6739397E12, 853.0]], "isOverall": false, "label": "https://366pi.tech/-5", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-7", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-29", "isController": false}, {"data": [[1.6739397E12, 845.0]], "isOverall": false, "label": "https://366pi.tech/-6", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-6", "isController": false}, {"data": [[1.6739397E12, 282.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-28", "isController": false}, {"data": [[1.6739397E12, 859.0]], "isOverall": false, "label": "https://366pi.tech/-7", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-5", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-27", "isController": false}, {"data": [[1.6739397E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/-8", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-4", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-26", "isController": false}, {"data": [[1.6739397E12, 282.0]], "isOverall": false, "label": "https://366pi.tech/-63", "isController": false}, {"data": [[1.6739397E12, 280.0]], "isOverall": false, "label": "https://366pi.tech/-64", "isController": false}, {"data": [[1.6739397E12, 282.0]], "isOverall": false, "label": "https://366pi.tech/-61", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-9", "isController": false}, {"data": [[1.6739397E12, 301.0]], "isOverall": false, "label": "https://366pi.tech/-62", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-8", "isController": false}, {"data": [[1.6739397E12, 193.0]], "isOverall": false, "label": "https://366pi.tech/-65", "isController": false}, {"data": [[1.6739397E12, 159.0]], "isOverall": false, "label": "https://366pi.tech/-66", "isController": false}, {"data": [[1.6739397E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/-60", "isController": false}, {"data": [[1.6739397E12, 280.0]], "isOverall": false, "label": "https://366pi.tech/-58", "isController": false}, {"data": [[1.6739397E12, 298.0]], "isOverall": false, "label": "https://366pi.tech/-59", "isController": false}, {"data": [[1.6739397E12, 285.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939250496&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1143584341&cv=2.0.1&z=1837785342&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fhome%2Fcontact-us-366pi&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=dd12f7d6-4b6a-5f5d-8018-c06044bb8d1c&ht=perf&tce=1673939246581&tcs=1673939246581&tdc=1673939250489&tdclee=1673939249831&tdcles=1673939249821&tdi=1673939249549&tdl=1673939247249&tdle=1673939246581&tdls=1673939246581&tfs=1673939246581&tns=1673939246578&trqs=1673939246586&tre=1673939247523&trps=1673939247243&tles=1673939250490&tlee=0&nt=navigate&lcp=3014&nav_type=hard", "isController": false}, {"data": [[1.6739397E12, 2927.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.6739397E12, 281.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939249543&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1143584341&cv=2.0.1&z=49937929&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fhome%2Fcontact-us-366pi&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=c8bb4f74-3c51-54d6-88e7-a9b53f0e8542&ht=pageview", "isController": false}, {"data": [[1.6739397E12, 283.0]], "isOverall": false, "label": "https://366pi.tech/-52", "isController": false}, {"data": [[1.6739397E12, 291.0]], "isOverall": false, "label": "https://366pi.tech/-53", "isController": false}, {"data": [[1.6739397E12, 283.0]], "isOverall": false, "label": "https://366pi.tech/-50", "isController": false}, {"data": [[1.6739397E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/-51", "isController": false}, {"data": [[1.6739397E12, 259.0]], "isOverall": false, "label": "https://366pi.tech/-56", "isController": false}, {"data": [[1.6739397E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/-57", "isController": false}, {"data": [[1.6739397E12, 294.0]], "isOverall": false, "label": "https://366pi.tech/-54", "isController": false}, {"data": [[1.6739397E12, 284.0]], "isOverall": false, "label": "https://366pi.tech/-55", "isController": false}, {"data": [[1.6739397E12, 296.0]], "isOverall": false, "label": "https://366pi.tech/-49", "isController": false}, {"data": [[1.6739397E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/-47", "isController": false}, {"data": [[1.6739397E12, 287.0]], "isOverall": false, "label": "https://366pi.tech/-48", "isController": false}, {"data": [[1.6739397E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/-41", "isController": false}, {"data": [[1.6739397E12, 240.0]], "isOverall": false, "label": "https://366pi.tech/-42", "isController": false}, {"data": [[1.6739397E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/-40", "isController": false}, {"data": [[1.6739397E12, 286.0]], "isOverall": false, "label": "https://366pi.tech/-45", "isController": false}, {"data": [[1.6739397E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/-46", "isController": false}, {"data": [[1.6739397E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/-43", "isController": false}, {"data": [[1.6739397E12, 296.0]], "isOverall": false, "label": "https://366pi.tech/-44", "isController": false}, {"data": [[1.6739397E12, 281.0]], "isOverall": false, "label": "https://366pi.tech/wp-json/contact-form-7/v1/contact-forms/1376/feedback/schema", "isController": false}, {"data": [[1.6739397E12, 293.0]], "isOverall": false, "label": "https://366pi.tech/-38", "isController": false}, {"data": [[1.6739397E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/-39", "isController": false}, {"data": [[1.6739397E12, 287.0]], "isOverall": false, "label": "https://366pi.tech/-36", "isController": false}, {"data": [[1.6739397E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/-37", "isController": false}, {"data": [[1.6739397E12, 277.0]], "isOverall": false, "label": "https://366pi.tech/-30", "isController": false}, {"data": [[1.6739397E12, 295.0]], "isOverall": false, "label": "https://366pi.tech/-31", "isController": false}, {"data": [[1.6739397E12, 292.0]], "isOverall": false, "label": "https://366pi.tech/-34", "isController": false}, {"data": [[1.6739397E12, 285.0]], "isOverall": false, "label": "https://366pi.tech/-35", "isController": false}, {"data": [[1.6739397E12, 277.0]], "isOverall": false, "label": "https://366pi.tech/-32", "isController": false}, {"data": [[1.6739397E12, 290.0]], "isOverall": false, "label": "https://366pi.tech/-33", "isController": false}, {"data": [[1.6739397E12, 292.0]], "isOverall": false, "label": "https://366pi.tech/-27", "isController": false}, {"data": [[1.6739397E12, 282.0]], "isOverall": false, "label": "https://366pi.tech/-28", "isController": false}, {"data": [[1.6739397E12, 280.0]], "isOverall": false, "label": "https://366pi.tech/-25", "isController": false}, {"data": [[1.6739397E12, 280.0]], "isOverall": false, "label": "https://366pi.tech/-26", "isController": false}, {"data": [[1.6739397E12, 278.0]], "isOverall": false, "label": "https://366pi.tech/-29", "isController": false}, {"data": [[1.6739397E12, 270.0]], "isOverall": false, "label": "https://366pi.tech/-20", "isController": false}, {"data": [[1.6739397E12, 288.0]], "isOverall": false, "label": "https://366pi.tech/-23", "isController": false}, {"data": [[1.6739397E12, 279.0]], "isOverall": false, "label": "https://366pi.tech/-24", "isController": false}, {"data": [[1.6739397E12, 229.0]], "isOverall": false, "label": "https://366pi.tech/-21", "isController": false}, {"data": [[1.6739397E12, 280.0]], "isOverall": false, "label": "https://366pi.tech/-22", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6739397E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.6739397E12, "maxY": 946.0, "series": [{"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-32", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-31", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-30", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-16", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-36", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-17", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-35", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-14", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-34", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-15", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-33", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-39", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-18", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-38", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-19", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-37", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-12", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-13", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-10", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-11", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-43", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-42", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-41", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-40", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-47", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-46", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-45", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-44", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-48", "isController": false}, {"data": [[1.6739397E12, 812.0]], "isOverall": false, "label": "https://366pi.tech/", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-10", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-14", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939244686&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=169966051&cv=2.0.1&z=1826799806&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=f1760727-02cd-5aff-a886-1cabfbc64319&ht=perf&tce=1673939234881&tcs=1673939234323&tdc=1673939244679&tdclee=1673939241384&tdcles=1673939241384&tdi=1673939241361&tdl=1673939235866&tdle=1673939234323&tdls=1673939234323&tfs=1673939234192&tns=1673939234190&trqs=1673939234881&tre=1673939235860&trps=1673939235859&tles=1673939244679&tlee=0&nt=reload&lcp=7133&nav_type=hard", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-13", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-12", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-11", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-18", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-17", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-16", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-15", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-19", "isController": false}, {"data": [[1.6739397E12, 134.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939241354&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=169966051&cv=2.0.1&z=1176551699&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=701bc53d-7614-5b31-ba85-c32dcc538bd0&ht=pageview", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/", "isController": false}, {"data": [[1.6739397E12, 100.0]], "isOverall": false, "label": "https://366pi.tech/-1", "isController": false}, {"data": [[1.6739397E12, 68.0]], "isOverall": false, "label": "https://366pi.tech/-2", "isController": false}, {"data": [[1.6739397E12, 590.0]], "isOverall": false, "label": "https://366pi.tech/-3", "isController": false}, {"data": [[1.6739397E12, 597.0]], "isOverall": false, "label": "https://366pi.tech/-4", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-21", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-20", "isController": false}, {"data": [[1.6739397E12, 359.3333333333333]], "isOverall": false, "label": "https://366pi.tech/-0", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-9", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-3", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-25", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-2", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-24", "isController": false}, {"data": [[1.6739397E12, 39.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-1", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-23", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-0", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-22", "isController": false}, {"data": [[1.6739397E12, 571.0]], "isOverall": false, "label": "https://366pi.tech/-5", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-7", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-29", "isController": false}, {"data": [[1.6739397E12, 562.0]], "isOverall": false, "label": "https://366pi.tech/-6", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-6", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-28", "isController": false}, {"data": [[1.6739397E12, 571.0]], "isOverall": false, "label": "https://366pi.tech/-7", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-5", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-27", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-8", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-4", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-26", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-63", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-64", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-61", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-9", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-62", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-8", "isController": false}, {"data": [[1.6739397E12, 146.0]], "isOverall": false, "label": "https://366pi.tech/-65", "isController": false}, {"data": [[1.6739397E12, 120.0]], "isOverall": false, "label": "https://366pi.tech/-66", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-60", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-58", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-59", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939250496&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1143584341&cv=2.0.1&z=1837785342&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fhome%2Fcontact-us-366pi&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=dd12f7d6-4b6a-5f5d-8018-c06044bb8d1c&ht=perf&tce=1673939246581&tcs=1673939246581&tdc=1673939250489&tdclee=1673939249831&tdcles=1673939249821&tdi=1673939249549&tdl=1673939247249&tdle=1673939246581&tdls=1673939246581&tfs=1673939246581&tns=1673939246578&trqs=1673939246586&tre=1673939247523&trps=1673939247243&tles=1673939250490&tlee=0&nt=navigate&lcp=3014&nav_type=hard", "isController": false}, {"data": [[1.6739397E12, 946.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939249543&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1143584341&cv=2.0.1&z=49937929&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fhome%2Fcontact-us-366pi&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=c8bb4f74-3c51-54d6-88e7-a9b53f0e8542&ht=pageview", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-52", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-53", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-50", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-51", "isController": false}, {"data": [[1.6739397E12, 146.0]], "isOverall": false, "label": "https://366pi.tech/-56", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-57", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-54", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-55", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-49", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-47", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-48", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-41", "isController": false}, {"data": [[1.6739397E12, 141.0]], "isOverall": false, "label": "https://366pi.tech/-42", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-40", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-45", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-46", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-43", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-44", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/wp-json/contact-form-7/v1/contact-forms/1376/feedback/schema", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-38", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-39", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-36", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-37", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-30", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-31", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-34", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-35", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-32", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-33", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-27", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-28", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-25", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-26", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-29", "isController": false}, {"data": [[1.6739397E12, 176.0]], "isOverall": false, "label": "https://366pi.tech/-20", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-23", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-24", "isController": false}, {"data": [[1.6739397E12, 145.0]], "isOverall": false, "label": "https://366pi.tech/-21", "isController": false}, {"data": [[1.6739397E12, 0.0]], "isOverall": false, "label": "https://366pi.tech/-22", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6739397E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 38.0, "minX": 1.6739397E12, "maxY": 7394.0, "series": [{"data": [[1.6739397E12, 7394.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.6739397E12, 38.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.6739397E12, 838.2]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.6739397E12, 5956.479999999985]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.6739397E12, 286.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.6739397E12, 976.6999999999991]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6739397E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 281.0, "minX": 1.0, "maxY": 1938.0, "series": [{"data": [[1.0, 1938.0], [8.0, 456.0], [2.0, 283.0], [17.0, 286.0], [10.0, 576.5], [20.0, 283.5], [23.0, 281.0], [12.0, 291.5], [13.0, 282.0], [7.0, 346.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 23.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 1106.0, "series": [{"data": [[1.0, 1106.0], [8.0, 296.0], [2.0, 283.0], [17.0, 285.0], [10.0, 283.5], [20.0, 19.0], [23.0, 0.0], [12.0, 281.0], [13.0, 0.0], [7.0, 193.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 23.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 2.216666666666667, "minX": 1.6739397E12, "maxY": 2.216666666666667, "series": [{"data": [[1.6739397E12, 2.216666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6739397E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.1, "minX": 1.6739397E12, "maxY": 1.3666666666666667, "series": [{"data": [[1.6739397E12, 1.3666666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.6739397E12, 0.1]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.6739397E12, 0.75]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6739397E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.6739397E12, "maxY": 0.05, "series": [{"data": [[1.6739397E12, 0.03333333333333333]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-2-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-42-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-25-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-55-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-40-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-10-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-38-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-12-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-23-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-51-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-5-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-18-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-36-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-44-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939241354&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=169966051&cv=2.0.1&z=1176551699&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=701bc53d-7614-5b31-ba85-c32dcc538bd0&ht=pageview-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-64-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-16-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-31-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-47-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-9-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "Test-success", "isController": true}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-9-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-33-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-60-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-5-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-45-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-14-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-21-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-59-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-35-success", "isController": false}, {"data": [[1.6739397E12, 0.03333333333333333]], "isOverall": false, "label": "https://366pi.tech/-2-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-11-success", "isController": false}, {"data": [[1.6739397E12, 0.05]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-1-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-24-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-39-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-56-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-41-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-24-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-41-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-6-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-11-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-28-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-20-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-19-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-35-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-52-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939250496&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1143584341&cv=2.0.1&z=1837785342&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fhome%2Fcontact-us-366pi&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=dd12f7d6-4b6a-5f5d-8018-c06044bb8d1c&ht=perf&tce=1673939246581&tcs=1673939246581&tdc=1673939250489&tdclee=1673939249831&tdcles=1673939249821&tdi=1673939249549&tdl=1673939247249&tdle=1673939246581&tdls=1673939246581&tfs=1673939246581&tns=1673939246578&trqs=1673939246586&tre=1673939247523&trps=1673939247243&tles=1673939250490&tlee=0&nt=navigate&lcp=3014&nav_type=hard-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-48-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-65-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-32-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-8-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-48-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-15-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-32-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-39-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-15-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-36-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/wp-json/contact-form-7/v1/contact-forms/1376/feedback/schema-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-19-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-61-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-20-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-44-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-4-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-27-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-23-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-12-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-40-success", "isController": false}, {"data": [[1.6739397E12, 0.05]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-0-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-57-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-25-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-29-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-10-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-3-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-42-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-16-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-7-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-53-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-66-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-27-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-21-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-45-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-14-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-33-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-50-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-47-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-7-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-38-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939249543&dh=366pi.tech&dr=https%3A%2F%2F366pi.tech%2F&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=1143584341&cv=2.0.1&z=49937929&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2Fhome%2Fcontact-us-366pi&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=c8bb4f74-3c51-54d6-88e7-a9b53f0e8542&ht=pageview-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-31-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-62-success", "isController": false}, {"data": [[1.6739397E12, 0.05]], "isOverall": false, "label": "https://366pi.tech/-0-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-43-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://events.api.secureserver.net/t/1/tl/event?cts=1673939244686&dh=366pi.tech&dr=&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F109.0.0.0%20Safari%2F537.36&vci=169966051&cv=2.0.1&z=1826799806&vg=94f4cbad-7f41-5534-8d4c-2eb7857ba6cf&vtg=4d0aedc7-a603-5195-a8d4-473872a7c6ea&dp=%2F&ap=wpaas&trfd=%7B%22ap%22%3A%22wpaas%22%2C%22server%22%3A%22902977a3-e8a5-3aeb-11bb-ae0c1a2b994b.secureserver.net%22%2C%22pod%22%3A%22P3NLWPPOD10%22%2C%22storage%22%3A%22p3cephmah004pod10_data11%22%2C%22xid%22%3A%2242001910%22%2C%22wp%22%3A%226.1.1%22%2C%22php%22%3A%228.1.13%22%2C%22loggedin%22%3A%220%22%2C%22cdn%22%3A%220%22%2C%22builder%22%3A%22%22%2C%22theme%22%3A%22cryptonite%22%2C%22wds%22%3A%220%22%2C%22wp_alloptions_count%22%3A%22543%22%2C%22wp_alloptions_bytes%22%3A%221990334%22%7D&hit_id=f1760727-02cd-5aff-a886-1cabfbc64319&ht=perf&tce=1673939234881&tcs=1673939234323&tdc=1673939244679&tdclee=1673939241384&tdcles=1673939241384&tdi=1673939241361&tdl=1673939235866&tdle=1673939234323&tdls=1673939234323&tfs=1673939234192&tns=1673939234190&trqs=1673939234881&tre=1673939235860&trps=1673939235859&tles=1673939244679&tlee=0&nt=reload&lcp=7133&nav_type=hard-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-18-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-26-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-28-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-3-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-22-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-4-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-37-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-22-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-54-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-13-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-37-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-8-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-17-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-26-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-49-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-43-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-17-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-30-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-34-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-63-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-29-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-46-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-6-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-30-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-46-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/home/contact-us-366pi/-34-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-13-success", "isController": false}, {"data": [[1.6739397E12, 0.05]], "isOverall": false, "label": "https://366pi.tech/-1-success", "isController": false}, {"data": [[1.6739397E12, 0.016666666666666666]], "isOverall": false, "label": "https://366pi.tech/-58-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6739397E12, "title": "Transactions Per Second"}},
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
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
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
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 2.2333333333333334, "minX": 1.6739397E12, "maxY": 2.2333333333333334, "series": [{"data": [[1.6739397E12, 2.2333333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6739397E12, "title": "Total Transactions Per Second"}},
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
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
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
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
