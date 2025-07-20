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
