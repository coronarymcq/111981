// Use var to avoid redeclaration errors
var contactContainer = document.getElementById("contact-container");

// Check if the element exists to avoid errors
if (contactContainer) {
  // Get all sections that need to be animated within that container
  const sections = contactContainer.querySelectorAll(".scroll-section");

  // Function to check if the section is visible on the screen
  function checkVisibility() {
    const windowHeight = window.innerHeight;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      if (sectionTop < windowHeight && sectionBottom >= 0) {
        section.classList.add("visible"); // Add visible once
      }
      // No removal of the class to keep it visible
    });
  }

  // Run the function on scroll
  window.addEventListener("scroll", checkVisibility);

  // Run the function initially, in case the user is already at a certain scroll position
  checkVisibility();
}

/*-----------------------------------------------*/

var targetPeakCount = 18500;
var peakCountElement = document.getElementById("count");
var hasPeakAnimated = false; // Flag to prevent multiple animations

// Function to animate the Peak views count
var countUpPeak = function () {
  var currentCount = 0;
  var increment = Math.ceil(targetPeakCount / 300); // Slower increment value for smoother animation

  var updateCount = function () {
    if (currentCount < targetPeakCount) {
      currentCount += increment;
      if (currentCount > targetPeakCount) currentCount = targetPeakCount; // Clamp the value
      peakCountElement.innerText = currentCount.toLocaleString(); // Format number with commas
      requestAnimationFrame(updateCount);
    }
  };

  updateCount();
};

// Create an Intersection Observer for the Peak views section
var peakObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting && !hasPeakAnimated) {
      hasPeakAnimated = true; // Set the flag to true to prevent multiple counts
      countUpPeak();
    }
  });
});

// Observe the Peak views section
peakObserver.observe(document.getElementById("section2"));

/*----------------------------------------------------*/

var currentCount = 0; // Keep track of the current displayed count
var isCounting = false; // Track if the counting animation is currently running
var hasAnimated = false; // Flag to track if the animation has already completed
var targetNumber = 800; // Final subscriber count

// Function to animate the subscriber count
var animateNumber = function () {
  var increment = Math.ceil(targetNumber / 300); // Slower increment for smoother animation
  var subscriberCountElement = document.getElementById("subscriberCount");

  // Ensure no multiple animations run at the same time
  if (isCounting) return;

  isCounting = true; // Set counting to true
  currentCount = 0; // Reset current count

  var updateCount = function () {
    if (currentCount < targetNumber) {
      currentCount += increment;
      if (currentCount > targetNumber) currentCount = targetNumber; // Clamp to target number
      subscriberCountElement.innerText = currentCount.toLocaleString(); // Format number with commas
      requestAnimationFrame(updateCount); // Continue animation
    } else {
      isCounting = false; // Stop animation when complete
      hasAnimated = true; // Mark as animated
      subscriberCountElement.innerText += "+"; // Add '+' when the final value is reached
    }
  };

  updateCount(); // Start the counting animation
};

// Start the animation when the section becomes visible (for demonstration)
// Rename "observer" to "subscriberObserver" to avoid redeclaration conflicts
var subscriberObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        // Only start counting if not already animated
        animateNumber(); // Start counting when the section becomes visible
      }
    });
  },
  { threshold: 0.1 }
); // Trigger when 10% of the section is visible

// Observe the section for visibility (section3)
subscriberObserver.observe(document.getElementById("section3"));

/*-------------------------------------------------*/

var targetMCQCount = 1000;
var mcqCountElement = document.getElementById("mcqs");
var hasMCQAnimated = false; // Flag to prevent multiple animations

// Function to animate the MCQs count
var countUpMCQs = function () {
  var currentCount = 0;
  var increment = Math.ceil(targetMCQCount / 300); // Slower increment value for smoother animation

  var updateCount = function () {
    if (currentCount < targetMCQCount) {
      currentCount += increment;
      mcqCountElement.innerText = currentCount.toLocaleString(); // Format number with commas
      requestAnimationFrame(updateCount);
    } else {
      mcqCountElement.innerText = targetMCQCount.toLocaleString() + "+"; // Ensure it ends at the target number with '+'
    }
  };

  updateCount();
};

