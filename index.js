function startCountdown() {
  status = "running";
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

    // Find the distance between now and the count down date
    let distance = countdownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    console.log(
      `Time left: ${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    );

    // Display the result in the element
    document.querySelector(
      ".display > h1"
    ).innerHTML = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.querySelector(".display > h1").innerHTML = "EXPIRED";
    }
  }, 1000);
}

function pauseCountdown() {}

function stopCountdown() {}

function resetCountdown() {}

let status = "stopped";

function isRunning() {
  return status == "running" ? true : false;
}

const start = document.querySelector(".start > button");
start.addEventListener("click", () => {
  if (!isRunning()) {
    startCountdown();
  }
});
const pause = document.querySelector(".pause > button");
start.addEventListener("click", () => {
  pauseCountdown();
});
const stop = document.querySelector(".stop > button");
start.addEventListener("click", () => {
  stopCountdown();
});
const reset = document.querySelector(".reset > button");
start.addEventListener("click", () => {
  resetCountdown();
});
