
/* return value of selected radiobox */
function getPublisherRadio() {

    var selectedPublisher = [];
    items = $("input[name=verlagradio]:checked");
    for(var i = 0; i< items.length; i++){
       
            selectedPublisher.push($(items[i]).val());
        
        
    }
    return selectedPublisher;
    
}

function createQuery(){
    
    var selectedPublisher = getPublisherRadio();
    queryString = "";
    for(var publisher in selectedPublisher){
        if(selectedPublisher.length == 1 || publisher == 0){
                queryString = queryString + "Publisher=='" + selectedPublisher[publisher] + "' ";
        }else if(selectedPublisher.length > 1 ){
                queryString = queryString + " || Publisher=='" + selectedPublisher[publisher] + "' ";
        }
    }
  return queryString; 
}

function getSelectedYearFull() {
 var yearselect = document.getElementById("yearselect");
 var year = yearselect.options[yearselect.selectedIndex].value;

 return year;
}

/* return last 2 digits of  selectedyear */
function getSelectedYearShort() {
 return getSelectedYearFull().substring(2,4);   
}