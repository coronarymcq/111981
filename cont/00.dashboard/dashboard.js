function initDashboard() {
  console.log("[DASHBOARD] initDashboard called");

  const uidEl = document.getElementById("uid");
  const emailEl = document.getElementById("email");
  const displayNameEl = document.getElementById("displayName");
  const lastLoginEl = document.getElementById("lastLogin");
  const createdAtEl = document.getElementById("createdAt");
  const photoURLEl = document.getElementById("photoURL");
  const logoutBtn = document.getElementById("logoutBtn");

  if (
    !uidEl ||
    !emailEl ||
    !displayNameEl ||
    !lastLoginEl ||
    !createdAtEl ||
    !photoURLEl
  ) {
    console.warn("[DASHBOARD] Some profile elements not found in DOM");
  }

  window.onAuthStateChanged(window.auth, (user) => {
    if (user) {
      console.log("[DASHBOARD] User is logged in:", user.email);

      if (uidEl) uidEl.textContent = user.uid || "N/A";
      if (emailEl) emailEl.textContent = user.email || "N/A";
      if (displayNameEl) displayNameEl.textContent = user.displayName || "N/A";

      const metadata = user.metadata;
      if (metadata) {
        const lastLoginDate = metadata.lastSignInTime
          ? new Date(metadata.lastSignInTime)
          : null;
        const createdDate = metadata.creationTime
          ? new Date(metadata.creationTime)
          : null;

        if (lastLoginEl)
          lastLoginEl.textContent = lastLoginDate
            ? lastLoginDate.toLocaleString()
            : "N/A";
        if (createdAtEl)
          createdAtEl.textContent = createdDate
            ? createdDate.toLocaleString()
            : "N/A";
      } else {
        if (lastLoginEl) lastLoginEl.textContent = "N/A";
        if (createdAtEl) createdAtEl.textContent = "N/A";
      }

      if (user.photoURL && photoURLEl) {
        photoURLEl.src = user.photoURL;
        photoURLEl.style.display = "block";
      } else if (photoURLEl) {
        photoURLEl.style.display = "none";
      }
    } else {
      console.log("[DASHBOARD] No user logged in");
    }
  });

  if (logoutBtn) {
    logoutBtn.onclick = () => {
      window
        .signOut(window.auth)
        .then(() => {
          console.log("[DASHBOARD] User signed out");
          window.location.reload();
        })
        .catch((error) => {
          console.error("[DASHBOARD] Sign out error:", error);
        });
    };
  }

  // Now add the event listener for the dynamically loaded button:
  const btn = document.getElementById("submit-and-download");
  if (btn) {
    btn.addEventListener("click", () => {
      console.log("[DASHBOARD] submit-and-download button clicked");
      // Your download or submit logic here
    });
  } else {
    console.warn("[DASHBOARD] submit-and-download button not found");
  }
}

window.initDashboard = initDashboard;

// Animate children with stagger fade+slide
function animateStackedFadeIn(container) {
  const children = Array.from(container.children);

  // Reset styles for animation start
  children.forEach((child) => {
    child.style.opacity = "0";
    child.style.transform = "translateY(20px)";
    child.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    child.style.transitionDelay = "0s";
  });

  // Force reflow so browser registers reset styles
  void container.offsetWidth;

  // Staggered fade-in animation
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.15}s`;
    child.style.opacity = "1";
    child.style.transform = "translateY(0)";
  });
}

// New function to load files content dynamically
function loadFilesContent() {
  const filesContainer = document.getElementById("files-content");
  if (!filesContainer) return;

  // Clear existing content
  filesContainer.innerHTML = "";

  // Example dummy files array
  const files = ["Report.pdf", "Image.png", "Notes.txt"];
  files.forEach((file) => {
    const fileItem = document.createElement("p");
    fileItem.textContent = file;
    filesContainer.appendChild(fileItem);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn");
  const contentDivs = document.querySelectorAll(".content-div");

  function showContent(id) {
    contentDivs.forEach((div) => {
      div.classList.remove("active");
    });
    const target = document.getElementById(id);
    if (target) {
      target.classList.add("active");

      // If files-content is activated, load files
      if (id === "files-content") {
        loadFiles();
      }
    }
  }

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      navButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const contentId = btn.getAttribute("data-content");
      showContent(contentId);
    });
  });

  // Initially show profile content
  showContent("profile-content");

  // Dummy files loading function
  function loadFiles() {
    const filesList = document.getElementById("files-list");
    if (!filesList) return;

    filesList.innerHTML = ""; // Clear previous content

    const files = ["Report.pdf", "Image.png", "Notes.txt"];
    files.forEach((file) => {
      const p = document.createElement("p");
      p.textContent = file;
      filesList.appendChild(p);
    });
  }
});

window.animateDashboardActiveSection = function () {
  const activeSection = document.querySelector(".dashboard-section.active");
  if (activeSection) {
    activeSection.classList.remove("animate-on-load"); // reset
    void activeSection.offsetWidth; // force reflow
    activeSection.classList.add("animate-on-load"); // trigger animation
  }
};
