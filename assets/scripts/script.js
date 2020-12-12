"use strict";

// CONSTANTS
const TIME_START = 9;
const TIME_FINISH = 17;

// VARIABLES
let dayStart;
let dayFinish;

// FUNCTIONS
function displayTime(displayElement) {
    // Update any element with the date in format specified below.
    $(displayElement).text(moment().format('dddd, MMMM Do'))
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

        // Carefully construct the row.
        saveButton.html('<a href="#"><i class="far fa-save"></i></a>');
        divHour.html('<span>' + moment().hour() + '</span>');
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
dayStart = moment().set({'hour': TIME_START, 'minute': "00", 'seconds': "00"});
dayFinish = moment().set({'hour': TIME_FINISH, 'minute': "00", 'seconds': "00"});
console.log(dayStart._d);
console.log(dayFinish._d);
console.log(moment(dayStart).isBefore(moment()));
console.log(moment().isBefore(moment(dayFinish)));

console.log(moment().get("hour"));
displayTime("#currentDay");
createTimeBlock();