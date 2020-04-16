let timerStatus = null;

function isRunning() {
  return timerStatus == "running" ? true : false;
}

function isPaused() {
  return timerStatus == "paused" ? true : false;
}

function isStopped() {
  return timerStatus == "stopped" ? true : false;
}

const start = document.querySelector(".start > button");
start.addEventListener("click", () => {
  if (!isRunning()) {
    startTimer();
  }
});

function startTimer() {
  timerStatus = "running";

  // Set the date we're counting down to
  let currentDate = new Date();
  console.log(`Current time: ${currentDate.toLocaleTimeString()}`);
  let sessionDuration = document.querySelector(".session > span").innerHTML;
  console.log(`Session duration: ${sessionDuration}`);
  let countdownDate = new Date(
    currentDate.setMinutes(currentDate.getMinutes() + parseInt(sessionDuration))
  );
  console.log(`Counting down to: ${countdownDate.toLocaleTimeString()}`);

  // Update the count down every 1 second
  let x = setInterval(function () {
    // Get today's date and time
    let now = new Date().getTime();

    // Find the remaining time between now and the count down date
    let remainingTime = countdownDate - now;

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

    // If the count down is finished, write some text
    if (remainingTime < 0) {
      clearInterval(x);
      document.querySelector(".display > h1").innerHTML = "EXPIRED";
    }
  }, 1000);
}

const pause = document.querySelector(".pause > button");
pause.addEventListener("click", () => {
  pauseTimer();
});

function pauseTimer() {}

const stop = document.querySelector(".stop > button");
stop.addEventListener("click", () => {
  stopTimer();
});

function stopTimer() {}

const reset = document.querySelector(".reset > button");
reset.addEventListener("click", () => {
  resetTimer();
});

function resetTimer() {}
