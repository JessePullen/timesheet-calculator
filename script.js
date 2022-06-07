const submit = document.querySelector('.submit');
const ot6 = document.querySelector('.overtime-6');
const ot8 = document.querySelector('.overtime-8');
const ot10 = document.querySelector('.overtime-10');
const ot12 = document.querySelector('.overtime-12');

let startTime = 0;
let finishTime = 0;
let errorMessage = 'error'

let ot6Flag = false;
let ot8Flag = false;
let ot10Flag = false;
let ot12Flag = false;

//Toggles flags to calculate overtime or not
ot6.addEventListener('click', () => {
    (ot6Flag === false) ? ot6Flag = true : ot6Flag = false;
    console.log(ot6Flag);
})

ot8.addEventListener('click', () => {
    (ot8Flag === false) ? ot8Flag = true : ot8Flag = false;
    ot10Flag = false;
    console.log(ot8Flag);
})

ot10.addEventListener('click', () => {
    (ot10Flag === false) ? ot10Flag = true : ot10Flag = false;
    ot8Flag = false;
    console.log(ot10Flag);
})

ot12.addEventListener('click', () => {
    (ot12Flag === false) ? ot12Flag = true : ot12Flag = false;
    console.log(ot12Flag);
})

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
    let newTime = 0;

    if (time.includes('.')) {
        newTime = time.replace('.', '');
        time = newTime;
    } else if (time.includes(':')) {
        newTime = time.replace(':', '');
        time = newTime;
    }

    if (time > 24 && time < 100) {
        return console.log(errorMessage);
    } else if (time >= 100) {
        time = convertFormat(time);
        return parseInt(time);
    } else if (time <= 24) {
        return parseInt(time *= 60);
    }
}

//Calculates any time done before 6am as double time in minutes
function calculateOTBefore6(time) {
    let mins = 0;
    while (time != 360) {
        time++;
        mins++;
    }
    return mins;
}

//Calculates any time done after 6pm as double time in minutes
function calculateOTAfter6(time) {
    let mins = 0;
    while (time != 1080) {
        time--;
        mins++;
    }
    return mins;
}

//Calculates time difference using loop to iterate minutes between start and finish time
function calculateTime() {
    let answer = 0;
    let overtime = 0;
    let doubleTime = 0;
    let doubleTimeMins = 0;

    startTime = convertTime(startTime);
    finishTime = convertTime(finishTime);

    //Accounts for 24 hour time being used as finish time by adding 720 minutes (12 hours)
    if (startTime > finishTime || startTime === finishTime) {
        finishTime += 720;
    }

    console.log(`start: ${startTime / 60} finish: ${finishTime / 60}`);

    answer = (finishTime - startTime) / 60;

    if (ot6Flag) {
        //minutes equivalent to 6 hours 
        if (startTime < 360) {
            doubleTimeMins += calculateOTBefore6(startTime);
        }
        //minutes equivalent to 18 hours 
        if (finishTime > 1080) {
            doubleTimeMins += calculateOTAfter6(finishTime);
        }
    }
    
    console.log(doubleTimeMins);

    if (ot8Flag) {
        if (answer > 8) {
            overtime = 8
            answer -= 8;
            console.log(`${overtime} and ${answer} at overtime`);
        }
    } else if (ot10Flag) {
        if (answer > 10) {
            overtime = 10
            answer -= 10;
            console.log(`${overtime} and ${answer} at overtime`);
        }
    } else if (ot12Flag) {
        if (answer > 12) {
            answer -= 12;
            doubleTime = 12
            console.log(`${doubleTime} and ${answer} at overtime`);
        }
    } else {
        console.log(answer.toFixed(2));
    }
}