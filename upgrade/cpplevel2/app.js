final_price = 75;
couponRedeemed = false;

paymentSection = `
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Cara pembayaran</h2>

      <!-- Total badge -->
      <div class="final-total-price-text inline-block bg-yellow-600 text-white font-semibold px-4 py-2 rounded-full mb-6">
        Total: RM75
      </div>


      <!-- Payment mode tabs -->
      <div id="paymentModes" class="mb-6">
        <nav class="flex space-x-4 border-b border-gray-300 mb-4">
          <button class="payment-tab border-b-4 border-orange-500 text-orange-600 py-2 px-4 font-semibold" data-mode="qr">
            QR Code
          </button>
          <button class="payment-tab text-gray-600 py-2 px-4 hover:text-orange-600" data-mode="bank">
            Bank Transfer
          </button>
          <button class="payment-tab text-gray-600 py-2 px-4 hover:text-orange-600" data-mode="tng">
            TnG QR Code
          </button>
        </nav>

        <!-- Payment details -->
        <div id="qr" class="payment-content">
          <img src="maybank_qr.jpg" alt="QR Code" 
               class="mx-auto max-w-full max-h-64 rounded-lg shadow-md object-contain" />
          <div class="text-center mt-2">
            <div class="mt-2 flex items-center justify-center space-x-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900">
              <span>Ambil screenshot atau <a href="/assets/images/maybank_qr.jpg" download class = "text-blue-700 underline">download QR</a></span>
            </div>
          </div>
        </div>

        <div id="bank" class="payment-content hidden text-gray-700 space-y-2">
          <p><span class="font-semibold">Bank:</span> Maybank</p>
          <p><span class="font-semibold">Nama Pemegang Akaun:</span> Syafi Hakim</p>
          <p class="flex items-center space-x-2">
            <span><span class="font-semibold">No Akaun:</span> 1062 0305 8090</span>
            <button id="copyAccBtn" 
                    class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs shadow-sm"
                    title="Copy account number">
              Copy
            </button>
          </p>
        </div>

        <div id="tng" class="payment-content hidden">
          <img src="tng.jpg" alt="Touch 'n Go QR Code" 
               class="mx-auto max-w-full rounded-lg shadow-md object-contain" />
          <div class="text-center mt-2">
            <div class="mt-2 flex items-center justify-center space-x-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900">
              <span>Ambil screenshot atau <a href="/assets/images/tng.jpg" download class = "text-blue-700 underline">download QR</a></span>
            </div>
            </a>
          </div>
        </div>
      </div>

      <p class="text-sm text-gray-600">
        Whatsapp resit pembayaran ke <span class="font-semibold">010-5820083</span>. Saya akan reply sebelum pukul 5 petang (sebarang pertanyaan Whatsapp je)
      </p>`

async function loadTopics() {
  try {
    let totalPrice = 0;
    const response = await fetch("topics.json"); // load JSON file
    const topics = await response.json();

    const container = document.getElementById("topics-container");
    const elTableBody = document.getElementById("price-summary-tbody");

    topics.forEach(topic => {
      // Create card
      const card = document.createElement("div");
      card.className = "bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between";

      // Title
      const title = document.createElement("h3");
      title.className = "text-lg font-bold text-indigo-700 mb-2";
      title.textContent = topic.title;
      card.appendChild(title);

      // Subtopics list
      const ul = document.createElement("ul");
      ul.className = "divide-y divide-gray-200 border-gray-200 flex-grow";

      topic.subtopics.forEach(sub => {
        const li = document.createElement("li");
        li.className = "flex items-center text-xs text-gray-700 py-2 gap-2";
        li.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-red-700">
                          <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm-.847-9.766A.75.75 0 0 0 6 5.866v4.268a.75.75 0 0 0 1.153.633l3.353-2.134a.75.75 0 0 0 0-1.266L7.153 5.234Z" clip-rule="evenodd" />
                        </svg>
                        ${sub}
                        `;
        ul.appendChild(li);
      });

      const items = ["Kamus", "Video Panduan", "Latihan", "Skema Jawapan"];

      items.forEach(label => {
        const li = document.createElement("li");
        li.className = "flex items-center text-xs text-gray-700 py-2 gap-2";

        // Inline SVG
        li.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" 
               fill="currentColor" class="size-4 text-green-700">
            <path fill-rule="evenodd" 
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" 
                  clip-rule="evenodd" />
          </svg>
          ${label}
        `;

        ul.appendChild(li);
      });

      card.appendChild(ul);

      // ✅ Fixed "Included Materials" list
      // const extraList = document.createElement("ul");
      // extraList.className = "mt-4 space-y-2";

      //   extraList.appendChild(li);
      // });

      // card.appendChild(extraList);

      // Footer (badge at bottom left)
      const footer = document.createElement("div");
      footer.className = "mt-4";

      const badge = document.createElement("span");
      badge.className =
        "bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm";
      badge.textContent = `Nilai Sebenar: RM${topic.price}`;

      footer.appendChild(badge);
      card.appendChild(footer);

      container.appendChild(card);
      totalPrice += topic.price;

    });

  } catch (err) {
    console.error("Error loading topics.json:", err);
  }
}

