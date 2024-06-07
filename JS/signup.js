// Select inputs
var signupName = document.querySelector("#signupName");
var signupPass = document.querySelector("#signupPass");
var signupEmail = document.querySelector("#signupEmail");
var warningForSingup = document.querySelector("#warningForSingup");
var incorrect = document.querySelector("#incorrect");
var success = document.querySelector("#success");
var exists = document.querySelector("#exists");
var btnSignup = document.querySelector("#btnSignup");

// Set list
var users = [];
if (localStorage.getItem("users") == null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem("users"));
}

// Add event listener for the sign-up button
btnSignup.addEventListener("click", signup);

document.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    signup();
  }
});

function signup(event) {
  // Check if inputs are empty
  if (isEmpty() == false) {
    warningForSingup.classList.replace("d-none", "d-block");
    event.preventDefault();
    return false;
  } else {
    warningForSingup.classList.replace("d-block", "d-none");
    if (
      validation(signupName) &&
      validation(signupPass) &&
      validation(signupEmail)
    ) {
      if (isEmailExist() == true) {
        addFun();
        success.classList.replace("d-none", "d-block");
        event.preventDefault();
      } else {
        success.classList.replace("d-block", "d-none");
        exists.classList.replace("d-none", "d-block");
        event.preventDefault();
      }
    } else {
      event.preventDefault();
    }
    return true;
  }
}

// Add users to array
function addFun() {
  var sitObj = {
    name: signupName.value,
    email: signupEmail.value,
    pass: signupPass.value,
  };

  users.push(sitObj);
  localStorage.setItem("users", JSON.stringify(users));
}

// Validation function
function validation(ele) {
  var regEx = {
    signupName: /^[a-zA-Z]{3,}$/,
    signupEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    signupPass: /^[A-Z][a-z0-9]{7,}$/,
  };

  if (regEx[ele.id].test(ele.value)) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
    return true;
  } else {
    ele.classList.remove("is-valid");
    ele.classList.add("is-invalid");
    return false;
  }
}

//check inputs is empty or not
function isEmpty() {
  if (
    signupEmail.value === "" ||
    signupPass.value === "" ||
    signupName.value === ""
  ) {
    return false;
  } else {
    return true;
  }
}

// check if email is already exists
function isEmailExist() {
  for (var i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
      return false;
    }
  }
  return true;
}
