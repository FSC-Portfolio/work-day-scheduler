"use strict";

// CONSTANTS

// VARIABLES

// FUNCTIONS
function updateTimeBlock(timeblock) {
    // Update any element with the date in format specified below.
    $(timeblock).text(moment().format('dddd, MMMM Do'))
}


// STATEMENTS
updateTimeBlock("#currentDay");