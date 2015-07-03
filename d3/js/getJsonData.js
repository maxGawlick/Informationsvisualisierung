var publisher = {};

function getJsonItems() {
    
 $.getJSON("./data/merge" + getSelectedYearFull() + ".json", function(json){
    
     
     query = "select * from json.journals where (Title=='Total for all journals' && getPublisherRadio())";
     query2 = "select * from json.journals where (Publisher=='' + getPublisherRadio())";
     journalTitles = "select * from json.journals where (Publisher=='' + )";
     
     totalDownloads = jsonsql.query(query, json);

//     console.log("totaldownloads: " + totalDownloads);
//     console.log("selected year: ", getSelectedYearFull());
//     console.log("publisher: ", getPublisherRadio());
     
     recordsCount = jsonsql.query(query2, json);
//     console.log(recordsCount.length);
     
     console.log(totalDownloads);
     getDataAndChart(totalDownloads[0]);
     
     updateDownloadsTextsTotal(totalDownloads[0]["YTD Total"]);
     updateDownloadsTextsMonth();
     
     updateTickValues();
     
          
 });
    
        
}



function getLineChartData(){
    
    
    
    
    $.getJSON("./data/merge" + getSelectedYearFull() + ".json", function(json){
    
     query = "select * from json.journals where (Title=='Total for all journals')";
     
     totalDownloads = jsonsql.query(query, json);
     
     console.log("json objekt: ", totalDownloads);
        
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
        
            publisher[$(items[i]).val()] = downloads;
        
    }
    
       generateCompareChart(publisher);
          
 });
}

/* handle click event on month-segments to show their values */

function updateDownloadsTextsMonth() {
    
     $(".layer-0").each(function(l, elem) 
        {
         
        var x = $(elem)[0]; 
         
         $(elem).find("path").each(function(j, child)
            {
            
            $(child).hover(function(){
                $("#downloadsMonth").text("Downloads Monat: " + $(this)[0].__data__); 
            });

        });
         
         
    });
    
}

function updateDownloadsTextsTotal(totalDownloads) {
 $("#downloadsTotal").text("Downloads Total: " + totalDownloads);  
    
}

function updateTickValues() {
    
var k = 0;
    
 $(".tick").each(function(i, elem) 
        {
        
        $(elem).find("text").each(function(j, child)
            {
            
            $(child)[0].textContent = assignChartTicks()[k];
//            console.log("textcontent: ", $(child)[0].textContent);
//            console.log("k: ", k);
            k++;

        });
        
        
    });
    
    
}

$(document).ready(function(){
    getLineChartData();
})
