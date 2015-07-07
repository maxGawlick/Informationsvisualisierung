var data = null;
var keys = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
var montharray = [''];
var testArray = ['200', '500', '800', '3000'];
var largestArrayValue = null;
var minArrayValue = null;

var tickValuesCount = 8;
var tickArray = new Array();

/* get needed values from 'annual' and fill them in chart-data-objcect, draw chart*/
function getDataAndChart(annual) {
    
    
    montharray[0] = parseInt(annual["Jan " + getSelectedYearShort()]);
    montharray[1] = parseInt(annual["Feb " + getSelectedYearShort()]);
    montharray[2] = parseInt(annual["Mar-" + getSelectedYearFull()]);
    montharray[3] = parseInt(annual["Apr " + getSelectedYearShort()]);
    montharray[4] = parseInt(annual["May-" + getSelectedYearFull()]);
    montharray[5] = parseInt(annual["Juni " + getSelectedYearShort()]);
    montharray[6] = parseInt(annual["Juli " + getSelectedYearShort()]);
    montharray[7] = parseInt(annual["Aug " + getSelectedYearShort()]);
    montharray[8] = parseInt(annual["Sep " + getSelectedYearShort()]);
    montharray[9] = parseInt(annual["Oct-" + getSelectedYearFull()]);
    montharray[10] = parseInt(annual["Nov " + getSelectedYearShort()]);
    montharray[11] = parseInt(annual["Dec-" + getSelectedYearFull()]);

    data = [{data: {}}]; 
    
    for(var i=0; i<keys.length; i++)
     data[0].data[keys[i]] = montharray[i];
    
    /* get largest number value from array */
    largestArrayValue = Math.max.apply(Math, montharray);
    minArrayValue = Math.min.apply(Math, montharray);

    /* call fk to assign chart domain and tick values */
    assignChartDomain(largestArrayValue);
    
    /* reset month text value */
    document.getElementById("downloadsMonth").innerHTML = "Downloads Monat:";
    /* draw the chart */
    drawChart();
    

    
};

/* set chart values according to displayed data */
function assignChartDomain(largestValue) {
    
    /*set chart domain from 0 to  10% over the highest data-value*/
    chart.domain([0,1.1*largestValue]);
    
    /* use prior filled array to display tickValues on the chart accordingly */
    chart.tickValues(assignChartTicks);
    
}

function assignChartTicks() {
 /* clear array */
    tickArray.length = 0;
    
    
    /* fill array with values for chart-tickValues, always divide highest value in 8 same-sized parts (12,5% steps) */
    for(var i = 1; i <= tickValuesCount; i++) {  
      tickArray.push(Math.round(largestArrayValue*(i/8)));
    }
    
    return tickArray;
}

/*update button*/
//d3.select('#update')
//  .on('click', update);

/* draw the chart */
function drawChart() {
    d3.select('#chart')
    .datum(data)
    .call(chart);
    getSelectedYearShort();
}


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