import "./styles/main.css";

const form = document.querySelector("form");

// E-mail and confirm e-mail inputs
const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");

// Span elements to show e-mail error messages
const confirmEmail = document.getElementById("confirm-mail");
const confirmEmailError = document.querySelector("#confirm-mail + span.error");

// Country and zip code inputs, and span element to show zip code error messages
const country = document.getElementById("country");
const zipCode = document.getElementById("zipcode");
const zipCodeError = document.querySelector("#zipcode + span.error");

// Password and confirm password inputs
const psw = document.getElementById("password");
const pswError = document.querySelector("#password + span.error");

// Span elements to show password error messages
const confirmPsw = document.getElementById("password-confirmation");
const confirmPswError = document.querySelector("#password-confirmation + span.error");

const showEmailError = () => {
  if (email.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    emailError.textContent = `Email should be at least ${email.minLength} characters`;
  }

  // Set the styling appropriately
  emailError.className = "error active";
};

const showEmailConfirmationError = () => {
  if (confirmEmail.validity.valueMissing) {
    confirmEmailError.textContent = "This field can't be empty!";
  } else if (confirmEmail.value !== email.value) {
    confirmEmailError.textContent =
      "The confirmed email does not match the original email. Please check and try to submit again.";
  }

  confirmEmailError.className = "error active";
};

const checkZipCode = () => {
  // For each country, defines the pattern that the ZIP has to follow
  const constraints = {
    ch: ["^(CH-)?\\d{4}$", "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950"],
    fr: ["^(F-)?\\d{5}$", "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012"],
    de: ["^(D-)?\\d{5}$", "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345"],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
    br: [
      "(\\d{5})-?(\\d{3})",
      "Brazilian ZIPs must have exactly 8 digits: e.g. 12345-678 or 12345678",
    ],
  };

  // Build the constraint checker
  const constraint = new RegExp(constraints[country.value][0], "");

  // If the ZIP Code follows the constraint
  if (constraint.test(zipCode.value)) {
    zipCodeError.textContent = ""; // Reset the content of the message
    zipCodeError.className = "error"; // Reset the visual state of the message
  } else {
    // If not, give a message about the format required for this country
    const constraintMsg = constraints[country.value][1];
    zipCodeError.textContent = constraintMsg;

    // Set the styling appropriately
    zipCodeError.className = "error active";
  }
};

const showPasswordError = () => {
  if (psw.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    pswError.textContent = "You need to enter a password.";
  } else if (psw.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    pswError.textContent = `Password should be at least ${psw.minLength} characters; you entered ${psw.value.length}`;
  }

  // Set the styling appropriately
  pswError.className = "error active";
};

const showPasswordConfirmationError = () => {
  if (confirmPsw.validity.valueMissing) {
    confirmPswError.textContent = "This field can't be empty!";
  } else if (psw.value !== confirmPsw.value) {
    confirmPswError.textContent =
      "The confirmed password does not match the original password. Please check and try to submit again.";
  }

  confirmPswError.className = "error active";
};

const validateFormFields = () => {
  form.classList.add("submitted");

  if (!email.validity.valid) {
    showEmailError();
  }

  if (confirmEmail.validity.valueMissing || email.value !== confirmEmail.value) {
    showEmailConfirmationError();
  } else {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    confirmEmailError.textContent = ""; // Reset the content of the message
    confirmEmailError.className = "error"; // Reset the visual state of the message
  }

  if (!psw.validity.valid) {
    showPasswordError();
  }

  if (confirmPsw.validity.valueMissing || psw.value !== confirmPsw.value) {
    showPasswordConfirmationError();
  } else {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    confirmPswError.textContent = ""; // Reset the content of the message
    confirmPswError.className = "error"; // Reset the visual state of the message
  }

  if (!zipCode.validity.valid) {
    checkZipCode();
  }
};

const resetForm = () => {
  form.reset(); // Clear all input fields
  form.classList.remove("submitted"); // Remove submit class from the form

  // Remove error messages from all inputs
  const spanElements = document.querySelectorAll("span");
  spanElements.forEach((element) => {
    element.textContent = "";
    element.classList.remove("error");
  });
};

email.addEventListener("focusout", () => {
  // Each time the user types something, we check if the
  // email form field is valid.

  if (email.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    emailError.textContent = ""; // Reset the content of the message
    emailError.className = "error"; // Reset the visual state of the message
  } else {
    showEmailError();
  }
});

zipCode.addEventListener("input", checkZipCode);
country.addEventListener("change", checkZipCode);

psw.addEventListener("input", () => {
  if (psw.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    pswError.textContent = ""; // Reset the content of the message
    pswError.className = "error"; // Reset the visual state of the message
  } else {
    showPasswordError();
  }
});

// This defines what happens when the user tries to submit the data
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevents form being submitted to a server

  // Set a custom validity message on the confirmPsw field if the passwords do not match.
  // This will make form.checkValidity() to return false if the passwords do not match.
  if (psw.value !== confirmPsw.value) {
    confirmPsw.setCustomValidity("Passwords do not match");
  } else {
    confirmPsw.setCustomValidity("");
  }

  // If form is not valid (returns false, validate all input fields)
  if (!form.checkValidity()) {
    validateFormFields();
  } else {
    // Submit and reset form
    alert("Great! Your data was submitted to the server!");
    resetForm();
  }
});
