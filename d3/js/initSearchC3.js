
var journalChart;
var data = {};
function drawDetailGraph() {
setTimeout(function () {
        journalChart = c3.generate({
    bindto: "#journalChart",
    data: {
        columns: [
            data
        ],
        type: 'bar'
    },
      axis: {
                x:{
                type: 'category',
                categories: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
                }
            },  
});
        }, 1000);
}

function loadData(arg){
    
    setTimeout(function(){
        
        journalChart.load({
            json:
                arg
            ,
            axis: {
                x:{
                type: 'category',
                categories: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
                }
            },
        });
        
        console.log(data);
        
    }, 2000);
    console.log("TIMER FINISH");
}

function setData(arg){
    data = arg;
}