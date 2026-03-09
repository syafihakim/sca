const sessions = [
    {
      date: new Date("March 9, 2026 22:15:00 GMT+08:00"),
      label: "Isnin, 9 Mac 2026"
    }
  ];

function getNextSession() {
  const now = new Date();
  for (let i = 0; i < sessions.length; i++) {
    if (now < sessions[i].date) {
      return sessions[i];
    }
  }
  return sessions[sessions.length - 1];
}


function toggleDetails(){

  const details = document.getElementById("details");
  const arrow = document.getElementById("arrow");

  details.classList.toggle("open");
  arrow.classList.toggle("rotate");

}

function trackCheckout() {
  fbq('track', 'InitiateCheckout');
}

function updateCountdown() {
  const now = new Date().getTime();
  const nextSession = getNextSession();
  const target = nextSession.date.getTime();
  const distance = target - now;

  // Update visible date
  document.getElementById("session-date").innerText = nextSession.label;

  if (distance <= 0) return;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").innerText = days.toString().padStart(2,"0");
  document.getElementById("hours").innerText = hours.toString().padStart(2,"0");
  document.getElementById("minutes").innerText = minutes.toString().padStart(2,"0");
  document.getElementById("seconds").innerText = seconds.toString().padStart(2,"0");
}


setInterval(updateCountdown, 1000);
