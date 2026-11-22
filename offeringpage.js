document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("offering-form");
    const fullname = document.getElementById("fullname");
    const date = document.getElementById("date");

    const offeringName = document.querySelector(
        ".offering-summary-text h3"
    ).textContent.trim();

    const requestsSection = document.getElementById("new-requests");
    const requestsList = document.getElementById("requests-list");

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

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const memberName = fullname.value.trim();
        const preferredDate = date.value;

        //Remove old highlights before checking again
        clearStyles(fullname);
        clearStyles(date);

        let message = "";

        // Validate offering
        if (offeringName === "") {
            message = message + "- The offering is missing.\n";
        }

        // Validate full name: at least two words, letters only
        const namePattern = /^[\p{L}]+(?:[ '-][\p{L}]+)+$/u;

        if (memberName === "") {
            message = message + "- Enter your full name.\n";
            highlightField(fullname);
        } else if (!namePattern.test(memberName)) {
            message = message + "- Enter your full name (first and last name) without numbers or symbols such as ?, ! or @.\n";
            highlightField(fullname);
        }

        // Validate future date
        if (preferredDate === "") {
            message = message + "- Select a preferred date.\n";
            highlightField(date);
        } else {
            const selectedDate = new Date(preferredDate + "T00:00:00");

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (
                isNaN(selectedDate.getTime()) ||
                selectedDate <= today
            ) {
                message = message + "- The preferred date must be a future date.\n";
                highlightField(date);
            }
        }

        // Stop submission and alert what is missing or wrong
        if (message !== "") {
            alert("Please fix the following:\n" + message);
            return;
        }

        // Stay or return to dashboard
        const stay = confirm(
            "Your request has been sent successfully!\n\n" +
            "Click OK to stay on this page.\n" +
            "Click Cancel to return to Member Dashboard."
        );

        if (stay) {

            requestsSection.hidden = false;

            const listItem = document.createElement("li");

            listItem.textContent =
                "Offering: " + offeringName +
                " | Member: " + memberName +
                " | Preferred Date: " + preferredDate;

            requestsList.appendChild(listItem);

            form.reset();

        } else {

            // Return without saving new requests
            window.location.href = "MemberDashboard.html";

        }
    });
});