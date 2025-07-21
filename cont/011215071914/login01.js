document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  passwordInput.style.transition =
    "opacity 0.3s ease, border-color 0.4s ease, border-width 0.4s ease";
  const showPasswordBtn = document.querySelector(".show-password-btn");
  const lockIcon = document.querySelector(".fa-lock");
  const unlockIcon = document.querySelector(".fa-unlock");

  if (loginButton) {
    loginButton.addEventListener("click", function () {
      // Handle login
    });
  }

  // Initially show both icons
  lockIcon.style.opacity = "1";
  unlockIcon.style.opacity = "1";

  // Set initial styles for the show password button
  showPasswordBtn.style.opacity = "0";
  showPasswordBtn.style.transition = "opacity 0.3s ease";
  showPasswordBtn.style.pointerEvents = "none"; // Prevent interaction when hidden

  // Show button when typing and manage icon visibility
  passwordInput.addEventListener("input", function () {
    const hasValue = passwordInput.value.length > 0;
    showPasswordBtn.style.opacity = hasValue ? "1" : "0";
    showPasswordBtn.style.pointerEvents = hasValue ? "auto" : "none";

    // Manage icon visibility based on input
    if (hasValue) {
      unlockIcon.style.opacity = "1"; // Hide unlock icon when there's input
      lockIcon.style.opacity = "1"; // Show lock icon
    } else {
      unlockIcon.style.opacity = "1"; // Hide unlock icon when empty
      lockIcon.style.opacity = "1"; // Show lock icon when empty

      // Reset show button text and type
      togglePassword.textContent = "Show";
      passwordInput.setAttribute("type", "password"); // Reset to password type
    }

    // Always keep unlock icon visible while password is shown
    if (passwordInput.getAttribute("type") === "text") {
      unlockIcon.style.opacity = "1";
      lockIcon.style.opacity = "0"; // Hide lock icon when password is shown
    }
  });

  // Toggle password visibility and icon states when button is clicked
  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Update the show button text based on current type
    this.textContent = type === "password" ? "Show" : "Hide";

    // Handle icon visibility
    if (type === "text") {
      lockIcon.style.opacity = "0"; // Hide lock icon smoothly
      unlockIcon.style.opacity = "1"; // Show unlock icon
    } else {
      lockIcon.style.opacity = "1"; // Show lock icon smoothly
      unlockIcon.style.opacity = "1"; // Hide unlock icon
    }
  });
});

function goHome() {
  sessionStorage.clear(); // Clear sessionStorage when navigating to home
  window.location.href = "../../index.html"; // Always go to the main index page
}

const logo = document.getElementById("main-logo"); // or "hover-logo"
if (logo) {
  logo.onclick = function () {
    goHome();
    // fetchContent("home"); // Make sure this function exists or comment it out
  };
}

/*-----------------------------------------------------------------*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6e_H-E7l6_x9GbOeJONZ515lsclyoogw",
  authDomain: "coronary-64f63.firebaseapp.com",
  projectId: "coronary-64f63",
  storageBucket: "coronary-64f63.firebasestorage.app",
  messagingSenderId: "110121771753",
  appId: "1:110121771753:web:bad6365385b0a38fa94678",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded - attaching Google login handler");

  const googleBtn = document.getElementById("google-login");
  if (!googleBtn) {
    console.error("Google login button not found!");
    return;
  }

  googleBtn.addEventListener("click", async () => {
    console.log("Google login button clicked");

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("signInWithPopup result:", result);

      const user = result.user;
      console.log("User info:", {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      // Navigate or update UI here
      window.location.href = "/dashboard.html";
    } catch (error) {
      console.error("Error during signInWithPopup:", error);
      alert("Login failed: " + error.message);
    }
  });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Auth state changed: user is logged in", user.displayName);
  } else {
    console.log("Auth state changed: no user is logged in");
  }
});
