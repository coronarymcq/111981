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
/*----------------------------------*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
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

function restoreAccountButton() {
  const authButtonsDiv = document.getElementById("auth-buttons");
  console.log("[DEBUG] restoreAccountButton called");
  if (!authButtonsDiv) {
    console.warn("[DEBUG] auth-buttons div NOT found in restoreAccountButton");
    return;
  }
  authButtonsDiv.innerHTML = `
    <a href="cont/011215071914/login01.html">
      <button class="login-button" style="margin-top: 8px; margin-right: 10px">
        Account
        <i style="font-size: 17px; padding-left: 10px" class="fa">&#xf007;</i>
      </button>
    </a>
  `;
  console.log("[DEBUG] Account button restored");
}

function updateAuthUI(user) {
  console.log("[INDEX] updateAuthUI called with user:", user);

  const authButtonsDiv = document.getElementById("auth-buttons");
  if (!authButtonsDiv) {
    console.log("[INDEX] auth-buttons div NOT found — skipping UI update.");
    return;
  }

  if (user) {
    console.log("[INDEX] User logged in. Updating UI...");

    // Remove old login button
    authButtonsDiv.innerHTML = "";

    // Create new user button
    const userBtn = document.createElement("button");
    userBtn.className = "login-button";
    userBtn.style.marginTop = "8px";
    userBtn.style.marginRight = "10px";
    userBtn.textContent = user.displayName || "User";

    console.log("[INDEX] Setting username button text to:", user.displayName);

    // Create <i> icon
    const iconElem = document.createElement("i");
    iconElem.className = "fa fa-user";
    iconElem.style.fontSize = "17px";
    iconElem.style.paddingLeft = "10px";

    console.log("[DEBUG] iconElem created:", iconElem);
    console.log("[DEBUG] iconElem.outerHTML:", iconElem.outerHTML);

    userBtn.appendChild(iconElem);

    console.log("[DEBUG] Final userBtn HTML:", userBtn.outerHTML);

    // Append the new user button
    authButtonsDiv.appendChild(userBtn);

    // Add logout button
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logout";
    logoutBtn.className = "login-button";
    logoutBtn.style.marginTop = "8px";
    logoutBtn.onclick = () => signOut(auth);
    authButtonsDiv.appendChild(logoutBtn);

    console.log("[INDEX] User and logout buttons appended");
  } else {
    console.log("[INDEX] No user, showing login link");
  }
}

function setupGoogleLogin() {
  const googleBtn = document.getElementById("google-login");
  if (!googleBtn) {
    console.warn("[DEBUG] Google login button NOT found");
    return;
  }

  googleBtn.addEventListener("click", async () => {
    try {
      console.log("[DEBUG] Google login button clicked");
      const result = await signInWithPopup(auth, provider);
      console.log("[DEBUG] Google login success:", result.user);
      sessionStorage.setItem("justLoggedIn", "true"); // Mark fresh login
      window.location.href = "../../index.html"; // Redirect after login
    } catch (error) {
      console.error("[DEBUG] Login failed:", error);
      alert("Login failed: " + error.message);
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  console.log("[DEBUG] DOMContentLoaded fired");
  setupGoogleLogin();

  onAuthStateChanged(auth, (user) => {
    console.log("[DEBUG] onAuthStateChanged fired. User:", user);
    if (user) {
      if (sessionStorage.getItem("justLoggedIn")) {
        console.log("[DEBUG] Fresh login detected, redirecting to index.html");
        sessionStorage.removeItem("justLoggedIn");
        window.location.href = "../../index.html"; // Redirect only after fresh login
      } else {
        console.log("[DEBUG] Existing session, updating UI");
        // Only update UI if auth-buttons div exists on this page
        if (document.getElementById("auth-buttons")) {
          updateAuthUI(user);
        } else {
          console.log(
            "[DEBUG] No auth-buttons div on this page, skipping UI update"
          );
        }
      }
    } else {
      console.log("[DEBUG] No user logged in");
      if (document.getElementById("auth-buttons")) {
        restoreAccountButton();
      } else {
        console.log(
          "[DEBUG] No auth-buttons div on this page, skipping restoreAccountButton"
        );
      }
    }
  });
});
