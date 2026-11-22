window.onload = AboutUsPage;

function AboutUsPage() {
    var form = document.getElementById("joinTeamForm");
    form.onsubmit = validateJoinTeamForm;
}


function isEmpty(value) {
    return value.search(/\S/) == -1;
}


function clearStyles(el) {
    el.style.border = "";
    el.style.backgroundColor = "";
}


function highlightField(el) {
    el.style.border = "2px solid red";
    el.style.backgroundColor = "#b86666";
}

function validateJoinTeamForm() {
    var nameField = document.getElementById("applicant-name");
    var dobField = document.getElementById("applicant-dob");
    var emailField = document.getElementById("applicant-email");
    var photoField = document.getElementById("applicant-photo");
    var expertiseField = document.getElementById("applicant-expertise");
    var skillsField = document.getElementById("applicant-skills");
    var educationField = document.getElementById("applicant-education");

    var nameVal = nameField.value;
    var dobVal = dobField.value;
    var emailVal = emailField.value;
    var photoVal = photoField.value;
    var expertiseVal = expertiseField.value;
    var skillsVal = skillsField.value;
    var educationVal = educationField.value;

    
    clearStyles(nameField);
    clearStyles(dobField);
    clearStyles(emailField);
    clearStyles(photoField);
    clearStyles(expertiseField);
    clearStyles(skillsField);
    clearStyles(educationField);

    var message = "";

    //Check for empty fields
    if (isEmpty(nameVal)) {
        message = message + "- Enter your full name.\n";
        highlightField(nameField);
    }
    if (isEmpty(dobVal)) {
        message = message + "- Enter your date of birth.\n";
        highlightField(dobField);
    }
    if (isEmpty(emailVal)) {
        message = message + "- Enter your email address.\n";
        highlightField(emailField);
    }
    if (isEmpty(photoVal)) {
        message = message + "- Choose a profile photo.\n";
        highlightField(photoField);
    }
    if (isEmpty(expertiseVal)) {
        message = message + "- Enter your area of expertise.\n";
        highlightField(expertiseField);
    }
    if (isEmpty(skillsVal)) {
        message = message + "- Enter your skills.\n";
        highlightField(skillsField);
    }
    if (isEmpty(educationVal)) {
        message = message + "- Enter your education.\n";
        highlightField(educationField);
    }

   
    if (!isEmpty(nameVal) && nameVal.search(/^\d/) != -1) {
        message = message + "- Name cannot start with a number.\n";
        highlightField(nameField);
    }

    
    if (!isEmpty(photoVal) && photoVal.search(/\.(jpg|jpeg|png|gif|webp)$/i) == -1) {
        message = message + "- The photo must be an image file (jpg, jpeg, png, gif or webp).\n";
        highlightField(photoField);
    }

    
    if (!isEmpty(dobVal)) {
        var birthYear = parseInt(dobVal.substring(0, 4));

        if (isNaN(birthYear) || birthYear > 2008) {
            message = message + "- Year of birth must be 2008 or earlier.\n";
            highlightField(dobField);
        }
    }

   
    if (message != "") {
        alert("Please fix the following:\n" + message);
        return false;
    }

    
    alert("Thank you, " + nameVal + "! Your application has been submitted.");

    
    nameField.value = "";
    dobField.value = "";
    emailField.value = "";
    photoField.value = "";
    expertiseField.value = "";
    skillsField.value = "";
    educationField.value = "";

    return false;
}