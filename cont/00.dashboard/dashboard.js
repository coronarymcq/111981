firebase
  .auth()
  .signOut()
  .then(() => {
    console.log("Signed out");
    loadDefaultPage(); // ← replace goHome() if you're staying in SPA mode
  });
