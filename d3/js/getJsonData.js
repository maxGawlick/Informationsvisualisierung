var publisher = {};
var dataObject = {};
var obj = {};
var allYears = [];
var allPublisher = [];




function getLineChartData(selected){
    
   
//    console.log(selected);
    if(selected==null){
    
        $.getJSON("./data/merge" + getSelectedYearFull() + ".json", function(json){

             query = "select * from json.journals where (Title=='Total for all journals' && createQuery())";

             totalDownloads = jsonsql.query(query, json);

            items = $("input[name=verlagradio]:checked");
            for(var i = 0; i< items.length; i++){

                var downloads = [];

                downloads.push(totalDownloads[i]['Jan '+ getSelectedYearShort()]);
                downloads.push(totalDownloads[i]['Feb '+ getSelectedYearShort()]);
                downloads.push(totalDownloads[i]['Mar-' + getSelectedYearFull()]);
                downloads.push(totalDownloads[i]['Apr '+ getSelectedYearShort()]);
                downloads.push(totalDownloads[i]['May-'+ getSelectedYearFull()]);
                downloads.push(totalDownloads[i]['Juni '+ getSelectedYearShort()]);
                downloads.push(totalDownloads[i]['Juli '+ getSelectedYearShort()]);
                downloads.push(totalDownloads[i]['Aug '+ getSelectedYearShort()]);
                downloads.push(totalDownloads[i]['Sep '+ getSelectedYearShort()]);
                downloads.push(totalDownloads[i]['Oct-'+ getSelectedYearFull()]);
                downloads.push(totalDownloads[i]['Nov '+ getSelectedYearShort()]);
                downloads.push(totalDownloads[i]['Dec-' + getSelectedYearFull()]);

                    publisher[$(items[i]).val() +" "+ getSelectedYearFull()] = downloads;

            }

             
                           Chart.generate(publisher);

        });
    }else{
        
        $(selected).each(function(index, selected){
            
            console.log(selected);
            var yearData = selected;
                    $.getJSON("./data/merge" + yearData + ".json", function(json){

                         query = "select * from json.journals where (Title=='Total for all journals' && createQuery())";

                         totalDownloads = jsonsql.query(query, json);

                        items = $("input[name=verlagradio]:checked");
                        console.log(items);
                        for(var i = 0; i< items.length; i++){

                            var downloads = [];
                            var yearLong = yearData;
                            downloads.push(totalDownloads[i]['Jan '+ yearLong.substring(2,4)]);
                            downloads.push(totalDownloads[i]['Feb '+ yearLong.substring(2,4)]);
                            downloads.push(totalDownloads[i]['Mar-' + yearLong]);
                            downloads.push(totalDownloads[i]['Apr '+ yearLong.substring(2,4)]);
                            downloads.push(totalDownloads[i]['May-'+ yearLong]);
                            downloads.push(totalDownloads[i]['Juni '+ yearLong.substring(2,4)]);
                            downloads.push(totalDownloads[i]['Juli '+ yearLong.substring(2,4)]);
                            downloads.push(totalDownloads[i]['Aug '+ yearLong.substring(2,4)]);
                            downloads.push(totalDownloads[i]['Sep '+ yearLong.substring(2,4)]);
                            downloads.push(totalDownloads[i]['Oct-'+ yearLong]);
                            downloads.push(totalDownloads[i]['Nov '+ yearLong.substring(2,4)]);
                            downloads.push(totalDownloads[i]['Dec-' + yearLong]);

                            if(!($(items[i]).val() +" "+ yearLong in getDataFromChart())){
                                publisher[$(items[i]).val() +" "+ yearLong] = downloads;
                            }

                        }
                        console.log(getDataFromChart());
                            console.log(publisher);
                        console.log(createQuery());
                           generateCompareChart(publisher);

                    });
        });
    }
}


