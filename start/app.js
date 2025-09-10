// ==================== Handle Payment Details ==================== //
function paymentTabsHandler() {
  const tabs = document.querySelectorAll('.payment-tab');
  const contents = document.querySelectorAll('.payment-content');
  const copyBtn = document.getElementById('copyAccBtn');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active styles from all tabs
      tabs.forEach(t => {
        t.classList.remove('border-orange-500', 'text-orange-600', 'font-semibold');
        t.classList.add('text-gray-600');
      });

      // Hide all content
      contents.forEach(c => c.classList.add('hidden'));

      // Activate clicked tab
      tab.classList.add('border-orange-500', 'text-orange-600', 'font-semibold');
      tab.classList.remove('text-gray-600');

      // Show corresponding content
      const mode = tab.getAttribute('data-mode');
      document.getElementById(mode).classList.remove('hidden');
    });
  });

  if(copyBtn) {
    copyBtn.addEventListener('click', () => {
      const accNumber = "1062 0305 8090";
      navigator.clipboard.writeText(accNumber).then(() => {
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.textContent = "Copy";
        }, 2000);
      }).catch(() => {
        alert("Gagal copy nombor akaun. Sila copy secara manual.");
      });
    });
  }

}

function handleFinalTotalPriceText(price) {
  const finalTotalPricesEl = document.querySelectorAll(".final-total-price-text");

  finalTotalPricesEl.forEach(el => {
      el.textContent = `RM ${price}`
    });

}

// ==================== PROMO LOGIC ==================== //
function getPromoDetails() {
  // Replace with DB/API/condition checks later
  const hasPromo = true;      // toggle promo
  const promoPrice = 15;      // promo price
  const promoDuration = 300;  // duration in seconds

  return hasPromo ? { promoPrice, promoDuration } : null;
}

function applyPromo(originalPricesEl, promoPricesEl, price) {
    originalPricesEl.forEach(el => {
      el.classList.add("line-through", "text-gray-400", "mr-1", "text-lg");
      el.classList.remove("text-red-600","text-5xl", "ml-2", "font-extrabold");
    });

    promoPricesEl.forEach(el => {
      el.textContent = `RM${price}`;
      el.classList.remove("hidden");
    });

    handleFinalTotalPriceText(price);
}

