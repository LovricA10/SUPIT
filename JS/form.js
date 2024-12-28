document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("form");
  const registerLink = document.querySelector(".register-link a");

  // Login form submission event
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Reset custom validity before new validation checks
    document.getElementById("username").setCustomValidity("");
    document.getElementById("password").setCustomValidity("");

    let valid = true;

    // Check if username is empty
    if (username === "") {
      document
        .getElementById("username")
        .setCustomValidity("Korisničko ime je obavezno!");
      valid = false;
    }
    // Check if username contains '@'
    else if (!username.includes("@")) {
      document
        .getElementById("username")
        .setCustomValidity("Korisničko ime mora sadržavati '@'!");
      valid = false;
    }

    // Check if password is empty
    if (password === "") {
      document
        .getElementById("password")
        .setCustomValidity("Lozinka je obavezna!");
      valid = false;
    }
    // Check if password has at least 8 characters
    else if (password.length < 8) {
      document
        .getElementById("password")
        .setCustomValidity("Lozinka mora imati najmanje 8 znakova.");
      valid = false;
    }

    // If there are validation errors
    if (!valid) {
      document.querySelector("form").reportValidity(); // Triggers native validation and displays error messages
      return;
    }

    alert("User not found"); // If user is not found, show this message
  });

  // Go to registration.html
  registerLink.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "Registration.html";
  });
});
