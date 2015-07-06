var journalTitles = [''];
var journalISSN = [''];
var journalObjectComplete = [{}];
var test = ['genesis', 'go'];
var journalObjects;
var ezbLinkFront = "http://rzblx1.uni-regensburg.de/ezeit/searchres.phtml?bibid=AAAAA&colors=7&lang=de&selected_colors%5B%5D=1&selected_colors%5B%5D=4&jq_type1=KT&jq_term1=&jq_bool2=AND&jq_type2=IS&jq_term2="
var ezbLinkEnd = "&jq_bool3=AND&jq_type3=PU&jq_term3=&hits_per_page=50&search_journal=Suche+starten"


function initSearchData() {
    
     for(var year = 2003; year <= 2010; year++) {
     $.getJSON("./data/merge" + year + ".json", function(json){
         
     journals = "select * from json.journals where (Title!=='Total for all journals')";
     
     journalObjects = jsonsql.query(journals, json);

     /* fill array with journal titles for autocomplete field */
     for(var i = 0; i< journalObjects.length; i++) {
      if(jQuery.inArray("" + journalObjects[i]["Title"], journalTitles) == -1) {
          
       journalTitles.push(journalObjects[i]["Title"]);
       journalISSN.push(journalObjects[i]["Online ISSN"]);
       journalObjectComplete.push(journalObjects[i]);

          
      }
     }

       document.getElementById("nrOfJournals").innerHTML = journalTitles.length;  


     });
     }
     
   return journalTitles; 
    
}
/* HANDLE search button and update journal detail view */
function handleButtonClick() {
    
        var searchVal = $("#searchInput").val();
        var issnVal = $("#issnInput").val();
        var posInArray = jQuery.inArray(searchVal, journalTitles);
        var issnInArray = jQuery.inArray(issnVal, journalISSN);
        
        document.getElementById("journalTitle").innerHTML = journalObjectComplete[posInArray]["Title"];
        document.getElementById("journalPublisher").innerHTML = journalObjectComplete[posInArray]["Publisher"];
        document.getElementById("ezblink").href= ezbLinkFront + journalObjectComplete[posInArray]["Online ISSN"]; 

}

/* detect loading states and update UI */
$(document).ready(function(){
    
    
    
    
//    Pace.on("start", function(){
        
//    });
    
    
    
    Pace.on("done", function(){
        console.log("DONE");
    });
    
});