// Sidebar toggle logic
document.querySelector(".nav-button").addEventListener("click", function () {
  const sidebar = document.querySelector(".side-bar-container");
  const header = document.querySelector(".header-container");
  const secondBar = document.getElementById("secondBar");

  if (sidebar.classList.contains("show")) {
    sidebar.classList.remove("show");
    setTimeout(() => header.classList.remove("no-shadow"), 300);
    secondBar.setAttribute("width", "70");
    secondBar.setAttribute("y", "70");
  } else {
    sidebar.classList.add("show");
    header.classList.add("no-shadow");
    secondBar.setAttribute("width", "0");
    secondBar.setAttribute("y", "40");
  }
});

// Navigation button click logic with active state fix
document
  .querySelectorAll(".nav-bar, .nav-bar5, .nav-bar6")
  .forEach((button) => {
    button.addEventListener("click", function () {
      const page = this.getAttribute("data-page");
      if (page) {
        loadContent(page).then(() => {
          // Remove active from all nav buttons
          document
            .querySelectorAll(".nav-bar, .nav-bar5, .nav-bar6")
            .forEach((btn) => btn.classList.remove("active"));

          // Sidebar library button always active on library page
          if (page === "library") {
            const sidebarLibBtn = document.getElementById("nav-bar2");
            if (sidebarLibBtn) sidebarLibBtn.classList.add("active");
          }

          // Active on clicked button too
          this.classList.add("active");
        });

        const sidebar = document.querySelector(".side-bar-container");
        const header = document.querySelector(".header-container");
        const secondBar = document.getElementById("secondBar");

        if (sidebar.classList.contains("show")) {
          sidebar.classList.remove("show");
          setTimeout(() => header.classList.remove("no-shadow"), 300);
          secondBar.setAttribute("width", "70");
          secondBar.setAttribute("y", "70");
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });

window.addEventListener("scroll", function () {
  const sidebar = document.querySelector(".side-bar-container");
  const header = document.querySelector(".header-container");
  const secondBar = document.getElementById("secondBar");

  if (sidebar.classList.contains("show")) {
    sidebar.classList.remove("show");
    setTimeout(() => header.classList.remove("no-shadow"), 300);
    secondBar.setAttribute("width", "70");
    secondBar.setAttribute("y", "70");
  }
});

document.addEventListener("click", function (event) {
  const sidebar = document.querySelector(".side-bar-container");
  const header = document.querySelector(".header-container");
  const navButton = document.querySelector(".nav-button");
  const secondBar = document.getElementById("secondBar");

  if (!sidebar.contains(event.target) && !navButton.contains(event.target)) {
    if (sidebar.classList.contains("show")) {
      sidebar.classList.remove("show");
      setTimeout(() => header.classList.remove("no-shadow"), 300);
      secondBar.setAttribute("width", "70");
      secondBar.setAttribute("y", "70");
    }
  }
});

// Delegated handler for dynamically loaded nav buttons (e.g. from home.html)
document.addEventListener("click", function (e) {
  const button = e.target.closest(".nav-bar, .nav-bar5, .nav-bar6");
  if (!button || button.dataset.dynamicHandled) return;

  const page = button.getAttribute("data-page");
  if (page) {
    loadContent(page).then(() => {
      // Remove active from all nav buttons
      document
        .querySelectorAll(".nav-bar, .nav-bar5, .nav-bar6")
        .forEach((btn) => btn.classList.remove("active"));

      // Sidebar library button always active on library page
      if (page === "library") {
        const sidebarLibBtn = document.getElementById("nav-bar2");
        if (sidebarLibBtn) sidebarLibBtn.classList.add("active");
      }

      // Active on clicked button too
      button.classList.add("active");
    });

    const sidebar = document.querySelector(".side-bar-container");
    const header = document.querySelector(".header-container");
    const secondBar = document.getElementById("secondBar");

    if (sidebar.classList.contains("show")) {
      sidebar.classList.remove("show");
      setTimeout(() => header.classList.remove("no-shadow"), 300);
      secondBar.setAttribute("width", "70");
      secondBar.setAttribute("y", "70");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    button.dataset.dynamicHandled = true; // prevent re-trigger if static now
  }
});

function goHome() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

function loadContent(page) {
  console.log(`loadContent called with page: ${page}`);

  const mainContent = document.querySelector(".main");
  if (!mainContent) {
    return Promise.reject("Main container not found");
  }

  let filePath = "";
  let scriptPath = "";

  switch (page) {
    case "bau":
      filePath = "cont/00.bau/bau.html";
      scriptPath = "cont/00.bau/bau.js";
      break;
    case "main":
      filePath = "cont/00.home/home.html";
      scriptPath = "cont/00.home/home.js";
      break;
    case "contact":
      filePath = "cont/00.contact/contact.html";
      scriptPath = "cont/00.contact/contact.js";
      break;
    case "library":
      filePath = "cont/00.library/library.html";
      scriptPath = "cont/00.library/library.js";
      break;
    case "dashboard":
      filePath = "cont/00.dashboard/dashboard.html";
      scriptPath = "cont/00.dashboard/dashboard.js";
      break;
    default:
      console.error(`Unknown page requested: ${page}`);
      return Promise.reject("Unknown page");
  }

  console.log(`Fetching file: ${filePath}`);

  return fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load " + filePath);
      }
      return response.text();
    })
    .then((html) => {
      mainContent.innerHTML = html;
      sessionStorage.setItem("currentPage", page);

      // Remove previous page script to avoid duplicates
      const oldScript = document.querySelector(
        `script[data-page-script="true"]`
      );
      if (oldScript) oldScript.remove();

      if (scriptPath) {
        return new Promise((resolve, reject) => {
          const scriptElement = document.createElement("script");
          scriptElement.src = scriptPath;
          scriptElement.dataset.pageScript = "true";
          scriptElement.onload = () => {
            console.log(`✅ ${scriptPath} loaded`);

            // Automatically call init<Page>() if defined
            const capitalized = page.charAt(0).toUpperCase() + page.slice(1);
            const initFnName = `init${capitalized}`;
            if (typeof window[initFnName] === "function") {
              console.log(`🚀 Calling ${initFnName}()`);
              try {
                window[initFnName]();
              } catch (err) {
                console.error(`⚠️ Error calling ${initFnName}():`, err);
              }
            } else {
              console.warn(`🧩 No initializer function found: ${initFnName}()`);
            }

            resolve();
          };
          scriptElement.onerror = () => {
            console.error(`❌ Failed to load script: ${scriptPath}`);
            reject(new Error(`Failed to load script: ${scriptPath}`));
          };
          document.body.appendChild(scriptElement);
        });
      } else {
        return Promise.resolve();
      }
    })
    .catch((error) => {
      console.error("Error loading content:", error);
      return Promise.reject(error);
    });
}

function loadScript(scriptPath, callback) {
  // Prevent duplicate script loading
  const existingScript = document.querySelector(`script[src="${scriptPath}"]`);
  if (existingScript) {
    console.log(`⚠️ Script already loaded: ${scriptPath}`);
    if (typeof callback === "function") callback();
    return;
  }

  const scriptElement = document.createElement("script");
  scriptElement.src = scriptPath;
  scriptElement.onload = function () {
    console.log(`✅ ${scriptPath} loaded successfully.`);
    if (typeof callback === "function") callback();
  };
  scriptElement.onerror = function () {
    console.error(`❌ Failed to load script: ${scriptPath}`);
  };
  document.body.appendChild(scriptElement);
}

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

function loadContactUs() {
  loadContent("contact");
}

const backToTopBtn = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.remove("fade-out");
    backToTopBtn.classList.add("show");
  } else {
    if (backToTopBtn.classList.contains("show")) {
      backToTopBtn.classList.add("fade-out");
      backToTopBtn.addEventListener("transitionend", function handler() {
        backToTopBtn.classList.remove("show", "fade-out");
        backToTopBtn.removeEventListener("transitionend", handler);
      });
    }
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector(".hover-logo");
  if (logo) {
    logo.onclick = function () {
      goHome();
    };
  }

  const storedPage = sessionStorage.getItem("currentPage") || "main";
  loadContent(storedPage).then(() => {
    // On page load, make sure correct active states are set
    document
      .querySelectorAll(".nav-bar, .nav-bar5, .nav-bar6")
      .forEach((btn) => btn.classList.remove("active"));

    if (storedPage === "library") {
      const sidebarLibBtn = document.getElementById("nav-bar2");
      if (sidebarLibBtn) sidebarLibBtn.classList.add("active");
    } else {
      // Find nav button matching storedPage and add active
      const activeBtn = document.querySelector(
        `.nav-bar[data-page="${storedPage}"], .nav-bar5[data-page="${storedPage}"], .nav-bar6[data-page="${storedPage}"]`
      );
      if (activeBtn) activeBtn.classList.add("active");
    }
  });
});
