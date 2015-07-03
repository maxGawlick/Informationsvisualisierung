var lineChart;
var data;
$(document).ready(function(){
    generateCompareChart();
})
function onWidgetClick(){
    data = getLineChartData();
    $('.widget').toggleClass('flipped');
}
function generateCompareChart(data){
    
    lineChart = c3.generate({
        bindto: "#chart2",
        data: {
            
            columns: [ 
                ['Verlag1', 30, 200, 100, 400, 150, 250, 80, 330,700,200,280,100],
                ['Verlag2', 50,100,120,130,140,200,500,350,100,600]
            
            ]
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
            ['Verlag3', null, 30, 20, 50, 40, 60, 50,300,280,175,183,500]
        ],
        colors: {Verlag3: '#ff0000'}
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

