var lineChart;
var publisherDataJson;
var data;



function generateCompareChart(data){
    console.log("data: ", data);
    this.data = data;
    publisherDataJson = JSON.stringify(data);
    console.log(publisherDataJson);
    lineChart = c3.generate({
        bindto: "#chart2",
        data: {
            json: data
        },
        axis: {
            x:{
                type: 'category',
                categories: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September','Oktober', 'November', 'Dezember']
            }
        }
    });
    

}

function addData(){
    lineChart.load({
        columns:[
            publisherDataJson
        ]
    });
}
function removeData(){
    lineChart.unload({
        ids: 'Verlag3'
    });
}
function transformBar(){
    lineChart.transform('bar');
    
}
function transformLine(){
    lineChart.transform('line');
    
}
function transformDonut(){
    lineChart.transform('donut');
    
}
$(document).ready(function(){
    $(':checkbox').change(function(){
        console.log($(this).val());
        if($(this).val() in data){
            console.log("true");
            lineChart.toggle($(this).val(),{withLegend: true});
            
        }else{
            console.log("false");
            getLineChartData();
        }
    })
})
