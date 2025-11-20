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

function updatePrice() {
    const pkg = document.querySelector('input[name="package"]:checked').value
    document.getElementById("priceDisplay").innerText =
        pkg === "full" ? "RM39" : "RM10"
}

function updatePaymentDetails() {
    const method = document.querySelector('input[name="paymethod"]:checked').value
    document.getElementById("qrSection").classList.toggle("hidden", method !== "qr")
    document.getElementById("bankSection").classList.toggle("hidden", method !== "bank")
}

function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector(".faq-icon");

    content.classList.toggle("hidden");

    // Toggle + / -
    if (content.classList.contains("hidden")) {
        icon.textContent = "+";
    } else {
        icon.textContent = "–";
    }
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


// Attach event listeners
document.querySelectorAll('input[name="package"]').forEach(radio => {
  radio.addEventListener("change", () => highlightSelected("package"));
});

document.querySelectorAll('input[name="paymethod"]').forEach(radio => {
  radio.addEventListener("change", () => highlightSelected("paymethod"));
});

// Initial highlight on page load
highlightSelected("package");
highlightSelected("paymethod");

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