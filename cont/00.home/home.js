console.log("✅ home.js is loaded and running");

function smoothScrollTo(targetY, duration = 600) {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // easeInOutQuad easing function for smoothness
    const ease =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, startY + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

function initHomeScroll() {
  const scrollBtn = document.getElementById("scrollButton");
  if (!scrollBtn) {
    console.warn("⚠️ scrollButton not found in home.js");
    return;
  }

  console.log("✅ Scroll button found in home.js");

  // Scroll button click: smooth scroll to containerhome
  scrollBtn.addEventListener("click", () => {
    console.log("🟢 Scroll button clicked (from home.js)");

    const containerHome = document.querySelector(".containerhome");
    if (containerHome) {
      const offset = 50; // adjust this value as needed
      const topPos =
        containerHome.getBoundingClientRect().top + window.pageYOffset - offset;

      smoothScrollTo(topPos, 700); // 700ms scroll duration
      console.log(`🟢 Scrolled to .containerhome with offset ${offset}px`);
    } else {
      console.warn("⚠️ .containerhome not found");
    }
  });

  // Show/hide scrollButton based on scroll direction
  let lastScrollY = window.pageYOffset;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.pageYOffset;

    if (currentScrollY > lastScrollY) {
      // Scrolling down - hide button
      scrollBtn.classList.add("hide");
    } else {
      // Scrolling up - show button
      scrollBtn.classList.remove("hide");
    }

    lastScrollY = currentScrollY;
  });
}

// Call the function once DOM is ready
document.addEventListener("DOMContentLoaded", initHomeScroll);
