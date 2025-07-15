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
  let y = margin;

  const blueColor = [30, 144, 255]; // DodgerBlue

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

  // Student info centered below title
  const studentName =
    document.getElementById("student-name")?.value || "Unknown Student";
  const rotation =
    document.getElementById("rotation")?.value || "Unknown Rotation";
  const groupNumber =
    document.getElementById("group-number")?.value || "Unknown Group";

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0);

  const studentInfoText = `Student: ${studentName}    Rotation: ${rotation}    Group: ${groupNumber}`;
  doc.text(studentInfoText, pageWidth / 2, y + 10, { align: "center" });

  y += 30;

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

  // Reset font size and color for the rest of the page content
  doc.setFontSize(12);
  doc.setTextColor(0);

  // Sections array
  const sections = [
    {
      title: "Patient Information",
      fields: ["patient-name", "date", "age", "gender"],
    },
    { title: "Chief Complaint", fields: ["chief-complaint"] },
    {
      title: "HPC – SOCRATES",
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
    doc.setFontSize(16);
    doc.text(text, margin + 5, y + 11);
    y += headerHeight + 10;
    doc.setTextColor(0);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
  }

  function writeField(label, value) {
    const labelX = margin;
    const valueX = margin + 80;
    const valueFontSize = 10;

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

  // Draw table for ROS symptoms with wrapped text and dynamic row height
  function drawROSTable(rosBySystem) {
    const systems = Object.keys(rosBySystem);
    if (systems.length === 0) return;

    // Table dimensions
    const colWidth = (pageWidth - 2 * margin) / systems.length;
    const paddingX = 5;
    const paddingY = 3;
    const lineHeight = 7;

    // Find max number of symptoms in any system for number of rows
    let maxRows = 0;
    systems.forEach((sys) => {
      if (rosBySystem[sys].length > maxRows) maxRows = rosBySystem[sys].length;
    });

    // Prepare wrapped symptoms per cell to calculate max height per row
    const wrappedSymptoms = [];
    for (let row = 0; row < maxRows; row++) {
      wrappedSymptoms[row] = [];
      for (let i = 0; i < systems.length; i++) {
        const sys = systems[i];
        const symptom = rosBySystem[sys][row] || "";
        if (symptom) {
          // wrap text inside cell width minus padding
          wrappedSymptoms[row][i] = doc.splitTextToSize(
            `• ${symptom}`,
            colWidth - paddingX * 2
          );
        } else {
          wrappedSymptoms[row][i] = [];
        }
      }
    }

    // Calculate height for each row (based on max wrapped lines in that row)
    const rowHeights = wrappedSymptoms.map((row) => {
      let maxLines = 1;
      row.forEach((cell) => {
        if (cell.length > maxLines) maxLines = cell.length;
      });
      return maxLines * lineHeight + paddingY * 2;
    });

    // Check page break for table header + rows
    const totalTableHeight =
      rowHeights.reduce((a, b) => a + b, 0) + lineHeight + 10;
    if (y + totalTableHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }

    // Draw header background
    doc.setFillColor(...blueColor);
    doc.setDrawColor(...blueColor);
    const headerHeight = lineHeight + paddingY * 2;
    doc.rect(margin, y, pageWidth - margin * 2, headerHeight, "F");

    // Header text
    doc.setTextColor(255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    systems.forEach((sys, i) => {
      const x = margin + i * colWidth + paddingX;
      doc.text(sys, x, y + headerHeight - paddingY - 1);
    });

    y += headerHeight;

    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    // Draw rows with wrapped text
    for (let row = 0; row < maxRows; row++) {
      if (y + rowHeights[row] > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      // Draw horizontal line above row
      doc.setDrawColor(...blueColor);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);

      // Draw each cell text
      for (let i = 0; i < systems.length; i++) {
        const x = margin + i * colWidth + paddingX;
        const cellLines = wrappedSymptoms[row][i];
        if (cellLines.length > 0) {
          doc.text(cellLines, x, y + paddingY + lineHeight - 2);
        }
      }

      y += rowHeights[row];

      // Draw horizontal line below row
      doc.line(margin, y, pageWidth - margin, y);
    }

    // Draw vertical lines between columns
    for (let i = 0; i <= systems.length; i++) {
      const x = margin + i * colWidth;
      doc.line(x, y - totalTableHeight, x, y);
    }
  }

  // Loop all sections except ROS
  sections.forEach((section) => {
    if (section.title === "Review of Systems") return; // skip ROS here
    drawSectionHeader(section.title);
    section.fields.forEach((fieldId) => {
      const val = getElementValue(fieldId);
      if (val.trim() === "") return;
      writeField(getLabelText(form.querySelector(`#${fieldId}`)), val);
    });
  });

  // Now draw single Review of Systems section with table
  drawSectionHeader("Review of Systems");
  const rosBySystem = getROSGrouped();
  drawROSTable(rosBySystem);

  // Save file
  let patientName =
    document.getElementById("patient-name")?.value.trim() || "Unknown";
  patientName = patientName.replace(/\s+/g, "_").replace(/[^\w\-]/g, "");

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