function getAllData(){
    var size;
    
    getDataFromView();
    
    console.log("data",Chart.data);
    getJSON(function(json){
        if(json instanceof Array) {
            $(json).each(function(idx, entry) {
                
                 size = Object.size(entry);
                if(size > 11){
                    data = entry;
                    Chart.setData(data);
                    Chart.data = data;
//                    Chart.displayData(getYears(), getPublisher());
                }
            });
        }else{
            
         size = Object.size(json);
        if(size > 11){
           data = json;
            Chart.setData(data);
                    Chart.data = data;
//            Chart.displayData(getYears(), getPublisher());
        }
        }
    });
}

function appendChartTag(arg, publisher, year){
        var x = arg;
        x.unshift(publisher + " " + year);
    
    return x;
}


function update(){
    
    Chart.toggleData(getPublisherRadio(), Chart.getSelectedYears());
    Chart.activateRegions();
    
    
}


function getJSON(callback){
    
    console.log("getJSOn");
    dataObject = {};
    var promises = [],
        promise;
    
    $(allYears).each(function(index, year){
         promise = $.getJSON("./data/merge" + year + ".json").pipe(function(json){
                         query = "select * from json.journals where (Title=='Total for all journals')";

                         totalDownloads = jsonsql.query(query, json);
                        console.log("totaldownloads",totalDownloads);
                        dataObject = createDataObject(totalDownloads, year);
                        console.log("dataObject",dataObject);
                        
                        
                        
                        //callback(dataObject);
                        return dataObject;
                  
                    });
            promises.push(promise);
        });
    
    $.when.apply($, promises).done(function() {
       var args = arguments; 
        console.log('resolved args', args);
        callback(Array.prototype.slice.call(args));
    });
    
}

function getDataObject(){
    return dataObject;
}

function createDataObject(totalDownloadsPerYear, year){
   
    var downloadsPerPublisher = totalDownloadsPerYear;
    obj['' + year] = {};
    for(var i = 0; i< totalDownloadsPerYear.length; i++){
        obj[year]['' + totalDownloadsPerYear[i].Publisher] = getDownloadsForPublisher(year, downloadsPerPublisher[i], totalDownloadsPerYear[i].Publisher);
//        console.log("dmg:", getDownloadsForPublisher(year, downloadsPerPublisher[i]));
//        console.log("obj", obj);
    }
    return obj;
}

function getDownloadsForPublisher(year, totalDownloads, publisher){
    
    var downloads = [];
        downloads.push(totalDownloads['Jan '+ year.substring(2,4)]);
        downloads.push(totalDownloads['Feb '+ year.substring(2,4)]);
        downloads.push(totalDownloads['Mar-' + year]);
        downloads.push(totalDownloads['Apr '+ year.substring(2,4)]);
        downloads.push(totalDownloads['May-'+ year]);
        downloads.push(totalDownloads['Juni '+ year.substring(2,4)]);
        downloads.push(totalDownloads['Juli '+ year.substring(2,4)]);
        downloads.push(totalDownloads['Aug '+ year.substring(2,4)]);
        downloads.push(totalDownloads['Sep '+ year.substring(2,4)]);
        downloads.push(totalDownloads['Oct-'+ year]);
        downloads.push(totalDownloads['Nov '+ year.substring(2,4)]);
        downloads.push(totalDownloads['Dec-' + year]);
    
    return appendChartTag(downloads, publisher, year);
}
function getDataFromView(){
//    allYears = getYears();
//    allPublisher = getPublisher();
    allYears = ['2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];
    allPublisher = ['Annual Reviews', 'Elsevier', 'Springer','Wiley'];
}

function getYears(){    
    var year = [];
    $('#yearselect').children().each(function(){
        year.push($(this).val());
    })
    return year;
}

function getPublisher(){
    var allPublisher = [];
    $(':checkbox').each(function(){
        allPublisher.push($(this).val());
    })
    return allPublisher;
}
    
    
Object.size = function(obj){
    var size = 0, key;
    for(key in obj){
        if(obj.hasOwnProperty(key)) size++;
    }
    return size;
};

