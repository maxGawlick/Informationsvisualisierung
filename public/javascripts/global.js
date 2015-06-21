
// data array for filling the diagrams
var data = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/springer', function( data ) {

        console.log(data);
        // Inject the whole content string into our existing HTML table
        $('#wrapper').html(data);
    });
};