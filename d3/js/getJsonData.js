function getJsonItems() {
    
 $.getJSON("./data/merge" + getSelectedYearFull() + ".json", function(json){
    
     query = "select * from json.journals where (Publisher=='' + getPublisherRadio() && Title=='Total for all journals')";
     
     totalDownloads = jsonsql.query(query, json);
     
     console.log("json objekt: ", totalDownloads);
     console.log("selected year: ", getSelectedYearFull());
     console.log("publisher: ", getPublisherRadio());

     getDataAndChart(totalDownloads[0]);
     
     
     
//     totalDownloadsInt = parseInt(totalDownloads[0]["YTD Total"]);

          
 });
}

$(document).ready(function(){
    getJsonItems();
});
//