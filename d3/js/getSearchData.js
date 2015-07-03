function initSearchData(journalsArray) {
 var journalTitles = ['']; 
    
     $.getJSON("./data/merge2003.json", function(json){

     journals = "select * from json.journals where (Publisher=='Annual Reviews' && Title!=='Total for all journals')";
     
     journalObjects = jsonsql.query(journals, json);
     
     /* fill array with journal titles for autocomplete field */
     for(var i = 0; i< journalObjects.length; i++) {
      journalTitles.push(journalObjects[i]["Title"]);
     }
    
     });
   return journalTitles; 
}