var chart;

/**
 * Request data from the server, add it to the graph and set a timeout
 * to request again
 */
function requestData() {
    var requests = $.get('/live-data');
    var tm = requests.done( function (result) {
        var series = chart.series[0],
            shift = series.data.length > 20;
        var data1 = [];
        data1.push(result[0]);
        data1.push(result[1]);

        var data2 = [];
        data2.push(result[0]);
        data2.push(result[2]);

        chart.series[0].addPoint(data1, true, shift);
        chart.series[1].addPoint(data2, true, shift);

        setTimeout(requestData, 10000);
    });
}

$(document).ready(function() {
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'data-container',
            defaultSeriesType: 'spline',
            events: {
                load: requestData
            }
        },
        title: {
            text: 'Temperature and Humidity'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Sensor Value',
                margin: 80
            }
        },
        series: [{
            name: 'Temperature',
            data: []
        }, {
            name: 'Humidity',
            data: []
        }],
        credits: {
            enabled: false
        }
    });
});