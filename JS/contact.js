document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission by default

    // Reset custom validity
    document.getElementById("contact-name").setCustomValidity("");
    document.getElementById("contact-email").setCustomValidity("");
    document.getElementById("contact-message").setCustomValidity("");

    // Collect information
    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const message = document.getElementById("contact-message").value;
    const wantsNotifications = document.getElementById("checkbox").checked;

    let isValid = true; // Assume the form is valid initially

    // Validations
    if (!name) {
      document
        .getElementById("contact-name")
        .setCustomValidity("Ime je obavezno.");
      isValid = false;
    }

    if (!email || !email.includes("@")) {
      document
        .getElementById("contact-email")
        .setCustomValidity("Molimo unesite ispravan email.");
      isValid = false;
    }

    if (!message) {
      document
        .getElementById("contact-message")
        .setCustomValidity("Poruka je obavezna.");
      isValid = false;
    }

    // If any field is invalid, stop submission
    if (!isValid) {
      return; // Prevent form submission
    }

    // Prepare data to send
    const formData = {
      name: name,
      email: email,
      importance: document.getElementById("contact-importance").value,
      message: message,
      wantsNotifications: wantsNotifications,
    };

    // Send data via POST request
    fetch("https://www.fulek.com/mvc/supit/project-contact-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        // Log the server response for debugging
        console.log("Server response:", response);

        if (response.ok) {
          // If successful, go to the specified URL
          window.location.href =
            "https://www.fulek.com/mvc/supit/project-contact-form";
        } else {
          // If unsuccessful, show error with response status
          alert(
            `Došlo je do greške pri slanju forme. Status: ${response.status}. Pokušajte ponovo.`
          );
        }
      })
      .catch((error) => {
        // Log the error and alert it
        console.error("Fetch error:", error);
        alert("Došlo je do greške pri slanju forme. Pokušajte ponovo.");
      });
  });
