// Sidebar toggle logic
document.querySelector(".nav-button").addEventListener("click", function () {
  const sidebar = document.querySelector(".side-bar-container");
  const header = document.querySelector(".header-container");
  const secondBar = document.getElementById("secondBar");

  if (sidebar.classList.contains("show")) {
    sidebar.classList.remove("show");

    setTimeout(() => {
      header.classList.remove("no-shadow");
    }, 300);

    secondBar.setAttribute("width", "70");
    secondBar.setAttribute("y", "70");
  } else {
    sidebar.classList.add("show");
    header.classList.add("no-shadow");
    secondBar.setAttribute("width", "0");
    secondBar.setAttribute("y", "40");
  }
});

// Navigation button click logic
document.querySelectorAll(".nav-bar, .nav-bar5").forEach((button) => {
  button.addEventListener("click", function () {
    const page = this.getAttribute("data-page");
    if (page) {
      loadContent(page);

      // Restore header and sidebar state
      const sidebar = document.querySelector(".side-bar-container");
      const header = document.querySelector(".header-container");
      const secondBar = document.getElementById("secondBar");

      if (sidebar.classList.contains("show")) {
        sidebar.classList.remove("show");
        setTimeout(() => {
          header.classList.remove("no-shadow");
        }, 300);
        secondBar.setAttribute("width", "70");
        secondBar.setAttribute("y", "70");
      }

      // Toggle active class
      document.querySelectorAll(".nav-bar, .nav-bar5").forEach((btn) => {
        btn.classList.remove("active");
      });
      this.classList.add("active");

      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
});

// Hide sidebar on scroll
window.addEventListener("scroll", function () {
  const sidebar = document.querySelector(".side-bar-container");
  const header = document.querySelector(".header-container");
  const secondBar = document.getElementById("secondBar");

  if (sidebar.classList.contains("show")) {
    sidebar.classList.remove("show");
    setTimeout(() => {
      header.classList.remove("no-shadow");
    }, 300);
    secondBar.setAttribute("width", "70");
    secondBar.setAttribute("y", "70");
  }
});

// Hide sidebar when clicking outside
document.addEventListener("click", function (event) {
  const sidebar = document.querySelector(".side-bar-container");
  const header = document.querySelector(".header-container");
  const navButton = document.querySelector(".nav-button");
  const secondBar = document.getElementById("secondBar");

  if (!sidebar.contains(event.target) && !navButton.contains(event.target)) {
    if (sidebar.classList.contains("show")) {
      sidebar.classList.remove("show");
      setTimeout(() => {
        header.classList.remove("no-shadow");
      }, 300);
      secondBar.setAttribute("width", "70");
      secondBar.setAttribute("y", "70");
    }
  }
});

// DOM Ready
document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector(".hover-logo");

  function updateLogoTitle(contentType) {
    logo.title = contentType === "" ? "" : "";
  }

  let currentContentType = sessionStorage.getItem("currentPage") || "home";
  updateLogoTitle(currentContentType);

  logo.onclick = function () {
    goHome();
  };

  window.addEventListener("load", function () {
    const storedPage = sessionStorage.getItem("currentPage");
    if (storedPage) {
      loadContent(storedPage);
      updateLogoTitle(storedPage);
    } else {
      loadContent("main");
    }
  });
});

// Go Home
function goHome() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

// Load content
function loadContent(page) {
  const mainContent = document.querySelector(".main");
  let filePath = "";
  let activeNavButton = "";
  let scriptPath = "";

  switch (page) {
    case "bau":
      filePath = "cont/00.bau/bau.html";
      scriptPath = "cont/00.bau/bau.js";
      activeNavButton = "nav-bar3";
      break;
    case "main":
      filePath = "cont/00.home/home.html";
      activeNavButton = "nav-bar1";
      break;
    case "contact":
      filePath = "cont/00.contact/contact.html";
      scriptPath = "cont/00.contact/contact.js";
      activeNavButton = "nav-bar4";
      break;
    case "library":
      filePath = "cont/00.library/library.html";
      activeNavButton = "nav-bar2";
      break;
    default:
      return;
  }

  fetch(filePath)
    .then((response) =>
      response.ok ? response.text() : Promise.reject("Failed to load")
    )
    .then((data) => {
      console.log("Loaded HTML:", data);
      mainContent.innerHTML = data;

      const counters = document.querySelectorAll(".info-container div.counter");

      if (page === "bau") {
        resetCounters(counters);
        startCounting();
      }

      document.querySelectorAll(".nav-bar, .nav-bar5").forEach((btn) => {
        btn.classList.remove("active");
      });
      document.getElementById(activeNavButton).classList.add("active");

      sessionStorage.setItem("currentPage", page);

      if (scriptPath) {
        loadScript(scriptPath);
      }
    })
    .catch((error) => console.error("Error loading content:", error));
}

// Load JS dynamically
function loadScript(scriptPath) {
  const scriptElement = document.createElement("script");
  scriptElement.src = scriptPath;
  scriptElement.onload = function () {
    console.log(`${scriptPath} loaded successfully.`);
  };
  scriptElement.onerror = function () {
    console.error(`Error loading ${scriptPath}`);
  };
  document.body.appendChild(scriptElement);
}

// Reset counters
function resetCounters() {
  const counters = document.querySelectorAll(".info-container div.counter");
  if (counters.length === 0) {
    console.warn("No counters found to reset.");
    return;
  }

  counters.forEach((counter) => {
    counter.innerText = "0";
  });
}

// Start counter animation
function startCounting() {
  const counters = document.querySelectorAll(".info-container .counter");

  counters.forEach((counter) => {
    let count = 0;
    const target = parseInt(counter.getAttribute("data-target")) || 100;

    const interval = setInterval(() => {
      if (count < target) {
        count++;
        counter.innerText = count;
      } else {
        clearInterval(interval);
      }
    }, 50);
  });
}

// Load "Contact Us" page
function loadContactUs() {
  loadContent("contact");
}

// Back to Top Button Logic
const backToTopBtn = document.getElementById("backToTopBtn");

window.onscroll = function () {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
};

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
