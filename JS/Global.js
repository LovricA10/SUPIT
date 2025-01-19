document.addEventListener("DOMContentLoaded", () => {
  const loginItem = document.getElementById("login");
  const logoutItem = document.getElementById("logout");
  const studyProgram = document.getElementById("study-program");

  const jwtToken = localStorage.getItem("jwt");

  if (jwtToken) {
    loginItem.classList.add("hidden");
    logoutItem.classList.remove("hidden");
    studyProgram.classList.remove("hidden");
  } else {
    loginItem.classList.remove("hidden");
    logoutItem.classList.add("hidden");
    studyProgram.classList.add("hidden");
  }
  logoutItem.addEventListener("click", () => {
    localStorage.removeItem("jwt"); //remove token from storage
  });
});
