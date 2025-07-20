function toggleDropdown() {
  const dropdown = document.getElementById("settings-dropdown");
  dropdown.style.display =
    dropdown.style.display === "none" || dropdown.style.display === ""
      ? "block"
      : "none";

  // Close both dropdowns if the settings dropdown is being closed
  if (dropdown.style.display === "none") {
    closeAllDropdowns();
  }
}

function toggleLangDropdown() {
  const langDropdown = document.getElementById("lang-dropdown");
  const themeDropdown = document.getElementById("theme-dropdown");
  const langButton = document.querySelector(".lang-button");

  // Toggle the language dropdown
  langDropdown.style.display =
    langDropdown.style.display === "none" || langDropdown.style.display === ""
      ? "block"
      : "none";

  // If opening language dropdown, close theme dropdown
  if (langDropdown.style.display === "block") {
    themeDropdown.style.display = "none";
    langButton.classList.add("active"); // Add active class
  }
}

function toggleThemeDropdown() {
  const themeDropdown = document.getElementById("theme-dropdown");
  const langDropdown = document.getElementById("lang-dropdown");
  const langButton = document.querySelector(".lang-button");

  // Toggle the theme dropdown
  themeDropdown.style.display =
    themeDropdown.style.display === "none" || themeDropdown.style.display === ""
      ? "block"
      : "none";

  // If opening theme dropdown, close language dropdown
  if (themeDropdown.style.display === "block") {
    langDropdown.style.display = "none";
    langButton.classList.add("active"); // Keep the active state
  }
}

function closeAllDropdowns() {
  const langDropdown = document.getElementById("lang-dropdown");
  const themeDropdown = document.getElementById("theme-dropdown");
  langDropdown.style.display = "none"; // Close the language dropdown
  themeDropdown.style.display = "none"; // Close the theme dropdown
}

// Dummy theme functions (implement your actual theme switching logic)
function setLightTheme() {
  // Implement light theme logic here
  console.log("Light theme selected");
}

function setDarkTheme() {
  // Implement dark theme logic here
  console.log("Dark theme selected");
}

// Close the dropdown if clicked outside
window.onclick = function (event) {
  if (
    !event.target.matches(".lang-button") &&
    !event.target.matches(".lang-toggle") &&
    !event.target.matches(".th-toggle") &&
    !event.target.closest(".dropdown-content")
  ) {
    // Check if clicked outside dropdown content
    const dropdowns = document.getElementsByClassName("dropdown-content");
    Array.from(dropdowns).forEach((openDropdown) => {
      if (openDropdown.style.display === "block") {
        openDropdown.style.display = "none";
      }
    });

    closeAllDropdowns(); // Close both nested dropdowns
    document.querySelector(".lang-button").classList.remove("active"); // Reset active class
  } else {
    // If clicked inside the dropdowns, keep the lang-button active
    const langDropdown = document.getElementById("lang-dropdown");
    const themeDropdown = document.getElementById("theme-dropdown");
    const langButton = document.querySelector(".lang-button");

    if (
      langDropdown.style.display === "block" ||
      themeDropdown.style.display === "block"
    ) {
      langButton.classList.add("active"); // Keep the active class if dropdown is open
    }
  }
};

const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTopButton.classList.add("show");
    backToTopButton.classList.remove("fade-out");
  } else {
    backToTopButton.classList.add("fade-out");
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
