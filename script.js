
let form = document.querySelector('#email-form form');
const firstNameInput = document.getElementById('form-fName');
const lastNameInput = document.getElementById('form-lName');
const emailInput = document.getElementById('form-email');
const messageInput = document.getElementById('form-emailinput');
const customAlert = document.getElementById('custom-alert');
const confirmBtn = document.getElementById('confirmBtn');
const sound = document.getElementById('confirmationSound'); 

//disable naitve browser toltip
form.setAttribute('novalidate', true);

// caching was giving me a hard time so I made sure it clears the input fields at the beginning and after submission
form.querySelectorAll('input:not([type="submit"]), textarea').forEach(function(element) {
    element.value = ''; 
});

// form highlight using focus and blur
let formFields = document.querySelectorAll('.frmfield');
formFields.forEach(function(formField) {
    let inputsAndTextareas = formField.querySelectorAll('input, textarea');
    inputsAndTextareas.forEach(function(element) {
        element.addEventListener('focus', function() {
            this.classList.add('highlight');  
        });
        element.addEventListener('blur', function() {
            this.classList.remove('highlight');  
        });
    });
});

// hide my custom alert when user clicks okay
confirmBtn.addEventListener('click', function() {
    customAlert.style.display = 'none'; 
    // forces the fields to clear the second time, ensuring nothing is left over after user submits
    form.querySelectorAll('input:not([type="submit"]), textarea').forEach(function(element) {
        element.value = ''; 
    });
});

// /////////////// custom error boxes//////////////

// tooltip element for an input field and position it BELOW the input.
function showErrorTooltip(input, message) {
  // forces parent element to be relative
  if (window.getComputedStyle(input.parentElement).position === 'static') {
      input.parentElement.style.position = 'relative';
  }

  let tooltip = input.parentElement.querySelector('.custom-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    input.parentElement.appendChild(tooltip);
  }
  tooltip.textContent = message;
  tooltip.style.display = 'block';

// positions error element to left
  const left = input.offsetLeft;
  // positions error 5px below
  const top = input.offsetTop + input.offsetHeight + 5;
  tooltip.style.left = left + 'px';
  tooltip.style.top = top + 'px';
}

// hides the error
function hideErrorTooltip(input) {
  let tooltip = input.parentElement.querySelector('.custom-tooltip');
  if (tooltip) {
    tooltip.style.display = 'none';
  }
}

// hides the error when typing in these fields
[firstNameInput, lastNameInput, emailInput, messageInput].forEach(function(field) {
  field.addEventListener('input', function() {
    hideErrorTooltip(field);
  });
});

// VALIDATION
function validateFormCustom() {
  // hide default/existing tooltips
  [firstNameInput, lastNameInput, emailInput, messageInput].forEach(function(field) {
    hideErrorTooltip(field);
  });
  
  // validate First Name
  if (firstNameInput.value.trim() === '') {
    showErrorTooltip(firstNameInput, "Please fill out this field.");
    firstNameInput.focus();
    return false;
  }
  
  // validate Last Name
  if (lastNameInput.value.trim() === '') {
    showErrorTooltip(lastNameInput, "Please fill out this field.");
    lastNameInput.focus();
    return false;
  }
  
  // validate email (required + format)
  if (emailInput.value.trim() === '') {
    showErrorTooltip(emailInput, "Please fill out this field.");
    emailInput.focus();
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    showErrorTooltip(emailInput, "Submit a real email address.");
    emailInput.focus();
    return false;
  }
  
  // validate Message
  if (messageInput.value.trim() === '') {
    showErrorTooltip(messageInput, "Please fill out this field.");
    messageInput.focus();
    return false;
  }
  
  return true;
}

// prevents default alert box and shows my custom alert
form.addEventListener('submit', function(event) {
  // prevents refreshing
  event.preventDefault(); 

  if (!validateFormCustom()) {
    return; 
  }
  
  // if validation passes, show the custom alert and play the confirmation sound.
  customAlert.style.display = 'flex'; 
  sound.play();
  sound.volume = 0.08;
});


// mouse over event, pfp glow
const pfpContainer = document.querySelector('.pfpcontainer');
if (pfpContainer) {
  pfpContainer.addEventListener('mouseover', () => {
    const pfpImg = pfpContainer.querySelector('img');
    if (pfpImg) {
      pfpImg.classList.add('glow');
    }
  });
  pfpContainer.addEventListener('mouseout', () => {
    const pfpImg = pfpContainer.querySelector('img');
    if (pfpImg) {
      pfpImg.classList.remove('glow');
    }
  });
}


  
  