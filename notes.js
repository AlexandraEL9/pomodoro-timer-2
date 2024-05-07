// Get references to the timer elements and set initial visibility
let pomodoro = document.getElementById("pomodoro-timer");
let short = document.getElementById("short-timer");
let long = document.getElementById("long-timer");
let currentTimer = null;

function showDefaultTimer() {
  // Show the default timer (pomodoro) and hide the others
  pomodoro.style.display = "block";
  short.style.display = "none";
  long.style.display = "none";
}

showDefaultTimer();

function hideAll() {
  // Hide all timer displays
  let timers = document.querySelectorAll(".timer-display");
  timers.forEach((timer) => (timer.style.display = "none"));
}

// Event listeners to switch between different timer modes
document.getElementById("pomodoro-session").addEventListener("click", function () {
  hideAll();
  pomodoro.style.display = "block";
  currentTimer = pomodoro;
});

document.getElementById("short-break").addEventListener("click", function () {
  hideAll();
  short.style.display = "block";
  currentTimer = short;
});

document.getElementById("long-break").addEventListener("click", function () {
  hideAll();
  long.style.display = "block";
  currentTimer = long;
});

// Timer functionality
let myInterval = null;

function startTimer(timerdisplay) {
  if (myInterval) {
    clearInterval(myInterval);
  }

  // Get timer duration from data-duration attribute and convert to milliseconds
  let timerDuration = timerdisplay.getAttribute("data-duration").split(":")[0];
  let durationinmiliseconds = timerDuration * 60 * 1000;
  let endTimestamp = Date.now() + durationinmiliseconds;

  // Interval to update timer display every second
  myInterval = setInterval(function () {
    const timeRemaining = new Date(endTimestamp - Date.now());

    // When timer reaches 0, stop the interval and play alarm sound
    if (timeRemaining <= 0) {
      clearInterval(myInterval);
      timerdisplay.textContent = "00:00";
      const alarm = new Audio(
        "https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav"
      );
      alarm.play();
    } else {
      // Format time remaining and update timer display
      const minutes = Math.floor(timeRemaining / 60000);
      const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
      const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      timerdisplay.textContent = formattedTime;
    }
  }, 1000);
}

// Event listener to start the timer
document.getElementById("start").addEventListener("click", function () {
  if (currentTimer) {
    // Start timer if a timer mode is selected and hide any timer message
    startTimer(currentTimer);
    document.getElementById("timer-message").style.display = "none";
  } else {
    // Show a message if no timer mode is selected
    document.getElementById("timer-message").style.display = "block";
  }
});

// Event listener to stop the timer
document.getElementById("stop").addEventListener("click", function () {
  if (currentTimer) {
    // Stop the timer if it's running
    clearInterval(myInterval);
  }
});

This code enables switching between 
different timer modes (pomodoro, short 
break, long break) and starts a 
countdown timer when the "Start" 
button is clicked. 

It updates the timer 
display every second and plays an 
alarm sound when the timer reaches 
zero. 

The "Stop" button allows users to halt 
the timer if needed.