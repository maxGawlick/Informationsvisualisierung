var Chart = (function(){
    
var that = {};
var lineChart;
var publisherDataJson;
var data = {};
var selected = [];
var years = ["2003"];
var selectedPublisher = [],
    
generate = function(data){
    this.data = data;
    lineChart = c3.generate({
        bindto: "#chart2",
        data:{
            columns:[
                data            
            ]
        },
            axis: {
                x:{
                    type: 'category',
                    categories: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September','Oktober', 'November', 'Dezember']
                }
            },
        zoom: {
            enabled: true
        }
                    
    });
    
    
},
    


getData = function(){
    return data;
},

setData = function(obj){
    data = obj;
},

displayData = function(years, allPublisher){    
    
    for(var y in years){
        for(var p in allPublisher){
            var obj = data[years[y]][allPublisher[p]];
//            console.log(obj);
            if(!(obj == null)){
                addData(obj);                   
            }                             
            
        }
    }
    
    hideData();
    
},
    
hideData = function(){
    lineChart.hide('',{withLegend: true});
},
    
showData = function(allYears, selectedPublisher, years){
    
    console.log("showdata.............");
    console.log(years);
    console.log(selectedPublisher);
    console.log(data);
    var allYears = allYears;
    console.log(allYears);
    
            for(var selectedYear in years){
                    for(var publisher in selectedPublisher){
                        lineChart.show(selectedPublisher[publisher] + " " + years[selectedYear], {withLegend: true});
                    }
                var index = allYears.indexOf(years[selectedYear]);
                allYears.splice(index,1);
                //console.log(allYears);
                       
            }
        
            for(var i = 0; i< allYears.length; i++){
                for(var j=0; j<selectedPublisher.length; j++){
                    //console.log(allYears);
                        lineChart.hide(selectedPublisher[j] + " "+ allYears[i],{withLegend: true});                    
                }
            }
                
},
    
toggleData = function(publisher, years){
    
    console.log(publisher);
    console.log(years);
    for(var p in publisher){
        for(var y in years){
            lineChart.toggle(''+ publisher[p] + " " + years[y], {withLegend: true});
        }
            
    }
},

addData = function(obj, cat){
//    console.log(obj);
    
    lineChart.load({
        columns:[
            obj            
        ]
        ,
        axis: {
            x:{
                type: 'category',
                categories: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September','Oktober', 'November', 'Dezember']
            }
        },
    });
    
    
},
removeData = function(){
    lineChart.unload({
        ids: 'Verlag3'
    });
},

getDataFromChart = function(){
    return data;
},
transformBar =function(){
    lineChart.transform('bar');
    
},
transformLine = function(){
    lineChart.transform('line');
    
},
transformDonut = function(){
    lineChart.transform('donut');
    
},

transformScatter = function(){
    lineChart.transform('scatter');
},

transformAreaSpline = function(){
    lineChart.transform('area-spline');
},

getSelected = function(){
    return selected;
},
getSelectedYears = function(){
   return $('#yearselect').val();
},

activateRegions = function(){
  lineChart.regions([
      {axis: "x",start: "1", end: "2.5", class: "region1"},
      {axis: "x",start: "5.5", end: "7", class: "region2"},
      {axis: "x",start: "9", end: "10", class: "region3"}
   ]);
},
    
toggleRegions = function(){
    if(!($('#semesterRadio').is(':checked'))){
        console.log("if");
        $('.c3-region').css('display', 'none');
    }else{
    console.log("else");
        $('.c3-region').css('display', 'block');
        
    }
},

publisherSelectorOnChange = function(year, box){   
    var $box = box;
    var publisherYears = [];
        for(var i =0; i< year.length; i++){
            if($box.val()+ " "+ year[i] in data){
                lineChart.toggle($box.val()+ " "+ year[i],{withLegend: true});

            }else{
                publisherYears.push(year[i]);
            }
            
        }
        if(!(publisherYears == null)){
            getLineChartData(publisherYears);
        }
    
},

yearSelectorOnChange = function(allYears, selectedPublisher, years){
           
        
            for(var selectedYear in years){
                    for(var publisher in selectedPublisher){
                        if(selectedPublisher[publisher] + " "+years[selectedYear] in data){
                            var index = allYears.indexOf(years[selectedYear]);
                            allYears.splice(index,1);
                            lineChart.show(selectedPublisher[publisher] + " "+ years[selectedYear],{withLegend: true});
                            
                        }
                    }
                       
            }
        
            for(var i = 0; i< allYears.length; i++){
                for(var j=0; j<selectedPublisher.length; j++){
                    if(selectedPublisher[j] + " "+ allYears[i] in data){
                        lineChart.hide(selectedPublisher[j] + " "+ allYears[i],{withLegend: true});
                    }
                }
            }
                
     
}
    that.toggleRegions = toggleRegions;
    that.activateRegions = activateRegions;
    that.transformBar = transformBar;
    that.transformAreaSpline = transformAreaSpline;
    that.transformLine = transformLine;
    that.transformDonut = transformDonut;
    that.showData = showData;
    that.getSelectedYears = getSelectedYears;
    that.toggleData = toggleData;
    that.hideData = hideData;
    that.generate = generate;
    that.displayData = displayData;
    that.setData = setData;
    
    return that;
    
})();
