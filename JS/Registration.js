document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("form");

  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Reset previous errors
    document.getElementById("username").setCustomValidity("");
    document.getElementById("password").setCustomValidity("");

    let valid = true;

    // Check if username is inserted
    if (username === "") {
      document
        .getElementById("username")
        .setCustomValidity("Korisničko ime je obavezno!");
      valid = false;
    } else if (!username.includes("@")) {
      document
        .getElementById("username")
        .setCustomValidity("Korisničko ime mora sadržavati znak @ !");
      valid = false;
    }

    // Check if password is inserted
    if (password === "") {
      document
        .getElementById("password")
        .setCustomValidity("Lozinka je obavezna!");
      valid = false;
    } else if (password.length < 8) {
      document
        .getElementById("password")
        .setCustomValidity("Lozinka mora imati barem 8 znakova.");
      valid = false;
    }

    // If all conditions are met, redirect to form.html
    if (valid) {
      window.location.href = "form.html";
    } else {
      document.querySelector("form").reportValidity();
    }
  });
});
