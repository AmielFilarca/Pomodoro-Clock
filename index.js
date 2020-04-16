let timerStatus = null;
let timerInterval = null;
const sessionDuration = document.querySelector("#session-duration");
const breakDuration = document.querySelector("#break-duration");
const timerDisplay = document.querySelector("#timer-display");
const startButton = document.querySelector("#start-button");
const pauseButton = document.querySelector("#pause-button");
const stopButton = document.querySelector("#stop-button");
const resetButton = document.querySelector("#reset-button");
const increaseSessionDurationButton = document.querySelector(
  "#increase-session-duration"
);
const decreaseSessionDurationButton = document.querySelector(
  "#decrease-session-duration"
);
const increaseBreakDurationButton = document.querySelector(
  "#increase-break-duration"
);
const decreaseBreakDurationButton = document.querySelector(
  "#decrease-break-duration"
);

function isRunning() {
  return timerStatus == "running" ? true : false;
}

function isPaused() {
  return timerStatus == "paused" ? true : false;
}

function isStopped() {
  return timerStatus == "stopped" ? true : false;
}

startButton.addEventListener("click", () => {
  if (!isRunning()) {
    startTimer();
  }
});

function startTimer() {
  console.log("Starting timer..");
  timerStatus = "running";

  // Set the date we're counting down to
  let currentDate = new Date();
  console.log(`Current time: ${currentDate.toLocaleTimeString()}`);
  let minuteTimer = timerDisplay.textContent.slice(0, 2);
  console.log(`Session duration: ${minuteTimer}`);
  let endTime = new Date(
    currentDate.setMinutes(currentDate.getMinutes() + parseInt(minuteTimer))
  );
  endTime = new Date(
    endTime.setSeconds(
      currentDate.getSeconds() + parseInt(timerDisplay.textContent.slice(3, 5))
    )
  );
  console.log(`Timer ends on: ${endTime.toLocaleTimeString()}`);

  // Update the timer every 1 second
  timerInterval = setInterval(function () {
    // Get today's date and time
    let currentTime = new Date().getTime();

    // Find the remaining time between now and the timer date
    let remainingTime = endTime - currentTime;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    if (Math.floor(seconds % 15 == 0)) {
      console.log(
        `Time left: ${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }

    // Display the result in the element
    document.querySelector(
      ".display > h1"
    ).innerHTML = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    // If the timer is finished, write some text
    if (remainingTime < 0) {
      clearInterval(x);
      timerDisplay.textContent = "EXPIRED";
    }
  }, 1);
}

pauseButton.addEventListener("click", () => {
  pauseTimer();
});

function pauseTimer() {
  if (isRunning() && !isPaused()) {
    console.log("Pausing timer..");
    timerStatus = "paused";
    clearInterval(timerInterval);
  } else if (isPaused()) {
    console.log("Timer is already paused.");
  }
}

stopButton.addEventListener("click", () => {
  stopTimer();
});

function stopTimer() {
  if (!isStopped()) {
    console.log("Stopping timer..");
    timerStatus = "stopped";
    clearInterval(timerInterval);
    timerDisplay.textContent = `${sessionDuration.textContent}:00`;
  } else if (isStopped()) {
    console.log("Timer is already stopped.");
  }
}

resetButton.addEventListener("click", () => {
  resetTimer();
});

function resetTimer() {
  console.log("Resetting timer..");
  clearInterval(timerInterval);
  timerStatus = null;
  sessionDuration.textContent = "25";
  breakDuration.textContent = "5";
  timerDisplay.textContent = `${sessionDuration.textContent}:00`;
}

increaseSessionDurationButton.addEventListener("click", () => {
  if (sessionDuration.textContent < 60) {
    sessionDuration.textContent++;
  }
  if (isStopped()) {
    timerDisplay.textContent = `${sessionDuration.textContent}:00`;
  }
});
decreaseSessionDurationButton.addEventListener("click", () => {
  if (sessionDuration.textContent > 1) {
    sessionDuration.textContent--;
  }
  if (isStopped()) {
    timerDisplay.textContent = `${sessionDuration.textContent}:00`;
  }
});
increaseBreakDurationButton.addEventListener("click", () => {
  if (breakDuration.textContent < 60) {
    breakDuration.textContent++;
  }
});
decreaseBreakDurationButton.addEventListener("click", () => {
  if (breakDuration.textContent > 1) {
    breakDuration.textContent--;
  }
});

// * On page load
timerDisplay.textContent = `${sessionDuration.textContent}:00`;
