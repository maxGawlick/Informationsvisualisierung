
var journalChart;
var data = {};
var arg = {};
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
                categories: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
                }
            },
     zoom: {enabled:true}
});
        }, 1000);
}

function loadData(arg){
    this.arg = arg;
    setTimeout(function(){
        
        journalChart.load({
            json:
                arg
            ,
            axis: {
                x:{
                type: 'category',
                categories: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
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

function yearOverview(){
    journalChart.unload();
    
    totalJournalDownloads.unshift($('#journalTitle').text());
    setTimeout(function(){
                journalChart = c3.generate({
            bindto: "#journalChart",
            data: {
                columns: [
                    totalJournalDownloads
                ],
                type: 'bar'
            },
              axis: {
                        x:{
                        type: 'category',
                        categories: ['2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014']
                        }
                    }
        });
        
    },1000);
}

function monthOverview(){
        journalChart.unload();
    
    setTimeout(function(){
                journalChart = c3.generate({
            bindto: "#journalChart",
            data:{json:
                arg
                },
            axis: {
                x:{
                type: 'category',
                categories: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
                },
            },
             zoom: {enabled:true}
        });
    },1000);
}
