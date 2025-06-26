(() => {
  const semesterMap = {
    "First Year<br>Second Semester": "Y1S2",
    "Second Year<br>Second Semester": "Y2S2",
    "Second Year<br>Summer Semester": "Y2S3",
    "Third Year<br>First Semester": "Y3S1",
    "Third Year<br>Second Semester": "Y3S2",
  };

  const miniPages = {
    "First Year<br>Second Semester": [
      {
        title: "Health Manegment Quiz, Part 1",
        url: "HCM  - CH1 (1).pdf",
        tags: ["HCM", "Quiz", "Midterm"],
      },
      {
        title: "Health Manegment Quiz, Part 2",
        url: "HCM - CH1 (2).pdf",
        tags: ["HCM", "Quiz", "Midterm"],
      },
      {
        title: "Health Manegment Quiz, Part 3",
        url: "HCM - CH1 (3).pdf",
        tags: ["HCM", "Quiz", "Midterm"],
      },
      {
        title: "Health Manegment Quiz, Part 4",
        url: "HCM - CH2.pdf",
        tags: ["HCM", "Quiz", "Midterm"],
      },
      {
        title: "Health Informatics Quiz, Part 1",
        url: "HIS CH1.pdf",
        tags: ["HIS", "Quiz", "Midterm"],
      },
      {
        title: "Health Informatics Quiz, Part 2",
        url: "HIS CH2-PT2.pdf",
        tags: ["HIS", "Quiz", "Midterm"],
      },
      {
        title: "Health Informatics Quiz, Part 3",
        url: "HIS CH3.pdf",
        tags: ["HIS", "Quiz", "Midterm"],
      },
      {
        title: "Health Informatics Quiz, Part 4",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdUmHknBEsriVNkrWZHFW6mCJq3ezJxP3ZhoU73I4w9mtQ0IQ/viewform",
        tags: ["HIS", "Quiz", "Midterm"],
      },
      {
        title: "Health Informatics Quiz, Part 5",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdfP5CCevfWXfU8Ep8G16SvS9arwttYGbivYk_py3rP-XETlw/viewform?usp=sf_link",
        tags: ["HIS", "Quiz", "Midterm"],
      },
      {
        title: "Health Informatics Quiz, Part 6",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdKWsL9xCohiI77LSfVS8fHW2LXWKL2hu4gF82wB3qQQ6g3LQ/viewform?usp=sf_link",
        tags: ["HIS", "Quiz", "Midterm"],
      },
    ],
    "Second Year<br>Second Semester": [
      {
        title: "Coronary Batch Midterm Genetics Exam",
        url: "CORONARY MIDTERM GENETICS.pdf",
        tags: ["Genetics", "Exam", "Midterm", "QBank"],
      },
      {
        title: "Coronary Batch Final Genetics Exam",
        url: "CORONARY FINAL GENETICS.pdf",
        tags: ["Genetics", "Exam", "Final", "QBank"],
      },
      {
        title: "Genetics QBank",
        url: "https://t.me/coronarymcq/1724",
        tags: ["Genetics", "Quiz", "QBank", "USMLE"],
      },
      {
        title: "HY Mendel Inheritance Concepts",
        url: "HIGH YIELD CONCEPTS IN MENDEL INHERITANCE MODES.pdf",
        tags: ["Genetics", "Summary", "USMLE"],
      },
      {
        title: "HY Pedigree Concepts",
        url: "PEDIGREE GUIDELINES AND CONCEPTS.pdf",
        tags: ["Genetics", "Summary", "USMLE"],
      },
      {
        title: "Physiology ECG Lab Sheet",
        url: "CVS PHYSIOLOGY LAB 2024.pdf",
        tags: ["Physiology", "CVS", "Lab", "Sheet", "Midterm"],
      },
      {
        title: "Histology CVS Lab Sheet",
        url: "CVS HISTOLOGY LAB 2024.pdf",
        tags: ["Histology", "CVS", "Lab", "Sheet", "Final"],
      },
      { title: "Anatomy CVS Quiz", url: "CVS ANATOMY SUGGESTED MCQ’S.pdf" },
      {
        title: "Anatomy GIS Lab Checklist, Part 1",
        url: "GIS ANATOMY CHECK LIST LAB 1.pdf",
        tags: ["Anatomy", "GIS", "Lab", "Sheet", "Final"],
      },
      {
        title: "Anatomy GIS Lab Checklist, Part 2",
        url: "GIS ANATOMY CHECK LIST LAB 2.pdf",
        tags: ["Anatomy", "GIS", "Lab", "Sheet", "Final"],
      },

      {
        title: "Anatomy GIS Lab Sheet",
        url: "GIS ANATOMY LAB (2) 2024.pdf",
        tags: ["Anatomy", "GIS", "Lab", "Sheet", "Final"],
      },
      {
        title: "Histology GIS Lab Sheet",
        url: "GIS HISTOLOGY LAB 2024.pdf",
        tags: ["Histology", "GIS", "Lab", "Sheet", "Final"],
      },
    ],
    "Second Year<br>Summer Semester": [
      {
        title: "Coronary Batch Final Public Health Exam",
        url: "CORONARY FINAL PUBLIC HEALTH.pdf",
        tags: ["Public Health", "Exam", "Final", "QBank"],
      },
      {
        title: "Coronary Batch Final Biostatisics Exam",
        url: "CORONARY FINAL EPIDEMIOLOGY.pdf",
        tags: ["Biostatisics", "Exam", "Final", "QBank"],
      },
      {
        title: "Biostatisics SPSS Program Sheet",
        url: "SPSS.pdf",
        tags: ["Biostatisics", "Sheet", "Final"],
      },
    ],
    "Third Year<br>First Semester": [
      {
        title: "Coronary Batch Midterm RS Exam",
        url: "CORONARY MIDTERM RS.pdf",
        tags: ["RS", "Exam", "Midterm", "QBank"],
      },
      {
        title: "Coronary Batch Final RS Exam",
        url: "CORONARY FINAL RS.pdf",
        tags: ["RS", "Exam", "Final", "QBank"],
      },
      {
        title: "RS Past Papers QBank",
        url: "https://drive.google.com/drive/folders/1LA00tdwJ0YT0U7xFaZe0AvnYWuv-Fsv5?usp=drive_link",
        tags: ["RS", "Past papers", "QBank"],
      },
      {
        title: "Coronary Batch Midterm MSS Exam",
        url: "CORONARY MIDTERM MSS.pdf",
        tags: ["MSS", "Exam", "Midterm", "QBank"],
      },
      {
        title: "Coronary Batch Final MSS Exam",
        url: "https://t.me/coronarymcq/2500",
        tags: ["MSS", "Exam", "Final", "QBank"],
      },
      {
        title: "Coronary Batch Midterm Immunology Exam",
        url: "Midterm Exam 2023-2024 student - official key answers.docx.pdf",
        tags: ["Immunology", "Exam", "Midterm", "QBank"],
      },
      {
        title: "Immunology Past Papers QBank",
        url: "Final Immunology تجميع.pdf",
        tags: ["Immunology", "Past papers", "QBank"],
      },
      {
        title: "Coronary Batch Midterm ES Exam",
        url: "CORONARY MIDTERM ES.pdf",
        tags: ["ES", "Exam", "Midterm", "QBank"],
      },
      {
        title: "Coronary Batch Final ES Exam",
        url: "https://t.me/coronarymcqgc/4105",
        tags: ["ES", "Exam", "Final", "QBank"],
      },
      {
        title: "ES Past Papers QBank",
        url: "https://drive.google.com/drive/folders/101pwUCbBA7Qit5wiUxy4X_T44DFN7R_b?usp=drive_link",
        tags: ["ES", "Past papers", "QBank"],
      },
    ],
    "Third Year<br>Second Semester": [
      {
        title: "Coronary Batch Midterm UGS Exam",
        url: "CORONARY MIDTERM UGS.pdf",
        tags: ["UGS", "Exam", "Midterm", "QBank"],
      },
      {
        title: "Coronary Batch Final UGS Exam",
        url: "https://t.me/coronarymcqgc/5880",
        tags: ["UGS", "Exam", "Final", "QBank"],
      },
      {
        title: "Development of Placental Circulation Anatomy Sheet",
        url: "Anatomy last lecture final sheet.pdf",
        tags: ["Anatomy", "UGS", "Sheet", "Final"],
      },
      {
        title: "Histology UGS Summary Table",
        url: "Histology table.pdf",
        tags: ["Histology", "UGS", "Summary", "Final"],
      },
      {
        title: "Microbiology UGS Lab Sheet",
        url: "UGS-Microbiology.html",
        tags: ["Microbiology", "UGS", "Sheet", "Lab", "Final"],
      },
      {
        title: "Microbiology UGS Lecture 5 Sheet",
        url: "MICROBIOLOGY-GUS-5 (1).html",
        tags: ["Microbiology", "UGS", "Sheet", "Final"],
      },
      {
        title: "Vulva Pathologies Summary",
        url: "Vulva.pdf",
        tags: ["Pathology", "UGS", "Summary", "USMLE", "Final"],
      },
      {
        title: "Vagina Pathologies Summary",
        url: "Vagina.pdf",
        tags: ["Pathology", "UGS", "Summary", "USMLE", "Final"],
      },
      {
        title: "Uterus Pathologies Summary",
        url: "Uterus.pdf",
        tags: ["Pathology", "UGS", "Summary", "USMLE", "Final"],
      },
      {
        title: "Testes Pathologies Summary",
        url: "Testes.pdf",
        tags: ["Pathology", "UGS", "Summary", "USMLE", "Final"],
      },
      {
        title: "Prostate Pathologies Summary",
        url: "Prostate.pdf",
        tags: ["Pathology", "UGS", "Summary", "USMLE", "Final"],
      },
      {
        title: "Ovaries Pathologies Summary",
        url: "Ovaries.pdf",
        tags: ["Pathology", "UGS", "Summary", "USMLE", "Final"],
      },
      {
        title: "Pathology Mutations UGS Summary",
        url: "Mutations.pdf",
        tags: ["Pathology", "UGS", "Summary", "USMLE", "Final"],
      },
      {
        title: "Cervix Pathologies Summary",
        url: "Cervix.pdf",
        tags: ["Pathology", "UGS", "Summary", "USMLE", "Final"],
      },
      {
        title: "Breast Pathologies Summary",
        url: "Breast.pdf",
        tags: ["Pathology", "UGS", "Summary", "USMLE", "Final"],
      },
      {
        title: "BS Past Papers QBank",
        url: "https://drive.google.com/drive/folders/11D2Z_EBdm-eoMvbZI4VdNrVeUs-m0noH?usp=drive_link",
        tags: ["BS", "Past papers", "QBank"],
      },
      {
        title: "Coronary Batch Final BS Exam",
        url: "https://t.me/coronarymcqgc/6290",
        tags: ["BS", "Exam", "Final", "QBank"],
      },
      {
        title: "Coronary Batch Midterm HE Exam",
        url: "https://t.me/coronarymcqgc/5551",
        tags: ["BS", "Exam", "Midterm", "QBank"],
      },
      {
        title: "Coronary Batch Final HE Exam",
        url: "https://t.me/coronarymcqgc/6376",
        tags: ["BS", "Exam", "Final", "QBank"],
      },
      {
        title: "Coronary Batch Final NS Exam",
        url: "CORONARY FINAL NS.pdf",
        tags: ["NS", "Exam", "Final", "QBank"],
      },
      {
        title: "Coronary Batch Midterm NS Exam",
        url: "CORONARY MIDTERM NS.pdf",
        tags: ["NS", "Exam", "Midterm", "QBank"],
      },
      {
        title: "Anatomy NS Lab 1 Sheet",
        url: "Anatomy lab 1.pdf",
        tags: ["Anatomy", "NS", "Sheet", "Lab", "Final"],
      },
      {
        title: "Anatomy NS Lab 2 Sheet",
        url: "Anatomy lab 2.pdf",
        tags: ["Anatomy", "NS", "Sheet", "Lab", "Final"],
      },
      {
        title: "Anatomy NS Lab 4 Sheet",
        url: "Anatomy lab 4.pdf",
        tags: ["Anatomy", "NS", "Sheet", "Lab", "Final"],
      },
    ],
  };

  const libraryData = [];
  for (const semester in miniPages) {
    const shortTag = semesterMap[semester] || semester.replace(/<br>/g, " - ");
    miniPages[semester].forEach((entry) => {
      const combinedTags = [shortTag];
      if (entry.tags && Array.isArray(entry.tags)) {
        combinedTags.push(...entry.tags);
      }
      libraryData.push({
        name: entry.title,
        url: entry.url,
        tags: combinedTags,
      });
    });
  }

  const tagFiltersContainer = document.getElementById("tagFilters");
  const libraryBody = document.getElementById("libraryBody");
  const searchInput = document.getElementById("searchInput");
  const selectedTagsOrder = [];
  const extraTags = [
    "USMLE",
    "Midterm",
    "Final",
    "RS",
    "ES",
    "NS",
    "BS",
    "HE",
    "MSS",
    "HCM",
    "HIS",
    "CVS",
    "GIS",
    "UGS",
    "Genetics",
    "Immunology",
    "Microbiology",
    "Quiz",
    "QBank",
    "Summary",
    "Sheet",
    "Lab",
    "Anatomy",
    "Physiology",
    "Histology",
    "Pathology",
    "Public health",
    "Biostatisics",
    "Exam",
    "Past papers",
  ];

  const clearIcon = document.querySelector(".search-container > .clear-icon");

  function updateFilterLabel() {
    const display = document.querySelector(".multi-select .selected-label");
    display.textContent = selectedTagsOrder.length > 0 ? "Edit" : "Filter";
  }

  function updateClearIconVisibility() {
    const hasTags = selectedTagsOrder.length > 0;
    const hasSearch = searchInput.value.trim() !== "";

    if (hasTags || hasSearch) {
      clearIcon.classList.add("visible");
    } else {
      clearIcon.classList.remove("visible");
    }
  }

  function populateDropdown() {
    const timelineTags = ["Y1S2", "Y2S2", "Y2S3", "Y3S1", "Y3S2"];
    const systemTags = ["RS", "ES", "NS", "UGS", "CVS", "GIS", "MSS"];
    const subjectTags = [
      "Anatomy",
      "Physiology",
      "Histology",
      "Pathology",
      "Microbiology",
      "Immunology",
      "Genetics",
      "Public health",
      "Biostatisics",
      "HCM",
      "HIS",
      "BS",
    ];
    const otherTags = [
      "Past papers",
      "USMLE",
      "Quiz",
      "QBank",
      "Summary",
      "Sheet",
      "Lab",
      "Midterm",
      "Final",
      "Exam",
    ];

    const tagOptions = document.getElementById("tagOptions");
    tagOptions.innerHTML = "";

    const renderGroup = (title, tags) => {
      const group = document.createElement("div");
      group.className = "tag-group";

      const heading = document.createElement("div");
      heading.className = "tag-heading";
      heading.textContent = title;
      group.appendChild(heading);

      tags.forEach((tag) => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = tag;

        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            if (!selectedTagsOrder.includes(tag)) {
              selectedTagsOrder.push(tag);
            }
          } else {
            const index = selectedTagsOrder.indexOf(tag);
            if (index > -1) {
              selectedTagsOrder.splice(index, 1);
            }
          }
          renderTable();
          updateFilterLabel();
          updateClearIconVisibility();
        });

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(tag));
        group.appendChild(label);
      });

      tagOptions.appendChild(group);
    };

    renderGroup("Timeline", timelineTags);
    renderGroup("System", systemTags);
    renderGroup("Subject", subjectTags);
    renderGroup("Others", otherTags);

    const dropdown = document.querySelector(".multi-select");
    const display = dropdown.querySelector(".multi-select-display");

    let isDropdownOpen = false;

    display.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent bubbling to document
      isDropdownOpen = !isDropdownOpen;
      tagOptions.classList.toggle("hidden", !isDropdownOpen);
      display.classList.toggle("active", isDropdownOpen);
    });

    document.addEventListener("click", (e) => {
      if (isDropdownOpen && !dropdown.contains(e.target)) {
        isDropdownOpen = false;
        tagOptions.classList.add("hidden");
        display.classList.remove("active");
      }
    });

    updateFilterLabel();
    updateClearIconVisibility();
  }

  clearIcon.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    selectedTagsOrder.length = 0;
    searchInput.value = "";

    document
      .querySelectorAll("#tagOptions input[type=checkbox]")
      .forEach((cb) => (cb.checked = false));

    renderTable();
    updateFilterLabel();
    updateClearIconVisibility();
  });

  function renderTable() {
    const searchQuery = searchInput.value.toLowerCase();
    libraryBody.innerHTML = "";

    const filteredData = libraryData.filter((item) => {
      // OR logic for tag filtering:
      const matchesTags =
        selectedTagsOrder.length === 0 ||
        selectedTagsOrder.every((tag) => item.tags.includes(tag));

      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery));

      return matchesTags && matchesSearch;
    });

    if (filteredData.length === 0) {
      libraryBody.innerHTML =
        "<tr><td colspan='2'>No matching files found.</td></tr>";
      return;
    }

    filteredData.forEach((item, index) => {
      const row = document.createElement("tr");
      row.classList.add("table-row-animated");
      row.style.animationDelay = `${index * 60}ms`;

      const nameCell = document.createElement("td");
      nameCell.classList.add("name-cell");

      const fileNameSpan = document.createElement("span");
      fileNameSpan.textContent = item.name;

      // Create the button
      const viewButton = document.createElement("a");
      viewButton.textContent = "View";
      viewButton.href = item.url;
      viewButton.target = "_blank";
      viewButton.className = "view-button";

      // Append both
      nameCell.appendChild(fileNameSpan);
      nameCell.appendChild(viewButton);

      const tagsCell = document.createElement("td");

      // Show only the selected tags if filtering by tags, else show all tags
      const tagsToShow =
        selectedTagsOrder.length > 0
          ? item.tags.filter((tag) => selectedTagsOrder.includes(tag))
          : item.tags;

      tagsToShow.forEach((tag) => {
        const tagDiv = document.createElement("div");
        tagDiv.className = "tag-badge";
        tagDiv.textContent = tag;
        tagsCell.appendChild(tagDiv);
      });

      row.appendChild(nameCell);
      row.appendChild(tagsCell);
      libraryBody.appendChild(row);
    });
  }

  searchInput.addEventListener("input", () => {
    renderTable();
    updateClearIconVisibility();
  });

  populateDropdown();
  renderTable();
})();

