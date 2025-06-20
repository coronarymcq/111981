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

const semesterData = {
  y1s1: [
    { title: "Histology Intro", url: "/pdfs/histology1.pdf" },
    { title: "General Anatomy", url: "/pdfs/anatomy1.pdf" },
  ],
  y1s2: [{ title: "Physiology Midterm", url: "/pdfs/physiology2.pdf" }],
  y1sum: [],
  y2s1: [{ title: "Pharmacology Basics", url: "/pdfs/pharma.pdf" }],
};

function renderFloatingCards(cards) {
  const container = document.getElementById("contentDisplay");
  container.innerHTML = "";
  if (!cards || cards.length === 0) {
    container.innerHTML = "<p>No PDFs available for this semester yet.</p>";
    return;
  }
  cards.forEach((card) => {
    const div = document.createElement("div");
    div.className = "floating-card";
    div.innerHTML = `
      <h3>${card.title}</h3>
      <button onclick="window.open('${card.url}', '_blank')">Download</button>
    `;
    container.appendChild(div);
  });
}

document.querySelectorAll(".timeline-label").forEach((label) => {
  label.addEventListener("click", () => {
    document
      .querySelectorAll(".timeline-label")
      .forEach((n) => n.classList.remove("active"));
    label.classList.add("active");
    const semesterKey = label.dataset.semester;
    renderFloatingCards(semesterData[semesterKey]);
    localStorage.setItem("selectedSemester", semesterKey); // Save selection
  });
});

/*------------------------------------*/

const timelineLabels = document.querySelectorAll(".timeline-label");

// Initial load - set active from saved or default, render cards
const savedSemester = localStorage.getItem("selectedSemester") || "y1s1";
timelineLabels.forEach((label) => {
  label.classList.remove("active");
  if (label.dataset.semester === savedSemester) {
    label.classList.add("active");
  }
});
renderFloatingCards(semesterData[savedSemester]);

// Clear saved semester and reload when clicking logo to reset to default
const logo = document.querySelector(".hover-logo");
if (logo) {
  logo.addEventListener("click", () => {
    localStorage.removeItem("selectedSemester");
    location.reload();
  });
}