// ==================== FLASH SALE ==================== //
function startFlashSale(promo) {
  const flashSaleEl = document.getElementById("flash-sale");
  const countdownEl = document.getElementById("countdown");
  const countdownBarEl = document.getElementById("countdown-bar");
  const originalPricesEl = document.querySelectorAll(".original-price");
  const promoPricesEl = document.querySelectorAll(".promo-price");

  flashSaleEl.classList.remove("hidden");
  applyPromo(originalPricesEl, promoPricesEl, promo.promoPrice);

  let timeLeft = promo.promoDuration;

  function updateCountdown() {
    if (timeLeft <= 0) {
      countdownEl.textContent = "Promo Tamat!";
      countdownBarEl.style.width = "0%";
      return;
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Format as MM:SS
    const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    countdownEl.textContent = formatted;

    countdownBarEl.style.width = `${(timeLeft / promo.promoDuration) * 100}%`;
    timeLeft--;

    setTimeout(updateCountdown, 1000);
  }


  updateCountdown();
}

// ==================== NAVIGATION ==================== //
function showOTO() {
  const mainSection = document.getElementById("main-section");
  const otoSection = document.getElementById("oto");

  mainSection.classList.add("hidden");
  otoSection.classList.remove("hidden");
  otoSection.scrollIntoView({ behavior: "smooth" });
}

function skipOffer() {
  const mainSection = document.getElementById("main-section");
  const otoSection = document.getElementById("oto");

  otoSection.classList.add("hidden");
  mainSection.classList.remove("hidden");
  mainSection.scrollIntoView({ behavior: "smooth" });
}

function takeOffer() {
  alert("✅ You chose to JOIN Level 1! Redirecting to payment...");
  // window.location.href = "/payment"; // Replace with real payment page
}

function downloadLeadMagnet() {
  alert("📥 Downloading your Free Lead Magnet...");
  // window.location.href = "/path-to-lead-magnet.pdf";
}

function goToPayment() {
  alert("💳 Redirecting to payment page...");
  // window.location.href = "/payment";
}

// ==================== UI HELPERS ==================== //
function addSVGs() {
  const tickSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" 
         class="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5 mr-2" 
         fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  `;

  const fireSVG = `
    <div class="fire-icon mr-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 255" preserveAspectRatio="xMidYMid">
        <defs>
          <linearGradient id="linear-gradient-1" x1="94.141" y1="255" x2="94.141" y2="0.188" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#ff4c0d"/>
            <stop offset="1" stop-color="#fc9502"/>
          </linearGradient>
        </defs>
        <g id="fire">
          <path d="M187.899,164.809 C185.803,214.868 144.574,254.812 94.000,254.812 C42.085,254.812 -0.000,211.312 -0.000,160.812 C-0.000,154.062 -0.121,140.572 10.000,117.812 C16.057,104.191 19.856,95.634 22.000,87.812 C23.178,83.513 25.469,76.683 32.000,87.812 C35.851,94.374 36.000,103.812 36.000,103.812 C36.000,103.812 50.328,92.817 60.000,71.812 C74.179,41.019 62.866,22.612 59.000,9.812 C57.662,5.384 56.822,-2.574 66.000,0.812 C75.352,4.263 100.076,21.570 113.000,39.812 C131.445,65.847 138.000,90.812 138.000,90.812 C138.000,90.812 143.906,83.482 146.000,75.812 C148.365,67.151 148.400,58.573 155.999,67.813 C163.226,76.600 173.959,93.113 180.000,108.812 C190.969,137.321 187.899,164.809 187.899,164.809 Z" fill="url(#linear-gradient-1)"/>
          <path d="M94.000,254.812 C58.101,254.812 29.000,225.711 29.000,189.812 C29.000,168.151 37.729,155.000 55.896,137.166 C67.528,125.747 78.415,111.722 83.042,102.172 C83.953,100.292 86.026,90.495 94.019,101.966 C98.212,107.982 104.785,118.681 109.000,127.812 C116.266,143.555 118.000,158.812 118.000,158.812 C118.000,158.812 125.121,154.616 130.000,143.812 C131.573,140.330 134.753,127.148 143.643,140.328 C150.166,150.000 159.127,167.390 159.000,189.812 C159.000,225.711 129.898,254.812 94.000,254.812 Z" fill="#fc9502"/>
          <path d="M95.000,183.812 C104.250,183.812 104.250,200.941 116.000,223.812 C123.824,239.041 112.121,254.812 95.000,254.812 C77.879,254.812 69.000,240.933 69.000,223.812 C69.000,206.692 85.750,183.812 95.000,183.812 Z" fill="#fce202"/>
        </g>
      </svg>
    </div>

  `;

  document.querySelectorAll(".feature").forEach(el => {
    el.classList.add("flex", "items-start");
    el.innerHTML = tickSVG + el.innerHTML;
  });

  document.querySelectorAll(".feature-plus").forEach(el => {
    el.classList.add("flex", "items-start");
    el.innerHTML = fireSVG + el.innerHTML;
  });


}

// ==================== INIT ==================== //
document.addEventListener("DOMContentLoaded", () => {
  // Add handlers to payment tab
  paymentTabsHandler();

  // Apply promo logic for OTO section
  const promo = getPromoDetails();
  if (promo) {
    startFlashSale(promo);
  }

  // Add ticks to feature lists
  addSVGs();

  // Attach button actions (if not inline in HTML)
  const classCard = document.getElementById("class-card");
  const downloadCard = document.getElementById("download-card");

  if (classCard) classCard.addEventListener("click", showOTO);
  if (downloadCard) downloadCard.addEventListener("click", downloadLeadMagnet);
});
