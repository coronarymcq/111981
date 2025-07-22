function goHome() {
  sessionStorage.clear();
  window.location.href = "../../index.html";
}
window.goHome = goHome;

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
  showPasswordBtn.style.pointerEvents = "none";

  passwordInput.addEventListener("input", function () {
    const hasValue = passwordInput.value.length > 0;
    showPasswordBtn.style.opacity = hasValue ? "1" : "0";
    showPasswordBtn.style.pointerEvents = hasValue ? "auto" : "none";

    if (hasValue) {
      unlockIcon.style.opacity = "1";
      lockIcon.style.opacity = "1";
    } else {
      unlockIcon.style.opacity = "1";
      lockIcon.style.opacity = "1";
      togglePassword.textContent = "Show";
      passwordInput.setAttribute("type", "password");
    }

    if (passwordInput.getAttribute("type") === "text") {
      unlockIcon.style.opacity = "1";
      lockIcon.style.opacity = "0";
    }
  });

  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.textContent = type === "password" ? "Show" : "Hide";

    if (type === "text") {
      lockIcon.style.opacity = "0";
      unlockIcon.style.opacity = "1";
    } else {
      lockIcon.style.opacity = "1";
      unlockIcon.style.opacity = "1";
    }
  });

  const logo = document.getElementById("main-logo"); // or "hover-logo"
  if (logo) {
    logo.onclick = goHome;
  }
});

/*-----------------------------------------------------------------*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6e_H-E7l6_x9GbOeJONZ515lsclyoogw",
  authDomain: "coronary-64f63.firebaseapp.com",
  projectId: "coronary-64f63",
  storageBucket: "coronary-64f63.firebasestorage.app",
  messagingSenderId: "110121771753",
  appId: "1:110121771753:web:bad6365385b0a38fa94678",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Replace auth buttons with user info if logged in
function updateAuthUI(user) {
  const authButtonsDiv = document.getElementById("auth-buttons");
  if (!authButtonsDiv) {
    console.warn("[DEBUG] auth-buttons div NOT found");
    return;
  }

  console.log("[DEBUG] updateAuthUI called. User:", user);

  if (user) {
    console.log(
      "[DEBUG] User logged in, updating UI with username and logout button"
    );
    authButtonsDiv.innerHTML = "";

    // 🔵 Username button
    const userBtn = document.createElement("button");
    userBtn.textContent = user.displayName || user.email;
    userBtn.className = "login-button";
    userBtn.style.cursor = "pointer";
    userBtn.onclick = () => {
      console.log("[DEBUG] Username button clicked - redirecting to dashboard");
      window.location.href = "../../dashboard.html"; // ✅ Adjust if your structure differs
    };

    // 🔴 Logout button
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logout";
    logoutBtn.className = "register-button";
    logoutBtn.onclick = () => {
      console.log("[DEBUG] Logout button clicked");
      signOut(auth);
    };

    authButtonsDiv.appendChild(userBtn);
    authButtonsDiv.appendChild(logoutBtn);
  } else {
    console.log("[DEBUG] No user logged in, showing login/signup buttons");
    authButtonsDiv.innerHTML = `
      <a href="cont/011215071914/login01.html"><button class="login-button">Login</button></a>
      <a href="cont/01.signUp/signup.html"><button class="register-button">Sign Up</button></a>
    `;
  }
}

// ✅ Handle Google login button if present
function setupGoogleLogin() {
  const googleBtn = document.getElementById("google-login");
  if (!googleBtn) {
    console.warn("[DEBUG] Google login button NOT found");
    return;
  }

  googleBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("[DEBUG] Google login success:", result.user);
      window.location.href = "../../dashboard.html"; // ✅ Go to dashboard after login
    } catch (error) {
      console.error("[DEBUG] Login error:", error);
      alert("Login failed: " + error.message);
    }
  });
}

// ✅ Main entry point
window.addEventListener("DOMContentLoaded", () => {
  console.log("[DEBUG] DOMContentLoaded fired");
  setupGoogleLogin();

  onAuthStateChanged(auth, (user) => {
    console.log("[DEBUG] onAuthStateChanged triggered", user);

    // ✅ Redirect to dashboard if already logged in and currently on index.html
    if (user && window.location.pathname.endsWith("index.html")) {
      console.log(
        "[DEBUG] Logged-in user is on index → redirecting to dashboard"
      );
      window.location.href = "../../dashboard.html"; // ✅ Adjust path if needed
      return;
    }

    updateAuthUI(user); // ✅ Update buttons based on login state
  });
});
