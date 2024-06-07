// Select inputs
var signinEmail = document.querySelector("#signinEmail");
var signinPass = document.querySelector("#signinPass");
var btnSignin = document.querySelector("#btnSignin");
var warningForSingin = document.querySelector("#warningForSingin");
var incorrect = document.querySelector("#incorrect");

// Set list
if (localStorage.getItem("users") == null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem("users"));
}

// Add event listener for the sign-in button
btnSignin.addEventListener("click", function (event) {
  logIn(event);
});

document.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    logIn();
  }
});

function logIn(event) {
  event.preventDefault();

  if (isEmpty() == true) {
    event.preventDefault();
    warningForSingin.classList.remove("d-none");
    incorrect.classList.add("d-none");
  } else {
    if (loginUserCheck() == true) {
      window.location.href = "welcome.html";
    } else {
      event.preventDefault();
      warningForSingin.classList.add("d-none");
      incorrect.classList.remove("d-none");
    }
  }
}

function loginUserCheck() {
  for (var i = 0; i < users.length; i++) {
    if (
      users[i].email.toLowerCase() == signinEmail.value.toLowerCase() &&
      users[i].pass.toLowerCase() == signinPass.value.toLowerCase()
    ) {
      localStorage.setItem("currentUser", users[i].name);
      return true;
    }
  }
  return false;
}

function isEmpty() {
  if (signinEmail.value == "" || signinPass.value == "") {
    return true;
  } else {
    return false;
  }
}