async function loadPriceSummary() {
  const elTableBody = document.getElementById("price-summary-tbody");
  let actualTotalPrice = 0;
  let totalPrice = 0;

  try {
    const response = await fetch("price_summary.json"); // load JSON file
    const prices = await response.json();

    prices.forEach(price => {
      // Create <tr>
      const tr = document.createElement("tr");
      tr.className = "border-b";

      // Left column (title)
      const tdTitle = document.createElement("td");
      tdTitle.className = "py-2 font-semibold text-left align-top";
      tdTitle.textContent = price.title;

      // Right column (prices)
      const tdPrice = document.createElement("td");
      tdPrice.className = "py-2 text-right align-top";

      const original = document.createElement("div");
      original.className = "text-gray-500 line-through";
      original.textContent = `RM ${price.actual_price}`;

      const discounted = document.createElement("div");
      discounted.className = "text-green-600 font-bold";
      discounted.textContent = `RM ${price.price}`;

      tdPrice.appendChild(original);
      tdPrice.appendChild(discounted);

      // Append td’s to row
      tr.appendChild(tdTitle);
      //tr.appendChild(tdPrice);

      // Append row to table
      elTableBody.appendChild(tr);
      actualTotalPrice += price.actual_price;
      totalPrice += price.price;
    });

    document.getElementById("actual-total-price").textContent = `RM ${actualTotalPrice}`;
    document.getElementById("total-price").textContent = `RM ${totalPrice}`;

    // Select all elements with the class "total-price"
    const totalPriceElements = document.querySelectorAll(".total-price");
    elTableTotalPriceBody = document.getElementById("totalprice-summary-tbody");

    loadPrices(elTableTotalPriceBody, totalPrice, 75)

    const totalPriceEls = document.querySelectorAll(".final-total-price-text");

    totalPriceEls.forEach(el => {
      el.textContent = `RM 75`
    });

    // Loop through them (NodeList behaves like an array)
    totalPriceElements.forEach(el => {
      el.textContent = `RM ${totalPrice}`; 
    });

  } catch (err) {
     console.error("Error loading price summary:", err);
  }

  
}

function loadPrices(tableBodyEl, actualTotalPrice, price) {
  const prices = [
    { title: "Subtotal", value: actualTotalPrice },
    { title: "Early Access Discount", value: actualTotalPrice - price }
  ];

  prices.forEach((price, index) => {
    const tr = document.createElement("tr");

    // Left column (title)
    const tdTitle = document.createElement("td");
    tdTitle.className =
      (index === 0 ? "pt-4 " : "") +
      (index === prices.length - 1 ? "pb-4 " : "") +
      "font-semibold text-left align-top";
    tdTitle.textContent = price.title;

    // Right column (price)
    const tdPrice = document.createElement("td");
    tdPrice.className =
      (index === 0 ? "pt-4 " : "") +
      (index === prices.length - 1 ? "pb-4 " : "") +
      "text-right align-top";

    if (price.title === "Early Access Discount") {
      // Calculate discount %
      const discountPercent = Math.round(
        (price.value / actualTotalPrice) * 100
      );

      tdPrice.innerHTML = `
        <div class="flex justify-end items-center gap-2">
          <span class="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">
            ${discountPercent}% OFF
          </span>
          <span>-RM ${price.value}</span>
        </div>
      `;
    } else {
      tdPrice.textContent = `RM ${price.value}`;
    }

    tr.appendChild(tdTitle);
    tr.appendChild(tdPrice);
    tableBodyEl.appendChild(tr);
  });
}

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

const sheetId = "1o_PVByfyy3NNcHfUMK2obi1jquivOHr6PZjvouksqRk";
const apiKey = "AIzaSyBU8TMPP0ZUxS_979y6cYdNOU6SfdfBXYc";
const range = "Level2Promo!A2:G10"; // adjust if needed
const promoCodeFromUrl = new URLSearchParams(window.location.search).get("promo");

