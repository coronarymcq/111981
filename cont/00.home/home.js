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

  // Mapping semesters to arrays of pdf info: {title, url}
  const miniPages = {
    "First Year<br>Second Semester": [
      {
        title: "Health Manegment Quiz, Part 1",
        url: "HCM  - CH1 (1).pdf",
      },
      {
        title: "Health Manegment Quiz, Part 2",
        url: "HCM - CH1 (2).pdf",
      },
      {
        title: "Health Manegment Quiz, Part 3",
        url: "HCM - CH1 (3).pdf",
      },
      {
        title: "Health Manegment Quiz, Part 4",
        url: "HCM - CH2.pdf",
      },
      {
        title: "Health Informatics Quiz, Part 1",
        url: "HIS CH1.pdf",
      },
      {
        title: "Health Informatics Quiz, Part 2",
        url: "HIS CH2-PT2.pdf",
      },
      {
        title: "Health Informatics Quiz, Part 3",
        url: "HIS CH3.pdf",
      },
      {
        title: "Health Informatics Quiz, Part 4",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdUmHknBEsriVNkrWZHFW6mCJq3ezJxP3ZhoU73I4w9mtQ0IQ/viewform",
      },
      {
        title: "Health Informatics Quiz, Part 5",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdfP5CCevfWXfU8Ep8G16SvS9arwttYGbivYk_py3rP-XETlw/viewform?usp=sf_link",
      },
      {
        title: "Health Informatics Quiz, Part 6",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdKWsL9xCohiI77LSfVS8fHW2LXWKL2hu4gF82wB3qQQ6g3LQ/viewform?usp=sf_link",
      },
    ],
    "Second Year<br>Second Semester": [
      {
        title: "Coronary Batch Midterm Genetics Exam",
        url: "CORONARY MIDTERM GENETICS.pdf",
      },
      {
        title: "Coronary Batch Final Genetics Exam",
        url: "CORONARY FINAL GENETICS.pdf",
      },
      {
        title: "Genetics QBank",
        url: "https://t.me/coronarymcq/1724",
      },
      {
        title: "HY Mendel Inheritance Concepts",
        url: "HIGH YIELD CONCEPTS IN MENDEL INHERITANCE MODES.pdf",
      },

      {
        title: "HY Pedigree Concepts",
        url: "PEDIGREE GUIDELINES AND CONCEPTS.pdf",
      },
      {
        title: "Physiology ECG Lab Sheet",
        url: "CVS PHYSIOLOGY LAB 2024.pdf",
      },
      {
        title: "Histology CVS Lab Sheet",
        url: "CVS HISTOLOGY LAB 2024.pdf",
      },
      {
        title: "Anatomy CVS Quiz",
        url: "CVS ANATOMY SUGGESTED MCQ’S.pdf",
      },
      {
        title: "Anatomy GIS Lab Checklist, Part 1",
        url: "GIS ANATOMY CHECK LIST LAB 1.pdf",
      },
      {
        title: "Anatomy GIS Lab Checklist, Part 2",
        url: "GIS ANATOMY CHECK LIST LAB 2.pdf",
      },
      {
        title: "Anatomy GIS Lab Sheet",
        url: "GIS ANATOMY LAB (2) 2024.pdf",
      },
      {
        title: "Histology GIS Lab Sheet",
        url: "GIS HISTOLOGY LAB 2024.pdf",
      },
    ],
    "Second Year<br>Summer Semester": [
      {
        title: "Coronary Batch Final Public Health Exam",
        url: "CORONARY FINAL PUBLIC HEALTH.pdf",
      },
      {
        title: "Coronary Batch Final Biostatisics Exam",
        url: "CORONARY FINAL EPIDEMIOLOGY.pdf",
      },
      {
        title: "Biostatisics SPSS Program Sheet",
        url: "SPSS.pdf",
      },
    ],
    "Third Year<br>First Semester": [
      {
        title: "Coronary Batch Midterm RS Exam",
        url: "CORONARY MIDTERM RS.pdf",
      },
      {
        title: "Coronary Batch Final RS Exam",
        url: "CORONARY FINAL RS.pdf",
      },
      {
        title: "RS Past Papers QBank",
        url: "https://drive.google.com/drive/folders/1LA00tdwJ0YT0U7xFaZe0AvnYWuv-Fsv5?usp=drive_link",
      },
      {
        title: "Coronary Batch Midterm MSS Exam",
        url: "CORONARY MIDTERM MSS.pdf",
      },
      {
        title: "Coronary Batch Final MSS Exam",
        url: "https://t.me/coronarymcq/2500",
      },
      {
        title: "Coronary Batch Midterm Immunology Exam",
        url: "Midterm Exam 2023-2024 student - official key answers.docx.pdf",
      },
      {
        title: "Immunology Past Papers QBank",
        url: "Final Immunology تجميع.pdf",
      },
      {
        title: "Coronary Batch Midterm ES Exam",
        url: "CORONARY MIDTERM ES.pdf",
      },
      {
        title: "Coronary Batch Final ES Exam",
        url: "https://t.me/coronarymcqgc/4105",
      },
      {
        title: "ES Past Papers QBank",
        url: "https://drive.google.com/drive/folders/101pwUCbBA7Qit5wiUxy4X_T44DFN7R_b?usp=drive_link",
      },
    ],

    "Third Year<br>Second Semester": [
      {
        title: "Coronary Batch Midterm UGS Exam",
        url: "CORONARY MIDTERM UGS.pdf",
      },
      {
        title: "Coronary Batch Final UGS Exam",
        url: "https://t.me/coronarymcqgc/5880",
      },
      {
        title: "Development of Placental Circulation Anatomy Sheet",
        url: "Anatomy last lecture final sheet.pdf",
      },
      {
        title: "Histology UGS Summary Table",
        url: "Histology table.pdf",
      },
      {
        title: "Microbiology UGS Lab Sheet",
        url: "UGS-Microbiology.html",
      },
      {
        title: "Microbiology UGS Lecture 5 Sheet",
        url: "MICROBIOLOGY-GUS-5 (1).html",
      },
    ],
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

    // Clear old content
    miniPage.innerHTML = "";

    // Create a div for each PDF file
    const pdfFiles = miniPages[semesters[currentIndex]] || [];
    pdfFiles.forEach(({ title, url }, index) => {
      const pdfDiv = document.createElement("div");
      pdfDiv.className = "pdf-card";
      pdfDiv.style.animationDelay = `${index * 200}ms`; // staggered 0.1s steps

      const titleSpan = document.createElement("span");
      titleSpan.textContent = title;
      titleSpan.style.flex = "1";

      const viewBtn = document.createElement("button");
      viewBtn.textContent = "View";
      viewBtn.onclick = (e) => {
        e.stopPropagation();
        window.open(url, "_blank");
      };

      pdfDiv.style.display = "flex";
      pdfDiv.style.alignItems = "center";
      pdfDiv.style.justifyContent = "space-between";

      pdfDiv.appendChild(titleSpan);
      pdfDiv.appendChild(viewBtn);
      miniPage.appendChild(pdfDiv);
    });

    // Manage nav button visibility
    prevBtn.style.opacity = currentIndex === 0 ? "0" : "1";
    prevBtn.style.pointerEvents = currentIndex === 0 ? "none" : "auto";
    prevBtn.style.display = "inline-block";

    nextBtn.style.opacity = currentIndex === semesters.length - 1 ? "0" : "1";
    nextBtn.style.pointerEvents =
      currentIndex === semesters.length - 1 ? "none" : "auto";
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
