let mode = "study";

let studyDuration = 25 * 60;
let breakDuration = 5 * 60;

let timeLeft = studyDuration;

let timer = null;
let running = false;

let sessions = 0;
let totalStudyMinutes = 0;


/* UPDATE DISPLAY */

function updateDisplay() {

    let minutes = Math.floor(timeLeft / 60);

    let seconds = timeLeft % 60;

    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");

    updateProgress();
}


/* PROGRESS */

function updateProgress() {

    let duration =
        mode === "study"
            ? studyDuration
            : breakDuration;

    let completed =
        duration - timeLeft;

    let percentage =
        (completed / duration) * 100;

    document.getElementById(
        "progressFill"
    ).style.width = percentage + "%";

    document.getElementById(
        "progressPercent"
    ).textContent =
        Math.round(percentage) + "%";
}


/* CHANGE MODE */

function setMode(newMode) {

    pauseTimer();

    mode = newMode;

    const studyButton =
        document.getElementById("studyMode");

    const breakButton =
        document.getElementById("breakMode");


    if (mode === "study") {

        studyButton.classList.add("active");

        breakButton.classList.remove("active");

        document.getElementById(
            "modeTitle"
        ).textContent = "Study Time";

        timeLeft = studyDuration;

    } else {

        breakButton.classList.add("active");

        studyButton.classList.remove("active");

        document.getElementById(
            "modeTitle"
        ).textContent = "Screen Break";

        timeLeft = breakDuration;
    }

    updateDisplay();
}


/* START */

function startTimer() {

    if (running) {
        return;
    }

    running = true;

    timer = setInterval(function () {

        if (timeLeft > 0) {

            timeLeft--;

            updateDisplay();

        } else {

            timerCompleted();

        }

    }, 1000);
}


/* PAUSE */

function pauseTimer() {

    clearInterval(timer);

    running = false;
}


/* RESET */

function resetTimer() {

    pauseTimer();

    if (mode === "study") {

        timeLeft = studyDuration;

    } else {

        timeLeft = breakDuration;

    }

    updateDisplay();
}


/* CUSTOM TIME */

function setCustomTime() {

    let input =
        document.getElementById(
            "customMinutes"
        );

    let minutes = Number(input.value);


    if (
        !minutes ||
        minutes < 1 ||
        minutes > 180
    ) {

        alert(
            "Enter a value between 1 and 180 minutes."
        );

        return;
    }


    pauseTimer();

    if (mode === "study") {

        studyDuration =
            minutes * 60;

        timeLeft = studyDuration;

    } else {

        breakDuration =
            minutes * 60;

        timeLeft = breakDuration;

    }

    updateDisplay();

    input.value = "";
}


/* TIMER COMPLETE */

function timerCompleted() {

    pauseTimer();


    if (mode === "study") {

        sessions++;

        totalStudyMinutes +=
            Math.round(
                studyDuration / 60
            );


        document.getElementById(
            "sessions"
        ).textContent = sessions;


        document.getElementById(
            "studyMinutes"
        ).textContent =
            totalStudyMinutes;


        alert(
            "🎉 Study session completed!\n\nTime for a screen break."
        );


        setMode("break");


    } else {

        alert(
            "👀 Break completed!\n\nReady for another study session?"
        );

        setMode("study");

    }

}


/* INITIAL */

updateDisplay();
