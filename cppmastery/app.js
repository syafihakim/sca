const copyBtn = document.getElementById('copyAccBtn');

// Smooth scroll for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

function updateBreakdown() {
  const value = document.querySelector('input[name="package"]:checked').value;

  document.getElementById("breakdown-1").classList.toggle("hidden", value !== "onemonth");
  document.getElementById("breakdown-2").classList.toggle("hidden", value !== "threemonths");
}


function copyAccount() {
  copyBtn.addEventListener('click', () => {
    const accNumber = "39501212556";
    navigator.clipboard.writeText(accNumber).then(() => {
      copyBtn.textContent = "Copied!";
      fallbackCopy(accNumber);
      setTimeout(() => {
        copyBtn.textContent = "Copy";
      }, 2000);
    }).catch((error) => {
      copyBtn.textContent = "Failed.. Copy Manual Je";
      console.log(error);
      fallbackCopy(accNumber);
    });
  });
}


function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed"; // avoid scroll
  textarea.style.opacity = 0;
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const successful = document.execCommand("copy");
    if (successful) alert("Copied to clipboard!");
    else alert("Unable to copy. Please copy manually.");
  } catch (err) {
    alert("Unable to copy. Please copy manually.");
  }

  document.body.removeChild(textarea);
}

function updatePrice() {
    const pkg = document.querySelector('input[name="package"]:checked').value
    document.getElementById("priceDisplay").innerText =
        pkg === "onemonth" ? "RM25" : "RM40"
}

function updatePaymentDetails() {
    const method = document.querySelector('input[name="paymethod"]:checked').value
    document.getElementById("qrSection").classList.toggle("hidden", method !== "qr")
    document.getElementById("bankSection").classList.toggle("hidden", method !== "bank")
}

function toggleCard(btn) {
  const content = btn.nextElementSibling;
  content.classList.toggle('hidden');
  btn.querySelector('span:last-child').textContent = content.classList.contains('hidden') ? '+' : '−';
}

// Function to handle selection highlight
function highlightSelected(groupName) {
  const radios = document.querySelectorAll(`input[name="${groupName}"]`);
  radios.forEach(radio => {
    const label = radio.closest("label");
    if (radio.checked) {
      label.classList.add("from-yellow-300", "to-yellow-400");
      label.classList.remove("from-yellow-200", "to-yellow-300");
    } else {
      label.classList.remove("from-yellow-300", "to-yellow-400");
      label.classList.add("from-yellow-200", "to-yellow-300");
    }
  });
}

let currentStep = 1;
const totalSteps = document.querySelectorAll('.step').length;

function showStep(step) {
  document.querySelectorAll('.step').forEach((el, idx) => {
    el.classList.toggle('hidden', idx !== step-1);
  });

  document.getElementById('prevBtn').disabled = step === 1;
  document.getElementById('nextBtn').textContent = step === totalSteps ? 'Finish' : 'Next';
}

function changeStep(delta) {
  currentStep = Math.min(totalSteps, Math.max(1, currentStep + delta));
  showStep(currentStep);
}

function startCountdown(targetDate) {
    const endTime = new Date(targetDate).getTime();

    function updateTimer() {
        const now = Date.now();
        const diff = endTime - now;

        if (diff <= 0) {
            document.getElementById("countdown-days").textContent = "00";
            document.getElementById("countdown-hours").textContent = "00";
            document.getElementById("countdown-minutes").textContent = "00";
            document.getElementById("countdown-seconds").textContent = "00";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("countdown-days").textContent = String(days).padStart(2, "0");
        document.getElementById("countdown-hours").textContent = String(hours).padStart(2, "0");
        document.getElementById("countdown-minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("countdown-seconds").textContent = String(seconds).padStart(2, "0");
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// Set target date to 10 December of this year
startCountdown("December 10, 2025 23:59:59");


// Initial display
showStep(currentStep);