async function fetchCouponData(inputCode) {
  try {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
    );
    const data = await res.json();
    if (!data.values || !data.values[0]) throw new Error("No data found");

    const now = new Date();
    let found = null;

    for (let i = 0; i < data.values.length; i++) {
      const row = data.values[i];
      if (!row || !row[0]) continue;

      const promoCodeFromDB = row[1].trim();
      const discountAmount = parseFloat(row[2]); // assuming B3 = discount value

      if (promoCodeFromDB === inputCode) {
        found = { code: promoCodeFromDB, discount: discountAmount };
        break;
      }
    }

    return found;
  } catch (err) {
    console.error("Error fetching promo data:", err);
    return null;
  }
}

async function addCouponHandler() {
  document.getElementById("apply-coupon").addEventListener("click", async () => {
    const input = document.getElementById("coupon-input").value.trim();
    const msgEl = document.getElementById("coupon-message");

    const coupon = await fetchCouponData(input);

    if (!coupon) {
      msgEl.textContent = "❌ Kupon tidak sah atau tamat tempoh.";
      msgEl.className = "text-xs mt-2 text-red-600";
      return;
    }

    if (couponRedeemed) return;

    couponRedeemed = true;

    msgEl.textContent = `🎉 Kupon berjaya digunakan! Diskaun RM${coupon.discount}`;
    msgEl.className = "text-xs mt-2 text-green-600";

    // Insert coupon discount row into summary table
    const tbody = document.getElementById("totalprice-summary-tbody");

    const tr = document.createElement("tr");
    const tdTitle = document.createElement("td");
    tdTitle.className = "pb-4 font-semibold text-left align-top";
    tdTitle.textContent = "Coupon Discount";

    const tdPrice = document.createElement("td");
    tdPrice.className = "pb-4 text-right align-top";
    tdPrice.innerHTML = `<span class="text-red-600">-RM ${coupon.discount}</span>`;

    tr.appendChild(tdTitle);
    tr.appendChild(tdPrice);
    tbody.appendChild(tr);

    // Update total price
    
    let currentPrice = 75;
    let newPrice = currentPrice - coupon.discount;
    if (newPrice < 0) newPrice = 0;

    final_price = newPrice;

    const totalPriceEls = document.querySelectorAll(".final-total-price-text");

    totalPriceEls.forEach(el => {
      el.textContent = `RM ${newPrice}`
    });
  });
}

// Target date/time (local time)
function startCountdown() {
  let countDownIntervalId = null;

  const targetDate = new Date("September 4, 2025 21:00:00").getTime();

  const payDiv = document.getElementById("pay");
  const checkoutWrapper = document.getElementById("checkout-pay-button");
  const banner = document.getElementById("countdown-banner");
  const timerEl = document.getElementById("banner-timer");

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      // Countdown finished → show real content
      payDiv.innerHTML = paymentSection;

      // Restore active checkout button
      checkoutWrapper.innerHTML = `
        <a href="#pay" class="pulse-border bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow transition duration-300 hover:shadow-lg hover:-translate-y-0.5 flex justify-center items-center">
          Buat bayaran
        </a>
        <p class="text-xs text-gray-400 mt-2">Bayar melalui QR/Bank transfer/TnG</p>
      `;

      const totalPriceEls = document.querySelectorAll(".final-total-price-text");

      totalPriceEls.forEach(el => {
        el.textContent = `RM ${final_price}`;
      });

      banner.style.display = "none";
      paymentTabsHandler();

      clearInterval(countDownIntervalId);

      return;
    }

    // Calculate countdown
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update pay box
    payDiv.innerHTML = `
      <div class="bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-xl p-6 text-center font-semibold">
        ⏳ Pendaftaran Akan Dibuka Dalam 
        <span class="font-bold">${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}</span>
      </div>
    `;

    // Replace checkout button with disabled state
    checkoutWrapper.innerHTML = `
      <div class="bg-gray-400 text-xs text-white px-6 py-3 rounded-lg shadow flex flex-col items-center text-center cursor-not-allowed">
        <div>⏳ Pendaftaran Akan Dibuka Dalam</div>
        <div class="font-bold mt-1">
          ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}
        </div>
      </div>

    `;

    timerEl.textContent = 
          `${hours.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
  }

  // Start immediately and update every second
  updateTimer();
  countDownIntervalId = setInterval(updateTimer, 1000);
}



loadTopics();
loadPriceSummary();
paymentTabsHandler();
addCouponHandler();
startCountdown();
