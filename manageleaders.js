//Current activity leaders and instructors (array of objects)
var leaders = [
    { name: "Layan Al-Otaibi", photo: "layan.jpg" },
    { name: "Noura Al-Harbi", photo: "noura.jpg" },
    { name: "Reem Al-Zahrani", photo: "reem.jpg" }
];

window.onload = ManageLeadersPage;

function ManageLeadersPage() {
    displayLeaders();

    var deleteForm = document.getElementById("deleteLeadersForm");
    deleteForm.onsubmit = deleteSelectedLeaders;

    var addForm = document.getElementById("addLeaderForm");
    addForm.onsubmit = validateAddLeaderForm;
}

//Show every person in the array with a checkbox, small image and name
function displayLeaders() {
    var list = document.getElementById("leadersList");
    var rows = "";

    for (var i = 0; i < leaders.length; i++) {
        rows = rows +
            "<label class=\"leader-row\">" +
                "<input type=\"checkbox\" name=\"selected-leaders\" value=\"" + i + "\">" +
                "<img src=\"" + leaders[i].photo + "\" alt=\"" + leaders[i].name + "\" onerror=\"this.src='Logo.png'\">" +
                "<span>" + leaders[i].name + "</span>" +
            "</label>";
    }

    if (leaders.length == 0) {
        rows = "<p>There are no activity leaders or instructors.</p>";
    }

    list.innerHTML = rows;
}

function deleteSelectedLeaders() {
    var checkboxes = document.getElementsByName("selected-leaders");
    var selected = [];

    //Collect the positions of the checked people
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selected.push(parseInt(checkboxes[i].value));
        }
    }

    //Nobody is selected
    if (selected.length == 0) {
        alert("Please select at least one activity leader or instructor to delete.");
        return false;
    }

    //Ask the manager to confirm
    var answer = confirm("Are you sure you want to delete the selected activity leader(s) or instructor(s)?");

    if (answer) {
        //Delete from the end so the remaining positions do not change
        for (var j = selected.length - 1; j >= 0; j--) {
            leaders.splice(selected[j], 1);
        }
        displayLeaders();
    }

    return false;
}

//Returns true if the value is empty or contains only spaces
function isEmpty(value) {
    return value.search(/\S/) == -1;
}

//Remove the highlight from a field
function clearStyles(el) {
    el.style.border = "";
    el.style.backgroundColor = "";
}

//Highlighting unfilled or wrong input field
function highlightField(el) {
    el.style.border = "2px solid red";
    el.style.backgroundColor = "#b86666";
}

function validateAddLeaderForm() {
    var nameField = document.getElementById("leader-name");
    var dobField = document.getElementById("leader-dob");
    var emailField = document.getElementById("leader-email");
    var photoField = document.getElementById("leader-photo");
    var expertiseField = document.getElementById("leader-expertise");
    var skillsField = document.getElementById("leader-skills");
    var educationField = document.getElementById("leader-education");

    var nameVal = nameField.value;
    var dobVal = dobField.value;
    var emailVal = emailField.value;
    var photoVal = photoField.value;
    var expertiseVal = expertiseField.value;
    var skillsVal = skillsField.value;
    var educationVal = educationField.value;

    //Remove old highlights before checking again
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
        message = message + "- Enter the full name.\n";
        highlightField(nameField);
    }
    if (isEmpty(dobVal)) {
        message = message + "- Enter the date of birth.\n";
        highlightField(dobField);
    }
    if (isEmpty(emailVal)) {
        message = message + "- Enter the email address.\n";
        highlightField(emailField);
    }
    if (isEmpty(photoVal)) {
        message = message + "- Choose a profile photo.\n";
        highlightField(photoField);
    }
    if (isEmpty(expertiseVal)) {
        message = message + "- Enter the area of expertise.\n";
        highlightField(expertiseField);
    }
    if (isEmpty(skillsVal)) {
        message = message + "- Enter the skills.\n";
        highlightField(skillsField);
    }
    if (isEmpty(educationVal)) {
        message = message + "- Enter the education.\n";
        highlightField(educationField);
    }

    //Stop and alert if any field is empty
    if (message != "") {
        alert("Please fill in the following:\n" + message);
        return false;
    }

    //Name: letters, spaces and hyphens only (e.g. Layan Al-Otaibi)
    if (nameVal.search(/^[a-zA-Z\s\-]+$/) == -1) {
        message = message + "- Name must contain letters only (no numbers or symbols).\n";
        highlightField(nameField);
    }

    //Year of birth must be 2008 or earlier
    var birthYear = parseInt(dobVal.substring(0, 4));
    if (isNaN(birthYear) || birthYear > 2008) {
        message = message + "- Year of birth must be 2008 or earlier.\n";
        highlightField(dobField);
    }

    //Email format: name@domain.com
    if (emailVal.search(/^[\w.\-]+@[\w\-]+(\.[\w\-]+)*\.[a-zA-Z]{2,}$/) == -1) {
        message = message + "- Enter a valid email address (e.g. name@ksu.edu.sa).\n";
        highlightField(emailField);
    }

    //Photo field accepts only images
    if (photoVal.search(/\.(jpg|jpeg|png|gif|webp)$/i) == -1) {
        message = message + "- The photo must be an image file (jpg, jpeg, png, gif or webp).\n";
        highlightField(photoField);
    }

    //Expertise, skills and education must contain letters (not numbers only)
    if (expertiseVal.search(/[a-zA-Z]/) == -1) {
        message = message + "- Area of expertise must contain text.\n";
        highlightField(expertiseField);
    }
    if (skillsVal.search(/[a-zA-Z]/) == -1) {
        message = message + "- Skills must contain text.\n";
        highlightField(skillsField);
    }
    if (educationVal.search(/[a-zA-Z]/) == -1) {
        message = message + "- Education must contain text.\n";
        highlightField(educationField);
    }

    //Stop and alert if any field has the wrong type of information
    if (message != "") {
        alert("Please fix the following:\n" + message);
        return false;
    }

        //FileReader is outside the course syllabus (used to display any image the user chooses)
    var reader = new FileReader();

    reader.onload = function () {
        //Add the new person to the current list
        leaders.push({ name: nameVal, photo: reader.result });
        displayLeaders();

        alert(nameVal + " has been added to the activity leaders and instructors list.");

        //Clear form fields
        nameField.value = "";
        dobField.value = "";
        emailField.value = "";
        photoField.value = "";
        expertiseField.value = "";
        skillsField.value = "";
        educationField.value = "";
    };

    reader.readAsDataURL(photoField.files[0]);

    return false;
}