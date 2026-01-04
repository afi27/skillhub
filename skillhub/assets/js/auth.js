// auth.js - Authentication functionality

document.addEventListener("DOMContentLoaded", function () {
  // Show/Hide Password functionality
  const showPasswordBtn = document.getElementById("showPassword");
  const passwordInput = document.getElementById("password");

  if (showPasswordBtn && passwordInput) {
    showPasswordBtn.addEventListener("click", function () {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      // Toggle eye icon
      const eyeIcon = this.querySelector("i");
      if (type === "text") {
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
      } else {
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
      }
    });
  }

  // Social login buttons
  const socialButtons = document.querySelectorAll(".btn-social");
  socialButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const provider = this.classList.contains("google") ? "Google" : "GitHub";
      alert(`Redirecting to ${provider} login...`);
      // Here you would normally redirect to OAuth provider
    });
  });
});
// auth.js

const accounts = [
  {
    username: "afiaabbas",
    email: "afia@example.com",
    password: "skillhub123",
    role: "user", // regular user
    name: "Afia Abbas"
  },
  {
    username: "admin",
    email: "admin@example.com",
    password: "admin123",
    role: "admin", // admin user
    name: "SkillHub Admin"
  }
];
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Hardcoded users for demo
  const users = [
    { name: "Afia Abbas", email: "afia@example.com", password: "skillhub123", role: "admin" },
    { name: "John Doe", email: "john@example.com", password: "user123", role: "user" }
  ];

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid credentials!");
    return;
  }

  // Save logged-in user
  localStorage.setItem('skillhub_loggedIn', 'true');
  localStorage.setItem('skillhub_user', JSON.stringify(user));

  // Redirect based on role
  if(user.role === "admin") {
    window.location.href = "admin-panel.html";
  } else {
    window.location.href = "user-profile.html";
  }
});



document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const emailOrUsername = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // Hardcoded users (for demo purposes)
  const users = [
    { name: "Afia Abbas", username: "afiaabbas", email: "afia@example.com", password: "skillhub123", role: "admin" },
    { name: "John Doe", username: "johndoe", email: "john@example.com", password: "user123", role: "user" }
  ];

  // Check if input matches any user (username OR email)
  const user = users.find(u => 
    (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password
  );

  if (!user) {
    alert("Invalid username/email or password!");
    return;
  }

  // Save user to localStorage
  localStorage.setItem('skillhub_loggedIn', 'true');
  localStorage.setItem('skillhub_user', JSON.stringify(user));

  // Redirect based on role
  if(user.role === "admin") {
    window.location.href = "admin-panel.html";
  } else {
    window.location.href = "user-profile.html";
  }
});



