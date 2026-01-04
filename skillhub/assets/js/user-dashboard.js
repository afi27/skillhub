const user = JSON.parse(localStorage.getItem('skillhub_user'));
const loggedIn = localStorage.getItem('skillhub_loggedIn');

if (!loggedIn || !user) {
  window.location.href = "login.html";
} else {
  document.getElementById('userName').textContent = user.name;
  document.getElementById('userEmail').textContent = user.email;
}
const loggedIn = localStorage.getItem('skillhub_loggedIn');
const user = JSON.parse(localStorage.getItem('skillhub_user'));

// Redirect if not logged in
if (!loggedIn || !user) {
  window.location.href = "login.html";
}

// Optional: display user name on profile
document.addEventListener('DOMContentLoaded', () => {
  const nameEl = document.getElementById('userName');
  if(nameEl) nameEl.textContent = user.name;
});
