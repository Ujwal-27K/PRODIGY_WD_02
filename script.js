let timer;
let isRunning = false;
let startTime;
let lapTimes = [];
let resetClickCount = 0;

function startPause() {
    const startPauseButton = document.getElementById("startPause");
    const watchIcon = document.querySelector(".watch-icon i");

    if (isRunning) {
        clearInterval(timer);
        startPauseButton.innerHTML = '<i class="fas fa-stopwatch"></i> Start';
        watchIcon.classList.remove("rotate");
        isRunning = false;
    } else {
        startTime = new Date() - (lapTimes.length > 0 ? lapTimes[lapTimes.length - 1].time : 0);
        timer = setInterval(updateTime, 10);
        startPauseButton.innerHTML = '<i class="fas fa-stopwatch"></i> Pause';
        watchIcon.classList.add("rotate");
        isRunning = true;
    }
}

function reset() {
    if (resetClickCount === 1) {
        // Clear lapTimes after the second click
        clearInterval(timer);
        document.getElementById("display").innerText = "00:00:00.000";
        document.getElementById("startPause").innerHTML = '<i class="fas fa-stopwatch"></i> Start';
        isRunning = false;
        startTime = 0;
        lapTimes = [];
        resetClickCount = 0;
        displayLaps();
    } else {
        // Increment resetClickCount on the first click
        resetClickCount++;
    }
}

function lap() {
    if (isRunning) {
        const lapTime = new Date() - startTime;
        lapTimes.push({ lap: lapTimes.length + 1, time: lapTime });
        displayLaps();
    }
}

function updateTime() {
    const currentTime = new Date() - startTime;
    displayTime(currentTime);
}

function displayTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millisecondsPart = milliseconds % 1000;

    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZeroMilliseconds(millisecondsPart)}`;
    document.getElementById("display").innerText = formattedTime;
}

function padZero(value) {
    return value < 10 ? `0${value}` : value;
}

function padZeroMilliseconds(value) {
    if (value < 10) {
        return `00${value}`;
    } else if (value < 100) {
        return `0${value}`;
    } else {
        return value;
    }
}

function displayLaps() {
    const lapsContainer = document.getElementById("laps");
    lapsContainer.innerHTML = "";

    lapTimes.forEach((lapTime) => {
        const lapDiv = document.createElement("div");
        lapDiv.innerText = `Lap ${lapTime.lap}: ${formatLapTime(lapTime.time)}`;
        lapsContainer.appendChild(lapDiv);
    });
}

function formatLapTime(milliseconds) {
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millisecondsPart = milliseconds % 1000;

    return `${padZero(minutes)}:${padZero(seconds)}.${padZeroMilliseconds(millisecondsPart)}`;
}