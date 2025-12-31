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