const helpButton = document.getElementById("helpButton");
const helpPopout = document.getElementById("helpPopout");
const closeHelpPopout = document.getElementById("closeHelpPopout");
const helpSlides = document.querySelectorAll(".help-slide");
const nextHelp = document.getElementById("nextHelp");
const prevHelp = document.getElementById("prevHelp");

let helpTimeout;
let currentSlide = 0;

function showSlide(index) {
  helpSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function resetHelpTimeout() {
  clearTimeout(helpTimeout);
  helpTimeout = setTimeout(() => {
    hidePopout();
  }, 15000); //
}

function showPopout() {
  clearTimeout(helpTimeout);
  helpPopout.classList.remove("hiding");
  helpPopout.classList.add("visible");
  resetHelpTimeout();
}

function hidePopout() {
  helpPopout.classList.remove("visible");
  helpPopout.classList.add("hiding");
}

helpButton.addEventListener("click", () => {
  currentSlide = 0;
  showSlide(currentSlide);
  showPopout();
});

closeHelpPopout.addEventListener("click", () => {
  hidePopout();
  clearTimeout(helpTimeout);
});

nextHelp.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % helpSlides.length;
  showSlide(currentSlide);
  resetHelpTimeout();
});

prevHelp.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + helpSlides.length) % helpSlides.length;
  showSlide(currentSlide);
  resetHelpTimeout();
});
