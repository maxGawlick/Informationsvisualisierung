var publisher = {};
var dataObject = {};
var obj = {};
var allYears = [];
var allPublisher = [];

//get ALL data from JSON docs
function getAllData() {
    var size;
    getDataFromView();
    getJSON(function (json) {
        if (json instanceof Array) {
            $(json).each(function (idx, entry) {
                size = Object.size(entry);
                if (size > 11) {
                    data = entry;
                    Chart.setData(data);
                }
            });
        } else {
            size = Object.size(json);
            if (size > 11) {
                data = json;
                Chart.setData(data);
            }
        }
    });
}
//append Graph Legend label to data
function appendChartTag(arg, publisher, year) {
    var x = arg;
    x.unshift(publisher + " " + year);

    return x;
}
//update to preselect
function update() {
    Chart.toggleData(getPublisherRadio(), Chart.getSelectedYears());
    Chart.activateRegions();
}

//get JSon and starts creation of data object
function getJSON(callback) {
    dataObject = {};
    var promises = [],
        promise;

    //loops through years and gets data
    $(allYears).each(function (index, year) {
        //get data with promises
        promise = $.getJSON("./data/merge" + year + ".json").pipe(function (json) {
            query = "select * from json.journals where (Title=='Total for all journals')";

            totalDownloads = jsonsql.query(query, json);
            dataObject = createDataObject(totalDownloads, year);

            return dataObject;

        });
        promises.push(promise);
    });
    //resolve promises
    $.when.apply($, promises).done(function () {
        var args = arguments;
        callback(Array.prototype.slice.call(args));
    });

}
//returns data Object
function getDataObject() {
    return dataObject;
}
//Create data object with correct json format for Chart
function createDataObject(totalDownloadsPerYear, year) {
    var downloadsPerPublisher = totalDownloadsPerYear;
    obj['' + year] = {};
    for (var i = 0; i < totalDownloadsPerYear.length; i++) {
        obj[year]['' + totalDownloadsPerYear[i].Publisher] = getDownloadsForPublisher(year, downloadsPerPublisher[i], totalDownloadsPerYear[i].Publisher);
    }
    return obj;
}
//build Array for year
function getDownloadsForPublisher(year, totalDownloads, publisher) {

    var downloads = [];
    downloads.push(totalDownloads['Jan ' + year.substring(2, 4)]);
    downloads.push(totalDownloads['Feb ' + year.substring(2, 4)]);
    downloads.push(totalDownloads['Mar-' + year]);
    downloads.push(totalDownloads['Apr ' + year.substring(2, 4)]);
    downloads.push(totalDownloads['May-' + year]);
    downloads.push(totalDownloads['Juni ' + year.substring(2, 4)]);
    downloads.push(totalDownloads['Juli ' + year.substring(2, 4)]);
    downloads.push(totalDownloads['Aug ' + year.substring(2, 4)]);
    downloads.push(totalDownloads['Sep ' + year.substring(2, 4)]);
    downloads.push(totalDownloads['Oct-' + year]);
    downloads.push(totalDownloads['Nov ' + year.substring(2, 4)]);
    downloads.push(totalDownloads['Dec-' + year]);

    return appendChartTag(downloads, publisher, year);
}

function getDataFromView() {
    //    allYears = getYears();
    //    allPublisher = getPublisher();
    allYears = ['2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];
    allPublisher = ['Annual Reviews', 'Elsevier', 'Springer', 'Wiley'];
}
//get all possible years from selector
function getYears() {
    var year = [];
    $('#yearselect').children().each(function () {
        year.push($(this).val());
    })
    return year;
}
//get all possible publisher from selector
function getPublisher() {
    var allPublisher = [];
    $(':checkbox').each(function () {
        allPublisher.push($(this).val());
    })
    return allPublisher;
}
//implements Object.size(arg) method
Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
