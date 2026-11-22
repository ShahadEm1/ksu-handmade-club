
document.addEventListener("DOMContentLoaded", function () {

    const grid = document.querySelector(".offerings-grid");
    const cards = Array.from(
        grid.querySelectorAll(".offering-card")
    );

    const nameSort = document.getElementById("sort-name");
    const priceSort = document.getElementById("sort-price");

    function displayCards(sortedCards) {
        sortedCards.forEach(function (card) {
            grid.appendChild(card);
        });
    }

    // Random order initially
    const randomCards = [...cards];

    for (let i = randomCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [randomCards[i], randomCards[j]] =
            [randomCards[j], randomCards[i]];
    }

    displayCards(randomCards);

    // Sort alphabetically
    nameSort.addEventListener("change", function () {

        priceSort.value = "";

        const sorted = [...cards].sort(function (a, b) {
            const nameA = a.querySelector("h3").textContent.trim();
            const nameB = b.querySelector("h3").textContent.trim();

            return nameA.localeCompare(nameB);
        });

        if (nameSort.value === "za") {
            sorted.reverse();
        }

        displayCards(sorted);
    });

    // Sort by price
    priceSort.addEventListener("change", function () {

        nameSort.value = "";

        function getPrice(card) {
            return parseFloat(
                card.querySelector(".price-text").textContent
            );
        }

        const sorted = [...cards].sort(function (a, b) {
            return getPrice(a) - getPrice(b);
        });

        if (priceSort.value === "high-low") {
            sorted.reverse();
        }

        displayCards(sorted);
    });

});
