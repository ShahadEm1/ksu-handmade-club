window.onload = AddOfferingPage;

function AddOfferingPage() {
    var form = document.getElementById("addOfferingForm");
    form.onsubmit = validateAddOfferingForm;
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

function validateAddOfferingForm() {
    var nameField = document.getElementById("offering-name");
    var imageField = document.getElementById("offering-image");
    var priceField = document.getElementById("offering-price");
    var descriptionField = document.getElementById("offering-description");

    var nameVal = nameField.value;
    var imageVal = imageField.value;
    var priceVal = priceField.value;
    var descriptionVal = descriptionField.value;

    //Remove old highlights before checking again
    clearStyles(nameField);
    clearStyles(imageField);
    clearStyles(priceField);
    clearStyles(descriptionField);

    var message = "";

    //Check for empty fields
    if (isEmpty(nameVal)) {
        message = message + "- Enter the offering name.\n";
        highlightField(nameField);
    }
    if (isEmpty(imageVal)) {
        message = message + "- Choose an image for the offering.\n";
        highlightField(imageField);
    }
    if (isEmpty(priceVal)) {
        message = message + "- Enter the price or registration fee.\n";
        highlightField(priceField);
    }
    if (isEmpty(descriptionVal)) {
        message = message + "- Enter a description.\n";
        highlightField(descriptionField);
    }

    //Offering name cannot start with numbers
    if (!isEmpty(nameVal) && nameVal.search(/^\d/) != -1) {
        message = message + "- Offering name cannot start with a number.\n";
        highlightField(nameField);
    }

    //Image field accepts only images
    if (!isEmpty(imageVal) && imageVal.search(/\.(jpg|jpeg|png|gif|webp)$/i) == -1) {
        message = message + "- The image must be an image file (jpg, jpeg, png, gif or webp).\n";
        highlightField(imageField);
    }

    //Price must be a number (0 or more)
    if (!isEmpty(priceVal) && (isNaN(priceVal) || parseFloat(priceVal) < 0)) {
        message = message + "- Price must be a number (0 for a free offering).\n";
        highlightField(priceField);
    }

    //Stop submission and alert what is missing
    if (message != "") {
        alert("Please fix the following:\n" + message);
        return false;
    }

          //FileReader is outside the course syllabus (used to display any image the user chooses)
    var reader = new FileReader();

    reader.onload = function () {
        //Create the new offering object (the image is saved as text) 
        var newOffering = {
            name: nameVal,
            image: reader.result,
            price: parseFloat(priceVal),
            description: descriptionVal
        };

        //Get previously added offerings (array of objects) from local storage
        var offerings = JSON.parse(localStorage.getItem("ksu-handmade-offerings"));
        if (offerings == null) {
            offerings = [];
        }

        //Add the new offering and save the whole array again
        offerings.push(newOffering);

        try {
            localStorage.setItem("ksu-handmade-offerings", JSON.stringify(offerings));
        } catch (e) {
            alert("The image is too large. Please choose a smaller image.");
            highlightField(imageField);
            return;
        }

        //Confirmation alert with the offering name
        alert("The offering \"" + nameVal + "\" has been added successfully!");

        //Clear the form
        nameField.value = "";
        imageField.value = "";
        priceField.value = "";
        descriptionField.value = "";
    };

    reader.readAsDataURL(imageField.files[0]);  
    return false;
}