// Smooth scroll for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

const toggle = document.getElementById('toggle');
const toggleCircle = document.getElementById('toggle-circle');
const packageTitle = document.getElementById('package-title');
const packageSubtitle = document.getElementById('package-subtitle');
const featureList = document.getElementById('feature-list');
const checkoutBox = document.getElementById('checkout-box');

// Define features
const rm10Features = [
  { text: '5 PDF Kamus', included: true },
  { text: 'Group Access', included: false },
  { text: 'Weekly Coding Help', included: false },
  { text: 'Live Classes', included: false },
];

const rm25Features = [
  { text: '5 PDF Kamus', included: true },
  { text: 'Group Access', included: true },
  { text: 'Weekly Coding Help', included: true },
  { text: 'Live Classes', included: true },
  { text: 'Kesemua 3 Bonus', included: true }
];

let isFullAccess = false;

// Function to render features
function renderFeatures(features) {
  featureList.innerHTML = '';
  features.forEach(f => {
    const li = document.createElement('li');
    li.className = 'flex gap-3 items-center';

    if(f.included){
      li.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6 text-green-600 flex-shrink-0">
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.94a.75.75 0 1 0-1.22-.88l-3.48 4.8-1.64-1.64a.75.75 0 1 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.09l4.03-5.5Z" clip-rule="evenodd"/>
        </svg>
        ${f.text}
      `;
    } else {
      li.classList.add('opacity-50');
      li.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg"
             fill="currentColor"
             viewBox="0 0 24 24"
             class="w-6 h-6 text-red-600 flex-shrink-0">
          <path fill-rule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 1 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"/>
        </svg>
        ${f.text}
      `;
    }

    featureList.appendChild(li);
  });
}

// Initial render
renderFeatures(rm10Features);

// Toggle handler
toggle.addEventListener('click', () => {
  isFullAccess = !isFullAccess;
  toggleCircle.style.transform = isFullAccess ? 'translateX(32px)' : 'translateX(0)';
  if(isFullAccess){
    packageTitle.textContent = 'Full Access Group';
    packageSubtitle.textContent = 'RM25 (Valid selama 3 Bulan)';
    renderFeatures(rm25Features);
    checkoutBox.classList.add('border-green-400');
    checkoutBox.classList.remove('border-grey-200');
  } else {
    packageTitle.textContent = 'Notes Only';
    packageSubtitle.textContent = 'RM10 untuk 1 item';
    renderFeatures(rm10Features);
    checkoutBox.classList.add('border-grey-200');
    checkoutBox.classList.remove('border-green-400');
  }
});