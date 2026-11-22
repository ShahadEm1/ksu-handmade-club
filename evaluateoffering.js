window.onload = EvaluatePage;

function EvaluatePage() {
    var form = document.getElementById("evaluateForm");
    form.onsubmit = validateEvaluationForm;
}

function clearStyles(offeringEl, ratingBoxEl, feedbackEl) {
    offeringEl.style.border = "";
    offeringEl.style.backgroundColor = "";

    ratingBoxEl.style.border = "";
    ratingBoxEl.style.backgroundColor = "";

    feedbackEl.style.border = "";
    feedbackEl.style.backgroundColor = "";
}

//Highlighting unfilled input field
function highlightField(el) {
    el.style.border = "2px solid red";
    el.style.backgroundColor = "#b86666";
}

function validateEvaluationForm() {
    var offeringField = document.getElementById("offering");
    var ratingBox = document.querySelector(".star-rating");
    var feedbackField = document.getElementById("feedback");
    var ratingRadios = document.getElementsByName("rating");

    clearStyles(offeringField, ratingBox, feedbackField);

    var offeringVal = offeringField.value;
    var feedbackVal = feedbackField.value;
    var ratingVal = "";

    for (var i = 0; i < ratingRadios.length; i++) {
        if (ratingRadios[i].checked) {
            ratingVal = ratingRadios[i].value;
            break;
        }
    }

var message = "";
var hasError = false;

//Check if an offering is selected
if (offeringVal == "") {
    message = message + "- select a completed offering.\n";
    highlightField(offeringField);
    hasError = true;
}

//Check if a rating is added
if (ratingVal == "") {
    message = message + "- select a star rating.\n";
    highlightField(ratingBox);
    hasError = true;
}

//Check if feedback is added
if (feedbackVal == "") {
    message = message + "- enter your feedback.\n";
    highlightField(feedbackField);
    hasError = true;
}

//Stop submission and alert missing inputs
if (hasError) {
    alert("Please complete the following:\n" + message);
    return false;
}

var ratingNum = parseInt(ratingVal);
    //Show thank you message for good rating, otherwise apology message
    if (ratingNum <= 2) {
        alert("Thank you for your evaluation! We are glad you enjoyed the offering.");
    } else {
        alert("We apologize that your experience was not up to expectations. Thank you for your feedback.");
    }

    // Transfering the member to MemberDashboard.html
    window.location.href = "MemberDashboard.html";

    return false;
}
