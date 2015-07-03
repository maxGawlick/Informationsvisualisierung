function getJsonItems() {
    
 $.getJSON("./data/merge" + getSelectedYearFull() + ".json", function(json){
    
     
     query = "select * from json.journals where (Publisher=='' + getPublisherRadio() && Title=='Total for all journals')";
     query2 = "select * from json.journals where (Publisher=='' + getPublisherRadio())";
     journalTitles = "select * from json.journals where (Publisher=='' + )";
     
     totalDownloads = jsonsql.query(query, json);


//     console.log("selected year: ", getSelectedYearFull());
//     console.log("publisher: ", getPublisherRadio());
     
     recordsCount = jsonsql.query(query2, json);
//     console.log(recordsCount.length);
     
     
     getDataAndChart(totalDownloads[0]);
     
     updateDownloadsTextsTotal(totalDownloads[0]["YTD Total"]);
     updateDownloadsTextsMonth();
     
     updateTickValues();
     
          
 });
    
        
}

/* handle hover event on month-segments to show their values */
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
    getJsonItems();
    
});