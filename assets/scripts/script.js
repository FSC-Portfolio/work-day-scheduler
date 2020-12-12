"use strict";

// CONSTANTS
const TIME_START = 6;  // Ahh to start at nine!
const TIME_FINISH = 14;  // This poor sod works through to six pm.

// VARIABLES
let dayStart;
let dayFinish;

// FUNCTIONS
function displayTime(displayElement) {
    // Update any element with the date in format specified below.
    $(displayElement).text(moment().format('dddd, MMMM Do'))
}

function setMomentToZero(hourToAdjust) {
    // Sets the minutes and seconds to zeroes.
    return moment().set({'hour': hourToAdjust, 'minute': "00", 'seconds': "00"});
}

function determineTextareaClass(timeIn) {
    // Returns the class for an objects css based by comparing current time to elements time.
    let textareaClass;
    // Test for present.
    if (moment().get("hour") === moment(timeIn).get("hour")) {
        textareaClass = "present";
    // test for future time.
    } else if (moment().isBefore(moment(timeIn))) {
        textareaClass = "future";
    // Test for past time.
    } else if (moment().isAfter(moment(timeIn))) {
        textareaClass = "past";
    }
    return textareaClass;
}

function createTimeBlock() {
    // Creates a timeblock div for each hour of the working day.
    // TODO attach a moment to each block... then it's almost done!
    let i = 0;
    while (i < TIME_FINISH - TIME_START) {
        // correct the hour for this block.
        let blockMoment = setMomentToZero(TIME_START + i);
        // determine the correct class for the textarea

        // Assemble the parts for each row.
        let rowTimeBlock = $('<div class="row">');
        let divHour = $('<div class="col-1 hour">');
        let textarea = $('<textarea class="col-10 description">');
        let saveButton = $('<div class="col-1 saveBtn">');

        // Carefully construct the row.
        textarea.addClass(determineTextareaClass(blockMoment));
        textarea.attr("id", "desc-h-" + moment(blockMoment).get("hour"));
        saveButton.html('<a href="#"><i class="far fa-save"></i></a>');
        divHour.html('<span>' + blockMoment.format("hA") + '</span>');
        // textarea.text("okies");
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

displayTime("#currentDay");
createTimeBlock();