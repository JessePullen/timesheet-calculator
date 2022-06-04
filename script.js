const submit = document.querySelector('.submit');
const ot6 = document.querySelector('.overtime-6');
const ot8 = document.querySelector('.overtime-8');
const ot10 = document.querySelector('.overtime-10');

let startTime = 0;
let finishTime = 0;
let errorMessage = 'error'

submit.addEventListener('click', () => {
    const start = document.querySelector('.start-time').value;
    const finish = document.querySelector('.finish-time').value;
    startTime = start;
    finishTime = finish;

    calculateTime();
});

//Converts 24 hour time to minutes
function convertFormat(time) {
    let hours = 0;
    let mins = 0;
    let newTime = 0;

    if (time < 1000) {
        hours = time.slice(0, 1);
        mins = time.slice(1);
    } else if (time >= 1000) {
        hours = time.slice(0, 2);
        mins = time.slice(2);
    }
    if (mins > 60) {
        return console.log(errorMessage);
    }

    hours *= 60;
    newTime = parseInt(hours) + parseInt(mins);

    return newTime;
}

//Checks number is usable and converts to minutes if only hour is entered
//Calls convertFormat function if minutes are specified
function convertTime(time) {
    if (time > 24 && time < 100) {
        return console.log(errorMessage);
    } else if (time >= 100) {
        time = convertFormat(time);
        return parseInt(time);
    } else if (time <= 24) {
        return parseInt(time *= 60);
    } else {
        return parseInt(time);
    }
}

//Calculates time difference using loop to iterate minutes between start and finish time
function calculateTime() {
    let minutes = 0;

    startTime = convertTime(startTime);
    finishTime = convertTime(finishTime);

    //Accounts for 24 hour time being used as finish time by adding 720 minutes (12 hours)
    if (startTime > finishTime) {
        finishTime += 720;
    }

    console.log(`start: ${startTime} finish: ${finishTime}`);

    //Stops infinite loops by checking for numbers only
    if (!Number.isInteger(startTime) || !Number.isInteger(finishTime)) {
        console.log(errorMessage);
    } else {
        while (startTime != finishTime) {
            minutes++
            startTime++
        }
    }
    console.log(minutes / 60);
}