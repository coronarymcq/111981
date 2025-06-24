// Apply saved theme and update everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "Dark";
  applyTheme(savedTheme);
  preloadLogos();
});

// Toggle theme when the icon is clicked
function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
}

// Apply theme globally
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateThemeIcon(theme);
  updateAllLogos(theme);
  updateDiagnosisIcon(theme);
}

// Update the dark/light mode toggle icon with smooth fade transition
function updateThemeIcon(theme) {
  const themeIcon = document.getElementById("themeIcon");
  if (!themeIcon) return;

  themeIcon.style.transition = "transform 0.15s ease";
  themeIcon.style.transform = "scale(0.8)";

  setTimeout(() => {
    themeIcon.src = theme === "dark" ? "icons/LMI.svg" : "icons/DMI.svg";
    themeIcon.style.transform = "scale(1)";
  }, 150);
}

// Update all logos based on theme
function updateAllLogos(theme) {
  const mainLogo = document.getElementById("main-logo");
  const hoverLogo = document.getElementById("hover-logo");
  const aboutLogo = document.querySelector(".logo-aboutus");

  if (mainLogo) {
    mainLogo.src =
      theme === "dark" ? "icons/dark-logo.webp" : "icons/header-logo-2.webp";
  }

  if (hoverLogo) {
    hoverLogo.src =
      theme === "dark" ? "icons/dark-logo-line.webp" : "icons/header-logo.webp";
  }

  if (aboutLogo) {
    aboutLogo.src =
      theme === "dark" ? "icons/logo-dark.webp" : "icons/logo.webp";
  }
}

// Update diagnosis icon based on theme
function updateDiagnosisIcon(theme) {
  const diagnosisIcon = document.getElementById("diagnosis-icon");
  if (diagnosisIcon) {
    diagnosisIcon.src =
      theme === "dark" ? "icons/diagnosis_white.png" : "icons/diagnosis.png";
  }
}

// Preload all theme-sensitive assets
function preloadLogos() {
  const logos = [
    "icons/dark-logo.webp",
    "icons/dark-logo-line.webp",
    "icons/header-logo-2.webp",
    "icons/header-logo.webp",
    "icons/logo-dark.webp",
    "icons/logo.webp",
    "icons/diagnosis.png",
    "icons/diagnosis_white.png",
    "icons/LMI.svg",
    "icons/DMI.svg",
  ];
  logos.forEach((src) => (new Image().src = src));
}

// Watch for diagnosis icon dynamically inserted into DOM
const observer = new MutationObserver((mutationsList) => {
  const theme = localStorage.getItem("theme") || "light";
  mutationsList.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const diagIcon = node.querySelector("#diagnosis-icon");
        if (diagIcon) {
          updateDiagnosisIcon(theme);
        }
      }
    });
  });
});

const mainContent = document.querySelector(".main");
if (mainContent) {
  observer.observe(mainContent, { childList: true, subtree: true });
}

// Ensure diagnosis icon is updated on full page load
window.addEventListener("load", () => {
  const theme = localStorage.getItem("theme") || "light";
  updateDiagnosisIcon(theme);
});
