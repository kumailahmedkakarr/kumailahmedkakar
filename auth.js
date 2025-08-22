// Helper to read form fields by name
function val(form, name) { return form.querySelector(`[name="${name}"]`).value.trim(); }

// SIGN UP
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const name = val(form, "name");
  const email = val(form, "email");
  const password = val(form, "password");
  try {
    const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await cred.user.updateProfile({ displayName: name });
    alert("🎉 Account created! Please log in.");
    location.href = "login.html";
  } catch (err) {
    alert(err.message);
  }
});

// SIGN IN
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const email = val(form, "email");
  const password = val(form, "password");
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    location.href = "dashboard.html";           // go to protected page
  } catch (err) {
    alert(err.message);
  }
});

// LOG OUT (available globally)
function logout() {
  firebase.auth().signOut().then(()=>{
    alert("Logged out.");
    location.href = "login.html";
  });
}
window.logout = logout; // expose for buttons

// Guard for protected pages (call this in dashboard.html)
function requireAuth(onAuthed) {
  firebase.auth().onAuthStateChanged((user)=>{
    if (!user) location.href = "login.html";
    else onAuthed(user);
  });
}
window.requireAuth = requireAuth;