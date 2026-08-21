let timerInterval;

function startTimer() {
  let timeRemaining = document.getElementById("minutesInput").value * 60;

  updateDisplay(timeRemaining);

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeRemaining--;

    updateDisplay(timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);

      alert("⏰Time's up!");
    }
  }, 1000);
}

function updateDisplay(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  document.getElementById(
    "countdownDisplay"
  ).textContent = `${minutes}:${seconds}`;
}