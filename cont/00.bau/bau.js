document.getElementById("submit-and-download").addEventListener("click", () => {
  if (!window.jspdf) {
    console.error("jsPDF library not found.");
    return;
  }
  const { jsPDF } = window.jspdf;
  if (!jsPDF) {
    console.error("jsPDF not loaded correctly.");
    return;
  }

  const form = document.getElementById("history-form-container");
  if (!form) {
    console.error("Form container not found!");
    return;
  }

  function getLabelText(input) {
    let label = form.querySelector(`label[for="${input.id}"]`);
    if (!label && input.parentNode.tagName.toLowerCase() === "label") {
      label = input.parentNode;
    }
    return label
      ? label.innerText.replace(/\n/g, " ").trim()
      : input.id || "Field";
  }

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 15;
  const baseLineHeight = 10;
  let y = margin + 10; // Increase 10 to add top padding before title

  const blueColor = [44, 201, 199]; // rgb(44, 201, 199)

  // Current date/time for header
  const now = new Date();
  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString();

  // Title centered top
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...blueColor);
  doc.text("Clinical History Report", pageWidth / 2, y, { align: "center" });
  y += 15;

  // Only show student name centered below title
  const studentName =
    document.getElementById("student-name")?.value || "Unknown Student";

  const groupNumber =
    document.getElementById("group-number")?.value || "Unknown Group";

  const rotation =
    document.getElementById("rotation")?.value || "Unknown Rotation";

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0);

  doc.text(`Student Name: ${studentName}`, pageWidth / 2, y + 5, {
    // reduce from 10 to 5
    align: "center",
  });

  y += 15; // reduce from 30 to 15

  // Horizontal blue line after header info
  doc.setDrawColor(...blueColor);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Top-right corner: current date/time and BAU text (gray color)
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100); // gray color

  const rightX = pageWidth - margin;
  const lineSpacing = 5;

  doc.text(`${dateStr} ${timeStr}`, rightX, 10, { align: "right" });
  doc.text("BAU - Faculty of Medicine", rightX, 10 + lineSpacing, {
    align: "right",
  });

  // Top-left corner: Student Number & Group Number
  const studentNumber =
    document.getElementById("student-number")?.value.trim() || "Unknown Number";

  const leftX = margin;
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text(`STDNT::${studentNumber}`, leftX, 10);
  doc.text(`GRP::${groupNumber}`, leftX, 10 + lineSpacing); // reuse existing groupNumber

  // Sections array
  const sections = [
    {
      title: "Patient Information",
      fields: ["patient-name", "date", "age", "gender"],
    },
    { title: "Chief Complaint", fields: ["chief-complaint"] },
    {
      title: "Socrates",
      fields: [
        "site",
        "onset",
        "character",
        "radiation",
        "associated",
        "timing",
        "exacerbating",
        "severity",
      ],
    },
    {
      title: "Past Medical & Surgical History",
      fields: ["past-medical", "past-surgical"],
    },
    {
      title: "Drug History",
      fields: ["regular-meds", "otc", "drug-allergies"],
    },
    { title: "Family History", fields: ["family-history"] },
    {
      title: "Social History",
      fields: ["smoking", "alcohol", "occupation", "living", "travel"],
    },
    { title: "ICE (Ideas, Concerns, Expectations)", fields: ["ice"] },
    { title: "Review of Systems", fields: [] }, // ROS handled specially
  ];

  function getElementValue(id) {
    const el = form.querySelector(`#${id}`);
    if (!el) return "";
    if (el.type === "checkbox") return el.checked ? "Yes" : "No";
    if (el.type === "radio") return el.checked ? el.value : "";
    if (el.tagName === "SELECT")
      return el.options[el.selectedIndex]?.text || "";
    return el.value || "";
  }

  function drawSectionHeader(text) {
    const headerHeight = 15;
    if (y + headerHeight + 10 > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.setFillColor(...blueColor);
    doc.setDrawColor(...blueColor);
    doc.rect(margin, y, pageWidth - margin * 2, headerHeight, "F");
    doc.setTextColor(255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    const rectMiddleY = y + headerHeight / 2 + 2; // no extra padding

    doc.text(text, pageWidth / 2, rectMiddleY, { align: "center" });

    y += headerHeight + 10;
    doc.setTextColor(0);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
  }

  function writeField(label, value) {
    const labelX = margin;
    const valueX = margin + 80;
    const valueFontSize = 12;

    const splitValue = doc.splitTextToSize(value, pageWidth - valueX - margin);

    if (y + baseLineHeight * splitValue.length > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(label + ":", labelX, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(valueFontSize);
    doc.text(splitValue, valueX, y);

    y += baseLineHeight * splitValue.length + 5;
    doc.setFontSize(12);
  }

  // Gather all ROS symptoms grouped by system
  function getROSGrouped() {
    const rosCheckboxes = form.querySelectorAll("input.ros");
    const rosBySystem = {};
    rosCheckboxes.forEach((checkbox) => {
      if (!checkbox.checked) return;
      const system = checkbox.getAttribute("data-system") || "Other";
      if (!rosBySystem[system]) rosBySystem[system] = [];
      rosBySystem[system].push(checkbox.value);
    });
    return rosBySystem;
  }

  // Custom smart wrapper to avoid breaking words mid-line
  function smartSplitTextToSize(text, maxWidth) {
    const words = text.split(" ");
    let lines = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine ? currentLine + " " + word : word;
      const testWidth = doc.getTextWidth(testLine);
      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  // Draw table for ROS symptoms with wrapped text and dynamic row height
  function drawROSTable(rosBySystem) {
    const systems = Object.keys(rosBySystem);
    if (systems.length === 0) return;

    const colWidth = (pageWidth - 2 * margin) / systems.length;
    const paddingX = 8; // padding inside cells
    const paddingY = 4;
    const lineHeight = 7;

    let maxRows = 0;
    systems.forEach((sys) => {
      if (rosBySystem[sys].length > maxRows) maxRows = rosBySystem[sys].length;
    });

    // Wrap text for each cell using smartSplitTextToSize
    const wrappedSymptoms = [];
    for (let row = 0; row < maxRows; row++) {
      wrappedSymptoms[row] = [];
      for (let i = 0; i < systems.length; i++) {
        const sys = systems[i];
        const symptom = rosBySystem[sys][row] || "";
        wrappedSymptoms[row][i] = symptom
          ? smartSplitTextToSize(`• ${symptom}`, colWidth - paddingX * 2)
          : [];
      }
    }

    // Calculate row heights based on max wrapped lines per row
    const rowHeights = wrappedSymptoms.map((row) => {
      let maxLines = 1;
      row.forEach((cell) => {
        if (cell.length > maxLines) maxLines = cell.length;
      });
      return maxLines * lineHeight + paddingY * 2;
    });

    const headerHeight = lineHeight + paddingY * 2;
    const totalTableHeight =
      rowHeights.reduce((a, b) => a + b, 0) + headerHeight + 10;

    // Page break if not enough space
    if (y + totalTableHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }

    // Draw header
    doc.setFillColor(...blueColor);
    doc.setDrawColor(...blueColor);
    doc.setLineWidth(1);
    doc.rect(margin, y, pageWidth - margin * 2, headerHeight, "F");

    const tableTop = y;
    const tableLeft = margin;
    const tableWidth = pageWidth - margin * 2;

    // Header text with smaller font size (10 instead of 12)
    doc.setTextColor(255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    systems.forEach((sys, i) => {
      const x = margin + i * colWidth + paddingX;
      const textY = y + headerHeight / 2 + 3;
      doc.text(sys, x, textY);
    });
    y += headerHeight;

    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    for (let row = 0; row < maxRows; row++) {
      if (y + rowHeights[row] > pageHeight - margin) {
        // Draw outer border before page break
        doc.setDrawColor(...blueColor);
        doc.setLineWidth(1);
        doc.rect(tableLeft, tableTop, tableWidth, y - tableTop);

        doc.addPage();
        y = margin;

        // Redraw header with smaller font size (10)
        doc.setFillColor(...blueColor);
        doc.setDrawColor(...blueColor);
        doc.setLineWidth(1);
        doc.rect(margin, y, pageWidth - margin * 2, headerHeight, "F");

        doc.setTextColor(255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        systems.forEach((sys, i) => {
          const x = margin + i * colWidth + paddingX;
          const textY = y + headerHeight / 2 + 3;
          doc.text(sys, x, textY);
        });

        y += headerHeight;

        doc.setTextColor(0);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
      }

      // Zebra stripe background
      if (row % 2 === 1) {
        doc.setFillColor(230, 245, 245);
        doc.rect(margin, y, pageWidth - margin * 2, rowHeights[row], "F");
      }

      // Draw horizontal line above row
      doc.setDrawColor(...blueColor);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);

      // Draw each cell text with smaller font size
      for (let i = 0; i < systems.length; i++) {
        const x = margin + i * colWidth + paddingX;
        const cellLines = wrappedSymptoms[row][i];
        if (cellLines.length > 0) {
          const textY = y + paddingY + lineHeight - 2;

          doc.setFontSize(8); // smaller font inside cells
          doc.text(cellLines, x, textY);
          doc.setFontSize(10); // reset font size
        }
      }

      y += rowHeights[row];

      // Draw horizontal line below row
      doc.line(margin, y, pageWidth - margin, y);
    }

    // Draw vertical lines and outer border
    doc.setDrawColor(...blueColor);
    doc.setLineWidth(1);
    for (let i = 0; i <= systems.length; i++) {
      const x = margin + i * colWidth;
      doc.line(x, tableTop, x, y);
    }
  }

  sections.forEach((section, index) => {
    // Skip ICE and ROS here — we will add them together at the end on same page
    if (
      section.title === "Review of Systems" ||
      section.title === "ICE (Ideas, Concerns, Expectations)"
    )
      return;

    // Add page breaks before specific sections
    if (index === 1) {
      // Before HPC – SOCRATES
      doc.addPage();
      y = margin;
    } else if (index === 3) {
      // Before Past Medical & Surgical History
      doc.addPage();
      y = margin;
    } else if (index === 6) {
      // Before Social History
      doc.addPage();
      y = margin;
    }

    drawSectionHeader(section.title);
    section.fields.forEach((fieldId) => {
      const val = getElementValue(fieldId);
      if (val.trim() === "") return;
      writeField(getLabelText(form.querySelector(`#${fieldId}`)), val);
    });
  });

  // Add a page before ICE + ROS to ensure they are on the last page
  doc.addPage();
  y = margin;

  // Draw ICE section
  const iceVal = getElementValue("ice");
  if (iceVal.trim() !== "") {
    drawSectionHeader("ICE (Ideas, Concerns, Expectations)");
    writeField("ICE", iceVal);
  }

  // Draw Review of Systems section immediately after ICE
  const rosBySystem = getROSGrouped();
  if (Object.keys(rosBySystem).length > 0) {
    drawSectionHeader("Review of Systems");
    drawROSTable(rosBySystem);
  }

  // === ADD NEW PAGE BEFORE SUMMARY AND DDx ===
  doc.addPage();
  y = margin;

  // Your generateSummaryParagraph(), draw summary header, write summary text, suggestDDx(), draw ddx header and list code here (see full snippet from previous message)

  // Save file
  let patientName =
    document.getElementById("patient-name")?.value.trim() || "Unknown";
  patientName = patientName.replace(/\s+/g, "_").replace(/[^\w\-]/g, "");

  // ----------- Generate Summary Paragraph -----------
  function generateSummaryParagraph() {
    const patientName = getElementValue("patient-name") || "The patient";
    const age = getElementValue("age");
    const gender = getElementValue("gender");
    const cc = getElementValue("chief-complaint");

    const site = getElementValue("site");
    const onset = getElementValue("onset");
    const character = getElementValue("character");
    const radiation = getElementValue("radiation");
    const associated = getElementValue("associated");
    const timing = getElementValue("timing");
    const exacerbating = getElementValue("exacerbating");
    const severity = getElementValue("severity");

    const pmh = getElementValue("past-medical");
    const psh = getElementValue("past-surgical");
    const meds = getElementValue("regular-meds");
    const allergies = getElementValue("drug-allergies");
    const family = getElementValue("family-history");

    const smoking = getElementValue("smoking");
    const alcohol = getElementValue("alcohol");
    const occupation = getElementValue("occupation");
    const living = getElementValue("living");
    const travel = getElementValue("travel");

    const ice = getElementValue("ice");

    const rosBySystem = getROSGrouped();
    // Flatten ROS without headings, just list all symptoms separated by commas
    const rosSymptoms = [];
    Object.values(rosBySystem).forEach((symptoms) => {
      rosSymptoms.push(...symptoms);
    });
    const rosSummary = rosSymptoms.join(", ");

    // Start building the paragraph
    let paragraph = patientName;

    if (age && gender) {
      paragraph += ` is a ${age}-year-old ${gender}`;
    } else if (age) {
      paragraph += ` is a ${age}-year-old`;
    } else if (gender) {
      paragraph += ` is a ${gender}`;
    }

    if (cc) {
      paragraph += ` presenting with ${cc}`;
    }

    // SOCRATES details
    const socratesParts = [];
    if (site) socratesParts.push(`located at the ${site}`);
    if (onset) socratesParts.push(`with an onset of ${onset}`);
    if (character) socratesParts.push(`characterized as ${character}`);
    if (radiation) socratesParts.push(`radiating to ${radiation}`);
    if (associated) socratesParts.push(`associated with ${associated}`);
    if (timing) socratesParts.push(`occurring ${timing}`);
    if (exacerbating) socratesParts.push(`exacerbated by ${exacerbating}`);
    if (severity) socratesParts.push(`with a severity rated as ${severity}`);

    if (socratesParts.length > 0) {
      paragraph += `, ${socratesParts.join(", ")}`;
    }

    paragraph += ".";

    if (pmh) paragraph += ` Past medical history is significant for ${pmh}.`;
    if (psh) paragraph += ` Surgical history includes ${psh}.`;
    if (meds) paragraph += ` Current medications include ${meds}.`;
    if (allergies) paragraph += ` Known drug allergies are ${allergies}.`;
    if (family) paragraph += ` Family history reveals ${family}.`;

    // Social history parts
    const socialParts = [];
    if (smoking) socialParts.push(`smokes ${smoking}`);
    if (alcohol) socialParts.push(`consumes alcohol ${alcohol}`);
    if (occupation) socialParts.push(`works as a(n) ${occupation}`);
    if (living) socialParts.push(`lives in ${living}`);
    if (travel) socialParts.push(`recent travel history includes ${travel}`);

    if (socialParts.length > 0) {
      paragraph += ` Social history shows that the patient ${socialParts.join(
        ", "
      )}.`;
    }

    if (rosSummary) paragraph += ` Review of systems reveals ${rosSummary}.`;
    if (ice) {
      const iceLower = ice.trim().toLowerCase();
      if (
        iceLower.startsWith("patient") ||
        iceLower.startsWith("the patient")
      ) {
        paragraph += ` ICE summary: ${ice.trim()}.`;
      } else {
        paragraph += ` ICE summary: ${ice.trim()}.`;
      }
    }

    return paragraph;
  }

  // ----------- Append Summary to PDF -----------
  drawSectionHeader("History Summary");
  const summaryParagraph = generateSummaryParagraph();
  const summaryLines = smartSplitTextToSize(
    summaryParagraph,
    pageWidth - 2 * margin
  );
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * baseLineHeight; // remove +10 or make it smaller like +3

  function suggestDDx(chiefComplaint, summaryParagraph) {
    const text = (chiefComplaint + " " + summaryParagraph).toLowerCase();

    function containsAny(words) {
      return words.some((word) => new RegExp(`\\b${word}\\b`, "i").test(text));
    }

    // Map of symptom keywords to their differential diagnosis arrays
    const ddxMap = [
      {
        keys: [
          "chest pain",
          "pain in chest",
          "angina",
          "tightness in chest",
          "shortness of breath",
          "dyspnea",
          "palpitations",
        ],
        ddx: [
          "Acute coronary syndrome, including unstable angina and myocardial infarction",
          "Pericarditis and pericardial effusion",
          "Pulmonary embolism presenting with pleuritic chest pain",
          "Aortic dissection with sudden severe chest pain",
          "Gastroesophageal reflux disease causing heartburn",
          "Costochondritis and musculoskeletal chest wall pain",
          "Pneumothorax causing sudden chest pain and respiratory distress",
        ],
      },
      {
        keys: [
          "fever",
          "pyrexia",
          "chills",
          "cough",
          "productive cough",
          "sputum",
          "shortness of breath",
          "dyspnea",
          "difficulty breathing",
        ],
        ddx: [
          "Community-acquired bacterial pneumonia",
          "Viral pneumonitis including COVID-19 and influenza",
          "Acute bronchitis",
          "Pulmonary tuberculosis",
          "Exacerbation of chronic obstructive pulmonary disease",
          "Asthma exacerbation",
          "Interstitial lung disease",
        ],
      },
      {
        keys: [
          "abdominal pain",
          "pain in abdomen",
          "right upper quadrant pain",
          "right lower quadrant pain",
          "epigastric pain",
          "periumbilical pain",
          "colicky pain",
        ],
        ddx: [
          "Acute appendicitis",
          "Acute cholecystitis or biliary colic",
          "Acute pancreatitis",
          "Peptic ulcer disease with possible perforation",
          "Small or large bowel obstruction",
          "Inflammatory bowel disease such as Crohn's disease or ulcerative colitis",
          "Diverticulitis",
          "Ectopic pregnancy in women of childbearing age",
        ],
      },
      {
        keys: [
          "weight loss",
          "unintentional weight loss",
          "night sweats",
          "profuse sweating at night",
          "fatigue",
          "tiredness",
        ],
        ddx: [
          "Lymphoma including Hodgkin and non-Hodgkin types",
          "Pulmonary tuberculosis",
          "Chronic infections such as HIV/AIDS",
          "Malignancies including lung, gastrointestinal, or hematologic cancers",
          "Hyperthyroidism",
          "Systemic autoimmune diseases such as systemic lupus erythematosus",
        ],
      },
      {
        keys: [
          "headache",
          "head pain",
          "migraine",
          "cluster headache",
          "head pressure",
        ],
        ddx: [
          "Migraine headache with or without aura",
          "Tension-type headache",
          "Cluster headache",
          "Sinusitis",
          "Intracranial mass lesions including tumors or abscess",
          "Temporal arteritis in patients over 50 years with scalp tenderness",
          "Subarachnoid hemorrhage presenting with sudden 'thunderclap' headache",
        ],
      },
      {
        keys: [
          "joint pain",
          "arthritis",
          "swollen joints",
          "morning stiffness",
          "joint redness",
          "joint deformity",
        ],
        ddx: [
          "Osteoarthritis, degenerative joint disease",
          "Rheumatoid arthritis, autoimmune inflammatory arthritis",
          "Gout, crystal-induced arthritis",
          "Systemic lupus erythematosus",
          "Septic (infectious) arthritis",
          "Psoriatic arthritis",
        ],
      },
      {
        keys: [
          "dizziness",
          "vertigo",
          "lightheadedness",
          "syncope",
          "fainting",
          "weakness",
          "numbness",
          "paresthesia",
        ],
        ddx: [
          "Orthostatic hypotension causing syncope",
          "Vasovagal syncope triggered by stress or pain",
          "Cardiac arrhythmias including atrial fibrillation",
          "Transient ischemic attack or ischemic stroke",
          "Peripheral neuropathy",
          "Multiple sclerosis",
          "Benign paroxysmal positional vertigo",
        ],
      },
      {
        keys: ["rash", "skin lesions", "itching", "pruritus", "erythema"],
        ddx: [
          "Contact dermatitis due to allergens or irritants",
          "Psoriasis presenting with plaques and scaling",
          "Atopic dermatitis (eczema)",
          "Drug-induced skin eruptions",
          "Infectious etiologies such as herpes zoster, measles, or fungal infections",
          "Systemic lupus erythematosus with malar rash",
        ],
      },
      {
        keys: [
          "diarrhea",
          "loose stools",
          "frequent bowel movements",
          "constipation",
          "difficulty passing stool",
          "nausea",
          "vomiting",
        ],
        ddx: [
          "Infectious gastroenteritis",
          "Irritable bowel syndrome",
          "Inflammatory bowel disease including Crohn's disease and ulcerative colitis",
          "Colorectal cancer",
          "Medication side effects such as opioids causing constipation",
          "Bowel obstruction",
        ],
      },
      {
        keys: [
          "dysuria",
          "painful urination",
          "frequency",
          "urgency",
          "hematuria",
        ],
        ddx: [
          "Urinary tract infection",
          "Pyelonephritis",
          "Urolithiasis (kidney stones)",
          "Bladder cancer in patients with hematuria",
          "Prostatitis in males",
          "Interstitial cystitis",
        ],
      },
    ];

    let combinedDDx = [];

    // Check all symptom clusters and combine DDx if matches found
    for (const cluster of ddxMap) {
      if (containsAny(cluster.keys)) {
        combinedDDx = combinedDDx.concat(cluster.ddx);
      }
    }

    // Deduplicate entries
    combinedDDx = [...new Set(combinedDDx)];

    // Limit total DDx to max 10 entries
    if (combinedDDx.length > 10) {
      combinedDDx = combinedDDx.slice(0, 10);
    }

    // If no matches, add a general note
    if (combinedDDx.length === 0) {
      combinedDDx.push(
        "Symptoms are non-specific; further detailed clinical evaluation is necessary to determine diagnosis."
      );
    }

    return combinedDDx;
  }

  drawSectionHeader("Suggested Differential Diagnoses");
  const ddx = suggestDDx(getElementValue("chief-complaint"), summaryParagraph);
  doc.text(
    ddx.map((d, i) => `${i + 1}. ${d}`),
    margin,
    y
  );
  y += ddx.length * baseLineHeight + 10;

  doc.save(
    `${patientName}_History_${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}_${now
      .getHours()
      .toString()
      .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}.pdf`
  );
});

window.addEventListener("load", () => {
  const sections = document.querySelectorAll(".form-section.animate-on-load");
  sections.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.2}s`;
  });
});

/**---------------- */

// Call this function every time you inject the history form HTML
function animateHistoryForm() {
  const container = document.getElementById("history-form-container");
  if (!container) return;

  const elementsToAnimate = [
    container.querySelector("h2"),
    ...container.querySelectorAll(".form-section"),
  ].filter(Boolean);

  // Reset animation state
  elementsToAnimate.forEach((el) => {
    el.classList.remove("animate-on-load");
    el.style.opacity = "0";
    el.style.animationDelay = "";
  });

  // Trigger animation with staggered delays
  elementsToAnimate.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("animate-on-load");
      el.style.animationDelay = `${i * 0.1}s`;
    }, 50);
  });
}

// Call this to bind event listeners after injecting HTML
function setupHistoryFormEvents() {
  const btn = document.getElementById("submit-and-download");
  if (!btn) return;

  btn.onclick = () => {
    // Your PDF generation code here, or call your existing function
    console.log("Submit & Download clicked");
  };
}

// Example: call this after you inject the history form HTML into the DOM
function onHistoryFormInjected() {
  animateHistoryForm();
  setupHistoryFormEvents();
}

// Example usage:
// After injecting your HTML dynamically, call:
onHistoryFormInjected();
