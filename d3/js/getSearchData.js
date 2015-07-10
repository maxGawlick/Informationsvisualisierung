var journalTitles = [''];
var journalISSN = [''];
var journalObjectComplete = [{}];
var journalObjects;
var journalDetailObject;
var ezbLinkFront = "http://rzblx1.uni-regensburg.de/ezeit/searchres.phtml?bibid=AAAAA&colors=7&lang=de&selected_colors%5B%5D=1&selected_colors%5B%5D=4&jq_type1=KT&jq_term1=&jq_bool2=AND&jq_type2=IS&jq_term2="
var ezbLinkEnd = "&jq_bool3=AND&jq_type3=PU&jq_term3=&hits_per_page=50&search_journal=Suche+starten"
var searchVal = "";
var searchValLanding = "";
var issnVal = "";
var posInArray = 0;
var issnInArray = 0;
var ko = 0;
var totalJournalDownloads = [];
var titel = "";

function initSearchData() {
    for (var year = 2003; year <= 2014; year++) {
        $.getJSON("./data/merge" + year + ".json", function (json) {

            journals = "select * from json.journals where (Title!=='Total for all journals')";

            journalObjects = jsonsql.query(journals, json);

            /* fill array with journal titles for autocomplete field */
            for (var i = 0; i < journalObjects.length; i++) {
                if (jQuery.inArray("" + journalObjects[i]["Title"], journalTitles) == -1) {

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

    searchVal = $("#searchInput").val();
    issnVal = $("#issnInput").val();
    posInArray = jQuery.inArray(searchVal, journalTitles);
    issnInArray = jQuery.inArray(issnVal, journalISSN);

    updateDetailView(searchVal);


}

function updateDetailView(arg, arg2) {
    /*check if title input is empty (undefined), if true set posInarray to value of issninarray */
    if (!journalObjectComplete[posInArray]["Title"]) {
        posInArray = issnInArray;
    }
    document.getElementById("journalTitle").innerHTML = journalObjectComplete[posInArray]["Title"];
    $('#journalPublisher').hide().html(journalObjectComplete[posInArray]["Publisher"]).fadeIn('slow');
    $('#journalPlatform').hide().html(journalObjectComplete[posInArray]["Platform"]).fadeIn('slow');
    $('#journalPrintISSN').hide().html(journalObjectComplete[posInArray]["Print ISSN"]).fadeIn('slow');
    $('#journalOnlineISSN').hide().html(journalObjectComplete[posInArray]["Online ISSN"]).fadeIn('slow');
    document.getElementById("ezblink").href = ezbLinkFront + journalObjectComplete[posInArray]["Online ISSN"];
    getSelectedJournalData(arg);
    drawDetailGraph();
}

function getSelectedJournalData(arg) {
    titel = arg;
    currentJournal = journalObjectComplete[posInArray]["Online ISSN"];
    var array = [];
    var years = [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014]
    totalJournalDownloads = [];
    $(years).each(function (index, year) {
        $.getJSON("./data/merge" + year + ".json", function (json, titel) {

            journalDetail = "select * from json.journals where (Title=='' + titel)";

            journalDetailObjects = jsonsql.query(journalDetail, json);

            array = createSearchDataObject(journalDetailObjects, "" + year);

            if (Object.size(array) > 11) {
                setSearchData(array);
                loadData(array);
            }



        });



    });
}

function createSearchDataObject(totalDownloadsPerYear, year) {

    var downloadsPerJournal = totalDownloadsPerYear;
    obj['' + year] = {};
    
    for (var i = 0; i < totalDownloadsPerYear.length; i++) {
        obj[year] = getDownloadsForJournal(year, downloadsPerJournal[i], downloadsPerJournal[i].Title);
    }
    return obj;
}

function getDownloadsForJournal(year, totalDownloads, titel) {

    var downloads = [];
<<<<<<< HEAD
    downloads.push(totalDownloads['Jan ' + year.substring(2, 4)]);
    downloads.push(totalDownloads['Feb ' + year.substring(2, 4)]);
    downloads.push(totalDownloads['Mar-' + year]);
    downloads.push(totalDownloads['Apr ' + year.substring(2, 4)]);
    downloads.push(totalDownloads['May-' + year]);
    downloads.push(totalDownloads['Juni ' + year.substring(2, 4)]);
    downloads.push(totalDownloads['Juli ' + year.substring(2, 4)]);
    downloads.push(totalDownloads['Aug ' + year.substring(2, 4)]);
    downloads.push(totalDownloads['Sep ' + year.substring(2, 4)]);
    downloads.push(totalDownloads['Oct-' + year]);
    downloads.push(totalDownloads['Nov ' + year.substring(2, 4)]);
    downloads.push(totalDownloads['Dec-' + year]);

    totalJournalDownloads.push(totalDownloads['YTD Total']);
    return downloads;
}

function landingSearch() {
    $("#jumbo").fadeToggle("slow", function () {
        $("#searchcont").fadeToggle("slow");
    });

    searchValLanding = $("#landingSearch").val();
    $("#searchInput").val(searchValLanding);
    posInArray = jQuery.inArray(searchValLanding, journalTitles);
<<<<<<< HEAD
    updateDetailView(searchValLanding);

}

/* detect loading states and update UI */
$(document).ready(function () {


    /* enable search fields when date has finishes loading */
    Pace.on("done", function () {
        $("#landingSearch").removeAttr('disabled');
        $("#landingSearchbtn").removeAttr('disabled');
        document.getElementById("landingSearch").focus();
    });


    getAllData();

});
