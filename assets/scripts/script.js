"use strict";

// CONSTANTS
const TIME_START = 9;  // Ahh to start at nine!
const TIME_FINISH = 18;  // This poor sod works through to six pm.
const KEY_CALENDAR_NOTES = "calendar_notes";
const PREFIX_TA = "ta-";
const PREFIX_ID = "hour-";

// VARIABLES
let dayStart;
let dayFinish;
let calendarNotes = [{}];

// FUNCTIONS
function loadData() {
    // Loads any stored notes.
    if (localStorage.getItem(KEY_CALENDAR_NOTES)) {
        calendarNotes = JSON.parse(localStorage.getItem(KEY_CALENDAR_NOTES));
    }
    return calendarNotes;
}

function storeData(noteKey, noteValue) {
    // Stores a single note to local storage as a dictionary object so it can be overwritten.
    calendarNotes[0][noteKey] = noteValue;
    // console.log(JSON.stringify(calendarNotes));
    localStorage.setItem(KEY_CALENDAR_NOTES, JSON.stringify(calendarNotes));
}

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
        let rowId = PREFIX_ID + moment(blockMoment).get("hour");
        let textareaId = PREFIX_TA + rowId;
        let divHour = $('<div class="col-1 hour">');
        let textarea = $('<textarea class="col-10 description">');
        let saveButton = $('<div class="col-1 saveBtn">');

        // Carefully construct the row.
        rowTimeBlock.attr("id", rowId);
        textarea.addClass(determineTextareaClass(blockMoment));
        textarea.attr("id", textareaId);
        saveButton.html('<a href="#"><i class="far fa-save"></i></a>');
        divHour.html('<span>' + blockMoment.format("hA") + '</span>');
        rowTimeBlock.append(divHour, textarea, saveButton);

        // Add any existing notes.
        if (calendarNotes[0][rowId]) {
            textarea.text(calendarNotes[0][rowId]);
        }

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

// Load the data and build the page page.
calendarNotes = loadData();
console.log(calendarNotes);
displayTime("#currentDay");
createTimeBlock();

// Listen for the click and store a note.
$('.saveBtn').click(function (event){
    event.preventDefault();
    let tempId = $(this).parent().attr("id");
    let tempNote = $(this).prev("#" + PREFIX_TA + tempId).val();
    storeData(tempId, tempNote);
})