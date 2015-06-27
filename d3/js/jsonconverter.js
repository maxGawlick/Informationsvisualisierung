function getAll() {
    
    
 $.getJSON("./data/annual03.json", function(json){
     
     x = jsonsql.query("select * from json.journals", json);
     
     var count = x.length;
     console.log("Anzahl Journals:  ", count);

 });
    
    
}




