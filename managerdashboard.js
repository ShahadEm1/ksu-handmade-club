window.onload = ManagerDashboardPage;

function ManagerDashboardPage() {
    //Get the offerings added from the Add New Offering page
    var offerings = JSON.parse(localStorage.getItem("ksu-handmade-offerings"));

    //No newly added offerings to display
    if (offerings == null || offerings.length == 0) {
        return;
    }

    var tableBody = document.getElementById("offeringsTableBody");

    //Add a table row for every stored offering
    for (var i = 0; i < offerings.length; i++) {
        tableBody.innerHTML = tableBody.innerHTML +
            "<tr>" +
                "<td><img src=\"" + offerings[i].image + "\" alt=\"" + offerings[i].name + "\" onerror=\"this.src='Logo.png'\"></td>" +
                "<td>" + offerings[i].name + "</td>" +
                "<td>" + offerings[i].description + "</td>" +
                "<td>" + offerings[i].price + " SAR</td>" +
            "</tr>";
    }
}