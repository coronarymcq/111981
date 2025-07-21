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
  if (!authButtonsDiv) return;

  if (user) {
    authButtonsDiv.innerHTML = "";

    // 🔵 Username button
    const userBtn = document.createElement("button");
    userBtn.textContent = user.displayName || user.email;
    userBtn.className = "login-button";
    userBtn.style.cursor = "pointer";
    userBtn.onclick = () => {
      // Later redirect to dashboard
      window.location.href = "../../index.html";
    };

    // 🔴 Logout button
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logout";
    logoutBtn.className = "register-button";
    logoutBtn.onclick = () => {
      signOut(auth);
    };

    authButtonsDiv.appendChild(userBtn);
    authButtonsDiv.appendChild(logoutBtn);
  } else {
    // Not logged in: default login/signup
    authButtonsDiv.innerHTML = `
      <a href="cont/011215071914/login01.html"><button class="login-button">Login</button></a>
      <a href="cont/01.signUp/signup.html"><button class="register-button">Sign Up</button></a>
    `;
  }
}

// ✅ Handle Google login button if present
function setupGoogleLogin() {
  const googleBtn = document.getElementById("google-login");
  if (!googleBtn) return;

  googleBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google login success:", result.user);
      window.location.href = "../../index.html";
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
    }
  });
}

// ✅ Run when page loads
window.addEventListener("DOMContentLoaded", () => {
  updateAuthUI(auth.currentUser);
  onAuthStateChanged(auth, (user) => {
    updateAuthUI(user);
  });
  setupGoogleLogin();
});
