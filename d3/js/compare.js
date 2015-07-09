var Chart = (function () {

    var that = {};
    var lineChart;
    var publisherDataJson;
    var data = {};
    var selected = [];
    var years = ["2003"];
    var selectedPublisher = [],

        //generate lineChart
        generate = function () {
            console.log("generate");
            lineChart = c3.generate({
                bindto: "#chart2",
                data: {
                    columns: [
                        data
                             ]
                },axis: {
                    x: {
                        type: 'category',
                        categories: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
                    }
                },zoom: {
                    enabled: true
                }
            });
        },
        //get Chart data
        getData = function () {
            return data;
        },
        // set Chart data
        setData = function (obj) {
            data = obj;
        },
        //add data to Chart and hides it
        displayData = function (years, allPublisher) {
            console.log("displayData", data);
            for (var y in years) {
                for (var p in allPublisher) {
                    var obj = data[years[y]][allPublisher[p]];
                    console.log("obj", obj);
                    if (!(obj == null)) {
                        addData(obj);
                    }
                }
            }
            hideData();
        },
        //hides data in Chart
        hideData = function () {
            lineChart.hide('', {
                withLegend: true
            });
        },
        //toggles visibility of Chart data
        toggleData = function (publisher, years) {
            for (var p in publisher) {
                for (var y in years) {
                    lineChart.toggle('' + publisher[p] + " " + years[y], {
                        withLegend: true
                    });
                }
            }
        },
        //adds data to Chart
        addData = function (obj, cat) {
            lineChart.load({
                columns: [
                    obj
                ],
                axis: {
                    x: {
                        type: 'category',
                        categories: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
                    }
                },
            });
        },
        getDataFromChart = function () {
            return data;
        },
        transformBar = function () {
            lineChart.transform('bar');
        },
        transformLine = function () {
            lineChart.transform('line');
        },
        transformDonut = function () {
            lineChart.transform('donut');
        },
        transformScatter = function () {
            lineChart.transform('scatter');
        },
        transformAreaSpline = function () {
            lineChart.transform('area-spline');
        },
        getSelected = function () {
            return selected;
        },
        getSelectedYears = function () {
            return $('#yearselect').val();
        },
        //activate regions in Chart
        activateRegions = function () {
            lineChart.regions([
                {
                    axis: "x",
                    start: "1",
                    end: "2.5",
                    class: "region1"
                },
                {
                    axis: "x",
                    start: "5.5",
                    end: "7",
                    class: "region2"
                },
                {
                    axis: "x",
                    start: "9",
                    end: "10",
                    class: "region3"
                }
            ]);
        },
        //toggle visibility of regions in Chart
        toggleRegions = function () {
            if (!($('#semesterRadio').is(':checked'))) {
                $('.c3-region').css('display', 'none');
            } else {
                $('.c3-region').css('display', 'block');
            }
        }
    
    that.toggleRegions = toggleRegions;
    that.activateRegions = activateRegions;
    that.transformBar = transformBar;
    that.transformAreaSpline = transformAreaSpline;
    that.transformLine = transformLine;
    that.transformDonut = transformDonut;
    that.getSelectedYears = getSelectedYears;
    that.toggleData = toggleData;
    that.hideData = hideData;
    that.generate = generate;
    that.displayData = displayData;
    that.setData = setData;

    return that;

})();
