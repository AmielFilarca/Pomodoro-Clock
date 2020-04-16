let timerStatus = null;
let timerInterval = null;

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
  let sessionDuration = document
    .querySelector("body > div.timer > div:nth-child(3) > div > h1")
    .textContent.slice(0, 2);
  console.log(`Session duration: ${sessionDuration}`);
  let endTime = new Date(
    currentDate.setMinutes(currentDate.getMinutes() + parseInt(sessionDuration))
  );
  endTime = new Date(
    endTime.setSeconds(
      currentDate.getSeconds() +
        parseInt(
          document
            .querySelector("body > div.timer > div:nth-child(3) > div > h1")
            .textContent.slice(3, 5)
        )
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
      document.querySelector(".display > h1").innerHTML = "EXPIRED";
    }
  }, 1000);
}

const pause = document.querySelector(".pause > button");
pause.addEventListener("click", () => {
  pauseTimer();
});

function pauseTimer() {
  timerStatus = "paused";
  clearInterval(timerInterval);
}

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
