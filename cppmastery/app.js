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

// Initial display
showStep(currentStep);