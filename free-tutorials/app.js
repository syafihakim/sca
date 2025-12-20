document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.step-circle'); // the circle span
  const contents = document.querySelectorAll('.step-content');

  steps.forEach(el => {
    el.addEventListener("click", () => {
      goToStep(el.dataset.step);
    });
  });
});

// Select all videos on the page
const videos = document.querySelectorAll("video");

// Function to pause all videos
function pauseAllVideos() {
  videos.forEach(video => {
    video.pause();
  });
}

// Optional: Example usage
// Call pauseAllVideos() whenever you want to pause all videos
// For example, pause when a step changes in your stepper:
document.querySelectorAll("[data-step]").forEach(step => {
  step.addEventListener("click", () => {
    pauseAllVideos();
  });
});

function goToStep(step) {
  // 1. Update active circle
  document.querySelectorAll(".step-circle").forEach(el => {
    const isActive = el.dataset.step == step;

    el.classList.toggle("bg-indigo-600", isActive);
    el.classList.toggle("text-white", isActive);
    el.classList.toggle("border-indigo-600", isActive);

    el.classList.toggle("bg-white", !isActive);
    el.classList.toggle("text-gray-600", !isActive);
    el.classList.toggle("border-gray-300", !isActive);
  });

  // 2. Show correct content
  document.querySelectorAll(".step-content").forEach(section => {
    section.classList.add("hidden");
  });

  const activeContent = document.querySelector(
    `.step-content[data-step="${step}"]`
  );
  if (activeContent) activeContent.classList.remove("hidden");

  // 3. Pause all videos
  document.querySelectorAll("video").forEach(v => v.pause());

  if (step == 4) {
      const target = document.getElementById("secondSection");
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
}

document.querySelectorAll(".go-step-4").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    goToStep(4);
  });
});

