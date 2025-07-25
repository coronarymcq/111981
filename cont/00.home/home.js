(function () {
  console.log("✅ home.js is loaded and running");

  function smoothScrollTo(targetY, duration = 600) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

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

  window.initHomeScroll = function () {
    const scrollBtn = document.getElementById("scrollButton");
    if (!scrollBtn) {
      console.warn("⚠️ scrollButton not found in home.js");
      return;
    }

    console.log("✅ Scroll button found in home.js");

    scrollBtn.addEventListener("click", () => {
      console.log("🟢 Scroll button clicked (from home.js)");

      const containerHome = document.querySelector(".containerhome");
      if (containerHome) {
        const offset = 0;
        const topPos =
          containerHome.getBoundingClientRect().top +
          window.pageYOffset -
          offset;

        smoothScrollTo(topPos, 700);
        console.log(`🟢 Scrolled to .containerhome with offset ${offset}px`);
      } else {
        console.warn("⚠️ .containerhome not found");
      }
    });

    let lastScrollY = window.pageYOffset;

    window.addEventListener("scroll", () => {
      const currentScrollY = window.pageYOffset;

      if (currentScrollY > lastScrollY) {
        scrollBtn.classList.add("hide");
      } else {
        scrollBtn.classList.remove("hide");
      }

      lastScrollY = currentScrollY;
    });
  };

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

  let currentStatementIndex = 0;
  const h1Element = document.querySelector(".all-text");
  const pElement = document.querySelector(".all-text0");

  if (h1Element && pElement) {
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
      animateOut(h1Element, 0);
      animateOut(pElement, 0);

      setTimeout(() => {
        currentStatementIndex = (currentStatementIndex + 1) % statements.length;
        h1Element.textContent = statements[currentStatementIndex].h1;
        pElement.textContent = statements[currentStatementIndex].p;

        animateIn(h1Element, 0);
        animateIn(pElement, 500);
      }, 650);
    }

    animateIn(h1Element, 0);
    animateIn(pElement, 500);

    setInterval(switchStatement, 5000);
  }

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
      {
        title: "Vulva Pathologies Summary",
        url: "Vulva.pdf",
      },
      {
        title: "Vagina Pathologies Summary",
        url: "Vagina.pdf",
      },
      {
        title: "Uterus Pathologies Summary",
        url: "Uterus.pdf",
      },
      {
        title: "Testes Pathologies Summary",
        url: "Testes.pdf",
      },
      {
        title: "Prostate Pathologies Summary",
        url: "Prostate.pdf",
      },
      {
        title: "Ovaries Pathologies Summary",
        url: "Ovaries.pdf",
      },
      {
        title: "Pathology Mutations UGS Summary",
        url: "Mutations.pdf",
      },
      {
        title: "Cervix Pathologies Summary",
        url: "Cervix.pdf",
      },
      {
        title: "Breast Pathologies Summary",
        url: "Breast.pdf",
      },
      {
        title: "BS Past Papers QBank",
        url: "https://drive.google.com/drive/folders/11D2Z_EBdm-eoMvbZI4VdNrVeUs-m0noH?usp=drive_link",
      },
      {
        title: "Coronary Batch Final BS Exam",
        url: "https://t.me/coronarymcqgc/6290",
      },
      {
        title: "Coronary Batch Midterm HE Exam",
        url: "https://t.me/coronarymcqgc/5551",
      },
      {
        title: "Coronary Batch Final HE Exam",
        url: "https://t.me/coronarymcqgc/6376",
      },
      {
        title: "Coronary Batch Final NS Exam",
        url: "CORONARY FINAL NS.pdf",
      },
      {
        title: "Coronary Batch Midterm NS Exam",
        url: "CORONARY MIDTERM NS.pdf",
      },
      {
        title: "Anatomy NS Lab 1 Sheet",
        url: "Anatomy lab 1.pdf",
      },
      {
        title: "Anatomy NS Lab 2 Sheet",
        url: "Anatomy lab 2.pdf",
      },
      {
        title: "Anatomy NS Lab 4 Sheet",
        url: "Anatomy lab 4.pdf",
      },
    ],
  };

  let currentSemesterIndex = 0;

  function renderSemester() {
    const semesterTitle = document.getElementById("semesterTitle");
    const miniPage = document.getElementById("miniPageContainer");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (!semesterTitle || !miniPage || !prevBtn || !nextBtn) {
      return setTimeout(renderSemester, 100);
    }

    semesterTitle.innerHTML = semesters[currentSemesterIndex];
    miniPage.innerHTML = "";

    const pdfFiles = miniPages[semesters[currentSemesterIndex]] || [];
    pdfFiles.forEach(({ title, url }, index) => {
      const pdfDiv = document.createElement("div");
      pdfDiv.className = "pdf-card";
      pdfDiv.style.animationDelay = `${index * 100}ms`;

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

    prevBtn.style.opacity = currentSemesterIndex === 0 ? "0" : "1";
    prevBtn.style.pointerEvents = currentSemesterIndex === 0 ? "none" : "auto";
    prevBtn.style.display = "inline-block";

    nextBtn.style.opacity =
      currentSemesterIndex === semesters.length - 1 ? "0" : "1";
    nextBtn.style.pointerEvents =
      currentSemesterIndex === semesters.length - 1 ? "none" : "auto";
    nextBtn.style.display = "inline-block";
  }

  window.changeSemester = function (direction) {
    if (
      (direction === -1 && currentSemesterIndex > 0) ||
      (direction === 1 && currentSemesterIndex < semesters.length - 1)
    ) {
      currentSemesterIndex += direction;
      renderSemester();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      renderSemester();
      window.initHomeScroll(); // ✅ Add this here
    });
  } else {
    renderSemester();
    window.initHomeScroll(); // ✅ Add this here too
  }
})();
