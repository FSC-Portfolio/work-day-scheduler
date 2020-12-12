"use strict";

// CONSTANTS
const TIME_START = 9;  // Ahh to start at nine!
const TIME_FINISH = 18;  // This poor sod works through to six pm.

// VARIABLES
let dayStart;
let dayFinish;

// FUNCTIONS
function displayTime(displayElement) {
    // Update any element with the date in format specified below.
    $(displayElement).text(moment().format('dddd, MMMM Do'))
}

function setMomentToZero(hourToAdjust) {
    return moment().set({'hour': hourToAdjust, 'minute': "00", 'seconds': "00"});
}

function createTimeBlock() {
    // Creates a timeblock div for each hour of the working day.
    // TODO attach a moment to each block... then it's almost done!
    let i = 0;
    while (i < TIME_FINISH - TIME_START) {
        // Assemble the parts for each row.
        let rowTimeBlock = $('<div class="row">');
        let divHour = $('<div class="col-1 hour">');
        let textarea = $('<textarea class="col-10 future description">');
        let saveButton = $('<div class="col-1 saveBtn">')
        //  Assign a moment to each block.
        let blockMoment = setMomentToZero(TIME_START + i);

        // Carefully construct the row.
        saveButton.html('<a href="#"><i class="far fa-save"></i></a>');
        divHour.html('<span>' + blockMoment.format("hA") + '</span>');
        textarea.text("okies");
        rowTimeBlock.append(divHour, textarea, saveButton);

        // Append to the container
        $('.container').append(rowTimeBlock);

        // Give the timer a little flick.
        i++;
    }

}


// STATEMENTS
// Set the start and end times in moment format.
dayStart = setMomentToZero(TIME_START);
dayFinish = setMomentToZero(TIME_FINISH);
// console.log(dayStart);
// console.log(dayFinish);
// console.log(moment(dayStart).isBefore(moment()));
// console.log(moment().isBefore(moment(dayFinish)));

displayTime("#currentDay");
createTimeBlock();