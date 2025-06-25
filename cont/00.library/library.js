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
      },
      {
        title: "Anatomy GIS Lab Checklist, Part 2",
        url: "GIS ANATOMY CHECK LIST LAB 2.pdf",
      },
      { title: "Anatomy GIS Lab Sheet", url: "GIS ANATOMY LAB (2) 2024.pdf" },
      { title: "Histology GIS Lab Sheet", url: "GIS HISTOLOGY LAB 2024.pdf" },
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
      { title: "Biostatisics SPSS Program Sheet", url: "SPSS.pdf" },
    ],
    "Third Year<br>First Semester": [
      {
        title: "Coronary Batch Midterm RS Exam",
        url: "CORONARY MIDTERM RS.pdf",
      },
      { title: "Coronary Batch Final RS Exam", url: "CORONARY FINAL RS.pdf" },
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
      { title: "Histology UGS Summary Table", url: "Histology table.pdf" },
      { title: "Microbiology UGS Lab Sheet", url: "UGS-Microbiology.html" },
      {
        title: "Microbiology UGS Lecture 5 Sheet",
        url: "MICROBIOLOGY-GUS-5 (1).html",
      },
      { title: "Vulva Pathologies Summary", url: "Vulva.pdf" },
      { title: "Vagina Pathologies Summary", url: "Vagina.pdf" },
      { title: "Uterus Pathologies Summary", url: "Uterus.pdf" },
      { title: "Testes Pathologies Summary", url: "Testes.pdf" },
      { title: "Prostate Pathologies Summary", url: "Prostate.pdf" },
      { title: "Ovaries Pathologies Summary", url: "Ovaries.pdf" },
      { title: "Pathology Mutations UGS Summary", url: "Mutations.pdf" },
      { title: "Cervix Pathologies Summary", url: "Cervix.pdf" },
      { title: "Breast Pathologies Summary", url: "Breast.pdf" },
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
      { title: "Coronary Batch Final NS Exam", url: "CORONARY FINAL NS.pdf" },
      {
        title: "Coronary Batch Midterm NS Exam",
        url: "CORONARY MIDTERM NS.pdf",
      },
      { title: "Anatomy NS Lab 1 Sheet", url: "Anatomy lab 1.pdf" },
      { title: "Anatomy NS Lab 2 Sheet", url: "Anatomy lab 2.pdf" },
      { title: "Anatomy NS Lab 4 Sheet", url: "Anatomy lab 4.pdf" },
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
    "Genetics",
    "Immunology",
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
      clearIcon.style.display = "inline-block";
    } else {
      clearIcon.style.display = "none";
    }
  }

  function populateDropdown() {
    const allTags = new Set();
    libraryData.forEach((item) => item.tags.forEach((tag) => allTags.add(tag)));
    extraTags.forEach((tag) => allTags.add(tag));

    const tagOptions = document.getElementById("tagOptions");
    tagOptions.innerHTML = "";

    [...allTags].sort().forEach((tag) => {
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
      tagOptions.appendChild(label);
    });

    const dropdown = document.querySelector(".multi-select");
    const display = dropdown.querySelector(".multi-select-display");

    display.addEventListener("click", () => {
      tagOptions.classList.toggle("hidden");
      display.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && e.target !== clearIcon) {
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
    searchInput.value = ""; // Clear the search bar input

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

    const lastSelectedTag =
      selectedTagsOrder.length > 0
        ? selectedTagsOrder[selectedTagsOrder.length - 1]
        : null;

    const filteredData = libraryData.filter((item) => {
      const matchesTag =
        !lastSelectedTag || item.tags.includes(lastSelectedTag);
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery));
      return matchesTag && matchesSearch;
    });

    if (filteredData.length === 0) {
      libraryBody.innerHTML =
        "<tr><td colspan='2'>No matching files found.</td></tr>";
      return;
    }

    filteredData.forEach((item) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      const link = document.createElement("a");
      link.textContent = item.name;
      link.href = item.url;
      link.target = "_blank";
      link.style.color = "var(--all-text)";
      link.style.textDecoration = "none";
      nameCell.appendChild(link);

      const tagsCell = document.createElement("td");
      item.tags.forEach((tag) => {
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
