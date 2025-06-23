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

/* -------------------------------------------------------------- */

const statements = [
  {
    h1: "See What We've Achieved.",
    p: "Throughout the Years.",
  },
  {
    h1: "Crafted Work. Constant Growth.",
    p: "For everyone.",
  },
  {
    h1: "Simple but yet valiable.",
    p: "Rich work. Like always.",
  },
];

let currentIndex = 0;
const h1Element = document.querySelector(".all-text");
const pElement = document.querySelector(".all-text0");

// <-- ADD THIS TO PREVENT INITIAL FLICKER
h1Element.textContent = statements[0].h1;
pElement.textContent = statements[0].p;

function animateOut(element, delay = 0) {
  element.classList.remove("animate-in");
  void element.offsetWidth;
  setTimeout(() => {
    element.classList.add("animate-out");
  }, delay);
}

function animateIn(element, delay = 0) {
  element.classList.remove("animate-out");
  void element.offsetWidth;
  setTimeout(() => {
    element.classList.add("animate-in");
  }, delay);
}

function switchStatement() {
  // Animate old text out
  animateOut(h1Element, 0);
  animateOut(pElement, 0); // leaves 300ms after h1

  // After exit animation completes (~600ms), update content and animate in
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % statements.length;
    h1Element.textContent = statements[currentIndex].h1;
    pElement.textContent = statements[currentIndex].p;

    animateIn(h1Element, 0);
    animateIn(pElement, 500); // staggered appearance
  }, 650);
}

// Initial entrance animation
animateIn(h1Element, 0);
animateIn(pElement, 500);

// Switch every 5s
setInterval(switchStatement, 5000);

/* -------------------------------------------------------------- */
(function () {
  const semesters = [
    "First Year<br>Second Semester",
    "Second Year<br>Second Semester",
    "Second Year<br>Summer Semester",
    "Third Year<br>First Semester",
    "Third Year<br>Second Semester",
  ];

  const miniPages = {
    "First Year<br>Second Semester": "📘 Basic Sciences & Midterms prep notes.",
    "Second Year<br>Second Semester":
      "🧬 Pathology systems, Pharm II, and behavioral.",
    "Second Year<br>Summer Semester":
      "🧪 Research or electives like radiology, derm.",
    "Third Year<br>First Semester":
      "🩺 Internal Medicine, Surgery & Ward work starts.",
    "Third Year<br>Second Semester":
      "🧒 Pediatric + OBGYN + Psych rotations ongoing.",
  };

  let currentIndex = 0;

  function renderSemester() {
    const semesterTitle = document.getElementById("semesterTitle");
    const miniPage = document.getElementById("miniPageContainer");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (!semesterTitle || !miniPage || !prevBtn || !nextBtn) {
      return setTimeout(renderSemester, 100);
    }

    semesterTitle.innerHTML = semesters[currentIndex];
    miniPage.innerHTML = `
    <div>
      ${miniPages[semesters[currentIndex]]}
    </div>`;

    // Left arrow: always visible in layout, but hidden & disabled on first semester
    if (currentIndex === 0) {
      prevBtn.style.opacity = "0";
      prevBtn.style.pointerEvents = "none";
    } else {
      prevBtn.style.opacity = "1";
      prevBtn.style.pointerEvents = "auto";
    }
    prevBtn.style.display = "inline-block";

    // Right arrow: same treatment as left arrow now
    if (currentIndex === semesters.length - 1) {
      nextBtn.style.opacity = "0";
      nextBtn.style.pointerEvents = "none";
    } else {
      nextBtn.style.opacity = "1";
      nextBtn.style.pointerEvents = "auto";
    }
    nextBtn.style.display = "inline-block";
  }

  window.changeSemester = function (direction) {
    if (
      (direction === -1 && currentIndex > 0) ||
      (direction === 1 && currentIndex < semesters.length - 1)
    ) {
      currentIndex += direction;
      renderSemester();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderSemester);
  } else {
    renderSemester();
  }
})();

document.querySelectorAll("#nextBtn, #prevBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("clicked");
    setTimeout(() => {
      btn.classList.remove("clicked");
    }, 30); // match the animation duration
  });
});
