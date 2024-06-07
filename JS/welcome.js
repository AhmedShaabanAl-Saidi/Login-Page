// Select the element
var sayWelcome = document.querySelector("#sayWelcome");

// Get the user's name from localStorage
var userName = localStorage.getItem("currentUser");

if (userName) {
  sayWelcome.innerHTML = "Welcome, " + userName;
}
