let interval;
let totalSeconds = 0;
let paused = false;

function formatTime(seconds) {
  let d = Math.floor(seconds / 86400);
  let h = Math.floor((seconds % 86400) / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = seconds % 60;

  let parts = [];

  const inputs = {
    days: document.getElementById("days").value,
    hours: document.getElementById("hours").value,
    minutes: document.getElementById("minutes").value,
    seconds: document.getElementById("seconds").value
  };

  if (inputs.days || d > 0) parts.push(String(d).padStart(2, "0"));
  if (inputs.hours || h > 0 || parts.length > 0) parts.push(String(h).padStart(2, "0"));
  if (inputs.minutes || m > 0 || parts.length > 0) parts.push(String(m).padStart(2, "0"));
  parts.push(String(s).padStart(2, "0"));

  return parts.join(":");
}

function updateDisplay() {
  const timer = document.getElementById("timer");
  timer.textContent = formatTime(totalSeconds);
}

function startTimer() {
  clearInterval(interval);
  paused = false;

  const d = parseInt(document.getElementById("days").value) || 0;
  const h = parseInt(document.getElementById("hours").value) || 0;
  const m = parseInt(document.getElementById("minutes").value) || 0;
  const s = parseInt(document.getElementById("seconds").value) || 0;

  totalSeconds = d * 86400 + h * 3600 + m * 60 + s;

  if (totalSeconds <= 0) return;

  document.getElementById("endMessage").classList.add("hidden");

  updateDisplay();

  interval = setInterval(() => {
    if (!paused && totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();

      if (totalSeconds === 0) {
        clearInterval(interval);
        document.getElementById("endMessage").classList.remove("hidden");
      }
    }
  }, 1000);
}

function pauseTimer() {
  paused = !paused;
}

function stopTimer() {
  clearInterval(interval);
  totalSeconds = 0;
  updateDisplay();
  document.getElementById("endMessage").classList.add("hidden");
}
