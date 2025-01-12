document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const jwtToken = localStorage.getItem("jwt"); // Retrieve the JWT token from localStorage

  // Event listener for user input to trigger search
  searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();

    // Only trigger search when the user enters more than 2 characters
    if (query.length > 2) {
      try {
        // Send a GET request to search
        const response = await fetch(
          `https://www.fulek.com/data/api/supit/curriculumlist/hr?search=${query}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`, // Send the JWT token for authentication
            },
          }
        );

        // If the response is successful, proceed to handle the data
        if (response.ok) {
          const data = await response.json(); // Parse the response as JSON
          console.log("Fetched curricula:", data); // Log the fetched data for debugging
          displayAutocompleteResults(data); // Function to display the results
        } else {
          console.error("Error fetching curriculum data");
        }
      } catch (error) {
        console.error("Error:", error); // Handle any errors during the fetch request
      }
    }
  });

  // Function to display the search results in an autocomplete dropdown
  function displayAutocompleteResults(data) {
    const resultsContainer = document.createElement("ul"); // Create a <ul> to hold the results
    resultsContainer.innerHTML = ""; // Clear any previous results

    // Iterate over the fetched data and create a list item for each curriculum
    data.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.name; // Set the text content to the curriculum name
      li.addEventListener("click", () => selectCurriculum(item)); // Event listener for when a curriculum is selected
      resultsContainer.appendChild(li); // Append the <li> to the results container
    });

    // Append the results container to the search input's parent element
    searchInput.parentElement.appendChild(resultsContainer);
  }

  // Function to handle the selection of a curriculum from the autocomplete list
  function selectCurriculum(item) {
    console.log("Selected curriculum:", item); // Log the selected curriculum for debugging
    searchInput.value = item.name; // Set the input value to the name of the selected curriculum
    showCurriculumDetails(item.id); // Fetch and display details for the selected curriculum
  }

  // Function to fetch and display detailed information about the selected curriculum
  function showCurriculumDetails(id) {
    fetch(`https://www.fulek.com/data/api/supit/get-curriculum/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Send the JWT token for authentication
      },
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        console.log("Curriculum details:", data); // Log the fetched curriculum details
      })
      .catch((error) => {
        console.error("Error fetching curriculum details:", error); // Handle any errors in fetching curriculum details
      });
  }
});