// Create an Intersection Observer for the MCQs section
var mcqsObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting && !hasMCQAnimated) {
      hasMCQAnimated = true; // Set the flag to true to prevent multiple counts
      countUpMCQs();
    }
  });
});

// Observe the MCQs section
mcqsObserver.observe(document.getElementById("section4"));

/*------------------------------------------*/

/* // Function to set the logo based on the theme
function setLogoBasedOnTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"; // Default to light theme
  const logoImg = document.querySelector(".logo-aboutus"); // Select the logo image

  // Set the appropriate logo based on the theme
  if (logoImg) {
    if (savedTheme === "dark") {
      logoImg.src = "icons/logo-dark.webp"; // Dark theme logo
    } else {
      logoImg.src = "icons/logo.webp"; // Light theme logo
    }
  } else {
    console.error("Element with class 'logo-aboutus' not found.");
  }
}

// Call this function to set the logo when the script loads
setLogoBasedOnTheme();
  */

document.querySelectorAll(".homeLink").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior
    loadContent("main"); // Fetch content for Home
  });
});

document.querySelectorAll(".lib").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior
    loadContent("library"); // Fetch content for Home
  });
});

/*---------------------------------------*/

/* 
(async () => {
  const pdfjsLib = await import("../../pdfjs/build/pdf.mjs"); // Adjust the path to pdf.mjs
  pdfjsLib.GlobalWorkerOptions.workerSrc = "../../pdfjs/build/pdf.worker.mjs"; // Adjust the path to pdf.worker.mjs

  const url = "CORONARY FINAL PUBLIC HEALTH.pdf"; // Path to your PDF file
  let pdfDoc = null; // Variable to hold the PDF document
  let currentPage = 1; // Track the current page number
  let scale = 1.6; // Initial scale (zoom level)

  const loadPDF = async (url) => {
    try {
      const loadingTask = pdfjsLib.getDocument(url);
      pdfDoc = await loadingTask.promise;
      renderPage(currentPage); // Render the first page
    } catch (error) {
      console.error("Error loading PDF: ", error);
    }
  };

  const renderPage = async (pageNum) => {
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    // Clear the viewer before rendering a new page
    const pdfViewer = document.getElementById("pdf-viewer");
    pdfViewer.innerHTML = ""; // Clear previous canvases

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    pdfViewer.appendChild(canvas); // Append the new canvas

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;

    // Update page info
    document.getElementById(
      "page-info"
    ).textContent = `Page ${pageNum} of ${pdfDoc.numPages}`;
  };

  const scrollToTop = (pdfViewer) => {
    // Scroll to the top of the PDF viewer
    pdfViewer.scrollTop = 0; // Set scrollTop to 0 to ensure the upper part is visible
  };

  // Handle Previous Page
  document.getElementById("prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  });

  // Handle Next Page
  document.getElementById("next-page").addEventListener("click", () => {
    if (currentPage < pdfDoc.numPages) {
      currentPage++;
      renderPage(currentPage);
    }
  });

  // Handle Zoom In
  document.getElementById("zoom-in").addEventListener("click", () => {
    scale += 0.1; // Increase scale by 10%
    renderPage(currentPage); // Re-render the current page
  });

  // Handle Zoom Out
  document.getElementById("zoom-out").addEventListener("click", () => {
    if (scale > 0.1) {
      // Prevent zooming out too much
      scale -= 0.1; // Decrease scale by 10%
      renderPage(currentPage); // Re-render the current page
    }
  });

  loadPDF(url);
})(); */

/*-------------------------------------------*/

document.querySelectorAll(".toolbut button").forEach((button) => {
  button.addEventListener("touchstart", () => {
    button.classList.add("touched"); // Add class on touch
  });

  button.addEventListener("touchend", () => {
    button.classList.remove("touched"); // Remove class when touch ends
  });

  // Optional: Prevents color change on click after touch
  button.addEventListener("mousedown", () => {
    button.classList.add("touched");
  });

  button.addEventListener("mouseup", () => {
    button.classList.remove("touched");
  });
});

/*-------------------------------------------*/
